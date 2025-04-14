
import React from "react";
import { Button } from "@/components/ui/button";
import { Mail, Bell, BookOpen, TrendingUp, DollarSign } from "lucide-react";

const topics = [
  { name: "Market Updates", icon: TrendingUp },
  { name: "Beginner Guides", icon: BookOpen },
  { name: "Investment Strategies", icon: DollarSign },
  { name: "Financial News", icon: Bell },
];

const NewsletterSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-finance-primary rounded-2xl shadow-xl overflow-hidden">
          {/* Background elements */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-finance-secondary rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-finance-accent rounded-full opacity-20 blur-3xl"></div>
          
          <div className="relative px-6 py-16 sm:px-12 lg:px-16">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  Subscribe to our newsletter
                </h2>
                <p className="mt-4 text-lg text-white/90">
                  Stay updated with the latest financial insights, market trends, and
                  educational content tailored to your interests.
                </p>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-white">Popular topics:</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {topics.map((topic) => (
                      <div
                        key={topic.name}
                        className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 transition-colors px-3 py-2 rounded-full text-white"
                      >
                        <topic.icon className="h-4 w-4" />
                        <span className="text-sm">{topic.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-12 lg:mt-0">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <form className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="finance-input mt-1"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="finance-input mt-1"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="interests" className="block text-sm font-medium text-gray-700">
                        Topics of interest
                      </label>
                      <select
                        id="interests"
                        name="interests"
                        className="finance-input mt-1"
                        defaultValue=""
                      >
                        <option value="" disabled>Select your primary interest</option>
                        <option value="beginner">Beginner Guides</option>
                        <option value="investing">Investment Strategies</option>
                        <option value="market">Market Analysis</option>
                        <option value="personal">Personal Finance</option>
                        <option value="retirement">Retirement Planning</option>
                      </select>
                    </div>
                    <div className="pt-2">
                      <Button className="w-full finance-button-primary flex items-center justify-center" type="submit">
                        <Mail className="h-5 w-5 mr-2" />
                        Subscribe Now
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-4">
                      By subscribing, you agree to our Privacy Policy and Terms of Service.
                      We'll never share your information.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
