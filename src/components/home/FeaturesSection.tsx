
import React from "react";
import { 
  BookOpen, 
  Users, 
  MessageCircle, 
  TrendingUp, 
  BarChart4, 
  BarChart2, 
  Lightbulb, 
  BookMarked 
} from "lucide-react";

const features = [
  {
    name: "Interactive Market Flowchart",
    description:
      "Visualize how financial markets work with our interactive, easy-to-understand flowchart designed for beginners and intermediate users.",
    icon: BarChart4,
    color: "bg-finance-primary/10 text-finance-primary",
  },
  {
    name: "Reddit-Style Community",
    description:
      "Connect with like-minded individuals through our community platform with posts, discussions, and specialized finance groups.",
    icon: MessageCircle,
    color: "bg-finance-secondary/10 text-finance-secondary",
  },
  {
    name: "Smart Finance Chatbot",
    description:
      "Get instant answers to your financial questions with our AI-powered chatbot available 24/7 to assist with your learning journey.",
    icon: Lightbulb,
    color: "bg-finance-accent/10 text-finance-accent",
  },
  {
    name: "Themed Newsletters",
    description:
      "Subscribe to tailored newsletters covering different financial topics from personal finance to advanced investing strategies.",
    icon: BookMarked,
    color: "bg-red-100 text-red-600",
  },
  {
    name: "Learning Paths",
    description:
      "Follow structured learning paths tailored to your experience level, from basic financial concepts to advanced investment strategies.",
    icon: BookOpen,
    color: "bg-amber-100 text-amber-600",
  },
  {
    name: "Investment Suggestions",
    description:
      "Receive personalized investment recommendations based on your risk profile, financial goals, and market conditions.",
    icon: TrendingUp,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    name: "Market Analytics",
    description:
      "Access real-time market data, trends analysis, and visualizations to make informed financial decisions.",
    icon: BarChart2,
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Finance Discussion Groups",
    description:
      "Join topic-based discussion groups to connect with others who share your financial interests and goals.",
    icon: Users,
    color: "bg-purple-100 text-purple-600",
  },
];

const FeaturesSection = () => {
  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-finance-primary font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to master financial literacy
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our platform combines learning resources, community discussions, and 
            practical tools to help you navigate the financial world with confidence.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {features.map((feature) => (
              <div 
                key={feature.name} 
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover-lift hover-shadow transition-all duration-300"
              >
                <div>
                  <div className={`inline-flex p-3 rounded-md ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
