
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const segments = [
  {
    title: "Beginners",
    description:
      "Start your financial journey with fundamental concepts and easy-to-understand guides.",
    features: [
      "Basic financial concepts explained simply",
      "Step-by-step guides to budgeting",
      "Introduction to saving and investing",
      "Common financial terms glossary",
    ],
    image: "/placeholder.svg",
    color: "from-finance-accent/20 to-finance-primary/20",
    linkText: "Start your journey",
    linkPath: "/learn/beginners",
  },
  {
    title: "Intermediate",
    description:
      "Expand your knowledge with practical applications and deeper market insights.",
    features: [
      "Advanced investment strategies",
      "Portfolio diversification techniques",
      "Tax planning and optimization",
      "Real-world case studies",
    ],
    image: "/placeholder.svg",
    color: "from-finance-secondary/20 to-finance-primary/20",
    linkText: "Elevate your knowledge",
    linkPath: "/learn/intermediate",
  },
  {
    title: "Advanced",
    description:
      "Refine your expertise with specialized topics and sophisticated strategies.",
    features: [
      "Complex market analysis techniques",
      "Alternative investment opportunities",
      "Wealth management strategies",
      "Global economic trends impact",
    ],
    image: "/placeholder.svg",
    color: "from-finance-primary/20 to-finance-secondary/20",
    linkText: "Master your expertise",
    linkPath: "/learn/advanced",
  },
];

const UserSegmentSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-finance-primary font-semibold tracking-wide uppercase">
            Personalized Learning
          </h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
            Resources tailored to your experience level
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Whether you're just starting out or looking to expand your expertise,
            we have the right content for your financial journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {segments.map((segment) => (
            <div
              key={segment.title}
              className="rounded-xl overflow-hidden shadow-lg border border-gray-100 card-hover"
            >
              <div className={`h-32 bg-gradient-to-r ${segment.color} flex items-center justify-center`}>
                <h3 className="text-2xl font-bold text-gray-800">
                  {segment.title}
                </h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  {segment.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {segment.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-finance-primary mr-2 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={segment.linkPath}
                  className="inline-flex items-center text-finance-primary font-medium hover:underline"
                >
                  {segment.linkText}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSegmentSection;
