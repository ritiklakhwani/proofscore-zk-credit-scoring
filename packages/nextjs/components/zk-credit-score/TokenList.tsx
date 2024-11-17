import React from 'react';
import { Coins, ExternalLink } from 'lucide-react';
import BlockscoutLogo from './BlockscoutLogo';
import { TokenTransfer } from '~~/types/wallet';
import { formatValue } from '~~/utils/format';

interface TokenListProps {
  tokens: TokenTransfer[] | null;
  explorerUrl: string;
}

export default function TokenList({ tokens, explorerUrl }: TokenListProps) {
  if (!tokens || tokens.length === 0) {
    return (
      <div className="card p-6">
        <div className="flex items-center mb-4">
          <Coins className="h-5 w-5 text-purple-400 mr-2" />
          <h3 className="text-lg font-semibold text-gray-200">Token Activity</h3>
        </div>
        <p className="text-gray-400 text-sm">No token activity found</p>
      </div>
    );
  }

  const uniqueTokens = tokens.reduce((acc, token) => {
    const key = token.tokenSymbol;
    if (!acc[key]) {
      acc[key] = {
        symbol: token.tokenSymbol,
        name: token.tokenName,
        totalValue: 0,
        contractAddress: token.contractAddress
      };
    }
    const value = parseFloat(token.value);
    if (!isNaN(value)) {
      acc[key].totalValue += value / 1e18;
    }
    return acc;
  }, {} as Record<string, { 
    symbol: string; 
    name: string; 
    totalValue: number; 
    contractAddress: string; 
  }>);

  return (
    <div className="card p-6">
      <div className="flex items-center mb-4">
        <Coins className="h-5 w-5 text-purple-400 mr-2" />
        <h3 className="text-lg font-semibold text-gray-200">Token Activity</h3>
      </div>
      <div className="space-y-3">
        {Object.values(uniqueTokens).map((token, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
          >
            <div>
              <p className="text-gray-200 font-medium">{token.symbol}</p>
              <a
                href={`${explorerUrl}/token/${token.contractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-indigo-400 transition-colors flex items-center"
              >
                {token.name}
                <ExternalLink className="h-3 w-3 ml-1" />
                <BlockscoutLogo />
              </a>
            </div>
            <div className="text-right">
              <p className="text-gray-200">{formatValue(token.totalValue)}</p>
              <p className="text-xs text-gray-500">Total Volume</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}