import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CommunityPost from "@/components/community/CommunityPost";
import CreatePostBox from "@/components/community/CreatePostBox";
import { 
  BookOpen, 
  Flame, 
  Clock, 
  Star, 
  BarChart,
  Search,
  Users,
  MessageCircle,
  GraduationCap,
  Target,
  Lightbulb,
  Info,
  BookMarked,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


const ImportantInvestPosts = [
  {
    id: 1,
    title: "Gold prices are skyrocketing",
    author: "InvestGuru",
    authorAvatar: "/placeholder.svg",
    community: "Easy Invest Hub",
    timePosted: "1h ago",
    content: "2025 has seen a skyrocket hike in terms of gold",
    upvotes: 789,
    commentCount: 103,
  },

]
// Sample data for Easy Invest Hub community posts
const easyInvestPosts = [
  {
    id: 1,
    title: "Complete beginner - where do I even start?",
    author: "investment_newbie",
    authorAvatar: "/placeholder.svg",
    community: "Easy Invest Hub",
    timePosted: "1h ago",
    content: "I'm 25, have about $2,000 saved, and want to start investing but I'm completely overwhelmed. Should I use a robo-advisor? Pick individual stocks? Start with index funds? Any guidance for someone who knows absolutely nothing?",
    upvotes: 67,
    commentCount: 34,
  },
  {
    id: 2,
    title: "My first month investing: lessons learned",
    author: "learning_investor",
    authorAvatar: "/placeholder.svg",
    community: "Easy Invest Hub",
    timePosted: "3h ago",
    content: "Just completed my first month of investing! Started with $500 in a target-date fund through Vanguard. Here's what I learned: 1) Don't check daily, 2) Start small, 3) Automate everything. My portfolio is down 2% but I'm staying the course!",
    upvotes: 142,
    commentCount: 28,
    isBookmarked: true,
  },
  {
    id: 3,
    title: "ETFs vs Mutual Funds - simple explanation please?",
    author: "confused_student",
    authorAvatar: "/placeholder.svg",
    community: "Easy Invest Hub",
    timePosted: "5h ago",
    content: "I keep reading about ETFs and mutual funds but I don't understand the difference. Which one is better for beginners? I see terms like expense ratios and NAV but it's all confusing. Can someone explain in simple terms?",
    upvotes: 89,
    commentCount: 45,
  },
  {
    id: 4,
    title: "Robo-advisor comparison: Betterment vs Wealthfront vs Vanguard",
    author: "robo_researcher",
    authorAvatar: "/placeholder.svg",
    community: "Easy Invest Hub",
    timePosted: "8h ago",
    content: "I spent weeks researching robo-advisors for beginners. Here's my breakdown: Betterment has great UI and goal-based investing. Wealthfront offers tax-loss harvesting at lower minimums. Vanguard is cheapest but less user-friendly. Detailed comparison inside...",
    upvotes: 203,
    commentCount: 67,
  },
  {
    id: 5,
    title: "Finally understood dollar-cost averaging!",
    author: "aha_moment",
    authorAvatar: "/placeholder.svg",
    community: "Easy Invest Hub",
    timePosted: "12h ago",
    content: "After months of confusion, I finally get dollar-cost averaging! Instead of trying to time the market, you invest the same amount regularly regardless of price. When prices are high, you buy fewer shares. When low, you buy more. Simple but brilliant!",
    upvotes: 156,
    commentCount: 23,
  },
];

// Filter options for the community
const filterOptions = [
  { name: "Hot", icon: Flame },
  { name: "New", icon: Clock },
  { name: "Beginner", icon: GraduationCap },
  { name: "Questions", icon: HelpCircle },
];

const EasyInvestCommunity = () => {
  const [activeFilter, setActiveFilter] = useState("Hot");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-pink-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <BookOpen className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Easy Invest Hub
              </h1>
              <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed mb-8">
                A supportive community for those who are new to investing. Ask questions, 
                share your journey, and learn from others in a judgment-free environment.
              </p>
              <div className="flex justify-center space-x-6 text-purple-100">
                <div className="text-center">
                  <div className="text-2xl font-bold">12.4K</div>
                  <div className="text-sm">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">2.8K</div>
                  <div className="text-sm">Online</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">189</div>
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
                  <div className="bg-purple-500 h-2 relative"></div>
                  <div className="p-4 pt-5">
                    <div className="flex items-end -mt-6 mb-4">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <BookOpen className="h-10 w-10 text-purple-500" />
                      </div>
                      <h2 className="ml-2 text-xl font-bold">Easy Invest Hub</h2>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      A supportive community for those who are new to investing.
                    </p>
                    
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-500 mr-1" />
                        <span>12.4k members</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-2 w-2 bg-green-500 rounded-full mr-1"></div>
                        <span>2.8k online</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Beginner Resources */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold">Beginner Resources</h3>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start">
                        <GraduationCap className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Investing 101 Guide</span>
                      </li>
                      <li className="flex items-start">
                        <Lightbulb className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Common Terms Explained</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Goal Setting Worksheet</span>
                      </li>
                      <li className="flex items-start">
                        <BookMarked className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Recommended Reading List</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Community Guidelines */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold">Community Guidelines</h3>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start">
                        <Info className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>No question is too basic</span>
                      </li>
                      <li className="flex items-start">
                        <MessageCircle className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Please stay on topic</span>
                      </li>
                      <li className="flex items-start">
                        <HelpCircle className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Share your learning journey</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Focus on education, not specific advice</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Investment Types Primer */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100 p-4">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Star className="h-5 w-5 text-purple-500 mr-2" />
                    Investment Types
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-white rounded border">Index Funds</div>
                    <div className="p-2 bg-white rounded border">ETFs</div>
                    <div className="p-2 bg-white rounded border">Target-Date Funds</div>
                    <div className="p-2 bg-white rounded border">Robo-Advisors</div>
                  </div>
                </div>
                
                {/* Exit Community Button */}
                <button className="w-full py-3 px-4 bg-gradient-to-r from-purple-400 to-purple-600 hover:from-pink-500 hover:to-pink-700 text-white font-medium rounded-lg shadow-sm border border-purple-500 transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]">
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
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Search investing basics, questions, or beginner tips..."
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
                            ? "bg-purple-600 hover:bg-purple-700 text-white" 
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

              {/* Create Post - Changed to White */}
              <div className="mb-8">
                <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <Lightbulb className="h-6 w-6 text-purple-600" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Ask Questions & Share Learning
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-4">
                    New to investing? Ask questions, share your progress, or help others on their journey.
                  </p>
                </div>
                <CreatePostBox />
              </div>

              {/* Posts Feed - Restructured with Expert Section */}
              <div className="space-y-8">
                {/* Expert Investment Insights Section - Purple Gradient Background */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 shadow-lg">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-white">
                        Expert Investment Insights & Analysis
                      </h2>
                      <span className="text-sm text-purple-100 bg-white/20 px-3 py-1 rounded-full">
                        {ImportantInvestPosts.length} insights
                      </span>
                    </div>
                    <p className="text-purple-100 text-sm">
                      Curated investment observations and expert guidance from seasoned investment professionals
                    </p>
                    
                    <div className="space-y-4">
                      {ImportantInvestPosts.map((post) => (
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

                {/* Community Learning Discussions Section */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Community Learning Discussions
                    </h2>
                    <span className="text-sm text-gray-500">
                      {easyInvestPosts.length} posts
                    </span>
                  </div>
                  
                  {easyInvestPosts.map((post) => (
                    <div key={`learning-${post.id}`} className="transform transition-all duration-200 hover:scale-[1.01]">
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

export default EasyInvestCommunity;