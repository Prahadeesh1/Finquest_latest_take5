import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast } from "sonner"; // ✅ Added for Firebase integration
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Learn from "./pages/Learn";
import Community from "./pages/Community";
import RiskWise from "./RiskWise/RiskWIseMainPage";
import ChatWidget from "./components/chat/ChatWidget";
import ConservativePage from "./pages/ConservativePage";
import ModeratePage from "./pages/ModeratePage";
import AggressivePage from "./pages/AggressivePage";
import AssessmentPage from "./pages/AssessmentPage";
import UserProfile from "./pages/UserProfile";
import Events from "./pages/events";
import Dashboard from "./pages/DashBoard";
import ForgotPassword from "./pages/ForgotPassword";
import { AuthProvider } from "./contexts/Auth";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Create the client outside of the component with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error && typeof error === 'object' && 'status' in error && 
            typeof error.status === 'number' && error.status >= 400 && error.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
    },
    mutations: {
      retry: false,
      onError: (error) => {
        console.error('Mutation error:', error);
        toast.error('Something went wrong. Please try again.');
      },
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            {/* Toast notifications - positioned for better UX */}
            <Toaster />
            <Sonner 
              position="top-right"
              closeButton
              richColors
              expand={false}
              visibleToasts={3}
              duration={4000}
            />
            
            {/* Chat Widget - available across all pages */}
            <ChatWidget />
            
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Protected routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/learn" element={
                <ProtectedRoute>
                  <Learn />
                </ProtectedRoute>
              } />
              
              {/* Community route - now with Firebase integration */}
              <Route path="/community" element={
                <ProtectedRoute>
                  <Community />
                </ProtectedRoute>
              } />
              
              <Route path="/riskwise" element={
                <ProtectedRoute>
                  <RiskWise />
                </ProtectedRoute>
              } />
              
              <Route path="/conservative" element={
                <ProtectedRoute>
                  <ConservativePage />
                </ProtectedRoute>
              } />
              
              <Route path="/moderate" element={
                <ProtectedRoute>
                  <ModeratePage />
                </ProtectedRoute>
              } />
              
              <Route path="/aggressive" element={
                <ProtectedRoute>
                  <AggressivePage />
                </ProtectedRoute>
              } />
              
              <Route path="/assessment" element={
                <ProtectedRoute>
                  <AssessmentPage />
                </ProtectedRoute>
              } />
              
              <Route path="/events" element={
                <ProtectedRoute>
                  <Events />
                </ProtectedRoute>
              } />
              
              {/* Profile route - accessible to authenticated users */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } />
              
              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;