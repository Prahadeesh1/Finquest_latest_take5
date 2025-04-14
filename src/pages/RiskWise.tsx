import React, { useState } from 'react';
import RiskCard from './RiskCard';
import RiskQuestionnaire from './RiskQuestionaire';
import ResultsScreen from './ResultsScreen';
import { Button } from '@/components/ui/button';
import { ArrowDownCircle } from 'lucide-react';

const RiskWise = () => {
  const [section, setSection] = useState<'profiles' | 'questionnaire' | 'results'>('profiles');
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  
  const scrollToQuestionnaire = () => {
    const element = document.getElementById('questionnaire-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleQuestionnaireComplete = (profile: string) => {
    setSelectedProfile(profile);
    setSection('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartOver = () => {
    setSection('profiles');
    setSelectedProfile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Risk profiles data
  const profilesData = [
    {
      title: "Safe Investment",
      description: "Low risk, stable returns, and capital preservation",
      color: "safe",
      returns: "1-3% expected annual return",
      examples: [
        "High-yield savings accounts",
        "Certificates of deposit (CDs)",
        "Treasury bonds",
        "Money market funds",
      ],
      allocation: {
        stocks: 10,
        bonds: 60,
        cash: 25,
        other: 5,
      },
    },
    {
      title: "Moderate Investment",
      description: "Balanced approach with moderate growth and stability",
      color: "moderate",
      returns: "4-6% expected annual return",
      examples: [
        "Index funds (S&P 500, Total Market)",
        "Blue-chip dividend stocks",
        "Corporate bonds",
        "REITs (Real Estate Investment Trusts)",
      ],
      allocation: {
        stocks: 45,
        bonds: 35,
        cash: 10,
        other: 10,
      },
    },
    {
      title: "Aggressive Investment",
      description: "High growth potential with higher volatility",
      color: "aggressive",
      returns: "7-10%+ expected annual return",
      examples: [
        "Growth stocks and small-cap stocks",
        "Emerging markets",
        "High-yield bonds",
        "Alternative investments (crypto, commodities)",
      ],
      allocation: {
        stocks: 70,
        bonds: 10,
        cash: 5,
        other: 15,
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-riskwise-darkpurple to-riskwise-moderate text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">Welcome to RiskWise</h1>
          <p className="text-xl opacity-90 max-w-2xl animate-fade-in">
            Your personalized investment path begins here. Discover the right investment 
            strategy based on your risk tolerance and financial goals.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {section === 'profiles' && (
          <>
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-semibold mb-4">Investment Risk Profiles</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Explore these investment approaches and find the one that aligns with your goals. 
                Each profile represents a different balance of risk and potential return.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {profilesData.map((profile, index) => (
                <div 
                  key={index}
                  className={`animate-fade-in`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <RiskCard
                    {...profile}
                    isActive={selectedProfile === profile.color}
                    onClick={() => setSelectedProfile(profile.color)}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button 
                onClick={scrollToQuestionnaire}
                size="lg"
                className="animate-fade-in flex items-center gap-2"
              >
                Take the Risk Assessment
                <ArrowDownCircle className="h-5 w-5" />
              </Button>
            </div>
          </>
        )}

        {section === 'results' && selectedProfile && (
          <ResultsScreen 
            profile={selectedProfile}
            onStartOver={handleStartOver}
          />
        )}
      </div>

      {section === 'profiles' && (
        <div 
          id="questionnaire-section"
          className="bg-gray-100 py-16"
        >
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-semibold mb-2">Find Your Investment Profile</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Answer these questions to determine which investment approach is best suited 
                for your goals, timeline, and comfort with risk.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <RiskQuestionnaire onComplete={handleQuestionnaireComplete} />
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2025 RiskWise. All rights reserved.</p>
          <p className="text-gray-400 text-sm">
            The information provided is for educational purposes only and should not be 
            considered financial advice. Consult with a professional advisor before making investment decisions.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RiskWise;

