import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Wallet, Sparkles, Check, ShieldCheck, X } from 'lucide-react';

interface PurchaseModalProps {
  pack: {
    name: string;
    credits: number;
    description: string;
    rate: string;
  } | null;
  onClose: () => void;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({ pack, onClose }) => {
  const { addCredits, user } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!pack) return null;

  const handleConfirmPurchase = () => {
    setIsProcessing(true);
    setTimeout(() => {
      addCredits(pack.credits, pack.name);
      setIsProcessing(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 command-backdrop">
      <div 
        className="w-full max-w-md bg-white dark:bg-[#1C2420] rounded-2xl shadow-modal border border-[#E8ECE7] dark:border-[#2C3731] overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#E8ECE7] dark:border-[#2C3731]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E9EEE9] dark:bg-[#25332C] text-[#203C34] dark:text-[#8BB09D] flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-[#202923] dark:text-white">
                Purchase {pack.name} Pack
              </h3>
              <p className="text-xs text-[#758078] dark:text-[#8E9C93]">
                Simulated Stripe checkout transaction
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1.5 rounded-lg text-[#758078] hover:text-[#202923] dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-[#F7F8F5] dark:bg-[#141A17] border border-[#E8ECE7] dark:border-[#2C3731] text-center space-y-1">
            <div className="font-mono text-2xl font-extrabold text-[#203C34] dark:text-[#8BB09D]">
              +{pack.credits.toLocaleString()} Credits
            </div>
            <div className="text-[11px] text-[#758078] font-medium">{pack.description}</div>
            <div className="text-[10px] font-mono text-[#3D8060]">{pack.rate}</div>
          </div>

          <div className="space-y-2 border-t border-[#E8ECE7] dark:border-[#2C3731] pt-3">
            <div className="flex justify-between">
              <span className="text-[#758078]">Current Balance:</span>
              <span className="font-mono font-semibold text-[#202923] dark:text-white">{user.credits.toLocaleString()} credits</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#758078]">New Balance:</span>
              <span className="font-mono font-bold text-[#3D8060]">
                {(user.credits + pack.credits).toLocaleString()} credits
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#758078]">Demo Mode:</span>
              <span className="font-mono text-[#739181]">Simulated Sandbox</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#E9EEE9]/50 dark:bg-[#25332C]/50 border border-[#739181]/30 flex items-center space-x-2 text-[11px] text-[#758078]">
            <ShieldCheck className="w-4 h-4 text-[#3D8060] flex-shrink-0" />
            <span>Credits never expire. No automatic renewals or unexpected overages.</span>
          </div>
        </div>

        <div className="p-4 bg-[#F7F8F5] dark:bg-[#141A17] border-t border-[#E8ECE7] dark:border-[#2C3731] flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="px-4 py-2 rounded-xl text-xs font-medium text-[#758078] hover:text-[#202923]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmPurchase}
            disabled={isProcessing}
            className="px-5 py-2 rounded-xl bg-[#203C34] text-white text-xs font-semibold hover:bg-[#2c544a] transition-all shadow-subtle flex items-center space-x-2"
          >
            {isProcessing ? (
              <>
                <div className="w-3.5 h-3.5 rounded-full border border-white border-t-transparent animate-spin" />
                <span>Crediting Wallet...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#E9EEE9]" />
                <span>Confirm Purchase (+{pack.credits.toLocaleString()} credits)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
