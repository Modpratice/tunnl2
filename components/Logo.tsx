
import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <img 
        src="https://app.tunnl.io/tunnl-logo-full.svg" 
        alt="Tunnl Logo" 
        className="h-10 w-auto"
      />
    </div>
  );
};
