
import React from "react";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  BookOpen, 
  Users, 
  MessageCircle,
  Info,
  BookMarked
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CommunitySidebar = () => {
  return (
    <div className="space-y-6 mt-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-finance-primary h-10 relative"></div>
        <div className="p-4 pt-0">
          <div className="flex items-end -mt-6 mb-4">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <TrendingUp className="h-10 w-10 text-finance-primary" />
            </div>
            <h2 className="ml-2 text-xl font-bold">FinanceFlow Together</h2>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            A community for financial education, discussions, and collaboration on all aspects of personal finance and investing.
          </p>
          
          <div className="flex items-center justify-between text-sm mb-4">
            <div className="flex items-center">
              <Users className="h-4 w-4 text-gray-500 mr-1" />
              <span>42.8k members</span>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 bg-green-500 rounded-full mr-1"></div>
              <span>2.4k online</span>
            </div>
          </div>
          
          <div className="border-t border-gray-100 my-4 pt-4">
            <Button className="w-full bg-finance-primary hover:bg-finance-primary/90">
              Join Community
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold">About Community</h3>
        </div>
        
        <div className="p-4">
          <ul className="space-y-3 text-sm">
            <li className="flex items-start">
              <Info className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Created March 31, 2025</span>
            </li>
            <li className="flex items-start">
              <BookMarked className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Educational resource for financial literacy and investment discussions</span>
            </li>
            <li className="flex items-start">
              <MessageCircle className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Share experiences, ask questions, and learn together as a group</span>
            </li>
            <li className="flex items-start">
              <BookOpen className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Helpful resources and guides for all experience levels</span>
            </li>
          </ul>
        </div>
        
        <div className="p-4 border-t border-gray-100">
          <Link to="/community-rules">
            <Button variant="outline" size="sm" className="w-full">
              View Community Rules
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold">Community Moderators</h3>
        </div>
        
        <div className="p-4">
          <ul className="space-y-3">
            <li className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-finance-primary/20 flex items-center justify-center text-finance-primary font-medium mr-2">
                SC
              </div>
              <span>Sathivada Chandan Akshaj</span>
            </li>
            <li className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-finance-secondary/20 flex items-center justify-center text-finance-secondary font-medium mr-2">
                UP
              </div>
              <span>Umapathy Prahadeesh</span>
            </li>
            <li className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-finance-accent/20 flex items-center justify-center text-finance-accent font-medium mr-2">
                SS
              </div>
              <span>Shreyaa Sathappan</span>
            </li>
          </ul>
        </div>
        
        <div className="p-4 border-t border-gray-100">
          <Link to="/contact-mods">
            <Button variant="outline" size="sm" className="w-full">
              Contact Moderators
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommunitySidebar;
