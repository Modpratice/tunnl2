
import React, { useState, useMemo } from 'react';
import { WalletCard } from './WalletCard';
import { WalletModal } from './WalletModal';
import { Marquee } from './Marquee';

const WALLETS = [
  { id: 'wallet-connect', title: 'Wallet Connect', domain: 'walletconnect.com', logo: './assets\logo\walle.jpg' },
  { id: 'metamask', title: 'Metamask', domain: 'metamask.io', logo: 'https://registry.walletconnect.com/api/v1/logo/md/c5643456-611b-41a3-8173-63d11b207500' },
  { id: 'coinbase', title: 'Coinbase', domain: 'coinbase.com', logo: 'https://registry.walletconnect.com/api/v1/logo/md/fd20dc42-2452-4a42-83f4-0a9857213b00' },
  { id: 'trust', title: 'Trust Wallet', domain: 'trustwallet.com', logo: 'https://github.com/Modpratice/tunnl2/blob/main/assets/logo/trust_wallet.jpg' },
  { id: 'phantom', title: 'Phantom', domain: 'phantom.app', logo: 'https://registry.walletconnect.com/api/v1/logo/md/a7977d5b-8021-4ba9-9dc6-446a50c67400' },
  { id: 'rainbow', title: 'Rainbow', domain: 'rainbow.me', logo: 'https://registry.walletconnect.com/api/v1/logo/md/1ae92b26-3d59-4ad2-98e9-0a9857213b00' },
  { id: 'okx', title: 'OKX Wallet', domain: 'okx.com', logo: 'https://registry.walletconnect.com/api/v1/logo/md/971e689d-45f9-486b-a638-0a9857213b00' },
  { id: 'rabby', title: 'Rabby', domain: 'rabby.io', logo: 'https://registry.walletconnect.com/api/v1/logo/md/ed198260-e13d-498e-89f7-0a9857213b00' },
  { id: 'ledger', title: 'Ledger Live', domain: 'ledger.com', logo: 'https://registry.walletconnect.com/api/v1/logo/md/1917734c-8575-4309-b038-0a9857213b00' },
  { id: 'trezor', title: 'Trezor', domain: 'trezor.io', logo: 'https://registry.walletconnect.com/api/v1/logo/md/e6c9868e-09a2-4a7b-a2c3-0a9857213b00' },
  { id: 'safe', title: 'Gnosis Safe', domain: 'safe.global', logo: 'https://registry.walletconnect.com/api/v1/logo/md/225bd710-388d-4f6c-897d-0a9857213b00' },
  { id: 'argent', title: 'Argent', domain: 'argent.xyz', logo: 'https://registry.walletconnect.com/api/v1/logo/md/cf21952a-285d-446d-9669-0a9857213b00' },
  { id: 'zerion', title: 'Zerion', domain: 'zerion.io', logo: 'https://registry.walletconnect.com/api/v1/logo/md/ecc55208-c30d-4545-9799-0a9857213b00' },
  { id: 'bitkeep', title: 'BitKeep', domain: 'bitget.com', logo: 'https://registry.walletconnect.com/api/v1/logo/md/3f9720fd-5582-446e-897d-0a9857213b00' },
  { id: 'taho', title: 'Taho', domain: 'taho.xyz', logo: 'https://registry.walletconnect.com/api/v1/logo/md/9720fd-5582-446e-897d-0a9857213b00' },
  { id: 'backpack', title: 'Backpack', domain: 'backpack.app', logo: 'https://registry.walletconnect.com/api/v1/logo/md/225bd710-388d-4f6c-897d-0a9857213b00' },
  { id: 'magic-eden', title: 'Magic Eden', domain: 'magiceden.io', logo: 'https://registry.walletconnect.com/api/v1/logo/md/a7977d5b-8021-4ba9-9dc6-446a50c67400' },
  { id: 'tonkeeper', title: 'Tonkeeper', domain: 'tonkeeper.com', logo: 'https://registry.walletconnect.com/api/v1/logo/md/971e689d-45f9-486b-a638-0a9857213b00' },
  { id: 'xverse', title: 'XVerse', domain: 'xverse.app', logo: 'https://registry.walletconnect.com/api/v1/logo/md/c5643456-611b-41a3-8173-63d11b207500' },
  { id: 'bloom', title: 'Bloom', domain: 'bloomwallet.io', logo: 'https://registry.walletconnect.com/api/v1/logo/md/ecc55208-c30d-4545-9799-0a9857213b00' },
  { id: 'firefly', title: 'Firefly', domain: 'firefly.iota.org', logo: 'https://registry.walletconnect.com/api/v1/logo/md/cf21952a-285d-446d-9669-0a9857213b00' },
  { id: 'keplr', title: 'Keplr', domain: 'keplr.app', logo: 'https://registry.walletconnect.com/api/v1/logo/md/fd20dc42-2452-4a42-83f4-0a9857213b00' },
  { id: 'exodus', title: 'Exodus', domain: 'exodus.com', logo: 'https://registry.walletconnect.com/api/v1/logo/md/c5643456-611b-41a3-8173-63d11b207500' },
  { id: 'binance', title: 'Binance Wallet', domain: 'binance.org', logo: 'https://registry.walletconnect.com/api/v1/logo/md/3f9720fd-5582-446e-897d-0a9857213b00' },
  { id: 'polygon', title: 'Polygon', domain: 'polygon.technology', logo: 'https://registry.walletconnect.com/api/v1/logo/md/a7977d5b-8021-4ba9-9dc6-446a50c67400' },
  { id: 'sui', title: 'Sui Wallet', domain: 'sui.io', logo: 'https://registry.walletconnect.com/api/v1/logo/md/1ae92b26-3d59-4ad2-98e9-0a9857213b00' },
  { id: 'solana', title: 'Solana Wallet', domain: 'solana.com', logo: 'https://registry.walletconnect.com/api/v1/logo/md/fd20dc42-2452-4a42-83f4-0a9857213b00' },
  { id: 'bitcoin-wallet', title: 'Bitcoin Wallet', domain: 'bitcoin.org', logo: 'https://registry.walletconnect.com/api/v1/logo/md/ecc55208-c30d-4545-9799-0a9857213b00' },
  { id: 'bifrost', title: 'Bifrost', domain: 'bifrost.network', logo: 'https://registry.walletconnect.com/api/v1/logo/md/ed198260-e13d-498e-89f7-0a9857213b00' },
  { id: 'coin98', title: 'Coin98', domain: 'coin98.com', logo: 'https://registry.walletconnect.com/api/v1/logo/md/ed198260-e13d-498e-89f7-0a9857213b00' },
  { id: 'saitama', title: 'Saitama', domain: 'saitamatoken.com', logo: 'https://registry.walletconnect.com/api/v1/logo/md/ecc55208-c30d-4545-9799-0a9857213b00' },
  { id: 'zengo', title: 'ZenGo', domain: 'zengo.com', logo: 'https://registry.walletconnect.com/api/v1/logo/md/ecc55208-c30d-4545-9799-0a9857213b00' },
  { id: 'unstoppable', title: 'Unstoppable', domain: 'unstoppable.money', logo: 'https://registry.walletconnect.com/api/v1/logo/md/a7977d5b-8021-4ba9-9dc6-446a50c67400' },
  { id: 'valora', title: 'Valora', domain: 'valoraapp.com', logo: 'https://registry.walletconnect.com/api/v1/logo/md/fd20dc42-2452-4a42-83f4-0a9857213b00' },
  { id: 'zelcore', title: 'Zelcore', domain: 'zelcore.io', logo: 'https://registry.walletconnect.com/api/v1/logo/md/c5643456-611b-41a3-8173-63d11b207500' }
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
