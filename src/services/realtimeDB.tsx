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
  DataSnapshot
} from 'firebase/database';
import { rtdb } from '../firebase/config'; // Make sure this imports your Realtime Database instance

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  community: string;
  type: 'text' | 'image' | 'link';
  upvotes: number;
  downvotes: number;
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
  upvotes: number;
  downvotes: number;
  createdAt: string;
  replies?: { [key: string]: Reply };
}

export interface Reply {
  id: string;
  commentId: string;
  author: string;
  authorId: string;
  content: string;
  upvotes: number;
  downvotes: number;
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
}

export class PostService {
  // Create a new post
  static async createPost(postData: Omit<Post, 'id' | 'upvotes' | 'downvotes' | 'commentCount' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const postsRef = ref(rtdb, 'posts');
      const newPostRef = push(postsRef);
      const postId = newPostRef.key!;
      
      const now = new Date().toISOString();
      const post: Post = {
        id: postId,
        ...postData,
        upvotes: 0,
        downvotes: 0,
        commentCount: 0,
        createdAt: now,
        updatedAt: now,
        isPinned: false,
        category: 'community-discussion'
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

      // Sort by creation date (newest first) and separate pinned posts
      posts.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      // Apply limit after sorting
      return posts.slice(0, limit);
    } catch (error) {
      console.error('Error fetching community posts:', error);
      throw error;
    }
  }

  // Get all posts (for main community page)
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

