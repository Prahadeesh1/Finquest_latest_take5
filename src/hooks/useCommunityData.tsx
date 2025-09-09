// src/hooks/useCommunityData.ts
import { useState, useEffect, useCallback } from 'react';
import { PostService, Post, Comment, Community } from '@/services/realtimeDB';
import { useAuth } from '@/contexts/Auth';

export const useCommunityData = (communityId: string) => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [expertPosts, setExpertPosts] = useState<Post[]>([]);
  const [community, setCommunity] = useState<Community | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalPosts: 0,
    postsToday: 0,
    totalComments: 0,
    activeUsers: 0
  });
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentLimit, setCurrentLimit] = useState(20);

  // Calculate community statistics
  const calculateStats = useCallback((allPosts: Post[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const postsToday = allPosts.filter(post => {
      const postDate = new Date(post.createdAt);
      postDate.setHours(0, 0, 0, 0);
      return postDate.getTime() === today.getTime();
    }).length;

    const totalComments = allPosts.reduce((sum, post) => sum + post.commentCount, 0);
    const uniqueAuthors = new Set(allPosts.map(post => post.authorId));

    return {
      totalPosts: allPosts.length,
      postsToday,
      totalComments,
      activeUsers: uniqueAuthors.size
    };
  }, []);

  // Load community data
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
      const statsData = calculateStats(allPosts);
      setStats(statsData);

    } catch (err) {
      console.error('Error loading community data:', err);
      setError('Failed to load community data');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [communityId, calculateStats]);

  // Load more posts
  const loadMorePosts = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    
    const newLimit = currentLimit + 20;
    setCurrentLimit(newLimit);
    await loadCommunityData(newLimit, true);
  }, [currentLimit, loadingMore, hasMore, loadCommunityData]);

  // Create new post
  const createPost = useCallback(async (postData: {
    title: string;
    content: string;
    type: 'text' | 'image' | 'link';
    tags: string[];
    imageUrl?: string;
    linkUrl?: string;
  }) => {
    if (!currentUser) throw new Error('Must be logged in to create posts');

    try {
      const postId = await PostService.createPost({
        ...postData,
        author: currentUser.displayName || 'Anonymous',
        authorId: currentUser.uid,
        community: communityId
      });

      // Refresh posts to show new post
      await loadCommunityData(currentLimit);
      return postId;
    } catch (err) {
      console.error('Error creating post:', err);
      throw err;
    }
  }, [currentUser, communityId, loadCommunityData, currentLimit]);

  // Vote on post
  const voteOnPost = useCallback(async (postId: string, voteType: 'upvote' | 'downvote' | 'remove') => {
    if (!currentUser) throw new Error('Must be logged in to vote');

    try {
      await PostService.voteOnPost(postId, currentUser.uid, voteType);
      // Refresh posts to show updated vote counts
      await loadCommunityData(currentLimit);
    } catch (err) {
      console.error('Error voting on post:', err);
      throw err;
    }
  }, [currentUser, loadCommunityData, currentLimit]);

  // Toggle bookmark
  const toggleBookmark = useCallback(async (postId: string) => {
    if (!currentUser) throw new Error('Must be logged in to bookmark');

    try {
      const isBookmarked = await PostService.toggleBookmark(currentUser.uid, postId);
      // Update local state
      setPosts(prev => prev.map(post => 
        post.id === postId ? { ...post, isBookmarked } : post
      ));
      setExpertPosts(prev => prev.map(post => 
        post.id === postId ? { ...post, isBookmarked } : post
      ));
      return isBookmarked;
    } catch (err) {
      console.error('Error toggling bookmark:', err);
      throw err;
    }
  }, [currentUser]);

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
    createPost,
    voteOnPost,
    toggleBookmark,
    loadMorePosts,
    refreshData: () => loadCommunityData(currentLimit)
  };
};