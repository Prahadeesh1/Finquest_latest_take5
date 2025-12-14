import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Send, Plus, Trash2, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

const ChatbotPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      title: 'Getting Started',
      messages: [
        { id: '1', text: "Hello! I'm your AI financial assistant. How can I help you today?", sender: 'ai', timestamp: new Date() }
      ],
      createdAt: new Date()
    }
  ]);
  const [currentChatId, setCurrentChatId] = useState('1');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find(chat => chat.id === currentChatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  // Call backend Gemini API
  const callGeminiAPI = async (prompt: string) => {
    try {
      const res = await fetch("http://localhost:3001/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      
      // Debug log - you can remove this later
      console.log("📥 Frontend received:", data);

      // Check if we have candidates array and it has items
      if (data?.candidates && Array.isArray(data.candidates) && data.candidates.length > 0) {
        const aiResponse = data.candidates[0].content;
        
        // Make sure we have actual text
        if (aiResponse && typeof aiResponse === 'string' && aiResponse.trim()) {
          return aiResponse;
        } else {
          console.error("Empty or invalid content:", aiResponse);
          return "I received an empty response. Please try again.";
        }
      } else {
        console.error("No candidates in response:", data);
        return "Sorry, I couldn't generate a response. Please try again.";
      }
    } catch (err) {
      console.error("Error calling Gemini API:", err);
      return "Error: Could not connect to the AI service. Please check if the backend is running.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !currentChat) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setChats(prev =>
      prev.map(chat =>
        chat.id === currentChatId
          ? { ...chat, messages: [...chat.messages, userMessage] }
          : chat
      )
    );

    setInputText('');
    setIsTyping(true);

    const aiResponseText = await callGeminiAPI(userMessage.text);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponseText,
      sender: 'ai',
      timestamp: new Date()
    };

    setChats(prev =>
      prev.map(chat =>
        chat.id === currentChatId
          ? { ...chat, messages: [...chat.messages, aiMessage] }
          : chat
      )
    );

    setIsTyping(false);
  };

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: `Chat ${chats.length + 1}`,
      messages: [
        { id: '1', text: "Hello! I'm your AI financial assistant. How can I help you today?", sender: 'ai', timestamp: new Date() }
      ],
      createdAt: new Date()
    };
    setChats([...chats, newChat]);
    setCurrentChatId(newChat.id);
    setIsDrawerOpen(false);
  };

  const deleteChat = (chatId: string) => {
    if (chats.length === 1) return;
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    if (currentChatId === chatId) setCurrentChatId(updatedChats[0].id);
  };

  const selectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    setIsDrawerOpen(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 overflow-hidden">
      {/* Drawer */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white/95 backdrop-blur-xl border-r border-blue-200 shadow-xl transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-blue-200">
            <h2 className="text-xl font-bold text-blue-900">Chat History</h2>
            <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-700">
              <X size={20} />
            </button>
          </div>

          <button onClick={createNewChat} className="m-4 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-sky-500 text-white rounded-xl hover:from-blue-600 hover:to-sky-600 transition-all transform hover:scale-105 shadow-md">
            <Plus size={20} />
            <span className="font-medium">New Chat</span>
          </button>

          <div className="flex-1 overflow-y-auto px-4 space-y-2">
            {chats.map(chat => (
              <div key={chat.id} className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${currentChatId === chat.id ? 'bg-blue-100 border border-blue-300' : 'hover:bg-blue-50'}`} onClick={() => selectChat(chat.id)}>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <MessageSquare size={18} className="flex-shrink-0 text-blue-600" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate text-blue-900">{chat.title}</p>
                    <p className="text-xs text-gray-600 truncate">{chat.messages[chat.messages.length - 1]?.text}</p>
                  </div>
                </div>
                {chats.length > 1 && (
                  <button onClick={(e) => { e.stopPropagation(); deleteChat(chat.id); }} className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-100 rounded-lg transition-all">
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <div className="flex items-center gap-4 p-4 border-b border-blue-200 bg-white/80 backdrop-blur-sm shadow-sm">
          <button onClick={() => setIsDrawerOpen(!isDrawerOpen)} className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-700">
            <Menu size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-blue-900">AI Financial Assistant</h1>
            <p className="text-sm text-gray-600">{currentChat?.title}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {currentChat?.messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl px-6 py-4 rounded-2xl shadow-md ${message.sender === 'user' ? 'bg-gradient-to-r from-blue-500 to-sky-500 text-white ml-12' : 'bg-white border border-blue-200 mr-12 text-gray-800'}`}>
                <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-2xl px-6 py-4 rounded-2xl bg-white border border-blue-200 mr-12 shadow-md">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-blue-200 bg-white/80 backdrop-blur-sm shadow-lg">
          <div className="max-w-4xl mx-auto flex gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me about budgeting, investing, debt management..."
              className="flex-1 px-6 py-4 bg-white border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-gray-800 shadow-sm"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="px-6 py-4 bg-gradient-to-r from-blue-500 to-sky-500 text-white rounded-2xl hover:from-blue-600 hover:to-sky-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 shadow-md"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setIsDrawerOpen(false)} />
      )}
    </div>
  );
};

export default ChatbotPage;