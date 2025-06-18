// src/pages/Dashboard.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "../contexts/Auth";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Mail, Calendar, TrendingUp } from "lucide-react";
import { Timestamp } from "firebase/firestore";

const Dashboard = () => {
  const { currentUser, userData, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <TrendingUp className="h-12 w-12 text-finance-primary mr-4" />
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      Welcome, {userData?.firstName || currentUser?.displayName || 'User'}!
                    </h1>
                    <p className="text-gray-600">
                      Your financial journey starts here
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Account Information
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-700">
                        {userData?.firstName} {userData?.lastName}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-700">
                        {currentUser?.email}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-700">
                      </span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-700 capitalize">
                        Experience: {userData?.experienceLevel || 'Not specified'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-finance-primary to-finance-secondary rounded-lg p-6 text-white">
                  <h2 className="text-xl font-semibold mb-4">
                    Quick Actions
                  </h2>
                  <div className="space-y-3">
                    <Button
                      onClick={() => navigate('/learn')}
                      variant="secondary"
                      className="w-full justify-start"
                    >
                      Start Learning
                    </Button>
                    <Button
                      onClick={() => navigate('/assessment')}
                      variant="secondary"
                      className="w-full justify-start"
                    >
                      Take Risk Assessment
                    </Button>
                    <Button
                      onClick={() => navigate('/community')}
                      variant="secondary"
                      className="w-full justify-start"
                    >
                      Join Community
                    </Button>
                    <Button
                      onClick={() => navigate('/RiskWise')}
                      variant="secondary"
                      className="w-full justify-start"
                    >
                      Explore RiskWise
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Get Started with Your Financial Journey
                </h3>
                <p className="text-blue-700 mb-4">
                  Based on your {userData?.experienceLevel || 'beginner'} experience level, we've curated some resources to help you get started.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" onClick={() => navigate('/learn')}>
                    Educational Content
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => navigate('/assessment')}>
                    Risk Assessment
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => navigate('/events')}>
                    Upcoming Events
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;