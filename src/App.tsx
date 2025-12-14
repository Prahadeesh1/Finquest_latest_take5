import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast } from "sonner";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/DashBoard";
import Learn from "./pages/Learn";
import Community from "./pages/Community";
import RiskWise from "./RiskWise/RiskWIseMainPage";
import ConservativePage from "./pages/ConservativePage";
import ModeratePage from "./pages/ModeratePage";
import AggressivePage from "./pages/AggressivePage";
import AssessmentPage from "./pages/AssessmentPage";
import Events from "./pages/events";
import EventDetailsPage from "./pages/EventDetailsPage";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";

// Community
import StockMarketCommunity from "@/components/CommunityPages/stockmarketpage";
import BudgetingCommunity from "@/components/CommunityPages/Budgeting101";
import EasyInvestCommunity from "@/components/CommunityPages/EasyInvestHub";
import PostDetailPage from "@/components/community/CommunityPostPage";

// Chat
import ChatWidget from "./components/chat/ChatWidget";
import ChatbotPage from "./pages/ChatBotPage";

// Auth
import { AuthProvider } from "./contexts/Auth";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// ----------------------
// React Query Client
// ----------------------
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: (failureCount, error) => {
        if (
          error &&
          typeof error === "object" &&
          "status" in error &&
          typeof (error as any).status === "number" &&
          (error as any).status >= 400 &&
          (error as any).status < 500
        ) {
          return false;
        }
        return failureCount < 3;
      },
    },
    mutations: {
      retry: false,
      onError: (error) => {
        console.error("Mutation error:", error);
        toast.error("Something went wrong. Please try again.");
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
            {/* Toasts */}
            <Toaster />
            <Sonner
              position="top-right"
              closeButton
              richColors
              visibleToasts={3}
              duration={4000}
            />

            {/* Global Chat Widget */}
            <ChatWidget />

            <Routes>
              {/* ---------- Public Routes ---------- */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* ---------- Protected Routes ---------- */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/learn"
                element={
                  <ProtectedRoute>
                    <Learn />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/community"
                element={
                  <ProtectedRoute>
                    <Community />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/riskwise"
                element={
                  <ProtectedRoute>
                    <RiskWise />
                  </ProtectedRoute>
                }
              />

              {/* ⭐ FinBot Full Chat Page */}
              <Route
                path="/chatbot"
                element={
                  <ProtectedRoute>
                    <ChatbotPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/conservative"
                element={
                  <ProtectedRoute>
                    <ConservativePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/moderate"
                element={
                  <ProtectedRoute>
                    <ModeratePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/aggressive"
                element={
                  <ProtectedRoute>
                    <AggressivePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/assessment"
                element={
                  <ProtectedRoute>
                    <AssessmentPage />
                  </ProtectedRoute>
                }
              />

              {/* ---------- Events ---------- */}
              <Route
                path="/events"
                element={
                  <ProtectedRoute>
                    <Events />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/events/:eventId"
                element={
                  <ProtectedRoute>
                    <EventDetailsPage />
                  </ProtectedRoute>
                }
              />

              {/* ---------- Profile ---------- */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />

              {/* ---------- Community Subpages ---------- */}
              <Route
                path="/CommunityPages/stockmarketpage"
                element={
                  <ProtectedRoute>
                    <StockMarketCommunity />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/CommunityPages/Budgeting101"
                element={
                  <ProtectedRoute>
                    <BudgetingCommunity />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/CommunityPages/EasyInvestHub"
                element={
                  <ProtectedRoute>
                    <EasyInvestCommunity />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/post/:postId"
                element={
                  <ProtectedRoute>
                    <PostDetailPage />
                  </ProtectedRoute>
                }
              />

              {/* ---------- 404 ---------- */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
