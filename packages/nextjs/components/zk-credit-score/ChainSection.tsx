import React from 'react';
import { Lock, ExternalLink } from 'lucide-react';

import ChainMetrics from './ChainMetrics';
import TokenList from './TokenList';
import TransactionList from './TransactionList';
import BlockscoutLogo from './BlockscoutLogo';
import { Network } from '~~/types/network';
import { formatAddress } from '~~/utils/format';

interface ChainSectionProps {
  network: Network;
  address: string;
  data?: {
    raw: {
      transactions: any[];
      tokenTransfers: any[];
    };
    metrics: any;
  };
}

export default function ChainSection({ network, address, data }: ChainSectionProps) {
  const isLocked = !network.isActive;

  return (
    <div className={`card p-6 ${isLocked ? 'opacity-75' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <img src={network.icon} alt={network.name} className="h-8 w-8" />
          <div>
            <h2 className="text-xl font-bold text-gray-100">{network.name}</h2>
            <a
              href={`${network.explorer}/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-indigo-400 transition-colors flex items-center"
            >
              {formatAddress(address)}
              <ExternalLink className="h-4 w-4 ml-1" />
              <BlockscoutLogo />
            </a>
          </div>
        </div>
        {network.isTestnet && (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400">
            Testnet
          </span>
        )}
      </div>

      {isLocked ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <Lock className="h-12 w-12 mb-4" />
          <p className="text-lg font-medium mb-2">Chain Data Not Available</p>
          <p className="text-sm text-center max-w-md">
            Support for {network.name} is coming soon. Check back later for on-chain activity analysis.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <ChainMetrics metrics={data?.metrics} />
          <div className="grid lg:grid-cols-2 gap-6">
            <TokenList 
              tokens={data?.raw?.tokenTransfers || null}
              explorerUrl={network.explorer}
            />
            <TransactionList
              transactions={data?.raw?.transactions || []}
              address={address}
              explorerUrl={network.explorer}
            />
          </div>
        </div>
      )}
    </div>
  );
}