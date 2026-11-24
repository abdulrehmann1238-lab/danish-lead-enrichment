import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  SlidersHorizontal, 
  Users, 
  Database, 
  Wallet, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  Server, 
  Search, 
  Check, 
  AlertTriangle 
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const AdminPage: React.FC = () => {
  const { contacts, companies, transactions, activities, optOuts, user } = useApp();
  const [userSearch, setUserSearch] = useState('');

  const mockUsers = [
    { id: 'usr-1', name: 'Alex Morgan', email: 'alex@lead-enrich.demo', company: 'Nordic Growth Studio', plan: user.plan, credits: user.credits, status: 'active', lastActive: 'Now' },
    { id: 'usr-2', name: 'Jens Lind', email: 'jens@aarhusdigital.dk', company: 'Aarhus Digital ApS', plan: 'annual_pro', credits: 4200, status: 'active', lastActive: '2h ago' },
    { id: 'usr-3', name: 'Freja Schmidt', email: 'freja@copenhagenvc.dk', company: 'Copenhagen Venture Partners', plan: 'free', credits: 450, status: 'active', lastActive: '1d ago' },
    { id: 'usr-4', name: 'Morten Toft', email: 'morten@jutlandtech.dk', company: 'Jutland Tech ApS', plan: 'free', credits: 820, status: 'idle', lastActive: '3d ago' },
  ];

  const filteredUsers = mockUsers.filter(u =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.company.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#203C34] text-white font-bold">
            PLATFORM INTERNAL ADMIN
          </span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#202923] dark:text-white mt-1">
          System Administration
        </h1>
        <p className="text-xs sm:text-sm text-[#758078] dark:text-[#8E9C93] mt-0.5">
          Tenant management, Danish CVR database statistics, provider health, and global audit queues.
        </p>
      </div>

      {/* Admin KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card">
          <div className="text-[10px] font-mono uppercase text-[#758078]">Total Registered Tenants</div>
          <div className="text-2xl font-bold font-mono text-[#202923] dark:text-white mt-1">1,248</div>
          <div className="text-[11px] text-[#3D8060] font-mono mt-0.5">+48 this week</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card">
          <div className="text-[10px] font-mono uppercase text-[#758078]">Active Annual Subscriptions</div>
          <div className="text-2xl font-bold font-mono text-[#203C34] dark:text-[#8BB09D] mt-1">384</div>
          <div className="text-[11px] text-[#758078] font-mono mt-0.5">Custom enterprise contracts</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card">
          <div className="text-[10px] font-mono uppercase text-[#758078]">Prepaid Credits Sold</div>
          <div className="text-2xl font-bold font-mono text-[#C18A45] mt-1">1,842,000</div>
          <div className="text-[11px] text-[#758078] font-mono mt-0.5">Stripe EU volume</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card">
          <div className="text-[10px] font-mono uppercase text-[#758078]">Active Opt-Out Exclusions</div>
          <div className="text-2xl font-bold font-mono text-[#B85D57] mt-1">{optOuts.length}</div>
          <div className="text-[11px] text-[#758078] font-mono mt-0.5">Art. 21 suppressions</div>
        </div>
      </div>

      {/* Tenant User Management */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-display text-base font-bold text-[#202923] dark:text-white">
            Workspace Accounts
          </h3>

          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-[#758078] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search user or company..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="border border-[#E8ECE7] dark:border-[#2C3731] rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5]/60 dark:bg-[#141A17]/60 text-[11px] font-semibold text-[#758078] uppercase">
                <th className="py-2.5 px-3">User & Workspace</th>
                <th className="py-2.5 px-3">Plan Tier</th>
                <th className="py-2.5 px-3">Credit Balance</th>
                <th className="py-2.5 px-3">Account Status</th>
                <th className="py-2.5 px-3 text-right">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECE7] dark:divide-[#2C3731]">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] transition-colors">
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-[#202923] dark:text-white">{u.name}</div>
                    <div className="text-[11px] text-[#758078]">{u.email} • {u.company}</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono capitalize">
                    {u.plan === 'annual_pro' ? 'Annual Pro' : 'Free Demo'}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-[#3D8060]">
                    {u.credits.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#3D8060]/10 text-[#3D8060] font-semibold">
                      {u.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-[11px] text-[#758078]">
                    {u.lastActive}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provider Health Monitor */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-4">
        <h3 className="font-display text-base font-bold text-[#202923] dark:text-white">
          Waterfall Enrichment Engine Health
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-3.5 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] space-y-1">
            <div className="font-semibold text-[#202923] dark:text-white">Prospeo</div>
            <div className="text-[#3D8060] font-mono text-[11px]">99.8% Uptime</div>
            <div className="text-[10px] text-[#758078]">480ms avg latency</div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] space-y-1">
            <div className="font-semibold text-[#202923] dark:text-white">Findymail</div>
            <div className="text-[#3D8060] font-mono text-[11px]">99.9% Uptime</div>
            <div className="text-[10px] text-[#758078]">320ms avg latency</div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] space-y-1">
            <div className="font-semibold text-[#202923] dark:text-white">ContactOut</div>
            <div className="text-[#3D8060] font-mono text-[11px]">99.4% Uptime</div>
            <div className="text-[10px] text-[#758078]">610ms avg latency</div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] space-y-1">
            <div className="font-semibold text-[#202923] dark:text-white">Coresignal</div>
            <div className="text-[#3D8060] font-mono text-[11px]">99.7% Uptime</div>
            <div className="text-[10px] text-[#758078]">510ms avg latency</div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] space-y-1">
            <div className="font-semibold text-[#202923] dark:text-white">CVR (Virk.dk)</div>
            <div className="text-[#3D8060] font-mono text-[11px]">100% Operational</div>
            <div className="text-[10px] text-[#758078]">Direct gov API feed</div>
          </div>
        </div>
      </div>
    </div>
  );
};
