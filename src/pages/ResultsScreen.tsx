import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { Shield, TrendingUp, BarChart3 } from 'lucide-react';

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
          ]
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
          ]
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
          ]
        };
    }
  };

  const profileData = getProfileData();

  return (
    <Card className={`w-full border-riskwise-${profileData.color} border-2 animate-scale-in`}>
      <CardHeader className={`bg-riskwise-${profileData.color}/10`}>
        <div className="flex items-center gap-3">
          {profileData.icon}
          <CardTitle className="text-2xl">{profileData.title}</CardTitle>
        </div>
        <CardDescription className="text-base mt-1">
          {profileData.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid md:grid-cols-2 gap-6">
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
            <h3 className="font-medium text-lg mb-3">Recommendations</h3>
            <ul className="list-disc pl-5 space-y-2">
              {profileData.recommendations.map((rec, i) => (
                <li key={i} className="text-gray-700">{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline"
          onClick={onStartOver}
          className="w-full"
        >
          Start Over
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResultsScreen;
