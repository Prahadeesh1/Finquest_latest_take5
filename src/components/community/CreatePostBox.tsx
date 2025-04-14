
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Image, Link2, PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CreatePostBox = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [postContent, setPostContent] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (postContent.trim() === "") {
      toast.error("Post content cannot be empty");
      return;
    }
    
    // Here we would typically send the post to an API
    toast.success("Post created successfully!");
    setPostContent("");
    setIsExpanded(false);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
      {!isExpanded ? (
        <div className="p-4">
          <div 
            className="flex items-center gap-3 p-2 border border-gray-200 rounded-md cursor-text"
            onClick={() => setIsExpanded(true)}
          >
            <div className="h-8 w-8 rounded-full bg-finance-primary/20 flex items-center justify-center">
              <PenSquare className="h-4 w-4 text-finance-primary" />
            </div>
            <span className="text-gray-500">Create a post</span>
          </div>
          
          <div className="flex justify-between mt-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-500 hover:bg-gray-100 space-x-1"
              onClick={() => setIsExpanded(true)}
            >
              <Edit className="h-4 w-4" />
              <span>Text</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-500 hover:bg-gray-100 space-x-1"
              onClick={() => setIsExpanded(true)}
            >
              <Image className="h-4 w-4" />
              <span>Image</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-500 hover:bg-gray-100 space-x-1"
              onClick={() => setIsExpanded(true)}
            >
              <Link2 className="h-4 w-4" />
              <span>Link</span>
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-4">
          <textarea
            className="w-full border border-gray-200 rounded-md p-3 h-32 focus:outline-none focus:ring-2 focus:ring-finance-primary/50 mb-4"
            placeholder="What's on your mind about finance?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            autoFocus
          />
          
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsExpanded(false)}
            >
              Cancel
            </Button>
            
            <Button 
              type="submit"
              className="bg-finance-primary hover:bg-finance-primary/90"
            >
              Post
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreatePostBox;
