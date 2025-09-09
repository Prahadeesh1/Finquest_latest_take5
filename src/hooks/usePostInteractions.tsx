// src/hooks/usePostInteractions.ts
import { useState, useEffect, useCallback } from 'react';
import { PostService } from '@/services/realtimeDB';
import { useAuth } from '@/contexts/Auth';
import { toast } from 'sonner';

export const usePostInteractions = (postId: string) => {
  const { currentUser } = useAuth();
  const [userVote, setUserVote] = useState<'upvote' | 'downvote' | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user interactions when component mounts
  useEffect(() => {
    const loadUserInteractions = async () => {
      if (!currentUser || !postId) {
        setLoading(false);
        return;
      }

      try {
        const [vote, bookmarks] = await Promise.all([
          PostService.getUserVoteOnPost(postId, currentUser.uid),
          PostService.getUserBookmarks(currentUser.uid)
        ]);

        setUserVote(vote);
        setIsBookmarked(bookmarks.includes(postId));
      } catch (error) {
        console.error('Error loading user interactions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserInteractions();
  }, [currentUser, postId]);

  const vote = useCallback(async (voteType: 'upvote' | 'downvote') => {
    if (!currentUser) {
      toast.error('Please login to vote');
      return false;
    }

    try {
      const newVoteType = userVote === voteType ? 'remove' : voteType;
      await PostService.voteOnPost(postId, currentUser.uid, newVoteType);
      setUserVote(newVoteType === 'remove' ? null : newVoteType);
      return true;
    } catch (error) {
      console.error('Error voting:', error);
      toast.error(`Failed to ${voteType} post`);
      return false;
    }
  }, [currentUser, postId, userVote]);

  const toggleBookmark = useCallback(async () => {
    if (!currentUser) {
      toast.error('Please login to bookmark');
      return false;
    }

    try {
      const newBookmarkStatus = await PostService.toggleBookmark(currentUser.uid, postId);
      setIsBookmarked(newBookmarkStatus);
      toast.success(newBookmarkStatus ? 'Post bookmarked!' : 'Bookmark removed!');
      return newBookmarkStatus;
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast.error('Failed to update bookmark');
      return isBookmarked;
    }
  }, [currentUser, postId, isBookmarked]);

  return {
    userVote,
    isBookmarked,
    loading,
    vote,
    toggleBookmark
  };
};