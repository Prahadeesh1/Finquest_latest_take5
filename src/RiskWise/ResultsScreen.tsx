
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { Shield, TrendingUp, BarChart3, Check, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ResultsScreenProps {
  profile: string;
  onStartOver: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ profile, onStartOver }) => {
  const getProfileData = () => {
    switch (profile) {
      case 'safe':
        return {
          title: 'Safe Investor',
          description: 'You prefer stability and minimizing risk in your investments.',
          icon: <Shield className="h-8 w-8 text-riskwise-safe" />,
          color: 'safe',
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
          pageLink: '/conservative'
        };
      case 'aggressive':
        return {
          title: 'Aggressive Investor',
          description: 'You aim for maximum growth and can tolerate higher volatility.',
          icon: <TrendingUp className="h-8 w-8 text-riskwise-aggressive" />,
          color: 'aggressive',
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
          pageLink: '/aggressive'
        };
      default:
        return {
          title: 'Moderate Investor',
          description: 'You balance growth with stability for a well-rounded portfolio.',
          icon: <BarChart3 className="h-8 w-8 text-riskwise-moderate" />,
          color: 'moderate',
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
          pageLink: '/moderate'
        };
    }
  };

  const profileData = getProfileData();

  return (
    <Card className={`w-full max-w-4xl mx-auto border-riskwise-${profileData.color} border-2 animate-scale-in`}>
      <CardHeader className={`bg-riskwise-${profileData.color}/10`}>
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
                  <Check className="h-5 w-5 text-riskwise-moderate shrink-0 mt-0.5" />
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
                <span className="inline-flex items-center justify-center bg-riskwise-moderate text-white w-5 h-5 rounded-full text-xs shrink-0 mt-0.5">{i+1}</span>
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
        <Link to={profileData.pageLink} className="w-full">
          <Button 
            className="w-full bg-riskwise-moderate hover:bg-riskwise-aggressive"
          >
            View Detailed Profile <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ResultsScreen;