import React, { useState, useEffect } from "react";
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Share2, 
  Bookmark 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostService, DatabaseUtils } from "@/services/realtimeDB";
import { useAuth } from "@/contexts/Auth";
import { toast } from "sonner";

interface PostProps {
  id: string;
  title: string;
  author: string;
  authorId: string;
  community: string;
  timePosted: string;
  content: string;
  upvotes: number;
  downvotes: number;
  commentCount: number;
  isBookmarked?: boolean;
}

const CommunityPost = ({
  id,
  title,
  author,
  authorId,
  community,
  timePosted,
  content,
  upvotes: initialUpvotes,
  downvotes: initialDownvotes,
  commentCount,
  isBookmarked = false,
}: PostProps) => {
  const { currentUser } = useAuth();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState<'upvote' | 'downvote' | null>(null);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [isVoting, setIsVoting] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);

  // Load user's vote status and bookmark status
  useEffect(() => {
    if (currentUser) {
      loadUserInteractions();
    }
  }, [currentUser, id]);

  const loadUserInteractions = async () => {
    if (!currentUser) return;

    try {
      const [userVotes, userBookmarks] = await Promise.all([
        DatabaseUtils.getUserVotes(currentUser.uid),
        DatabaseUtils.getUserBookmarks(currentUser.uid)
      ]);

      if (userVotes[id]) {
        setUserVote(userVotes[id]);
      }

      setBookmarked(userBookmarks.includes(id));
    } catch (error) {
      console.error('Error loading user interactions:', error);
    }
  };

  const handleVote = async (voteType: 'upvote' | 'downvote') => {
    if (!currentUser) {
      toast.error('Please login to vote');
      return;
    }

    if (isVoting) return;

    setIsVoting(true);
    const previousVote = userVote;
    const previousUpvotes = upvotes;
    const previousDownvotes = downvotes;

    try {
      // Optimistic UI update
      if (previousVote === voteType) {
        // Remove vote
        setUserVote(null);
        if (voteType === 'upvote') {
          setUpvotes(prev => prev - 1);
        } else {
          setDownvotes(prev => prev - 1);
        }
      } else {
        // Add or change vote
        setUserVote(voteType);
        
        if (previousVote) {
          // Change vote
          if (voteType === 'upvote') {
            setUpvotes(prev => prev + 1);
            setDownvotes(prev => prev - 1);
          } else {
            setDownvotes(prev => prev + 1);
            setUpvotes(prev => prev - 1);
          }
        } else {
          // New vote
          if (voteType === 'upvote') {
            setUpvotes(prev => prev + 1);
          } else {
            setDownvotes(prev => prev + 1);
          }
        }
      }

      // Make API call
      await PostService.voteOnPost(currentUser.uid, id, voteType);
      
    } catch (error) {
      // Revert optimistic update on error
      setUserVote(previousVote);
      setUpvotes(previousUpvotes);
      setDownvotes(previousDownvotes);
      console.error('Error voting:', error);
      toast.error('Failed to vote. Please try again.');
    } finally {
      setIsVoting(false);
    }
  };

  const handleBookmark = async () => {
    if (!currentUser) {
      toast.error('Please login to bookmark posts');
      return;
    }

    if (isBookmarking) return;

    setIsBookmarking(true);
    const previousBookmarked = bookmarked;

    try {
      // Optimistic UI update
      setBookmarked(!bookmarked);
      
      await PostService.toggleBookmark(currentUser.uid, id);
      
      toast.success(bookmarked ? 'Post removed from bookmarks' : 'Post bookmarked');
    } catch (error) {
      // Revert on error
      setBookmarked(previousBookmarked);
      console.error('Error bookmarking:', error);
      toast.error('Failed to bookmark. Please try again.');
    } finally {
      setIsBookmarking(false);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: content.substring(0, 100) + '...',
          url: window.location.href + `/post/${id}`
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href + `/post/${id}`);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share post');
    }
  };

  const formatTimeAgo = (timeString: string) => {
    const now = new Date();
    const postTime = new Date(timeString);
    const diffInMs = now.getTime() - postTime.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMins = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMins}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
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
                  ? 'text-finance-primary bg-finance-primary/10' 
                  : 'text-gray-500 hover:text-finance-primary hover:bg-finance-primary/10'
              }`}
              onClick={() => handleVote('upvote')}
              disabled={isVoting || !currentUser}
            >
              <ThumbsUp className="h-5 w-5" />
            </Button>
            <span className="text-sm font-medium text-gray-700">
              {upvotes - downvotes}
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-8 w-8 rounded-full transition-colors ${
                userVote === 'downvote' 
                  ? 'text-red-500 bg-red-50' 
                  : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
              }`}
              onClick={() => handleVote('downvote')}
              disabled={isVoting || !currentUser}
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
              <span>Posted by u/{author} • {formatTimeAgo(timePosted)}</span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-finance-primary cursor-pointer">
              {title}
            </h3>
            
            <div className="text-gray-700 mb-3 leading-relaxed">
              {content}
            </div>
            
            <div className="flex items-center space-x-2 text-gray-500 text-sm">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 space-x-1 rounded-full hover:bg-gray-100"
              >
                <MessageSquare className="h-4 w-4" />
                <span>{commentCount} Comments</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 space-x-1 rounded-full hover:bg-gray-100"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-8 space-x-1 rounded-full hover:bg-gray-100 ${
                  bookmarked ? 'text-finance-primary' : ''
                }`}
                onClick={handleBookmark}
                disabled={isBookmarking || !currentUser}
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