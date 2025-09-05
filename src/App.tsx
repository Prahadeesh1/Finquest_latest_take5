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
import UserProfile from "./pages/UserProfile";
import Events from "./pages/events"; // Updated import to follow naming convention

// Create the client outside of the component
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ChatWidget />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/community" element={<Community />} />
            <Route path="/RiskWise" element={<RiskWise />} />
            <Route path="/conservative" element={<ConservativePage />} />
            <Route path="/moderate" element={<ModeratePage />} />
            <Route path="/aggressive" element={<AggressivePage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/Profile" element={<UserProfile/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;