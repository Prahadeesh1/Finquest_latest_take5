const handleStockSelection = (stockSymbol: string) => {
    setSelectedStocks(prev => 
      prev.includes(stockSymbol) 
        ? prev.filter(s => s !== stockSymbol)
        : [...prev, stockSymbol]
    );
  };

  const fetchStockData = async (symbol: string) => {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
      return null;
    }
  };

  const fetchAllStockData = async (symbols: string[]) => {
    const promises = symbols.map(symbol => fetchStockData(symbol));
    const results = await Promise.all(promises);
    
    const stockDataMap: any = {};
    symbols.forEach((symbol, index) => {
      if (results[index]) {
        stockDataMap[symbol] = results[index];
      }
    });
    
    return stockDataMap;
  };

  const generateEmailContent = (stocksData: any) => {
    const selectedStockInfo = profileData.stocks?.filter(stock => 
      selectedStocks.includes(stock.symbol)
    ) || [];

    let emailContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .stock-card { border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 15px; }
        .stock-symbol { color: #2563eb; font-weight: bold; font-size: 18px; }
        .metric { display: inline-block; margin-right: 20px; }
        .metric-label { font-weight: bold; }
        .disclaimer { background-color: #fef3c7; padding: 15px; border-radius: 8px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Your Personalized Stock Analysis Report</h1>
        <p>Risk Profile: <strong>${profileData.title}</strong></p>
        <p>Generated on: ${new Date().toLocaleDateString()}</p>
    </div>
    
    <h2>Selected Stocks Analysis</h2>
`;

    selectedStockInfo.forEach(stock => {
      const alphaData = stocksData[stock.symbol];
      
      emailContent += `
    <div class="stock-card">
        <div class="stock-symbol">${stock.symbol} - ${stock.name}</div>
        <p><strong>Sector:</strong> ${stock.sector}</p>
        <p><strong>Risk Level:</strong> ${stock.risk}</p>
        ${stock.dividend ? `<p><strong>Dividend Yield:</strong> ${stock.dividend}</p>` : ''}
        ${stock.growth ? `<p><strong>Expected Growth:</strong> ${stock.growth}</p>` : ''}
        
        ${alphaData && alphaData.Symbol ? `
        <h4>Current Market Data:</h4>
        <div>
            ${alphaData.MarketCapitalization ? `<span class="metric"><span class="metric-label">Market Cap:</span> ${alphaData.MarketCapitalization}</span>` : ''}
            ${alphaData.PERatio ? `<span class="metric"><span class="metric-label">P/E Ratio:</span> ${alphaData.PERatio}</span>` : ''}
            ${alphaData.DividendYield ? `<span class="metric"><span class="metric-label">Current Dividend:</span> ${alphaData.DividendYield}</span>` : ''}
        </div>
        <div>
            ${alpimport React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { Shield, TrendingUp, BarChart3, Check, ExternalLink, X, Mail, Loader2 } from 'lucide-react';

interface ResultsScreenProps {
  profile: string;
  onStartOver: () => void;
}

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
};

const ResultsScreen: React.FC<ResultsScreenProps> = ({ profile, onStartOver }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stockData, setStockData] = useState<any>({});
  
  // Replace with your actual Alpha Vantage API key
  const ALPHA_VANTAGE_API_KEY = 'YOUR_API_KEY_HERE';

  const getProfileData = () => {
    switch (profile) {
      case 'safe':
        return {
          title: 'Safe Investor',
          description: 'You prefer stability and minimizing risk in your investments.',
          icon: <Shield className="h-8 w-8 text-green-600" />,
          color: 'green',
          allocation: [
            { name: 'Bonds', value: 60, color: '#4ade80' },
            { name: 'Cash', value: 25, color: '#facc15' },
            { name: 'Stocks', value: 10, color: '#3b82f6' },
            { name: 'Other', value: 5, color: '#a855f7' },
          ],
          recommendations: [
            'Focus on high-quality bonds and certificates of deposit',
            'Consider treasury securities for guaranteed returns',
            'Maintain sufficient emergency funds in cash equivalents',
            'Explore low-volatility dividend stocks for stable income'
          ],
          examples: [
            'Treasury Bills (3-month): 2-3% annual return with minimal risk',
            'Municipal Bonds: 3-5% tax-advantaged yield',
            'High-grade Corporate Bonds: 3-6% annual yield',
            'Money Market Funds: 2-4% liquid cash equivalent'
          ],
          stocks: [
            { symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare', dividend: '2.6%', risk: 'Low' },
            { symbol: 'PG', name: 'Procter & Gamble', sector: 'Consumer Goods', dividend: '2.4%', risk: 'Low' },
            { symbol: 'KO', name: 'Coca-Cola', sector: 'Beverages', dividend: '3.1%', risk: 'Low' },
            { symbol: 'VZ', name: 'Verizon', sector: 'Telecom', dividend: '6.2%', risk: 'Low' },
            { symbol: 'T', name: 'AT&T', sector: 'Telecom', dividend: '7.1%', risk: 'Low' }
          ],
          pageLink: '/conservative'
        };
      case 'aggressive':
        return {
          title: 'Aggressive Investor',
          description: 'You aim for maximum growth and can tolerate higher volatility.',
          icon: <TrendingUp className="h-8 w-8 text-red-600" />,
          color: 'red',
          allocation: [
            { name: 'Stocks', value: 70, color: '#3b82f6' },
            { name: 'Alternative', value: 15, color: '#a855f7' },
            { name: 'Bonds', value: 10, color: '#4ade80' },
            { name: 'Cash', value: 5, color: '#facc15' },
          ],
          recommendations: [
            'Focus on growth stocks and emerging market opportunities',
            'Consider high-yield bonds for increased returns',
            'Explore alternative investments like real estate or private equity',
            'Maintain a small cash reserve for opportunistic investments'
          ],
          examples: [
            'Tech Growth Stocks: potential for 15-30% annual growth with high volatility',
            'Emerging Market ETFs: potential for 10-25% annual returns',
            'Small-Cap Stock Funds: historically 9-15% long-term returns',
            'Cryptocurrency allocation: high-risk with potential for significant returns'
          ],
          stocks: [
            { symbol: 'TSLA', name: 'Tesla Inc.', sector: 'Electric Vehicles', growth: '25-40%', risk: 'High' },
            { symbol: 'NVDA', name: 'NVIDIA Corp.', sector: 'Semiconductors', growth: '30-50%', risk: 'High' },
            { symbol: 'AMZN', name: 'Amazon.com Inc.', sector: 'E-commerce/Cloud', growth: '15-25%', risk: 'High' },
            { symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology', growth: '12-20%', risk: 'High' },
            { symbol: 'META', name: 'Meta Platforms', sector: 'Social Media', growth: '20-35%', risk: 'High' },
            { symbol: 'PLTR', name: 'Palantir Technologies', sector: 'Data Analytics', growth: '40-60%', risk: 'Very High' }
          ],
          pageLink: '/aggressive'
        };
      default:
        return {
          title: 'Moderate Investor',
          description: 'You balance growth with stability for a well-rounded portfolio.',
          icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
          color: 'blue',
          allocation: [
            { name: 'Stocks', value: 45, color: '#3b82f6' },
            { name: 'Bonds', value: 35, color: '#4ade80' },
            { name: 'Cash', value: 10, color: '#facc15' },
            { name: 'Alternative', value: 10, color: '#a855f7' },
          ],
          recommendations: [
            'Create a balanced mix of growth stocks and dividend-paying equities',
            'Include intermediate-term bonds for steady income',
            'Allocate a portion to international investments for diversification',
            'Consider REITs or other alternative assets for portfolio stability'
          ],
          examples: [
            'Balanced ETFs: 6-9% average annual return with moderate volatility',
            'Blue-chip dividend stocks: 4-7% annual dividends plus growth potential',
            'Investment-grade corporate bonds: 4-6% yields with moderate risk',
            'Real Estate Investment Trusts (REITs): 4-8% dividend yields with growth potential'
          ],
          stocks: [
            { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology', dividend: '0.5%', growth: '8-15%', risk: 'Moderate' },
            { symbol: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology', dividend: '0.7%', growth: '10-18%', risk: 'Moderate' },
            { symbol: 'SPY', name: 'SPDR S&P 500 ETF', sector: 'Index Fund', dividend: '1.3%', growth: '8-12%', risk: 'Moderate' },
            { symbol: 'VTI', name: 'Vanguard Total Stock Market', sector: 'Index Fund', dividend: '1.4%', growth: '7-11%', risk: 'Moderate' },
            { symbol: 'BRK.B', name: 'Berkshire Hathaway', sector: 'Conglomerate', growth: '10-15%', risk: 'Moderate' },
            { symbol: 'JPM', name: 'JPMorgan Chase', sector: 'Banking', dividend: '2.3%', growth: '6-12%', risk: 'Moderate' }
          ],
          pageLink: '/moderate'
        };
    }
  };

  const profileData = getProfileData();

  const handleStockSelection = (stockSymbol: string) => {
    setSelectedStocks(prev => 
      prev.includes(stockSymbol) 
        ? prev.filter(s => s !== stockSymbol)
        : [...prev, stockSymbol]
    );
  };

  const handleSendEmail = async () => {
    if (!email || selectedStocks.length === 0) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:3001/api/send-stock-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          selectedStocks: selectedStocks,
          riskProfile: profileData.title
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setEmailSent(true);
        // Reset after 4 seconds
        setTimeout(() => {
          setEmailSent(false);
          setSelectedStocks([]);
          setEmail('');
          setIsModalOpen(false);
          setIsLoading(false);
        }, 4000);
      } else {
        throw new Error(result.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email: ' + error.message);
      setIsLoading(false);
    }
  };

  const renderModalContent = () => {
    if (emailSent) {
      return (
        <div className="text-center py-8">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h2 className="text-xl font-semibold mb-2 text-green-600">Email Sent Successfully!</h2>
          <p className="text-gray-700 mb-2">Your detailed stock analysis has been sent to:</p>
          <p className="font-semibold text-blue-600">{email}</p>
          <p className="text-sm text-gray-500 mt-4">
            The email includes real-time data for {selectedStocks.length} selected stock{selectedStocks.length !== 1 ? 's' : ''} with current prices, market metrics, and investment insights.
          </p>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="text-center py-8">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Fetching Real-Time Stock Data...</h2>
          <p className="text-gray-700 mb-2">Getting current market data for your selected stocks</p>
          <div className="text-sm text-gray-500">
            <p>• Fetching live stock prices from Alpha Vantage</p>
            <p>• Gathering company fundamentals and metrics</p>
            <p>• Preparing personalized analysis report</p>
          </div>
        </div>
      );
    }

    return (
      <>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Recommended Stocks for {profileData.title}
        </h2>
        
        <div className="max-h-96 overflow-y-auto">
          <div className="space-y-3 mb-4">
            {profileData.stocks?.map((stock, index) => (
              <div key={stock.symbol} className="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-blue-600">{stock.symbol}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        stock.risk === 'Low' ? 'bg-green-100 text-green-800' :
                        stock.risk === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                        stock.risk === 'High' ? 'bg-red-100 text-red-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {stock.risk} Risk
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-900">{stock.name}</h4>
                    <p className="text-sm text-gray-600">{stock.sector}</p>
                    <div className="flex gap-4 mt-2 text-sm">
                      {stock.dividend && (
                        <span className="text-green-600 font-medium">
                          📊 Dividend: {stock.dividend}
                        </span>
                      )}
                      {stock.growth && (
                        <span className="text-blue-600 font-medium">
                          📈 Growth: {stock.growth}
                        </span>
                      )}
                    </div>
                  </div>
                  {(profile === 'moderate' || profile === 'aggressive') && (
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedStocks.includes(stock.symbol)}
                        onChange={() => handleStockSelection(stock.symbol)}
                        className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium">Select</span>
                    </label>
                  )}
                </div>
              </div>
            ))}
          </div>

          {profile === 'safe' && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
              <p className="text-blue-800 text-sm">
                💡 <strong>Conservative Approach:</strong> These dividend-paying stocks are recommended for their stability and consistent income. Perfect for risk-averse investors seeking steady returns.
              </p>
            </div>
          )}

          {(profile === 'moderate' || profile === 'aggressive') && (
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Get Real-Time Analysis via Email
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                Select stocks you're interested in and receive a comprehensive analysis with:
              </p>
              <ul className="text-xs text-gray-600 mb-4 space-y-1">
                <li>• Live stock prices and daily performance</li>
                <li>• Key financial metrics (P/E ratio, market cap, dividends)</li>
                <li>• 52-week high/low ranges</li>
                <li>• Company overviews and sector analysis</li>
                <li>• Personalized investment recommendations</li>
              </ul>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">
                    {selectedStocks.length} stock{selectedStocks.length !== 1 ? 's' : ''} selected
                  </span>
                  {selectedStocks.length > 0 && (
                    <span className="text-blue-600 font-medium">
                      Real-time data will be fetched
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };
                </div>
              </div>
            ))}
          </div>

          {profile === 'safe' && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
              <p className="text-blue-800 text-sm">
                💡 <strong>Conservative Approach:</strong> These stocks are recommended for their stability and dividend income. Consider consulting with a financial advisor before making investment decisions.
              </p>
            </div>
          )}

          {(profile === 'moderate' || profile === 'aggressive') && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-3">Get Detailed Analysis via Email</h3>
              <p className="text-sm text-gray-600 mb-3">
                Select the stocks you're interested in and we'll send you detailed analysis and investment strategies.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500">
                  {selectedStocks.length} stock{selectedStocks.length !== 1 ? 's' : ''} selected
                </p>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className={`border-${profileData.color}-500 border-2`}>
        <CardHeader className={`bg-${profileData.color}-50`}>
          <div className="flex items-center gap-3 mb-2">
            {profileData.icon}
            <CardTitle className="text-2xl">Your Result: {profileData.title}</CardTitle>
          </div>
          <CardDescription className="text-base mt-1">
            {profileData.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-medium text-lg mb-3">Recommended Asset Allocation</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={profileData.allocation}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {profileData.allocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-3">Key Recommendations</h3>
              <ul className="space-y-2">
                {profileData.recommendations.map((rec, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="font-medium text-lg mb-3">Investment Examples</h3>
            <ul className="space-y-2 text-sm">
              {profileData.examples.map((example, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="inline-flex items-center justify-center bg-blue-500 text-white w-5 h-5 rounded-full text-xs shrink-0 mt-0.5">{i+1}</span>
                  <span className="text-gray-700">{example}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline"
            onClick={onStartOver}
            className="w-full"
          >
            Take Assessment Again
          </Button>
          <Button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
            onClick={() => setIsModalOpen(true)}
          >
            Get Personalized Advice
          </Button>
          <Button 
            className="w-full bg-blue-500 hover:bg-blue-600"
            onClick={() => alert(`Navigating to ${profileData.pageLink}`)}
          >
            View Detailed Profile <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {renderModalContent()}
        {!emailSent && (
          <div className="flex gap-2 mt-6">
            <Button 
              onClick={() => setIsModalOpen(false)}
              variant="outline"
              className="flex-1"
            >
              Close
            </Button>
            {profile === 'safe' ? (
              <Button 
                onClick={() => {
                  setIsModalOpen(false);
                  onStartOver();
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Start Over
              </Button>
            ) : (
              <Button 
                onClick={handleSendEmail}
                disabled={!email || selectedStocks.length === 0}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
              >
                Send to Email ({selectedStocks.length})
              </Button>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ResultsScreen;