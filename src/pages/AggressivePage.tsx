
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';

//Main AggressivePage component for displaying aggressive investment options
const AggressivePage = () => {
  return (//Main container for the entire page
    <div className="min-h-screen bg-gray-50">
      {/* Navbar component for site navigation */}
      <Navbar />
      {/* Introduces the Aggressive Profile and its characteristics */}
      <section className="bg-red-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-7/12 pr-0 lg:pr-8">
              <div className="bg-red-100 text-red-700 inline-block py-1 px-3 rounded-full text-sm font-medium mb-4">
                Aggressive Profile
              </div>
              <h1 className="text-4xl font-bold mb-4">Aggressive Investment Options</h1>
              <p className="text-lg text-gray-700 mb-6">
                Aggressive investments prioritize maximum growth potential with higher volatility. These options are suitable for investors with long-term financial goals who can tolerate significant market fluctuations.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Learn More
                </Button>
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                  Compare Options
                </Button>
              </div>
            </div>
            {/* Right column: Key Characteristics card */}
            <div className="w-full lg:w-5/12 mt-8 lg:mt-0">
              <Card className="bg-white p-6 shadow-lg rounded-lg">
                <h3 className="text-xl font-medium mb-4 flex items-center">
                  <svg className="w-6 h-6 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Key Characteristics
                </h3>
                {/* Short description */}
                <p className="text-gray-600 mb-4">Higher risk, growth-focused</p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-3"></div>
                    <span className="text-gray-700">Maximum growth potential</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-3"></div>
                    <span className="text-gray-700">Higher volatility</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-3"></div>
                    <span className="text-gray-700">Strong inflation protection</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-3"></div>
                    <span className="text-gray-700">Time horizon of 10+ years</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-3"></div>
                    <span className="text-gray-700">Requires higher risk tolerance</span>
                  </li>
                </ul>
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
      {/*Prompts users to take a risk assessment */}
      <section className="py-16 bg-red-600 text-white">
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