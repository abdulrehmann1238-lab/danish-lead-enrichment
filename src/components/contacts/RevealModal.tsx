import React, { useState } from 'react';
import { Contact } from '../../types';
import { useApp } from '../../context/AppContext';
import { Sparkles, Mail, Phone, ShieldCheck, Check, AlertTriangle, ArrowRight, X } from 'lucide-react';

interface RevealModalProps {
  contact: Contact | null;
  onClose: () => void;
  initialType?: 'email' | 'phone' | 'combined';
}

export const RevealModal: React.FC<RevealModalProps> = ({ 
  contact, 
  onClose,
  initialType = 'combined'
}) => {
  const { user, revealContact, showToast } = useApp();
  const [revealType, setRevealType] = useState<'email' | 'phone' | 'combined'>(initialType);
  const [selectedProvider, setSelectedProvider] = useState<'Prospeo' | 'Findymail' | 'Coresignal' | 'ContactOut' | 'Forager'>('Prospeo');
  const [isProcessing, setIsProcessing] = useState(false);
  const [stepText, setStepText] = useState<string | null>(null);

  if (!contact) return null;

  // Credit calculation
  const needEmail = (revealType === 'email' || revealType === 'combined') && !contact.revealedEmail;
  const needPhone = (revealType === 'phone' || revealType === 'combined') && !contact.revealedPhone;

  let creditCost = 0;
  if (needEmail && needPhone) creditCost = 15;
  else if (needEmail) creditCost = 5;
  else if (needPhone) creditCost = 10;

  const hasEnoughCredits = user.credits >= creditCost;

  const handleExecuteReveal = async () => {
    if (!hasEnoughCredits) {
      showToast({
        type: 'error',
        title: 'Insufficient Balance',
        description: `You have ${user.credits} credits, but this operation requires ${creditCost} credits.`,
      });
      return;
    }

    setIsProcessing(true);
    setStepText(`Step 1/3: Validating domain and MX routing...`);

    setTimeout(() => {
      setStepText(`Step 2/3: Dispatching lookup to ${selectedProvider}...`);
      setTimeout(async () => {
        setStepText(`Step 3/3: Committing deduction and saving contact...`);
        setTimeout(async () => {
          await revealContact(contact.id, revealType, selectedProvider);
          setIsProcessing(false);
          onClose();
        }, 500);
      }, 700);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 command-backdrop">
      <div 
        className="w-full max-w-lg bg-white dark:bg-[#1C2420] rounded-2xl shadow-modal border border-[#E8ECE7] dark:border-[#2C3731] overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E8ECE7] dark:border-[#2C3731]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E9EEE9] dark:bg-[#25332C] flex items-center justify-center text-[#203C34] dark:text-[#8BB09D]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-[#202923] dark:text-white">
                Reveal Contact Information
              </h3>
              <p className="text-xs text-[#758078] dark:text-[#8E9C93]">
                {contact.name} • {contact.company}
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

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Contact summary card */}
          <div className="p-3.5 rounded-xl bg-[#F7F8F5] dark:bg-[#141A17] border border-[#E8ECE7] dark:border-[#2C3731] flex items-center justify-between text-xs">
            <div>
              <div className="font-semibold text-[#202923] dark:text-white">{contact.name}</div>
              <div className="text-[11px] text-[#758078]">{contact.jobTitle} • {contact.region}</div>
              <div className="text-[10px] font-mono text-[#758078] mt-0.5">CVR: {contact.cvr}</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E9EEE9] dark:bg-[#25332C] text-[#203C34] dark:text-[#8BB09D] font-bold">
                {contact.access.toUpperCase()} TIER
              </span>
            </div>
          </div>

          {/* Reveal Type Choice */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#202923] dark:text-white">
              Select Information to Reveal
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setRevealType('email')}
                disabled={isProcessing}
                className={`p-3 rounded-xl border text-left transition-all ${
                  revealType === 'email'
                    ? 'border-[#203C34] dark:border-[#739181] bg-[#E9EEE9]/40 dark:bg-[#25332C]/40 font-semibold'
                    : 'border-[#E8ECE7] dark:border-[#2C3731] hover:bg-[#F3F5F2] dark:hover:bg-[#232C27]'
                }`}
              >
                <Mail className="w-4 h-4 text-[#739181] mb-1.5" />
                <div className="text-[#202923] dark:text-white">Email Only</div>
                <div className="text-[10px] text-[#758078] font-mono">5 credits</div>
              </button>

              <button
                type="button"
                onClick={() => setRevealType('phone')}
                disabled={isProcessing}
                className={`p-3 rounded-xl border text-left transition-all ${
                  revealType === 'phone'
                    ? 'border-[#203C34] dark:border-[#739181] bg-[#E9EEE9]/40 dark:bg-[#25332C]/40 font-semibold'
                    : 'border-[#E8ECE7] dark:border-[#2C3731] hover:bg-[#F3F5F2] dark:hover:bg-[#232C27]'
                }`}
              >
                <Phone className="w-4 h-4 text-[#739181] mb-1.5" />
                <div className="text-[#202923] dark:text-white">Phone Only</div>
                <div className="text-[10px] text-[#758078] font-mono">10 credits</div>
              </button>

              <button
                type="button"
                onClick={() => setRevealType('combined')}
                disabled={isProcessing}
                className={`p-3 rounded-xl border text-left transition-all ${
                  revealType === 'combined'
                    ? 'border-[#203C34] dark:border-[#739181] bg-[#E9EEE9]/40 dark:bg-[#25332C]/40 font-semibold'
                    : 'border-[#E8ECE7] dark:border-[#2C3731] hover:bg-[#F3F5F2] dark:hover:bg-[#232C27]'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#C18A45] mb-1.5" />
                <div className="text-[#202923] dark:text-white">Combined</div>
                <div className="text-[10px] text-[#758078] font-mono">15 credits</div>
              </button>
            </div>
          </div>

          {/* Provider Selection */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#202923] dark:text-white">
              Primary Enrichment Engine
            </label>
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value as any)}
              disabled={isProcessing}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none"
            >
              <option value="Prospeo">Prospeo (Recommended for Danish SMTP verification)</option>
              <option value="Findymail">Findymail (Clean Danish corporate email algorithm)</option>
              <option value="ContactOut">ContactOut (Direct mobile phone lines)</option>
              <option value="Coresignal">Coresignal (Nordic workforce graph)</option>
              <option value="Forager">Forager (Alternative SMB signals)</option>
            </select>
          </div>

          {/* Credit Accounting & Concurrency rules notice */}
          <div className="p-3 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5]/80 dark:bg-[#141A17]/80 space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#758078]">Required Credits:</span>
              <span className="font-mono font-bold text-[#202923] dark:text-white">
                {creditCost} credits
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#758078]">Current Wallet Balance:</span>
              <span className="font-mono font-semibold text-[#3D8060]">
                {user.credits.toLocaleString()} credits
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-[#E8ECE7] dark:border-[#2C3731] pt-1">
              <span className="text-[#758078]">Post-operation Balance:</span>
              <span className="font-mono font-semibold text-[#202923] dark:text-white">
                {Math.max(0, user.credits - creditCost).toLocaleString()} credits
              </span>
            </div>
          </div>

          {/* Step Progress feedback */}
          {stepText && (
            <div className="p-3 rounded-xl bg-[#E9EEE9] dark:bg-[#25332C] text-[#203C34] dark:text-[#8BB09D] text-xs font-mono flex items-center space-x-2 animate-fade-in">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-[#203C34] dark:border-[#8BB09D] border-t-transparent animate-spin flex-shrink-0" />
              <span>{stepText}</span>
            </div>
          )}

          {!hasEnoughCredits && (
            <div className="p-3 rounded-xl bg-[#B85D57]/10 border border-[#B85D57]/30 text-[#B85D57] text-xs flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>Insufficient credits. Wallet cannot go negative. Please purchase a credit pack.</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F7F8F5] dark:bg-[#141A17] border-t border-[#E8ECE7] dark:border-[#2C3731] flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="px-4 py-2 rounded-xl text-xs font-medium text-[#758078] hover:text-[#202923] dark:hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleExecuteReveal}
            disabled={isProcessing || !hasEnoughCredits}
            className={`px-5 py-2 rounded-xl text-xs font-semibold text-white transition-all shadow-subtle flex items-center space-x-2 ${
              hasEnoughCredits && !isProcessing
                ? 'bg-[#203C34] hover:bg-[#2c544a]'
                : 'bg-[#758078] opacity-50 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E9EEE9]" />
            <span>Confirm Reveal ({creditCost} credits)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
