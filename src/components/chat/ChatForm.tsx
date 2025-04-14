import React, { useRef } from "react";
import { Send } from "lucide-react";
import { ChatMessage } from "./types";

interface ChatFormProps {
  chatHistory: ChatMessage[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  generateBotResponse: (history: ChatMessage[]) => Promise<void>;
}

const ChatForm: React.FC<ChatFormProps> = ({ 
  chatHistory, 
  setChatHistory, 
  generateBotResponse 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = inputRef.current?.value.trim() || "";
    if (!userMessage) return;
    
    // Clear input field
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    
    // Update chat history with user message
    const updatedHistory = [...chatHistory, { role: "user" as const, text: userMessage }];
    setChatHistory(updatedHistory);
    
    // Immediately show "Thinking..." message
    setTimeout(() => {
      setChatHistory([...updatedHistory, { role: "model" as const, text: "Thinking..." }]);
      generateBotResponse(updatedHistory);
    }, 600);
  };

  return (
    <form className="chat-form" onSubmit={handleFormSubmit}>
      <input 
        ref={inputRef} 
        type="text" 
        placeholder="Message..." 
        className="message-input" 
        required 
      />
      <button type="submit">
        <Send size={18} />
      </button>
    </form>
  );
};

export default ChatForm;