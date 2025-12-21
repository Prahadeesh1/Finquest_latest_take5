import React, { useState, useCallback, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CommunityPost from "@/components/community/CommunityPost";
import CommunityList from "@/components/community/CommunityList";
import CreatePostBox from "@/components/community/CreatePostBox";
import CommunitySidebar from "@/components/community/CommunitySidebar";
import { PostService, Post } from "@/services/realtimeDB";
import { useAuth } from "@/contexts/Auth";
import { 
  TrendingUp, 
  Flame, 
  Clock, 
  Star, 
  BarChart,
  Search,
  Users,
  MessageCircle,
  Loader,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const [activeFilter, setActiveFilter] = useState("Hot");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentLimit, setCurrentLimit] = useState(20);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalMembers: 0,
    discussionsToday: 0,
    questionsAnswered: 0
  });

  // Calculate stats with proper null checking
  const calculateStats = useCallback((allPosts: Post[]) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const discussionsToday = allPosts.filter(post => {
        const postDate = new Date(post.createdAt);
        postDate.setHours(0, 0, 0, 0);
        return postDate.getTime() === today.getTime();
      }).length;

      // Fix for NaN issue - ensure commentCount is a valid number
      const questionsAnswered = allPosts.reduce((sum, post) => {
        const commentCount = Number(post.commentCount) || 0;
        return sum + commentCount;
      }, 0);
      
      const uniqueAuthors = new Set(allPosts.map(post => post.authorId).filter(Boolean));

      setStats({
        totalMembers: uniqueAuthors.size,
        discussionsToday,
        questionsAnswered
      });
    } catch (err) {
      console.error('Error calculating stats:', err);
      setStats({
        totalMembers: 0,
        discussionsToday: 0,
        questionsAnswered: 0
      });
    }
  }, []);

  // Load all posts from all communities
  const loadPosts = useCallback(async (limit: number = 20, append: boolean = false) => {
    try {
      if (!append) {
        setLoading(true);
        setError(null);
      } else {
        setLoadingMore(true);
      }

      const allPosts = await PostService.getAllPosts(limit);
      
      if (append) {
        setPosts(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          const newPosts = allPosts.filter(p => !existingIds.has(p.id));
          return [...prev, ...newPosts];
        });
        setHasMore(allPosts.length === limit);
      } else {
        setPosts(allPosts);
        setHasMore(allPosts.length === limit);
      }

      calculateStats(allPosts);

    } catch (error) {
      console.error('Error loading posts:', error);
      setError('Failed to load posts. Please try again.');
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [calculateStats]);

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
            // 🔁 FIXED SORT LOGIC (NO UI CHANGE)
            const scoreA = (a.upvotes || 0) - (a.downvotes || 0);
            const scoreB = (b.upvotes || 0) - (b.downvotes || 0);
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
          
        case "Top":
          filtered.sort((a, b) => {
            const scoreA = (a.upvotes || 0) - (a.downvotes || 0);
            const scoreB = (b.upvotes || 0) - (b.downvotes || 0);
            return scoreB - scoreA;
          });
          break;
          
        case "Trending":
          const now = Date.now();
          filtered.sort((a, b) => {
            const ageA = (now - new Date(a.createdAt).getTime()) / (1000 * 60 * 60);
            const ageB = (now - new Date(b.createdAt).getTime()) / (1000 * 60 * 60);
            
            const scoreA = ((a.upvotes || 0) - (a.downvotes || 0) + (a.commentCount || 0)) / (ageA + 2);
            const scoreB = ((b.upvotes || 0) - (b.downvotes || 0) + (b.commentCount || 0)) / (ageB + 2);
            
            return scoreB - scoreA;
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
// ✅ FIXED: Handle voting with correct DB signature
  const handleVote = useCallback(
    async (postId: string, voteType: 'like' | 'dislike' | 'remove') => {
      if (!currentUser) {
        toast.error('Please login to vote');
        return;
      }

      const mappedVote =
        voteType === 'like'
          ? 'upvote'
          : voteType === 'dislike'
          ? 'downvote'
          : 'remove';

      try {
        await PostService.voteOnPost(postId, currentUser.uid, mappedVote);
        await loadPosts(currentLimit);
      } catch {
        toast.error('Failed to vote');
      }
    },
    [currentUser, loadPosts, currentLimit]
  );


  // Handle bookmarking
  const handleBookmark = useCallback(async (postId: string) => {
    if (!currentUser) {
      toast.error('Please login to bookmark');
      return;
    }

    try {
      const isBookmarked = await PostService.toggleBookmark(currentUser.uid, postId);
      // Update local state
      setPosts(prev => prev.map(post => 
        post.id === postId ? { ...post, isBookmarked } : post
      ));
      toast.success(isBookmarked ? 'Post bookmarked!' : 'Bookmark removed!');
    } catch (error) {
      toast.error('Failed to update bookmark');
    }
  }, [currentUser]);

  // Load more posts
  const loadMorePosts = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    
    const newLimit = currentLimit + 20;
    setCurrentLimit(newLimit);
    await loadPosts(newLimit, true);
  }, [loadingMore, hasMore, currentLimit, loadPosts]);

  // ✅ ONLY REFRESH when a new post is created
  const handlePostCreated = useCallback(async () => {
    await loadPosts(currentLimit);
    toast.success('Post created successfully!');
  }, [loadPosts, currentLimit]);

  // ✅ ONLY REFRESH when a post is deleted
  const handlePostDeleted = useCallback(async () => {
    await loadPosts(currentLimit);
  }, [loadPosts, currentLimit]);

  // Initial load only
  React.useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  if (error && !loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
          {/* Dynamic Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {loading ? (
                  <Loader className="animate-spin h-8 w-8 mx-auto" />
                ) : (
                  stats.totalMembers.toLocaleString()
                )}
              </div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {loading ? (
                  <Loader className="animate-spin h-8 w-8 mx-auto" />
                ) : (
                  stats.discussionsToday
                )}
              </div>
              <div className="text-gray-600">Discussions Today</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {loading ? (
                  <Loader className="animate-spin h-8 w-8 mx-auto" />
                ) : (
                  stats.questionsAnswered
                )}
              </div>
              <div className="text-gray-600">Questions Answered</div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 mr-2" />
                    Popular Communities
                  </h3>
                  <CommunityList />
                </div>

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
                <CreatePostBox onPostCreated={handlePostCreated} />
              </div>
              
              {/* Posts Feed */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Recent Discussions
                  </h2>
                  <span className="text-sm text-gray-500">
                    {filteredAndSortedPosts.length} posts
                  </span>
                </div>
                
                {loading ? (
                  <div className="space-y-6">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                        <div className="animate-pulse">
                          <div className="flex space-x-4">
                            <div className="w-12 h-12 bg-gray-300 rounded"></div>
                            <div className="flex-1 space-y-2">
                              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                              <div className="space-y-1">
                                <div className="h-3 bg-gray-300 rounded"></div>
                                <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredAndSortedPosts.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg">
                    <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">
                      {searchQuery.trim() ? 'No posts match your search.' : 'No discussions yet.'}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {searchQuery.trim() ? 'Try different search terms.' : 'Be the first to start a conversation!'}
                    </p>
                  </div>
                ) : (
                  filteredAndSortedPosts.map((post) => (
                    <div key={post.id} className="transform transition-all duration-200 hover:scale-[1.02]">
                      <CommunityPost
                        postId={post.id}
                        title={post.title}
                        author={post.author}
                        authorId={post.authorId}
                        authorAvatar="/placeholder.svg"
                        community={post.community}
                        timePosted={new Date(post.createdAt).toLocaleString()}
                        content={post.content}
                        likes={post.upvotes || 0}
                        dislikes={post.downvotes || 0}
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
              
              {/* Load More Button */}
              {hasMore && !loading && filteredAndSortedPosts.length > 0 && (
                <div className="mt-10 text-center">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="bg-white border-2 border-gray-200 hover:bg-gray-50 px-8 py-3 rounded-full font-medium"
                    onClick={loadMorePosts}
                    disabled={loadingMore}
                  >
                    {loadingMore ? (
                      <div className="flex items-center space-x-2">
                        <Loader className="animate-spin h-4 w-4" />
                        <span>Loading...</span>
                      </div>
                    ) : (
                      'Load More Discussions'
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

export default Community;