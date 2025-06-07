
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

//Defines the Learn page component
const Learn = () => {
  //Main container for the entire page
  return (
    <div className="min-h-screen flex flex-col">
      {/* Renders the navigation bar at the top of the page. */}
      <Navbar />
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main title of this page */}
          <h1 className="text-3xl font-bold text-gray-900">Learning Center</h1>
          <p className="mt-4 text-lg text-gray-600">
            Welcome to the learning center. This page will contain educational resources
            to help improve your financial literacy.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Learning content will go here */}
            <div className="finance-card p-6">
              {/* Sample learning content card: Investing Basics*/}
              <h2 className="text-xl font-semibold mb-2">Investing Basics</h2>
              <p className="text-gray-600">Learn the fundamentals of investing and how to get started.</p>
            </div>
            <div className="finance-card p-6">
              {/* Sample learning content card: Budgeting 101*/}
              <h2 className="text-xl font-semibold mb-2">Budgeting 101</h2>
              <p className="text-gray-600">Master the basics of creating and sticking to a budget.</p>
            </div>
            <div className="finance-card p-6">
              {/* Sample learning content card: Retirement Planning*/}
              <h2 className="text-xl font-semibold mb-2">Retirement Planning</h2>
              <p className="text-gray-600">Prepare for your future with smart retirement strategies.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Learn;
