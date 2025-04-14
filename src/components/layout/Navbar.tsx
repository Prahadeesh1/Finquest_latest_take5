import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Users, 
  Menu, 
  X, 
  TrendingUp, 
  LogIn 
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <TrendingUp className="h-8 w-8 text-finance-primary" />
              <span className="ml-2 text-xl font-display font-bold bg-clip-text text-transparent bg-finance-gradient">
                Fin<span className="text-finance-secondary">Quest</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/learn" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-finance-primary hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-1">
                <BookOpen className="h-4 w-4" />
                <span>Learn</span>
              </div>
            </Link>
            <Link to="/community" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-finance-primary hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>Community</span>
              </div>
            </Link>
            <Link to="/riskwise" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-finance-primary hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>RiskWise</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <Link to="/login">
              <Button variant="outline" size="sm" className="text-finance-primary border-finance-primary hover:bg-finance-primary/10">
                <LogIn className="h-4 w-4 mr-1" />
                Log in
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="bg-finance-primary hover:bg-finance-primary/90">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-finance-primary hover:bg-gray-50 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/learn" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-finance-primary hover:bg-gray-50 transition-colors"
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Learn</span>
              </div>
            </Link>

            <Link 
              to="/community" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-finance-primary hover:bg-gray-50 transition-colors"
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Community</span>
              </div>
            </Link>

            <Link 
              to="/riskwise" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-finance-primary hover:bg-gray-50 transition-colors"
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>RiskWise</span>
              </div>
            </Link>

            <div className="pt-4 flex flex-col space-y-2">
              <Link 
                to="/login" 
                className="w-full"
                onClick={toggleMenu}
              >
                <Button variant="outline" className="w-full justify-center text-finance-primary border-finance-primary">
                  <LogIn className="h-4 w-4 mr-1" />
                  Log in
                </Button>
              </Link>
              <Link 
                to="/register" 
                className="w-full"
                onClick={toggleMenu}
              >
                <Button className="w-full justify-center bg-finance-primary hover:bg-finance-primary/90">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
