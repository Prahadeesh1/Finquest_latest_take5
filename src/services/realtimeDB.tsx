// src/services/realtimeDB.ts
import { 
  ref, 
  push, 
  set, 
  get, 
  update, 
  remove, 
  query, 
  orderByChild, 
  limitToLast,
  orderByKey,
  startAt,
  endAt,
  onValue,
  off,
  DataSnapshot,
  runTransaction
} from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { rtdb, storage } from '../firebase/config';

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  community: string;
  type: 'text' | 'image' | 'link';
  likes: number; // ✅ FIXED: Explicit likes count
  dislikes: number; // ✅ FIXED: Explicit dislikes count
  commentCount: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isBookmarked?: boolean;
  isPinned?: boolean;
  category?: 'expert-insights' | 'community-discussion';
  imageUrl?: string;
  linkUrl?: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  authorId: string;
  content: string;
  likes: number; // ✅ FIXED
  dislikes: number; // ✅ FIXED
  createdAt: string;
  replies?: { [key: string]: Reply };
}

export interface Reply {
  id: string;
  commentId: string;
  author: string;
  authorId: string;
  content: string;
  likes: number; // ✅ FIXED
  dislikes: number; // ✅ FIXED
  createdAt: string;
}

export interface Community {
  name: string;
  description: string;
  memberCount: number;
  onlineCount: number;
  icon: string;
  color: string;
  createdAt: string;
  rules: string[];
  members?: string[];
}

