import React from 'react';
import { ArrowRightLeft } from 'lucide-react';
import TransactionItem from './TransactionItem';
import { Transaction } from '~~/types/wallet';

interface TransactionListProps {
  transactions: Transaction[] | null;
  address: string;
  explorerUrl: string;
}

export default function TransactionList({ transactions, address, explorerUrl }: TransactionListProps) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="card p-6">
        <div className="flex items-center mb-4">
          <ArrowRightLeft className="h-5 w-5 text-blue-400 mr-2" />
          <h3 className="text-lg font-semibold text-gray-200">Recent Transactions</h3>
        </div>
        <p className="text-gray-400 text-sm">No transactions found</p>
      </div>
    );
  }

  const validTransactions = transactions.filter(tx => tx && tx.hash);

  return (
    <div className="card p-6">
      <div className="flex items-center mb-4">
        <ArrowRightLeft className="h-5 w-5 text-blue-400 mr-2" />
        <h3 className="text-lg font-semibold text-gray-200">Recent Transactions</h3>
      </div>
      <div className="space-y-3">
        {validTransactions.slice(0, 10).map((tx) => (
          <TransactionItem
            key={tx.hash}
            tx={tx}
            userAddress={address}
            explorerUrl={explorerUrl}
          />
        ))}
      </div>
    </div>
  );
}