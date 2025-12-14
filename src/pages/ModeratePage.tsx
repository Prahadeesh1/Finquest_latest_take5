import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import { BarChart3, TrendingUp, DollarSign, ChevronDown } from 'lucide-react';

const ModeratePage = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [expandedMarket, setExpandedMarket] = useState(null);
  const [activeAllocation, setActiveAllocation] = useState('basic');

  const investmentOptions = [
    {
      id: 'balanced',
      title: 'Balanced Funds',
      icon: '⚖️',
      returns: '5-7%',
      time: '5-10 years',
      snippet: 'Mix of stocks & bonds with auto-rebalancing',
      details: [
        'Lion Global Balanced Fund, NTUC Income Balanced',
        'Vanguard Balanced Index, Fidelity Balanced',
        'HSBC Global Multi-Asset',
        '50-60% stocks, 40-50% bonds'
      ],
      highlight: 'Best for: Passive investors wanting simplicity'
    },
    {
      id: 'index',
      title: 'Index Funds & ETFs',
      icon: '📊',
      returns: '6-8%',
      time: '5-10 years',
      snippet: 'Low-cost diversified index tracking',
      details: [
        'Singapore: STI ETF, Nikko AM STI ETF',
        'USA: S&P 500 ETF, Total Market Index',
        'International: MSCI World ETF, iShares MSCI EAFE',
        'Very low fees (0.05-0.20% annually)'
      ],
      highlight: 'Best for: Cost-conscious long-term investors'
    },
    {
      id: 'dividend-growth',
      title: 'Dividend Growth Stocks',
      icon: '💰',
      returns: '4-6%',
      time: '5-10 years',
      snippet: 'Companies with consistent dividend increases',
      details: [
        'Singapore: DBS, OCBC, UOB (Banks)',
        'USA: Dividend Aristocrats, Vanguard Dividend Growth',
        'International: European Dividend ETFs',
        'Steady income + capital appreciation'
      ],
      highlight: 'Best for: Income-focused balanced approach'
    },
    {
      id: 'commercial-reits',
      title: 'Commercial REITs',
      icon: '🏢',
      returns: '4-6%',
      time: '5-10 years',
      snippet: 'Diversified real estate across sectors',
      details: [
        'Singapore: Mapletree Industrial Trust, Frasers Logistics',
        'USA: Digital Realty, Prologis',
        'International: European Logistics REITs',
        'Higher quality, diversified properties'
      ],
      highlight: 'Best for: Commercial real estate diversification'
    }
  ];

  const markets = {
    singapore: [
      {
        id: 'balanced-sg',
        name: 'Balanced Funds',
        emoji: '⚖️',
        historical: '5-6%',
        description: 'Lion Global Balanced Fund, NTUC Income Balanced - mix of SG stocks & bonds',
        companies: 'SGX-listed funds',
        why: 'Simple diversification, auto-rebalancing'
      },
      {
        id: 'index-sg',
        name: 'Index ETFs',
        emoji: '📊',
        historical: '5-7%',
        description: 'STI ETF, Nikko AM STI ETF - track Straits Times Index',
        companies: 'STI constituents',
        why: 'Low cost, transparent, market exposure'
      },
      {
        id: 'dividend-sg',
        name: 'Dividend Growth',
        emoji: '💼',
        historical: '3-5%',
        description: 'DBS, OCBC, UOB (Banks) - consistent dividends',
        companies: 'DBS, OCBC, UOB',
        why: 'Income + growth, banking stability'
      },
      {
        id: 'reit-sg',
        name: 'Commercial REITs',
        emoji: '🏢',
        historical: '4-6%',
        description: 'Mapletree Industrial Trust, Frasers Logistics - industrial & logistics',
        companies: 'Mapletree, Frasers',
        why: 'Strong rental income, diversified assets'
      }
    ],
    usa: [
      {
        id: 'balanced-us',
        name: 'Balanced Funds',
        emoji: '⚖️',
        historical: '5-7%',
        description: 'Vanguard Balanced Index, Fidelity Balanced - 60/40 allocation',
        companies: 'Vanguard, Fidelity',
        why: 'Professional allocation, rebalancing'
      },
      {
        id: 'index-us',
        name: 'Index Funds',
        emoji: '📊',
        historical: '8-10%',
        description: 'S&P 500 ETF, Total Market Index - diversified US exposure',
        companies: 'S&P 500 constituents',
        why: 'Proven returns, diversified, liquid'
      },
      {
        id: 'dividend-us',
        name: 'Dividend Growth',
        emoji: '💼',
        historical: '3-5%',
        description: 'Dividend Aristocrats, Vanguard Dividend Growth - 25+ years increases',
        companies: 'J&J, P&G, Coca-Cola',
        why: 'Proven dividend safety, capital growth'
      },
      {
        id: 'reit-us',
        name: 'Commercial REITs',
        emoji: '🏢',
        historical: '4-6%',
        description: 'Digital Realty, Prologis - data centers & logistics',
        companies: 'Digital Realty, Prologis',
        why: 'Growth sectors, strong fundamentals'
      }
    ],
    international: [
      {
        id: 'balanced-intl',
        name: 'Global Balanced',
        emoji: '⚖️',
        historical: '5-7%',
        description: 'HSBC Global Multi-Asset - diversified globally',
        companies: 'Global fund',
        why: 'Global diversification, professional managed'
      },
      {
        id: 'index-intl',
        name: 'World Index ETFs',
        emoji: '📊',
        historical: '6-8%',
        description: 'MSCI World ETF, iShares MSCI EAFE - developed markets',
        companies: 'MSCI constituents',
        why: 'Geographic diversification, developed markets'
      },
      {
        id: 'dividend-intl',
        name: 'Dividend ETFs',
        emoji: '💼',
        historical: '3-5%',
        description: 'European Dividend ETFs - consistent payers',
        companies: 'European blue-chips',
        why: 'International income, currency diversification'
      },
      {
        id: 'reit-intl',
        name: 'European Logistics',
        emoji: '🏢',
        historical: '4-6%',
        description: 'European Logistics REITs - industrial focus',
        companies: 'European REITs',
        why: 'EU property exposure, growing sector'
      }
    ]
  };

  const allocations = {
    basic: {
      name: 'Moderate Starter',
      description: 'Conservative balanced approach',
      items: [
        { name: 'Balanced Funds', pct: 50, color: 'from-amber-600 to-amber-400' },
        { name: 'Index Funds (SG & US)', pct: 40, color: 'from-yellow-500 to-yellow-400' },
        { name: 'REITs', pct: 10, color: 'from-orange-500 to-orange-400' }
      ]
    },
    balanced: {
      name: 'Moderate Global',
      description: 'Diversified across continents',
      items: [
        { name: 'Balanced Funds', pct: 35, color: 'from-amber-600 to-amber-400' },
        { name: 'SG Index ETFs', pct: 15, color: 'from-yellow-600 to-yellow-500' },
        { name: 'US Index Funds (S&P 500)', pct: 25, color: 'from-orange-600 to-orange-500' },
        { name: 'World Index ETFs', pct: 15, color: 'from-yellow-500 to-yellow-400' },
        { name: 'Dividend & REITs', pct: 10, color: 'from-orange-500 to-orange-400' }
      ]
    }
  };

  const MarketCard = ({ market }) => (
    <div 
      className="cursor-pointer"
      onClick={() => setExpandedMarket(expandedMarket === market.id ? null : market.id)}
    >
      <Card className="h-full transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-amber-400 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-5xl block mb-3">{market.emoji}</span>
              <h3 className="text-lg font-bold text-gray-900">{market.name}</h3>
            </div>
            <ChevronDown 
              className={`w-5 h-5 text-gray-400 transition-transform ${
                expandedMarket === market.id ? 'rotate-180' : ''
              }`}
            />
          </div>

          <div className="mb-4 pb-4 border-b border-gray-200">
            <p className="text-xs text-gray-500 uppercase">Historical Return</p>
            <p className="text-xl font-bold text-amber-600">{market.historical}</p>
          </div>

          <p className="text-sm text-gray-700 line-clamp-2">{market.description}</p>

          <div className={`overflow-hidden transition-all duration-300 ${
            expandedMarket === market.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="pt-4 border-t border-gray-200 space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Overview</p>
                <p className="text-sm text-gray-700">{market.description}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Examples</p>
                <p className="text-sm text-gray-700">{market.companies}</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Why Choose</p>
                <p className="text-sm font-semibold text-amber-900">{market.why}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 via-amber-700 to-orange-800"></div>
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-overlay animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-white rounded-full mix-blend-overlay animate-pulse delay-500"></div>
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
                Balance growth with stability. Perfect for medium to long-term goals with a mix of local & international exposure.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-amber-600 hover:bg-amber-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Explore Options
                </Button>
              </div>
            </div>
            
            <div className="w-full lg:w-5/12 mt-12 lg:mt-0">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2 flex items-center text-white">
                    <BarChart3 className="w-6 h-6 text-yellow-300 mr-3" />
                    Key Characteristics
                  </h3>
                  <p className="text-amber-100 mb-6 text-lg">Medium Risk, Medium Returns (5-10%)</p>
                  
                  <ul className="space-y-3">
                    {[
                      'Growth + income balanced',
                      'Medium market volatility',
                      'Some inflation protection',
                      '5-10 year time horizon',
                      'Diversified asset mix'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center text-white text-sm">
                        <div className="w-2 h-2 rounded-full bg-yellow-300 mr-3"></div>
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

      {/* MARKET SECTION */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Recommended Investments</h2>
            <p className="text-gray-600 text-lg">Balanced options suitable for moderate investors</p>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900">
              <span>🇸🇬</span> Singapore
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {markets.singapore.map(market => <MarketCard key={market.id} market={market} />)}
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900">
              <span>🇺🇸</span> United States
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {markets.usa.map(market => <MarketCard key={market.id} market={market} />)}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900">
              <span>🌍</span> International
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {markets.international.map(market => <MarketCard key={market.id} market={market} />)}
            </div>
          </div>
        </div>
      </section>

      {/* INVESTMENT OPTIONS */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Investment Vehicles</h2>
            <p className="text-gray-600 text-lg">Click to explore</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {investmentOptions.map((option) => (
              <div
                key={option.id}
                className="cursor-pointer"
                onClick={() => setExpandedCard(expandedCard === option.id ? null : option.id)}
              >
                <Card className="h-full transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-amber-400">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="text-4xl mb-3 block">{option.icon}</span>
                        <h3 className="text-xl font-bold text-gray-900">{option.title}</h3>
                      </div>
                      <ChevronDown 
                        className={`w-6 h-6 text-gray-400 transition-transform ${
                          expandedCard === option.id ? 'rotate-180' : ''
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Return</p>
                        <p className="text-lg font-bold text-amber-600">{option.returns}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Time Horizon</p>
                        <p className="text-lg font-bold text-amber-600">{option.time}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm mb-3">{option.snippet}</p>

                    <div className={`overflow-hidden transition-all ${
                      expandedCard === option.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="pt-4 border-t border-gray-200 space-y-2">
                        {option.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-amber-500 font-bold">✓</span>
                            <p className="text-sm text-gray-700">{detail}</p>
                          </div>
                        ))}
                        <div className="mt-4 p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                          <p className="text-sm font-semibold text-amber-900">{option.highlight}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALLOCATION */}
      <section className="py-20 px-4 bg-amber-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-4">Build Your Portfolio</h2>
          <p className="text-center text-gray-600 mb-12">Choose your allocation strategy</p>

          <div className="flex gap-4 justify-center mb-12 flex-wrap">
            {Object.entries(allocations).map(([key, data]) => (
              <Button
                key={key}
                onClick={() => setActiveAllocation(key)}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  activeAllocation === key
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-300'
                }`}
              >
                {data.name}
              </Button>
            ))}
          </div>

          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-2">{allocations[activeAllocation].name}</h3>
              <p className="text-gray-600 mb-6">{allocations[activeAllocation].description}</p>

              <div className="space-y-4">
                {allocations[activeAllocation].items.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <span className="font-bold text-gray-900">{item.pct}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-3 rounded-full bg-gradient-to-r ${item.color}`}
                        style={{ width: `${item.pct}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <p className="text-sm text-green-900">
                  <span className="font-bold">Expected Annual Return: </span>
                  5-7%
                </p>
                <p className="text-xs text-green-700 mt-1">*Past performance not indicative of future results</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Get personalized recommendations based on your goals.
          </p>
          <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100 font-semibold">
            Take Risk Assessment
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ModeratePage;