export class PostService {
  // ✅ NEW: Upload image to Firebase Storage
  static async uploadImage(file: File, postId: string): Promise<string> {
    try {
      const imageRef = storageRef(storage, `posts/${postId}/${file.name}`);
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  // ✅ FIXED: Create post with image support
  static async createPost(
    postData: Omit<Post, 'id' | 'likes' | 'dislikes' | 'commentCount' | 'createdAt' | 'updatedAt'>,
    imageFile?: File
  ): Promise<string> {
    try {
      const postsRef = ref(rtdb, 'posts');
      const newPostRef = push(postsRef);
      const postId = newPostRef.key!;
      
      let imageUrl: string | undefined;
      
      // Upload image if provided
      if (imageFile && postData.type === 'image') {
        imageUrl = await this.uploadImage(imageFile, postId);
      }

      const now = new Date().toISOString();
      const post: Post = {
        id: postId,
        ...postData,
        likes: 0, // ✅ FIXED
        dislikes: 0, // ✅ FIXED
        commentCount: 0,
        createdAt: now,
        updatedAt: now,
        isPinned: false,
        category: 'community-discussion',
        ...(imageUrl && { imageUrl })
      };

      await set(newPostRef, post);

      // Update user's posts count
      const userRef = ref(rtdb, `users/${postData.authorId}/postsCount`);
      const userSnapshot = await get(userRef);
      const currentCount = userSnapshot.val() || 0;
      await set(userRef, currentCount + 1);

      // Add to user activity
      await this.addUserActivity(postData.authorId, {
        type: 'post_created',
        postId: postId,
        timestamp: now
      });

      return postId;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  // ✅ NEW: Delete post (with image cleanup)
  static async deletePost(postId: string, userId: string): Promise<void> {
    try {
      const postRef = ref(rtdb, `posts/${postId}`);
      const postSnapshot = await get(postRef);
      
      if (!postSnapshot.exists()) {
        throw new Error('Post not found');
      }

      const post = postSnapshot.val() as Post;
      
      // Check ownership
      if (post.authorId !== userId) {
        throw new Error('Unauthorized: You can only delete your own posts');
      }

      // Delete image from storage if exists
      if (post.imageUrl) {
        try {
          const imageRef = storageRef(storage, post.imageUrl);
          await deleteObject(imageRef);
        } catch (imgError) {
          console.warn('Error deleting image from storage:', imgError);
          // Continue with post deletion even if image deletion fails
        }
      }

      // Delete all comments
      const commentsRef = ref(rtdb, `comments/${postId}`);
      await remove(commentsRef);

      // Delete all votes on this post
      const votesRef = ref(rtdb, `votes/posts/${postId}`);
      await remove(votesRef);

      // Delete post
      await remove(postRef);

      // Update user's posts count
      const userRef = ref(rtdb, `users/${userId}/postsCount`);
      const userSnapshot = await get(userRef);
      const currentCount = userSnapshot.val() || 0;
      await set(userRef, Math.max(0, currentCount - 1));

      console.log(`Post ${postId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }

  // Get posts by community
  static async getPostsByCommunity(communityId: string, limit: number = 10): Promise<Post[]> {
    try {
      const postsRef = ref(rtdb, 'posts');
      const snapshot = await get(postsRef);
      
      if (!snapshot.exists()) return [];

      const posts: Post[] = [];
      
      snapshot.forEach((childSnapshot) => {
        const post = childSnapshot.val();
        if (post && post.community === communityId) {
          posts.push(post);
        }
      });

      posts.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      return posts.slice(0, limit);
    } catch (error) {
      console.error('Error fetching community posts:', error);
      throw error;
    }
  }

  // Get all posts
  static async getAllPosts(limit: number = 20): Promise<Post[]> {
    try {
      const postsRef = ref(rtdb, 'posts');
      const snapshot = await get(postsRef);
      
      if (!snapshot.exists()) return [];

      const posts: Post[] = [];
      
      snapshot.forEach((childSnapshot) => {
        const post = childSnapshot.val();
        if (post) {
          posts.push(post);
        }
      });

      posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return posts.slice(0, limit);
    } catch (error) {
      console.error('Error fetching all posts:', error);
      throw error;
    }
  }

  // Get expert posts by community
  static async getExpertPostsByCommunity(communityId: string): Promise<Post[]> {
    try {
      const posts = await this.getPostsByCommunity(communityId, 50);
      return posts.filter(post => post.isPinned || post.category === 'expert-insights');
    } catch (error) {
      console.error('Error fetching expert posts:', error);
      throw error;
    }
  }

  // Get single post by ID
  static async getPostById(postId: string): Promise<Post | null> {
    try {
      const postRef = ref(rtdb, `posts/${postId}`);
      const snapshot = await get(postRef);
      return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  }

  // ✅ FIXED: Vote on post with explicit likes/dislikes
  static async voteOnPost(postId: string, userId: string, voteType: 'like' | 'dislike' | 'remove'): Promise<void> {
    try {
      const voteRef = ref(rtdb, `votes/posts/${postId}/${userId}`);
      const postRef = ref(rtdb, `posts/${postId}`);
      
      // Get current vote status
      const voteSnapshot = await get(voteRef);
      const currentVote = voteSnapshot.val();
      
      // If trying to apply same vote, treat as remove
      const actualVoteType = currentVote === voteType ? 'remove' : voteType;
      
      // Use transaction to safely update vote counts
      await runTransaction(postRef, (post) => {
        if (!post) return post;
        
        // Calculate changes
        let likeChange = 0;
        let dislikeChange = 0;
        
        // Remove previous vote effect
        if (currentVote === 'like') {
          likeChange = -1;
        } else if (currentVote === 'dislike') {
          dislikeChange = -1;
        }
        
        // Apply new vote effect
        if (actualVoteType === 'like') {
          likeChange += 1;
        } else if (actualVoteType === 'dislike') {
          dislikeChange += 1;
        }
        
        // Update counts
        post.likes = Math.max(0, (post.likes || 0) + likeChange);
        post.dislikes = Math.max(0, (post.dislikes || 0) + dislikeChange);
        post.updatedAt = new Date().toISOString();
        
        return post;
      });
      
      // Update vote record
      if (actualVoteType === 'remove') {
        await remove(voteRef);
      } else {
        await set(voteRef, actualVoteType);
      }
      
    } catch (error) {
      console.error('Error voting on post:', error);
      throw error;
    }
  }

  // Get comments for a post
  static async getPostComments(postId: string): Promise<Comment[]> {
    try {
      const commentsRef = ref(rtdb, `comments/${postId}`);
      const snapshot = await get(commentsRef);
      
      if (!snapshot.exists()) return [];

      const comments: Comment[] = [];
      snapshot.forEach((childSnapshot) => {
        comments.push(childSnapshot.val());
      });

      comments.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      return comments;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }

  // Add comment to post
  static async addComment(postId: string, commentData: Omit<Comment, 'id' | 'likes' | 'dislikes' | 'createdAt'>): Promise<string> {
    try {
      const commentsRef = ref(rtdb, `comments/${postId}`);
      const newCommentRef = push(commentsRef);
      const commentId = newCommentRef.key!;

      const comment: Comment = {
        id: commentId,
        ...commentData,
        likes: 0, // ✅ FIXED
        dislikes: 0, // ✅ FIXED
        createdAt: new Date().toISOString()
      };

      await set(newCommentRef, comment);

      // Update post comment count with transaction
      const postRef = ref(rtdb, `posts/${postId}`);
      await runTransaction(postRef, (post) => {
        if (post) {
          post.commentCount = (post.commentCount || 0) + 1;
        }
        return post;
      });

      // Update user comment count
      const userRef = ref(rtdb, `users/${commentData.authorId}/commentsCount`);
      const userSnapshot = await get(userRef);
      const currentUserCount = userSnapshot.val() || 0;
      await set(userRef, currentUserCount + 1);

      return commentId;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }

  // Add reply to comment
  static async addReply(postId: string, commentId: string, replyData: Omit<Reply, 'id' | 'likes' | 'dislikes' | 'createdAt'>): Promise<string> {
    try {
      const repliesRef = ref(rtdb, `comments/${postId}/${commentId}/replies`);
      const newReplyRef = push(repliesRef);
      const replyId = newReplyRef.key!;

      const reply: Reply = {
        id: replyId,
        ...replyData,
        likes: 0, // ✅ FIXED
        dislikes: 0, // ✅ FIXED
        createdAt: new Date().toISOString()
      };

      await set(newReplyRef, reply);
      
      // Update post comment count (replies count as comments too)
      const postRef = ref(rtdb, `posts/${postId}`);
      await runTransaction(postRef, (post) => {
        if (post) {
          post.commentCount = (post.commentCount || 0) + 1;
        }
        return post;
      });
      
      return replyId;
    } catch (error) {
      console.error('Error adding reply:', error);
      throw error;
    }
  }

  // ✅ FIXED: Vote on comment with likes/dislikes
  static async voteOnComment(postId: string, commentId: string, userId: string, voteType: 'like' | 'dislike' | 'remove'): Promise<void> {
    try {
      const voteRef = ref(rtdb, `votes/comments/${commentId}/${userId}`);
      const commentRef = ref(rtdb, `comments/${postId}/${commentId}`);
      
      const voteSnapshot = await get(voteRef);
      const currentVote = voteSnapshot.val();
      
      const actualVoteType = currentVote === voteType ? 'remove' : voteType;
      
      await runTransaction(commentRef, (comment) => {
        if (!comment) return comment;
        
        let likeChange = 0;
        let dislikeChange = 0;
        
        if (currentVote === 'like') {
          likeChange = -1;
        } else if (currentVote === 'dislike') {
          dislikeChange = -1;
        }
        
        if (actualVoteType === 'like') {
          likeChange += 1;
        } else if (actualVoteType === 'dislike') {
          dislikeChange += 1;
        }
        
        comment.likes = Math.max(0, (comment.likes || 0) + likeChange);
        comment.dislikes = Math.max(0, (comment.dislikes || 0) + dislikeChange);
        
        return comment;
      });
      
      if (actualVoteType === 'remove') {
        await remove(voteRef);
      } else {
        await set(voteRef, actualVoteType);
      }
      
    } catch (error) {
      console.error('Error voting on comment:', error);
      throw error;
    }
  }

  // ✅ FIXED: Vote on reply
  static async voteOnReply(postId: string, commentId: string, replyId: string, userId: string, voteType: 'like' | 'dislike' | 'remove'): Promise<void> {
    try {
      const voteRef = ref(rtdb, `votes/replies/${replyId}/${userId}`);
      const replyRef = ref(rtdb, `comments/${postId}/${commentId}/replies/${replyId}`);
      
      const voteSnapshot = await get(voteRef);
      const currentVote = voteSnapshot.val();
      
      const actualVoteType = currentVote === voteType ? 'remove' : voteType;
      
      await runTransaction(replyRef, (reply) => {
        if (!reply) return reply;
        
        let likeChange = 0;
        let dislikeChange = 0;
        
        if (currentVote === 'like') {
          likeChange = -1;
        } else if (currentVote === 'dislike') {
          dislikeChange = -1;
        }
        
        if (actualVoteType === 'like') {
          likeChange += 1;
        } else if (actualVoteType === 'dislike') {
          dislikeChange += 1;
        }
        
        reply.likes = Math.max(0, (reply.likes || 0) + likeChange);
        reply.dislikes = Math.max(0, (reply.dislikes || 0) + dislikeChange);
        
        return reply;
      });
      
      if (actualVoteType === 'remove') {
        await remove(voteRef);
      } else {
        await set(voteRef, actualVoteType);
      }
      
    } catch (error) {
      console.error('Error voting on reply:', error);
      throw error;
    }
  }

  // ✅ FIXED: Get user's vote on post
  static async getUserVoteOnPost(postId: string, userId: string): Promise<'like' | 'dislike' | null> {
    try {
      const voteRef = ref(rtdb, `votes/posts/${postId}/${userId}`);
      const snapshot = await get(voteRef);
      return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
      console.error('Error fetching user vote:', error);
      return null;
    }
  }

  // ✅ FIXED: Get user's vote on comment
  static async getUserVoteOnComment(commentId: string, userId: string): Promise<'like' | 'dislike' | null> {
    try {
      const voteRef = ref(rtdb, `votes/comments/${commentId}/${userId}`);
      const snapshot = await get(voteRef);
      return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
      console.error('Error fetching user comment vote:', error);
      return null;
    }
  }

  // Get community data
  static async getCommunity(communityId: string): Promise<Community | null> {
    try {
      const communityRef = ref(rtdb, `communities/${communityId}`);
      const snapshot = await get(communityRef);
      return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
      console.error('Error fetching community:', error);
      throw error;
    }
  }

  // Get all communities
  static async getAllCommunities(): Promise<{ [key: string]: Community }> {
    try {
      const communitiesRef = ref(rtdb, 'communities');
      const snapshot = await get(communitiesRef);
      return snapshot.exists() ? snapshot.val() : {};
    } catch (error) {
      console.error('Error fetching communities:', error);
      throw error;
    }
  }

  // Bookmark/unbookmark post
  static async toggleBookmark(userId: string, postId: string): Promise<boolean> {
    try {
      const bookmarkRef = ref(rtdb, `bookmarks/${userId}/${postId}`);
      const snapshot = await get(bookmarkRef);
      
      const isCurrentlyBookmarked = snapshot.exists();
      
      if (isCurrentlyBookmarked) {
        await remove(bookmarkRef);
        return false;
      } else {
        await set(bookmarkRef, true);
        return true;
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      throw error;
    }
  }

  // Get user's bookmarked posts
  static async getUserBookmarks(userId: string): Promise<string[]> {
    try {
      const bookmarksRef = ref(rtdb, `bookmarks/${userId}`);
      const snapshot = await get(bookmarksRef);
      
      if (!snapshot.exists()) return [];

      const bookmarks: string[] = [];
      snapshot.forEach((childSnapshot) => {
        bookmarks.push(childSnapshot.key!);
      });

      return bookmarks;
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      throw error;
    }
  }

  // Search posts
  static async searchPosts(query: string, communityId?: string): Promise<Post[]> {
    try {
      const posts = communityId 
        ? await this.getPostsByCommunity(communityId, 100)
        : await this.getAllPosts(100);
      
      const lowercaseQuery = query.toLowerCase();
      
      return posts.filter(post => 
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.content.toLowerCase().includes(lowercaseQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );
    } catch (error) {
      console.error('Error searching posts:', error);
      throw error;
    }
  }

  // Join community
  static async joinCommunity(userId: string, communityId: string): Promise<void> {
    try {
      const communityMembersRef = ref(rtdb, `communities/${communityId}/members/${userId}`);
      const userCommunitiesRef = ref(rtdb, `users/${userId}/communities/${communityId}`);
      const memberCountRef = ref(rtdb, `communities/${communityId}/memberCount`);

      const memberSnapshot = await get(communityMembersRef);
      if (memberSnapshot.exists()) {
        console.log('User already a member');
        return;
      }

      await runTransaction(memberCountRef, (currentCount) => {
        return (currentCount || 0) + 1;
      });

      await set(communityMembersRef, {
        joinedAt: new Date().toISOString(),
        userId: userId
      });

      await set(userCommunitiesRef, {
        joinedAt: new Date().toISOString(),
        communityId: communityId
      });

      console.log(`User ${userId} joined community ${communityId}`);
    } catch (error) {
      console.error('Error joining community:', error);
      throw error;
    }
  }

  // Leave community
  static async leaveCommunity(userId: string, communityId: string): Promise<void> {
    try {
      const communityMembersRef = ref(rtdb, `communities/${communityId}/members/${userId}`);
      const userCommunitiesRef = ref(rtdb, `users/${userId}/communities/${communityId}`);
      const memberCountRef = ref(rtdb, `communities/${communityId}/memberCount`);

      const memberSnapshot = await get(communityMembersRef);
      if (!memberSnapshot.exists()) {
        console.log('User is not a member');
        return;
      }

      await runTransaction(memberCountRef, (currentCount) => {
        return Math.max(0, (currentCount || 0) - 1);
      });

      await remove(communityMembersRef);
      await remove(userCommunitiesRef);

      console.log(`User ${userId} left community ${communityId}`);
    } catch (error) {
      console.error('Error leaving community:', error);
      throw error;
    }
  }

  // Check if user is member
  static async isUserMember(userId: string, communityId: string): Promise<boolean> {
    try {
      const memberRef = ref(rtdb, `communities/${communityId}/members/${userId}`);
      const snapshot = await get(memberRef);
      return snapshot.exists();
    } catch (error) {
      console.error('Error checking membership:', error);
      return false;
    }
  }

  // Get community member count
  static async getCommunityMemberCount(communityId: string): Promise<number> {
    try {
      const memberCountRef = ref(rtdb, `communities/${communityId}/memberCount`);
      const snapshot = await get(memberCountRef);
      return snapshot.exists() ? snapshot.val() : 0;
    } catch (error) {
      console.error('Error getting member count:', error);
      return 0;
    }
  }

  // Get all members of a community
  static async getCommunityMembers(communityId: string): Promise<string[]> {
    try {
      const membersRef = ref(rtdb, `communities/${communityId}/members`);
      const snapshot = await get(membersRef);
      
      if (!snapshot.exists()) return [];

      const members: string[] = [];
      snapshot.forEach((childSnapshot) => {
        members.push(childSnapshot.key!);
      });

      return members;
    } catch (error) {
      console.error('Error getting community members:', error);
      return [];
    }
  }

  // Update online status
  static async updateOnlineStatus(userId: string, communityId: string, isOnline: boolean): Promise<void> {
    try {
      const onlineRef = ref(rtdb, `communities/${communityId}/online/${userId}`);
      
      if (isOnline) {
        await set(onlineRef, {
          lastSeen: new Date().toISOString(),
          isOnline: true
        });
      } else {
        await remove(onlineRef);
      }
    } catch (error) {
      console.error('Error updating online status:', error);
    }
  }

  // Get online count
  static async getOnlineCount(communityId: string): Promise<number> {
    try {
      const onlineRef = ref(rtdb, `communities/${communityId}/online`);
      const snapshot = await get(onlineRef);
      
      if (!snapshot.exists()) return 0;

      let count = 0;
      snapshot.forEach(() => {
        count++;
      });

      return count;
    } catch (error) {
      console.error('Error getting online count:', error);
      return 0;
    }
  }

  // Add user activity
  static async addUserActivity(userId: string, activity: { type: string; postId?: string; commentId?: string; timestamp: string }): Promise<void> {
    try {
      const activityRef = ref(rtdb, `user-activity/${userId}`);
      const newActivityRef = push(activityRef);
      await set(newActivityRef, activity);
    } catch (error) {
      console.error('Error adding user activity:', error);
      throw error;
    }
  }

  // Real-time listeners
  static subscribeToPost(postId: string, callback: (post: Post | null) => void): () => void {
    const postRef = ref(rtdb, `posts/${postId}`);
    onValue(postRef, (snapshot) => {
      callback(snapshot.exists() ? snapshot.val() : null);
    });
    
    return () => off(postRef);
  }

  static subscribeToComments(postId: string, callback: (comments: Comment[]) => void): () => void {
    const commentsRef = ref(rtdb, `comments/${postId}`);
    onValue(commentsRef, (snapshot) => {
      const comments: Comment[] = [];
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          comments.push(childSnapshot.val());
        });
      }
      comments.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      callback(comments);
    });
    
    return () => off(commentsRef);
  }
}