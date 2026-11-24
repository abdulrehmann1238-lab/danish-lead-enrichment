import React, { useEffect, useState } from 'react';

interface InitialLoaderProps {
  onComplete: () => void;
  forceShow?: boolean;
}

export const InitialLoader: React.FC<InitialLoaderProps> = ({ onComplete, forceShow = false }) => {
  const [progress, setProgress] = useState(15);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Check if user already saw loader this session
    const seen = sessionStorage.getItem('leadenrich_seen_loader');
    if (seen && !forceShow) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              sessionStorage.setItem('leadenrich_seen_loader', 'true');
              onComplete();
            }, 450);
          }, 200);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 12;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete, forceShow]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F7F8F5] transition-opacity duration-500 ease-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center max-w-xs w-full px-6 text-center">
        {/* Minimal Animated Brand Symbol */}
        <div className="relative w-14 h-14 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-[#203C34] shadow-card flex items-center justify-center">
            <div className="w-7 h-7 rounded-full border-2 border-[#739181] border-dashed animate-[spin_6s_linear_infinite]" />
            <div className="absolute w-3 h-3 rounded-full bg-[#E9EEE9]" />
          </div>
        </div>

        {/* LeadEnrich Wordmark */}
        <div className="flex items-center space-x-1.5 mb-2">
          <span className="font-display text-xl font-bold tracking-tight text-[#203C34]">
            LeadEnrich
          </span>
          <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-[#E9EEE9] text-[#203C34]">
            DK
          </span>
        </div>

        <p className="text-xs text-[#758078] font-medium mb-6">
          Preparing your workspace...
        </p>

        {/* Delicate Loading Line */}
        <div className="w-full bg-[#E8ECE7] h-[2px] rounded-full overflow-hidden relative">
          <div
            className="h-full bg-[#203C34] rounded-full transition-all duration-150 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between w-full text-[11px] text-[#758078] font-mono">
          <span>Danish B2B Intelligence</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
      </div>
    </div>
  );
};
