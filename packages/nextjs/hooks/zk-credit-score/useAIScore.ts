import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { analyzeCreditScore, CreditScoreAnalysis } from '~~/services/openai';
import { WalletData } from '~~/types/wallet';

export function useAIScore(address: string, data: WalletData | null) {
  const [error, setError] = useState<string | null>(null);

  // @ts-ignore
  const { data: analysis, isLoading } = useQuery<CreditScoreAnalysis, Error>({
    queryKey: ['ai-score', address],
    queryFn: () => analyzeCreditScore(data!),
    enabled: !!data && !!address,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2,
    // @ts-ignore
    onSettled: (_data, error: Error | null) => {
      if (error) {
        setError(error.message || 'Failed to analyze score');
      }
    }
  });

  return {
    analysis,
    isLoading,
    error
  };
}