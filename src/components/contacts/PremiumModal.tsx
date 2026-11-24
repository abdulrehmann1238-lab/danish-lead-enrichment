import React from 'react';
import { Contact } from '../../types';
import { useApp } from '../../context/AppContext';
import { Lock, Sparkles, Check, ArrowRight, X } from 'lucide-react';

interface PremiumModalProps {
  contact: Contact | null;
  onClose: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({ contact, onClose }) => {
  const { upgradeToAnnualPro } = useApp();

  if (!contact) return null;

  const handleSimulateUpgrade = () => {
    upgradeToAnnualPro();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 command-backdrop">
      <div 
        className="w-full max-w-md bg-white dark:bg-[#1C2420] rounded-2xl shadow-modal border border-[#E8ECE7] dark:border-[#2C3731] overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E9E5DC] text-[#203C34] flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#E9E5DC] text-[#203C34]">
              Premium Contact Tier
            </span>
            <h3 className="font-display text-xl font-bold text-[#202923] dark:text-white mt-2">
              Unlock {contact.name}
            </h3>
            <p className="text-xs text-[#758078] dark:text-[#8E9C93] mt-1">
              {contact.jobTitle} at {contact.company}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F7F8F5] dark:bg-[#141A17] border border-[#E8ECE7] dark:border-[#2C3731] text-left text-xs space-y-2">
            <p className="text-[#202923] dark:text-[#E9EFEA] font-medium leading-relaxed">
              This executive contact belongs to the premium 5,000 Danish decision-maker database, curated for high-impact enterprise outreach.
            </p>
            <div className="space-y-1.5 pt-1 text-[#758078] dark:text-[#8E9C93]">
              <div className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#3D8060]" />
                <span>Access all 15,000 Danish B2B contacts</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#3D8060]" />
                <span>Priority email & mobile number discovery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#3D8060]" />
                <span>Unlimited CVR intelligence and export rights</span>
              </div>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={handleSimulateUpgrade}
              className="w-full py-2.5 px-4 rounded-xl bg-[#203C34] text-white text-xs font-semibold hover:bg-[#2c544a] transition-all shadow-subtle flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-[#E9EEE9]" />
              <span>Simulate Annual Professional Upgrade (Demo)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onClose}
              className="w-full py-2 text-xs font-medium text-[#758078] hover:text-[#202923] dark:hover:text-white"
            >
              Cancel and Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
