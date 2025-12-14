import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Share2, 
  Bookmark,
  Trash2,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PostService } from "@/services/realtimeDB";
import { useAuth } from "@/contexts/Auth";
import { toast } from "sonner";

interface PostProps {
  postId?: string;
  title: string;
  author: string;
  authorId?: string;
  authorAvatar: string;
  community: string;
  timePosted: string;
  content: string;
  likes: number;
  dislikes: number;
  commentCount: number;
  isBookmarked?: boolean;
  imageUrl?: string;
  linkUrl?: string;
  onVote?: (postId: string, voteType: 'like' | 'dislike') => void;
  onBookmark?: (postId: string) => void;
  onDelete?: () => void;
}

const CommunityPost = ({
  postId = "1",
  title,
  author,
  authorId,
  authorAvatar,
  community,
  timePosted,
  content,
  likes,
  dislikes,
  commentCount,
  isBookmarked = false,
  imageUrl,
  linkUrl,
  onVote,
  onBookmark,
  onDelete
}: PostProps) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [currentDislikes, setCurrentDislikes] = useState(dislikes);
  const [isVoting, setIsVoting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);

  // Check if current user owns this post
  const isOwner = currentUser && authorId && currentUser.uid === authorId;

  // Load user's vote status when component mounts
  useEffect(() => {
    const loadUserVote = async () => {
      if (currentUser && postId) {
        try {
          const vote = await PostService.getUserVoteOnPost(postId, currentUser.uid);
          setUserVote(vote);
        } catch (error) {
          console.error('Error loading user vote:', error);
        }
      }
    };

    loadUserVote();
  }, [currentUser, postId]);

  // Update local state when props change
  useEffect(() => {
    setBookmarked(isBookmarked);
    setCurrentLikes(likes);
    setCurrentDislikes(dislikes);
  }, [isBookmarked, likes, dislikes]);

  const handleCommentsClick = () => {
    navigate(`/post/${postId}`);
    window.scrollTo(0, 0);
  };

  const handleVote = async (voteType: 'like' | 'dislike') => {
    if (!currentUser) {
      toast.error('Please login to vote');
      return;
    }

    if (!postId || isVoting) return;

    setIsVoting(true);

    try {
      const previousVote = userVote;
      const newVoteType = previousVote === voteType ? 'remove' : voteType;
      
      // Calculate vote changes
      let likeChange = 0;
      let dislikeChange = 0;

      // Remove previous vote
      if (previousVote === 'like') {
        likeChange = -1;
      } else if (previousVote === 'dislike') {
        dislikeChange = -1;
      }

      // Add new vote
      if (newVoteType === 'like') {
        likeChange += 1;
      } else if (newVoteType === 'dislike') {
        dislikeChange += 1;
      }

      // Optimistic update
      setUserVote(newVoteType === 'remove' ? null : newVoteType);
      setCurrentLikes(prev => Math.max(0, prev + likeChange));
      setCurrentDislikes(prev => Math.max(0, prev + dislikeChange));

      // Send to backend
      await PostService.voteOnPost(postId, currentUser.uid, newVoteType);
      
    } catch (error) {
      console.error('Error voting:', error);
      // Revert on error
      setUserVote(userVote);
      setCurrentLikes(likes);
      setCurrentDislikes(dislikes);
      toast.error('Failed to vote');
    } finally {
      setIsVoting(false);
    }
  };

  const handleBookmark = async () => {
    if (!currentUser) {
      toast.error('Please login to bookmark');
      return;
    }

    if (!postId) return;

    try {
      const newBookmarkStatus = !bookmarked;
      setBookmarked(newBookmarkStatus);

      const actualBookmarkStatus = await PostService.toggleBookmark(currentUser.uid, postId);
      setBookmarked(actualBookmarkStatus);
      
    } catch (error) {
      setBookmarked(bookmarked);
      toast.error('Failed to update bookmark');
    }
  };

  const handleDelete = async () => {
    if (!currentUser || !postId || !isOwner) return;

    const confirmed = window.confirm('Are you sure you want to delete this post? This action cannot be undone.');
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await PostService.deletePost(postId, currentUser.uid);
      toast.success('Post deleted successfully');
      
      if (onDelete) {
        onDelete();
      } else {
        window.location.reload();
      }
    } catch (error: any) {
      console.error('Error deleting post:', error);
      toast.error(error.message || 'Failed to delete post');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}/post/${postId}`;
      
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: content,
          url: shareUrl
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Left side - voting with SEPARATE counts */}
          <div className="flex flex-col items-center space-y-2">
            {/* Like button with count */}
            <div className="flex flex-col items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 rounded-full transition-colors ${
                  userVote === 'like' 
                    ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' 
                    : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => handleVote('like')}
                disabled={!currentUser || isVoting}
                title="Like"
              >
                <ThumbsUp className="h-5 w-5" />
              </Button>
              <span className={`text-sm font-medium mt-1 ${
                userVote === 'like' ? 'text-blue-600' : 'text-gray-700'
              }`}>
                {currentLikes}
              </span>
            </div>

            {/* Divider */}
            <div className="w-8 h-px bg-gray-200"></div>

            {/* Dislike button with count */}
            <div className="flex flex-col items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 rounded-full transition-colors ${
                  userVote === 'dislike' 
                    ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                    : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                }`}
                onClick={() => handleVote('dislike')}
                disabled={!currentUser || isVoting}
                title="Dislike"
              >
                <ThumbsDown className="h-5 w-5" />
              </Button>
              <span className={`text-sm font-medium mt-1 ${
                userVote === 'dislike' ? 'text-red-500' : 'text-gray-700'
              }`}>
                {currentDislikes}
              </span>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span className="bg-finance-light px-2 py-0.5 rounded-full text-finance-primary font-medium">
                  {community}
                </span>
                <span>Posted by u/{author} • {timePosted}</span>
              </div>
              
              {/* Delete button for post owner */}
              {isOwner && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="text-red-600 focus:text-red-600 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {isDeleting ? 'Deleting...' : 'Delete Post'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:text-blue-600" onClick={handleCommentsClick}>
              {title}
            </h3>
            
            <div className="text-gray-700 mb-3 line-clamp-3">
              {content}
            </div>

            {/* Image display */}
            {imageUrl && !imageLoadError && (
              <div className="mb-3 rounded-lg overflow-hidden">
                <img 
                  src={imageUrl} 
                  alt="Post content"
                  className="max-w-full h-auto max-h-96 object-contain cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={handleCommentsClick}
                  onError={() => {
                    console.error('Failed to load image:', imageUrl);
                    setImageLoadError(true);
                  }}
                  loading="lazy"
                />
              </div>
            )}

            {/* Link display */}
            {linkUrl && (
              <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <a 
                  href={linkUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline text-sm break-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  {linkUrl}
                </a>
              </div>
            )}
            
            <div className="flex items-center space-x-2 text-gray-500 text-sm">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 space-x-1 rounded-full hover:bg-gray-100 transition-colors"
                onClick={handleCommentsClick}
              >
                <MessageSquare className="h-4 w-4" />
                <span>{commentCount} Comments</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 space-x-1 rounded-full hover:bg-gray-100 transition-colors"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-8 space-x-1 rounded-full hover:bg-gray-100 transition-colors ${
                  bookmarked ? 'text-blue-600' : ''
                }`}
                onClick={handleBookmark}
                disabled={!currentUser}
              >
                <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
                <span>{bookmarked ? 'Saved' : 'Save'}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPost;