export interface WalletMetrics {
  balance: number;
  transactionCount: number;
  uniqueContacts: number;
  uniqueTokenCount: number;
  accountAge: string;
  totalValue: number;
  avgTransactionValue: number;
  gasUsed: number;
}

export interface TokenTransfer {
  hash: string;
  from: string;
  to: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  contractAddress: string;
  timeStamp?: string;
  timestamp?: string;
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timeStamp?: string;
  timestamp?: string;
  isError: string;
  gasUsed: string;
}

export interface ChainData {
  raw: {
    transactions: Transaction[];
    tokenTransfers: TokenTransfer[];
    balance: string;
  };
  metrics: WalletMetrics;
}

export interface WalletData {
  sepolia: ChainData;
  baseSepolia: ChainData;
  combinedMetrics: WalletMetrics;
}