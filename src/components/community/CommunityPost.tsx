import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Share2, 
  Bookmark,
  ExternalLink 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostService } from "@/services/realtimeDB";
import { useAuth } from "@/contexts/Auth";
import { toast } from "sonner";

interface PostProps {
  postId?: string;
  title: string;
  author: string;
  authorAvatar: string;
  community: string;
  timePosted: string;
  content: string;
  upvotes: number;
  downvotes?: number;
  commentCount: number;
  isBookmarked?: boolean;
  postType?: 'text' | 'image' | 'link';
  imageUrl?: string;
  linkUrl?: string;
  onVote?: (postId: string, voteType: 'upvote' | 'downvote') => void;
  onBookmark?: (postId: string) => void;
}

const CommunityPost = ({
  postId = "1",
  title,
  author,
  authorAvatar,
  community,
  timePosted,
  content,
  upvotes,
  downvotes = 0,
  commentCount,
  isBookmarked = false,
  postType = 'text',
  imageUrl,
  linkUrl,
  onVote,
  onBookmark
}: PostProps) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [userVote, setUserVote] = useState<'upvote' | 'downvote' | null>(null);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);
  const [currentDownvotes, setCurrentDownvotes] = useState(downvotes);
  const [isVoting, setIsVoting] = useState(false);
  const [imageError, setImageError] = useState(false);

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
    setCurrentUpvotes(upvotes);
    setCurrentDownvotes(downvotes);
  }, [isBookmarked, upvotes, downvotes]);

  const handleCommentsClick = () => {
    navigate(`/post/${postId}`, {
      state: {
        title,
        author,
        authorAvatar,
        community,
        timePosted,
        content,
        upvotes: currentUpvotes,
        downvotes: currentDownvotes,
        commentCount,
        isBookmarked: bookmarked,
        postType,
        imageUrl,
        linkUrl
      }
    });
    window.scrollTo(0, 0);
  };

  const handleVote = async (voteType: 'upvote' | 'downvote') => {
    if (!currentUser) {
      toast.error('Please login to vote');
      return;
    }

    if (!postId || isVoting) return;

    setIsVoting(true);

    try {
      const previousVote = userVote;
      const newVoteType = previousVote === voteType ? 'remove' : voteType;
      
      let upvoteChange = 0;
      let downvoteChange = 0;

      if (previousVote === 'upvote') {
        upvoteChange = -1;
      } else if (previousVote === 'downvote') {
        downvoteChange = -1;
      }

      if (newVoteType === 'upvote') {
        upvoteChange += 1;
      } else if (newVoteType === 'downvote') {
        downvoteChange += 1;
      }

      setUserVote(newVoteType === 'remove' ? null : newVoteType);
      setCurrentUpvotes(prev => Math.max(0, prev + upvoteChange));
      setCurrentDownvotes(prev => Math.max(0, prev + downvoteChange));

      await PostService.voteOnPost(postId, currentUser.uid, newVoteType);
      
    } catch (error) {
      console.error('Error voting:', error);
      setUserVote(userVote);
      setCurrentUpvotes(upvotes);
      setCurrentDownvotes(downvotes);
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

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: content,
          url: window.location.origin + `/post/${postId}`
        });
      } else {
        await navigator.clipboard.writeText(window.location.origin + `/post/${postId}`);
        toast.success('Link copied!');
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Left side - voting */}
          <div className="flex flex-col items-center space-y-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-8 w-8 rounded-full transition-colors ${
                userVote === 'upvote' 
                  ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' 
                  : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
              }`}
              onClick={() => handleVote('upvote')}
              disabled={!currentUser || isVoting}
            >
              <ThumbsUp className="h-5 w-5" />
            </Button>
            <span className="text-sm font-medium text-gray-700">{currentUpvotes}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-8 w-8 rounded-full transition-colors ${
                userVote === 'downvote' 
                  ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                  : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
              }`}
              onClick={() => handleVote('downvote')}
              disabled={!currentUser || isVoting}
            >
              <ThumbsDown className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <div className="flex items-center space-x-2 text-xs text-gray-500 mb-1">
              <span className="bg-finance-light px-2 py-0.5 rounded-full text-finance-primary font-medium">
                {community}
              </span>
              <span>Posted by u/{author} • {timePosted}</span>
              {postType !== 'text' && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  postType === 'image' ? 'bg-green-100 text-green-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {postType.toUpperCase()}
                </span>
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:text-blue-600" onClick={handleCommentsClick}>
              {title}
            </h3>
            
            {/* Text content */}
            {content && (
              <div className="text-gray-700 mb-3 line-clamp-3">
                {content}
              </div>
            )}

            {/* Image display */}
            {postType === 'image' && imageUrl && !imageError && (
              <div className="mb-3 mt-3">
                <img 
                  src={imageUrl} 
                  alt={title}
                  className="w-full max-h-[400px] object-contain rounded-lg border border-gray-200 cursor-pointer hover:opacity-95 transition-opacity"
                  onClick={handleCommentsClick}
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>
            )}

            {/* Image error fallback */}
            {postType === 'image' && imageError && (
              <div className="mb-3 mt-3 p-4 bg-gray-100 rounded-lg border border-gray-200 text-center">
                <p className="text-gray-500 text-sm">Image failed to load</p>
              </div>
            )}

            {/* Link display */}
            {postType === 'link' && linkUrl && (
              <a 
                href={linkUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mb-3 mt-3 flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors group"
              >
                <ExternalLink className="h-4 w-4 text-blue-600 flex-shrink-0" />
                <span className="text-blue-600 text-sm truncate group-hover:underline">
                  {linkUrl}
                </span>
              </a>
            )}
            
            {/* Action buttons */}
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