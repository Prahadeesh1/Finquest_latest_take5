// src/hooks/useCommunityData.tsx
import { useState, useEffect, useCallback } from 'react';
import { PostService, Post, Comment, Community } from '@/services/realtimeDB';
import { useAuth } from '@/contexts/Auth';
import { toast } from 'sonner';

export const useCommunityData = (communityId: string) => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [expertPosts, setExpertPosts] = useState<Post[]>([]);
  const [community, setCommunity] = useState<Community | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMember, setIsMember] = useState(false);
  const [stats, setStats] = useState({
    totalPosts: 0,
    postsToday: 0,
    totalComments: 0,
    activeUsers: 0,
    memberCount: 0,
    onlineCount: 0
  });
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentLimit, setCurrentLimit] = useState(20);

  // Calculate community statistics with proper comment counting
  const calculateStats = useCallback(async (allPosts: Post[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const postsToday = allPosts.filter(post => {
      const postDate = new Date(post.createdAt);
      postDate.setHours(0, 0, 0, 0);
      return postDate.getTime() === today.getTime();
    }).length;

    // Get real comment counts for all posts
    let totalComments = 0;
    for (const post of allPosts) {
      try {
        const comments = await PostService.getPostComments(post.id);
        totalComments += comments.length;
        
        // Count replies too
        for (const comment of comments) {
          if (comment.replies) {
            totalComments += Object.keys(comment.replies).length;
          }
        }
      } catch (error) {
        // Fall back to post's comment count if fetching fails
        totalComments += post.commentCount;
      }
    }

    const uniqueAuthors = new Set(allPosts.map(post => post.authorId));
    
    // Get real member count
    const memberCount = await PostService.getCommunityMemberCount(communityId);

    return {
      totalPosts: allPosts.length,
      postsToday,
      totalComments,
      activeUsers: uniqueAuthors.size,
      memberCount,
      onlineCount: Math.floor(memberCount * 0.1) + Math.floor(Math.random() * 5) // Simulate online users
    };
  }, [communityId]);

  // CREATE POST FUNCTION - MISSING FUNCTION #1
  const createPost = useCallback(async (postData: {
    title: string;
    content: string;
    tags?: string[];
    type?: 'text' | 'image' | 'link';
    imageUrl?: string;
    linkUrl?: string;
  }) => {
    if (!currentUser) {
      throw new Error('Must be logged in to create posts');
    }

    try {
      const postId = await PostService.createPost({
        ...postData,
        type: postData.type || 'text', // Provide default value for required field
        tags: postData.tags || [], // Provide default value if needed
        community: communityId,
        authorId: currentUser.uid,
        author: currentUser.displayName || 'Anonymous'
      });
      
      // Refresh posts after creating
      await loadCommunityData(currentLimit);
      return postId;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }, [currentUser, communityId]);

  // VOTE ON POST FUNCTION - MISSING FUNCTION #2
  const voteOnPost = useCallback(async (postId: string, voteType: 'upvote' | 'downvote') => {
    if (!currentUser) {
      throw new Error('Must be logged in to vote');
    }

    try {
      await PostService.voteOnPost(postId, currentUser.uid, voteType);
      // Refresh posts to show updated vote counts
      await loadCommunityData(currentLimit);
    } catch (error) {
      console.error('Error voting on post:', error);
      throw error;
    }
  }, [currentUser, currentLimit]);

  // TOGGLE BOOKMARK FUNCTION - MISSING FUNCTION #3
  const toggleBookmark = useCallback(async (postId: string) => {
    if (!currentUser) {
      throw new Error('Must be logged in to bookmark');
    }

    try {
      const isBookmarked = await PostService.toggleBookmark(currentUser.uid, postId);
      // Refresh posts to show updated bookmark status
      await loadCommunityData(currentLimit);
      return isBookmarked;
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      throw error;
    }
  }, [currentUser, currentLimit]);

  // LOAD MORE POSTS FUNCTION - MISSING FUNCTION #4
  const loadMorePosts = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const newLimit = currentLimit + 20;
      setCurrentLimit(newLimit);
      await loadCommunityData(newLimit, true); // true means append to existing posts
    } catch (error) {
      console.error('Error loading more posts:', error);
      throw error;
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, currentLimit]);

  // Join community
  const joinCommunity = useCallback(async () => {
    if (!currentUser) return;
    
    try {
      await PostService.joinCommunity(currentUser.uid, communityId);
      await PostService.updateOnlineStatus(currentUser.uid, communityId, true);
      setIsMember(true);
      // Refresh community data
      loadCommunityData(currentLimit);
    } catch (error) {
      console.error('Error joining community:', error);
      throw error;
    }
  }, [currentUser, communityId]);

  // Leave community  
  const leaveCommunity = useCallback(async () => {
    if (!currentUser) return;
    
    try {
      await PostService.leaveCommunity(currentUser.uid, communityId);
      setIsMember(false);
      // Refresh community data
      loadCommunityData(currentLimit);
    } catch (error) {
      console.error('Error leaving community:', error);
      throw error;
    }
  }, [currentUser, communityId]);

  // Load community data with proper error handling
  const loadCommunityData = useCallback(async (limit: number = 20, append: boolean = false) => {
    try {
      if (!append) {
        setLoading(true);
        setError(null);
      } else {
        setLoadingMore(true);
      }

      const [communityData, allPosts, expertPostsData] = await Promise.all([
        PostService.getCommunity(communityId),
        PostService.getPostsByCommunity(communityId, limit),
        PostService.getExpertPostsByCommunity(communityId)
      ]);

      setCommunity(communityData);
      
      if (append) {
        setPosts(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          const newPosts = allPosts.filter(p => !existingIds.has(p.id));
          return [...prev, ...newPosts];
        });
        setHasMore(allPosts.length === limit);
      } else {
        setPosts(allPosts);
        setHasMore(allPosts.length === limit);
      }
      
      setExpertPosts(expertPostsData);

      // Calculate real statistics
      const statsData = await calculateStats(allPosts);
      setStats(statsData);

      // Check if user is member (simplified)
      if (currentUser) {
        const memberStatus = await PostService.isUserMember(currentUser.uid, communityId);
        setIsMember(memberStatus);
      }

    } catch (err) {
      console.error('Error loading community data:', err);
      setError('Failed to load community data');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [communityId, calculateStats, currentUser]);

  // Remove the complex online status useEffect
  useEffect(() => {
    loadCommunityData();
  }, [loadCommunityData]);

  return {
    posts,
    expertPosts,
    community,
    stats,
    loading,
    loadingMore,
    hasMore,
    error,
    isMember,
    createPost,        // ✅ NOW DEFINED
    voteOnPost,        // ✅ NOW DEFINED  
    toggleBookmark,    // ✅ NOW DEFINED
    loadMorePosts,     // ✅ NOW DEFINED
    joinCommunity,
    leaveCommunity,
    refreshData: () => loadCommunityData(currentLimit)
  };
};