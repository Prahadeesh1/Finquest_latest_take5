import React, { useState, useCallback, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CommunityPost from "@/components/community/CommunityPost";
import CreatePostBox from "@/components/community/CreatePostBox";
import { useCommunityData } from "@/hooks/useCommunityData";
import { useAuth } from "@/contexts/Auth";
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
  CheckCircle,
  Loader,
  LogOut,
  UserCheck,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Filter options for the community
const filterOptions = [
  { name: "Hot", icon: Flame },
  { name: "New", icon: Clock },
  { name: "Success", icon: CheckCircle },
  { name: "Tips", icon: Target },
];

const BudgetingCommunity = () => {
  const { currentUser } = useAuth();
  const [activeFilter, setActiveFilter] = useState("Hot");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLeavingCommunity, setIsLeavingCommunity] = useState(false);
  
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
    isMember,
    voteOnPost, 
    toggleBookmark,
    loadMorePosts,
    joinCommunity,
    leaveCommunity,
    refreshData
  } = useCommunityData("budgeting-101");

  // ✅ REMOVED: Auto-refresh timer that was irritating
  // No more automatic polling every 10 seconds!

  // ✅ FIXED: Properly filtered and sorted posts with memoization
  const filteredAndSortedPosts = useMemo(() => {
    try {
      let filtered = [...posts];

      // Apply search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(post => 
          post.title?.toLowerCase().includes(query) ||
          post.content?.toLowerCase().includes(query) ||
          post.tags?.some(tag => tag.toLowerCase().includes(query)) ||
          post.author?.toLowerCase().includes(query)
        );
      }

      // Apply sort filter
      switch (activeFilter) {
        case "Hot":
          filtered.sort((a, b) => {
            const scoreA = (a.likes || 0) - (a.dislikes || 0) + (a.commentCount || 0) * 2;
            const scoreB = (b.likes || 0) - (b.dislikes || 0) + (b.commentCount || 0) * 2;
            const timeA = new Date(a.createdAt).getTime();
            const timeB = new Date(b.createdAt).getTime();
            
            const finalScoreA = scoreA * 0.7 + (timeA / 1000000) * 0.3;
            const finalScoreB = scoreB * 0.7 + (timeB / 1000000) * 0.3;
            
            return finalScoreB - finalScoreA;
          });
          break;
          
        case "New":
          filtered.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
          break;
          
        case "Success":
          // Success = posts with positive engagement
          filtered.sort((a, b) => {
            const scoreA = (a.likes || 0) - (a.dislikes || 0);
            const scoreB = (b.likes || 0) - (b.dislikes || 0);
            return scoreB - scoreA;
          });
          break;
          
        case "Tips":
          // Tips = posts with high comment engagement
          filtered.sort((a, b) => {
            return (b.commentCount || 0) - (a.commentCount || 0);
          });
          break;
      }

      return filtered;
    } catch (err) {
      console.error('Error filtering/sorting posts:', err);
      return posts;
    }
  }, [posts, searchQuery, activeFilter]);

  // ✅ FIXED: Handle voting on posts with correct type signature
  const handleVote = useCallback(async (postId: string, voteType: 'like' | 'dislike') => {
    if (!currentUser) {
      toast.error('Please login to vote');
      return;
    }

    try {
      await voteOnPost(postId, voteType);
      // ✅ NO REFRESH: Voting now uses optimistic updates in the hook
    } catch (error) {
      toast.error(`Failed to ${voteType} post`);
    }
  }, [currentUser, voteOnPost]);

  // Handle bookmarking
  const handleBookmark = useCallback(async (postId: string) => {
    if (!currentUser) {
      toast.error('Please login to bookmark');
      return;
    }

    try {
      const isBookmarked = await toggleBookmark(postId);
      toast.success(isBookmarked ? 'Post bookmarked!' : 'Bookmark removed!');
      // ✅ NO REFRESH: Bookmark is instant, no need to reload
    } catch (error) {
      toast.error('Failed to update bookmark');
    }
  }, [currentUser, toggleBookmark]);

  // Handle joining community
  const handleJoinCommunity = async () => {
    if (!currentUser) {
      toast.error('Please login to join');
      return;
    }

    try {
      await joinCommunity();
      toast.success('Joined Budgeting 101 community!');
      // ✅ NO REFRESH: Join is instant
    } catch (error) {
      toast.error('Failed to join community');
    }
  };

  // Handle leaving community
  const handleLeaveCommunity = async () => {
    if (!currentUser) {
      return;
    }

    setIsLeavingCommunity(true);
    try {
      await leaveCommunity();
      toast.success('Left Budgeting 101 community');
      // ✅ NO REFRESH: Leave is instant
    } catch (error) {
      toast.error('Failed to leave community');
    } finally {
      setIsLeavingCommunity(false);
    }
  };

  // Handle load more
  const handleLoadMore = async () => {
    try {
      await loadMorePosts();
      // ✅ NO REFRESH: Load more appends to existing posts
    } catch (error) {
      toast.error('Failed to load more posts');
    }
  };

  // ✅ ONLY REFRESH when a new post is created
  const handlePostCreated = useCallback(() => {
    refreshData();
    toast.success('Post created successfully!');
  }, [refreshData]);

  // ✅ ONLY REFRESH when a post is deleted
  const handlePostDeleted = useCallback(() => {
    refreshData();
    toast.success('Post deleted successfully!');
  }, [refreshData]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-cyan-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading community data...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-cyan-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-red-600 mb-6">{error}</p>
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
                {community?.name || "Budgeting 101 Community"}
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
                {community?.description || "Master the art of budgeting with fellow learners. Share tips, get advice, and celebrate your financial wins in a supportive environment."}
              </p>
              
              {/* Membership Button */}
              {currentUser && (
                <div className="mb-6">
                  {isMember ? (
                    <Button
                      variant="outline"
                      size="lg"
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                      onClick={handleLeaveCommunity}
                      disabled={isLeavingCommunity}
                    >
                      {isLeavingCommunity ? (
                        <div className="flex items-center space-x-2">
                          <Loader className="h-5 w-5 animate-spin" />
                          <span>Leaving...</span>
                        </div>
                      ) : (
                        <>
                          <LogOut className="h-5 w-5 mr-2" />
                          Leave Community
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-blue-50"
                      onClick={handleJoinCommunity}
                    >
                      <UserCheck className="h-5 w-5 mr-2" />
                      Join Community
                    </Button>
                  )}
                </div>
              )}

              <div className="flex justify-center space-x-6 text-blue-100">
                <div className="text-center">
                  <div className="text-2xl font-bold">{stats.memberCount?.toLocaleString() || "0"}</div>
                  <div className="text-sm">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{stats.onlineCount?.toLocaleString() || "0"}</div>
                  <div className="text-sm">Online</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{stats.postsToday || 0}</div>
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
                      <h2 className="ml-2 text-xl font-bold">{community?.name}</h2>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      {community?.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-500 mr-1" />
                        <span>{stats.memberCount?.toLocaleString() || 0} members</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-2 w-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                        <span>{stats.onlineCount?.toLocaleString() || 0} online</span>
                      </div>
                    </div>

                    {/* Membership status indicator */}
                    {currentUser && (
                      <div className={`text-xs px-3 py-2 rounded-full text-center ${
                        isMember 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {isMember ? '✓ You are a member' : 'Not a member'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Real-time Stats */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <BarChart className="h-5 w-5 text-blue-500 mr-2" />
                    Community Stats
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Total Posts</span>
                      <span className="font-medium">{stats.totalPosts || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Posts Today</span>
                      <span className="font-medium text-blue-600">{stats.postsToday || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Comments</span>
                      <span className="font-medium">{stats.totalComments || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Users</span>
                      <span className="font-medium">{stats.activeUsers || 0}</span>
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
                      {community?.rules?.map((rule, index) => (
                        <li key={index} className="flex items-start">
                          <Info className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{rule}</span>
                        </li>
                      )) || (
                        <>
                          <li className="flex items-start">
                            <Info className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Be supportive and non-judgmental</span>
                          </li>
                          <li className="flex items-start">
                            <Info className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Celebrate small wins and progress</span>
                          </li>
                          <li className="flex items-start">
                            <Info className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Ask questions freely but do not spam</span>
                          </li>
                          <li className="flex items-start">
                            <Info className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Share practical tips and experiences</span>
                          </li>
                        </>
                      )}
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

              {/* Create Post */}
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
                <CreatePostBox communityId="budgeting-101" onPostCreated={handlePostCreated} />
              </div>

              {/* Posts Feed */}
              <div className="space-y-8">
                {/* Expert Insights Section */}
                {expertPosts.length > 0 && (
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl p-6 shadow-lg">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">
                          Expert Financial Insights & Analysis
                        </h2>
                        <span className="text-sm text-blue-100 bg-white/20 px-3 py-1 rounded-full">
                          {expertPosts.length} insights
                        </span>
                      </div>
                      <p className="text-blue-100 text-sm">
                        Curated financial observations and expert advice from seasoned budgeting professionals
                      </p>
                      
                      <div className="space-y-4">
                        {expertPosts.map((post) => (
                          <div key={`expert-${post.id}`} className="transform transition-all duration-200 hover:scale-[1.01]">
                            <CommunityPost
                              postId={post.id}
                              title={post.title}
                              author={post.author}
                              authorId={post.authorId}
                              authorAvatar="/placeholder.svg"
                              community={post.community}
                              timePosted={new Date(post.createdAt).toLocaleString()}
                              content={post.content}
                              likes={post.likes || 0}
                              dislikes={post.dislikes || 0}
                              commentCount={post.commentCount}
                              isBookmarked={post.isBookmarked}
                              imageUrl={post.imageUrl}
                              onVote={handleVote}
                              onBookmark={handleBookmark}
                              onDelete={handlePostDeleted}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Community Budget Discussions Section */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Community Budget Discussions
                    </h2>
                    <span className="text-sm text-gray-500">
                      {filteredAndSortedPosts.length} posts
                    </span>
                  </div>
                  
                  {filteredAndSortedPosts.length === 0 ? (
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
                    filteredAndSortedPosts.map((post) => (
                      <div key={`budget-${post.id}`} className="transform transition-all duration-200 hover:scale-[1.01]">
                        <CommunityPost
                          postId={post.id}
                          title={post.title}
                          author={post.author}
                          authorId={post.authorId}
                          authorAvatar="/placeholder.svg"
                          community={post.community}
                          timePosted={new Date(post.createdAt).toLocaleString()}
                          content={post.content}
                          likes={post.likes || 0}
                          dislikes={post.dislikes || 0}
                          commentCount={post.commentCount}
                          isBookmarked={post.isBookmarked}
                          imageUrl={post.imageUrl}
                          onVote={handleVote}
                          onBookmark={handleBookmark}
                          onDelete={handlePostDeleted}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              {/* Load More Button */}
              {hasMore && filteredAndSortedPosts.length > 0 && (
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

export default BudgetingCommunity;