      // Sort by creation date (newest first)
      posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      // Apply limit after sorting
      return posts.slice(0, limit);
    } catch (error) {
      console.error('Error fetching all posts:', error);
      throw error;
    }
  }

  // Get expert/pinned posts by community
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

  // Vote on a post
  static async voteOnPost(postId: string, userId: string, voteType: 'upvote' | 'downvote' | 'remove'): Promise<void> {
    try {
      const voteRef = ref(rtdb, `votes/posts/${postId}/${userId}`);
      const postRef = ref(rtdb, `posts/${postId}`);
      
      // Get current vote and post data
      const [voteSnapshot, postSnapshot] = await Promise.all([
        get(voteRef),
        get(postRef)
      ]);
      
      const currentVote = voteSnapshot.val();
      const post = postSnapshot.val();
      
      if (!post) return;

      let upvoteChange = 0;
      let downvoteChange = 0;

      // Calculate vote changes
      if (currentVote === 'upvote') {
        upvoteChange = -1;
      } else if (currentVote === 'downvote') {
        downvoteChange = -1;
      }

      if (voteType === 'upvote' && currentVote !== 'upvote') {
        upvoteChange += 1;
      } else if (voteType === 'downvote' && currentVote !== 'downvote') {
        downvoteChange += 1;
      }

      // Update post votes
      const updates: any = {};
      if (upvoteChange !== 0) {
        updates[`posts/${postId}/upvotes`] = post.upvotes + upvoteChange;
      }
      if (downvoteChange !== 0) {
        updates[`posts/${postId}/downvotes`] = post.downvotes + downvoteChange;
      }

      // Update vote record
      if (voteType === 'remove') {
        updates[`votes/posts/${postId}/${userId}`] = null;
      } else {
        updates[`votes/posts/${postId}/${userId}`] = voteType;
      }

      await update(ref(rtdb), updates);
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

      // Sort by creation date (oldest first)
      comments.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

      return comments;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }

  // Add comment to post
  static async addComment(postId: string, commentData: Omit<Comment, 'id' | 'upvotes' | 'downvotes' | 'createdAt'>): Promise<string> {
    try {
      const commentsRef = ref(rtdb, `comments/${postId}`);
      const newCommentRef = push(commentsRef);
      const commentId = newCommentRef.key!;

      const comment: Comment = {
        id: commentId,
        ...commentData,
        upvotes: 0,
        downvotes: 0,
        createdAt: new Date().toISOString()
      };

      await set(newCommentRef, comment);

      // Update post comment count
      const postRef = ref(rtdb, `posts/${postId}/commentCount`);
      const postSnapshot = await get(postRef);
      const currentCount = postSnapshot.val() || 0;
      await set(postRef, currentCount + 1);

      // Update user's comments count
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
  static async addReply(postId: string, commentId: string, replyData: Omit<Reply, 'id' | 'upvotes' | 'downvotes' | 'createdAt'>): Promise<string> {
    try {
      const repliesRef = ref(rtdb, `comments/${postId}/${commentId}/replies`);
      const newReplyRef = push(repliesRef);
      const replyId = newReplyRef.key!;

      const reply: Reply = {
        id: replyId,
        ...replyData,
        upvotes: 0,
        downvotes: 0,
        createdAt: new Date().toISOString()
      };

      await set(newReplyRef, reply);
      return replyId;
    } catch (error) {
      console.error('Error adding reply:', error);
      throw error;
    }
  }

  // Vote on comment
  static async voteOnComment(postId: string, commentId: string, userId: string, voteType: 'upvote' | 'downvote' | 'remove'): Promise<void> {
    try {
      const voteRef = ref(rtdb, `votes/comments/${commentId}/${userId}`);
      const commentRef = ref(rtdb, `comments/${postId}/${commentId}`);
      
      // Get current vote and comment data
      const [voteSnapshot, commentSnapshot] = await Promise.all([
        get(voteRef),
        get(commentRef)
      ]);
      
      const currentVote = voteSnapshot.val();
      const comment = commentSnapshot.val();
      
      if (!comment) return;

      let upvoteChange = 0;
      let downvoteChange = 0;

      // Calculate vote changes
      if (currentVote === 'upvote') {
        upvoteChange = -1;
      } else if (currentVote === 'downvote') {
        downvoteChange = -1;
      }

      if (voteType === 'upvote' && currentVote !== 'upvote') {
        upvoteChange += 1;
      } else if (voteType === 'downvote' && currentVote !== 'downvote') {
        downvoteChange += 1;
      }

      // Update comment votes
      const updates: any = {};
      if (upvoteChange !== 0) {
        updates[`comments/${postId}/${commentId}/upvotes`] = comment.upvotes + upvoteChange;
      }
      if (downvoteChange !== 0) {
        updates[`comments/${postId}/${commentId}/downvotes`] = comment.downvotes + downvoteChange;
      }

      // Update vote record
      if (voteType === 'remove') {
        updates[`votes/comments/${commentId}/${userId}`] = null;
      } else {
        updates[`votes/comments/${commentId}/${userId}`] = voteType;
      }

      await update(ref(rtdb), updates);
    } catch (error) {
      console.error('Error voting on comment:', error);
      throw error;
    }
  }

  // Vote on reply
  static async voteOnReply(postId: string, commentId: string, replyId: string, userId: string, voteType: 'upvote' | 'downvote' | 'remove'): Promise<void> {
    try {
      const voteRef = ref(rtdb, `votes/replies/${replyId}/${userId}`);
      const replyRef = ref(rtdb, `comments/${postId}/${commentId}/replies/${replyId}`);
      
      // Get current vote and reply data
      const [voteSnapshot, replySnapshot] = await Promise.all([
        get(voteRef),
        get(replyRef)
      ]);
      
      const currentVote = voteSnapshot.val();
      const reply = replySnapshot.val();
      
      if (!reply) return;

      let upvoteChange = 0;
      let downvoteChange = 0;

      // Calculate vote changes
      if (currentVote === 'upvote') {
        upvoteChange = -1;
      } else if (currentVote === 'downvote') {
        downvoteChange = -1;
      }

      if (voteType === 'upvote' && currentVote !== 'upvote') {
        upvoteChange += 1;
      } else if (voteType === 'downvote' && currentVote !== 'downvote') {
        downvoteChange += 1;
      }

      // Update reply votes
      const updates: any = {};
      if (upvoteChange !== 0) {
        updates[`comments/${postId}/${commentId}/replies/${replyId}/upvotes`] = reply.upvotes + upvoteChange;
      }
      if (downvoteChange !== 0) {
        updates[`comments/${postId}/${commentId}/replies/${replyId}/downvotes`] = reply.downvotes + downvoteChange;
      }

      // Update vote record
      if (voteType === 'remove') {
        updates[`votes/replies/${replyId}/${userId}`] = null;
      } else {
        updates[`votes/replies/${replyId}/${userId}`] = voteType;
      }

      await update(ref(rtdb), updates);
    } catch (error) {
      console.error('Error voting on reply:', error);
      throw error;
    }
  }

  // Get user's vote on post
  static async getUserVoteOnPost(postId: string, userId: string): Promise<'upvote' | 'downvote' | null> {
    try {
      const voteRef = ref(rtdb, `votes/posts/${postId}/${userId}`);
      const snapshot = await get(voteRef);
      return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
      console.error('Error fetching user vote:', error);
      return null;
    }
  }

  // Get user's vote on comment
  static async getUserVoteOnComment(commentId: string, userId: string): Promise<'upvote' | 'downvote' | null> {
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

  // Join/Leave community (simplified - just track in user data)
  static async joinCommunity(userId: string, communityId: string): Promise<void> {
    try {
      // For now, just update user's joined communities
      const userCommunitiesRef = ref(rtdb, `users/${userId}/communities`);
      const snapshot = await get(userCommunitiesRef);
      const communities = snapshot.exists() ? snapshot.val() : [];
      
      if (!communities.includes(communityId)) {
        communities.push(communityId);
        await set(userCommunitiesRef, communities);
      }
    } catch (error) {
      console.error('Error joining community:', error);
      throw error;
    }
  }

  static async leaveCommunity(userId: string, communityId: string): Promise<void> {
    try {
      const userCommunitiesRef = ref(rtdb, `users/${userId}/communities`);
      const snapshot = await get(userCommunitiesRef);
      const communities = snapshot.exists() ? snapshot.val() : [];
      
      const updatedCommunities = communities.filter((id: string) => id !== communityId);
      await set(userCommunitiesRef, updatedCommunities);
    } catch (error) {
      console.error('Error leaving community:', error);
      throw error;
    }
  }

  // Update online status (simplified)
  static async updateOnlineStatus(userId: string, communityId: string, isOnline: boolean): Promise<void> {
    try {
      // For now, just log this - we can implement proper online tracking later
      console.log(`User ${userId} is ${isOnline ? 'online' : 'offline'} in ${communityId}`);
    } catch (error) {
      console.error('Error updating online status:', error);
    }
  }

  // Get community member count (simplified - use static count from community data)
  static async getCommunityMemberCount(communityId: string): Promise<number> {
    try {
      const community = await this.getCommunity(communityId);
      return community?.memberCount || 0;
    } catch (error) {
      console.error('Error getting member count:', error);
      return 0;
    }
  }

  // Check if user is member of community
  static async isUserMember(userId: string, communityId: string): Promise<boolean> {
    try {
      const userCommunitiesRef = ref(rtdb, `users/${userId}/communities`);
      const snapshot = await get(userCommunitiesRef);
      const communities = snapshot.exists() ? snapshot.val() : [];
      return communities.includes(communityId);
    } catch (error) {
      console.error('Error checking membership:', error);
      return false;
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