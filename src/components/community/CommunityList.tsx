
import React from "react";
import { Link } from "react-router-dom";
import { Users, TrendingUp, BookOpen, Wallet, Bell, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const communities = [
  {
    name: "StockMarket",
    description: "Discussion about stock markets, trading strategies, and investment trends.",
    memberCount: 0,
    icon: TrendingUp,
    color: "text-finance-primary bg-finance-primary/10",
  },
  {
    name: "Budgeting 101",
    description: "Tips, advice, and discussions about managing personal finances and budgeting.",
    memberCount: 0,
    icon: Wallet,
    color: "text-finance-secondary bg-finance-secondary/10",
  },
  {
    name: "Easy Invest Hub",
    description: "A supportive community for those who are new to investing.",
    memberCount: 0,
    icon: BookOpen,
    color: "text-finance-accent bg-finance-accent/10",
  },
  {
    name: "The Golden Horizon",
    description: "Discuss strategies for planning a comfortable and stress-free retirement.",
    memberCount: 0,
    icon: DollarSign,
    color: "text-amber-600 bg-amber-100",
  },
  {
    name: "WealthBuilders Hub",
    description: "Discuss tips and strategies used to improve finance",
    memberCount: 0,
    icon: Bell,
    color: "text-purple-600 bg-purple-100",
  },
];

const CommunityList = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Popular Communities</h2>
      </div>
      
      <div className="divide-y divide-gray-100">
        {communities.map((community) => (
          <div key={community.name} className="p-4 hover:bg-blue-50 transition-colors">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${community.color}`}>
                <community.icon className="h-5 w-5" />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-blue-900">r/{community.name}</h3>
                  <div className="flex items-center text-xs text-blue-300">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{community.memberCount.toLocaleString()}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{community.description}</p>
                
                <Button variant="outline" size="sm" className="text-finance-primary border-finance-primary w-full">
                  Join Community
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-gray-50 border-t border-blue-100 hover:bg-blue-100">
        <Link to="/create-community">
          <Button variant="outline" size="sm" className="w-full">
            Browse All Communities
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CommunityList;
