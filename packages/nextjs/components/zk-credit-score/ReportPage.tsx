import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DetailedReport from '~~/components/zk-credit-score/DetailedReport';
import ReportSidebar from '~~/components/zk-credit-score/ReportSidebar';
import { useWalletData } from '~~/hooks/zk-credit-score/useWalletData';


export default function ReportPage() {
  const { address } = useParams<{ address: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useWalletData(address || '');

  useEffect(() => {
    if (!address?.match(/^0x[a-fA-F0-9]{40}$/)) {
      navigate('/');
    }
  }, [address, navigate]);

  if (!address) {
    return null;
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
        <p className="text-gray-400 mt-4">Loading report data...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <ReportSidebar address={address} />
      <div className="flex-1 p-8">
        <DetailedReport 
          address={address} 
          data={data}
        />
      </div>
    </div>
  );
}