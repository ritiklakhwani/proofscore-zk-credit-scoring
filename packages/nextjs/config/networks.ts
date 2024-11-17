import { Network } from '../types/network';

export const NETWORKS: Record<string, Network> = {
  BASE_SEPOLIA: {
    name: 'Base Sepolia',
    icon: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=035",
    explorer: 'https://base-sepolia.blockscout.com',
    color: 'from-blue-400 to-cyan-400',
    chainId: 84532,
    isTestnet: true,
    isActive: true
  },
  SEPOLIA: {
    name: 'Ethereum Sepolia',
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=035",
    explorer: 'https://eth-sepolia.blockscout.com',
    color: 'from-blue-500 to-purple-500',
    chainId: 11155111,
    isTestnet: true,
    isActive: true
  },
  FLOW_TESTNET: {
    name: 'Flow Testnet',
    icon: "https://assets.coingecko.com/coins/images/13446/small/5f6294c0c7a8cda55cb1c936_Flow_Wordmark.png",
    explorer: 'https://flow-testnet.blockscout.com',
    color: 'from-green-400 to-emerald-500',
    chainId: 1001,
    isTestnet: true,
    isActive: false
  },
  LINEA_SEPOLIA: {
    name: 'Linea Sepolia',
    icon: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=035",
    explorer: 'https://linea-sepolia.blockscout.com',
    color: 'from-green-500 to-teal-500',
    chainId: 59141,
    isTestnet: true,
    isActive: false
  },
  BITKUB_TESTNET: {
    name: 'Bitkub Testnet',
    icon: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=035",
    explorer: 'https://bitkub-testnet.blockscout.com',
    color: 'from-yellow-400 to-orange-400',
    chainId: 25925,
    isTestnet: true,
    isActive: false
  },
  ZIRCUIT_TESTNET: {
    name: 'Zircuit Testnet',
    icon: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=035",
    explorer: 'https://zircuit-testnet.blockscout.com',
    color: 'from-purple-400 to-pink-400',
    chainId: 48899,
    isTestnet: true,
    isActive: false
  }
} as const;