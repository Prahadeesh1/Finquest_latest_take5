// src/hooks/useComments.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import { PostService, Comment, Reply } from '@/services/realtimeDB';
import { useAuth } from '@/contexts/Auth';

export const useComments = (postId: string) => {
  const { currentUser, userData } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userVotes, setUserVotes] = useState<Record<string, 'upvote' | 'downvote'>>({});
  
  // Prevent race conditions
  const isMountedRef = useRef(true);
  const loadingRef = useRef(false);

  // Load user votes separately
  const loadUserVotes = useCallback(async (commentIds: string[]) => {
    if (!currentUser || commentIds.length === 0) return;
    
    try {
      const votePromises = commentIds.map(commentId => 
        PostService.getUserVoteOnComment(commentId, currentUser.uid)
      );
      const votes = await Promise.all(votePromises);
      
      const voteMap: Record<string, 'upvote' | 'downvote'> = {};
      commentIds.forEach((commentId, index) => {
        if (votes[index]) {
          voteMap[commentId] = votes[index]!;
        }
      });
      
      if (isMountedRef.current) {
        setUserVotes(voteMap);
      }
    } catch (err) {
      console.error('Error loading user votes:', err);
    }
  }, [currentUser]);

  // Add new comment
  const addComment = useCallback(async (content: string) => {
    if (!currentUser || !userData) throw new Error('Must be logged in to comment');
    if (!content.trim()) throw new Error('Comment cannot be empty');

    try {
      await PostService.addComment(postId, {
        postId,
        author: currentUser.displayName || userData.firstName + ' ' + userData.lastName,
        authorId: currentUser.uid,
        content: content.trim()
      });
      // Real-time listener will update comments
    } catch (err) {
      console.error('Error adding comment:', err);
      throw err;
    }
  }, [currentUser, userData, postId]);

  // Add reply to comment
  const addReply = useCallback(async (commentId: string, content: string) => {
    if (!currentUser || !userData) throw new Error('Must be logged in to reply');
    if (!content.trim()) throw new Error('Reply cannot be empty');

    try {
      await PostService.addReply(postId, commentId, {
        commentId,
        author: currentUser.displayName || userData.firstName + ' ' + userData.lastName,
        authorId: currentUser.uid,
        content: content.trim()
      });
      // Real-time listener will update comments
    } catch (err) {
      console.error('Error adding reply:', err);
      throw err;
    }
  }, [currentUser, userData, postId]);

  // Vote on comment with optimistic updates
  const voteOnComment = useCallback(async (commentId: string, voteType: 'upvote' | 'downvote') => {
    if (!currentUser) throw new Error('Must be logged in to vote');

    const currentVote = userVotes[commentId];
    const newVoteType = currentVote === voteType ? 'remove' : voteType;
    
    // Optimistic update
    setUserVotes(prev => {
      const newVotes = { ...prev };
      if (newVoteType === 'remove') {
        delete newVotes[commentId];
      } else {
        newVotes[commentId] = newVoteType;
      }
      return newVotes;
    });

    try {
      await PostService.voteOnComment(postId, commentId, currentUser.uid, newVoteType);
      // Real-time listener will update vote counts
    } catch (err) {
      // Revert on error
      setUserVotes(prev => {
        const newVotes = { ...prev };
        if (currentVote) {
          newVotes[commentId] = currentVote;
        } else {
          delete newVotes[commentId];
        }
        return newVotes;
      });
      console.error('Error voting on comment:', err);
      throw err;
    }
  }, [currentUser, postId, userVotes]);

  // Vote on reply
  const voteOnReply = useCallback(async (commentId: string, replyId: string, voteType: 'upvote' | 'downvote') => {
    if (!currentUser) throw new Error('Must be logged in to vote');

    try {
      await PostService.voteOnReply(postId, commentId, replyId, currentUser.uid, voteType);
      // Real-time listener will update
    } catch (err) {
      console.error('Error voting on reply:', err);
      throw err;
    }
  }, [currentUser, postId]);

  // Set up real-time listener for comments
  useEffect(() => {
    isMountedRef.current = true;
    setLoading(true);

    const unsubscribe = PostService.subscribeToComments(postId, (updatedComments) => {
      if (!isMountedRef.current) return;
      
      // Sort comments
      updatedComments.sort((a, b) => {
        if (b.upvotes !== a.upvotes) {
          return b.upvotes - a.upvotes;
        }
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
      
      setComments(updatedComments);
      setLoading(false);
      
      // Load user votes for new comments
      const commentIds = updatedComments.map(c => c.id);
      loadUserVotes(commentIds);
    });

    return () => {
      isMountedRef.current = false;
      unsubscribe();
    };
  }, [postId, loadUserVotes]);

  return {
    comments,
    loading,
    error,
    userVotes,
    addComment,
    addReply,
    voteOnComment,
    voteOnReply,
    refreshComments: () => {} // No longer needed with real-time
  };
};