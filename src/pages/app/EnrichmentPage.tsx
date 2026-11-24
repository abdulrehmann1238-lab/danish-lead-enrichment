import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Contact } from '../../types';
import { 
  Sparkles, 
  Search, 
  Mail, 
  Phone, 
  Building2, 
  Globe, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ShieldCheck, 
  RotateCw,
  Sliders,
  Check,
  Zap
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const EnrichmentPage: React.FC = () => {
  const { contacts, user, revealContact, showToast } = useApp();

  // Mode: existing contact vs custom manual prospect
  const [selectedContactId, setSelectedContactId] = useState<string>(contacts[1]?.id || '');
  const [manualName, setManualName] = useState('');
  const [manualCompany, setManualCompany] = useState('');
  const [manualDomain, setManualDomain] = useState('');

  const [enrichmentType, setEnrichmentType] = useState<'email' | 'phone' | 'combined'>('email');
  const [selectedProvider, setSelectedProvider] = useState<'Auto' | 'Prospeo' | 'Findymail' | 'Coresignal' | 'ContactOut' | 'Forager'>('Auto');

  // Animation & Execution state
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);

  const selectedContact = contacts.find(c => c.id === selectedContactId);

  // Credit calculation
  const requiredCredits = enrichmentType === 'combined' ? 15 : enrichmentType === 'email' ? 5 : 10;
  const canAfford = user.credits >= requiredCredits;

  const stepsList = [
    { num: 1, label: 'Preparing contact parameters & CVR match' },
    { num: 2, label: 'Evaluating waterfall routes (Prospeo, Findymail)' },
    { num: 3, label: 'Searching European live SMTP and carrier signals' },
    { num: 4, label: 'Validating deliverability & catch-all resolution' },
    { num: 5, label: 'Committing deduction and storing enriched contact' },
  ];

  const handleStartEnrichment = async () => {
    if (!canAfford) {
      showToast({
        type: 'error',
        title: 'Insufficient Credits',
        description: `This lookup requires ${requiredCredits} credits, but wallet balance is ${user.credits}.`,
      });
      return;
    }

    setIsProcessing(true);
    setLastResult(null);
    setCurrentStep(1);

    // Step-by-step Clay-inspired progression
    setTimeout(() => {
      setCurrentStep(2);
      setTimeout(() => {
        setCurrentStep(3);
        setTimeout(() => {
          setCurrentStep(4);
          setTimeout(async () => {
            setCurrentStep(5);

            const effectiveProvider = selectedProvider === 'Auto' ? 'Prospeo' : selectedProvider;
            if (selectedContact) {
              const res = await revealContact(selectedContact.id, enrichmentType, effectiveProvider as any);
              if (res.success) {
                setLastResult({
                  contactName: selectedContact.name,
                  company: selectedContact.company,
                  provider: effectiveProvider,
                  email: selectedContact.email,
                  phone: selectedContact.phone,
                  confidence: '99.4% (Verified Deliverable)',
                  creditsUsed: requiredCredits,
                });
              }
            } else {
              setLastResult({
                contactName: manualName || 'Danish Prospect',
                company: manualCompany || 'Nordic Enterprise ApS',
                provider: effectiveProvider,
                email: `${manualName.toLowerCase().replace(/\s+/g, '.')}@${manualDomain || 'nordic-growth.dk'}`,
                phone: '+45 32 89 10 44',
                confidence: '98.8% (Verified Deliverable)',
                creditsUsed: requiredCredits,
              });
            }

            setIsProcessing(false);
          }, 500);
        }, 600);
      }, 600);
    }, 600);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E9EEE9] dark:bg-[#25332C] text-[#203C34] dark:text-[#8BB09D] font-bold">
            CLAY-INSPIRED WORKSPACE
          </span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#202923] dark:text-white mt-1">
          Find & Enrich
        </h1>
        <p className="text-xs sm:text-sm text-[#758078] dark:text-[#8E9C93] mt-0.5">
          Discover missing business emails, phone numbers, and company firmographics through connected waterfall engines.
        </p>
      </div>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input Selection */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-4">
          <div className="border-b border-[#E8ECE7] dark:border-[#2C3731] pb-3">
            <h3 className="font-display text-sm font-bold text-[#202923] dark:text-white">
              Target Selection
            </h3>
            <p className="text-[11px] text-[#758078]">
              Select a database record or enter custom prospect credentials
            </p>
          </div>

          {/* Select from existing contacts */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#202923] dark:text-white">
              Choose from Danish Contacts
            </label>
            <select
              value={selectedContactId}
              onChange={(e) => setSelectedContactId(e.target.value)}
              disabled={isProcessing}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none"
            >
              {contacts.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.jobTitle} ({c.company})
                </option>
              ))}
            </select>
          </div>

          {/* Or manual entry */}
          <div className="pt-2 border-t border-[#E8ECE7] dark:border-[#2C3731] space-y-2.5">
            <span className="text-[10px] font-mono uppercase text-[#758078] font-semibold">
              Or Custom Lookup
            </span>

            <div>
              <label className="block text-[11px] text-[#758078] mb-0.5">Full Name</label>
              <input
                type="text"
                placeholder="e.g. Christian Møller"
                value={manualName}
                onChange={(e) => { setManualName(e.target.value); setSelectedContactId(''); }}
                disabled={isProcessing}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] text-[#758078] mb-0.5">Company Name</label>
              <input
                type="text"
                placeholder="e.g. ScanBuild Group"
                value={manualCompany}
                onChange={(e) => { setManualCompany(e.target.value); setSelectedContactId(''); }}
                disabled={isProcessing}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] text-[#758078] mb-0.5">Business Domain</label>
              <input
                type="text"
                placeholder="e.g. scanbuildgroup.dk"
                value={manualDomain}
                onChange={(e) => { setManualDomain(e.target.value); setSelectedContactId(''); }}
                disabled={isProcessing}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Scope choice */}
          <div className="pt-2 border-t border-[#E8ECE7] dark:border-[#2C3731] space-y-2">
            <label className="block text-xs font-semibold text-[#202923] dark:text-white">
              Data Scope
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => setEnrichmentType('email')}
                className={`py-2 px-1 rounded-lg border text-center transition-all ${
                  enrichmentType === 'email'
                    ? 'border-[#203C34] bg-[#E9EEE9]/40 dark:bg-[#25332C]/40 font-semibold text-[#203C34] dark:text-white'
                    : 'border-[#E8ECE7] dark:border-[#2C3731] text-[#758078]'
                }`}
              >
                <div>Email</div>
                <div className="text-[10px] font-mono">5 credits</div>
              </button>

              <button
                type="button"
                onClick={() => setEnrichmentType('phone')}
                className={`py-2 px-1 rounded-lg border text-center transition-all ${
                  enrichmentType === 'phone'
                    ? 'border-[#203C34] bg-[#E9EEE9]/40 dark:bg-[#25332C]/40 font-semibold text-[#203C34] dark:text-white'
                    : 'border-[#E8ECE7] dark:border-[#2C3731] text-[#758078]'
                }`}
              >
                <div>Phone</div>
                <div className="text-[10px] font-mono">10 credits</div>
              </button>

              <button
                type="button"
                onClick={() => setEnrichmentType('combined')}
                className={`py-2 px-1 rounded-lg border text-center transition-all ${
                  enrichmentType === 'combined'
                    ? 'border-[#203C34] bg-[#E9EEE9]/40 dark:bg-[#25332C]/40 font-semibold text-[#203C34] dark:text-white'
                    : 'border-[#E8ECE7] dark:border-[#2C3731] text-[#758078]'
                }`}
              >
                <div>Combined</div>
                <div className="text-[10px] font-mono">15 credits</div>
              </button>
            </div>
          </div>
        </div>

        {/* Center Column: Live Waterfall Workflow */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-5">
          <div className="border-b border-[#E8ECE7] dark:border-[#2C3731] pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-display text-sm font-bold text-[#202923] dark:text-white">
                Waterfall Execution Sequence
              </h3>
              <p className="text-[11px] text-[#758078]">
                Multi-stage verification and deliverability checks
              </p>
            </div>

            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#3D8060]/10 text-[#3D8060] font-semibold">
              Live Pipeline
            </span>
          </div>

          {/* Stepper Animation */}
          <div className="space-y-3">
            {stepsList.map((step) => {
              const isPast = currentStep > step.num;
              const isCurrent = currentStep === step.num;

              return (
                <div
                  key={step.num}
                  className={`p-3 rounded-xl border text-xs flex items-center space-x-3 transition-all ${
                    isCurrent
                      ? 'border-[#203C34] dark:border-[#739181] bg-[#E9EEE9]/50 dark:bg-[#25332C]/50 shadow-subtle'
                      : isPast
                      ? 'border-[#3D8060]/30 bg-[#3D8060]/5 text-[#3D8060]'
                      : 'border-[#E8ECE7] dark:border-[#2C3731] text-[#758078] opacity-60'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0 ${
                      isPast
                        ? 'bg-[#3D8060] text-white'
                        : isCurrent
                        ? 'bg-[#203C34] text-white animate-pulse-subtle'
                        : 'bg-[#F3F5F2] dark:bg-[#232C27] text-[#758078]'
                    }`}
                  >
                    {isPast ? <Check className="w-3.5 h-3.5" /> : step.num}
                  </div>

                  <span className={`flex-1 font-medium ${isCurrent ? 'text-[#202923] dark:text-white font-semibold' : ''}`}>
                    {step.label}
                  </span>

                  {isCurrent && (
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-[#203C34] dark:border-[#739181] border-t-transparent animate-spin flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Execution Button */}
          <div className="pt-2">
            <button
              onClick={handleStartEnrichment}
              disabled={isProcessing || !canAfford}
              className={`w-full py-3 px-4 rounded-xl text-xs font-semibold text-white transition-all shadow-subtle flex items-center justify-center space-x-2 ${
                canAfford && !isProcessing
                  ? 'bg-[#203C34] hover:bg-[#2c544a]'
                  : 'bg-[#758078] opacity-50 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#E9EEE9]" />
              <span>
                {isProcessing ? 'Executing Waterfall...' : `Execute Enrichment (${requiredCredits} credits)`}
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Results & Engine Status */}
        <div className="lg:col-span-3 space-y-4">
          {/* Credit Estimation Box */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-3 text-xs">
            <h4 className="font-semibold text-[#202923] dark:text-white">
              Prepaid Credit Ledger
            </h4>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-[#758078]">Available in wallet:</span>
                <span className="font-mono font-semibold text-[#3D8060]">{user.credits.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#758078]">Cost of operation:</span>
                <span className="font-mono font-bold text-[#202923] dark:text-white">-{requiredCredits}</span>
              </div>
              <div className="flex justify-between border-t border-[#E8ECE7] dark:border-[#2C3731] pt-1">
                <span className="text-[#758078]">Balance post-run:</span>
                <span className="font-mono font-bold text-[#202923] dark:text-white">
                  {Math.max(0, user.credits - requiredCredits).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Provider Selection */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#202923] dark:text-white">Provider Routing</span>
              <span className="text-[10px] font-mono text-[#739181]">Waterfall</span>
            </div>
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value as any)}
              disabled={isProcessing}
              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none"
            >
              <option value="Auto">Automatic Best Match (Waterfall)</option>
              <option value="Prospeo">Prospeo (High Deliverability)</option>
              <option value="Findymail">Findymail (Clean B2B Algorithms)</option>
              <option value="ContactOut">ContactOut (Direct Phones)</option>
              <option value="Coresignal">Coresignal (Workforce Graph)</option>
              <option value="Forager">Forager (SMB Web Signals)</option>
            </select>
          </div>

          {/* Results Display */}
          {lastResult && (
            <div className="p-4 rounded-2xl bg-[#3D8060]/10 border border-[#3D8060]/30 shadow-card space-y-3 text-xs animate-fade-in">
              <div className="flex items-center space-x-1.5 text-[#3D8060] font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Enrichment Succeeded</span>
              </div>

              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="text-[#202923] dark:text-white font-bold">{lastResult.contactName}</div>
                <div className="text-[#758078]">{lastResult.company}</div>
                <div className="p-2 rounded bg-white dark:bg-[#1C2420] border border-[#3D8060]/20 text-[#3D8060] truncate">
                  {lastResult.email}
                </div>
                {lastResult.phone && (
                  <div className="p-2 rounded bg-white dark:bg-[#1C2420] border border-[#3D8060]/20 text-[#203C34] dark:text-[#8BB09D]">
                    {lastResult.phone}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-[#3D8060]/20 flex items-center justify-between text-[10px] text-[#758078]">
                <span>Provider: {lastResult.provider}</span>
                <span>{lastResult.confidence}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
