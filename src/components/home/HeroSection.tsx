import React, { useState, useEffect } from "react";
import { ChevronRight, Zap, TrendingUp, BookOpen } from "lucide-react";

const HeroSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden bg-white flex items-center py-16">
      <div className="max-w-6xl mx-auto w-full px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Headline and CTA */}
          <div className="space-y-6">
            {/* Eyebrow text */}
            <div className="inline-block">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <span className="text-xs font-medium text-blue-600">
                  Learn. Apply. Grow.
                </span>
              </div>
            </div>

            {/* Main heading */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                <span className="block text-gray-900">
                  Finance
                </span>
                <span className="block text-blue-600">
                  For Everyone
                </span>
              </h1>

              <p className="text-base text-gray-600 leading-relaxed max-w-lg">
                Master Financial Literacy at your own pace, you journey to financial independence starts here.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <button className="group relative px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-lg">
                <span className="flex items-center justify-center gap-2">
                  Get started
                  <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>

              <button className="px-6 py-2.5 border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg transition-all duration-300 hover:border-gray-400 hover:bg-gray-50">
                Explore resources
              </button>
            </div>
          </div>

          {/* Right: Dynamic Interactive Visual */}
          <div className="relative h-[400px] lg:h-[480px] flex items-center justify-center">
            {/* Large animated background card container */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-xl overflow-hidden">
              {/* Phase 1: Learn */}
              <div
                className={`absolute inset-0 p-8 flex flex-col items-center justify-center transition-all duration-700 ease-out ${
                  activeStep === 0
                    ? "opacity-100 scale-100 z-30"
                    : "opacity-0 scale-90 -z-10 pointer-events-none"
                }`}
              >
                {/* Floating book icon */}
                <div className="mb-8 relative group">
                  <div className="absolute -inset-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-20 blur-xl"></div>
                  <div className="relative h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center border border-blue-200 shadow-lg">
                    <BookOpen
                      className="h-12 w-12 text-blue-600"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Title and description */}
                <div className="text-center space-y-2 mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">Learn</h2>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                    Master financial concepts through bite-sized lessons from expert instructors
                  </p>
                </div>

                {/* Animated learning indicators */}
                <div className="relative w-full max-w-xs space-y-2">
                  {[
                    { label: "Fundamentals", progress: 100 },
                    { label: "Budgeting", progress: 85 },
                    { label: "Investing", progress: 60 },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="space-y-1"
                      style={{
                        animation: `slide-in-up 0.6s ease-out forwards`,
                        animationDelay: `${i * 0.15}s`,
                        opacity: 0,
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-700">
                          {item.label}
                        </span>
                        <span className="text-xs text-blue-600 font-semibold">
                          {item.progress}%
                        </span>
                      </div>

                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                          style={{
                            width: `${item.progress}%`,
                            maxWidth: "100%",
                            animation: `grow-to-${item.progress} 1.2s ease-out forwards`,
                            animationDelay: `${0.3 + i * 0.15}s`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phase 2: Apply */}
              <div
                className={`absolute inset-0 p-8 flex flex-col items-center justify-center transition-all duration-700 ease-out ${
                  activeStep === 1
                    ? "opacity-100 scale-100 z-30"
                    : "opacity-0 scale-90 -z-10 pointer-events-none"
                }`}
              >
                {/* Animated chart icon */}
                <div className="mb-8 relative group">
                  <div className="absolute -inset-4 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full opacity-20 blur-xl"></div>
                  <div className="relative h-24 w-24 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center border border-emerald-200 shadow-lg">
                    <Zap
                      className="h-12 w-12 text-emerald-600"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Title and description */}
                <div className="text-center space-y-2 mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">Apply</h2>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                    Put your knowledge into action with real-world scenarios and decision-making tools
                  </p>
                </div>

                {/* Interactive decision cards */}
                <div className="relative w-full max-w-xs space-y-2">
                  {[
                    { action: "Build a budget", icon: "📊", status: "Active" },
                    {
                      action: "Create investment plan",
                      icon: "💼",
                      status: "Started",
                    },
                    {
                      action: "Track expenses",
                      icon: "📈",
                      status: "Completed",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all duration-300 cursor-pointer group/card"
                      style={{
                        animation: `slide-in-left 0.6s ease-out forwards`,
                        animationDelay: `${i * 0.15}s`,
                        opacity: 0,
                      }}
                    >
                      <span className="text-xl group-hover/card:scale-110 transition-transform">
                        {item.icon}
                      </span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-xs">
                          {item.action}
                        </p>
                        <p className="text-xs text-emerald-600 font-medium">
                          {item.status}
                        </p>
                      </div>
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          item.status === "Completed"
                            ? "bg-emerald-500"
                            : item.status === "Active"
                            ? "bg-emerald-400"
                            : "bg-gray-300"
                        }`}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phase 3: Grow */}
              <div
                className={`absolute inset-0 p-8 flex flex-col items-center justify-center transition-all duration-700 ease-out ${
                  activeStep === 2
                    ? "opacity-100 scale-100 z-30"
                    : "opacity-0 scale-90 -z-10 pointer-events-none"
                }`}
              >
                {/* Animated growth icon */}
                <div className="mb-8 relative group">
                  <div className="absolute -inset-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"></div>
                  <div className="relative h-24 w-24 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center border border-purple-200 shadow-lg">
                    <TrendingUp
                      className="h-12 w-12 text-purple-600"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Title and description */}
                <div className="text-center space-y-2 mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">Grow</h2>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                    Watch your wealth compound as you apply strategies and reach financial independence
                  </p>
                </div>

                {/* Growth metrics animation */}
                <div className="relative w-full max-w-xs">
                  <svg viewBox="0 0 300 120" className="w-full h-auto">
                    <defs>
                      <linearGradient
                        id="growthGradient"
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="50%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#f97316" />
                      </linearGradient>
                      <filter id="shadow">
                        <feDropShadow
                          dx="0"
                          dy="2"
                          stdDeviation="3"
                          floodOpacity="0.2"
                        />
                      </filter>
                    </defs>

                    {/* Grid lines */}
                    <g opacity="0.1" stroke="currentColor" strokeWidth="0.5">
                      <line x1="30" y1="100" x2="270" y2="100" />
                      <line x1="30" y1="70" x2="270" y2="70" />
                      <line x1="30" y1="40" x2="270" y2="40" />
                    </g>

                    {/* Area fill */}
                    <path
                      d="M 30 100 Q 75 80 120 55 T 210 15 L 270 15 L 270 100 Z"
                      fill="url(#growthGradient)"
                      opacity="0.15"
                      style={{
                        animation: `fill-grow 3s ease-out forwards`,
                      }}
                    />

                    {/* Growth curve */}
                    <polyline
                      points="30,100 75,80 120,55 165,35 210,15 270,10"
                      fill="none"
                      stroke="url(#growthGradient)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#shadow)"
                      style={{
                        animation: `draw-curve 3s ease-out forwards`,
                        strokeDasharray: 300,
                        strokeDashoffset: 300,
                      }}
                    />

                    {/* Data points */}
                    {[
                      { x: 30, y: 100 },
                      { x: 75, y: 80 },
                      { x: 120, y: 55 },
                      { x: 165, y: 35 },
                      { x: 210, y: 15 },
                      { x: 270, y: 10 },
                    ].map((point, i) => (
                      <g key={i}>
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="3"
                          fill="url(#growthGradient)"
                          filter="url(#shadow)"
                          style={{
                            animation: `bounce-point 2s ease-in-out infinite`,
                            animationDelay: `${i * 0.15}s`,
                          }}
                        />
                      </g>
                    ))}
                  </svg>

                  {/* Legend */}
                  <div className="mt-4 flex justify-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                      <span className="text-gray-700">
                        Your growth trajectory
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes grow-to-100 {
          from { width: 0%; }
          to { width: 100%; }
        }

        @keyframes grow-to-85 {
          from { width: 0%; }
          to { width: 85%; }
        }

        @keyframes grow-to-60 {
          from { width: 0%; }
          to { width: 60%; }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes draw-curve {
          from {
            stroke-dashoffset: 300;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes fill-grow {
          from {
            opacity: 0;
          }
          to {
            opacity: 0.15;
          }
        }

        @keyframes bounce-point {
          0%, 100% {
            transform: scale(1) translateY(0);
          }
          50% {
            transform: scale(1.2) translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;