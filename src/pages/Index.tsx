import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import UserSegmentSection from "@/components/home/UserSegmentSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  // Main container for the entire page, ensuring it takes at least the full viewport height and uses a flex column layout.
  return (
    <div className="min-h-screen flex flex-col">
      {/* Renders the navigation bar at the top of the page. */}
      <Navbar />
      {/* Main content area, configured to grow and fill available vertical space. */}
      <main className="flex-grow">
        {/*First section users see, featuring a main headline and a call to action */}
        <HeroSection />
        {/*Highlights the key features present in the website */}
        <FeaturesSection />
        {/*Highlights the key learning paths present in the website(Beginners, Intermediate and Advanced) */}
        <UserSegmentSection />
        {/*Showcases 3 key testimonials */}
        {/*<TestimonialSection />*/}
        {/*Allows users to sign to the Newsletter to get up to date information tailored to their business preferences */}
        <NewsletterSection />
        {/*Showcases additional details of the website */}
        {/*<CTASection />*/}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
