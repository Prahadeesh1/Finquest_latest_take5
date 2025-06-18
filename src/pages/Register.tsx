// src/pages/Register.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { TrendingUp, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "../contexts/Auth";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    experienceLevel: 'beginner',
    newsletter: false
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

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      return 'First name is required';
    }
    if (!formData.lastName.trim()) {
      return 'Last name is required';
    }
    if (!formData.email.trim()) {
      return 'Email is required';
    }
    if (!formData.password) {
      return 'Password is required';
    }
    if (formData.password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }
    
    // Basic password strength check
    const hasLetter = /[a-zA-Z]/.test(formData.password);
    const hasNumber = /\d/.test(formData.password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
    
    if (!hasLetter || !hasNumber || !hasSymbol) {
      return 'Password must contain letters, numbers, and symbols';
    }
    
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setErrors(validationError);
      return;
    }

    setIsLoading(true);
    setErrors('');

    try {
      await register(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.experienceLevel,
        formData.newsletter
      );
      navigate('/dashboard'); // Redirect to dashboard or home page
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Handle different Firebase Auth errors
      switch (error.code) {
        case 'auth/email-already-in-use':
          setErrors('An account with this email already exists');
          break;
        case 'auth/invalid-email':
          setErrors('Invalid email address');
          break;
        case 'auth/weak-password':
          setErrors('Password is too weak');
          break;
        default:
          setErrors('Registration failed. Please try again');
      }
    } finally {
      setIsLoading(false);
    }
  };

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
              
              {errors && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" />
                  <span className="text-sm text-red-700">{errors}</span>
                </div>
              )}
              
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="finance-input mt-1"
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="finance-input mt-1"
                        disabled={isLoading}
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
                      value={formData.email}
                      onChange={handleInputChange}
                      className="finance-input mt-1"
                      disabled={isLoading}
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
                      value={formData.password}
                      onChange={handleInputChange}
                      className="finance-input mt-1"
                      disabled={isLoading}
                    />
                    <div className="mt-1 text-xs text-gray-500">
                      Password must be at least 8 characters long and contain a mix of letters, numbers, and symbols.
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="finance-input mt-1"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Your experience level
                  </label>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { value: 'beginner', label: 'Beginner', desc: 'New to financial concepts' },
                      { value: 'intermediate', label: 'Intermediate', desc: 'Familiar with basics, looking for more' },
                      { value: 'advanced', label: 'Advanced', desc: 'Experienced, seeking specific knowledge' }
                    ].map((level) => (
                      <div key={level.value}>
                        <input
                          type="radio"
                          id={level.value}
                          name="experienceLevel"
                          value={level.value}
                          checked={formData.experienceLevel === level.value}
                          onChange={handleInputChange}
                          className="sr-only"
                          disabled={isLoading}
                        />
                        <label
                          htmlFor={level.value}
                          className={`block p-3 border rounded-md text-sm font-medium cursor-pointer transition-colors ${
                            formData.experienceLevel === level.value
                              ? 'border-finance-primary bg-finance-primary/5'
                              : 'border-gray-300 hover:border-finance-primary'
                          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-finance-primary ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          <span className="flex items-center justify-between">
                            <span>{level.label}</span>
                            {formData.experienceLevel === level.value && (
                              <CheckCircle className="h-5 w-5 text-finance-primary" />
                            )}
                          </span>
                          <span className="block text-xs text-gray-500 mt-1">
                            {level.desc}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="newsletter"
                    name="newsletter"
                    type="checkbox"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-finance-primary focus:ring-finance-primary border-gray-300 rounded"
                    disabled={isLoading}
                  />
                  <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-900">
                    Subscribe to our newsletter for financial tips and updates
                  </label>
                </div>

                <div>
                  <Button 
                    type="submit" 
                    className="w-full finance-button-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating account...
                      </div>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Create account
                      </>
                    )}
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