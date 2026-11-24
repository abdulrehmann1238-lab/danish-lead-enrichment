import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const { user, contacts, activities, showToast } = useApp();
  const [dateRange, setDateRange] = useState<'30d' | '90d' | '12m'>('30d');

  // Chart data
  const volumeData = [
    { date: 'Week 1', emails: 120, phones: 45, credits: 1050 },
    { date: 'Week 2', emails: 185, phones: 62, credits: 1545 },
    { date: 'Week 3', emails: 240, phones: 95, credits: 2150 },
    { date: 'Week 4', emails: 310, phones: 110, credits: 2650 },
  ];

  const providerShareData = [
    { name: 'Prospeo (Email & SMTP)', value: 44, color: '#203C34' },
    { name: 'Findymail (Pattern match)', value: 28, color: '#739181' },
    { name: 'ContactOut (Direct phone)', value: 15, color: '#C18A45' },
    { name: 'Coresignal (Workforce)', value: 9, color: '#E9E5DC' },
    { name: 'Forager (SMB signals)', value: 4, color: '#558779' },
  ];

  const industryData = [
    { name: 'Technology', count: 540 },
    { name: 'Finance', count: 320 },
    { name: 'Manufacturing', count: 280 },
    { name: 'Healthcare', count: 210 },
    { name: 'Construction', count: 180 },
    { name: 'Consulting', count: 160 },
  ];

  const handleExportCSV = () => {
    showToast({
      type: 'success',
      title: 'Analytics Report Exported',
      description: 'Downloaded LeadEnrich_Performance_Analytics.csv',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#202923] dark:text-white">
            Analytics & Consumption
          </h1>
          <p className="text-xs sm:text-sm text-[#758078] dark:text-[#8E9C93] mt-1">
            Real-time telemetry on lead discovery, waterfall match rates, and credit consumption.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-white dark:bg-[#1C2420] text-xs font-semibold text-[#202923] dark:text-white hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] flex items-center space-x-1.5 shadow-subtle"
          >
            <Download className="w-3.5 h-3.5 text-[#739181]" />
            <span>Export CSV Report</span>
          </button>
        </div>
      </div>

      {/* Top 6 Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card">
          <div className="text-[10px] uppercase font-mono text-[#758078] font-semibold">Contacts Discovered</div>
          <div className="text-xl font-bold font-mono text-[#202923] dark:text-white mt-1">15,000</div>
          <div className="text-[10px] text-[#3D8060] font-mono mt-0.5">+14% MoM</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card">
          <div className="text-[10px] uppercase font-mono text-[#758078] font-semibold">Emails Revealed</div>
          <div className="text-xl font-bold font-mono text-[#203C34] dark:text-[#8BB09D] mt-1">2,140</div>
          <div className="text-[10px] text-[#758078] mt-0.5">5 credits / ea</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card">
          <div className="text-[10px] uppercase font-mono text-[#758078] font-semibold">Phones Revealed</div>
          <div className="text-xl font-bold font-mono text-[#202923] dark:text-white mt-1">346</div>
          <div className="text-[10px] text-[#758078] mt-0.5">10 credits / ea</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card">
          <div className="text-[10px] uppercase font-mono text-[#758078] font-semibold">Credits Consumed</div>
          <div className="text-xl font-bold font-mono text-[#C18A45] mt-1">14,160</div>
          <div className="text-[10px] text-[#758078] mt-0.5">Strict ledger balance</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card">
          <div className="text-[10px] uppercase font-mono text-[#758078] font-semibold">Success Rate</div>
          <div className="text-xl font-bold font-mono text-[#3D8060] mt-1">98.4%</div>
          <div className="text-[10px] text-[#758078] mt-0.5">Waterfall confirmed</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card">
          <div className="text-[10px] uppercase font-mono text-[#758078] font-semibold">Avg Cost / Lead</div>
          <div className="text-xl font-bold font-mono text-[#202923] dark:text-white mt-1">6.8 cr</div>
          <div className="text-[10px] text-[#758078] mt-0.5">Highly efficient</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Enrichment Chart */}
        <div className="lg:col-span-8 p-5 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-bold text-[#202923] dark:text-white">
              Weekly Enrichment Trajectory
            </h3>
            <span className="text-[11px] font-mono text-[#758078]">Emails vs Phones</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8ECE7" opacity={0.6} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#758078' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#758078' }} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E8ECE7', fontSize: '12px' }} />
                <Bar dataKey="emails" fill="#203C34" radius={[4, 4, 0, 0]} name="Business Emails" />
                <Bar dataKey="phones" fill="#739181" radius={[4, 4, 0, 0]} name="Direct Phones" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Provider Usage Distribution */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-display text-sm font-bold text-[#202923] dark:text-white">
              Provider Share
            </h3>
            <p className="text-[11px] text-[#758078]">Waterfall resolution source</p>
          </div>

          <div className="h-44 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={providerShareData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value">
                  {providerShareData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E8ECE7', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-[11px]">
            {providerShareData.map((p, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-[#202923] dark:text-white truncate max-w-[150px]">{p.name}</span>
                </span>
                <span className="font-mono text-[#758078]">{p.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Industry Breakdown Bar Chart */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-4">
        <h3 className="font-display text-sm font-bold text-[#202923] dark:text-white">
          Contact Acquisition by Danish Industry
        </h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={industryData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E8ECE7" opacity={0.6} />
              <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#758078' }} />
              <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#202923' }} />
              <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E8ECE7', fontSize: '12px' }} />
              <Bar dataKey="count" fill="#739181" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
