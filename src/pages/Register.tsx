
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { TrendingUp, Mail, CheckCircle } from "lucide-react";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="text-center lg:text-left">
                <div className="flex justify-center lg:justify-start">
                  <TrendingUp className="h-12 w-12 text-finance-primary" />
                </div>
                <h2 className="mt-6 text-3xl font-bold text-gray-900">
                  Create your account
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-finance-primary hover:text-finance-primary/90"
                  >
                    Log in here
                  </Link>
                </p>
              </div>
              <form className="mt-8 space-y-6">
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        id="first-name"
                        name="first-name"
                        type="text"
                        required
                        className="finance-input mt-1"
                      />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        id="last-name"
                        name="last-name"
                        type="text"
                        required
                        className="finance-input mt-1"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="finance-input mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="finance-input mt-1"
                    />
                    <div className="mt-1 text-xs text-gray-500">
                      Password must be at least 8 characters long and contain a mix of letters, numbers, and symbols.
                    </div>
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                      Confirm password
                    </label>
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="finance-input mt-1"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Your experience level
                  </label>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <input
                        type="radio"
                        id="beginner"
                        name="experience"
                        value="beginner"
                        className="sr-only"
                        defaultChecked
                      />
                      <label
                        htmlFor="beginner"
                        className="block p-3 border border-gray-300 rounded-md text-sm font-medium cursor-pointer hover:border-finance-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-finance-primary"
                      >
                        <span className="flex items-center justify-between">
                          <span>Beginner</span>
                          <CheckCircle className="h-5 w-5 text-finance-primary" />
                        </span>
                        <span className="block text-xs text-gray-500 mt-1">
                          New to financial concepts
                        </span>
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="intermediate"
                        name="experience"
                        value="intermediate"
                        className="sr-only"
                      />
                      <label
                        htmlFor="intermediate"
                        className="block p-3 border border-gray-300 rounded-md text-sm font-medium cursor-pointer hover:border-finance-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-finance-primary"
                      >
                        <span>Intermediate</span>
                        <span className="block text-xs text-gray-500 mt-1">
                          Familiar with basics, looking for more
                        </span>
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="advanced"
                        name="experience"
                        value="advanced"
                        className="sr-only"
                      />
                      <label
                        htmlFor="advanced"
                        className="block p-3 border border-gray-300 rounded-md text-sm font-medium cursor-pointer hover:border-finance-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-finance-primary"
                      >
                        <span>Advanced</span>
                        <span className="block text-xs text-gray-500 mt-1">
                          Experienced, seeking specific knowledge
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="newsletter"
                    name="newsletter"
                    type="checkbox"
                    className="h-4 w-4 text-finance-primary focus:ring-finance-primary border-gray-300 rounded"
                  />
                  <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-900">
                    Subscribe to our newsletter for financial tips and updates
                  </label>
                </div>

                <div>
                  <Button type="submit" className="w-full finance-button-primary">
                    <Mail className="h-4 w-4 mr-2" />
                    Create account
                  </Button>
                </div>
              </form>
            </div>

            <div className="hidden lg:block">
              <div className="bg-gradient-to-br from-finance-primary to-finance-secondary rounded-xl overflow-hidden shadow-xl h-full flex items-center justify-center">
                <div className="p-10 text-white max-w-md">
                  <h3 className="text-2xl font-bold mb-4">
                    Join our growing community
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-white mr-2 flex-shrink-0" />
                      <p>Access exclusive educational content tailored to your experience level</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-white mr-2 flex-shrink-0" />
                      <p>Interact with our community forum and get answers to your financial questions</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-white mr-2 flex-shrink-0" />
                      <p>Receive personalized investment suggestions based on your goals</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-white mr-2 flex-shrink-0" />
                      <p>Track your progress and grow your financial knowledge</p>
                    </div>
                  </div>
                  <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-finance-primary/80 text-white flex items-center justify-center text-xs font-bold"
                          >
                            {["JD", "AK", "ZM"][i - 1]}
                          </div>
                        ))}
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">Join 10,000+ members</p>
                        <p className="text-white/80">Growing every day</p>
                      </div>
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

export default Register;
