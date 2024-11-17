// eslint-disable-next-line @next/next/no-img-element
import React from 'react';
import AIScoreAnalysis from './AIScoreAnalysis';
import ChainSection from './ChainSection';
import { WalletData } from '~~/types/wallet';
import { useAIScore } from '~~/hooks/zk-credit-score/useAIScore';
import { NETWORKS } from '~~/config/networks';
import { CreditScoreAnalysis } from '~~/services/openai';

interface DetailedReportProps {
  address: string;
  data: WalletData;
}

function isValidAnalysis(analysis: any): analysis is CreditScoreAnalysis {
  return analysis &&
    typeof analysis === 'object' &&
    'score' in analysis &&
    'breakdown' in analysis &&
    'factors' in analysis &&
    'recommendations' in analysis;
}

export default function DetailedReport({ address, data }: DetailedReportProps) {
  const { analysis, isLoading: isAILoading, error: aiError } = useAIScore(address, data);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {isValidAnalysis(analysis) && <AIScoreAnalysis analysis={analysis} />}
      
      {isAILoading && (
        <div className="card p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Analyzing on-chain data with AI...</p>
        </div>
      )}

      {aiError && (
        <div className="card p-6 text-center text-red-400">
          Error analyzing score: {aiError}
        </div>
      )}

      <div className="space-y-6">
        {Object.entries(NETWORKS).map(([key, network]) => (
          <ChainSection
            key={key}
            network={network}
            address={address}
            data={
              key === 'SEPOLIA' 
                ? data.sepolia 
                : key === 'BASE_SEPOLIA' 
                  ? data.baseSepolia 
                  : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}