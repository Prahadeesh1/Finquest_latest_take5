// src/pages/ForgotPassword.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { TrendingUp, Mail, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "../contexts/Auth";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      await resetPassword(email);
      setMessage('Check your inbox for password reset instructions');
    } catch (error: any) {
      console.error('Password reset error:', error);
      
      switch (error.code) {
        case 'auth/user-not-found':
          setError('No account found with this email address');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/too-many-requests':
          setError('Too many requests. Please try again later');
          break;
        default:
          setError('Failed to send reset email. Please try again');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <TrendingUp className="h-12 w-12 text-finance-primary" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Reset your password
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>
          
          <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}
            
            {message && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                <span className="text-sm text-green-700">{message}</span>
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                      if (message) setMessage('');
                    }}
                    className="finance-input"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div>
                <Button 
                  type="submit" 
                  className="w-full finance-button-primary flex justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Send reset email
                    </>
                  )}
                </Button>
              </div>
              
              <div className="text-center">
                <Link
                  to="/login"
                  className="text-sm font-medium text-finance-primary hover:text-finance-primary/90"
                >
                  Back to login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;