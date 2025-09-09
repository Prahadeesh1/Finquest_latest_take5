// src/hooks/useComments.ts
import { useState, useEffect, useCallback } from 'react';
import { PostService, Comment, Reply } from '@/services/realtimeDB';
import { useAuth } from '@/contexts/Auth';

export const useComments = (postId: string) => {
  const { currentUser, userData } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userVotes, setUserVotes] = useState<Record<string, 'upvote' | 'downvote'>>({});

  // Load comments and user votes
  const loadComments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const commentsData = await PostService.getPostComments(postId);
      setComments(commentsData);

      // Load user votes for comments if user is logged in
      if (currentUser && commentsData.length > 0) {
        const votePromises = commentsData.map(comment => 
          PostService.getUserVoteOnComment(comment.id, currentUser.uid)
        );
        const votes = await Promise.all(votePromises);
        
        const voteMap: Record<string, 'upvote' | 'downvote'> = {};
        commentsData.forEach((comment, index) => {
          if (votes[index]) {
            voteMap[comment.id] = votes[index]!;
          }
        });
        setUserVotes(voteMap);
      }
    } catch (err) {
      console.error('Error loading comments:', err);
      setError('Failed to load comments');
    } finally {
      setLoading(false);
    }
  }, [postId, currentUser]);

  // Add new comment
  const addComment = useCallback(async (content: string) => {
    if (!currentUser || !userData) throw new Error('Must be logged in to comment');
    if (!content.trim()) throw new Error('Comment cannot be empty');

    try {
      const commentId = await PostService.addComment(postId, {
        postId,
        author: currentUser.displayName || userData.firstName + ' ' + userData.lastName,
        authorId: currentUser.uid,
        content: content.trim()
      });

      // Refresh comments
      await loadComments();
      return commentId;
    } catch (err) {
      console.error('Error adding comment:', err);
      throw err;
    }
  }, [currentUser, userData, postId, loadComments]);

  // Add reply to comment
  const addReply = useCallback(async (commentId: string, content: string) => {
    if (!currentUser || !userData) throw new Error('Must be logged in to reply');
    if (!content.trim()) throw new Error('Reply cannot be empty');

    try {
      const replyId = await PostService.addReply(postId, commentId, {
        commentId,
        author: currentUser.displayName || userData.firstName + ' ' + userData.lastName,
        authorId: currentUser.uid,
        content: content.trim()
      });

      // Refresh comments to show new reply
      await loadComments();
      return replyId;
    } catch (err) {
      console.error('Error adding reply:', err);
      throw err;
    }
  }, [currentUser, userData, postId, loadComments]);

  // Vote on comment
  const voteOnComment = useCallback(async (commentId: string, voteType: 'upvote' | 'downvote') => {
    if (!currentUser) throw new Error('Must be logged in to vote');

    try {
      const currentVote = userVotes[commentId];
      const newVoteType = currentVote === voteType ? 'remove' : voteType;
      
      await PostService.voteOnComment(postId, commentId, currentUser.uid, newVoteType);
      
      // Update local vote state
      setUserVotes(prev => {
        const newVotes = { ...prev };
        if (newVoteType === 'remove') {
          delete newVotes[commentId];
        } else {
          newVotes[commentId] = newVoteType;
        }
        return newVotes;
      });

      // Refresh comments to show updated vote counts
      await loadComments();
    } catch (err) {
      console.error('Error voting on comment:', err);
      throw err;
    }
  }, [currentUser, postId, userVotes, loadComments]);

  // Vote on reply
  const voteOnReply = useCallback(async (commentId: string, replyId: string, voteType: 'upvote' | 'downvote') => {
    if (!currentUser) throw new Error('Must be logged in to vote');

    try {
      await PostService.voteOnReply(postId, commentId, replyId, currentUser.uid, voteType);
      // Refresh comments to show updated vote counts
      await loadComments();
    } catch (err) {
      console.error('Error voting on reply:', err);
      throw err;
    }
  }, [currentUser, postId, loadComments]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  // Set up real-time listener for comments
  useEffect(() => {
    const unsubscribe = PostService.subscribeToComments(postId, (updatedComments) => {
      setComments(updatedComments);
      setLoading(false);
    });

    return unsubscribe;
  }, [postId]);

  return {
    comments,
    loading,
    error,
    userVotes,
    addComment,
    addReply,
    voteOnComment,
    voteOnReply,
    refreshComments: loadComments
  };
};