import React from 'react';
import { BarChart3 } from 'lucide-react';
import AddressSearch from '~~/components/zk-credit-score/AddressSearch';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full filter blur-3xl"></div>
      <div className="relative space-y-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center mb-6">
            <BarChart3 className="h-12 w-12 text-indigo-400 animate-glow" />
          </div>
          <h1 className="text-5xl font-bold gradient-text mb-6">
            Your Web3 Credit Score
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Discover your on-chain creditworthiness with our advanced analytics engine.
            Get insights, recommendations, and improve your DeFi profile.
          </p>
        </div>

        <AddressSearch />
      </div>
    </div>
  );
}