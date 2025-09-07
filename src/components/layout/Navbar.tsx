import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Users,
  Menu,
  X,
  TrendingUp,
  LogIn,
  Calendar,
  LogOut,
  Settings,
} from "lucide-react";
import { useAuth } from "../../contexts/Auth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { currentUser, userData, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setIsProfileDropdownOpen(false);
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <TrendingUp className="h-8 w-8 text-finance-primary" />
              <span className="ml-2 text-xl font-display font-bold bg-clip-text text-transparent bg-finance-gradient">
                Fin<span className="text-finance-secondary">Quest</span>
              </span>
            </Link>
          </div>

          {/* Centered Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-6">
            {/* Learn */}
            <div className="relative group">
              <Link
                to="/learn"
                className="px-3 py-2 rounded-md text-sm font-medium text-black bg-white hover:bg-blue-200 transition-colors flex items-center space-x-1"
              >
                <BookOpen className="h-4 w-4" />
                <span>Learn</span>
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-max px-2 py-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-md shadow-md opacity-0 group-hover:opacity-70 transition-opacity duration-200 z-50">
                Take part in short courses to improve your financial knowledge
              </div>
            </div>

            {/* Community */}
            <div className="relative group">
              <Link
                to="/community"
                className="px-3 py-2 rounded-md text-sm font-medium text-black bg-white hover:bg-blue-200 transition-colors flex items-center space-x-1"
              >
                <Users className="h-4 w-4" />
                <span>Community</span>
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-max px-2 py-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-md shadow-md opacity-0 group-hover:opacity-70 transition-opacity duration-200 z-50">
                Join communities and meet people of similar interests in finance
              </div>
            </div>

            {/* Events */}
            <div className="relative group">
              <Link
                to="/events"
                className="px-3 py-2 rounded-md text-sm font-medium text-black bg-white hover:bg-blue-200 transition-colors flex items-center space-x-1"
              >
                <Calendar className="h-4 w-4" />
                <span>Events</span>
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-max px-2 py-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-md shadow-md opacity-0 group-hover:opacity-70 transition-opacity duration-200 z-50">
                Take part in live workshops/seminars hosted by industry professionals
              </div>
            </div>

            {/* RiskWise */}
            <div className="relative group">
              <Link
                to="/riskwise"
                className="px-3 py-2 rounded-md text-sm font-medium text-black bg-white hover:bg-blue-200 transition-colors flex items-center space-x-1"
              >
                <Users className="h-4 w-4" />
                <span>RiskWise</span>
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-max px-2 py-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-md shadow-md opacity-0 group-hover:opacity-70 transition-opacity duration-200 z-50">
                Analyse and assess your financial risks easily.
              </div>
            </div>
          </div>

          {/* Right Side - Auth Buttons and Profile */}
          <div className="hidden md:flex items-center space-x-1 -mr-20">
            {currentUser && userData ? (
              // Logged in state
              <div className="flex items-center space-x-3">
                {/* Profile with dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-blue-200 transition-colors"
                  >
                    <User className="h-4 w-4 text-black" />
                    <span>{userData.firstName} {userData.lastName}</span>
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm text-gray-500">Signed in as</p>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {userData.email}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <User className="mr-3 h-4 w-4" />
                        View Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <Settings className="mr-3 h-4 w-4" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                      >
                        <LogOut className="mr-3 h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  )}
                  
                  {/* Tooltip for profile */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-max px-2 py-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-md shadow-md opacity-0 group-hover:opacity-70 transition-opacity duration-200 z-50">
                    View your User profile
                  </div>
                </div>
              </div>
            ) : (
              // Not logged in state
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-finance-primary border-finance-primary hover:bg-finance-primary/10"
                  >
                    <LogIn className="h-4 w-4 mr-1" />
                    Log in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="sm"
                    className="bg-finance-primary hover:bg-finance-primary/90"
                  >
                    Get Started
                  </Button>
                </Link>
                <div className="relative group">
                  <Link
                    to="/profile"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-70 bg-white hover:bg-blue-200 transition-colors flex items-center space-x-1"
                  >
                    <User className="h-4 w-4 text-black" />
                    <span>Profile</span>
                  </Link>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-max px-2 py-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-md shadow-md opacity-0 group-hover:opacity-70 transition-opacity duration-200 z-50">
                    View your User profile
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
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
              to="/events"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-finance-primary hover:bg-gray-50 transition-colors"
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Events</span>
              </div>
            </Link>

            {/* Mobile RiskWise */}
            <div className="relative group">
              <Link
                to="/riskwise"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center space-x-2"
                onClick={toggleMenu}
              >
                <Users className="h-5 w-5 text-white" />
                <span>RiskWise</span>
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-max px-2 py-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                Analyze and assess your financial risks easily.
              </div>
            </div>

            {/* Mobile Auth Section */}
            <div className="pt-4 flex flex-col space-y-2">
              {currentUser && userData ? (
                // Mobile logged in state
                <>
                  <div className="px-3 py-2 text-sm text-gray-600 border-b border-gray-100">
                    Signed in as <strong>{userData.firstName} {userData.lastName}</strong>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-finance-primary hover:bg-gray-50 transition-colors"
                    onClick={toggleMenu}
                  >
                    <User className="h-5 w-5 text-black mr-2" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-finance-primary hover:bg-gray-50 transition-colors"
                    onClick={toggleMenu}
                  >
                    <Settings className="h-5 w-5 text-black mr-2" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-700 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    <span>Sign out</span>
                  </button>
                </>
              ) : (
                // Mobile not logged in state
                <>
                  <Link to="/login" className="w-full" onClick={toggleMenu}>
                    <Button
                      variant="outline"
                      className="w-full justify-center text-finance-primary border-finance-primary"
                    >
                      <LogIn className="h-4 w-4 mr-1" />
                      Log in
                    </Button>
                  </Link>
                  <Link to="/register" className="w-full" onClick={toggleMenu}>
                    <Button className="w-full justify-center bg-finance-primary hover:bg-finance-primary/90">
                      Get Started
                    </Button>
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-finance-primary hover:bg-gray-50 transition-colors"
                    onClick={toggleMenu}
                  >
                    <User className="h-5 w-5 text-black mr-2" />
                    <span>Profile</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;