import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Edit, Image as ImageIcon, Link2, PenSquare, Loader, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { PostService } from "@/services/realtimeDB";
import { useAuth } from "@/contexts/Auth";

interface CreatePostBoxProps {
  communityId?: string;
  onPostCreated?: () => void;
}

const CreatePostBox = ({ communityId = "financeflow-together", onPostCreated }: CreatePostBoxProps) => {
  const { currentUser, userData } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState(communityId);
  const [postType, setPostType] = useState<'text' | 'image' | 'link'>('text');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  
  // ✅ NEW: Image upload state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Available communities for posting
  const communities = [
    { id: "financeflow-together", name: "FinanceFlow Together" },
    { id: "stockmarket", name: "StockMarket" },
    { id: "budgeting-101", name: "Budgeting 101" },
    { id: "easy-invest-hub", name: "Easy Invest Hub" }
  ];

  // ✅ NEW: Handle image selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // ✅ NEW: Remove image
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser || !userData) {
      toast.error("Please login to create posts");
      return;
    }

    if (postTitle.trim() === "") {
      toast.error("Post title is required");
      return;
    }

    if (postType === 'image' && !imageFile) {
      toast.error("Please select an image for your post");
      return;
    }

    if (postType === 'text' && postContent.trim() === "") {
      toast.error("Post content cannot be empty");
      return;
    }

    if (postType === 'link' && linkUrl.trim() === "") {
      toast.error("Link URL is required for link posts");
      return;
    }

    setIsSubmitting(true);

    try {
      // Extract tags from content (simple hashtag extraction)
      const tags = extractTags(postContent + " " + postTitle);
      
      const postData = {
        title: postTitle.trim(),
        content: postContent.trim(),
        author: userData.firstName + " " + userData.lastName,
        authorId: currentUser.uid,
        community: selectedCommunity,
        tags: tags,
        type: postType,
        ...(postType === 'link' && { linkUrl: linkUrl.trim() })
      };

      // ✅ FIXED: Pass image file to createPost
      const postId = await PostService.createPost(postData, imageFile || undefined);
      
      toast.success("Post created successfully!");
      
      // Reset form
      setPostContent("");
      setPostTitle("");
      setLinkUrl("");
      setPostType('text');
      setImageFile(null);
      setImagePreview(null);
      setIsExpanded(false);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Call callback if provided
      if (onPostCreated) {
        onPostCreated();
      }
      
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const extractTags = (text: string): string[] => {
    const hashtagRegex = /#(\w+)/g;
    const matches = text.match(hashtagRegex);
    return matches ? matches.map(tag => tag.slice(1).toLowerCase()) : [];
  };

  const handlePostTypeChange = (type: 'text' | 'image' | 'link') => {
    setPostType(type);
    if (type === 'text') {
      setLinkUrl("");
      setImageFile(null);
      setImagePreview(null);
    } else if (type === 'image') {
      setLinkUrl("");
    } else if (type === 'link') {
      setImageFile(null);
      setImagePreview(null);
    }
    setIsExpanded(true);
  };

  if (!currentUser) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 p-6 mb-6 text-center">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Please login to create posts and join the community discussion.
        </p>
        <div className="space-x-3">
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/register">
            <Button className="bg-finance-primary hover:bg-finance-primary/90">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-200 overflow-hidden mb-6">
      {!isExpanded ? (
        <div className="p-4">
          <div
            className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-text hover:border-finance-primary transition-colors"
            onClick={() => setIsExpanded(true)}
          >
            <div className="w-8 h-8 rounded-full bg-finance-primary/20 flex items-center justify-center">
              <span className="text-finance-primary font-semibold text-sm">
                {userData?.firstName?.[0]}{userData?.lastName?.[0]}
              </span>
            </div>
            <span className="text-gray-600 dark:text-gray-300 font-medium">
              Share your financial insights with the community...
            </span>
          </div>

          <div className="flex justify-between mt-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 space-x-2 flex-1 mr-2"
              onClick={() => handlePostTypeChange('text')}
              title="Create a text post"
            >
              <Edit className="h-4 w-4" />
              <span>Text Post</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 space-x-2 flex-1 mr-2"
              onClick={() => handlePostTypeChange('image')}
              title="Share an image"
            >
              <ImageIcon className="h-4 w-4" />
              <span>Image</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 space-x-2 flex-1"
              onClick={() => handlePostTypeChange('link')}
              title="Share a link"
            >
              <Link2 className="h-4 w-4" />
              <span>Link</span>
            </Button>
          </div>
        </div>
      ) : (
        <AnimatePresence>
          <motion.form
            onSubmit={handleSubmit}
            className="p-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Community Selection */}
            <div className="mb-4">
              <label htmlFor="community" className="block text-sm font-medium text-gray-700 mb-2">
                Choose Community
              </label>
              <select
                id="community"
                value={selectedCommunity}
                onChange={(e) => setSelectedCommunity(e.target.value)}
                className="w-full p-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-finance-primary/50"
                disabled={isSubmitting}
              >
                {communities.map((community) => (
                  <option key={community.id} value={community.id}>
                    {community.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Post Title */}
            <input
              type="text"
              placeholder="Enter a catchy title for your post..."
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-finance-primary/50 font-medium"
              disabled={isSubmitting}
              maxLength={200}
            />

            {/* Post Content */}
            <textarea
              className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md p-3 h-32 focus:outline-none focus:ring-2 focus:ring-finance-primary/50 mb-4 resize-none"
              placeholder={
                postType === 'link' 
                  ? "Describe why this link is valuable to the community..."
                  : postType === 'image'
                  ? "Describe your image... Use #hashtags to categorize your post!"
                  : "Share something insightful about finance... Use #hashtags to categorize your post!"
              }
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              autoFocus
              disabled={isSubmitting}
              maxLength={2000}
            />

            {/* ✅ NEW: Image upload section */}
            {postType === 'image' && (
              <div className="mb-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  disabled={isSubmitting}
                />
                
                {!imagePreview ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-finance-primary transition-colors cursor-pointer"
                    disabled={isSubmitting}
                  >
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 text-sm">Click to upload image</p>
                    <p className="text-gray-400 text-xs mt-1">Max size: 5MB</p>
                  </button>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full max-h-64 object-contain rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      disabled={isSubmitting}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Link URL input for link posts */}
            {postType === 'link' && (
              <input
                type="url"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-finance-primary/50"
                disabled={isSubmitting}
              />
            )}

            {/* Character count */}
            <div className="text-right text-xs text-gray-400 mb-4">
              Title: {postTitle.length}/200 | Content: {postContent.length}/2000
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsExpanded(false);
                  setPostTitle("");
                  setPostContent("");
                  setLinkUrl("");
                  setImageFile(null);
                  setImagePreview(null);
                  setPostType('text');
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-finance-primary hover:bg-finance-primary/90 text-white min-w-[100px]"
                disabled={isSubmitting || (!postTitle.trim() || (postType === 'text' && !postContent.trim()) || (postType === 'link' && !linkUrl.trim()) || (postType === 'image' && !imageFile))}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <Loader className="animate-spin h-4 w-4" />
                    <span>Posting...</span>
                  </div>
                ) : (
                  <>
                    <PenSquare className="h-4 w-4 mr-2" />
                    Post
                  </>
                )}
              </Button>
            </div>

            {/* Post Type Indicator */}
            <div className="mt-3 flex items-center text-xs text-gray-500">
              <span className="mr-2">Post type:</span>
              <span className={`px-2 py-1 rounded-full text-white text-xs ${
                postType === 'text' ? 'bg-blue-500' :
                postType === 'image' ? 'bg-green-500' :
                'bg-purple-500'
              }`}>
                {postType.charAt(0).toUpperCase() + postType.slice(1)}
              </span>
            </div>
          </motion.form>
        </AnimatePresence>
      )}
    </div>
  );
};

export default CreatePostBox;