import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Image as ImageIcon, Link2, PenSquare, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";

const CreatePostBox = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (postContent.trim() === "" && !uploadedFile) {
      toast.error("Post content cannot be empty");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      toast.success("Post created successfully!");
      setPostContent("");
      setUploadedFile(null);
      setIsExpanded(false);
      setIsSubmitting(false);
    }, 1500);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFile(acceptedFiles[0]);
    },
  });

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-200 overflow-hidden mb-6">
      {!isExpanded ? (
        <div className="p-4">
          <div
            className="flex items-center gap-3 p-2 border border-gray-200 dark:border-gray-700 rounded-md cursor-text"
            onClick={() => setIsExpanded(true)}
          >
            <img
              src="src/components/images/post.avif"
              alt="User"
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="text-gray-600 dark:text-gray-300 font-medium">Create a post</span>
          </div>

          <div className="flex justify-between mt-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 space-x-1"
              onClick={() => setIsExpanded(true)}
              title="Add text"
            >
              <Edit className="h-4 w-4" />
              <span>Text</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 space-x-1"
              onClick={() => setIsExpanded(true)}
              title="Add image"
            >
              <ImageIcon className="h-4 w-4" />
              <span>Image</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 space-x-1"
              onClick={() => setIsExpanded(true)}
              title="Add link"
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
            <textarea
              className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md p-3 h-32 focus:outline-none focus:ring-2 focus:ring-finance-primary/50 mb-4"
              placeholder="Share something insightful about finance..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              autoFocus
            />

            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-md p-4 text-center text-sm cursor-pointer transition-colors ${
                isDragActive
                  ? "border-blue-400 bg-blue-50 dark:bg-gray-700"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <input {...getInputProps()} />
              {uploadedFile ? (
                <p className="text-green-500 font-medium">{uploadedFile.name}</p>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">Drag & drop image here, or click to upload</p>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="outline" onClick={() => setIsExpanded(false)}>
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-finance-primary hover:bg-finance-primary/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader className="animate-spin h-4 w-4" /> : "Post"}
              </Button>
            </div>
          </motion.form>
        </AnimatePresence>
      )}
    </div>
  );
};

export default CreatePostBox;