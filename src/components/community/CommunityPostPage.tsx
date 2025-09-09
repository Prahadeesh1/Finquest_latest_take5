import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useComments } from "@/hooks/useComments";
import { PostService, Post, Comment as ServiceComment } from "@/services/realtimeDB";
import { useAuth } from "@/contexts/Auth";
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Share2, 
  Bookmark,
  ArrowLeft,
  Send,
  Reply,
  ChevronDown,
  ChevronUp,
  Loader
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Local interface for display purposes
interface DisplayComment {
  id: string;
  author: string;
  content: string;
  timePosted: string;
  upvotes: number;
  downvotes: number;
  replies?: { [key: string]: DisplayComment };
}

const CommentItem = ({ 
  comment, 
  postId,
  isReply = false, 
  voteOnComment, 
  voteOnReply, 
  addReply, 
  commentUserVotes,
  currentUser 
}: { 
  comment: DisplayComment; 
  postId: string;
  isReply?: boolean;
  voteOnComment: (commentId: string, voteType: 'upvote' | 'downvote') => Promise<void>;
  voteOnReply: (commentId: string, replyId: string, voteType: 'upvote' | 'downvote') => Promise<void>;
  addReply: (commentId: string, content: string) => Promise<string>;
  commentUserVotes: Record<string, 'upvote' | 'downvote'>;
  currentUser: any;
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const handleVoteOnComment = async (voteType: 'upvote' | 'downvote') => {
    if (!currentUser) {
      toast.error('Please login to vote');
      return;
    }

    try {
      if (isReply) {
        toast.info('Reply voting not implemented yet');
      } else {
        await voteOnComment(comment.id, voteType);
      }
    } catch (error) {
      toast.error('Failed to vote');
    }
  };

  const handleAddReply = async () => {
    if (!currentUser) {
      toast.error('Please login to reply');
      return;
    }

    if (!replyText.trim()) {
      toast.error('Reply cannot be empty');
      return;
    }

    setIsSubmittingReply(true);
    try {
      await addReply(comment.id, replyText);
      setReplyText("");
      setShowReplyBox(false);
      toast.success('Reply added successfully!');
    } catch (error) {
      toast.error('Failed to add reply');
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const commentVote = commentUserVotes[comment.id];
  const replies = comment.replies ? Object.values(comment.replies) : [];

  return (
    <div className={`${isReply ? 'ml-8 border-l-2 border-gray-100 pl-4' : ''}`}>
      <div className="flex items-start gap-3 py-4">
        <div className="flex flex-col items-center space-y-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-6 w-6 rounded-full hover:bg-blue-50 ${
              commentVote === 'upvote' ? 'text-blue-500 bg-blue-50' : 'text-gray-400 hover:text-blue-500'
            }`}
            onClick={() => handleVoteOnComment('upvote')}
          >
            <ThumbsUp className="h-3 w-3" />
          </Button>
          <span className="text-xs font-medium text-gray-600">{comment.upvotes}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-6 w-6 rounded-full hover:bg-red-50 ${
              commentVote === 'downvote' ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500'
            }`}
            onClick={() => handleVoteOnComment('downvote')}
          >
            <ThumbsDown className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
            <span className="font-medium text-gray-700">u/{comment.author}</span>
            <span>•</span>
            <span>{comment.timePosted}</span>
          </div>
          
          <div className="text-sm text-gray-800 mb-3 leading-relaxed">
            {comment.content}
          </div>
          
          <div className="flex items-center space-x-3 text-xs">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-gray-500 hover:bg-gray-100 rounded-full"
              onClick={() => setShowReplyBox(!showReplyBox)}
            >
              <Reply className="h-3 w-3 mr-1" />
              Reply
            </Button>
            
            {replies.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 px-2 text-gray-500 hover:bg-gray-100 rounded-full"
                onClick={() => setShowReplies(!showReplies)}
              >
                {showReplies ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
                {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
              </Button>
            )}
          </div>
          
          {showReplyBox && (
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                placeholder="Write a reply..."
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddReply()}
              />
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleAddReply}
                disabled={isSubmittingReply || !replyText.trim()}
              >
                {isSubmittingReply ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          )}
          
          {showReplies && replies.length > 0 && (
            <div className="mt-4">
              {replies.map((reply) => (
                <CommentItem 
                  key={reply.id} 
                  comment={reply} 
                  postId={postId}
                  isReply={true}
                  voteOnComment={voteOnComment}
                  voteOnReply={voteOnReply}
                  addReply={addReply}
                  commentUserVotes={commentUserVotes}
                  currentUser={currentUser}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PostDetailPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();
  
  const [post, setPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [postVoteState, setPostVoteState] = useState<'upvote' | 'downvote' | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
    userVotes: commentVotes,
    addComment,
    addReply,
    voteOnComment,
    voteOnReply
  } = useComments(postId || "");

  // Load post data
  useEffect(() => {
    const loadPostData = async () => {
      if (!postId) {
        setLoading(false);
        return;
      }

      try {
        const postData = await PostService.getPostById(postId);
        if (postData) {
          setPost(postData);
          
          if (currentUser) {
            // Load user's vote and bookmark status
            const [vote, bookmarkStatus] = await Promise.all([
              PostService.getUserVoteOnPost(postId, currentUser.uid),
              PostService.getUserBookmarks(currentUser.uid)
            ]);
            
            setPostVoteState(vote);
            setIsBookmarked(bookmarkStatus.includes(postId));
          }
        } else {
          // Use fallback data from navigation state
          const fallbackData = location.state;
          if (fallbackData) {
            setPost({
              id: postId,
              title: fallbackData.title,
              content: fallbackData.content,
              author: fallbackData.author,
              authorId: "unknown",
              community: fallbackData.community,
              type: 'text',
              upvotes: fallbackData.upvotes || 0,
              downvotes: 0,
              commentCount: fallbackData.commentCount || 0,
              tags: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              isBookmarked: fallbackData.isBookmarked || false
            });
          }
        }
      } catch (error) {
        console.error('Error loading post:', error);
        toast.error('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    loadPostData();
  }, [postId, currentUser, location.state]);

  const handleVoteOnPost = async (voteType: 'upvote' | 'downvote') => {
    if (!currentUser || !post) {
      toast.error('Please login to vote');
      return;
    }

    try {
      const newVoteType = postVoteState === voteType ? 'remove' : voteType;
      await PostService.voteOnPost(post.id, currentUser.uid, newVoteType);
      
      // Update local state
      setPostVoteState(newVoteType === 'remove' ? null : newVoteType);
      
      // Refresh post data
      const updatedPost = await PostService.getPostById(post.id);
      if (updatedPost) {
        setPost(updatedPost);
      }
      
      toast.success(`Post ${voteType}d successfully!`);
    } catch (error) {
      toast.error(`Failed to ${voteType} post`);
    }
  };

  const handleBookmark = async () => {
    if (!currentUser || !post) {
      toast.error('Please login to bookmark');
      return;
    }

    try {
      const newBookmarkStatus = await PostService.toggleBookmark(currentUser.uid, post.id);
      setIsBookmarked(newBookmarkStatus);
      toast.success(newBookmarkStatus ? 'Post bookmarked!' : 'Bookmark removed!');
    } catch (error) {
      toast.error('Failed to update bookmark');
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    setIsSubmittingComment(true);
    try {
      await addComment(newComment);
      setNewComment("");
      toast.success('Comment added successfully!');
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading post...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Post not found</p>
            <Button onClick={handleGoBack}>Go Back</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={handleGoBack}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Community
            </Button>
          </div>

          {/* Main Post */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
            <div className="p-6">
              <div className="flex items-start gap-4">
                {/* Voting Section */}
                <div className="flex flex-col items-center space-y-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`h-10 w-10 rounded-full hover:bg-blue-50 ${
                      postVoteState === 'upvote' ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-blue-600'
                    }`}
                    onClick={() => handleVoteOnPost('upvote')}
                  >
                    <ThumbsUp className="h-5 w-5" />
                  </Button>
                  <span className="text-lg font-semibold text-gray-700">{post.upvotes}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`h-10 w-10 rounded-full hover:bg-red-50 ${
                      postVoteState === 'downvote' ? 'text-red-500 bg-red-50' : 'text-gray-500 hover:text-red-500'
                    }`}
                    onClick={() => handleVoteOnPost('downvote')}
                  >
                    <ThumbsDown className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Post Content */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                    <span className="bg-blue-100 px-3 py-1 rounded-full text-blue-700 font-medium text-xs">
                      {post.community}
                    </span>
                    <span>Posted by u/{post.author} • {new Date(post.createdAt).toLocaleString()}</span>
                  </div>
                  
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
                  
                  <div className="text-gray-700 mb-6 leading-relaxed">
                    {post.content}
                  </div>

                  {/* Image display for image posts */}
                  {post.type === 'image' && post.imageUrl && (
                    <div className="mb-6">
                      <img 
                        src={post.imageUrl} 
                        alt="Post image" 
                        className="max-w-full h-auto rounded-lg"
                      />
                    </div>
                  )}

                  {/* Link display for link posts */}
                  {post.type === 'link' && post.linkUrl && (
                    <div className="mb-6">
                      <a 
                        href={post.linkUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {post.linkUrl}
                      </a>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4 text-gray-500 text-sm">
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{comments.length} Comments</span>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="h-8 space-x-1 rounded-full hover:bg-gray-100">
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`h-8 space-x-1 rounded-full hover:bg-gray-100 ${isBookmarked ? 'text-blue-600' : ''}`}
                      onClick={handleBookmark}
                    >
                      <Bookmark className="h-4 w-4" />
                      <span>{isBookmarked ? 'Saved' : 'Save'}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add Comment Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6 p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center">
                {userData ? (
                  <span className="text-sm font-medium text-gray-600">
                    {userData.firstName?.[0]}{userData.lastName?.[0]}
                  </span>
                ) : (
                  <span className="text-sm font-medium text-gray-600">?</span>
                )}
              </div>
              <div className="flex-1">
                <textarea
                  placeholder={currentUser ? "What are your thoughts?" : "Please login to comment"}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  disabled={!currentUser || isSubmittingComment}
                />
                <div className="flex justify-end mt-2">
                  <Button 
                    onClick={handleAddComment}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={!currentUser || !newComment.trim() || isSubmittingComment}
                  >
                    {isSubmittingComment ? (
                      <div className="flex items-center space-x-2">
                        <Loader className="h-4 w-4 animate-spin" />
                        <span>Posting...</span>
                      </div>
                    ) : (
                      'Comment'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                Comments ({comments.length})
              </h2>
            </div>
            
            {commentsLoading ? (
              <div className="p-8 text-center">
                <Loader className="animate-spin h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-gray-500">Loading comments...</p>
              </div>
            ) : commentsError ? (
              <div className="p-8 text-center">
                <p className="text-red-500">{commentsError}</p>
              </div>
            ) : comments.length === 0 ? (
              <div className="p-8 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {comments.map((comment) => {
                  // Convert service comment to display comment format
                  const displayComment: DisplayComment = {
                    id: comment.id,
                    author: comment.author,
                    content: comment.content,
                    timePosted: new Date(comment.createdAt).toLocaleString(),
                    upvotes: comment.upvotes,
                    downvotes: comment.downvotes,
                    replies: comment.replies ? 
                      Object.fromEntries(
                        Object.entries(comment.replies).map(([key, reply]) => [
                          key, {
                            id: reply.id,
                            author: reply.author,
                            content: reply.content,
                            timePosted: new Date(reply.createdAt).toLocaleString(),
                            upvotes: reply.upvotes,
                            downvotes: reply.downvotes
                          }
                        ])
                      ) : undefined
                  };

                  return (
                    <CommentItem 
                      key={comment.id} 
                      comment={displayComment}
                      postId={post.id}
                      voteOnComment={voteOnComment}
                      voteOnReply={voteOnReply}
                      addReply={addReply}
                      commentUserVotes={commentVotes}
                      currentUser={currentUser}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PostDetailPage;