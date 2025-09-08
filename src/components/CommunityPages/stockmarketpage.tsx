import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CommunityPost from "@/components/community/CommunityPost";
import CreatePostBox from "@/components/community/CreatePostBox";
import { 
  TrendingUp, 
  Flame, 
  Clock, 
  Star, 
  BarChart,
  Search,
  Users,
  MessageCircle,
  Activity,
  Target,
  LineChart,
  Info,
  BookMarked
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Sample data for StockMarket community posts
const ImportantStockMarketPosts = [
  {
    id: 1,
    title: "NVDA earnings upcoming predictions - Q1 2026",
    author: "market_analyst_pro",
    authorAvatar: "/placeholder.svg",
    community: "StockMarket",
    timePosted: "1h ago",
    content: "NVIDIA seems to have been consistently been performing well and it appears that the market will rise by 2% at the start of 2026.",
    upvotes: 789,
    commentCount: 103,
  },

]
const stockMarketPosts = [
  {
    id: 1,
    title: "NVDA earnings report analysis - Q1 2025",
    author: "market_analyst_pro",
    authorAvatar: "/placeholder.svg",
    community: "StockMarket",
    timePosted: "1h ago",
    content: "NVIDIA just released their Q1 2025 earnings and the numbers are impressive. Revenue up 18% YoY, largely driven by their AI chip segment. However, guidance for Q2 seems conservative. What are your thoughts on the stock movement tomorrow?",
    upvotes: 89,
    commentCount: 34,
  },
  {
    id: 2,
    title: "Is it time to rotate from tech to value stocks?",
    author: "portfolio_strategist",
    authorAvatar: "/placeholder.svg",
    community: "StockMarket",
    timePosted: "3h ago",
    content: "With interest rates potentially stabilizing and tech valuations still high, I'm considering rotating 20% of my portfolio from tech to value stocks. Banking and energy sectors look undervalued. Anyone else thinking similar strategies?",
    upvotes: 156,
    commentCount: 67,
    isBookmarked: true,
  },
  {
    id: 3,
    title: "Weekly market recap: Key movers and shakers",
    author: "trading_desk",
    authorAvatar: "/placeholder.svg",
    community: "StockMarket",
    timePosted: "6h ago",
    content: "This week saw major movements in several sectors. Healthcare stocks surged after FDA approvals, while retail took a hit from earnings misses. Energy sector showed resilience despite oil price volatility. Here's my detailed breakdown...",
    upvotes: 203,
    commentCount: 45,
  },
  {
    id: 4,
    title: "Question: How to analyze a stock's P/E ratio effectively?",
    author: "learning_trader",
    authorAvatar: "/placeholder.svg",
    community: "StockMarket",
    timePosted: "8h ago",
    content: "I'm trying to understand P/E ratios better. I know it's price divided by earnings per share, but how do I know if a P/E of 25 is good or bad for a particular stock? Should I compare it to industry averages or historical data?",
    upvotes: 142,
    commentCount: 89,
  },
  {
    id: 5,
    title: "My biggest trading mistake and what I learned",
    author: "experienced_trader",
    authorAvatar: "/placeholder.svg",
    community: "StockMarket",
    timePosted: "12h ago",
    content: "Last year I lost $15K by panic selling during a market dip. The stocks I sold recovered within two months and went on to hit new highs. Here's what I learned about emotional trading and risk management...",
    upvotes: 267,
    commentCount: 98,
  },
];

// Filter options for the community
const filterOptions = [
  { name: "Hot", icon: Flame },
  { name: "New", icon: Clock },
  { name: "Top", icon: TrendingUp },
  { name: "Analysis", icon: BarChart },
];

const StockMarketCommunity = () => {
  const [activeFilter, setActiveFilter] = useState("Hot");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-emerald-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <TrendingUp className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                StockMarket Community
              </h1>
              <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed mb-8">
                Connect with traders, investors, and analysts. Share insights, discuss market trends, 
                and learn from experienced professionals in the stock market.
              </p>
              <div className="flex justify-center space-x-6 text-green-100">
                <div className="text-center">
                  <div className="text-2xl font-bold">15.2K</div>
                  <div className="text-sm">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">3.1K</div>
                  <div className="text-sm">Online</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">247</div>
                  <div className="text-sm">Posts Today</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Community Info */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-green-500 h-2 relative"></div>
                  <div className="p-4 pt-5">
                    <div className="flex items-end -mt-6 mb-4">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <TrendingUp className="h-10 w-10 text-green-500" />
                      </div>
                      <h2 className="ml-2 text-xl font-bold">StockMarket</h2>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      Discussion about stock markets, trading strategies, and investment trends.
                    </p>
                    
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-500 mr-1" />
                        <span>15.2k members</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-2 w-2 bg-green-500 rounded-full mr-1"></div>
                        <span>3.1k online</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Community Rules */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold">Community Rules</h3>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start">
                        <Info className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Feel free to ask questions but be relevant</span>
                      </li>
                      <li className="flex items-start">
                        <BookMarked className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Provide sources for market claims</span>
                      </li>
                      <li className="flex items-start">
                        <MessageCircle className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Be respectful in discussions</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Stay focused on stock market topics</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Market Stats */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <LineChart className="h-5 w-5 text-green-500 mr-2" />
                    Market Overview
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>S&P 500</span>
                      <span className="text-green-600">+1.24%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>NASDAQ</span>
                      <span className="text-green-600">+0.89%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>DOW</span>
                      <span className="text-red-600">-0.45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>VIX</span>
                      <span className="text-gray-600">18.34</span>
                    </div>
                  </div>
                </div>
                
                {/* Exit Community Button */}
                <button className="w-full py-3 px-4 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-medium rounded-lg shadow-sm border border-green-500 transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]">
                  Exit Community
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search and Filter */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Search stocks, analysis, or trading strategies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-gray-700 flex items-center mr-4">
                      Sort by:
                    </span>
                    {filterOptions.map((filter) => (
                      <Button
                        key={filter.name}
                        variant={activeFilter === filter.name ? "default" : "outline"}
                        size="sm"
                        className={`flex items-center space-x-2 rounded-full ${
                          activeFilter === filter.name 
                            ? "bg-green-600 hover:bg-green-700 text-white" 
                            : "border-gray-200 text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => setActiveFilter(filter.name)}
                      >
                        <filter.icon className="h-4 w-4" />
                        <span>{filter.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Create Post - Now White */}
              <div className="mb-8">
                <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <Activity className="h-6 w-6 text-green-600" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Share Your Market Insights
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Discuss stocks, share analysis, or ask questions about trading strategies.
                  </p>
                </div>
                <CreatePostBox />
              </div>

              {/* Posts Feed */}
              <div className="space-y-8">
                {/* Expert Insights Section - Now with Green Gradient */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 shadow-lg">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-black">
                        Expert Insights & Key Analysis
                      </h2>
                      <span className="text-sm text-green-100 bg-white/20 px-3 py-1 rounded-full">
                        {ImportantStockMarketPosts.length} insights
                      </span>
                    </div>
                    <p className="text-green-100 text-sm">
                      Curated market observations and expert predictions from seasoned professionals
                    </p>
                    
                    <div className="space-y-4">
                      {ImportantStockMarketPosts.map((post) => (
                        <div key={`important-${post.id}`} className="transform transition-all duration-200 hover:scale-[1.01]">
                          <CommunityPost
                            title={post.title}
                            author={post.author}
                            authorAvatar={post.authorAvatar}
                            community={post.community}
                            timePosted={post.timePosted}
                            content={post.content}
                            upvotes={post.upvotes}
                            commentCount={post.commentCount}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Community Discussions Section */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Community Discussions
                    </h2>
                    <span className="text-sm text-gray-500">
                      {stockMarketPosts.length} posts
                    </span>
                  </div>
                  
                  {stockMarketPosts.map((post) => (
                    <div key={`market-${post.id}`} className="transform transition-all duration-200 hover:scale-[1.01]">
                      <CommunityPost
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
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-white border-2 border-gray-200 hover:bg-gray-50 px-8 py-3 rounded-full font-medium"
                >
                  Load More Posts
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StockMarketCommunity;