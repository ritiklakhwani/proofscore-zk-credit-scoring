import React from 'react';
import { Brain, TrendingUp, TrendingDown, Lightbulb } from 'lucide-react';
import ScoreGauge from './ScoreGauge';
import { CreditScoreAnalysis } from '~~/services/openai';

interface AIScoreAnalysisProps {
  analysis: CreditScoreAnalysis;
}

export default function AIScoreAnalysis({ analysis }: AIScoreAnalysisProps) {
  const { score, breakdown, factors, recommendations } = analysis;

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center mb-6">
          <Brain className="h-6 w-6 text-indigo-400 mr-2" />
          <h2 className="text-xl font-semibold text-gray-100">AI Credit Analysis</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
          <ScoreGauge score={score} />
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-200">Score Breakdown</h3>
            <div className="space-y-3">
              {Object.entries(breakdown).map(([factor, value]) => (
                <div key={factor} className="flex items-center justify-between">
                  <span className="text-gray-400 capitalize">
                    {factor.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-800 rounded-full mr-3">
                      <div
                        className="h-full rounded-full bg-indigo-500"
                        style={{ width: `${value / 850 * 100}%` }}
                      />
                    </div>
                    <span className="text-gray-300 w-12 text-right">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="flex items-center text-lg font-semibold text-gray-200 mb-4">
              <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
              Positive Factors
            </h3>
            <ul className="space-y-2">
              {factors.positive.map((factor, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-400 mt-2 mr-2" />
                  <span className="text-gray-300">{factor}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="flex items-center text-lg font-semibold text-gray-200 mb-4">
              <TrendingDown className="h-5 w-5 text-red-400 mr-2" />
              Areas for Improvement
            </h3>
            <ul className="space-y-2">
              {factors.negative.map((factor, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-400 mt-2 mr-2" />
                  <span className="text-gray-300">{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center mb-6">
          <Lightbulb className="h-6 w-6 text-yellow-400 mr-2" />
          <h2 className="text-xl font-semibold text-gray-100">AI Recommendations</h2>
        </div>
        <div className="grid gap-4">
          {recommendations.map((recommendation, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50"
            >
              <p className="text-gray-300">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}