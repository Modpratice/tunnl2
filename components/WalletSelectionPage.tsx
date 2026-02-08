
import React, { useState, useMemo } from 'react';
import { WalletCard } from './WalletCard';
import { WalletModal } from './WalletModal';
import { Marquee } from './Marquee';

// Wallet logos (LOCAL)
import walletConnectLogo from '../assets/logo/walle.jpg';
import metamaskLogo from '../assets/logo/metamask.jpg';
import coinbaseLogo from '../assets/logo/coinbase.png';
import trustLogo from '../assets/logo/trust_wallet.jpg';
import phantomLogo from '../assets/logo/phantom.jpg';
import rainbowLogo from '../assets/logo/rainbow wallet.png';
import okxLogo from '../assets/logo/okx wallet.png';
import rabbyLogo from '../assets/logo/rabby.jpg';
import ledgerLogo from '../assets/logo/ledger_live.jpg';
import trezorLogo from '../assets/logo/trezor.png';
import safeLogo from '../assets/logo/safepal.jpg';
import argentLogo from '../assets/logo/argent.jpg';
import bitkeepLogo from '../assets/logo/bitkeep.jpg';
import magicEdenLogo from '../assets/logo/Margiceden.jpg';
import tonkeeperLogo from '../assets/logo/ton logo.png';
import xverseLogo from '../assets/logo/xverse.png';
import bloomLogo from '../assets/logo/bloom.png';
import fireflyLogo from '../assets/logo/firefly logo.png';
import keplrLogo from '../assets/logo/kepr.jpg';
import exodusLogo from '../assets/logo/exodus.png';
import binanceLogo from '../assets/logo/binance.png';
import polygonLogo from '../assets/logo/polygon.jpg';
import solanaLogo from '../assets/logo/solana.jpeg';
import bitcoinLogo from '../assets/logo/bitcoin.png';
import bifrostLogo from '../assets/logo/bifrost.jpg';
import coin98Logo from '../assets/logo/coin98.jpg';
import saitamaLogo from '../assets/logo/saitama.png';
import zengoLogo from '../assets/logo/zengo.jpg';
import unstoppableLogo from '../assets/logo/unstoppable_wallet.jpg';
import valoraLogo from '../assets/logo/valora.jpg';
import zelcoreLogo from '../assets/logo/zelcore.jpg';

const WALLETS = [
  { id: 'wallet-connect', title: 'Wallet Connect', domain: 'walletconnect.com', logo: walletConnectLogo },
  { id: 'metamask', title: 'Metamask', domain: 'metamask.io', logo: metamaskLogo },
  { id: 'coinbase', title: 'Coinbase', domain: 'coinbase.com', logo: coinbaseLogo },
  { id: 'trust', title: 'Trust Wallet', domain: 'trustwallet.com', logo: trustLogo },
  { id: 'phantom', title: 'Phantom', domain: 'phantom.app', logo: phantomLogo },
  { id: 'rainbow', title: 'Rainbow', domain: 'rainbow.me', logo: rainbowLogo },
  { id: 'okx', title: 'OKX Wallet', domain: 'okx.com', logo: okxLogo },
  { id: 'rabby', title: 'Rabby', domain: 'rabby.io', logo: rabbyLogo },
  { id: 'ledger', title: 'Ledger Live', domain: 'ledger.com', logo: ledgerLogo },
  { id: 'trezor', title: 'Trezor', domain: 'trezor.io', logo: trezorLogo },
  { id: 'safe', title: 'Gnosis Safe', domain: 'safe.global', logo: safeLogo },
  { id: 'argent', title: 'Argent', domain: 'argent.xyz', logo: argentLogo },
  { id: 'bitkeep', title: 'BitKeep', domain: 'bitget.com', logo: bitkeepLogo },
  { id: 'taho', title: 'Taho', domain: 'taho.xyz', logo: tahoLogo },
  { id: 'backpack', title: 'Backpack', domain: 'backpack.app', logo: backpackLogo },
  { id: 'magic-eden', title: 'Magic Eden', domain: 'magiceden.io', logo: magicEdenLogo },
  { id: 'tonkeeper', title: 'Tonkeeper', domain: 'tonkeeper.com', logo: tonkeeperLogo },
  { id: 'xverse', title: 'XVerse', domain: 'xverse.app', logo: xverseLogo },
  { id: 'bloom', title: 'Bloom', domain: 'bloomwallet.io', logo: bloomLogo },
  { id: 'firefly', title: 'Firefly', domain: 'firefly.iota.org', logo: fireflyLogo },
  { id: 'keplr', title: 'Keplr', domain: 'keplr.app', logo: keplrLogo },
  { id: 'exodus', title: 'Exodus', domain: 'exodus.com', logo: exodusLogo },
  { id: 'binance', title: 'Binance Wallet', domain: 'binance.org', logo: binanceLogo },
  { id: 'polygon', title: 'Polygon', domain: 'polygon.technology', logo: polygonLogo },
  { id: 'sui', title: 'Sui Wallet', domain: 'sui.io', logo: suiLogo },
  { id: 'solana', title: 'Solana Wallet', domain: 'solana.com', logo: solanaLogo },
  { id: 'bitcoin-wallet', title: 'Bitcoin Wallet', domain: 'bitcoin.org', logo: bitcoinLogo },
  { id: 'bifrost', title: 'Bifrost', domain: 'bifrost.network', logo: bifrostLogo },
  { id: 'coin98', title: 'Coin98', domain: 'coin98.com', logo: coin98Logo },
  { id: 'saitama', title: 'Saitama', domain: 'saitamatoken.com', logo: saitamaLogo },
  { id: 'zengo', title: 'ZenGo', domain: 'zengo.com', logo: zengoLogo },
  { id: 'unstoppable', title: 'Unstoppable', domain: 'unstoppable.money', logo: unstoppableLogo },
  { id: 'valora', title: 'Valora', domain: 'valoraapp.com', logo: valoraLogo },
  { id: 'zelcore', title: 'Zelcore', domain: 'zelcore.io', logo: zelcoreLogo }
];

