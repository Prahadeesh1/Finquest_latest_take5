import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import { Rocket, TrendingUp, DollarSign, ChevronDown } from 'lucide-react';
import { Link } from "react-router-dom";

const AggressivePage = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [expandedMarket, setExpandedMarket] = useState(null);
  const [activeAllocation, setActiveAllocation] = useState('growth');

  const investmentOptions = [
    {
      id: 'growth',
      title: 'Growth Stocks',
      icon: '📈',
      returns: '10-15%',
      time: '10+ years',
      snippet: 'High-growth companies, minimal dividends',
      details: [
        'Singapore: Sea Limited, Grab Holdings',
        'USA: Tesla, NVIDIA, Meta, Amazon',
        'International: Alibaba, ASML, Tencent',
        'Reinvest earnings for compounding'
      ],
      highlight: 'Best for: Core growth allocation (40-50%)'
    },
    {
      id: 'smallcap',
      title: 'Small-Cap & Tech',
      icon: '🚀',
      returns: '12-18%',
      time: '10+ years',
      snippet: 'Emerging companies with explosive potential',
      details: [
        'Singapore: Tech Startups',
        'USA: Russell 2000, ARK Innovation ETF',
        'International: China Tech ETFs',
        'Higher volatility, higher upside'
      ],
      highlight: 'Best for: High risk tolerance (15-25%)'
    },
    {
      id: 'emerging',
      title: 'Emerging Markets',
      icon: '🌏',
      returns: '8-15%',
      time: '10+ years',
      snippet: 'High-growth developing economies',
      details: [
        'Singapore: ASEAN ETFs',
        'USA: Emerging Markets ETF',
        'International: Brazil, India, Vietnam Funds',
        'Currency volatility creates opportunities'
      ],
      highlight: 'Best for: Long-term conviction plays (15-20%)'
    },
    {
      id: 'sector',
      title: 'Sector/Thematic ETFs',
      icon: '⚡',
      returns: '15-25%',
      time: '10+ years',
      snippet: 'Concentrated bets on future trends',
      details: [
        'Singapore: Fintech (Grab, Sea)',
        'USA: AI & Clean Energy ETFs',
        'International: Global Biotech, Crypto-linked',
        'Highest growth potential, highest volatility'
      ],
      highlight: 'Best for: Tactical positions (10-15%)'
    }
  ];

  const markets = {
    singapore: [
      {
        id: 'growth-sg',
        name: 'Growth Stocks',
        emoji: '📈',
        historical: '8-15%',
        description: 'Sea Limited, Grab Holdings - high-growth tech companies',
        companies: 'Sea Limited, Grab',
        why: 'Explosive growth potential, leading positions'
      },
      {
        id: 'smallcap-sg',
        name: 'Small-Cap Tech',
        emoji: '🚀',
        historical: '12-20%',
        description: 'Singapore Tech Startups - emerging opportunities',
        companies: 'Singapore Tech Ecosystem',
        why: 'Early-stage growth, innovative companies'
      },
      {
        id: 'emerging-sg',
        name: 'ASEAN ETFs',
        emoji: '🌏',
        historical: '8-12%',
        description: 'ASEAN regional exposure - growth in region',
        companies: 'ASEAN countries',
        why: 'Rapid economic growth, regional diversification'
      },
      {
        id: 'sector-sg',
        name: 'Fintech',
        emoji: '⚡',
        historical: '15-25%',
        description: 'Fintech leaders - Grab, Sea (payment services)',
        companies: 'Grab, Sea Digital',
        why: 'Disruptive potential, market-leading positions'
      }
    ],
    usa: [
      {
        id: 'growth-us',
        name: 'Growth Stocks',
        emoji: '📈',
        historical: '10-15%',
        description: 'Tesla, NVIDIA, Meta, Amazon - mega-cap growth leaders',
        companies: 'Tesla, NVIDIA, Meta, Amazon',
        why: 'Proven growth track record, market leaders'
      },
      {
        id: 'smallcap-us',
        name: 'Small-Cap & ARK',
        emoji: '🚀',
        historical: '12-18%',
        description: 'Russell 2000, ARK Innovation ETF - disruptive innovation',
        companies: 'Russell 2000, ARK funds',
        why: 'Extreme growth potential, innovation focus'
      },
      {
        id: 'emerging-us',
        name: 'Emerging Markets',
        emoji: '🌏',
        historical: '8-15%',
        description: 'Emerging Markets ETF - global developing markets',
        companies: 'EM constituents',
        why: 'High growth economies, demographic tailwinds'
      },
      {
        id: 'sector-us',
        name: 'AI & Clean Energy',
        emoji: '⚡',
        historical: '15-25%',
        description: 'AI & Clean Energy ETFs - future mega-trends',
        companies: 'Tech & Energy leaders',
        why: 'Fastest-growing sectors, transformative themes'
      }
    ],
    international: [
      {
        id: 'growth-intl',
        name: 'Growth Stocks',
        emoji: '📈',
        historical: '8-12%',
        description: 'Alibaba, ASML, Tencent - global tech giants',
        companies: 'Alibaba, ASML, Tencent',
        why: 'International growth leaders, innovation'
      },
      {
        id: 'smallcap-intl',
        name: 'China Tech ETFs',
        emoji: '🚀',
        historical: '12-20%',
        description: 'China Tech ETFs - cutting-edge Chinese companies',
        companies: 'Chinese tech companies',
        why: 'Rapid innovation, emerging market growth'
      },
      {
        id: 'emerging-intl',
        name: 'India, Vietnam',
        emoji: '🌏',
        historical: '10-18%',
        description: 'Brazil, India, Vietnam Funds - fastest-growing markets',
        companies: 'EM market leaders',
        why: 'Highest growth rates globally, demographic bonus'
      },
      {
        id: 'sector-intl',
        name: 'Global Biotech',
        emoji: '⚡',
        historical: '15-25%',
        description: 'Global Biotech, Crypto-linked ETFs - cutting-edge',
        companies: 'Biotech & innovation leaders',
        why: 'Scientific breakthroughs, transformative innovation'
      }
    ]
  };

  const allocations = {
    growth: {
      name: 'Pure Growth',
      description: 'Maximum capital appreciation',
      items: [
        { name: 'Growth Stocks (SG, US)', pct: 50, color: 'from-red-700 to-red-600' },
        { name: 'Small-Cap & Tech', pct: 20, color: 'from-red-600 to-red-500' },
        { name: 'Emerging Markets', pct: 20, color: 'from-red-500 to-red-400' },
        { name: 'Thematic/Sector ETFs', pct: 10, color: 'from-red-400 to-red-300' }
      ]
    },
    balanced: {
      name: 'Aggressive Diversified',
      description: 'Growth with some geographic hedging',
      items: [
        { name: 'Growth Stocks (US)', pct: 35, color: 'from-red-700 to-red-600' },
        { name: 'Growth Stocks (SG)', pct: 15, color: 'from-red-600 to-red-500' },
        { name: 'Small-Cap Tech', pct: 15, color: 'from-red-500 to-red-400' },
        { name: 'Emerging Markets', pct: 20, color: 'from-orange-600 to-orange-500' },
        { name: 'Sector ETFs', pct: 15, color: 'from-red-400 to-red-300' }
      ]
    }
  };

  const MarketCard = ({ market }) => (
    <div 
      className="cursor-pointer"
      onClick={() => setExpandedMarket(expandedMarket === market.id ? null : market.id)}
    >
      <Card className="h-full transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-red-400 overflow-hidden">
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
            <p className="text-xl font-bold text-red-600">{market.historical}</p>
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
              <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Why Choose</p>
                <p className="text-sm font-semibold text-red-900">{market.why}</p>
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
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-rose-700 to-pink-800"></div>
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-overlay animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-white rounded-full mix-blend-overlay animate-pulse delay-500"></div>
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
                Maximum growth for long-term investors. Embrace volatility for superior returns. 10+ year horizons essential.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Rocket className="w-5 h-5 mr-2" />
                  Explore Options
                </Button>
              </div>
            </div>
            
            <div className="w-full lg:w-5/12 mt-12 lg:mt-0">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2 flex items-center text-white">
                    <Rocket className="w-6 h-6 text-orange-300 mr-3" />
                    Key Characteristics
                  </h3>
                  <p className="text-red-100 mb-6 text-lg">High Risk, High Returns (10%+)</p>
                  
                  <ul className="space-y-3">
                    {[
                      'Maximum capital appreciation',
                      'High volatility (30-50% swings)',
                      'Strong inflation protection',
                      '10+ year time horizon required',
                      'Accept 50%+ drawdowns'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center text-white text-sm">
                        <div className="w-2 h-2 rounded-full bg-orange-300 mr-3"></div>
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

      {/* MARKET SECTION */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">High-Growth Investments</h2>
            <p className="text-gray-600 text-lg">For investors seeking maximum capital appreciation</p>
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
            <p className="text-gray-600 text-lg">Click to explore high-growth options</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {investmentOptions.map((option) => (
              <div
                key={option.id}
                className="cursor-pointer"
                onClick={() => setExpandedCard(expandedCard === option.id ? null : option.id)}
              >
                <Card className="h-full transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-red-400">
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
                        <p className="text-xs text-gray-500 uppercase">Potential Return</p>
                        <p className="text-lg font-bold text-red-600">{option.returns}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Time Horizon</p>
                        <p className="text-lg font-bold text-red-600">{option.time}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm mb-3">{option.snippet}</p>

                    <div className={`overflow-hidden transition-all ${
                      expandedCard === option.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="pt-4 border-t border-gray-200 space-y-2">
                        {option.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-red-500 font-bold">✓</span>
                            <p className="text-sm text-gray-700">{detail}</p>
                          </div>
                        ))}
                        <div className="mt-4 p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                          <p className="text-sm font-semibold text-red-900">{option.highlight}</p>
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
      <section className="py-20 px-4 bg-red-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-4">Build Your Portfolio</h2>
          <p className="text-center text-gray-600 mb-12">Choose your growth strategy</p>

          <div className="flex gap-4 justify-center mb-12 flex-wrap">
            {Object.entries(allocations).map(([key, data]) => (
              <Button
                key={key}
                onClick={() => setActiveAllocation(key)}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  activeAllocation === key
                    ? 'bg-red-600 text-white shadow-lg'
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
                  <span className="font-bold">Expected Long-Term Return (10+ years): </span>
                  10-15%
                </p>
                <p className="text-xs text-red-700 mt-2 font-semibold">
                  ⚠️ But expect 30-50% drawdowns during market corrections
                </p>
                <p className="text-xs text-green-700 mt-1">*Past performance not indicative of future results</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-rose-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Invest Aggressively?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            For 10+ year horizons with high risk tolerance only.
          </p>
          <Link to="/assessment">
          <Button
            size="lg"
            className="bg-white text-red-600 hover:bg-gray-100 font-semibold"
            >
            Take Risk Assessment
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AggressivePage;