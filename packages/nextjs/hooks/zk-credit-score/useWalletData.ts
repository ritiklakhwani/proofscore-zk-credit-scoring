import { useState, useEffect } from 'react';
import { calculateWalletMetrics, getWalletData } from '~~/services/etherscan';
import { WalletData } from '~~/types/wallet';

export function useWalletData(address: string | undefined) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<WalletData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!address) return;

      setIsLoading(true);
      setError(null);

      try {
        const [sepoliaData, baseSepoliaData] = await Promise.all([
          getWalletData(address, 'SEPOLIA'),
          getWalletData(address, 'BASE_SEPOLIA')
        ]);

        const sepoliaMetrics = calculateWalletMetrics(sepoliaData);
        const baseSepoliaMetrics = calculateWalletMetrics(baseSepoliaData);

        const combinedMetrics = {
          balance: sepoliaMetrics.balance + baseSepoliaMetrics.balance,
          transactionCount: sepoliaMetrics.transactionCount + baseSepoliaMetrics.transactionCount,
          uniqueContacts: sepoliaMetrics.uniqueContacts + baseSepoliaMetrics.uniqueContacts,
          uniqueTokenCount: sepoliaMetrics.uniqueTokenCount + baseSepoliaMetrics.uniqueTokenCount,
          accountAge: sepoliaMetrics.accountAge,
          totalValue: sepoliaMetrics.totalValue + baseSepoliaMetrics.totalValue,
          avgTransactionValue: (sepoliaMetrics.avgTransactionValue + baseSepoliaMetrics.avgTransactionValue) / 2,
          gasUsed: sepoliaMetrics.gasUsed + baseSepoliaMetrics.gasUsed
        };

        setData({
          sepolia: {
            raw: sepoliaData,
            metrics: sepoliaMetrics
          },
          baseSepolia: {
            raw: baseSepoliaData,
            metrics: baseSepoliaMetrics
          },
          combinedMetrics
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch wallet data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [address]);

  return { data, isLoading, error };
}