
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 mr-10">
            <DollarSign className="h-6 w-6 text-riskwise-moderate" />
            <span className="text-xl font-bold text-gray-800">RiskWise</span>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link 
              to="/" 
              className={`py-2 text-sm ${isActive('/') ? 'text-riskwise-moderate font-medium border-b-2 border-riskwise-moderate' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Home
            </Link>
            <Link 
              to="/conservative" 
              className={`py-2 text-sm ${isActive('/conservative') ? 'text-riskwise-moderate font-medium border-b-2 border-riskwise-moderate' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Conservative
            </Link>
            <Link 
              to="/moderate" 
              className={`py-2 text-sm ${isActive('/moderate') ? 'text-riskwise-moderate font-medium border-b-2 border-riskwise-moderate' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Moderate
            </Link>
            <Link 
              to="/aggressive" 
              className={`py-2 text-sm ${isActive('/aggressive') ? 'text-riskwise-moderate font-medium border-b-2 border-riskwise-moderate' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Aggressive
            </Link>
            <Link 
              to="/assessment" 
              className={`py-2 text-sm ${isActive('/assessment') ? 'text-riskwise-moderate font-medium border-b-2 border-riskwise-moderate' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Risk Assessment
            </Link>
          </nav>
        </div>
        
        <Button 
          className="bg-riskwise-moderate hover:bg-riskwise-aggressive text-white"
        >
          Get Started
        </Button>
      </div>
    </header>
  );
};

export default Navigation;