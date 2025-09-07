import React, { useState, useEffect } from "react";
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
  MessageCircle,
  Loader
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostService, RealtimeListeners, DatabaseUtils, type Post } from "../services/realtimeDB";
import { useAuth } from "../contexts/Auth";
import { toast } from "sonner";

// Filter options displayed on the community page
const filterOptions = [
  { name: "Hot", icon: Flame },
  { name: "New", icon: Clock },
  { name: "Top", icon: TrendingUp },
  { name: "Trending", icon: BarChart },
];

const Community = () => {
  const { currentUser } = useAuth();
  const [activeFilter, setActiveFilter] = useState("New");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [userBookmarks, setUserBookmarks] = useState<string[]>([]);
  const [communityStats, setCommunityStats] = useState({
    activeMembers: 1247,
    discussionsToday: 89,
    questionsAnswered: 456
  });

  // Load posts and set up real-time listeners
  useEffect(() => {
    let unsubscribePosts: (() => void) | null = null;

    const initializeData = async () => {
      try {
        setLoading(true);
        
        // Load initial posts
        const initialPosts = await PostService.getAllPosts(50);
        setPosts(initialPosts);
        
        // Set up real-time listener for posts
        unsubscribePosts = RealtimeListeners.listenToPosts((updatedPosts) => {
          setPosts(updatedPosts);
        });

        // Load user bookmarks if logged in
        if (currentUser) {
          const bookmarks = await DatabaseUtils.getUserBookmarks(currentUser.uid);
          setUserBookmarks(bookmarks);
        }

      } catch (error) {
        console.error('Error loading community data:', error);
        toast.error('Failed to load community posts');
      } finally {
        setLoading(false);
      }
    };

    initializeData();

    // Cleanup listener on unmount
    return () => {
      if (unsubscribePosts) {
        unsubscribePosts();
      }
    };
  }, [currentUser]);

  // Filter and search posts
  useEffect(() => {
    let filtered = [...posts];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.community.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply sorting based on active filter
    switch (activeFilter) {
      case "Hot":
        // Sort by engagement score (upvotes + comments, weighted by recency)
        filtered.sort((a, b) => {
          const aScore = (a.upvotes * 2 + a.commentCount) / Math.max(1, Math.floor((Date.now() - new Date(a.createdAt).getTime()) / (1000 * 60 * 60)));
          const bScore = (b.upvotes * 2 + b.commentCount) / Math.max(1, Math.floor((Date.now() - new Date(b.createdAt).getTime()) / (1000 * 60 * 60)));
          return bScore - aScore;
        });
        break;
      case "New":
        // Sort by creation time (newest first)
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "Top":
        // Sort by upvotes
        filtered.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
        break;
      case "Trending":
        // Sort by recent engagement (posts with recent activity)
        filtered.sort((a, b) => {
          const aRecency = Date.now() - new Date(a.createdAt).getTime();
          const bRecency = Date.now() - new Date(b.createdAt).getTime();
          const aScore = (a.upvotes + a.commentCount * 2) / Math.max(1, aRecency / (1000 * 60 * 60 * 24));
          const bScore = (b.upvotes + b.commentCount * 2) / Math.max(1, bRecency / (1000 * 60 * 60 * 24));
          return bScore - aScore;
        });
        break;
      default:
        break;
    }

    setFilteredPosts(filtered);
  }, [posts, searchQuery, activeFilter]);

  // Update community stats periodically
  useEffect(() => {
    const updateStats = () => {
      const today = new Date();
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      
      const todayPosts = posts.filter(post => 
        new Date(post.createdAt) >= todayStart
      );
      
      const totalComments = posts.reduce((sum, post) => sum + post.commentCount, 0);
      
      setCommunityStats({
        activeMembers: 1247 + Math.floor(Math.random() * 20), // Simulate slight changes
        discussionsToday: todayPosts.length,
        questionsAnswered: totalComments
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [posts]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      const searchResults = await DatabaseUtils.searchPosts(searchQuery);
      setPosts(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const postTime = new Date(dateString);
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
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {communityStats.activeMembers.toLocaleString()}
              </div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {communityStats.discussionsToday}
              </div>
              <div className="text-gray-600">Discussions Today</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {communityStats.questionsAnswered.toLocaleString()}
              </div>
              <div className="text-gray-600">Total Comments</div>
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
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    {searchQuery && (
                      <Button
                        size="sm"
                        className="absolute inset-y-0 right-2 my-2"
                        onClick={handleSearch}
                      >
                        Search
                      </Button>
                    )}
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

                  {/* Results count */}
                  {searchQuery && (
                    <div className="text-sm text-gray-600">
                      Found {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} 
                      {searchQuery && ` for "${searchQuery}"`}
                    </div>
                  )}
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
                    {searchQuery ? 'Search Results' : 'Community Discussions'}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="text-center">
                      <Loader className="h-8 w-8 animate-spin text-finance-primary mx-auto mb-4" />
                      <p className="text-gray-600">Loading community posts...</p>
                    </div>
                  </div>
                ) : filteredPosts.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                    <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {searchQuery ? 'No posts found' : 'No posts yet'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {searchQuery 
                        ? `Try adjusting your search terms or browse all posts`
                        : `Be the first to start a discussion in the community!`
                      }
                    </p>
                    {searchQuery && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchQuery('');
                          window.location.reload();
                        }}
                      >
                        View All Posts
                      </Button>
                    )}
                  </div>
                ) : (
                  filteredPosts.map((post, index) => (
                    <div key={post.id} className="transform transition-all duration-200 hover:scale-[1.02]">
                      <CommunityPost
                        id={post.id!}
                        title={post.title}
                        author={post.author}
                        authorId={post.authorId}
                        community={post.community}
                        timePosted={post.createdAt}
                        content={post.content}
                        upvotes={post.upvotes}
                        downvotes={post.downvotes}
                        commentCount={post.commentCount}
                        isBookmarked={userBookmarks.includes(post.id!)}
                      />
                    </div>
                  ))
                )}
              </div>
              
              {/* Load More Button */}
              {!loading && filteredPosts.length > 0 && !searchQuery && (
                <div className="mt-10 text-center">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="bg-white border-2 border-gray-200 hover:bg-gray-50 px-8 py-3 rounded-full font-medium"
                    onClick={async () => {
                      try {
                        const morePosts = await PostService.getAllPosts(posts.length + 20);
                        setPosts(morePosts);
                      } catch (error) {
                        toast.error('Failed to load more posts');
                      }
                    }}
                  >
                    Load More Discussions
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

export default Community;