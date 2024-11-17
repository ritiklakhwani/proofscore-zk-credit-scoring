import React from 'react';
import { ExternalLink } from 'lucide-react';
import { NETWORKS } from '~~/config/networks';
import { formatAddress } from '~~/utils/format';

interface ChainHeaderProps {
  chainKey: keyof typeof NETWORKS;
  address: string;
}

export default function ChainHeader({ chainKey, address }: ChainHeaderProps) {
  const network = NETWORKS[chainKey];

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <img src={network.icon} alt={network.name} className="h-8 w-8 mr-3" />
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
          </a>
        </div>
      </div>
    </div>
  );
}