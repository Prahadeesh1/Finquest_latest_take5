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
        { id: '1', text: 'Hello! I\'m your AI financial assistant. How can I help you today?', sender: 'ai', timestamp: new Date() }
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

  // Simple finance knowledge base
  const getFinanceResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Budget and Savings
    if (lowerQuery.includes('budget') || lowerQuery.includes('save money')) {
      return "Creating a budget is crucial for financial health! Here's a simple approach:\n\n1. **Track your income** - Know exactly what comes in monthly\n2. **List your expenses** - Categorize into needs, wants, and savings\n3. **Follow the 50/30/20 rule** - 50% needs, 30% wants, 20% savings\n4. **Use budgeting apps** - Tools like Mint or YNAB can help\n5. **Review monthly** - Adjust as needed\n\nWould you like specific advice on any of these steps?";
    }
    
    // Investment basics
    if (lowerQuery.includes('invest') || lowerQuery.includes('stock') || lowerQuery.includes('portfolio')) {
      return "Investment is key to building wealth! Here are the basics:\n\n1. **Start with emergency fund** - 3-6 months expenses first\n2. **Diversify** - Don't put all eggs in one basket\n3. **Consider index funds** - Low-cost, diversified option\n4. **Think long-term** - Time in market beats timing the market\n5. **Risk tolerance** - Invest based on your comfort level\n\nTypes of investments:\n- **Stocks**: Higher risk, higher potential return\n- **Bonds**: Lower risk, steady income\n- **ETFs/Index Funds**: Diversified, low fees\n- **Real Estate**: Tangible asset, passive income\n\nWhat would you like to know more about?";
    }
    
    // Credit and debt
    if (lowerQuery.includes('credit') || lowerQuery.includes('debt') || lowerQuery.includes('loan')) {
      return "Managing credit and debt wisely is essential:\n\n**Credit Score Tips:**\n- Pay bills on time (35% of score)\n- Keep credit utilization under 30%\n- Don't close old accounts\n- Limit new credit applications\n\n**Debt Management:**\n- List all debts with interest rates\n- Pay minimums on all, extra on highest rate\n- Consider debt avalanche or snowball method\n- Negotiate lower rates with creditors\n- Avoid taking new debt while paying off existing\n\nNeed help with a specific debt situation?";
    }
    
    // Emergency fund
    if (lowerQuery.includes('emergency fund') || lowerQuery.includes('rainy day')) {
      return "An emergency fund is your financial safety net! 🛡️\n\n**How much to save:**\n- Minimum: $1,000 starter fund\n- Goal: 3-6 months of expenses\n- Self-employed: 6-12 months\n\n**Where to keep it:**\n- High-yield savings account\n- Money market account\n- Keep it liquid and accessible\n\n**Building strategy:**\n- Automate monthly transfers\n- Save windfalls (tax refunds, bonuses)\n- Start small, stay consistent\n\nWant help calculating your target amount?";
    }
    
    // Retirement planning
    if (lowerQuery.includes('retirement') || lowerQuery.includes('401k') || lowerQuery.includes('ira')) {
      return "Retirement planning is investing in your future self! 🌅\n\n**Key accounts:**\n- **401(k)**: Employer-sponsored, often with matching\n- **Traditional IRA**: Tax-deductible contributions\n- **Roth IRA**: Tax-free withdrawals in retirement\n\n**Strategy:**\n- Start as early as possible (compound interest!)\n- Contribute enough for employer match (free money!)\n- Increase contributions with raises\n- Diversify investments\n- Target 15% of income for retirement\n\n**Rule of thumb:**\n- By 30: 1x annual salary saved\n- By 40: 3x annual salary\n- By 50: 6x annual salary\n- By 60: 8x annual salary\n\nWhat's your current retirement savings situation?";
    }
    
    // Taxes
    if (lowerQuery.includes('tax') || lowerQuery.includes('deduction')) {
      return "Understanding taxes can save you money! 💰\n\n**Common deductions:**\n- Mortgage interest\n- Student loan interest\n- Charitable donations\n- Medical expenses (over 7.5% of AGI)\n- State/local taxes (up to $10k)\n\n**Tax-advantaged accounts:**\n- 401(k) and Traditional IRA (pre-tax)\n- Roth IRA (post-tax, tax-free growth)\n- HSA (triple tax advantage!)\n\n**Tips:**\n- Keep good records year-round\n- Contribute to retirement accounts\n- Consider tax-loss harvesting\n- Hire a CPA for complex situations\n\nNeed specific tax advice? (Always consult a tax professional!)";
    }
    
    // Insurance
    if (lowerQuery.includes('insurance')) {
      return "Insurance protects your financial future! 🛡️\n\n**Essential types:**\n1. **Health insurance** - Prevents medical bankruptcy\n2. **Life insurance** - Protects dependents (if you have them)\n3. **Disability insurance** - Protects your income\n4. **Auto insurance** - Required by law\n5. **Homeowners/Renters** - Protects your property\n\n**How much life insurance:**\n- 10-12x annual income\n- Or calculate specific needs (debts + future expenses)\n\n**Tips:**\n- Shop around and compare\n- Bundle policies for discounts\n- Review coverage annually\n- Increase deductibles to lower premiums\n\nWhich type of insurance are you curious about?";
    }
    
    // General finance advice
    if (lowerQuery.includes('financial advice') || lowerQuery.includes('money tips') || lowerQuery.includes('wealth')) {
      return "Here are key principles for financial success:\n\n**The Fundamentals:**\n1. **Spend less than you earn** - Foundation of wealth\n2. **Emergency fund first** - 3-6 months expenses\n3. **Pay off high-interest debt** - Credit cards, personal loans\n4. **Save for retirement** - Start early, be consistent\n5. **Invest wisely** - Diversified, low-cost index funds\n6. **Insure appropriately** - Protect what you have\n7. **Continue learning** - Financial literacy is power\n\n**Golden rules:**\n- Pay yourself first (automate savings)\n- Avoid lifestyle inflation\n- Live below your means\n- Focus on net worth, not income\n\nWhat specific area would you like to focus on?";
    }
    
    // Default response
    return "I'm here to help with your finance questions! I can assist with:\n\n💰 **Budgeting & Saving**\n📈 **Investing & Stocks**\n💳 **Credit & Debt Management**\n🏦 **Emergency Funds**\n🌅 **Retirement Planning**\n📊 **Tax Strategies**\n🛡️ **Insurance**\n\nWhat would you like to know more about? Feel free to ask specific questions!";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !currentChat) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === currentChatId
          ? { ...chat, messages: [...chat.messages, userMessage] }
          : chat
      )
    );

    const queryText = inputText;
    setInputText('');
    setIsTyping(true);

    // Simulate thinking time for more natural feel
    setTimeout(() => {
      const aiResponse = getFinanceResponse(queryText);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, aiMessage] }
            : chat
        )
      );
      setIsTyping(false);
    }, 800 + Math.random() * 700); // Random delay between 800-1500ms
  };

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: `Chat ${chats.length + 1}`,
      messages: [
        { id: '1', text: 'Hello! I\'m your AI financial assistant. How can I help you today?', sender: 'ai', timestamp: new Date() }
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
    if (currentChatId === chatId) {
      setCurrentChatId(updatedChats[0].id);
    }
  };

  const selectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    setIsDrawerOpen(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 overflow-hidden">
      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white/95 backdrop-blur-xl border-r border-blue-200 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-blue-200">
            <h2 className="text-xl font-bold text-blue-900">
              Chat History
            </h2>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-700"
            >
              <X size={20} />
            </button>
          </div>

          <button
            onClick={createNewChat}
            className="m-4 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-sky-500 text-white rounded-xl hover:from-blue-600 hover:to-sky-600 transition-all transform hover:scale-105 shadow-md"
          >
            <Plus size={20} />
            <span className="font-medium">New Chat</span>
          </button>

          <div className="flex-1 overflow-y-auto px-4 space-y-2">
            {chats.map(chat => (
              <div
                key={chat.id}
                className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                  currentChatId === chat.id
                    ? 'bg-blue-100 border border-blue-300'
                    : 'hover:bg-blue-50'
                }`}
                onClick={() => selectChat(chat.id)}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <MessageSquare size={18} className="flex-shrink-0 text-blue-600" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate text-blue-900">{chat.title}</p>
                    <p className="text-xs text-gray-600 truncate">
                      {chat.messages[chat.messages.length - 1]?.text}
                    </p>
                  </div>
                </div>
                {chats.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-100 rounded-lg transition-all"
                  >
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
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-700"
          >
            <Menu size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-blue-900">
              AI Financial Assistant
            </h1>
            <p className="text-sm text-gray-600">{currentChat?.title}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {currentChat?.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-2xl px-6 py-4 rounded-2xl shadow-md ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-sky-500 text-white ml-12'
                    : 'bg-white border border-blue-200 mr-12 text-gray-800'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
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
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
    </div>
  );
};

export default ChatbotPage;