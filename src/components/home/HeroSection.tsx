
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, PieChart, LineChart, TrendingUp, BarChart3 } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-finance-light rounded-full opacity-40 blur-3xl"></div>
      <div className="absolute top-1/2 -left-24 w-64 h-64 bg-finance-accent/20 rounded-full opacity-30 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl leading-tight">
              <span className="block">Financial literacy</span>{" "}
              <span className="block text-gradient">
                for everyone
              </span>
            </h1>
            <p className="mt-6 text-base text-gray-500 sm:text-lg">
              Empower your financial journey with our comprehensive platform.
              Learn, share, and grow together with tools designed for all levels
              of financial knowledge.
            </p>
            <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <Link to="/register">
                  <Button className="w-full lg:w-auto finance-button-primary flex items-center px-8 py-6">
                    Get started
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link to="/learn">
                  <Button variant="outline" className="w-full lg:w-auto finance-button-outline flex items-center px-8 py-6">
                    Explore resources
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-12">
              <p className="text-sm font-medium text-gray-500">
                Join thousands of users already learning with us
              </p>
              <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-5">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`inline-block h-8 w-8 rounded-full ring-2 ring-white bg-finance-${
                          i % 2 ? "primary" : "secondary"
                        }/80 text-white flex items-center justify-center text-xs font-bold`}
                      >
                        {["JD", "AK", "ZM", "TN"][i - 1]}
                      </div>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">+2,500 more</span>
                </div>
                <div className="flex items-center space-x-1 bg-finance-light rounded-full px-3 py-1">
                  <span className="text-green-600 text-xs font-medium">↑24%</span>
                  <span className="text-xs text-gray-600">this month</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md soft-shadow">
              <div className="relative block w-full overflow-hidden rounded-lg">
                <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
                  {/* Animated finance graphics */}
                  <div className="relative w-full h-full">
                    {/* Chart elements for animation */}
                    <div className="absolute bottom-6 left-6 right-6 h-32 animate-pulse-slow">
                      <div className="absolute inset-0 flex items-end space-x-2">
                        {[40, 65, 35, 85, 55, 75, 25, 90, 60, 45, 70].map((height, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-finance-primary/80 rounded-t"
                            style={{ height: `${height}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Floating chart icons */}
                    <div className="absolute top-8 left-8 bg-white p-4 rounded-xl shadow-lg animate-float">
                      <BarChart3 className="h-8 w-8 text-finance-primary" />
                    </div>
                    
                    <div className="absolute top-20 right-12 bg-white p-4 rounded-xl shadow-lg animate-float" style={{ animationDelay: "1s" }}>
                      <PieChart className="h-8 w-8 text-finance-secondary" />
                    </div>
                    
                    <div className="absolute bottom-44 left-20 bg-white p-4 rounded-xl shadow-lg animate-float" style={{ animationDelay: "2s" }}>
                      <LineChart className="h-8 w-8 text-finance-accent" />
                    </div>
                    
                    <div className="absolute bottom-32 right-16 bg-white p-3 rounded-xl shadow-lg animate-float" style={{ animationDelay: "1.5s" }}>
                      <TrendingUp className="h-6 w-6 text-finance-success" />
                    </div>
                    
                    {/* Connecting lines */}
                    <svg className="absolute inset-0 w-full h-full">
                      <line x1="100" y1="80" x2="240" y2="100" stroke="rgba(30, 64, 175, 0.3)" strokeWidth="2" />
                      <line x1="240" y1="100" x2="160" y2="220" stroke="rgba(30, 64, 175, 0.3)" strokeWidth="2" />
                      <line x1="160" y1="220" x2="260" y2="320" stroke="rgba(30, 64, 175, 0.3)" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
