
import React, { useState } from 'react';
import { LoginCard } from './components/LoginCard';
import { WalletSelectionPage } from './components/WalletSelectionPage';

const App: React.FC = () => {
  const [view, setView] = useState<'login' | 'wallets'>('login');

  return (
    <div className="min-h-screen w-full bg-[#07070b] text-white overflow-x-hidden">
      {view === 'login' ? (
        <div className="min-h-screen w-full flex items-center justify-center">
          <LoginCard onNavigate={() => setView('wallets')} />
        </div>
      ) : (
        <WalletSelectionPage />
      )}
    </div>
  );
};

export default App;
