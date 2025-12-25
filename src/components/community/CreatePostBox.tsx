import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Image as ImageIcon, Link2, PenSquare, Loader, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { PostService } from "@/services/realtimeDB";
import { StorageService } from "@/services/storageService";
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const communities = [
    { id: "financeflow-together", name: "FinanceFlow Together" },
    { id: "stockmarket", name: "StockMarket" },
    { id: "budgeting-101", name: "Budgeting 101" },
    { id: "easy-invest-hub", name: "Easy Invest Hub" }
  ];

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
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

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setUploadProgress(0);
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

    if (postType === 'text' && postContent.trim() === "") {
      toast.error("Post content cannot be empty");
      return;
    }

    if (postType === 'link' && linkUrl.trim() === "") {
      toast.error("Link URL is required for link posts");
      return;
    }

    if (postType === 'image' && !imageFile) {
      toast.error("Please select an image");
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = "";

      // Upload image if it's an image post
      if (postType === 'image' && imageFile) {
        toast.info('Uploading image...');
        setUploadProgress(50);
        imageUrl = await StorageService.uploadPostImage(imageFile, currentUser.uid);
        setUploadProgress(100);
      }

      const tags = extractTags(postContent + " " + postTitle);
      
      const postData = {
        title: postTitle.trim(),
        content: postContent.trim() || (postType === 'image' ? 'Image post' : ''),
        author: userData.firstName + " " + userData.lastName,
        authorId: currentUser.uid,
        community: selectedCommunity,
        tags: tags,
        type: postType,
        ...(postType === 'link' && { linkUrl: linkUrl.trim() }),
        ...(postType === 'image' && imageUrl && { imageUrl })
      };

      await PostService.createPost(postData);
      
      toast.success("Post created successfully!");
      
      // Reset form
      setPostContent("");
      setPostTitle("");
      setLinkUrl("");
      setImageFile(null);
      setImagePreview(null);
      setPostType('text');
      setIsExpanded(false);
      setUploadProgress(0);
      
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
    if (type !== 'link') {
      setLinkUrl("");
    }
    if (type !== 'image') {
      removeImage();
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
            >
              <Edit className="h-4 w-4" />
              <span>Text Post</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 space-x-2 flex-1 mr-2"
              onClick={() => handlePostTypeChange('image')}
            >
              <ImageIcon className="h-4 w-4" />
              <span>Image</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 space-x-2 flex-1"
              onClick={() => handlePostTypeChange('link')}
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

            {/* Image Upload */}
            {postType === 'image' && (
              <div className="mb-4">
                {!imagePreview ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="w-full p-2 border border-gray-200 rounded-md"
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-gray-500 mt-1">Max size: 5MB</p>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full max-h-96 object-contain rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      disabled={isSubmitting}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-finance-primary h-2 rounded-full transition-all"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Uploading... {uploadProgress}%</p>
                  </div>
                )}
              </div>
            )}

            {/* Post Content */}
            <textarea
              className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md p-3 h-32 focus:outline-none focus:ring-2 focus:ring-finance-primary/50 mb-4 resize-none"
              placeholder={
                postType === 'link' 
                  ? "Describe why this link is valuable to the community..."
                  : postType === 'image'
                  ? "Add a description for your image... Use #hashtags to categorize!"
                  : "Share something insightful about finance... Use #hashtags to categorize your post!"
              }
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              autoFocus={postType === 'text'}
              disabled={isSubmitting}
              maxLength={2000}
            />

            {/* Link URL */}
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
                  removeImage();
                  setPostType('text');
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-finance-primary hover:bg-finance-primary/90 text-white min-w-[100px]"
                disabled={isSubmitting || !postTitle.trim() || (postType === 'image' && !imageFile)}
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

// Add this to CommunityPost.tsx to display images:
// In the post content section, after the text content div, add:
/*
{postType === 'image' && imageUrl && (
  <div className="mb-4 mt-4">
    <img 
      src={imageUrl} 
      alt={title}
      className="w-full max-h-[500px] object-contain rounded-lg border border-gray-200 cursor-pointer hover:opacity-95 transition-opacity"
      onClick={() => window.open(imageUrl, '_blank')}
      loading="lazy"
    />
  </div>
)}
*/