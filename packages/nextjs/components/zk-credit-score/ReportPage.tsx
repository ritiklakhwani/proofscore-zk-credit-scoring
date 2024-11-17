import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DetailedReport from '~~/components/zk-credit-score/DetailedReport';
import ReportSidebar from '~~/components/zk-credit-score/ReportSidebar';
import { useWalletData } from '~~/hooks/zk-credit-score/useWalletData';

export default function ReportPage() {
  const { address } = useParams<{ address: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useWalletData(address || '');
  const [verificationTime, setVerificationTime] = useState(60);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (!address?.match(/^0x[a-fA-F0-9]{40}$/)) {
      navigate('/');
    }
  }, [address, navigate]);

  useEffect(() => {
    if (!isVerified && data) {
      const timer = setInterval(() => {
        setVerificationTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsVerified(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [data, isVerified]);

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

  return (
    <div className="flex min-h-screen relative">
      {/* Verification Status */}
      <div className="absolute top-4 right-4 z-10">
        {!isVerified ? (
          <div className="flex flex-col items-center bg-base-200 px-6 py-3 rounded-xl shadow-lg border border-primary">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent"></div>
              <span className="text-base-content font-semibold">ZK Verification Pending</span>
            </div>
            <span className="text-base-content/70 text-sm mt-1">{verificationTime}s remaining</span>
          </div>
        ) : (
          <div className="flex flex-col items-center bg-base-200 px-6 py-3 rounded-xl shadow-lg border border-success">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-base-content font-semibold">Verification Complete</span>
            </div>
            <span className="text-base-content/70 text-sm mt-1">Powered by VLayer</span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <ReportSidebar address={address} />
      <div className="flex-1 p-8">
        {isLoading || !data ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="text-base-content/70 mt-4">Loading report data...</p>
          </div>
        ) : (
          <DetailedReport 
            address={address} 
            data={data}
          />
        )}
      </div>
    </div>
  );
}