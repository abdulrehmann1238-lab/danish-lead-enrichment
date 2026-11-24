import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CreditCard, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Download, 
  Clock, 
  Plus, 
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { PurchaseModal } from '../../components/wallet/PurchaseModal';

export const BillingPage: React.FC = () => {
  const { user, upgradeToAnnualPro, showToast } = useApp();
  const [purchasePack, setPurchasePack] = useState<any>(null);

  const invoices = [
    { id: 'INV-2026-001', date: '2026-11-20', amount: '€49.00', status: 'Paid', item: 'Starter Credit Pack (500 credits)' },
    { id: 'INV-2026-002', date: '2026-10-15', amount: '€149.00', status: 'Paid', item: 'Growth Credit Pack (2,000 credits)' },
    { id: 'INV-2026-003', date: '2026-09-01', amount: '€49.00', status: 'Paid', item: 'Starter Credit Pack (500 credits)' },
  ];

  const handleDownloadInvoice = (invId: string) => {
    showToast({
      type: 'success',
      title: 'Invoice Downloaded',
      description: `Downloaded tax receipt for ${invId} (PDF simulated).`,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#202923] dark:text-white">
          Billing & Subscriptions
        </h1>
        <p className="text-xs sm:text-sm text-[#758078] dark:text-[#8E9C93] mt-1">
          Manage your Danish workspace subscription tier, payment credentials, and invoice receipts.
        </p>
      </div>

      {/* Stripe Sandbox Mode Banner */}
      <div className="p-4 rounded-xl bg-[#E9EEE9]/60 dark:bg-[#25332C]/60 border border-[#739181]/40 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-[#3D8060] flex-shrink-0" />
          <span className="font-semibold text-[#203C34] dark:text-[#8BB09D]">
            Stripe European Billing Gateway: Active (Client Demo Sandbox)
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#758078]">Zero Real Charges</span>
      </div>

      {/* Current Plan Overview Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#E9EEE9] dark:bg-[#25332C] text-[#203C34] dark:text-[#8BB09D]">
              CURRENT SUBSCRIPTION
            </span>
            <div className="flex items-center space-x-3 mt-2">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#202923] dark:text-white">
                {user.plan === 'annual_pro' ? 'Annual Professional' : 'Free Database Access Tier'}
              </h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#3D8060]/10 text-[#3D8060] font-semibold">
                Active
              </span>
            </div>
            <p className="text-xs text-[#758078] dark:text-[#8E9C93] mt-1">
              {user.plan === 'annual_pro'
                ? 'Full access to all 15,000 Danish contacts unlocked with priority waterfall routing.'
                : '10,000 free contacts available. 5,000 premium executive contacts require Annual Pro.'}
            </p>
          </div>

          {user.plan !== 'annual_pro' && (
            <button
              onClick={upgradeToAnnualPro}
              className="px-5 py-2.5 rounded-xl bg-[#203C34] text-white text-xs font-semibold hover:bg-[#2c544a] transition-all shadow-subtle flex items-center space-x-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E9EEE9]" />
              <span>Simulate Annual Pro Upgrade</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E8ECE7] dark:border-[#2C3731] text-xs">
          <div>
            <div className="text-[#758078]">Renewal Date</div>
            <div className="font-semibold text-[#202923] dark:text-white font-mono mt-0.5">{user.annualRenewalDate}</div>
          </div>
          <div>
            <div className="text-[#758078]">Database Coverage</div>
            <div className="font-semibold text-[#202923] dark:text-white font-mono mt-0.5">
              {user.plan === 'annual_pro' ? '15,000 (100%)' : '10,000 (67%)'}
            </div>
          </div>
          <div>
            <div className="text-[#758078]">Prepaid Wallet</div>
            <div className="font-semibold text-[#3D8060] font-mono mt-0.5">{user.credits.toLocaleString()} credits</div>
          </div>
        </div>
      </div>

      {/* Payment Method Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-4">
        <h3 className="font-display text-base font-bold text-[#202923] dark:text-white">
          Payment Method
        </h3>

        <div className="p-4 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-7 rounded bg-[#203C34] text-white flex items-center justify-center font-bold text-[10px] font-mono">
              VISA
            </div>
            <div>
              <div className="font-semibold text-[#202923] dark:text-white">Visa ending in •••• 4242</div>
              <div className="text-[11px] text-[#758078]">Expires 12/28 • Default corporate card</div>
            </div>
          </div>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#3D8060]/10 text-[#3D8060] font-semibold">
            Verified
          </span>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="space-y-3">
        <h3 className="font-display text-base font-bold text-[#202923] dark:text-white">
          Invoice Receipts
        </h3>

        <div className="bg-white dark:bg-[#1C2420] rounded-2xl border border-[#E8ECE7] dark:border-[#2C3731] shadow-card overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5]/60 dark:bg-[#141A17]/60 text-[11px] font-semibold text-[#758078] uppercase">
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Description</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECE7] dark:divide-[#2C3731]">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-[#202923] dark:text-white">{inv.id}</td>
                  <td className="py-3 px-3 font-mono text-[11px] text-[#758078]">{inv.date}</td>
                  <td className="py-3 px-3 text-[#202923] dark:text-white">{inv.item}</td>
                  <td className="py-3 px-3 font-mono font-bold text-[#202923] dark:text-white">{inv.amount}</td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#3D8060]/10 text-[#3D8060] font-semibold">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDownloadInvoice(inv.id)}
                      className="text-xs font-semibold text-[#203C34] dark:text-[#8BB09D] hover:underline"
                    >
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