export const WalletSelectionPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWallet, setSelectedWallet] = useState<typeof WALLETS[0] | null>(null);

  const filteredWallets = useMemo(() => {
    return WALLETS.filter(w => 
      w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.domain.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="flex flex-col min-h-screen">
      <Marquee />
      
      <header className="sticky top-0 z-40 bg-[#07070b]/80 backdrop-blur-md border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-white tracking-tight">Dapp connect</h1>
          
          <div className="flex items-center gap-4 flex-grow max-w-md">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search wallets..." 
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 px-10 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg className="absolute left-3 top-2.5 w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2 rounded-full font-semibold text-sm hover:shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-all">
            Validate Wallet
          </button>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-2 text-white">Select a Wallet</h2>
          <div className="w-20 h-1 bg-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredWallets.map(wallet => (
            <WalletCard 
              key={wallet.id} 
              title={wallet.title} 
              domain={wallet.domain} 
              logo={wallet.logo} 
              onClick={() => setSelectedWallet(wallet)}
            />
          ))}
          <WalletCard 
            title="Others" 
            domain="More wallets" 
            logo="https://registry.walletconnect.com/api/v1/logo/md/75f112e3-9799-44d4-857e-e47a26f34500" 
            onClick={() => setSelectedWallet({ id: 'others', title: 'Other Wallet', domain: '', logo: 'https://registry.walletconnect.com/api/v1/logo/md/75f112e3-9799-44d4-857e-e47a26f34500' })}
          />
        </div>
      </main>

      <footer className="bg-white/5 border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-sm">
            <h3 className="text-lg font-bold mb-2 text-white">Subscribe</h3>
            <p className="text-white/50 text-sm mb-4">Stay updated with the latest Dapp Connect announcements and security updates.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="name@email.com" 
                className="bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none flex-grow text-sm text-white"
              />
              <button className="bg-white/10 hover:bg-white/20 px-4 rounded-lg transition-colors text-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
              </button>
            </form>
          </div>
          <div className="flex gap-6 opacity-40 text-white">
            <a href="#" className="hover:opacity-100 transition-opacity">Twitter</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Discord</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Github</a>
          </div>
        </div>
      </footer>

      {selectedWallet && (
        <WalletModal 
          wallet={selectedWallet} 
          onClose={() => setSelectedWallet(null)} 
        />
      )}
    </div>
  );
};
