import React, { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";



const LearningSegmentsSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setDirection('forward');
      setActiveSlide((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const handleSlideClick = (index: number) => {
    setDirection(index > activeSlide ? 'forward' : 'backward');
    setActiveSlide(index);
    setAutoPlay(false);
  };

  return (
    <div className="relative w-full bg-white overflow-hidden">
      <div className="relative h-screen max-h-screen overflow-hidden">

        {/* Slide 1: For Everyone */}
        <div className={`absolute inset-0 transition-all duration-700 ease-out ${
          activeSlide === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}>
          <div className="h-full bg-white flex items-center justify-center relative overflow-hidden">
            {/* Subtle animated background orbs */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-50 to-transparent rounded-full opacity-40 blur-3xl animate-float"></div>
            <div className="absolute top-1/3 -left-40 w-80 h-80 bg-gradient-to-br from-violet-50 to-transparent rounded-full opacity-30 blur-3xl animate-float-delayed"></div>
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-br from-emerald-50 to-transparent rounded-full opacity-35 blur-3xl animate-float-slow"></div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
              <div className="mb-4 inline-block">
                <span className="text-sm font-semibold tracking-wider text-gray-500 uppercase animate-fade-in"></span>
              </div>

              <h1 className="text-7xl sm:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-600 bg-clip-text text-transparent animate-gradient">
                  Personalised Learning
                </span>
              </h1>

              <p className="text-2xl text-gray-600 font-light mb-16 animate-fade-in-delayed">
                For Everyone, Every Level
              </p>

              {/* Journey visualization */}
              <div className="flex justify-center items-center gap-6 mb-12 perspective-container">
                {/* Beginner */}
                <div className="flex flex-col items-center transform transition-all duration-500 hover:scale-110 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
                      <span className="text-4xl font-bold text-white">1</span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-gray-700">Beginner</p>
                  <p className="text-xs text-gray-500">Start here</p>
                </div>

                {/* Arrow with pulse */}
                <div className="flex items-center animate-pulse-subtle">
                  <div className="flex items-center gap-1">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400"></div>
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

                {/* Intermediate */}
                <div className="flex flex-col items-center transform transition-all duration-500 hover:scale-110 animate-slide-up" style={{ animationDelay: "0.4s" }}>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-emerald-400 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative h-28 w-28 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                      <span className="text-5xl font-bold text-white">2</span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-gray-700">Intermediate</p>
                  <p className="text-xs text-gray-500">Build expertise</p>
                </div>

                {/* Arrow with pulse */}
                <div className="flex items-center animate-pulse-subtle" style={{ animationDelay: "0.2s" }}>
                  <div className="flex items-center gap-1">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400"></div>
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

                {/* Advanced */}
                <div className="flex flex-col items-center transform transition-all duration-500 hover:scale-110 animate-slide-up" style={{ animationDelay: "0.6s" }}>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-violet-400 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative h-32 w-32 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center shadow-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                      <span className="text-5xl font-bold text-white">3</span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-gray-700">Advanced</p>
                  <p className="text-xs text-gray-500">Master it all</p>
                </div>
              </div>

              <div className="animate-fade-in-delayed" style={{ animationDelay: "0.8s" }}>
                <p className="text-lg text-gray-500 font-light mb-4">Your journey, your pace</p>
                <div className="flex justify-center gap-2">
                  <div className="px-4 py-2 rounded-full bg-gray-100 text-sm text-gray-600 font-medium">No prerequisites</div>
                  <div className="px-4 py-2 rounded-full bg-gray-100 text-sm text-gray-600 font-medium">Self-paced learning</div>
                  <div className="px-4 py-2 rounded-full bg-gray-100 text-sm text-gray-600 font-medium">Expert guidance</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2: Beginners */}
        <div className={`absolute inset-0 transition-all duration-700 ease-out ${
          activeSlide === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}>
          <div className="h-full bg-white flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-20 -right-32 w-96 h-96 bg-gradient-to-br from-blue-50 to-transparent rounded-full opacity-50 blur-3xl animate-float"></div>
            <div className="absolute -bottom-20 -left-32 w-80 h-80 bg-gradient-to-br from-blue-50 to-transparent rounded-full opacity-40 blur-3xl animate-float-delayed"></div>

            <div className="relative z-10 max-w-6xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left: Content */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping-slow"></div>
                      <span className="text-sm font-semibold text-blue-600">Level 1</span>
                    </div>
                    <h2 className="text-6xl sm:text-5xl font-bold text-gray-900 leading-tight">
                      Start Your
                      <span className="block text-blue-600">Journey</span>
                    </h2>
                    <p className="text-l text-gray-600 font-light leading-relaxed">
                      Build a strong foundation in financial literacy. No prior knowledge needed.
                    </p>
                  </div>

                  {/* Feature cards with stagger animation */}
                  <div className="space-y-2">
                    {[
                      { icon: "📚", label: "Money fundamentals", desc: "Understanding income, expenses, and cash flow" },
                      { icon: "💰", label: "Smart budgeting", desc: "Create and stick to your first budget" },
                      { icon: "🏦", label: "Saving strategies", desc: "Build your emergency fund step by step" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="group flex items-start gap-3 p-5 rounded-2xl bg-gradient-to-br from-blue-50/50 to-white border border-blue-100/50 hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-slide-in-left"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      >
                        <span className="text-4xl flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg mb-1">{item.label}</h3>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Visual */}
                <div className="relative h-[500px] flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Decorative circles */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-80 h-80 rounded-full border-2 border-blue-100 opacity-30 animate-pulse-ring"></div>
                      <div className="absolute w-64 h-64 rounded-full border-2 border-blue-200 opacity-40 animate-pulse-ring-delayed"></div>
                    </div>

                    {/* Center content */}
                    <div className="relative z-10 text-center animate-float-slow">
                      <div className="inline-block p-8 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-2xl mb-6 transform hover:rotate-3 transition-transform duration-300">
                        <span className="text-8xl">🌱</span>
                      </div>
                      <p className="text-lg font-medium text-gray-700 mb-2">Plant Your Financial Seeds</p>
                      <p className="text-sm text-gray-500">Watch your knowledge grow</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 3: Intermediate */}
        <div className={`absolute inset-0 transition-all duration-700 ease-out ${
          activeSlide === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}>
          <div className="h-full bg-white flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-20 -left-32 w-96 h-96 bg-gradient-to-br from-emerald-50 to-transparent rounded-full opacity-50 blur-3xl animate-float"></div>
            <div className="absolute -bottom-20 -right-32 w-80 h-80 bg-gradient-to-br from-emerald-50 to-transparent rounded-full opacity-40 blur-3xl animate-float-delayed"></div>

            <div className="relative z-10 max-w-6xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left: Visual */}
                <div className="relative h-[500px] flex items-center justify-center order-2 lg:order-1">
                  <div className="relative w-full h-full">
                    {/* Growth chart visualization */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-80 h-64">
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-50 to-transparent rounded-3xl"></div>
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex justify-center">
                        <TrendingUp className="w-48 h-48 text-emerald-600 opacity-70" strokeWidth={2.3} />
                          </div>
                        <div className="relative flex items-end justify-center gap-3 h-full p-8">
                          {[40, 55, 48, 70, 65, 85, 78, 95].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end group">
                              <div
                                className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg transition-all duration-500 hover:from-emerald-500 hover:to-emerald-300 shadow-lg animate-grow-bar"
                                style={{
                                  height: `${height}%`,
                                  animationDelay: `${i * 0.1}s`
                                }}
                              ></div>
                            </div>
                          ))}
                        </div>
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-emerald-500 text-white text-sm font-semibold shadow-lg animate-bounce-gentle">
                          +47% Growth
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                      <p className="text-lg font-medium text-gray-700 mb-1">Track Your Progress</p>
                      <p className="text-sm text-gray-500">Real results, measurable gains</p>
                    </div>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="space-y-8 order-1 lg:order-2">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping-slow"></div>
                      <span className="text-sm font-semibold text-emerald-600">Level 2</span>
                    </div>
                    <h2 className="text-6xl sm:text-5xl font-bold text-gray-900 leading-tight">
                      Grow Your
                      <span className="block text-emerald-600">Wealth</span>
                    </h2>
                    <p className="text-l text-gray-600 font-light leading-relaxed">
                      Take your financial knowledge to the next level with advanced strategies.
                    </p>
                  </div>

                  {/* Feature cards */}
                  <div className="space-y-2">
                    {[
                      { icon: "📊", label: "Investment basics", desc: "Stocks, bonds, and portfolio diversification" },
                      { icon: "🎯", label: "Goal planning", desc: "Retirement, home ownership, and beyond" },
                      { icon: "💡", label: "Tax optimization", desc: "Smart strategies to keep more of your money" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="group flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-emerald-50/50 to-white border border-emerald-100/50 hover:border-emerald-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-slide-in-right"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      >
                        <span className="text-3xl flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg mb-1">{item.label}</h3>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 4: Advanced */}
        <div className={`absolute inset-0 transition-all duration-700 ease-out ${
          activeSlide === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}>
          <div className="h-full bg-white flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-20 -right-32 w-96 h-96 bg-gradient-to-br from-violet-50 to-transparent rounded-full opacity-50 blur-3xl animate-float"></div>
            <div className="absolute -bottom-20 -left-32 w-80 h-80 bg-gradient-to-br from-violet-50 to-transparent rounded-full opacity-40 blur-3xl animate-float-delayed"></div>

            <div className="relative z-10 max-w-6xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left: Content */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-100">
                      <div className="w-2 h-2 rounded-full bg-violet-500 animate-ping-slow"></div>
                      <span className="text-sm font-semibold text-violet-600">Level 3</span>
                    </div>
                    <h2 className="text-6xl sm:text-5xl font-bold text-gray-900 leading-tight">
                      Master The
                      <span className="block text-violet-600">Markets</span>
                    </h2>
                    <p className="text-l text-gray-600 font-light leading-relaxed">
                      Sophisticated strategies for building and preserving generational wealth.
                    </p>
                  </div>

                  {/* Feature cards */}
                  <div className="space-y-2">
                    {[
                      { icon: "🌐", label: "Global markets", desc: "International investing and currency strategies" },
                      { icon: "🚀", label: "Alternative assets", desc: "Real estate, crypto, and private equity" },
                      { icon: "⚡", label: "Wealth preservation", desc: "Estate planning and legacy building" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="group flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-violet-50/50 to-white border border-violet-100/50 hover:border-violet-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-slide-in-left"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      >
                        <span className="text-4xl flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg mb-1">{item.label}</h3>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Visual */}
                <div className="relative h-[500px] flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Network visualization */}
                    <svg viewBox="0 0 300 300" className="w-80 h-80 animate-float-slow">
                      <defs>
                        <linearGradient id="networkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#a78bfa" />
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>

                      {/* Connecting lines with animation */}
                      <g className="animate-draw-lines" filter="url(#glow)">
                        <line x1="150" y1="60" x2="90" y2="140" stroke="url(#networkGrad)" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
                        <line x1="150" y1="60" x2="210" y2="140" stroke="url(#networkGrad)" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
                        <line x1="150" y1="60" x2="150" y2="240" stroke="url(#networkGrad)" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
                        <line x1="90" y1="140" x2="150" y2="240" stroke="url(#networkGrad)" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
                        <line x1="210" y1="140" x2="150" y2="240" stroke="url(#networkGrad)" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
                        <line x1="90" y1="140" x2="210" y2="140" stroke="url(#networkGrad)" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
                      </g>

                      {/* Nodes with pulse animation */}
                      <g filter="url(#glow)">
                        <circle cx="150" cy="60" r="18" fill="url(#networkGrad)" className="animate-pulse-node" />
                        <circle cx="90" cy="140" r="15" fill="url(#networkGrad)" className="animate-pulse-node" style={{ animationDelay: "0.3s" }} />
                        <circle cx="210" cy="140" r="15" fill="url(#networkGrad)" className="animate-pulse-node" style={{ animationDelay: "0.6s" }} />
                        <circle cx="150" cy="240" r="15" fill="url(#networkGrad)" className="animate-pulse-node" style={{ animationDelay: "0.9s" }} />
                      </g>

                      {/* Center highlight */}
                      <circle cx="150" cy="60" r="6" fill="white" opacity="0.8" />
                    </svg>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                      <p className="text-lg font-medium text-gray-700 mb-1">Complex Systems Simplified</p>
                      <p className="text-sm text-gray-500">Navigate the financial ecosystem</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-gray-200">
          {[
            { label: "Home", color: "from-blue-500 to-violet-500" },
            { label: "Beginner", color: "from-blue-500 to-blue-600" },
            { label: "Intermediate", color: "from-emerald-500 to-emerald-600" },
            { label: "Advanced", color: "from-violet-500 to-violet-600" }
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => handleSlideClick(i)}
              className="group relative flex items-center gap-2"
            >
              <div className={`transition-all duration-300 rounded-full ${
                activeSlide === i
                  ? 'w-8 h-3 bg-gradient-to-r ' + item.color + ' shadow-lg'
                  : 'w-3 h-3 bg-gray-300 group-hover:bg-gray-400 group-hover:scale-110'
              }`}></div>
              {activeSlide === i && (
                <span className="text-xs font-semibold text-gray-700 animate-fade-in whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(-2deg);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 4s ease infinite;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-delayed {
          animation: fade-in 1s ease-out 0.5s forwards;
          opacity: 0;
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.7s ease-out forwards;
          opacity: 0;
        }

        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
          opacity: 0;
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
          opacity: 0;
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(0.95);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.5;
          }
          100% {
            transform: scale(0.95);
            opacity: 0.3;
          }
        }

        .animate-pulse-ring {
          animation: pulse-ring 3s ease-in-out infinite;
        }

        .animate-pulse-ring-delayed {
          animation: pulse-ring 3s ease-in-out infinite 1.5s;
        }

        @keyframes grow-bar {
          from {
            transform: scaleY(0);
            opacity: 0;
          }
          to {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        .animate-grow-bar {
          transform-origin: bottom;
          animation: grow-bar 0.8s ease-out forwards;
        }

        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes pulse-node {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        .animate-pulse-node {
          animation: pulse-node 2s ease-in-out infinite;
        }

        .perspective-container {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default LearningSegmentsSlider;
