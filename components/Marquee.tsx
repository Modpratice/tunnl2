
import React from 'react';

const COINS = [
  { name: 'Bitcoin', symbol: 'BTC', price: '$94,213.12', change: '+2.4%' },
  { name: 'Ethereum', symbol: 'ETH', price: '$2,451.98', change: '-0.5%' },
  { name: 'Solana', symbol: 'SOL', price: '$142.12', change: '+12.1%' },
  { name: 'Cardano', symbol: 'ADA', price: '$0.45', change: '+1.2%' },
  { name: 'Polkadot', symbol: 'DOT', price: '$7.82', change: '-1.4%' },
  { name: 'Chainlink', symbol: 'LINK', price: '$18.91', change: '+0.8%' },
  { name: 'XRP', symbol: 'XRP', price: '$1.12', change: '+5.4%' }
];

export const Marquee: React.FC = () => {
  return (
    <div className="bg-[#0c0c14] border-b border-white/5 py-1 overflow-hidden select-none">
      <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
        {[...COINS, ...COINS].map((coin, idx) => (
          <div key={idx} className="inline-flex items-center mx-6 gap-2 text-xs font-medium">
            <span className="text-white/80">{coin.name}</span>
            <span className="text-white/40 uppercase">{coin.symbol}</span>
            <span className="text-white">{coin.price}</span>
            <span className={coin.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
              {coin.change}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
