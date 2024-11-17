import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import type { Transaction, TokenTransfer, WalletMetrics } from '../types/wallet';
import { NETWORKS } from '../config/networks';

const BLOCKSCOUT_URLS = {
  SEPOLIA: NETWORKS.SEPOLIA.explorer,
  BASE_SEPOLIA: NETWORKS.BASE_SEPOLIA.explorer
};

export async function getWalletData(address: string, chain: 'SEPOLIA' | 'BASE_SEPOLIA') {
  const baseUrl = BLOCKSCOUT_URLS[chain];

  try {
    // get address info including balance
    const balanceResponse = await axios.get(`${baseUrl}/api/v2/addresses/${address}`);

    // get normal transactions
    const txResponse = await axios.get(`${baseUrl}/api/v2/addresses/${address}/transactions`, {
      params: {
        filter: 'to,from', // Get both incoming and outgoing
        limit: 50
      }
    });

    // get token transfers
    const tokenTxResponse = await axios.get(`${baseUrl}/api/v2/addresses/${address}/token-transfers`, {
      params: {
        limit: 50
      }
    });

    // transform the data to match our expected format
    const transactions: Transaction[] = (txResponse.data.items || []).map((tx: any) => ({
      hash: tx.hash,
      from: tx.from.hash,
      to: tx.to?.hash || '',
      value: tx.value,
      timestamp: tx.timestamp,
      isError: tx.status === 'ok' ? '0' : '1',
      gasUsed: tx.gas_used || '0'
    }));

    const tokenTransfers: TokenTransfer[] = (tokenTxResponse.data.items || []).map((tx: any) => ({
      hash: tx.tx_hash,
      from: tx.from.hash,
      to: tx.to.hash,
      value: tx.total.value,
      tokenName: tx.token.name,
      tokenSymbol: tx.token.symbol,
      contractAddress: tx.token.address,
      timestamp: tx.timestamp
    }));

    return {
      balance: balanceResponse.data.coin_balance || '0',
      transactions,
      tokenTransfers
    };
  } catch (error) {
    console.error(`Error fetching ${chain} data:`, error);
    return {
      balance: '0',
      transactions: [],
      tokenTransfers: []
    };
  }
}

export function calculateWalletMetrics(data: {
  balance: string;
  transactions: Transaction[];
  tokenTransfers: TokenTransfer[];
}): WalletMetrics {
  try {
    const { balance, transactions, tokenTransfers } = data;

    // ensure arrays exist
    const safeTransactions = Array.isArray(transactions) ? transactions : [];
    const safeTokenTransfers = Array.isArray(tokenTransfers) ? tokenTransfers : [];

    // calculate transaction metrics
    const successfulTxs = safeTransactions.filter(tx => tx.isError === '0');
    const uniqueAddresses = new Set([
      ...safeTransactions.map(tx => tx.to),
      ...safeTokenTransfers.map(tx => tx.to)
    ].filter(Boolean)); // Remove empty addresses

    // calculate token metrics
    const uniqueTokens = new Set(safeTokenTransfers.map(tx => tx.tokenSymbol));
    
    // calculate time-based metrics
    const allTransactions = [...safeTransactions, ...safeTokenTransfers];
    const oldestTx = allTransactions.length > 0
      ? allTransactions.sort((a, b) => {
          const timeA = new Date(a.timestamp || 0).getTime();
          const timeB = new Date(b.timestamp || 0).getTime();
          return timeA - timeB;
        })[0]
      : null;
    
    const accountAge = oldestTx?.timestamp
      ? formatDistanceToNow(new Date(oldestTx.timestamp))
      : 'New Account';

    // calculate value metrics with safety checks
    const totalValue = successfulTxs.reduce((sum, tx) => {
      const value = parseFloat(tx.value);
      return sum + (isNaN(value) ? 0 : value / 1e18);
    }, 0);

    const avgTxValue = successfulTxs.length > 0 ? totalValue / successfulTxs.length : 0;

    // calculate gas with safety check
    const gasUsed = successfulTxs.reduce((sum, tx) => {
      const gas = parseInt(tx.gasUsed);
      return sum + (isNaN(gas) ? 0 : gas);
    }, 0);

    return {
      balance: parseFloat(balance) / 1e18 || 0,
      transactionCount: successfulTxs.length,
      uniqueContacts: uniqueAddresses.size,
      uniqueTokenCount: uniqueTokens.size,
      accountAge,
      totalValue,
      avgTransactionValue: avgTxValue,
      gasUsed
    };
  } catch (error) {
    console.error('Error calculating metrics:', error);
    return {
      balance: 0,
      transactionCount: 0,
      uniqueContacts: 0,
      uniqueTokenCount: 0,
      accountAge: 'New Account',
      totalValue: 0,
      avgTransactionValue: 0,
      gasUsed: 0
    };
  }
}