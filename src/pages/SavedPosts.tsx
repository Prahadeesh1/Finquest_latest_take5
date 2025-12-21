import React, { useState, useCallback, useMemo } from "react";

// Mock saved posts data
const mockSavedPosts = [
  {
    id: "1",
    title: "How to start investing with $100",
    content:
      "I've been researching ways to start investing as a beginner with limited capital. What are some good entry points?",
    author: "Sarah Chen",
    authorId: "user1",
    community: "Investing Basics",
    communityColor: "blue",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    savedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    likes: 234,
    commentCount: 45,
  },
  {
    id: "2",
    title: "Best budgeting apps for 2025",
    content:
      "Comparing different budgeting apps to find the best fit for personal finance management...",
    author: "Marcus Johnson",
    authorId: "user2",
    community: "Budgeting Tips",
    communityColor: "green",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    savedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 567,
    commentCount: 89,
  },
  {
    id: "3",
    title: "Understanding stock market volatility",
    content:
      "A deep dive into what causes market fluctuations and how to navigate them as an investor...",
    author: "Emma Wilson",
    authorId: "user3",
    community: "Stock Market",
    communityColor: "purple",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    savedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    likes: 892,
    commentCount: 156,
  },
  {
    id: "4",
    title: "Crypto for beginners: A safe approach",
    content:
      "Guide to understanding cryptocurrency basics without taking unnecessary risks...",
    author: "Alex Rivera",
    authorId: "user4",
    community: "Crypto Learning",
    communityColor: "orange",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    savedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    likes: 445,
    commentCount: 67,
  },
];

const SavedPosts = () => {
  const [savedPosts, setSavedPosts] = useState(mockSavedPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState("All");
  const [sortBy, setSortBy] = useState("recently-saved");

  // Get unique communities
  const communities = ["All", ...new Set(savedPosts.map((post) => post.community))];

  // Get community color classes
  const getCommunityBadgeColor = (color) => {
    const colorMap = {
      blue: "bg-blue-100 text-blue-700",
      green: "bg-green-100 text-green-700",
      purple: "bg-purple-100 text-purple-700",
      orange: "bg-orange-100 text-orange-700",
    };
    return colorMap[color] || "bg-gray-100 text-gray-700";
  };

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = [...savedPosts];

    // Apply community filter
    if (selectedCommunity !== "All") {
      filtered = filtered.filter((post) => post.community === selectedCommunity);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query)
      );
    }

    // Apply sorting
switch (sortBy) {
  case "recently-saved":
    filtered.sort(
      (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
    );
    break;

  case "oldest-saved":
    filtered.sort(
      (a, b) => new Date(a.savedAt).getTime() - new Date(b.savedAt).getTime()
    );
    break;

  case "recently-posted":
    filtered.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    break;

  case "most-engagement":
    filtered.sort(
      (a, b) =>
        b.likes + b.commentCount - (a.likes + a.commentCount)
    );
    break;

  default:
    break;
}

    return filtered;
  }, [savedPosts, searchQuery, selectedCommunity, sortBy]);

  // Handle remove from saved
  const handleRemoveSaved = useCallback((postId) => {
    setSavedPosts((prev) => prev.filter((post) => post.id !== postId));
  }, []);

  const getTimeAgo = (date) => {
  if (!date) return "unknown";

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return "invalid date";

  const now = Date.now();
  const diffMs = now - parsedDate.getTime();

  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};


  // Format full date
  const getFullDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Title */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-2.5">
              <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 21H5V5h14m0-2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Saved Posts</h1>
              <p className="text-gray-500 text-sm mt-1">
                {filteredAndSortedPosts.length} post
                {filteredAndSortedPosts.length !== 1 ? "s" : ""} saved
              </p>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <svg className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search your saved posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              {/* Community Filter */}
              <div className="flex items-center space-x-2">
                <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <select
                  value={selectedCommunity}
                  onChange={(e) => setSelectedCommunity(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  {communities.map((community) => (
                    <option key={community} value={community}>
                      {community}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center space-x-2">
                <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="recently-saved">Recently Saved</option>
                  <option value="oldest-saved">Oldest Saved</option>
                  <option value="recently-posted">Recently Posted</option>
                  <option value="most-engagement">Most Engagement</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredAndSortedPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
            <svg className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery.trim() ? "No saved posts found" : "No saved posts yet"}
            </h3>
            <p className="text-gray-500">
              {searchQuery.trim()
                ? "Try adjusting your search terms"
                : "Posts you save will appear here for quick access"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedPosts.map((post) => (
              <div
                key={post.id}
                className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:border-gray-300"
              >
                <div className="p-6">
                  {/* Top section: Community and timestamp */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {/* Community Badge */}
                      <span
                        className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium ${getCommunityBadgeColor(
                          post.communityColor
                        )}`}
                      >
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <span>{post.community}</span>
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Saved {getTimeAgo(post.savedAt)}
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>

                  {/* Content Preview */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.content}
                  </p>

                  {/* Author and timestamps */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 pb-5 border-b border-gray-100">
                    {/* Author info */}
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12a3 3 0 100-6 3 3 0 000 6zm0 2c-3.314 0-6 1.343-6 3v2h12v-2c0-1.657-2.686-3-6-3z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {post.author}
                        </p>
                        <p className="text-xs text-gray-500">Author</p>
                      </div>
                    </div>

                    {/* Date info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1 flex items-center space-x-1">
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Posted</span>
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {getFullDate(post.createdAt)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1 flex items-center space-x-1">
                          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                          </svg>
                          <span>Saved</span>
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {getFullDate(post.savedAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Engagement stats and actions */}
                  <div className="flex items-center justify-between">
                    {/* Stats */}
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer transition-colors">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        <span>{post.commentCount} comments</span>
                      </div>
                      <div className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer transition-colors">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                        </svg>
                        <span>{post.likes} likes</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Share post"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                      <button
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => handleRemoveSaved(post.id)}
                        title="Remove from saved"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SavedPosts;