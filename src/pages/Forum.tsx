
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MessageSquare, TrendingUp, ThumbsUp } from "lucide-react";

const Forum = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
          <p className="mt-4 text-lg text-gray-600">
            Join discussions with other members of the FinanceFlow community.
          </p>
          
          <div className="mt-8 space-y-6">
            <div className="finance-card p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
                  <span className="font-bold text-gray-700">JD</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">John Doe</h3>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                  <h2 className="text-lg font-semibold mt-1">Getting started with index funds</h2>
                  <p className="text-gray-600 mt-2">
                    I'm new to investing and looking to start with index funds. Any recommendations for beginners?
                  </p>
                  <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>24</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>12 comments</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="finance-card p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
                  <span className="font-bold text-gray-700">AS</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">Alice Smith</h3>
                    <span className="text-sm text-gray-500">5 hours ago</span>
                  </div>
                  <h2 className="text-lg font-semibold mt-1">Best budgeting apps in 2025?</h2>
                  <p className="text-gray-600 mt-2">
                    What are your favorite budgeting apps this year? Looking for something with good investment tracking.
                  </p>
                  <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>18</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>8 comments</span>
                    </div>
                  </div>
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

export default Forum;
