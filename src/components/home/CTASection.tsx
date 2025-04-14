
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-finance-primary rounded-2xl shadow-xl overflow-hidden">
          <div className="relative px-6 py-10 sm:px-12 sm:py-16 lg:py-20 lg:px-16">
            <div className="relative text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Ready to start your financial journey?
              </h2>
              <p className="mt-4 text-lg text-white/90">
                Join thousands of users who are already improving their financial literacy
                and making smarter investment decisions.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Link to="/register">
                  <Button className="bg-white text-finance-primary hover:bg-white/90 border border-transparent px-8 py-6">
                    Get started
                  </Button>
                </Link>
                <Link to="/learn">
                  <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6">
                    Explore resources
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
