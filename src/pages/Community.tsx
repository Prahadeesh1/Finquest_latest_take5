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
  SlidersHorizontal,
  Users,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample data for community posts to be displayed
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

// Filter options displayed on the community page
const filterOptions = [
  { name: "Hot", icon: Flame },
  { name: "New", icon: Clock },
  { name: "Top", icon: TrendingUp },
  { name: "Trending", icon: BarChart },
];

const Community = () => {
  //State to manage the currently active filter for posts
  const [activeFilter, setActiveFilter] = useState("Hot");
  //State to manage the search query entered by user
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-white bg-gradient-to-b from-blue-50 via-blue-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-3">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Financial Learning Community
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Connect with fellow learners, share your financial journey, and grow together. 
                Whether you're just starting or have years of experience, everyone has something to learn and teach.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1,247</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">89</div>
              <div className="text-gray-600">Discussions Today</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">456</div>
              <div className="text-gray-600">Questions Answered</div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Sidebar - Moved to left for better hierarchy */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="space-y-6">
                {/* Popular Communities */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 mr-2" />
                    Popular Communities
                  </h3>
                  <CommunityList />
                </div>

                {/* Community Guidelines */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Community Guidelines
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Be respectful and helpful</li>
                    <li>• Share knowledge freely</li>
                    <li>• Ask questions without fear</li>
                    <li>• Support fellow learners</li>
                  </ul>
                </div>

                <CommunitySidebar />
              </div>
            </div>

            {/* Main Posts Area */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              {/* Search and Filter Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col space-y-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-500"
                      placeholder="Search discussions, topics, or ask a question..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  {/* Filter Buttons */}
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
                            ? "bg-blue-600 hover:bg-blue-700 text-white" 
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

              {/* Create Post Section */}
              <div className="mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <MessageCircle className="h-6 w-6 text-white" />
                    <h2 className="text-xl font-semibold text-white">
                      Start a Discussion
                    </h2>
                  </div>
                  <p className="text-blue-100 mb-4">
                    Got a question? Want to share your experience? Create a post and connect with the community!
                  </p>
                </div>
                <CreatePostBox />
              </div>
              
              {/* Posts Feed */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Recent Discussions
                  </h2>
                  <span className="text-sm text-gray-500">
                    {communityPosts.length} posts
                  </span>
                </div>
                
                {communityPosts.map((post, index) => (
                  <div key={post.id} className="transform transition-all duration-200 hover:scale-[1.02]">
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
              
              {/* Load More Button */}
              <div className="mt-10 text-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-white border-2 border-gray-200 hover:bg-gray-50 px-8 py-3 rounded-full font-medium"
                >
                  Load More Discussions
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

export default Community;