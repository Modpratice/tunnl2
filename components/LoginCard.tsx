
import React from 'react';
import { Logo } from './Logo';

interface LoginCardProps {
  onNavigate: () => void;
}

export const LoginCard: React.FC<LoginCardProps> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-[450px] mx-4 p-1">
      <div className="bg-[#111118] border border-white/[0.05] rounded-[2.5rem] p-12 shadow-2xl flex flex-col items-center">
        <div className="mb-4">
          <Logo />
        </div>

        <p className="text-[#84848d] text-center text-[15px] mb-10 font-medium">
          Both Brands and Creators can sign in below.
        </p>

        <button
          onClick={onNavigate}
          className="w-full relative group transition-all duration-300 active:scale-[0.98]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-xl opacity-20 pointer-events-none" />
          <div className="bg-gradient-to-r from-[#5a56e0] via-[#7c3aed] to-[#5a56e0] h-14 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.45)] transition-shadow">
            <span className="text-white font-semibold text-lg flex items-center gap-2">
              Sign in with X
              <svg 
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2.5}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </button>

        <div className="w-full h-[1px] bg-white/[0.05] my-8" />

        <button
          onClick={onNavigate}
          className="w-full h-14 rounded-xl border border-white/[0.08] bg-[#0d0d12] hover:bg-[#16161e] transition-colors duration-200 active:scale-[0.98]"
        >
          <span className="text-white font-medium text-[15px]">
            Additional Login Options
          </span>
        </button>
      </div>
    </div>
  );
};
