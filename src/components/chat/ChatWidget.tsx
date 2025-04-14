import React, { useEffect, useRef, useState } from "react";
import ChatBotIcon from "./ChatBotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { ChatMessage as ChatMessageType } from "./types";

const ChatWidget: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessageType[]>([]);
  const [isMinimized, setIsMinimized] = useState<boolean>(true); // Start minimized
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Define API URL - you can move this to a .env file or constants file
  const API_URL = import.meta.env.VITE_API_URL || "https://your-api-endpoint.com/chat";

  const generateBotResponse = async (history: ChatMessageType[]) => {
    const updateHistory = (text: string) => {
      setChatHistory(prev => 
        [...prev.filter(msg => msg.text !== "Thinking..."), 
         { role: "model", text }]
      );
    };

    const formattedHistory = history.map(({ role, text }) => ({ 
      role, 
      parts: [{ text }] 
    }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: formattedHistory }),
    };

    try {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || "Something went wrong!");
      }

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
        
      updateHistory(apiResponseText);
    } catch (error) {
      console.error("Error generating response:", error);
      updateHistory("Sorry, I encountered an error. Please try again.");
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [chatHistory]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isMinimized ? (
        <div className="chatbot-popup">
          <div className="chat-header">
            <div className="header-info">
              <ChatBotIcon />
              <h2 className="logo-text">ChatBot</h2>
            </div>
            <button 
              className="material-symbols-rounded"
              onClick={toggleMinimize}
            >
              &#x2304; {/* Unicode for keyboard_arrow_down */}
            </button>
          </div>

          <div ref={chatBodyRef} className="chat-body">
            <div className="message bot-message">
              <ChatBotIcon />
              <p className="message-text">
                Hi!<br />How can I help you today?
              </p>
            </div>

            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          <div className="chat-footer">
            <ChatForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      ) : (
        <button
          onClick={toggleMinimize}
          className="chat-toggle-button"
          aria-label="Open chat"
        >
          <ChatBotIcon />
        </button>
      )}
    </div>
  );
};

export default ChatWidget;