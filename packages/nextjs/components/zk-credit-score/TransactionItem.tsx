import React from 'react';
import { ArrowRightLeft, ChevronRight } from 'lucide-react';
import { formatEther } from 'viem';
import BlockscoutLogo from './BlockscoutLogo';
import { getTransactionType, formatTimestamp, formatAddress } from '~~/utils/format';
import { Transaction } from '~~/types/wallet';

interface TransactionItemProps {
  tx: Transaction;
  userAddress: string;
  explorerUrl: string;
}

export default function TransactionItem({ tx, userAddress, explorerUrl }: TransactionItemProps) {
  if (!tx || !userAddress) return null;

  const txType = getTransactionType(tx, userAddress);
  const value = tx.value ? formatEther(BigInt(tx.value)) : '0';
  const timestamp = tx.timestamp || tx.timeStamp;
  const toAddress = tx.to || '';
  const fromAddress = tx.from || '';

  return (
    <a
      href={`${explorerUrl}/tx/${tx.hash}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
    >
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-full ${txType.color}`}>
          <ArrowRightLeft className="h-4 w-4" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-300">{txType.label}</span>
            <span className="text-xs text-gray-500">
              {txType.type === 'sent' ? 'to' : 'from'}
            </span>
            <span className="text-sm text-gray-400">
              {formatAddress(txType.type === 'sent' ? toAddress : fromAddress)}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            {formatTimestamp(timestamp)}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-sm text-gray-300 mr-2">
          {value} ETH
        </span>
        <ChevronRight className="h-4 w-4 text-gray-500" />
        <BlockscoutLogo />
      </div>
    </a>
  );
}