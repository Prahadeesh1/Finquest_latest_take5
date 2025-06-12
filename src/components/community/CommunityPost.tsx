import React from "react";
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Share2, 
  Bookmark 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostProps {
  title: string;
  author: string;
  authorAvatar: string;
  community: string;
  timePosted: string;
  content: string;
  upvotes: number;
  commentCount: number;
  isBookmarked?: boolean;
}

const CommunityPost = ({
  title,
  author,
  authorAvatar,
  community,
  timePosted,
  content,
  upvotes,
  commentCount,
  isBookmarked = false,
}: PostProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Left side - voting */}
          <div className="flex flex-col items-center space-y-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-500 hover:text-finance-primary hover:bg-finance-primary/10">
              <ThumbsUp className="h-5 w-5" />
            </Button>
            <span className="text-sm font-medium text-gray-700">{upvotes}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50">
              <ThumbsDown className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <div className="flex items-center space-x-2 text-xs text-gray-500 mb-1">
              <span className="bg-finance-light px-2 py-0.5 rounded-full text-finance-primary font-medium">
                r/{community}
              </span>
              <span>Posted by u/{author} • {timePosted}</span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            
            <div className="text-gray-700 mb-3">
              {content}
            </div>
            
            <div className="flex items-center space-x-2 text-gray-500 text-sm">
              <Button variant="ghost" size="sm" className="h-8 space-x-1 rounded-full hover:bg-gray-100">
                <MessageSquare className="h-4 w-4" />
                <span>{commentCount} Comments</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="h-8 space-x-1 rounded-full hover:bg-gray-100">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-8 space-x-1 rounded-full hover:bg-gray-100 ${isBookmarked ? 'text-finance-primary' : ''}`}
              >
                <Bookmark className="h-4 w-4" />
                <span>{isBookmarked ? 'Saved' : 'Save'}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPost;
