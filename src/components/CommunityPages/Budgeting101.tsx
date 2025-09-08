import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CommunityPost from "@/components/community/CommunityPost";
import CreatePostBox from "@/components/community/CreatePostBox";
import { 
  Wallet, 
  Flame, 
  Clock, 
  Star, 
  BarChart,
  Search,
  Users,
  MessageCircle,
  Calculator,
  Target,
  PiggyBank,
  Info,
  BookMarked,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


const ImportantBudgetPosts = [
  {
    id: 1,
    title: "Youngsters struggle in budgetting in 2025",
    author: "BugetingMaster",
    authorAvatar: "/placeholder.svg",
    community: "Budgeting 101",
    timePosted: "1h ago",
    content: "As the years progress it seems like more and more youngsters are getting worst adn their montly spending habits",
    upvotes: 789,
    commentCount: 103,
  },

]
// Sample data for Budgeting 101 community posts
const budgetingPosts = [
  {
    id: 1,
    title: "The 50/30/20 rule changed my financial life",
    author: "budget_success_story",
    authorAvatar: "/placeholder.svg",
    community: "Budgeting 101",
    timePosted: "2h ago",
    content: "I've been following the 50/30/20 budgeting rule for 8 months now and it's been a game changer. 50% for needs, 30% for wants, 20% for savings and debt. Here's how I track everything and stay consistent...",
    upvotes: 124,
    commentCount: 47,
  },
  {
    id: 2,
    title: "Help! I keep overspending on groceries",
    author: "struggling_saver",
    authorAvatar: "/placeholder.svg",
    community: "Budgeting 101",
    timePosted: "4h ago",
    content: "I budget $300/month for groceries but always end up spending $450+. I meal plan and use lists but still overspend. Any tips for staying within grocery budget? What am I doing wrong?",
    upvotes: 89,
    commentCount: 73,
    isBookmarked: true,
  },
  {
    id: 3,
    title: "Free budgeting apps vs spreadsheets - what works better?",
    author: "budget_tools_reviewer",
    authorAvatar: "/placeholder.svg",
    community: "Budgeting 101",
    timePosted: "6h ago",
    content: "I've tried Mint, YNAB, and custom Excel sheets. Each has pros and cons. Mint is convenient but categories are messy. YNAB is powerful but costly. Excel gives control but requires more work. What's your experience?",
    upvotes: 156,
    commentCount: 92,
  },
  {
    id: 4,
    title: "How to budget with irregular income as a freelancer",
    author: "freelance_budgeter",
    authorAvatar: "/placeholder.svg",
    community: "Budgeting 101",
    timePosted: "8h ago",
    content: "As a freelancer, my income varies dramatically month to month. Some months I make $2k, others $6k. Traditional budgeting advice doesn't work. Here's the system I developed for irregular income...",
    upvotes: 203,
    commentCount: 67,
  },
  {
    id: 5,
    title: "Emergency fund milestone: Finally saved $5,000!",
    author: "emergency_fund_winner",
    authorAvatar: "/placeholder.svg",
    community: "Budgeting 101",
    timePosted: "12h ago",
    content: "After 14 months of strict budgeting and cutting expenses, I finally hit my $5,000 emergency fund goal! It wasn't easy - had to give up dining out and expensive hobbies, but the peace of mind is worth it.",
    upvotes: 287,
    commentCount: 54,
  },
];

// Filter options for the community
const filterOptions = [
  { name: "Hot", icon: Flame },
  { name: "New", icon: Clock },
  { name: "Success", icon: CheckCircle },
  { name: "Tips", icon: Target },
];

const BudgetingCommunity = () => {
  const [activeFilter, setActiveFilter] = useState("Hot");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-cyan-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <Wallet className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Budgeting 101 Community
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
                Master the art of budgeting with fellow learners. Share tips, get advice, 
                and celebrate your financial wins in a supportive environment.
              </p>
              <div className="flex justify-center space-x-6 text-blue-100">
                <div className="text-center">
                  <div className="text-2xl font-bold">8.7K</div>
                  <div className="text-sm">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">1.9K</div>
                  <div className="text-sm">Online</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">156</div>
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
                  <div className="bg-blue-500 h-2 relative"></div>
                  <div className="p-4 pt-5">
                    <div className="flex items-end -mt-6 mb-4">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <Wallet className="h-10 w-10 text-blue-500" />
                      </div>
                      <h2 className="ml-2 text-xl font-bold">Budgeting 101</h2>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      Tips, advice, and discussions about managing personal finances and budgeting.
                    </p>
                    
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-500 mr-1" />
                        <span>8.7k members</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-2 w-2 bg-green-500 rounded-full mr-1"></div>
                        <span>1.9k online</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Budgeting Resources */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold">Quick Resources</h3>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start">
                        <Calculator className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Budget Calculator Tool</span>
                      </li>
                      <li className="flex items-start">
                        <PiggyBank className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Emergency Fund Guide</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Goal Setting Templates</span>
                      </li>
                      <li className="flex items-start">
                        <BookMarked className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Budgeting Method Comparison</span>
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
                        <span>Be supportive and non-judgmental</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Celebrate small wins and progress</span>
                      </li>
                      <li className="flex items-start">
                        <MessageCircle className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Ask questions freely but do not spam</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Share practical tips and experiences</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Popular Budget Methods */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-100 p-4">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Star className="h-5 w-5 text-blue-500 mr-2" />
                    Popular Methods
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-white rounded border">50/30/20 Rule</div>
                    <div className="p-2 bg-white rounded border">Zero-Based Budget</div>
                    <div className="p-2 bg-white rounded border">Envelope Method</div>
                    <div className="p-2 bg-white rounded border">Pay Yourself First</div>
                  </div>
                </div>
                
                {/* Exit Community Button */}
                <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-medium rounded-lg shadow-sm border border-blue-500 transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]">
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
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Search budgeting tips, methods, or questions..."
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

              {/* Create Post - Changed to White */}
              <div className="mb-8">
                <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <Calculator className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Share Your Budgeting Journey
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Share your budgeting wins, ask for help, or discuss money-saving strategies with the community.
                  </p>
                </div>
                <CreatePostBox />
              </div>

              {/* Posts Feed - Restructured like Stock Market */}
              <div className="space-y-8">
                {/* Expert Financial Insights Section - Blue Gradient Background */}
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl p-6 shadow-lg">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-white">
                        Expert Financial Insights & Analysis
                      </h2>
                      <span className="text-sm text-blue-100 bg-white/20 px-3 py-1 rounded-full">
                        {ImportantBudgetPosts.length} insights
                      </span>
                    </div>
                    <p className="text-blue-100 text-sm">
                      Curated financial observations and expert advice from seasoned budgeting professionals
                    </p>
                    
                    <div className="space-y-4">
                      {ImportantBudgetPosts.map((post) => (
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

                {/* Community Budget Discussions Section */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Community Budget Discussions
                    </h2>
                    <span className="text-sm text-gray-500">
                      {budgetingPosts.length} posts
                    </span>
                  </div>
                  
                  {budgetingPosts.map((post) => (
                    <div key={`budget-${post.id}`} className="transform transition-all duration-200 hover:scale-[1.01]">
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

export default BudgetingCommunity;