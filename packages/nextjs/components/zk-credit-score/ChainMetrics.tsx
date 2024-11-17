import React from 'react';
import { Activity, ArrowRightLeft, Coins, Clock } from 'lucide-react';

interface ChainMetricsProps {
  metrics?: {
    transactionCount: number;
    uniqueContacts: number;
    uniqueTokenCount: number;
    accountAge: string;
    avgTransactionValue: number;
    gasUsed: number;
  };
}

export default function ChainMetrics({ metrics }: ChainMetricsProps) {
  if (!metrics) return null;

  const items = [
    {
      icon: <Activity className="h-5 w-5 text-blue-400" />,
      label: 'Transactions',
      value: metrics.transactionCount.toString(),
      subValue: 'Total Count'
    },
    {
      icon: <ArrowRightLeft className="h-5 w-5 text-green-400" />,
      label: 'Unique Contacts',
      value: metrics.uniqueContacts.toString(),
      subValue: 'Addresses'
    },
    {
      icon: <Coins className="h-5 w-5 text-purple-400" />,
      label: 'Token Types',
      value: metrics.uniqueTokenCount.toString(),
      subValue: 'Different Tokens'
    },
    {
      icon: <Clock className="h-5 w-5 text-indigo-400" />,
      label: 'Account Age',
      value: metrics.accountAge,
      subValue: 'Active Period'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <div key={index} className="stat-card">
          <div className="flex items-center justify-center mb-2">
            {item.icon}
          </div>
          <h4 className="text-sm font-medium text-gray-400">{item.label}</h4>
          <p className="text-xl font-bold text-gray-100">{item.value}</p>
          <p className="text-xs text-gray-500">{item.subValue}</p>
        </div>
      ))}
    </div>
  );
}