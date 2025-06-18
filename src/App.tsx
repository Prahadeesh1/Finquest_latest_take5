import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Events from "./pages/events";
import Dashboard from "./pages/DashBoard"; // ✅ MISSING IMPORT
import ForgotPassword from "./pages/ForgotPassword"; // ✅ MISSING IMPORT
import { AuthProvider } from "./contexts/Auth"; // ✅ MISSING IMPORT
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Create the client outside of the component
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
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
              <Route path="/community" element={
                <ProtectedRoute>
                  <Community />
                </ProtectedRoute>
              } />
              <Route path="/RiskWise" element={
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

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
