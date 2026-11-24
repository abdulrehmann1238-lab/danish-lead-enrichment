import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreditTransaction } from '../../types';
import { 
  Wallet, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  ArrowDownRight, 
  ArrowUpRight, 
  Lock, 
  AlertTriangle, 
  Layers, 
  Cpu, 
  Database, 
  HelpCircle,
  Clock,
  RotateCcw
} from 'lucide-react';
import { PurchaseModal } from '../../components/wallet/PurchaseModal';

export const CreditWalletPage: React.FC = () => {
  const { user, transactions } = useApp();
  const [selectedPack, setSelectedPack] = useState<any>(null);

  const packs = [
    {
      name: 'Starter',
      credits: 500,
      description: 'Ideal for testing campaigns and single list validations',
      rate: '500 email reveals or 50 phone reveals',
      badge: 'Flexible',
    },
    {
      name: 'Growth',
      credits: 2000,
      description: 'Best for active monthly prospecting across Nordic regions',
      rate: '400 email reveals or 200 phone reveals',
      badge: 'Popular',
      highlight: true,
    },
    {
      name: 'Scale',
      credits: 5000,
      description: 'Enterprise volume for extensive CRM enrichment pipelines',
      rate: '1,000 email reveals or 500 phone reveals',
      badge: 'Volume Value',
    },
  ];

  // Usage statistics
  const totalUsed = transactions
    .filter(t => t.credits < 0)
    .reduce((acc, t) => acc + Math.abs(t.credits), 0);

  const totalPurchased = transactions
    .filter(t => t.credits > 0)
    .reduce((acc, t) => acc + t.credits, 0);

  const usagePercent = Math.min(100, Math.round((totalUsed / (totalPurchased || 1)) * 100));

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Top Header */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#202923] dark:text-white">
          Prepaid Credit Wallet
        </h1>
        <p className="text-xs sm:text-sm text-[#758078] dark:text-[#8E9C93] mt-1">
          Monitor your enrichment balance, manage credit packs, and review financial ledger transactions.
        </p>
      </div>

      {/* Top Wallet Hero Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase font-bold tracking-wider text-[#739181]">
              Available Prepaid Balance
            </span>
            <div className="flex items-baseline space-x-3 mt-1">
              <span className="font-display text-4xl sm:text-5xl font-extrabold text-[#203C34] dark:text-white font-mono">
                {user.credits.toLocaleString()}
              </span>
              <span className="text-sm font-semibold text-[#758078]">credits</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSelectedPack(packs[1])}
              className="px-5 py-2.5 rounded-xl bg-[#203C34] text-white text-xs font-semibold hover:bg-[#2c544a] transition-all shadow-subtle flex items-center space-x-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E9EEE9]" />
              <span>Purchase Credit Pack</span>
            </button>
          </div>
        </div>

        {/* Usage Progress Meter */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-[#758078] font-mono">
            <span>Monthly Consumption: {totalUsed.toLocaleString()} credits</span>
            <span>{usagePercent}% of lifetime credits consumed</span>
          </div>
          <div className="w-full bg-[#E8ECE7] dark:bg-[#2C3731] h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#203C34] dark:bg-[#739181] h-full transition-all duration-500 rounded-full"
              style={{ width: `${usagePercent}%` }}
            />
          </div>
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#E8ECE7] dark:border-[#2C3731] text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#3D8060]/10 text-[#3D8060] flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <div className="text-[#758078]">Strict Protection</div>
              <div className="font-semibold text-[#202923] dark:text-white">No negative balances</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#739181]/15 text-[#203C34] dark:text-[#8BB09D] flex items-center justify-center font-bold">
              0
            </div>
            <div>
              <div className="text-[#758078]">No Overages</div>
              <div className="font-semibold text-[#202923] dark:text-white">Zero surprise bills</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#C18A45]/15 text-[#C18A45] flex items-center justify-center font-bold">
              ∞
            </div>
            <div>
              <div className="text-[#758078]">Lifetime Rollover</div>
              <div className="font-semibold text-[#202923] dark:text-white">Credits do not expire</div>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Packs Grid */}
      <div className="space-y-3">
        <h3 className="font-display text-lg font-bold text-[#202923] dark:text-white">
          Available Prepaid Credit Packs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packs.map((pack) => (
            <div
              key={pack.name}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                pack.highlight
                  ? 'border-[#203C34] dark:border-[#739181] bg-white dark:bg-[#1C2420] shadow-dropdown relative'
                  : 'border-[#E8ECE7] dark:border-[#2C3731] bg-white dark:bg-[#1C2420] shadow-card hover:shadow-dropdown'
              }`}
            >
              {pack.highlight && (
                <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#203C34] text-white text-[10px] font-mono uppercase font-bold">
                  Recommended
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-base text-[#202923] dark:text-white">
                    {pack.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E9EEE9] dark:bg-[#25332C] text-[#203C34] dark:text-[#8BB09D] font-bold">
                    {pack.badge}
                  </span>
                </div>

                <div className="flex items-baseline space-x-1.5 pt-1">
                  <span className="font-display text-3xl font-extrabold text-[#202923] dark:text-white font-mono">
                    +{pack.credits.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#758078]">credits</span>
                </div>

                <p className="text-xs text-[#758078] dark:text-[#8E9C93] leading-relaxed">
                  {pack.description}
                </p>

                <div className="pt-2 text-[11px] font-mono text-[#739181]">
                  {pack.rate}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8ECE7] dark:border-[#2C3731]">
                <button
                  onClick={() => setSelectedPack(pack)}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    pack.highlight
                      ? 'bg-[#203C34] text-white hover:bg-[#2c544a]'
                      : 'border border-[#E8ECE7] dark:border-[#2C3731] hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] text-[#202923] dark:text-white'
                  }`}
                >
                  Purchase Pack (Demo)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Credit Safety Architecture Demonstration Panel */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#E9EEE9]/40 dark:bg-[#1C2420] border-2 border-[#739181]/40 shadow-card space-y-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 text-[11px] font-mono font-bold text-[#203C34] dark:text-[#8BB09D] uppercase">
              <ShieldCheck className="w-4 h-4 text-[#3D8060]" />
              <span>Production Architecture Specification</span>
            </div>
            <h3 className="font-display text-lg font-bold text-[#202923] dark:text-white">
              Concurrency-Safe Credit Accounting & Race Condition Prevention
            </h3>
            <p className="text-xs text-[#758078] dark:text-[#8E9C93] max-w-2xl leading-relaxed">
              How LeadEnrich ensures financial integrity and prevents duplicate spending when concurrent waterfall enrichment requests arrive at high throughput.
            </p>
          </div>
        </div>

        {/* Visual Flowchart */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#141A17] border border-[#E8ECE7] dark:border-[#2C3731] font-mono text-xs overflow-x-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between text-center gap-2 text-[11px]">
            <div className="p-2.5 rounded-lg bg-[#F7F8F5] dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] flex-1">
              <div className="font-bold text-[#202923] dark:text-white">1. REQUEST INGESTION</div>
              <div className="text-[10px] text-[#758078]">Idempotency key generated</div>
            </div>

            <span className="text-[#739181] font-bold">→</span>

            <div className="p-2.5 rounded-lg bg-[#F7F8F5] dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] flex-1">
              <div className="font-bold text-[#202923] dark:text-white">2. ATOMIC HOLD</div>
              <div className="text-[10px] text-[#758078]">Credits temporarily locked</div>
            </div>

            <span className="text-[#739181] font-bold">→</span>

            <div className="p-2.5 rounded-lg bg-[#F7F8F5] dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] flex-1">
              <div className="font-bold text-[#202923] dark:text-white">3. WATERFALL RUN</div>
              <div className="text-[10px] text-[#758078]">Dispatched to Prospeo/Findymail</div>
            </div>

            <span className="text-[#739181] font-bold">→</span>

            <div className="p-2.5 rounded-lg bg-[#3D8060]/10 border border-[#3D8060]/30 text-[#3D8060] flex-1">
              <div className="font-bold">4. COMMIT OR RELEASE</div>
              <div className="text-[10px]">Zero cost on failed queries</div>
            </div>
          </div>
        </div>

        {/* Technical Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="space-y-1">
            <div className="font-bold text-[#202923] dark:text-white flex items-center space-x-1.5">
              <Database className="w-3.5 h-3.5 text-[#739181]" />
              <span>Atomic Postgres Transactions</span>
            </div>
            <p className="text-[11px] text-[#758078] leading-relaxed">
              Row-level locking (`SELECT ... FOR UPDATE`) inside Neon PostgreSQL prevents simultaneous reads from deducting twice.
            </p>
          </div>

          <div className="space-y-1">
            <div className="font-bold text-[#202923] dark:text-white flex items-center space-x-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#739181]" />
              <span>Distributed Redis Locks</span>
            </div>
            <p className="text-[11px] text-[#758078] leading-relaxed">
              Upstash Redis distributed mutex locks guard against millisecond bursts across multi-region serverless workers.
            </p>
          </div>

          <div className="space-y-1">
            <div className="font-bold text-[#202923] dark:text-white flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-[#739181]" />
              <span>Unique Idempotency Keys</span>
            </div>
            <p className="text-[11px] text-[#758078] leading-relaxed">
              Every contact lookup request bears a unique SHA-256 fingerprint; repeated clicks immediately return cached findings.
            </p>
          </div>

          <div className="space-y-1">
            <div className="font-bold text-[#202923] dark:text-white flex items-center space-x-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-[#739181]" />
              <span>Automatic Rollback</span>
            </div>
            <p className="text-[11px] text-[#758078] leading-relaxed">
              If all waterfall enrichment providers report 0 valid match, held credits are instantly released back to the wallet ledger.
            </p>
          </div>
        </div>
      </div>

      {/* Credit Transaction Ledger Table */}
      <div className="space-y-3">
        <h3 className="font-display text-lg font-bold text-[#202923] dark:text-white">
          Credit Transaction Ledger
        </h3>

        <div className="bg-white dark:bg-[#1C2420] rounded-2xl border border-[#E8ECE7] dark:border-[#2C3731] shadow-card overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5]/60 dark:bg-[#141A17]/60 text-[11px] font-semibold text-[#758078] uppercase tracking-wider">
                <th className="py-3 px-4">Transaction Description</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Credits</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Reference</th>
                <th className="py-3 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECE7] dark:divide-[#2C3731]">
              {transactions.map((tx) => {
                const isAddition = tx.credits > 0;
                return (
                  <tr key={tx.id} className="hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#202923] dark:text-white">
                      {tx.description}
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-[#758078] capitalize">
                      {tx.type.replace('_', ' ')}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold">
                      <span className={isAddition ? 'text-[#3D8060]' : 'text-[#202923] dark:text-white'}>
                        {isAddition ? `+${tx.credits.toLocaleString()}` : `${tx.credits.toLocaleString()}`}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#3D8060]/10 text-[#3D8060]">
                        <Check className="w-3 h-3" />
                        <span>Completed</span>
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-[#758078]">
                      {tx.reference}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-[11px] text-[#758078]">
                      {tx.date}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Purchase Modal */}
      <PurchaseModal
        pack={selectedPack}
        onClose={() => setSelectedPack(null)}
      />
    </div>
  );
};
