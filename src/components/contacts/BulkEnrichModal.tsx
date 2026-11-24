import React, { useState } from 'react';
import { Contact } from '../../types';
import { useApp } from '../../context/AppContext';
import { Sparkles, Check, AlertTriangle, X, ShieldCheck } from 'lucide-react';

interface BulkEnrichModalProps {
  selectedContactIds: string[];
  contacts: Contact[];
  onClose: () => void;
  onSuccess: () => void;
}

export const BulkEnrichModal: React.FC<BulkEnrichModalProps> = ({
  selectedContactIds,
  contacts,
  onClose,
  onSuccess,
}) => {
  const { user, bulkEnrich, optOuts, showToast } = useApp();
  const [revealType, setRevealType] = useState<'email' | 'phone' | 'combined'>('email');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  const selectedContacts = contacts.filter(c => selectedContactIds.includes(c.id));
  const optedOutEmails = optOuts.map(o => o.email.toLowerCase());

  // Filter eligible
  const eligibleContacts = selectedContacts.filter(
    c => !c.optedOut && !optedOutEmails.includes(c.email.toLowerCase())
  );
  const optedOutCount = selectedContacts.length - eligibleContacts.length;

  const costPerContact = revealType === 'combined' ? 15 : revealType === 'email' ? 5 : 10;
  
  // Count how many actually need revealing
  const needWork = eligibleContacts.filter(c => {
    if (revealType === 'email') return !c.revealedEmail;
    if (revealType === 'phone') return !c.revealedPhone;
    return !c.revealedEmail || !c.revealedPhone;
  });

  const totalCreditsNeeded = needWork.length * costPerContact;
  const canAfford = user.credits >= totalCreditsNeeded;

  const handleStartBulkJob = async () => {
    if (!canAfford) {
      showToast({
        type: 'error',
        title: 'Bulk Job Blocked',
        description: `This operation requires ${totalCreditsNeeded} credits, exceeding your balance of ${user.credits}. No partial deductions permitted.`,
      });
      return;
    }

    setIsProcessing(true);
    setProgressPercent(15);

    const interval = setInterval(() => {
      setProgressPercent(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 250);

    setTimeout(async () => {
      clearInterval(interval);
      setProgressPercent(100);
      await bulkEnrich(selectedContactIds, revealType);
      setIsProcessing(false);
      onSuccess();
      onClose();
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 command-backdrop">
      <div 
        className="w-full max-w-lg bg-white dark:bg-[#1C2420] rounded-2xl shadow-modal border border-[#E8ECE7] dark:border-[#2C3731] overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#E8ECE7] dark:border-[#2C3731]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#203C34] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#E9EEE9]" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-[#202923] dark:text-white">
                Bulk Waterfall Enrichment
              </h3>
              <p className="text-xs text-[#758078] dark:text-[#8E9C93]">
                Process {selectedContacts.length} selected Danish contacts
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
          {/* Summary counts */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-[#F7F8F5] dark:bg-[#141A17] border border-[#E8ECE7] dark:border-[#2C3731]">
              <div className="text-[10px] text-[#758078] uppercase">Selected</div>
              <div className="text-lg font-bold font-mono text-[#202923] dark:text-white">{selectedContacts.length}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#F7F8F5] dark:bg-[#141A17] border border-[#E8ECE7] dark:border-[#2C3731]">
              <div className="text-[10px] text-[#758078] uppercase">Eligible to Enrich</div>
              <div className="text-lg font-bold font-mono text-[#3D8060]">{needWork.length}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#F7F8F5] dark:bg-[#141A17] border border-[#E8ECE7] dark:border-[#2C3731]">
              <div className="text-[10px] text-[#758078] uppercase">Credits Needed</div>
              <div className="text-lg font-bold font-mono text-[#203C34] dark:text-[#8BB09D]">{totalCreditsNeeded}</div>
            </div>
          </div>

          {optedOutCount > 0 && (
            <div className="p-3 rounded-xl bg-[#B85D57]/10 border border-[#B85D57]/30 text-[#B85D57] flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>
                {optedOutCount} contact(s) are on the GDPR suppression list and will be automatically skipped.
              </span>
            </div>
          )}

          {/* Reveal Type choice */}
          <div className="space-y-2">
            <label className="font-semibold text-[#202923] dark:text-white">
              Enrichment Scope
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRevealType('email')}
                disabled={isProcessing}
                className={`p-3 rounded-xl border text-left transition-all ${
                  revealType === 'email'
                    ? 'border-[#203C34] bg-[#E9EEE9]/40 dark:bg-[#25332C]/40 font-semibold'
                    : 'border-[#E8ECE7] dark:border-[#2C3731]'
                }`}
              >
                <div className="font-semibold text-[#202923] dark:text-white">Business Emails</div>
                <div className="text-[10px] text-[#758078] font-mono">5 credits / lead</div>
              </button>

              <button
                type="button"
                onClick={() => setRevealType('phone')}
                disabled={isProcessing}
                className={`p-3 rounded-xl border text-left transition-all ${
                  revealType === 'phone'
                    ? 'border-[#203C34] bg-[#E9EEE9]/40 dark:bg-[#25332C]/40 font-semibold'
                    : 'border-[#E8ECE7] dark:border-[#2C3731]'
                }`}
              >
                <div className="font-semibold text-[#202923] dark:text-white">Phone Numbers</div>
                <div className="text-[10px] text-[#758078] font-mono">10 credits / lead</div>
              </button>

              <button
                type="button"
                onClick={() => setRevealType('combined')}
                disabled={isProcessing}
                className={`p-3 rounded-xl border text-left transition-all ${
                  revealType === 'combined'
                    ? 'border-[#203C34] bg-[#E9EEE9]/40 dark:bg-[#25332C]/40 font-semibold'
                    : 'border-[#E8ECE7] dark:border-[#2C3731]'
                }`}
              >
                <div className="font-semibold text-[#202923] dark:text-white">Combined</div>
                <div className="text-[10px] text-[#758078] font-mono">15 credits / lead</div>
              </button>
            </div>
          </div>

          {/* Balance comparison */}
          <div className="p-3.5 rounded-xl bg-[#F7F8F5] dark:bg-[#141A17] border border-[#E8ECE7] dark:border-[#2C3731] space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[#758078]">Available Wallet Balance:</span>
              <span className="font-mono font-semibold text-[#202923] dark:text-white">{user.credits.toLocaleString()} credits</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#758078]">Required for this batch:</span>
              <span className="font-mono font-bold text-[#203C34] dark:text-[#8BB09D]">{totalCreditsNeeded.toLocaleString()} credits</span>
            </div>
            <div className="flex justify-between border-t border-[#E8ECE7] dark:border-[#2C3731] pt-1">
              <span className="text-[#758078]">Remaining balance after job:</span>
              <span className={`font-mono font-bold ${canAfford ? 'text-[#3D8060]' : 'text-[#B85D57]'}`}>
                {canAfford ? `${(user.credits - totalCreditsNeeded).toLocaleString()} credits` : 'Insufficient Funds (Blocked)'}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          {isProcessing && (
            <div className="space-y-2 animate-fade-in">
              <div className="flex justify-between text-[11px] text-[#758078] font-mono">
                <span>Dispatching waterfall to Prospeo & Findymail...</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full bg-[#E8ECE7] dark:bg-[#2C3731] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#203C34] h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-[#F7F8F5] dark:bg-[#141A17] border-t border-[#E8ECE7] dark:border-[#2C3731] flex justify-end space-x-3">
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
            onClick={handleStartBulkJob}
            disabled={isProcessing || !canAfford || needWork.length === 0}
            className={`px-5 py-2 rounded-xl text-xs font-semibold text-white transition-all shadow-subtle flex items-center space-x-2 ${
              canAfford && needWork.length > 0 && !isProcessing
                ? 'bg-[#203C34] hover:bg-[#2c544a]'
                : 'bg-[#758078] opacity-50 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E9EEE9]" />
            <span>Start Bulk Enrichment ({totalCreditsNeeded} credits)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
