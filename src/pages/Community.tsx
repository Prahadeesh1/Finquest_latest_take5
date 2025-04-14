
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CommunityPost from "@/components/community/CommunityPost";
import CommunityList from "@/components/community/CommunityList";
import CreatePostBox from "@/components/community/CreatePostBox";
import CommunitySidebar from "@/components/community/CommunitySidebar";
import { 
  TrendingUp, 
  Flame, 
  Clock, 
  Star, 
  BarChart,
  Search,
  SlidersHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample data for posts
const communityPosts = [
  {
    id: 1,
    title: "How do I start investing with only $500?",
    author: "newbie_investor",
    authorAvatar: "/placeholder.svg",
    community: "BeginnersInvesting",
    timePosted: "2h ago",
    content: "I have $500 saved up and want to start investing. What's the best approach for a complete beginner? Should I go with ETFs, individual stocks, or something else? Any advice would be appreciated!",
    upvotes: 24,
    commentCount: 12,
  },
  {
    id: 2,
    title: "Just reached my first $10k in investments!",
    author: "growing_wealth",
    authorAvatar: "/placeholder.svg",
    community: "PersonalFinance",
    timePosted: "5h ago",
    content: "After consistently saving and investing for the past year, I've finally reached $10,000 in my investment portfolio! It's not much compared to some of you, but it feels like a huge milestone for me. Just wanted to share my small victory!",
    upvotes: 156,
    commentCount: 42,
    isBookmarked: true,
  },
  {
    id: 3,
    title: "The importance of emergency funds before investing",
    author: "finance_educator",
    authorAvatar: "/placeholder.svg",
    community: "FinanceFlowTogether",
    timePosted: "8h ago",
    content: "I see a lot of newcomers rushing to invest without having an emergency fund. Here's why that's risky: An emergency fund should cover 3-6 months of expenses and be easily accessible. Without it, you might be forced to sell investments at a loss during emergencies. Always build your safety net first!",
    upvotes: 89,
    commentCount: 23,
  },
  {
    id: 4,
    title: "Market analysis: Tech stocks outlook for Q2 2025",
    author: "market_watcher",
    authorAvatar: "/placeholder.svg",
    community: "StockMarket",
    timePosted: "12h ago",
    content: "With recent shifts in the tech sector, I've analyzed potential trends for Q2 2025. Major tech companies are leaning heavily into AI integration, which might drive growth, but regulatory concerns in Europe could impact global operations. What are your thoughts on how this might affect the sector?",
    upvotes: 67,
    commentCount: 31,
  },
  {
    id: 5,
    title: "How I paid off $30k in student loans in 18 months",
    author: "debt_free_now",
    authorAvatar: "/placeholder.svg",
    community: "PersonalFinance",
    timePosted: "1d ago",
    content: "I wanted to share my journey of becoming debt-free! I managed to pay off $30,000 in student loans in just 18 months by following a strict budget, taking on side gigs, and minimizing expenses. Happy to share more details about my strategy if anyone's interested.",
    upvotes: 213,
    commentCount: 87,
  },
];

// Filter options
const filterOptions = [
  { name: "Hot", icon: Flame },
  { name: "New", icon: Clock },
  { name: "Top", icon: TrendingUp },
  { name: "Trending", icon: BarChart },
];

const Community = () => {
  const [activeFilter, setActiveFilter] = useState("Hot");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Community</h1>
            <p className="mt-2 text-lg text-gray-600">
              Join discussions, share insights, and connect with fellow financial learners.
            </p>
          </div>
          
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Main content area */}
            <div className="lg:col-span-8">
              {/* Search and filter bar */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 mb-6 flex flex-col sm:flex-row gap-3 items-center">
                <div className="relative flex-1 w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="finance-input pl-10 py-2 text-sm w-full"
                    placeholder="Search within community"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center overflow-x-auto hide-scrollbar space-x-1 w-full sm:w-auto">
                  {filterOptions.map((filter) => (
                    <Button
                      key={filter.name}
                      variant={activeFilter === filter.name ? "default" : "ghost"}
                      size="sm"
                      className={`flex items-center space-x-1 whitespace-nowrap ${
                        activeFilter === filter.name 
                          ? "bg-finance-primary hover:bg-finance-primary/90" 
                          : "text-gray-600 hover:text-finance-primary"
                      }`}
                      onClick={() => setActiveFilter(filter.name)}
                    >
                      <filter.icon className="h-4 w-4" />
                      <span>{filter.name}</span>
                    </Button>
                  ))}
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 hover:text-finance-primary ml-1"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Create post box */}
              <CreatePostBox />
              
              {/* Posts list */}
              <div className="space-y-4">
                {communityPosts.map((post) => (
                  <CommunityPost
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    authorAvatar={post.authorAvatar}
                    community={post.community}
                    timePosted={post.timePosted}
                    content={post.content}
                    upvotes={post.upvotes}
                    commentCount={post.commentCount}
                    isBookmarked={post.isBookmarked}
                  />
                ))}
              </div>
              
              {/* Load more button */}
              <div className="mt-6 text-center">
                <Button variant="outline" className="w-full sm:w-auto">
                  Load More Posts
                </Button>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="mt-8 lg:mt-0 lg:col-span-4">
              <div className="sticky top-20">
                <CommunitySidebar />
                
                <div className="mt-6 hidden lg:block">
                  <CommunityList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
