import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BookOpen,
  MessageCircle,
  TrendingUp,
  BarChart4,
  Lightbulb,
  BookMarked,
  X,
} from "lucide-react";

const features = [
  {
    name: "Interactive Market Flowchart",
    shortDescription: "Visualize financial markets.",
    fullDescription: "Visualize how financial markets work with our interactive, beginner-friendly flowchart. Understand how stocks, bonds, ETFs, and derivatives interact in real-time market systems. Learn the fundamentals of market mechanics and how different instruments influence each other. Perfect for beginners and intermediate investors looking to grasp the bigger picture.",
    icon: BarChart4,
    color: "bg-blue-100 text-blue-600",
    tag: "Popular",
  },
  {
    name: "Finance Community",
    shortDescription: "Connect with peers.",
    fullDescription: "Engage with a vibrant community of finance enthusiasts through threads, AMAs (Ask Me Anything), and topic-based discussions. Discuss topics like cryptocurrency, investing tips, budgeting strategies, and more. Share experiences, learn from others, and grow your financial knowledge together in a supportive environment.",
    icon: MessageCircle,
    color: "bg-purple-100 text-purple-600",
    tag: "New",
  },
  {
    name: "Smart Finance Chatbot",
    shortDescription: "Get instant answers.",
    fullDescription: "Ask finance questions and receive instant AI-powered answers available 24/7. Whether you're curious about dollar-cost averaging, APR, compound interest, or investment strategies, our chatbot provides clear, concise explanations tailored to your level of understanding. Available anytime you need guidance.",
    icon: Lightbulb,
    color: "bg-yellow-100 text-yellow-600",
    tag: "AI Powered",
  },
  {
    name: "Themed Newsletters",
    shortDescription: "Weekly curated content.",
    fullDescription: "Subscribe to weekly curated newsletters crafted for all finance levels. Receive weekly highlights, market recaps, beginner explainers, and expert insights. Stay informed about market trends, investment opportunities, and financial news without information overload. Customizable topics based on your interests.",
    icon: BookMarked,
    color: "bg-red-100 text-red-600",
    tag: "Upcoming",
  },
  {
    name: "Learning Paths",
    shortDescription: "Master finance step-by-step.",
    fullDescription: "Follow a clear, structured roadmap from basics to investing mastery. Progress through carefully designed lessons: budgeting → saving → investing → advanced strategies. Each path is tailored to your goals and learning pace, ensuring you build a strong foundation before moving to complex topics.",
    icon: BookOpen,
    color: "bg-amber-100 text-amber-600",
    tag: "Upcoming",
  },
  {
    name: "Investment Suggestions",
    shortDescription: "AI-curated recommendations.",
    fullDescription: "Receive tailored investment ideas based on your profile, risk tolerance, and financial goals. Get AI-curated suggestions for ETFs, stocks, and other investment vehicles aligned with your objectives. Personalized recommendations help you make informed decisions about where to invest your money.",
    icon: TrendingUp,
    color: "bg-emerald-100 text-emerald-600",
  },
];

const FeatureCard = ({ feature, onOpen }) => {
  return (
    <div
      onClick={() => onOpen(feature)}
      className="group relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 shadow-md rounded-2xl p-6 transition-all hover:shadow-lg hover:scale-105 cursor-pointer"
    >
      <div className={`inline-flex items-center justify-center p-3 rounded-md ${feature.color}`}>
        <feature.icon className="h-6 w-6" />
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex-1">
            {feature.name}
          </h3>
          {feature.tag && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 whitespace-nowrap">
              {feature.tag}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {feature.shortDescription}
        </p>
      </div>
    </div>
  );
};

const FeatureModal = ({ feature, isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen || !feature) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 px-8 py-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className={`inline-flex items-center justify-center p-3 rounded-md ${feature.color}`}>
              <feature.icon className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {feature.name}
              </h2>
              {feature.tag && (
                <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  {feature.tag}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex-shrink-0"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                About This Feature
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-6">
                {feature.fullDescription}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 italic">
                🔒 Sign in to unlock the full potential of this feature
              </p>
            </div>

            {/* Call to Action */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105 active:scale-95"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenFeature = (feature) => {
    setSelectedFeature(feature);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFeature(null);
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-24 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            Features
          </h2>
          <p className="mt-2 text-4xl leading-10 font-bold text-gray-900 dark:text-white">
            Everything you need to master financial literacy
          </p>
          <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300 lg:mx-auto">
            From community to cutting-edge tools, we've built the ultimate
            finance hub.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              onOpen={handleOpenFeature}
            />
          ))}
        </div>
      </div>

      <FeatureModal
        feature={selectedFeature}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default FeaturesSection;