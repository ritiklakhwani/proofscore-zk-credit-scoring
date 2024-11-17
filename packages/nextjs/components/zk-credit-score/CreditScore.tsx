import React from 'react';
import { CircleDollarSign, TrendingUp, Activity, History, Wallet, ExternalLink, ChevronRight } from 'lucide-react';
import ScoreGauge from './ScoreGauge';
import { formatEther } from 'viem';
import { Link } from 'react-router-dom';
import { useWalletData } from '~~/hooks/zk-credit-score/useWalletData';
import { NETWORKS } from '~~/config/networks';

interface CreditScoreProps {
  address: string;
}

export default function CreditScore({ address }: CreditScoreProps) {
  const { data, isLoading, error } = useWalletData(address);

  if (error) {
    return (
      <div className="card p-8 text-center">
        <p className="text-red-400">Error loading wallet data: {error}</p>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="card p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
        <p className="text-gray-400 mt-4">Loading wallet data...</p>
      </div>
    );
  }

  const score = Math.min(850, Math.floor(
    (data.combinedMetrics.transactionCount * 0.3) +
    (data.combinedMetrics.uniqueContacts * 0.2) +
    (data.combinedMetrics.uniqueTokenCount * 0.2) +
    (data.combinedMetrics.totalValue * 0.3)
  ));

  return (
    <div className="card p-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="p-2 rounded-lg bg-indigo-500/10 mr-3">
            <Wallet className="h-6 w-6 text-indigo-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Ethereum Address</p>
            <a
              href={`${NETWORKS.SEPOLIA.explorer}/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-indigo-400 transition-colors duration-200 flex items-center"
            >
              {`${address.slice(0, 6)}...${address.slice(-4)}`}
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </div>
        </div>
        <Link
          to={`/report/${address}`}
          className="btn-secondary"
        >
          View Detailed Report
          <ChevronRight className="h-4 w-4 ml-2" />
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
        <ScoreGauge score={score} />
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-100">Credit Analysis</h3>
          <p className="text-gray-400 leading-relaxed">
            Your on-chain credit score is calculated based on various factors including transaction history,
            token diversity, and network activity across multiple chains. Your current score indicates
            {score >= 750 ? ' excellent' : score >= 650 ? ' good' : ' fair'} creditworthiness.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <CircleDollarSign className="h-6 w-6 text-green-400 mb-2" />
          <h4 className="text-sm font-medium text-gray-400">Total Balance</h4>
          <p className="text-xl font-bold text-gray-100">
            {formatEther(BigInt(Math.floor(data.combinedMetrics.balance * 1e18)))} ETH
          </p>
        </div>

        <div className="stat-card">
          <Activity className="h-6 w-6 text-blue-400 mb-2" />
          <h4 className="text-sm font-medium text-gray-400">Transactions</h4>
          <p className="text-xl font-bold text-gray-100">
            {data.combinedMetrics.transactionCount}
          </p>
        </div>

        <div className="stat-card">
          <TrendingUp className="h-6 w-6 text-purple-400 mb-2" />
          <h4 className="text-sm font-medium text-gray-400">Network Size</h4>
          <p className="text-xl font-bold text-gray-100">
            {data.combinedMetrics.uniqueContacts}
          </p>
        </div>

        <div className="stat-card">
          <History className="h-6 w-6 text-indigo-400 mb-2" />
          <h4 className="text-sm font-medium text-gray-400">Account Age</h4>
          <p className="text-xl font-bold text-gray-100">
            {data.combinedMetrics.accountAge}
          </p>
        </div>
      </div>
    </div>
  );
}