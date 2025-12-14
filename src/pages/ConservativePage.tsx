import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import { Shield, TrendingUp, DollarSign, ChevronDown } from 'lucide-react';

const ConservativePage = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [expandedMarket, setExpandedMarket] = useState(null);
  const [activeAllocation, setActiveAllocation] = useState('basic');

  const investmentOptions = [
    {
      id: 'govt-bonds',
      title: 'Government Securities',
      icon: '📜',
      returns: '2-4%',
      time: '2-10 years',
      snippet: 'Safe bonds backed by government guarantees',
      details: [
        'Singapore Savings Bonds (SSB), T-Bills',
        'US Treasury Bonds, TIPS',
        'Japanese Government Bonds (JGBs)',
        'German Bunds'
      ],
      highlight: 'Best for: Capital preservation focus'
    },
    {
      id: 'savings-deposits',
      title: 'Savings & Fixed Deposits',
      icon: '🏦',
      returns: '2-3.5%',
      time: '6-24 months',
      snippet: 'Insured deposits with guaranteed returns',
      details: [
        'Fixed Deposits (DBS, OCBC, UOB)',
        'CPF OA',
        'High-Yield Savings Accounts',
        'CDs (US)'
      ],
      highlight: 'Best for: Emergency funds, liquidity'
    },
    {
      id: 'dividend-blue',
      title: 'Dividend Blue-Chips',
      icon: '💼',
      returns: '3-5%',
      time: 'Ongoing',
      snippet: 'Established companies with steady payouts',
      details: [
        'Singapore: Singtel, SATS, ComfortDelGro',
        'USA: Johnson & Johnson, Procter & Gamble, Coca-Cola',
        'International: Nestlé, Unilever'
      ],
      highlight: 'Best for: Steady income generation'
    },
    {
      id: 'stable-reits',
      title: 'Stable REITs',
      icon: '🏢',
      returns: '4-6%',
      time: 'Ongoing',
      snippet: 'Real estate with consistent dividends',
      details: [
        'Singapore: CapitaLand, Ascendas, Parkway Life REIT',
        'USA: Realty Income, National Retail Properties',
        'International: Link REIT (HK)'
      ],
      highlight: 'Best for: Monthly/quarterly income'
    }
  ];

  const markets = {
    singapore: [
      {
        id: 'govt-sg',
        name: 'Government Securities',
        emoji: '📜',
        historical: '2-3%',
        description: 'Singapore Savings Bonds (SSB), T-Bills, SGS Bonds - backed by Singapore government',
        companies: 'MAS, Singapore Government',
        why: 'Safest option, no default risk, capital preservation'
      },
      {
        id: 'savings-sg',
        name: 'Fixed Deposits',
        emoji: '🏦',
        historical: '2.5-3%',
        description: 'Fixed Deposits from DBS, OCBC, UOB, and CPF OA',
        companies: 'DBS, OCBC, UOB',
        why: 'Insured deposits, guaranteed returns, no risk'
      },
      {
        id: 'dividend-sg',
        name: 'Dividend Blue-Chips',
        emoji: '💼',
        historical: '3-5%',
        description: 'Established dividend-paying companies: Singtel, SATS, ComfortDelGro',
        companies: 'Singtel, SATS, ComfortDelGro',
        why: 'Stable income, lower volatility, dividend yield'
      },
      {
        id: 'reit-sg',
        name: 'Stable REITs',
        emoji: '🏢',
        historical: '4-6%',
        description: 'Real estate trusts: CapitaLand, Ascendas, Parkway Life REIT',
        companies: 'CapitaLand, Ascendas, Parkway Life REIT',
        why: 'Monthly/quarterly income, real estate exposure'
      }
    ],
    usa: [
      {
        id: 'govt-us',
        name: 'Government Bonds',
        emoji: '📜',
        historical: '3-4%',
        description: 'US Treasury Bonds, TIPS, Municipal Bonds - backed by US government',
        companies: 'US Treasury, Federal Government',
        why: 'Safest bonds globally, inflation protection (TIPS)'
      },
      {
        id: 'savings-us',
        name: 'High-Yield Savings',
        emoji: '🏦',
        historical: '4-5%',
        description: 'High-Yield Savings Accounts, CDs',
        companies: 'US Banks',
        why: 'FDIC insured up to $250k, competitive rates'
      },
      {
        id: 'dividend-us',
        name: 'Dividend Blue-Chips',
        emoji: '💼',
        historical: '2-4%',
        description: 'Stable blue-chips: Johnson & Johnson, Procter & Gamble, Coca-Cola',
        companies: 'Johnson & Johnson, Procter & Gamble, Coca-Cola',
        why: 'Proven track record, dividend stability, lower volatility'
      },
      {
        id: 'reit-us',
        name: 'Stable REITs',
        emoji: '🏢',
        historical: '4-5%',
        description: 'Conservative REITs: Realty Income, National Retail Properties',
        companies: 'Realty Income, National Retail Properties',
        why: 'Monthly distributions, real estate diversification'
      }
    ],
    international: [
      {
        id: 'govt-intl',
        name: 'Government Bonds',
        emoji: '📜',
        historical: '2-4%',
        description: 'Japanese Government Bonds (JGBs), German Bunds',
        companies: 'Japanese & German Governments',
        why: 'Safe developed market exposure, currency diversification'
      },
      {
        id: 'savings-intl',
        name: 'International Bonds',
        emoji: '🏦',
        historical: '2-3%',
        description: 'UK Gilts, Australian Bonds',
        companies: 'UK & Australian Governments',
        why: 'Developed market safety, yield in local currencies'
      },
      {
        id: 'dividend-intl',
        name: 'Dividend Blue-Chips',
        emoji: '💼',
        historical: '3-4%',
        description: 'Stable global companies: Nestlé, Unilever',
        companies: 'Nestlé, Unilever',
        why: 'Multinational stability, international diversification'
      },
      {
        id: 'reit-intl',
        name: 'Stable REITs',
        emoji: '🏢',
        historical: '4-5%',
        description: 'Conservative REIT: Link REIT (Hong Kong)',
        companies: 'Link REIT',
        why: 'Asian real estate exposure, stable dividends'
      }
    ]
  };

  const allocations = {
    basic: {
      name: 'Conservative Starter',
      description: 'For first-time investors',
      items: [
        { name: 'Government Securities & Deposits', pct: 50, color: 'from-blue-600 to-blue-400' },
        { name: 'Dividend Blue-Chips', pct: 30, color: 'from-indigo-500 to-indigo-400' },
        { name: 'Stable REITs', pct: 20, color: 'from-cyan-500 to-cyan-400' }
      ]
    },
    global: {
      name: 'Conservative Global',
      description: 'For experienced investors',
      items: [
        { name: 'Government Securities & Deposits', pct: 40, color: 'from-blue-600 to-blue-400' },
        { name: 'Dividend Blue-Chips (SG & US)', pct: 30, color: 'from-indigo-500 to-indigo-400' },
        { name: 'Intl Bonds & Blue-Chips', pct: 15, color: 'from-purple-500 to-purple-400' },
        { name: 'Stable REITs', pct: 15, color: 'from-cyan-500 to-cyan-400' }
      ]
    }
  };

  const MarketCard = ({ market }) => (
    <div 
      className="cursor-pointer"
      onClick={() => setExpandedMarket(expandedMarket === market.id ? null : market.id)}
    >
      <Card className="h-full transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-blue-400 overflow-hidden">
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
            <p className="text-xl font-bold text-blue-600">{market.historical}</p>
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
              <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Why Choose</p>
                <p className="text-sm font-semibold text-blue-900">{market.why}</p>
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800"></div>
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-overlay animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-white rounded-full mix-blend-overlay animate-pulse delay-500"></div>
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
                Prioritize capital preservation and steady income with our carefully curated conservative investment strategies.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Explore Options
                </Button>
              </div>
            </div>
            
            <div className="w-full lg:w-5/12 mt-12 lg:mt-0">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2 flex items-center text-white">
                    <Shield className="w-6 h-6 text-yellow-300 mr-3" />
                    Key Characteristics
                  </h3>
                  <p className="text-blue-100 mb-6 text-lg">Low Risk, Low Returns (1-5%)</p>
                  
                  <ul className="space-y-3">
                    {[
                      'Capital preservation focused',
                      'Regular income generation',
                      'Lower volatility and risk',
                      'May not keep pace with inflation',
                      'Typically shorter time horizons'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center text-white text-sm">
                        <div className="w-2 h-2 rounded-full bg-yellow-300 mr-3"></div>
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

      {/* MARKET SECTION */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Recommended Investments</h2>
            <p className="text-gray-600 text-lg">Safe options suitable for conservative investors</p>
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
                <Card className="h-full transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-blue-400">
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
                        <p className="text-lg font-bold text-blue-600">{option.returns}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Time Horizon</p>
                        <p className="text-lg font-bold text-blue-600">{option.time}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm mb-3">{option.snippet}</p>

                    <div className={`overflow-hidden transition-all ${
                      expandedCard === option.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="pt-4 border-t border-gray-200 space-y-2">
                        {option.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-blue-500 font-bold">✓</span>
                            <p className="text-sm text-gray-700">{detail}</p>
                          </div>
                        ))}
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                          <p className="text-sm font-semibold text-blue-900">{option.highlight}</p>
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
      <section className="py-20 px-4 bg-blue-50">
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
                    ? 'bg-blue-600 text-white shadow-lg'
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
                  {activeAllocation === 'basic' ? '3-4%' : '4-5%'}
                </p>
                <p className="text-xs text-green-700 mt-1">*Past performance not indicative of future results</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Find out which strategy matches your goals and risk tolerance.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
            Take Risk Assessment
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ConservativePage;