import { formatDistanceToNow } from 'date-fns';
import type { Transaction } from '../types/wallet';

export function formatAddress(address: string): string {
  if (!address || typeof address !== 'string') return 'Unknown';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatTimestamp(timestamp: string | number | undefined): string {
  if (!timestamp) return 'Unknown date';
  
  try {
    const date = typeof timestamp === 'string' 
      ? new Date(timestamp) 
      : new Date(timestamp * 1000);
    
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error('Error formatting timestamp:', error);
    return 'Invalid date';
  }
}

export function formatValue(value: number): string {
  try {
    if (isNaN(value)) return '0';
    if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(2)}K`;
    return value.toFixed(2);
  } catch (error) {
    console.error('Error formatting value:', error);
    return '0';
  }
}

export function getTransactionType(tx: Transaction, userAddress: string): {
  type: 'sent' | 'received' | 'contract';
  label: string;
  color: string;
} {
  try {
    if (!tx || !userAddress) {
      return {
        type: 'contract',
        label: 'Unknown',
        color: 'bg-gray-500/20 text-gray-400'
      };
    }

    const from = (tx.from || '').toLowerCase();
    const to = (tx.to || '').toLowerCase();
    const user = userAddress.toLowerCase();

    if (from === user && to === user) {
      return {
        type: 'contract',
        label: 'Self',
        color: 'bg-purple-500/20 text-purple-400'
      };
    }
    if (from === user) {
      return {
        type: 'sent',
        label: 'Sent',
        color: 'bg-red-500/20 text-red-400'
      };
    }
    return {
      type: 'received',
      label: 'Received',
      color: 'bg-green-500/20 text-green-400'
    };
  } catch (error) {
    console.error('Error determining transaction type:', error);
    return {
      type: 'contract',
      label: 'Unknown',
      color: 'bg-gray-500/20 text-gray-400'
    };
  }
}