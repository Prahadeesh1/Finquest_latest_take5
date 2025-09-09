import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CommunityPost from "@/components/community/CommunityPost";
import CreatePostBox from "@/components/community/CreatePostBox";
import { useCommunityData } from "@/hooks/useCommunityData";
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
  BookMarked,
  Loader
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
  
  // Use the custom hook to manage community data
  const { 
    posts, 
    expertPosts, 
    community, 
    stats,
    loading,
    loadingMore,
    hasMore,
    error, 
    voteOnPost, 
    toggleBookmark,
    loadMorePosts 
  } = useCommunityData("stockmarket");

  // Handle voting on posts
  const handleVote = async (postId: string, voteType: 'upvote' | 'downvote') => {
    try {
      await voteOnPost(postId, voteType);
      toast.success(`Post ${voteType}d successfully!`);
    } catch (error) {
      toast.error(`Failed to ${voteType} post`);
    }
  };

  // Handle bookmarking
  const handleBookmark = async (postId: string) => {
    try {
      const isBookmarked = await toggleBookmark(postId);
      toast.success(isBookmarked ? 'Post bookmarked!' : 'Bookmark removed!');
    } catch (error) {
      toast.error('Failed to update bookmark');
    }
  };

  // Filter and search posts
  const filteredPosts = posts.filter(post => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return post.title.toLowerCase().includes(query) ||
             post.content.toLowerCase().includes(query) ||
             post.tags.some(tag => tag.toLowerCase().includes(query));
    }
    return true;
  });

  // Handle load more
  const handleLoadMore = async () => {
    try {
      await loadMorePosts();
    } catch (error) {
      toast.error('Failed to load more posts');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-emerald-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader className="animate-spin h-8 w-8 text-green-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading community data...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-emerald-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
                {community?.name || "StockMarket Community"}
              </h1>
              <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed mb-8">
                {community?.description || "Connect with traders, investors, and analysts. Share insights, discuss market trends, and learn from experienced professionals in the stock market."}
              </p>
              <div className="flex justify-center space-x-6 text-green-100">
                <div className="text-center">
                  <div className="text-2xl font-bold">{community?.memberCount?.toLocaleString() || "0"}</div>
                  <div className="text-sm">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{community?.onlineCount?.toLocaleString() || "0"}</div>
                  <div className="text-sm">Online</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{stats.postsToday}</div>
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
                      <h2 className="ml-2 text-xl font-bold">{community?.name}</h2>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      {community?.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-500 mr-1" />
                        <span>{community?.memberCount?.toLocaleString() || 0} members</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-2 w-2 bg-green-500 rounded-full mr-1"></div>
                        <span>{community?.onlineCount?.toLocaleString() || 0} online</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real-time Stats */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <BarChart className="h-5 w-5 text-green-500 mr-2" />
                    Community Stats
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Total Posts</span>
                      <span className="font-medium">{stats.totalPosts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Posts Today</span>
                      <span className="font-medium text-green-600">{stats.postsToday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Comments</span>
                      <span className="font-medium">{stats.totalComments}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Users</span>
                      <span className="font-medium">{stats.activeUsers}</span>
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
                      {community?.rules?.map((rule, index) => (
                        <li key={index} className="flex items-start">
                          <Info className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{rule}</span>
                        </li>
                      )) || (
                        <li className="flex items-start">
                          <Info className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Loading community rules...</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Market Stats - Keep static for now */}
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

              {/* Create Post */}
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
                <CreatePostBox communityId="stockmarket" />
              </div>

              {/* Posts Feed */}
              <div className="space-y-8">
                {/* Expert Insights Section */}
                {expertPosts.length > 0 && (
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 shadow-lg">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">
                          Expert Insights & Key Analysis
                        </h2>
                        <span className="text-sm text-green-100 bg-white/20 px-3 py-1 rounded-full">
                          {expertPosts.length} insights
                        </span>
                      </div>
                      <p className="text-green-100 text-sm">
                        Curated market observations and expert predictions from seasoned professionals
                      </p>
                      
                      <div className="space-y-4">
                        {expertPosts.map((post) => (
                          <div key={`expert-${post.id}`} className="transform transition-all duration-200 hover:scale-[1.01]">
                            <CommunityPost
                              postId={post.id}
                              title={post.title}
                              author={post.author}
                              authorAvatar="/placeholder.svg"
                              community={post.community}
                              timePosted={new Date(post.createdAt).toLocaleString()}
                              content={post.content}
                              upvotes={post.upvotes}
                              commentCount={post.commentCount}
                              isBookmarked={post.isBookmarked}
                              onVote={handleVote}
                              onBookmark={handleBookmark}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Community Discussions Section */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Community Discussions
                    </h2>
                    <span className="text-sm text-gray-500">
                      {filteredPosts.length} posts
                    </span>
                  </div>
                  
                  {filteredPosts.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg">
                      <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-2">
                        {searchQuery.trim() ? 'No posts match your search.' : 'No posts yet in this community.'}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {searchQuery.trim() ? 'Try adjusting your search terms.' : 'Be the first to start a discussion!'}
                      </p>
                    </div>
                  ) : (
                    filteredPosts.map((post) => (
                      <div key={`community-${post.id}`} className="transform transition-all duration-200 hover:scale-[1.01]">
                        <CommunityPost
                          postId={post.id}
                          title={post.title}
                          author={post.author}
                          authorAvatar="/placeholder.svg"
                          community={post.community}
                          timePosted={new Date(post.createdAt).toLocaleString()}
                          content={post.content}
                          upvotes={post.upvotes}
                          commentCount={post.commentCount}
                          isBookmarked={post.isBookmarked}
                          onVote={handleVote}
                          onBookmark={handleBookmark}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              {/* Load More Button */}
              {hasMore && (
                <div className="mt-10 text-center">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="bg-white border-2 border-gray-200 hover:bg-gray-50 px-8 py-3 rounded-full font-medium"
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                  >
                    {loadingMore ? (
                      <div className="flex items-center space-x-2">
                        <Loader className="animate-spin h-4 w-4" />
                        <span>Loading...</span>
                      </div>
                    ) : (
                      'Load More Posts'
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StockMarketCommunity;