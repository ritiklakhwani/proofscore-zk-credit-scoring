import React from 'react';
import { Lightbulb, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';

export default function ImprovementSuggestions() {
  const suggestions = [
    {
      title: 'Increase DeFi Participation',
      description: 'Provide liquidity or stake tokens to improve your DeFi score.',
      link: 'https://app.uniswap.org',
      linkText: 'Explore Uniswap',
      difficulty: 'Medium',
      impact: '+50 points',
      timeframe: '2-4 weeks',
      steps: [
        'Research reputable DeFi protocols',
        'Start with small liquidity provisions',
        'Monitor and adjust positions regularly'
      ]
    },
    {
      title: 'Maintain Transaction Consistency',
      description: 'Keep a steady pattern of transactions to demonstrate reliable blockchain usage.',
      link: 'https://ethereum.org',
      linkText: 'Learn More',
      difficulty: 'Easy',
      impact: '+30 points',
      timeframe: '1-2 weeks',
      steps: [
        'Schedule regular transactions',
        'Use DeFi protocols consistently',
        'Maintain active wallet usage'
      ]
    },
    {
      title: 'Diversify Token Holdings',
      description: 'Add more variety to your token portfolio to show broader market participation.',
      link: 'https://www.coingecko.com',
      linkText: 'View Top Tokens',
      difficulty: 'Hard',
      impact: '+70 points',
      timeframe: '1-3 months',
      steps: [
        'Research potential tokens',
        'Create a balanced portfolio',
        'Monitor market conditions'
      ]
    },
  ];

  return (
    <div className="card p-6">
      <div className="flex items-center mb-6">
        <Sparkles className="h-6 w-6 text-yellow-400" />
        <h2 className="text-xl font-semibold text-gray-100 ml-2">Score Improvement Tips</h2>
      </div>
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="group relative">
            <div className="p-6 border border-gray-800 rounded-lg bg-gray-900/50 hover:bg-gray-800/50 transition-all duration-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-200 mb-2">{suggestion.title}</h3>
                  <p className="text-gray-400 text-sm">{suggestion.description}</p>
                </div>
                <span className="text-green-400 font-semibold">{suggestion.impact}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    suggestion.difficulty === 'Easy' ? 'bg-green-900/50 text-green-400' :
                    suggestion.difficulty === 'Medium' ? 'bg-yellow-900/50 text-yellow-400' :
                    'bg-red-900/50 text-red-400'
                  }`}>
                    {suggestion.difficulty} Difficulty
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">
                    Timeframe: {suggestion.timeframe}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {suggestion.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-center space-x-2 text-sm text-gray-400">
                    <ArrowRight className="h-4 w-4 text-indigo-400" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              <a
                href={suggestion.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
              >
                {suggestion.linkText}
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}