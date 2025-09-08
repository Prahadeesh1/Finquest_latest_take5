import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
  ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Comment {
  id: number;
  author: string;
  content: string;
  timePosted: string;
  upvotes: number;
  replies?: Comment[];
}

// Sample comments data
const sampleComments: Comment[] = [
  {
    id: 1,
    author: "investment_guru",
    content: "Great analysis! I've been tracking this stock for months and your points about the earnings are spot on. The guidance might be conservative but that usually means they'll beat expectations next quarter.",
    timePosted: "2h ago",
    upvotes: 24,
    replies: [
      {
        id: 2,
        author: "market_watcher",
        content: "I agree, but we should also consider the overall market sentiment. Tech stocks have been volatile lately.",
        timePosted: "1h ago",
        upvotes: 8,
      }
    ]
  },
  {
    id: 3,
    author: "beginner_trader",
    content: "Can someone explain what 'guidance' means in this context? Still learning the terminology.",
    timePosted: "3h ago",
    upvotes: 12,
    replies: [
      {
        id: 4,
        author: "helpful_veteran",
        content: "Guidance refers to the company's forecasted performance for future quarters. It's their prediction of revenue, earnings, etc. Companies often give conservative guidance to avoid disappointing investors.",
        timePosted: "2h ago",
        upvotes: 18,
      }
    ]
  },
  {
    id: 5,
    author: "chart_analyst",
    content: "Looking at the technical indicators, there's strong support at $150. If it breaks below that, we might see a pullback to $140. But fundamentally, this looks solid for long-term holding.",
    timePosted: "4h ago",
    upvotes: 31,
  },
  {
    id: 6,
    author: "dividend_hunter",
    content: "Don't forget about the dividend yield! At current prices, it's sitting at around 2.8%. Not the highest, but steady and reliable for income investors.",
    timePosted: "5h ago",
    upvotes: 16,
  }
];

const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);

  return (
    <div className={`${isReply ? 'ml-8 border-l-2 border-gray-100 pl-4' : ''}`}>
      <div className="flex items-start gap-3 py-4">
        <div className="flex flex-col items-center space-y-1">
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50">
            <ThumbsUp className="h-3 w-3" />
          </Button>
          <span className="text-xs font-medium text-gray-600">{comment.upvotes}</span>
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50">
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
            
            {comment.replies && comment.replies.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 px-2 text-gray-500 hover:bg-gray-100 rounded-full"
                onClick={() => setShowReplies(!showReplies)}
              >
                {showReplies ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
                {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
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
              />
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          {showReplies && comment.replies && (
            <div className="mt-4">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} isReply={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PostDetailPage = () => {
  const { postId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");
  
  // Get post data from navigation state or use defaults
  const postData = location.state || {
    title: "NVDA earnings report analysis - Q1 2025",
    author: "market_analyst_pro",
    authorAvatar: "/placeholder.svg",
    community: "StockMarket",
    timePosted: "1h ago",
    content: "NVIDIA just released their Q1 2025 earnings and the numbers are impressive. Revenue up 18% YoY, largely driven by their AI chip segment. However, guidance for Q2 seems conservative. What are your thoughts on the stock movement tomorrow?",
    upvotes: 89,
    commentCount: 34,
    isBookmarked: false
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      console.log("Adding comment:", newComment);
      setNewComment("");
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

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
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50">
                    <ThumbsUp className="h-5 w-5" />
                  </Button>
                  <span className="text-lg font-semibold text-gray-700">{postData.upvotes}</span>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50">
                    <ThumbsDown className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Post Content */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                    <span className="bg-blue-100 px-3 py-1 rounded-full text-blue-700 font-medium text-xs">
                      {postData.community}
                    </span>
                    <span>Posted by u/{postData.author} • {postData.timePosted}</span>
                  </div>
                  
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">{postData.title}</h1>
                  
                  <div className="text-gray-700 mb-6 leading-relaxed">
                    {postData.content}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-gray-500 text-sm">
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{sampleComments.length} Comments</span>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="h-8 space-x-1 rounded-full hover:bg-gray-100">
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`h-8 space-x-1 rounded-full hover:bg-gray-100 ${postData.isBookmarked ? 'text-blue-600' : ''}`}
                    >
                      <Bookmark className="h-4 w-4" />
                      <span>{postData.isBookmarked ? 'Saved' : 'Save'}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add Comment Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6 p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <textarea
                  placeholder="What are your thoughts?"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="flex justify-end mt-2">
                  <Button 
                    onClick={handleAddComment}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={!newComment.trim()}
                  >
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                Comments ({sampleComments.length})
              </h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {sampleComments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PostDetailPage;