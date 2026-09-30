import React, { useState } from 'react';
import { User, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStatus?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  size = 'md',
  showStatus = true,
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 sm:w-28 sm:h-28 text-2xl',
  };

  const statusSizeClasses = {
    sm: 'w-2.5 h-2.5 right-0 bottom-0 border-[1.5px]',
    md: 'w-3 h-3 right-0 bottom-0 border-2',
    lg: 'w-4 h-4 right-0.5 bottom-0.5 border-2',
    xl: 'w-5 h-5 right-1 bottom-1 border-2',
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-cyan-500/20 border-2 border-emerald-500/40 dark:border-emerald-400/40 p-0.5 shadow-md shadow-emerald-500/10 flex items-center justify-center transition-transform hover:scale-105`}
      >
        {!imageError ? (
          <img
            src={PERSONAL_INFO.avatarUrl}
            alt={PERSONAL_INFO.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover rounded-[14px] bg-slate-900 transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-80'
            }`}
          />
        ) : (
          <div className="w-full h-full rounded-[14px] bg-gradient-to-br from-emerald-700 to-slate-900 flex items-center justify-center text-white font-bold font-mono">
            {PERSONAL_INFO.handle.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {showStatus && (
        <span
          title="Online & Available for Consulting"
          className={`absolute ${statusSizeClasses[size]} rounded-full bg-emerald-500 border-white dark:border-slate-950 shadow-xs flex items-center justify-center`}
        >
          <span className="w-full h-full rounded-full bg-emerald-400 animate-ping opacity-75" />
        </span>
      )}
    </div>
  );
};
