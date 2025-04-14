
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BarChart3, TrendingDown, TrendingUp } from "lucide-react";

const Market = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Market Overview</h1>
          <p className="mt-4 text-lg text-gray-600">
            Stay up to date with the latest market trends and financial insights.
          </p>
          
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="finance-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Stock Market</h2>
                <TrendingUp className="h-6 w-6 text-finance-secondary" />
              </div>
              <p className="text-gray-600 mb-4">Current trends and analysis for stock markets.</p>
              <div className="finance-button-outline w-full text-center">View Details</div>
            </div>
            
            <div className="finance-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Cryptocurrencies</h2>
                <TrendingDown className="h-6 w-6 text-destructive" />
              </div>
              <p className="text-gray-600 mb-4">Latest cryptocurrency prices and market updates.</p>
              <div className="finance-button-outline w-full text-center">View Details</div>
            </div>
            
            <div className="finance-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Market Analysis</h2>
                <BarChart3 className="h-6 w-6 text-finance-primary" />
              </div>
              <p className="text-gray-600 mb-4">Expert analysis and market predictions.</p>
              <div className="finance-button-outline w-full text-center">View Details</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Market;
