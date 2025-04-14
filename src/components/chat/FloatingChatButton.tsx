
import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Here you would typically send the message to a backend
      console.log("Message sent:", message);
      setMessage("");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-80 sm:w-96 h-96 flex flex-col overflow-hidden soft-shadow animate-fade-in">
          <div className="bg-finance-primary text-white p-4 flex justify-between items-center">
            <h3 className="font-medium">Financial Assistant</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleChat}
              className="h-8 w-8 rounded-full text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
            <div className="bg-finance-primary/10 rounded-lg p-3 mb-4 max-w-[80%]">
              <p className="text-sm">Hello! I'm your financial assistant. How can I help you today?</p>
            </div>
            <div className="bg-gray-200 rounded-lg p-3 mb-4 max-w-[80%] ml-auto">
              <p className="text-sm">I want to learn about investing.</p>
            </div>
            <div className="bg-finance-primary/10 rounded-lg p-3 mb-4 max-w-[80%]">
              <p className="text-sm">Great choice! Would you like to learn about stocks, bonds, ETFs, or perhaps the basics of investing?</p>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Type your question..."
                className="finance-input flex-grow py-2 text-sm"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button 
                type="submit"
                className="bg-finance-primary hover:bg-finance-primary/90 px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <Button
          onClick={toggleChat}
          className="h-14 w-14 rounded-full bg-finance-primary hover:bg-finance-primary/90 shadow-lg hover-lift"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default FloatingChatButton;
