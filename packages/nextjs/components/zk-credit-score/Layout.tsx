import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  
  return (
    <div className="min-h-screen bg-[#030014]">
      <main>{children}</main>
      <footer className="glass-effect border-t border-gray-800/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>© {new Date().getFullYear()} Zk Credit Score. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}