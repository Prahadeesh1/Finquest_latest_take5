
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { TrendingUp, DollarSign, PieChart, BarChart3, Target, Shield, Coins, Wallet,LineChart,Calculator,Banknote,CreditCard,ArrowRight,Star,Zap,Rocket,Flame} from 'lucide-react';
const Card = ({ children, className }) => (
  <div className={`rounded-lg ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={className}>
    {children}
  </div>
);


//Main AggressivePage component for displaying aggressive investment options
const AggressivePage = () => {
  return (//Main container for the entire page
    <div className="min-h-screen bg-gray-50">
      {/* Navbar component for site navigation */}
      <Navbar />
      {/* Introduces the Aggressive Profile and its characteristics */}
      <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-rose-700 to-pink-800"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-overlay animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-white rounded-full mix-blend-overlay animate-pulse delay-500"></div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-bounce">
          <Rocket className="w-8 h-8 text-white/20" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce" style={{ animationDelay: '1s' }}>
          <TrendingUp className="w-10 h-10 text-white/20" />
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce" style={{ animationDelay: '0.5s' }}>
          <Flame className="w-12 h-12 text-white/20" />
        </div>
        <div className="absolute top-32 right-1/3 animate-bounce" style={{ animationDelay: '1.5s' }}>
          <Zap className="w-6 h-6 text-white/20" />
        </div>
        <div className="absolute bottom-32 right-12 animate-bounce" style={{ animationDelay: '2s' }}>
          <BarChart3 className="w-9 h-9 text-white/20" />
        </div>
        <div className="absolute top-1/2 left-8 animate-bounce" style={{ animationDelay: '2.5s' }}>
          <Target className="w-7 h-7 text-white/20" />
        </div>
        <div className="absolute bottom-16 right-1/4 animate-bounce" style={{ animationDelay: '3s' }}>
          <LineChart className="w-8 h-8 text-white/20" />
        </div>
        <div className="absolute top-24 left-1/3 animate-bounce" style={{ animationDelay: '0.8s' }}>
          <DollarSign className="w-6 h-6 text-white/20" />
        </div>
        <div className="absolute bottom-24 left-1/2 animate-bounce" style={{ animationDelay: '1.8s' }}>
          <Coins className="w-7 h-7 text-white/20" />
        </div>
        <div className="absolute top-36 right-8 animate-bounce" style={{ animationDelay: '2.2s' }}>
          <Calculator className="w-6 h-6 text-white/20" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-wrap items-center min-h-[500px]">
          <div className="w-full lg:w-7/12 pr-0 lg:pr-8">
            <div className="bg-white/20 backdrop-blur-sm text-white inline-block py-2 px-4 rounded-full text-sm font-medium mb-6 border border-white/30">
              <Rocket className="w-4 h-4 inline mr-2" />
              Aggressive Profile
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Aggressive
              <span className="block bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent">
                Investment Options
              </span>
            </h1>
            
            <p className="text-xl text-red-100 mb-8 leading-relaxed max-w-xl">
              Maximize growth potential with our high-performance aggressive investment strategies, designed for long-term investors who embrace market volatility for superior returns.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Rocket className="w-5 h-5 mr-2" />
                Explore Options
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-red-700 hover:bg-white/10 backdrop-blur-sm"
              >
                Compare Strategies
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
          
          {/* Enhanced Key Characteristics card */}
          <div className="w-full lg:w-5/12 mt-12 lg:mt-0">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 rounded-2xl border">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2 flex items-center text-white">
                  <Flame className="w-6 h-6 text-orange-300 mr-3" />
                  Key Characteristics
                </h3>
                <p className="text-red-100 mb-6 text-lg">Higher risk, growth-focused</p>
                
                <ul className="space-y-4">
                  {[
                    'Maximum growth potential',
                    'Higher volatility',
                    'Strong inflation protection',
                    'Time horizon of 10+ years',
                    'Requires higher risk tolerance'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-white">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-300 to-red-300 mr-4 animate-pulse"></div>
                      <span className="text-red-50">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </section>

      {/* Popular Investment Options section with Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Popular Aggressive Investment Options
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            These investment vehicles are commonly recommended for aggressive investors seeking maximum growth potential.
          </p>
          {/* Tabs component which shows different clickable investment categories */}
          <Tabs defaultValue="growth" className="max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="growth">Growth Stocks</TabsTrigger>
              <TabsTrigger value="smallcap">Small-Cap</TabsTrigger>
              <TabsTrigger value="emerging">Emerging Markets</TabsTrigger>
              <TabsTrigger value="sector">Sector Funds</TabsTrigger>
            </TabsList>
            {/* TabsContent: Displays content for "Growth Stocks" tab */}
            <TabsContent value="growth" className="mt-6">
              <div className="grid md:grid-cols-5 gap-6">
                <div className="md:col-span-3 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-4">Growth Stocks</h3>
                  <p className="text-gray-700 mb-6">
                    Companies expected to grow sales and earnings faster than the market average, typically reinvesting profits rather than paying dividends.
                  </p>
                  
                  <div className="bg-red-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">Large-Cap Growth</h4>
                    <p className="text-sm text-gray-700">
                      Established companies with strong growth potential, often in technology, healthcare, or consumer discretionary sectors.
                    </p>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">Growth ETFs</h4>
                    <p className="text-sm text-gray-700">
                      Exchange-Traded Funds focused on growth-oriented companies across various market capitalizations.
                    </p>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Momentum Stocks</h4>
                    <p className="text-sm text-gray-700">
                      Stocks showing strong price and earnings momentum that are expected to continue outperforming the market.
                    </p>
                  </div>
                </div>
                
                <div className="md:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-bold mb-4">Growth Stock Considerations</h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-red-500 mr-2">$</span>
                      <span className="font-medium">Valuation Metrics:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Growth stocks often trade at higher P/E ratios.</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-red-500 mr-2">$</span>
                      <span className="font-medium">Revenue Growth:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Look for consistent double-digit revenue increases.</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-red-500 mr-2">$</span>
                      <span className="font-medium">Market Position:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Competitive advantages and market leadership potential.</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-1">
                      <span className="text-red-500 mr-2">$</span>
                      <span className="font-medium">Volatility:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Growth stocks typically experience larger price swings.</p>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-3">Typical Returns</h4>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Large-Cap Growth:</span>
                      <span className="text-sm font-medium">9-12%</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Growth Mutual Funds:</span>
                      <span className="text-sm font-medium">10-15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">High-Growth Tech:</span>
                      <span className="text-sm font-medium">15%+</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 italic">*Historical average returns; actual returns may vary</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            {/* TabsContent: Displays content for "Small-Cap Stocks" tab */}
            <TabsContent value="smallcap" className="mt-6">
              <div className="grid md:grid-cols-5 gap-6">
                <div className="md:col-span-3 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-4">Small-Cap Stocks</h3>
                  <p className="text-gray-700 mb-6">
                    Companies with smaller market capitalizations, typically between $300 million and $2 billion, offering higher growth potential.
                  </p>
                  
                  <div className="bg-red-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">Small-Cap Growth</h4>
                    <p className="text-sm text-gray-700">
                      Smaller companies with strong growth potential, often in early stages of their business development.
                    </p>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">Small-Cap ETFs</h4>
                    <p className="text-sm text-gray-700">
                      Diversified exposure to small-cap stocks through ETFs like Russell 2000 or S&P 600 Small Cap indices.
                    </p>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Small-Cap Value</h4>
                    <p className="text-sm text-gray-700">
                      Smaller companies trading below their intrinsic value, potentially offering both growth and value opportunities.
                    </p>
                  </div>
                </div>
                
                <div className="md:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-bold mb-4">Small-Cap Considerations</h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-red-500 mr-2">$</span>
                      <span className="font-medium">Higher Volatility:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Small-caps typically experience larger price swings than large-caps.</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-red-500 mr-2">$</span>
                      <span className="font-medium">Liquidity Risk:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Lower trading volumes can make entering/exiting positions more challenging.</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-red-500 mr-2">$</span>
                      <span className="font-medium">Research Coverage:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Less analyst coverage creates both challenges and opportunities.</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-1">
                      <span className="text-red-500 mr-2">$</span>
                      <span className="font-medium">Economic Sensitivity:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Often more vulnerable to economic downturns.</p>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-3">Typical Returns</h4>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Small-Cap Index:</span>
                      <span className="text-sm font-medium">10-14%</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Small-Cap Growth Funds:</span>
                      <span className="text-sm font-medium">12-18%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Small-Cap Value Funds:</span>
                      <span className="text-sm font-medium">9-15%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 italic">*Historical average returns; actual returns may vary</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            {/* TabsContent: Displays content for "Emerging Markets" tab */}
            <TabsContent value="emerging" className="mt-6">
              <div className="grid md:grid-cols-5 gap-6">
                <div className="md:col-span-3 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-4">Emerging Markets</h3>
                  <p className="text-gray-700 mb-6">
                    Investments in developing economies like Brazil, Russia, India, China, and South Africa, offering high growth potential with increased risk.
                  </p>
                  
                  <div className="bg-red-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">Emerging Market Funds</h4>
                    <p className="text-sm text-gray-700">
                      Mutual funds and ETFs providing diversified exposure to developing economies across multiple regions.
                    </p>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">Single-Country Funds</h4>
                    <p className="text-sm text-gray-700">
                      Focused investments in specific emerging economies like China, India, or Brazil for targeted exposure.
                    </p>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Frontier Markets</h4>
                    <p className="text-sm text-gray-700">
                      Investments in pre-emerging economies like Vietnam, Nigeria, or Bangladesh, offering even higher potential returns with greater risks.
                    </p>
                  </div>
                </div>
                
                <div className="md:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-bold mb-4">Emerging Market Considerations</h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-red-500 mr-2">$</span>
                      <span className="font-medium">Political Risk:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Government instability or policy changes can impact investments.</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-red-500 mr-2">$</span>
                      <span className="font-medium">Currency Risk:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Fluctuations in local currencies can enhance or reduce returns.</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-red-500 mr-2">$</span>
                      <span className="font-medium">Economic Development:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Rapid economic growth can lead to higher investment returns.</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-1">
                      <span className="text-red-500 mr-2">$</span>
                      <span className="font-medium">Market Regulation:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Less developed regulatory frameworks can create additional risks.</p>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-3">Typical Returns</h4>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Emerging Markets Index:</span>
                      <span className="text-sm font-medium">8-15%</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">BRIC Countries:</span>
                      <span className="text-sm font-medium">10-18%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Frontier Markets:</span>
                      <span className="text-sm font-medium">12-20%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 italic">*Historical average returns; actual returns may vary</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            {/* TabsContent: Displays content for "Sector Funds" tab */}
            <TabsContent value="sector" className="mt-6">
              <div className="grid md:grid-cols-5 gap-6">
                <div className="md:col-span-3 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-4">Sector Funds</h3>
                  <p className="text-gray-700 mb-6">
                    Specialized funds focusing on specific industries or sectors, offering targeted exposure to high-growth areas of the economy.
                  </p>
                  
                  <div className="bg-red-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">Technology Sector</h4>
                    <p className="text-sm text-gray-700">
                      Funds focused on software, hardware, semiconductors, and other technology-related companies with high growth potential.
                    </p>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">Healthcare Innovation</h4>
                    <p className="text-sm text-gray-700">
                      Investments in biotechnology, pharmaceutical innovation, medical devices, and healthcare technology companies.
                    </p>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Thematic ETFs</h4>
                    <p className="text-sm text-gray-700">
                      Funds targeting specific themes like clean energy, artificial intelligence, cybersecurity, or digital payments.
                    </p>
                  </div>
                </div>
                
                <div className="md:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-bold mb-4">Sector Fund Considerations</h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-red-500 mr-2">$</span>
                      <span className="font-medium">Concentration Risk:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Limited diversification can increase volatility and risk.</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-red-500 mr-2">$</span>
                      <span className="font-medium">Cyclical Factors:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Some sectors perform better during specific economic cycles.</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-red-500 mr-2">$</span>
                      <span className="font-medium">Innovation Pace:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Sectors with rapid innovation may offer higher growth potential.</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-1">
                      <span className="text-red-500 mr-2">$</span>
                      <span className="font-medium">Regulatory Environment:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Changes in regulations can significantly impact sector performance.</p>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-3">Typical Returns</h4>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Technology Sector:</span>
                      <span className="text-sm font-medium">12-20%</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Healthcare Innovation:</span>
                      <span className="text-sm font-medium">10-18%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Emerging Technologies:</span>
                      <span className="text-sm font-medium">15-25%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 italic">*Historical average returns; actual returns may vary</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      {/* Portfolio Allocation section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Section heading */}
          <h2 className="text-3xl font-bold text-center mb-16">
            Aggressive Portfolio Allocation
          </h2>
          {/* Section description */}
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            A typical aggressive portfolio maximizes growth potential for long-term financial goals.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Sample Aggressive Allocation card */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-2">Sample Aggressive Allocation</h3>
              <p className="text-sm text-gray-600 mb-6">A growth-focused approach for investors with long time horizons</p>
              {/* Allocation bars for different asset classes */}
              <div className="space-y-4 mb-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Domestic Growth Stocks</span>
                    <span className="text-sm">40%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">International Stocks</span>
                    <span className="text-sm">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Small-Cap Stocks</span>
                    <span className="text-sm">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-400 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Emerging Markets</span>
                    <span className="text-sm">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-300 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Bonds & Cash</span>
                    <span className="text-sm">5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-200 h-2 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                </div>
              </div>
            </Card>
            {/* Expected Outcomes card */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-2">Expected Outcomes</h3>
              <p className="text-sm text-gray-600 mb-6">Historical performance metrics for aggressive portfolios</p>
              {/* Outcome metrics with simulated progress bars */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Potential Annual Return</span>
                    <span>9-12%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-red-500 h-3 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Based on historical average annual returns</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Volatility</span>
                    <span>High</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-red-500 h-3 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Significant price fluctuations expected</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Income Focus</span>
                    <span>Low</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-red-500 h-3 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Primarily focused on capital appreciation</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Inflation Protection</span>
                    <span>Excellent</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-red-500 h-3 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Strong potential to outpace inflation over long periods</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
      {/*Call to action: Prompts users to take a risk assessment */}
      <section className="py-16 bg-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Your Aggressive Portfolio?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Get personalized investment recommendations based on your specific goals and risk tolerance.
          </p>
          <Link to="/assessment">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              Take the Risk Assessment
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AggressivePage;