import React from "react";
import {
  BookOpen,
  Users,
  MessageCircle,
  TrendingUp,
  BarChart4,
  BarChart2,
  Lightbulb,
  BookMarked,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    name: "Interactive Market Flowchart",
    description:
      "Visualize how financial markets work with our interactive, beginner-friendly flowchart.",
    tooltip:
      "Understand how stocks, bonds, ETFs, and derivatives interact in real-time market systems.",
    icon: BarChart4,
    color: "bg-finance-primary/10 text-finance-primary",
    tag: "Popular",
  },
  {
    name: "Finance Community",
    description:
      "Engage with others through threads, AMAs, and topic-based discussions.",
    tooltip:
      "Discuss topics like crypto, investing tips, and budgeting with peers.",
    icon: MessageCircle,
    color: "bg-finance-secondary/10 text-finance-secondary",
    tag: "New",
  },
  {
    name: "Smart Finance Chatbot",
    description:
      "Ask finance questions and receive instant AI-powered answers 24/7.",
    tooltip:
      "Ask things like 'What’s dollar-cost averaging?' or 'What is APR?'",
    icon: Lightbulb,
    color: "bg-finance-accent/10 text-finance-accent",
    tag: "AI Powered",
  },
  {
    name: "Themed Newsletters",
    description:
      "Subscribe to weekly curated newsletters across all finance levels.",
    tooltip: "Weekly highlights, market recaps, and beginner explainers.",
    icon: BookMarked,
    color: "bg-red-100 text-red-600",
  },
  {
    name: "Learning Paths",
    description: "Follow a clear roadmap from basics to investing mastery.",
    tooltip: "Step-by-step lessons: budgeting → saving → investing.",
    icon: BookOpen,
    color: "bg-amber-100 text-amber-600",
    tag: "Recommended",
  },
  {
    name: "Investment Suggestions",
    description: "Receive tailored investment ideas based on your profile.",
    tooltip: "Get AI-curated ETF/stock suggestions aligned with your goals.",
    icon: TrendingUp,
    color: "bg-emerald-100 text-emerald-600",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const FeaturesSection = () => {
  return (
    <div className="bg-white dark:bg-blue-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-sm font-semibold text-finance-primary uppercase tracking-wide">
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

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              variants={item}
              key={index}
              className="group relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 shadow-md rounded-2xl p-6 transition-all hover:shadow-lg hover:scale-[1.03]"
            >
              <div
                className={`inline-flex items-center justify-center p-3 rounded-md ${feature.color}`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {feature.name}
                  </h3>
                  {feature.tag && (
                    <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                      {feature.tag}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 group-hover:line-clamp-none line-clamp-3">
                  {feature.description}
                </p>

                {/* Tooltip */}
                {feature.tooltip && (
                  <div className="absolute z-20 top-4 right-4 opacity-0 group-hover:opacity-50 transition-opacity duration-200">
                    <div className="relative transform scale-95 group-hover:scale-100 bg-white-500 text-black text-xs font-medium px-4 py-2 rounded-lg shadow-lg w-64">
                      {feature.tooltip}
                      <div className="absolute top-1/2 right-full transform -translate-y-1/2 translate-x-2 w-2 h-2 bg-white-500 rotate-45"></div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesSection;
