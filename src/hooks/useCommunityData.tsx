// src/hooks/useCommunityData.tsx
import { useState, useEffect, useCallback, useRef } from 'react';
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

  const isMountedRef = useRef(true);
  const loadingRef = useRef(false);

  // Calculate community statistics
  const calculateStats = useCallback(async (allPosts: Post[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const postsToday = allPosts.filter(post => {
      const postDate = new Date(post.createdAt);
      postDate.setHours(0, 0, 0, 0);
      return postDate.getTime() === today.getTime();
    }).length;

    // Get real comment counts
    let totalComments = 0;
    for (const post of allPosts) {
      try {
        const comments = await PostService.getPostComments(post.id);
        totalComments += comments.length;
        
        for (const comment of comments) {
          if (comment.replies) {
            totalComments += Object.keys(comment.replies).length;
          }
        }
      } catch (error) {
        totalComments += post.commentCount || 0;
      }
    }

    const uniqueAuthors = new Set(allPosts.map(post => post.authorId));
    
    const [memberCount, onlineCount] = await Promise.all([
      PostService.getCommunityMemberCount(communityId),
      PostService.getOnlineCount(communityId)
    ]);

    return {
      totalPosts: allPosts.length,
      postsToday,
      totalComments,
      activeUsers: uniqueAuthors.size,
      memberCount,
      onlineCount
    };
  }, [communityId]);

  // CREATE POST FUNCTION
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
        type: postData.type || 'text',
        tags: postData.tags || [],
        community: communityId,
        authorId: currentUser.uid,
        author: currentUser.displayName || 'Anonymous'
      });
      
      // Reload data after creating post
      await loadCommunityData(currentLimit);
      return postId;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }, [currentUser, communityId, currentLimit]);

  // VOTE ON POST FUNCTION - No longer needed to reload all data
  const voteOnPost = useCallback(async (postId: string, voteType: 'upvote' | 'downvote') => {
    if (!currentUser) {
      throw new Error('Must be logged in to vote');
    }

    try {
      await PostService.voteOnPost(postId, currentUser.uid, voteType);
      // Real-time listeners in CommunityPost will handle updates
    } catch (error) {
      console.error('Error voting on post:', error);
      throw error;
    }
  }, [currentUser]);

  // TOGGLE BOOKMARK FUNCTION
  const toggleBookmark = useCallback(async (postId: string) => {
    if (!currentUser) {
      throw new Error('Must be logged in to bookmark');
    }

    try {
      const isBookmarked = await PostService.toggleBookmark(currentUser.uid, postId);
      return isBookmarked;
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      throw error;
    }
  }, [currentUser]);

  // LOAD MORE POSTS FUNCTION
  const loadMorePosts = useCallback(async () => {
    if (loadingMore || !hasMore || loadingRef.current) return;

    loadingRef.current = true;
    setLoadingMore(true);
    
    try {
      const newLimit = currentLimit + 20;
      setCurrentLimit(newLimit);
      await loadCommunityData(newLimit, true);
    } catch (error) {
      console.error('Error loading more posts:', error);
      throw error;
    } finally {
      setLoadingMore(false);
      loadingRef.current = false;
    }
  }, [loadingMore, hasMore, currentLimit]);

  // Join community
  const joinCommunity = useCallback(async () => {
    if (!currentUser) return;
    
    try {
      await PostService.joinCommunity(currentUser.uid, communityId);
      await PostService.updateOnlineStatus(currentUser.uid, communityId, true);
      setIsMember(true);
      
      // Refresh member count
      const memberCount = await PostService.getCommunityMemberCount(communityId);
      setStats(prev => ({ ...prev, memberCount }));
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
      await PostService.updateOnlineStatus(currentUser.uid, communityId, false);
      setIsMember(false);
      
      // Refresh member count
      const memberCount = await PostService.getCommunityMemberCount(communityId);
      setStats(prev => ({ ...prev, memberCount }));
    } catch (error) {
      console.error('Error leaving community:', error);
      throw error;
    }
  }, [currentUser, communityId]);

  // Load community data
  const loadCommunityData = useCallback(async (limit: number = 20, append: boolean = false) => {
    if (loadingRef.current) return;
    
    try {
      loadingRef.current = true;
      
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

      if (!isMountedRef.current) return;

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

      // Calculate statistics
      const statsData = await calculateStats(allPosts);
      setStats(statsData);

      // Check membership status
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
      loadingRef.current = false;
    }
  }, [communityId, calculateStats, currentUser]);

  // Set user as online when visiting community page
  useEffect(() => {
    isMountedRef.current = true;

    if (currentUser && isMember) {
      PostService.updateOnlineStatus(currentUser.uid, communityId, true);

      return () => {
        PostService.updateOnlineStatus(currentUser.uid, communityId, false);
      };
    }
  }, [currentUser, communityId, isMember]);

  // Initial load
  useEffect(() => {
    loadCommunityData();

    return () => {
      isMountedRef.current = false;
    };
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
    createPost,
    voteOnPost,
    toggleBookmark,
    loadMorePosts,
    joinCommunity,
    leaveCommunity,
    refreshData: () => loadCommunityData(currentLimit)
  };
};