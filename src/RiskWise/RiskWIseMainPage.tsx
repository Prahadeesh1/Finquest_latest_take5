import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { ChevronRight, TrendingDown, BarChart2, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import './riskwise.css'; 
import { Footer } from 'react-day-picker';


const HomePage = () => {
  return (
    <div>
      <div className="bg-white">
      </div>
      <Navbar />
      <div className="min-h-screen bg-blue-50">
      {/* Hero Section */}
      <section className="bg-blue-100 py-20">
        <div className="container mx-auto px-4 text-center ">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Invest Smarter Based on Your Risk Profile
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Learn about different investment options tailored to your risk tolerance and financial goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/assessment">
              <Button size="lg" className="bg-riskwise-moderate hover:bg-riskwise-aggressive text-black bg-blue-400">
                Assess Your Risk Profile
              </Button>
            </Link>
            <Link to="#investment-types">
              <Button size="lg" variant="outline">
                Explore Investments
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Investment Risk Profiles Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Investment by Risk Profile
          </h2>
          <p className="text-gray-600 text-lg text-center mb-12 max-w-3xl mx-auto">
            Discover investment options suited to different risk tolerances, from conservative to aggressive.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Conservative Card */}
            <Card className="p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 bg-white rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <TrendingDown className="h-6 w-6 text-blue-500" />
                </div>
                <div className="bg-blue-100 ml-auto text-xs font-medium text-blue-700 py-1 px-2 rounded-full">
                  Low Risk
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Conservative</h3>
              <p className="text-gray-600 mb-4">Stable returns with minimal risk</p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Government & Municipal Bonds</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm text-gray-700">CDs & Money Market Funds</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Blue-Chip Dividend Stocks</span>
                </li>
              </ul>
              
              <Link to="/conservative">
                <Button variant="outline" className="w-full border-blue-500 text-blue-500 hover:bg-blue-500">
                  Explore Conservative Options
                </Button>
              </Link>
            </Card>
            
            {/* Moderate Card */}
            <Card className="p-6 border border-gray-200 hover:border-yellow-300 hover:shadow-md transition-all duration-300 bg-white rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <BarChart2 className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="bg-yellow-100 ml-auto text-xs font-medium text-yellow-700 py-1 px-2 rounded-full">
                  Medium Risk
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Moderate</h3>
              <p className="text-gray-600 mb-4">Balanced growth with measured risk</p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Index Funds & ETFs</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Corporate Bonds</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Balanced Mutual Funds</span>
                </li>
              </ul>
              
              <Link to="/moderate">
                <Button variant="outline" className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500">
                  Explore Moderate Options
                </Button>
              </Link>
            </Card>
            
            {/* Aggressive Card */}
            <Card className="p-6 border border-gray-200 hover:border-red-300 hover:shadow-md transition-all duration-300 bg-white rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-red-500" />
                </div>
                <div className="bg-red-100 ml-auto text-xs font-medium text-red-700 py-1 px-2 rounded-full">
                  High Risk
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Aggressive</h3>
              <p className="text-gray-600 mb-4">Maximum growth with higher volatility</p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Growth Stocks & Small Caps</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Emerging Markets</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Sector-Specific Funds</span>
                </li>
              </ul>
              
              <Link to="/aggressive">
                <Button variant="outline" className="w-full border-red-500 text-red-500 hover:bg-red-500">
                  Explore Aggressive Options
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Investment Types Section */}
      <section id="investment-types" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Explore Investment Types
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Learn about different investment vehicles and how they might fit into your portfolio.
          </p>

          <Tabs defaultValue="stocks" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-4 mb-8 bg-blue-50 text-blakc-600">
              <TabsTrigger value="stocks">Stocks</TabsTrigger>
              <TabsTrigger value="bonds">Bonds</TabsTrigger>
              <TabsTrigger value="funds">Funds</TabsTrigger>
              <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
            </TabsList>
            
            <TabsContent value="stocks" className="animate-fade-in space-y-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Stocks</h3>
                <p className="text-gray-700 mb-8">
                Stocks represent ownership in a company. When you buy a stock, you're purchasing a share of the company's assets and earnings.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="p-5 border border-gray-100">
                    <h4 className="text-lg font-semibold mb-2">Growth Stocks</h4>
                    <p className="text-sm text-gray-600">
                    Companies expected to grow faster than the market, often reinvest earnings and rarely pay dividends.
                    </p>
                  </Card>
                  
                  <Card className="p-5 border border-gray-100">
                    <h4 className="text-lg font-semibold mb-2">Value Stocks</h4>
                    <p className="text-sm text-gray-600">
                    Companies trading below what analysts consider their intrinsic value, often paying dividends.
                    </p>
                  </Card>
                  
                  <Card className="p-5 border border-gray-100">
                    <h4 className="text-lg font-semibold mb-2">Dividend Stocks</h4>
                    <p className="text-sm text-gray-600">
                    Companies that distribute profits to shareholders regularly, providing income and potential growth.
                    </p>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="bonds" className="animate-fade-in">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Bonds</h3>
                <p className="text-gray-700 mb-6">
                  Bonds are loans made to corporations or governments that pay fixed interest over time and return principal at maturity.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="p-5 border border-gray-100">
                    <h4 className="text-lg font-semibold mb-2">Government Bonds</h4>
                    <p className="text-sm text-gray-600">
                    Debt securities issued by a government to support spending. Often considered the safest type of bond.
                    </p>
                  </Card>
                  
                  <Card className="p-5 border border-gray-100">
                    <h4 className="text-lg font-semibold mb-2">Corporate Bonds</h4>
                    <p className="text-sm text-gray-600">
                    Debt securities issued by corporations to fund expansion or operations. Higher yield but more risk than government bonds.
                    </p>
                  </Card>
                  
                  <Card className="p-5 border border-gray-100">
                    <h4 className="text-lg font-semibold mb-2">Municipal Bonds</h4>
                    <p className="text-sm text-gray-600">
                    Debt securities issued by states, cities, or counties. Interest is often exempt from federal taxes.
                    </p>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="funds" className="animate-fade-in">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Funds</h3>
                <p className="text-gray-700 mb-6">
                Investment funds pool money from many investors to purchase a diversified portfolio of securities.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="p-5 border border-gray-100">
                    <h4 className="text-lg font-semibold mb-2">Mutual Funds</h4>
                    <p className="text-sm text-gray-600">
                    Professionally managed investment funds that pool money to purchase securities according to specific strategies.
                    </p>
                  </Card>
                  
                  <Card className="p-5 border border-gray-100">
                    <h4 className="text-lg font-semibold mb-2">ETFs</h4>
                    <p className="text-sm text-gray-600">
                    Exchange-Traded Funds trade like stocks but represent a basket of assets tracking an index, sector, or commodity.
                    </p>
                  </Card>
                  
                  <Card className="p-5 border border-gray-100">
                    <h4 className="text-lg font-semibold mb-2">Index Funds</h4>
                    <p className="text-sm text-gray-600">
                    Passive investment funds designed to replicate the performance of a specific index like the S&P 500.
                    </p>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="alternatives" className="animate-fade-in">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Alternative Investments</h3>
                <p className="text-gray-700 mb-6">
                  Alternative investments include real estate, commodities, private equity, and other non-traditional assets.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="p-5 border border-gray-100">
                    <h4 className="text-lg font-semibold mb-2">Real Estate</h4>
                    <p className="text-sm text-gray-600">
                    Direct property ownership or via REITs, offering income potential and possible appreciation over time.
                    </p>
                  </Card>
                  
                  <Card className="p-5 border border-gray-100">
                    <h4 className="text-lg font-semibold mb-2">Commodities</h4>
                    <p className="text-sm text-gray-600">
                    Physical goods like gold, silver, oil, or agricultural products, often used as inflation hedges.
                    </p>
                  </Card>
                  
                  <Card className="p-5 border border-gray-100">
                    <h4 className="text-lg font-semibold mb-2">Private Equity</h4>
                    <p className="text-sm text-gray-600">
                    Investing in private companies not listed on public exchanges, typically longer-term with potentially higher returns.
                    </p>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-riskwise-moderate py-20 text-black bg-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-10">
            Assess your risk profile to discover investment options tailored to your financial goals and risk tolerance.
          </p>
          <Link to="/assessment">
            <Button size="lg" className="bg-white text-riskwise-moderate hover:bg-blue-400">
              Take the Risk Assessment
            </Button>
          </Link>
        </div>
      </section>
      </div>
    </div>
  );
};

export default HomePage;