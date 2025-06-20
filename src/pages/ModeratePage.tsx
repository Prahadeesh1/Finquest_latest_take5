
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { 
  TrendingUp, DollarSign, PieChart, BarChart3, Target, Shield, Coins, Wallet,LineChart,Calculator,Banknote,CreditCard,ArrowRight,Star
} from 'lucide-react';

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


//Main ModeratePage component for displaying moderate investment options
const ModeratePage = () => {
  return (//Main container for the entire page
    <div className="min-h-screen bg-gray-50">
      {/* Navbar component for site navigation */}
      <Navbar />
      {/* Introduces the Moderate Profile and its characteristics */}
      <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 via-amber-700 to-orange-800"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-overlay animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-white rounded-full mix-blend-overlay animate-pulse delay-500"></div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-bounce">
          <TrendingUp className="w-8 h-8 text-white/20" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce" style={{ animationDelay: '1s' }}>
          <PieChart className="w-10 h-10 text-white/20" />
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce" style={{ animationDelay: '0.5s' }}>
          <BarChart3 className="w-12 h-12 text-white/20" />
        </div>
        <div className="absolute top-32 right-1/3 animate-bounce" style={{ animationDelay: '1.5s' }}>
          <Target className="w-6 h-6 text-white/20" />
        </div>
        <div className="absolute bottom-32 right-12 animate-bounce" style={{ animationDelay: '2s' }}>
          <Coins className="w-9 h-9 text-white/20" />
        </div>
        <div className="absolute top-1/2 left-8 animate-bounce" style={{ animationDelay: '2.5s' }}>
          <Wallet className="w-7 h-7 text-white/20" />
        </div>
        <div className="absolute bottom-16 right-1/4 animate-bounce" style={{ animationDelay: '3s' }}>
          <Calculator className="w-8 h-8 text-white/20" />
        </div>
        <div className="absolute top-24 left-1/3 animate-bounce" style={{ animationDelay: '0.8s' }}>
          <LineChart className="w-6 h-6 text-white/20" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-wrap items-center min-h-[500px]">
          <div className="w-full lg:w-7/12 pr-0 lg:pr-8">
            <div className="bg-white/20 backdrop-blur-sm text-white inline-block py-2 px-4 rounded-full text-sm font-medium mb-6 border border-white/30">
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Moderate Profile
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Moderate
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Investment Options
              </span>
            </h1>
            
            <p className="text-xl text-amber-100 mb-8 leading-relaxed max-w-xl">
              Balance growth potential with stability through our expertly managed moderate investment strategies, perfect for medium to long-term financial goals.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-amber-600 hover:bg-amber-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <TrendingUp className="w-5 h-5 mr-2" />
                Explore Options
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-amber-700 hover:bg-white/10 backdrop-blur-sm"
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
                  <Star className="w-6 h-6 text-yellow-300 mr-3" />
                  Key Characteristics
                </h3>
                <p className="text-amber-100 mb-6 text-lg">Balanced risk and return profile</p>
                
                <ul className="space-y-4">
                  {[
                    'Growth and income balanced',
                    'Medium market volatility',
                    'Some inflation protection',
                    'Time horizon of 5-10 years',
                    'Diversified asset mix'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-white">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-300 to-orange-300 mr-4 animate-pulse"></div>
                      <span className="text-amber-50">{item}</span>
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
            Popular Moderate Investment Options
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            These investment vehicles are commonly recommended for moderate investors seeking balanced growth and stability.
          </p>
          {/* Tabs component which shows different clickable investment categories */}
          <Tabs defaultValue="balanced" className="max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="balanced">Balanced Funds</TabsTrigger>
              <TabsTrigger value="index">Index Funds</TabsTrigger>
              <TabsTrigger value="stocks">Dividend Growth</TabsTrigger>
              <TabsTrigger value="reits">REITs</TabsTrigger>
            </TabsList>
            {/* TabsContent: Displays content for "Balanced Mutual Funds" tab */}
            <TabsContent value="balanced" className="mt-6">
              <div className="grid md:grid-cols-5 gap-6">
                <div className="md:col-span-3 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-4">Balanced Mutual Funds</h3>
                  <p className="text-gray-700 mb-6">
                    Balanced funds invest in a mix of stocks, bonds, and cash equivalents, offering a middle ground between growth and income.
                  </p>
                  
                  <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">60/40 Portfolio</h4>
                    <p className="text-sm text-gray-700">
                      Classic allocation with 60% stocks and 40% bonds, providing moderate growth potential while limiting volatility through diversification.
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">Target-Date Funds</h4>
                    <p className="text-sm text-gray-700">
                      Automatically adjusts asset allocation based on your target retirement date, becoming more conservative as you approach retirement.
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Global Allocation Funds</h4>
                    <p className="text-sm text-gray-700">
                      Invests across multiple asset classes and geographical regions to manage risk while pursuing moderate returns.
                    </p>
                  </div>
                </div>
                
                <div className="md:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-bold mb-4">Balanced Fund Considerations</h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-yellow-500 mr-2">$</span>
                      <span className="font-medium">Asset Mix:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Typically 40-70% stocks, 30-60% bonds.</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-yellow-500 mr-2">$</span>
                      <span className="font-medium">Fund Expenses:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Compare expense ratios across similar funds.</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-yellow-500 mr-2">$</span>
                      <span className="font-medium">Management Style:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Active vs. passive management approaches.</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-1">
                      <span className="text-yellow-500 mr-2">$</span>
                      <span className="font-medium">Tax Efficiency:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Consider tax implications and placement.</p>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-3">Typical Returns</h4>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Conservative Balanced:</span>
                      <span className="text-sm font-medium">4-6%</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Moderate Balanced:</span>
                      <span className="text-sm font-medium">6-8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Growth-Oriented Balanced:</span>
                      <span className="text-sm font-medium">7-9%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 italic">*Historical average returns; actual returns may vary</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            {/* TabsContent: Displays content for "Index Funds" tab */}
            <TabsContent value="index" className="mt-6">
              <div className="grid md:grid-cols-5 gap-6">
                <div className="md:col-span-3 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-4">Index Funds</h3>
                  <p className="text-gray-700 mb-6">
                    Index funds track a specific market index, offering broad market exposure with lower fees than actively managed funds.
                  </p>
                  
                  <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">S&P 500 Index Funds</h4>
                    <p className="text-sm text-gray-700">
                      Tracks the 500 largest U.S. companies, providing exposure to a significant portion of the U.S. stock market.
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">Total Market Index Funds</h4>
                    <p className="text-sm text-gray-700">
                      Tracks the entire U.S. stock market, including small and mid-cap companies for broader diversification.
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">International Index Funds</h4>
                    <p className="text-sm text-gray-700">
                      Tracks non-U.S. markets, providing global diversification to complement domestic investments.
                    </p>
                  </div>
                </div>
                
                <div className="md:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-bold mb-4">Index Fund Considerations</h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-yellow-500 mr-2">$</span>
                      <span className="font-medium">Expense Ratios:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Typically much lower than actively managed funds.</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-yellow-500 mr-2">$</span>
                      <span className="font-medium">Index Selection:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Different indexes offer varying exposure and risk profiles.</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-yellow-500 mr-2">$</span>
                      <span className="font-medium">Tax Efficiency:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Generally more tax-efficient than actively managed funds.</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-1">
                      <span className="text-yellow-500 mr-2">$</span>
                      <span className="font-medium">Tracking Error:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">How closely the fund follows its benchmark index.</p>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-3">Typical Returns</h4>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">S&P 500 Index (Long-term):</span>
                      <span className="text-sm font-medium">7-10%</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Total Bond Market Index:</span>
                      <span className="text-sm font-medium">3-5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">International Index:</span>
                      <span className="text-sm font-medium">6-9%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 italic">*Historical average returns; actual returns may vary</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            {/* TabsContent: Displays content for "Dividend Growth Stocks" tab */}
            <TabsContent value="stocks" className="mt-6">
              <div className="grid md:grid-cols-5 gap-6">
                <div className="md:col-span-3 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-4">Dividend Growth Stocks</h3>
                  <p className="text-gray-700 mb-6">
                    Stocks of companies with a history of increasing dividend payments, offering both income and potential capital appreciation.
                  </p>
                  
                  <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">Dividend Aristocrats</h4>
                    <p className="text-sm text-gray-700">
                      S&P 500 companies that have increased dividends for at least 25 consecutive years, demonstrating financial stability.
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">Dividend Growth ETFs</h4>
                    <p className="text-sm text-gray-700">
                      Exchange-Traded Funds focused on companies with consistent dividend growth, offering diversification and income.
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Mid-Yield Dividend Stocks</h4>
                    <p className="text-sm text-gray-700">
                      Companies with moderate current yields but strong dividend growth potential, balancing income and growth.
                    </p>
                  </div>
                </div>
                
                <div className="md:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-bold mb-4">Dividend Stock Considerations</h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-yellow-500 mr-2">$</span>
                      <span className="font-medium">Dividend Growth Rate:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Historical pace of dividend increases over time.</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-yellow-500 mr-2">$</span>
                      <span className="font-medium">Payout Ratio:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Percentage of earnings paid as dividends; lower is generally safer.</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-yellow-500 mr-2">$</span>
                      <span className="font-medium">Industry Position:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Competitive advantages that support sustainable dividend growth.</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-1">
                      <span className="text-yellow-500 mr-2">$</span>
                      <span className="font-medium">Tax Treatment:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Qualified dividends receive preferential tax treatment.</p>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-3">Typical Returns</h4>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Dividend Yield:</span>
                      <span className="text-sm font-medium">2-4%</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Dividend Growth Rate:</span>
                      <span className="text-sm font-medium">5-10% annually</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Return:</span>
                      <span className="text-sm font-medium">7-11%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 italic">*Historical average returns; actual returns may vary</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            {/* TabsContent: Displays content for "Real Estate Investment Trusts (REITs)" tab */}
            <TabsContent value="reits" className="mt-6">
              <div className="grid md:grid-cols-5 gap-6">
                <div className="md:col-span-3 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-4">Real Estate Investment Trusts (REITs)</h3>
                  <p className="text-gray-700 mb-6">
                    Companies that own, operate, or finance income-producing real estate, offering exposure to real estate markets with liquidity.
                  </p>
                  
                  <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">Equity REITs</h4>
                    <p className="text-sm text-gray-700">
                      Own and operate income-producing real estate like apartments, offices, retail centers, and warehouses.
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">Mortgage REITs</h4>
                    <p className="text-sm text-gray-700">
                      Provide financing for real estate by purchasing or originating mortgages and mortgage-backed securities.
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">REIT ETFs and Mutual Funds</h4>
                    <p className="text-sm text-gray-700">
                      Diversified portfolios of various REITs, providing broad exposure to the real estate sector.
                    </p>
                  </div>
                </div>
                
                <div className="md:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-bold mb-4">REIT Considerations</h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-yellow-500 mr-2">$</span>
                      <span className="font-medium">Dividend Yield:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">REITs must distribute at least 90% of taxable income.</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-yellow-500 mr-2">$</span>
                      <span className="font-medium">Property Type:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Different sectors (residential, commercial, healthcare) have varying risk profiles.</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-yellow-500 mr-2">$</span>
                      <span className="font-medium">Interest Rate Sensitivity:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">REITs can be affected by changes in interest rates.</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-1">
                      <span className="text-yellow-500 mr-2">$</span>
                      <span className="font-medium">Tax Considerations:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">REIT dividends are generally taxed as ordinary income.</p>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-3">Typical Returns</h4>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Equity REITs:</span>
                      <span className="text-sm font-medium">8-12% total return</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Mortgage REITs:</span>
                      <span className="text-sm font-medium">6-9% total return</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Dividend Yield:</span>
                      <span className="text-sm font-medium">3-6%</span>
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
            Moderate Portfolio Allocation
          </h2>
          {/* Section description */}
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            A typical moderate portfolio balances growth and stability for medium-term financial goals.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Sample Moderate Allocation card */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-2">Sample Moderate Allocation</h3>
              <p className="text-sm text-gray-600 mb-6">A balanced approach with emphasis on long-term growth</p>
              {/* Allocation bars for different asset classes */}
              <div className="space-y-4 mb-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Domestic Stocks</span>
                    <span className="text-sm">35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Investment-Grade Bonds</span>
                    <span className="text-sm">30%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">International Stocks</span>
                    <span className="text-sm">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">REITs</span>
                    <span className="text-sm">10%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-300 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Cash & Equivalents</span>
                    <span className="text-sm">10%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-200 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
            </Card>
            {/* Expected Outcomes card */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-2">Expected Outcomes</h3>
              <p className="text-sm text-gray-600 mb-6">Historical performance metrics for moderate portfolios</p>
              {/* Outcome metrics with simulated progress bars */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Potential Annual Return</span>
                    <span>6-8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Based on historical average annual returns</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Volatility</span>
                    <span>Medium</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Moderate price fluctuations expected</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Income Focus</span>
                    <span>Moderate</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Balance between growth and income generation</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Inflation Protection</span>
                    <span>Good</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Reasonable hedge against moderate inflation</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
      {/*Call to action: Prompts users to take a risk assessment */}
      <section className="py-16 bg-yellow-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Your Moderate Portfolio?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Get personalized investment recommendations based on your specific goals and risk tolerance.
          </p>
          <Link to="/assessment">
            <Button size="lg" className="bg-white text-yellow-600 hover:bg-gray-100">
              Take the Risk Assessment
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ModeratePage;