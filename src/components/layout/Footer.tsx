
import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Mail, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <TrendingUp className="h-6 w-6 text-finance-primary" />
              <span className="ml-2 text-lg font-display font-bold bg-clip-text text-transparent bg-finance-gradient">
                FinanceFlow<span className="text-finance-secondary">Together</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Empowering financial literacy and investment awareness for everyone, 
              regardless of their experience level.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-finance-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-finance-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-finance-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-finance-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/learn" className="text-sm text-gray-600 hover:text-finance-primary">
                  Learning Center
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-sm text-gray-600 hover:text-finance-primary">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/investments" className="text-sm text-gray-600 hover:text-finance-primary">
                  Investment Suggestions
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-finance-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-finance-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-600 hover:text-finance-primary">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Stay Updated
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Subscribe to our newsletter for the latest financial insights and updates.
            </p>
            <div className="mt-4">
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="finance-input py-2 text-sm"
                  required
                />
                <button
                  type="submit"
                  className="finance-button-primary py-2 text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} FinanceFlow Together. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
