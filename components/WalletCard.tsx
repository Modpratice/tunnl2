
import React from 'react';

interface WalletCardProps {
  title: string;
  domain: string;
  logo: string;
  onClick: () => void;
}

export const WalletCard: React.FC<WalletCardProps> = ({ title, domain, logo, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-[#111118] border border-white/5 rounded-2xl p-6 flex items-center gap-4 cursor-pointer hover:bg-white/[0.03] hover:border-white/10 transition-all group"
    >
      <div className="relative w-12 h-12 flex-shrink-0">
        <div className="absolute inset-0 bg-white/5 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
        <img 
          src={logo} 
          alt={title} 
          className="relative w-full h-full object-contain rounded-xl"
          onError={(e) => { e.currentTarget.src = 'https://registry.walletconnect.com/api/v1/logo/md/75f112e3-9799-44d4-857e-e47a26f34500'; }}
        />
      </div>
      <div className="flex flex-col min-w-0">
        <h3 className="font-semibold text-white truncate group-hover:text-purple-400 transition-colors">{title}</h3>
        <span className="text-white/40 text-xs truncate uppercase tracking-wider">{domain}</span>
      </div>
    </div>
  );
};
