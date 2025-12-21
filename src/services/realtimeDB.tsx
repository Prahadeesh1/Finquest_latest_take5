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
import { rtdb } from '../firebase/config';

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
  members?: string[];
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

  // Vote on a post - FIXED TO NOT TOGGLE
  static async voteOnPost(postId: string, userId: string, voteType: 'upvote' | 'downvote' | 'remove'): Promise<void> {
    try {
      const voteRef = ref(rtdb, `votes/posts/${postId}/${userId}`);
      const postRef = ref(rtdb, `posts/${postId}`);
      
      // Get current vote status
      const voteSnapshot = await get(voteRef);
      const currentVote = voteSnapshot.val();
      
      // Use transaction to safely update vote counts
      await runTransaction(postRef, (post) => {
        if (!post) return post;
        
        // Calculate changes
        let upvoteChange = 0;
        let downvoteChange = 0;
        
        // Remove previous vote effect
        if (currentVote === 'upvote') {
          upvoteChange = -1;
        } else if (currentVote === 'downvote') {
          downvoteChange = -1;
        }
        
        // Apply new vote effect (no toggle - if same vote clicked, remove it)
        if (voteType !== 'remove') {
          if (voteType === 'upvote' && currentVote !== 'upvote') {
            upvoteChange += 1;
          } else if (voteType === 'downvote' && currentVote !== 'downvote') {
            downvoteChange += 1;
          }
        }
        
        // Update counts
        post.upvotes = Math.max(0, (post.upvotes || 0) + upvoteChange);
        post.downvotes = Math.max(0, (post.downvotes || 0) + downvoteChange);
        post.updatedAt = new Date().toISOString();
        
        return post;
      });
      
      // Update vote record
      if (voteType === 'remove' || voteType === currentVote) {
        await remove(voteRef);
      } else {
        await set(voteRef, voteType);
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

  // Vote on comment - FIXED TO NOT TOGGLE
  static async voteOnComment(postId: string, commentId: string, userId: string, voteType: 'upvote' | 'downvote' | 'remove'): Promise<void> {
    try {
      const voteRef = ref(rtdb, `votes/comments/${commentId}/${userId}`);
      const commentRef = ref(rtdb, `comments/${postId}/${commentId}`);
      
      // Get current vote status
      const voteSnapshot = await get(voteRef);
      const currentVote = voteSnapshot.val();
      
      // Use transaction to safely update vote counts
      await runTransaction(commentRef, (comment) => {
        if (!comment) return comment;
        
        // Calculate changes
        let upvoteChange = 0;
        let downvoteChange = 0;
        
        // Remove previous vote effect
        if (currentVote === 'upvote') {
          upvoteChange = -1;
        } else if (currentVote === 'downvote') {
          downvoteChange = -1;
        }
        
        // Apply new vote effect (no toggle)
        if (voteType !== 'remove') {
          if (voteType === 'upvote' && currentVote !== 'upvote') {
            upvoteChange += 1;
          } else if (voteType === 'downvote' && currentVote !== 'downvote') {
            downvoteChange += 1;
          }
        }
        
        // Update counts
        comment.upvotes = Math.max(0, (comment.upvotes || 0) + upvoteChange);
        comment.downvotes = Math.max(0, (comment.downvotes || 0) + downvoteChange);
        
        return comment;
      });
      
      // Update vote record
      if (voteType === 'remove' || voteType === currentVote) {
        await remove(voteRef);
      } else {
        await set(voteRef, voteType);
      }
      
    } catch (error) {
      console.error('Error voting on comment:', error);
      throw error;
    }
  }

  // Vote on reply - FIXED TO NOT TOGGLE
  static async voteOnReply(postId: string, commentId: string, replyId: string, userId: string, voteType: 'upvote' | 'downvote' | 'remove'): Promise<void> {
    try {
      const voteRef = ref(rtdb, `votes/replies/${replyId}/${userId}`);
      const replyRef = ref(rtdb, `comments/${postId}/${commentId}/replies/${replyId}`);
      
      // Get current vote status
      const voteSnapshot = await get(voteRef);
      const currentVote = voteSnapshot.val();
      
      // Use transaction to safely update vote counts
      await runTransaction(replyRef, (reply) => {
        if (!reply) return reply;
        
        // Calculate changes
        let upvoteChange = 0;
        let downvoteChange = 0;
        
        // Remove previous vote effect
        if (currentVote === 'upvote') {
          upvoteChange = -1;
        } else if (currentVote === 'downvote') {
          downvoteChange = -1;
        }
        
        // Apply new vote effect (no toggle)
        if (voteType !== 'remove') {
          if (voteType === 'upvote' && currentVote !== 'upvote') {
            upvoteChange += 1;
          } else if (voteType === 'downvote' && currentVote !== 'downvote') {
            downvoteChange += 1;
          }
        }
        
        // Update counts
        reply.upvotes = Math.max(0, (reply.upvotes || 0) + upvoteChange);
        reply.downvotes = Math.max(0, (reply.downvotes || 0) + downvoteChange);
        
        return reply;
      });
      
      // Update vote record
      if (voteType === 'remove' || voteType === currentVote) {
        await remove(voteRef);
      } else {
        await set(voteRef, voteType);
      }
      
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

  // Join community
  static async joinCommunity(userId: string, communityId: string): Promise<void> {
    try {
      const communityMembersRef = ref(rtdb, `communities/${communityId}/members/${userId}`);
      const userCommunitiesRef = ref(rtdb, `users/${userId}/communities/${communityId}`);
      const memberCountRef = ref(rtdb, `communities/${communityId}/memberCount`);

      // Check if already a member
      const memberSnapshot = await get(communityMembersRef);
      if (memberSnapshot.exists()) {
        console.log('User already a member');
        return;
      }

      // Use transaction to safely increment member count
      await runTransaction(memberCountRef, (currentCount) => {
        return (currentCount || 0) + 1;
      });

      // Add user to community members
      await set(communityMembersRef, {
        joinedAt: new Date().toISOString(),
        userId: userId
      });

      // Add community to user's communities
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

      // Check if user is a member
      const memberSnapshot = await get(communityMembersRef);
      if (!memberSnapshot.exists()) {
        console.log('User is not a member');
        return;
      }

      // Use transaction to safely decrement member count
      await runTransaction(memberCountRef, (currentCount) => {
        return Math.max(0, (currentCount || 0) - 1);
      });

      // Remove user from community members
      await remove(communityMembersRef);

      // Remove community from user's communities
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