// src/pages/Login.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { TrendingUp, LogIn, AlertCircle } from "lucide-react";
import { useAuth } from "../contexts/Auth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear errors when user starts typing
    if (errors) setErrors('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setErrors('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setErrors('');

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard'); // Redirect to dashboard or home page
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle different Firebase Auth errors
      switch (error.code) {
        case 'auth/user-not-found':
          setErrors('No account found with this email address');
          break;
        case 'auth/wrong-password':
          setErrors('Incorrect password');
          break;
        case 'auth/invalid-email':
          setErrors('Invalid email address');
          break;
        case 'auth/too-many-requests':
          setErrors('Too many failed attempts. Please try again later');
          break;
        default:
          setErrors('Login failed. Please try again');
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
              Log in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{" "}
              <Link
                to="/register"
                className="font-medium text-finance-primary hover:text-finance-primary/90"
              >
                create an account to get started
              </Link>
            </p>
          </div>
          
          <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {errors && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <span className="text-sm text-red-700">{errors}</span>
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
                    value={formData.email}
                    onChange={handleInputChange}
                    className="finance-input"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="finance-input"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-finance-primary focus:ring-finance-primary border-gray-300 rounded"
                    disabled={isLoading}
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-finance-primary hover:text-finance-primary/90"
                  >
                    Forgot your password?
                  </Link>
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
                      Logging in...
                    </div>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4 mr-2" />
                      Log in
                    </>
                  )}
                </Button>
              </div>
            </form>
            
            {/* Social login section - you can implement these later */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div>
                  <button
                    type="button"
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    disabled={true}
                  >
                    <span className="sr-only">Sign in with Facebook</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    disabled={true}
                  >
                    <span className="sr-only">Sign in with Twitter</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    disabled={true}
                  >
                    <span className="sr-only">Sign in with Google</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.417 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                    </svg>
                  </button>
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

export default Login;