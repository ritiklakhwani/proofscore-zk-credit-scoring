import React from 'react';
import { Shield, Network, ArrowLeftRight, X } from 'lucide-react';
import { NETWORKS } from '~~/config/networks';

interface ReportSidebarProps {
  address: string;
}

export default function ReportSidebar({ address }: ReportSidebarProps) {
  return (
    <div className="w-72 bg-gray-900/95 border-r border-gray-800 p-4">
      <div className="flex items-center mb-8">
        <Shield className="h-5 w-5 text-indigo-400 mr-2" />
        <h2 className="text-lg font-semibold text-gray-100">Chain Report</h2>
      </div>
      <div className="space-y-2">
        <div className="flex items-center mb-3">
          <Network className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-sm font-medium text-gray-400">Networks</span>
        </div>
        {Object.entries(NETWORKS).map(([chainKey, network]) => (
          <a
            key={chainKey}
            href={`${network.explorer}/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              w-full flex items-center p-3 rounded-lg transition-all duration-200
              ${network.isActive 
                ? 'bg-gradient-to-r ' + network.color + ' bg-opacity-10 border border-gray-700'
                : 'hover:bg-gray-800/50'
              }
            `}
          >
            <img src={network.icon} alt={network.name} className="h-6 w-6 mr-3" />
            <div className="flex-1">
              <p className={`font-medium ${network.isActive ? 'text-gray-100' : 'text-gray-400'}`}>
                {network.name}
              </p>
              {network.isTestnet && (
                <span className="text-xs text-yellow-400">Testnet</span>
              )}
            </div>
            {network.isActive && (
              <div className="h-2 w-2 rounded-full bg-indigo-400" />
            )}
          </a>
        ))}
      </div>
      <div className="mt-8">
        <div className="flex items-center mb-3">
          <ArrowLeftRight className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-sm font-medium text-gray-400">Quick Links</span>
        </div>
        <div className="space-y-2">
          {Object.entries(NETWORKS)
            .filter(([_, network]) => network.isActive)
            .map(([key, network]) => (
              <a
                key={key}
                href={`${network.explorer}/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
              >
                <img src={network.icon} alt={network.name} className="h-4 w-4 mr-2" />
                <span className="text-gray-300">View on {network.name}</span>
                <ArrowLeftRight className="h-4 w-4 text-gray-400 ml-2" />
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}