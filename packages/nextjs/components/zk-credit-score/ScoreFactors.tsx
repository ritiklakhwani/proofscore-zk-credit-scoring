import React from 'react';
import { CheckCircle, AlertCircle, Info, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function ScoreFactors() {
  const factors = [
    {
      title: 'Transaction History',
      status: 'positive',
      description: 'Regular transaction activity shows consistent usage',
      impact: 'High Impact',
      trend: 'up',
      details: '125 transactions in the last 30 days',
      recommendation: 'Maintain current activity level'
    },
    {
      title: 'Token Diversity',
      status: 'positive',
      description: 'Well-diversified portfolio across multiple tokens',
      impact: 'Medium Impact',
      trend: 'up',
      details: '15 different tokens held',
      recommendation: 'Consider exploring DeFi tokens'
    },
    {
      title: 'DeFi Interaction',
      status: 'negative',
      description: 'Limited interaction with DeFi protocols',
      impact: 'High Impact',
      trend: 'down',
      details: 'Only 2 DeFi protocols used',
      recommendation: 'Explore lending and staking platforms'
    },
    {
      title: 'Wallet Age',
      status: 'positive',
      description: 'Account shows long-term blockchain usage',
      impact: 'Medium Impact',
      trend: 'neutral',
      details: '258 days old',
      recommendation: 'Continue regular wallet activity'
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-400" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="card p-6">
      <div className="flex items-center mb-6">
        <Info className="h-6 w-6 text-indigo-400" />
        <h2 className="text-xl font-semibold text-gray-100 ml-2">Score Factors</h2>
      </div>
      <div className="space-y-4">
        {factors.map((factor, index) => (
          <div key={index} className="group">
            <div className="p-4 border border-gray-800 rounded-lg bg-gray-900/50 hover:bg-gray-800/50 transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {factor.status === 'positive' ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-200 mb-1">{factor.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{factor.description}</p>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-500">{factor.details}</span>
                      {getTrendIcon(factor.trend)}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    factor.impact === 'High Impact' 
                      ? 'bg-indigo-900/50 text-indigo-300' 
                      : 'bg-gray-800 text-gray-300'
                  }`}>
                    {factor.impact}
                  </span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-800">
                <p className="text-sm text-gray-400">
                  <span className="text-gray-500">Recommendation:</span> {factor.recommendation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}