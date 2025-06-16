import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import { Shield, TrendingUp, DollarSign, PieChart, Star, ArrowRight } from 'lucide-react';

//Main ConservativePage component for displaying conservative investment options
const ConservativePage = () => {
  return (//Main container for the entire page
    <div className="min-h-screen bg-gray-50">
      {/* Navbar component for site navigation */}
      <Navbar />
      {/* Introduces the Conservative Profile and its characteristics */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-overlay animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-white rounded-full mix-blend-overlay animate-pulse delay-500"></div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 animate-float">
            <Shield className="w-8 h-8 text-white/20" />
          </div>
          <div className="absolute top-40 right-20 animate-float delay-1000">
            <TrendingUp className="w-10 h-10 text-white/20" />
          </div>
          <div className="absolute bottom-40 left-20 animate-float delay-500">
            <DollarSign className="w-12 h-12 text-white/20" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-wrap items-center min-h-[500px]">
            <div className="w-full lg:w-7/12 pr-0 lg:pr-8">
              <div className="bg-white/20 backdrop-blur-sm text-white inline-block py-2 px-4 rounded-full text-sm font-medium mb-6 border border-white/30">
                <Shield className="w-4 h-4 inline mr-2" />
                Conservative Profile
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                Conservative
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Investment Options
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-xl">
                Prioritize capital preservation and steady income with our carefully curated conservative investment strategies designed for risk-averse investors.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Explore Options
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-blue-500 hover:bg-white/10 backdrop-blur-sm"
                >
                  Compare Strategies
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
            
            {/* Enhanced Key Characteristics card */}
            <div className="w-full lg:w-5/12 mt-12 lg:mt-0">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2 flex items-center text-white">
                    <Star className="w-6 h-6 text-yellow-300 mr-3" />
                    Key Characteristics
                  </h3>
                  <p className="text-blue-100 mb-6 text-lg">Lower risk, stable returns</p>
                  
                  <ul className="space-y-4">
                    {[
                      'Capital preservation focused',
                      'Regular income generation',
                      'Lower volatility and risk',
                      'May not keep pace with inflation',
                      'Typically shorter time horizons'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center text-white">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-300 to-orange-300 mr-4 animate-pulse"></div>
                        <span className="text-blue-50">{item}</span>
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
            Popular Conservative Investment Options
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            These investment vehicles are commonly recommended for conservative investors seeking stability and income.
          </p>

          {/* Tabs component which shows different clickable investment categories */}
          <Tabs defaultValue="bonds" className="max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="bonds">Bonds</TabsTrigger>
              <TabsTrigger value="cash">Cash & Equivalents</TabsTrigger>
              <TabsTrigger value="dividend">Dividend Stocks</TabsTrigger>
              <TabsTrigger value="cds">CDs & Fixed Income</TabsTrigger>
            </TabsList>
            {/* TabsContent: Displays content for "Government & Municipal Bonds" tab */}
            <TabsContent value="bonds" className="mt-6">
              <div className="grid md:grid-cols-5 gap-6">
                <div className="md:col-span-3 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-4">Government & Municipal Bonds</h3>
                  <p className="text-gray-700 mb-6">
                    Government and municipal bonds are typically among the safest investments available, backed by the full faith and credit of the issuing government entity.
                  </p>
                  
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">U.S. Treasury Securities</h4>
                    <p className="text-sm text-gray-700">
                      Treasury bills, notes, and bonds are considered among the safest investments globally. They pay interest semi-annually and return principal at maturity.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">Municipal Bonds</h4>
                    <p className="text-sm text-gray-700">
                      Issued by states, cities, and local governments. Interest is often exempt from federal taxes, and sometimes state and local taxes as well.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">TIPS (Treasury Inflation-Protected Securities)</h4>
                    <p className="text-sm text-gray-700">
                      These U.S. government bonds protect against inflation by adjusting principal value based on changes in the Consumer Price Index.
                    </p>
                  </div>
                </div>
                
                <div className="md:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-bold mb-4">Bond Investment Considerations</h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-blue-500 mr-2">$</span>
                      <span className="font-medium">Interest Rate Risk:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Bond prices typically fall when interest rates rise.</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-blue-500 mr-2">$</span>
                      <span className="font-medium">Credit Risk:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Potential for issuer to default on payments.</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-blue-500 mr-2">$</span>
                      <span className="font-medium">Inflation Risk:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Fixed returns may not keep pace with inflation.</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-1">
                      <span className="text-blue-500 mr-2">$</span>
                      <span className="font-medium">Liquidity:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Some bonds may be harder to sell quickly.</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-3">Typical Returns</h4>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Treasury Bonds:</span>
                      <span className="text-sm font-medium">2-4%</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Municipal Bonds:</span>
                      <span className="text-sm font-medium">3-5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Investment-Grade Corporate:</span>
                      <span className="text-sm font-medium">3-6%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 italic">*Historical average returns; actual returns may vary</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* TabsContent: Displays content for "Cash and Equivalent" tab */}
            <TabsContent value="cash" className="mt-6">
              <div className="grid md:grid-cols-5 gap-6">
                <div className="md:col-span-3 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-4">Cash & Equivalents</h3>
                  <p className="text-gray-700 mb-6">
                    Cash and cash equivalents are highly liquid assets that can be easily converted into cash with little to no risk of loss in value.
                  </p>
                  
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">High-Yield Savings Accounts</h4>
                    <p className="text-sm text-gray-700">
                      Savings accounts that offer higher interest rates compared to traditional savings accounts.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">Money Market Accounts</h4>
                    <p className="text-sm text-gray-700">
                      A type of savings account that typically offers a higher interest rate than a traditional savings account and may come with check-writing privileges.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Certificates of Deposit (CDs)</h4>
                    <p className="text-sm text-gray-700">
                      A savings certificate entitling the bearer to receive interest. A CD bears a maturity date, a specified fixed interest rate, and can be issued in any denomination.
                    </p>
                  </div>
                </div>
                
                <div className="md:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-bold mb-4">Cash Investment Considerations</h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-blue-500 mr-2">$</span>
                      <span className="font-medium">Inflation Risk:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Returns may not keep pace with inflation, leading to a decrease in purchasing power.</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-blue-500 mr-2">$</span>
                      <span className="font-medium">Interest Rate Risk:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Returns may not keep pace with rising interest rates.</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-blue-500 mr-2">$</span>
                      <span className="font-medium">FDIC Insurance:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Most cash accounts are insured by the FDIC up to $250,000 per depositor, per insured bank.</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-1">
                      <span className="text-blue-500 mr-2">$</span>
                      <span className="font-medium">Liquidity:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Cash accounts are highly liquid and can be easily accessed when needed.</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-3">Typical Returns</h4>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">High-Yield Savings Accounts:</span>
                      <span className="text-sm font-medium">0.5-1.5%</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Money Market Accounts:</span>
                      <span className="text-sm font-medium">0.5-1.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Certificates of Deposit (CDs):</span>
                      <span className="text-sm font-medium">1-3%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 italic">*Historical average returns; actual returns may vary</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* TabsContent: Displays content for "Dividend Stocks" tab */}
            <TabsContent value="dividend" className="mt-6">
              <div className="grid md:grid-cols-5 gap-6">
                <div className="md:col-span-3 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-4">Dividend Stocks</h3>
                  <p className="text-gray-700 mb-6">
                    Dividend stocks are shares of companies that distribute a portion of their earnings to shareholders on a regular basis, typically quarterly.
                  </p>
                  
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">Blue-Chip Dividend Stocks</h4>
                    <p className="text-sm text-gray-700">
                      Shares of large, well-established companies with a history of consistent dividend payments.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">Dividend ETFs</h4>
                    <p className="text-sm text-gray-700">
                      Exchange-Traded Funds (ETFs) that focus on dividend-paying stocks, providing diversification and income.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">REITs (Real Estate Investment Trusts)</h4>
                    <p className="text-sm text-gray-700">
                      Companies that own or finance income-producing real estate, often distributing a significant portion of their income as dividends.
                    </p>
                  </div>
                </div>
                
                <div className="md:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-bold mb-4">Dividend Stock Considerations</h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-blue-500 mr-2">$</span>
                      <span className="font-medium">Dividend Yield:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">The annual dividend payment as a percentage of the stock's current price.</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-blue-500 mr-2">$</span>
                      <span className="font-medium">Dividend Payout Ratio:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">The percentage of a company's earnings paid out as dividends.</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-blue-500 mr-2">$</span>
                      <span className="font-medium">Dividend Growth:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">The rate at which a company has been increasing its dividend payments over time.</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-1">
                      <span className="text-blue-500 mr-2">$</span>
                      <span className="font-medium">Tax Implications:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Dividends are typically taxed as ordinary income or at a lower qualified dividend rate.</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-3">Typical Returns</h4>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Blue-Chip Dividend Stocks:</span>
                      <span className="text-sm font-medium">2-4%</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Dividend ETFs:</span>
                      <span className="text-sm font-medium">2-5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">REITs:</span>
                      <span className="text-sm font-medium">3-6%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 italic">*Historical average returns; actual returns may vary</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* TabsContent: Displays content for "CDs & Fixed Income" tab */}
            <TabsContent value="cds" className="mt-6">
              <div className="grid md:grid-cols-5 gap-6">
                <div className="md:col-span-3 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-4">CDs & Fixed Income</h3>
                  <p className="text-gray-700 mb-6">
                    Certificates of Deposit (CDs) and other fixed income investments offer a fixed interest rate over a specific period of time, providing a predictable income stream.
                  </p>
                  
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">Certificates of Deposit (CDs)</h4>
                    <p className="text-sm text-gray-700">
                      A savings certificate entitling the bearer to receive interest. A CD bears a maturity date, a specified fixed interest rate, and can be issued in any denomination.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">Fixed Annuities</h4>
                    <p className="text-sm text-gray-700">
                      A contract with an insurance company that guarantees a fixed rate of return for a specified period of time.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Treasury Inflation-Protected Securities (TIPS)</h4>
                    <p className="text-sm text-gray-700">
                      U.S. government bonds that protect against inflation by adjusting principal value based on changes in the Consumer Price Index.
                    </p>
                  </div>
                </div>
                
                <div className="md:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-bold mb-4">CDs & Fixed Income Considerations</h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-blue-500 mr-2">$</span>
                      <span className="font-medium">Interest Rate Risk:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Rising interest rates may make existing CDs and fixed income investments less attractive.</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-blue-500 mr-2">$</span>
                      <span className="font-medium">Inflation Risk:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">Fixed returns may not keep pace with inflation, leading to a decrease in purchasing power.</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="text-blue-500 mr-2">$</span>
                      <span className="font-medium">Liquidity:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">CDs typically have penalties for early withdrawal, limiting liquidity.</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-1">
                      <span className="text-blue-500 mr-2">$</span>
                      <span className="font-medium">FDIC Insurance:</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">CDs are insured by the FDIC up to $250,000 per depositor, per insured bank.</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-3">Typical Returns</h4>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Certificates of Deposit (CDs):</span>
                      <span className="text-sm font-medium">1-3%</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Fixed Annuities:</span>
                      <span className="text-sm font-medium">2-4%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Treasury Inflation-Protected Securities (TIPS):</span>
                      <span className="text-sm font-medium">0.5-1.5% + Inflation</span>
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
            Conservative Portfolio Allocation
          </h2>
          {/* Section description */}
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            A typical conservative portfolio emphasizes capital preservation with some income generation.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Sample Conservative Allocation card */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-2">Sample Conservative Allocation</h3>
              <p className="text-sm text-gray-600 mb-6">A balanced approach focused on stability with some income potential</p>
              {/* Allocation bars for different asset classes */}
              <div className="space-y-4 mb-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Government Bonds</span>
                    <span className="text-sm">40%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">CDs & Money Market</span>
                    <span className="text-sm">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">High-Quality Corporate Bonds</span>
                    <span className="text-sm">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Blue-Chip Dividend Stocks</span>
                    <span className="text-sm">10%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-300 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Cash & Equivalents</span>
                    <span className="text-sm">10%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-200 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
            </Card>
            {/* Expected Outcomes card */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-2">Expected Outcomes</h3>
              <p className="text-sm text-gray-600 mb-6">Historical performance metrics for conservative portfolios</p>
              {/* Outcome metrics with simulated progress bars */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Potential Annual Return</span>
                    <span>3-5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Based on historical average annual returns</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Volatility</span>
                    <span>Low</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Lower price fluctuations compared to growth-oriented portfolios</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Income Focus</span>
                    <span>High</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Regular interest and dividend payments</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Inflation Protection</span>
                    <span>Moderate</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">May struggle to keep pace with high inflation</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
      {/*Call to action: Prompts users to take a risk assessment */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Your Conservative Portfolio?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Get personalized investment recommendations based on your specific goals and risk tolerance.
          </p>
          <Link to="/assessment">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Take the Risk Assessment
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ConservativePage;