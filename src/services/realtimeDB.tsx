// src/services/realtimeDB.ts
import { 
  ref, 
  push, 
  set, 
  get, 
  update, 
  remove, 
  onValue, 
  off, 
  serverTimestamp,
  query,
  orderByChild,
  limitToLast,
  startAt,
  endAt
} from 'firebase/database';
import { rtdb } from '../firebase/config';

// Types
export interface Community {
  id?: string;
  name: string;
  description: string;
  memberCount: number;
  createdAt: string;
  createdBy: string;
  isPublic: boolean;
  tags: string[];
  moderators: string[];
  rules: string[];
  onlineMembers?: number;
}

export interface Post {
  id?: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  community: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  commentCount: number;
  isBookmarked?: boolean;
  tags: string[];
  type: 'text' | 'image' | 'link';
  imageUrl?: string;
  linkUrl?: string;
}

export interface Comment {
  id?: string;
  postId: string;
  author: string;
  authorId: string;
  content: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  replies?: { [key: string]: Comment };
}

export interface UserVote {
  [postOrCommentId: string]: 'upvote' | 'downvote';
}

// Community Services
export class CommunityService {
  
  // Get all communities
  static async getCommunities(): Promise<Community[]> {
    try {
      const communitiesRef = ref(rtdb, 'communities');
      const snapshot = await get(communitiesRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching communities:', error);
      throw error;
    }
  }

  // Get single community
  static async getCommunity(communityId: string): Promise<Community | null> {
    try {
      const communityRef = ref(rtdb, `communities/${communityId}`);
      const snapshot = await get(communityRef);
      
      if (snapshot.exists()) {
        return {
          id: communityId,
          ...snapshot.val()
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching community:', error);
      throw error;
    }
  }

  // Join community
  static async joinCommunity(userId: string, communityId: string): Promise<void> {
    try {
      const userCommunityRef = ref(rtdb, `userCommunities/${userId}/${communityId}`);
      const communityRef = ref(rtdb, `communities/${communityId}/memberCount`);
      
      // Get current member count
      const memberSnapshot = await get(communityRef);
      const currentCount = memberSnapshot.exists() ? memberSnapshot.val() : 0;
      
      // Add user to community and increment member count
      await set(userCommunityRef, {
        joinedAt: new Date().toISOString(),
        role: 'member',
        postCount: 0,
        commentCount: 0
      });
      
      await set(communityRef, currentCount + 1);
      
    } catch (error) {
      console.error('Error joining community:', error);
      throw error;
    }
  }

  // Leave community
  static async leaveCommunity(userId: string, communityId: string): Promise<void> {
    try {
      const userCommunityRef = ref(rtdb, `userCommunities/${userId}/${communityId}`);
      const communityRef = ref(rtdb, `communities/${communityId}/memberCount`);
      
      // Get current member count
      const memberSnapshot = await get(communityRef);
      const currentCount = memberSnapshot.exists() ? memberSnapshot.val() : 1;
      
      // Remove user from community and decrement member count
      await remove(userCommunityRef);
      await set(communityRef, Math.max(0, currentCount - 1));
      
    } catch (error) {
      console.error('Error leaving community:', error);
      throw error;
    }
  }
}

// Post Services
export class PostService {
  
  // Create new post
  static async createPost(post: Omit<Post, 'id' | 'createdAt' | 'upvotes' | 'downvotes' | 'commentCount'>): Promise<string> {
    try {
      const postsRef = ref(rtdb, 'posts');
      const newPostRef = push(postsRef);
      const postId = newPostRef.key!;
      
      const newPost: Post = {
        ...post,
        id: postId,
        createdAt: new Date().toISOString(),
        upvotes: 0,
        downvotes: 0,
        commentCount: 0
      };
      
      await set(newPostRef, newPost);
      
      // Update user's post count in community
      const userCommunityRef = ref(rtdb, `userCommunities/${post.authorId}/${post.community}/postCount`);
      const snapshot = await get(userCommunityRef);
      const currentCount = snapshot.exists() ? snapshot.val() : 0;
      await set(userCommunityRef, currentCount + 1);
      
      return postId;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  // Get posts for a community
  static async getPostsByCommunity(communityId: string, limit: number = 20): Promise<Post[]> {
    try {
      const postsRef = ref(rtdb, 'posts');
      const communityQuery = query(
        postsRef,
        orderByChild('community'),
        startAt(communityId),
        endAt(communityId),
        limitToLast(limit)
      );
      
      const snapshot = await get(communityQuery);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.keys(data)
          .map(key => data[key])
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
      return [];
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  // Get all posts (for main feed)
  static async getAllPosts(limit: number = 20): Promise<Post[]> {
    try {
      const postsRef = ref(rtdb, 'posts');
      const postsQuery = query(postsRef, limitToLast(limit));
      
      const snapshot = await get(postsQuery);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.keys(data)
          .map(key => data[key])
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
      return [];
    } catch (error) {
      console.error('Error fetching all posts:', error);
      throw error;
    }
  }

  // Vote on post
  static async voteOnPost(userId: string, postId: string, voteType: 'upvote' | 'downvote'): Promise<void> {
    try {
      const userVoteRef = ref(rtdb, `userVotes/${userId}/${postId}`);
      const postUpvotesRef = ref(rtdb, `posts/${postId}/upvotes`);
      const postDownvotesRef = ref(rtdb, `posts/${postId}/downvotes`);
      
      // Get current vote and post votes
      const [currentVoteSnapshot, upvotesSnapshot, downvotesSnapshot] = await Promise.all([
        get(userVoteRef),
        get(postUpvotesRef),
        get(postDownvotesRef)
      ]);
      
      const currentVote = currentVoteSnapshot.exists() ? currentVoteSnapshot.val() : null;
      let upvotes = upvotesSnapshot.exists() ? upvotesSnapshot.val() : 0;
      let downvotes = downvotesSnapshot.exists() ? downvotesSnapshot.val() : 0;
      
      // Handle vote logic
      if (currentVote === voteType) {
        // Remove vote
        await remove(userVoteRef);
        if (voteType === 'upvote') upvotes--;
        else downvotes--;
      } else {
        // Add/change vote
        await set(userVoteRef, voteType);
        
        if (currentVote) {
          // Change vote
          if (voteType === 'upvote') {
            upvotes++;
            downvotes--;
          } else {
            downvotes++;
            upvotes--;
          }
        } else {
          // New vote
          if (voteType === 'upvote') upvotes++;
          else downvotes++;
        }
      }
      
      // Update post vote counts
      await Promise.all([
        set(postUpvotesRef, Math.max(0, upvotes)),
        set(postDownvotesRef, Math.max(0, downvotes))
      ]);
      
    } catch (error) {
      console.error('Error voting on post:', error);
      throw error;
    }
  }

  // Bookmark post
  static async toggleBookmark(userId: string, postId: string): Promise<void> {
    try {
      const bookmarkRef = ref(rtdb, `userBookmarks/${userId}/${postId}`);
      const snapshot = await get(bookmarkRef);
      
      if (snapshot.exists()) {
        // Remove bookmark
        await remove(bookmarkRef);
      } else {
        // Add bookmark
        await set(bookmarkRef, {
          bookmarkedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      throw error;
    }
  }
}

// Comment Services
export class CommentService {
  
  // Add comment to post
  static async addComment(comment: Omit<Comment, 'id' | 'createdAt' | 'upvotes' | 'downvotes'>): Promise<string> {
    try {
      const commentsRef = ref(rtdb, `comments/${comment.postId}`);
      const newCommentRef = push(commentsRef);
      const commentId = newCommentRef.key!;
      
      const newComment: Comment = {
        ...comment,
        id: commentId,
        createdAt: new Date().toISOString(),
        upvotes: 0,
        downvotes: 0,
        replies: {}
      };
      
      await set(newCommentRef, newComment);
      
      // Update post comment count
      const postCommentCountRef = ref(rtdb, `posts/${comment.postId}/commentCount`);
      const snapshot = await get(postCommentCountRef);
      const currentCount = snapshot.exists() ? snapshot.val() : 0;
      await set(postCommentCountRef, currentCount + 1);
      
      return commentId;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }

  // Get comments for a post
  static async getCommentsByPost(postId: string): Promise<Comment[]> {
    try {
      const commentsRef = ref(rtdb, `comments/${postId}`);
      const snapshot = await get(commentsRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.keys(data).map(key => ({
          ...data[key],
          id: key
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }
}

// Real-time listeners
export class RealtimeListeners {
  
  // Listen to posts changes
  static listenToPosts(callback: (posts: Post[]) => void): () => void {
    const postsRef = ref(rtdb, 'posts');
    const unsubscribe = onValue(postsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const posts = Object.keys(data)
          .map(key => data[key])
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        callback(posts);
      } else {
        callback([]);
      }
    });
    
    return () => off(postsRef, 'value', unsubscribe);
  }

  // Listen to community changes
  static listenToCommunities(callback: (communities: Community[]) => void): () => void {
    const communitiesRef = ref(rtdb, 'communities');
    const unsubscribe = onValue(communitiesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const communities = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        callback(communities);
      } else {
        callback([]);
      }
    });
    
    return () => off(communitiesRef, 'value', unsubscribe);
  }

  // Listen to comments for a specific post
  static listenToPostComments(postId: string, callback: (comments: Comment[]) => void): () => void {
    const commentsRef = ref(rtdb, `comments/${postId}`);
    const unsubscribe = onValue(commentsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const comments = Object.keys(data).map(key => ({
          ...data[key],
          id: key
        }));
        callback(comments);
      } else {
        callback([]);
      }
    });
    
    return () => off(commentsRef, 'value', unsubscribe);
  }
}

// Utility functions
export class DatabaseUtils {
  
  // Get user's vote status for posts
  static async getUserVotes(userId: string): Promise<UserVote> {
    try {
      const userVotesRef = ref(rtdb, `userVotes/${userId}`);
      const snapshot = await get(userVotesRef);
      
      return snapshot.exists() ? snapshot.val() : {};
    } catch (error) {
      console.error('Error fetching user votes:', error);
      return {};
    }
  }

  // Get user's bookmarks
  static async getUserBookmarks(userId: string): Promise<string[]> {
    try {
      const bookmarksRef = ref(rtdb, `userBookmarks/${userId}`);
      const snapshot = await get(bookmarksRef);
      
      return snapshot.exists() ? Object.keys(snapshot.val()) : [];
    } catch (error) {
      console.error('Error fetching user bookmarks:', error);
      return [];
    }
  }

  // Get user's communities
  static async getUserCommunities(userId: string): Promise<string[]> {
    try {
      const userCommunitiesRef = ref(rtdb, `userCommunities/${userId}`);
      const snapshot = await get(userCommunitiesRef);
      
      return snapshot.exists() ? Object.keys(snapshot.val()) : [];
    } catch (error) {
      console.error('Error fetching user communities:', error);
      return [];
    }
  }

  // Search posts
  static async searchPosts(searchTerm: string): Promise<Post[]> {
    try {
      // Note: Firebase Realtime Database doesn't have full-text search
      // This is a simple implementation - consider using Algolia or Elasticsearch for production
      const posts = await PostService.getAllPosts(100);
      
      return posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    } catch (error) {
      console.error('Error searching posts:', error);
      return [];
    }
  }
}

export default {
  CommunityService,
  PostService,
  CommentService,
  RealtimeListeners,
  DatabaseUtils
};