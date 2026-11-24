import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Sparkles, 
  Wallet, 
  Database, 
  ArrowUpRight, 
  Calendar, 
  Download, 
  CheckCircle2, 
  Clock, 
  Building2, 
  ListFilter, 
  ExternalLink,
  Plus,
  ShieldCheck,
  TrendingUp,
  Activity
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Badge } from '../../components/common/Badge';

export const DashboardPage: React.FC = () => {
  const { user, contacts, activities, showToast } = useApp();
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');
  const navigate = useNavigate();

  // Mock enrichment activity time series
  const data30d = [
    { date: 'Nov 1', enrichments: 42, credits: 380 },
    { date: 'Nov 5', enrichments: 68, credits: 540 },
    { date: 'Nov 9', enrichments: 55, credits: 420 },
    { date: 'Nov 13', enrichments: 89, credits: 710 },
    { date: 'Nov 17', enrichments: 74, credits: 590 },
    { date: 'Nov 21', enrichments: 112, credits: 890 },
    { date: 'Nov 25', enrichments: 96, credits: 780 },
  ];

  const data7d = [
    { date: 'Nov 19', enrichments: 74, credits: 590 },
    { date: 'Nov 20', enrichments: 82, credits: 640 },
    { date: 'Nov 21', enrichments: 112, credits: 890 },
    { date: 'Nov 22', enrichments: 95, credits: 720 },
    { date: 'Nov 23', enrichments: 65, credits: 510 },
    { date: 'Nov 24', enrichments: 88, credits: 690 },
    { date: 'Nov 25', enrichments: 96, credits: 780 },
  ];

  const data90d = [
    { date: 'Sep', enrichments: 680, credits: 5400 },
    { date: 'Oct', enrichments: 920, credits: 7300 },
    { date: 'Nov', enrichments: 886, credits: 6980 },
  ];

  const activeChartData = dateRange === '7d' ? data7d : dateRange === '30d' ? data30d : data90d;

  // Donut chart data: 10,000 Free vs 5,000 Premium
  const donutData = [
    { name: 'Free Database Contacts', value: 10000, color: '#739181' },
    { name: 'Premium Executive Contacts', value: 5000, color: '#203C34' },
  ];

  const handleExportReport = () => {
    showToast({
      type: 'success',
      title: 'Workspace Report Exported',
      description: 'Downloaded LeadEnrich_Q4_Performance_Report.csv',
    });
  };

  const recentContacts = contacts.slice(0, 6);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Top Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#202923] dark:text-white">
            Good morning, {user.name.split(' ')[0]}.
          </h1>
          <p className="text-xs sm:text-sm text-[#758078] dark:text-[#8E9C93] mt-1">
            Here's what's happening in your Danish prospecting workspace.
          </p>
        </div>

        {/* Date Selector & Export */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] bg-white dark:bg-[#1C2420] p-1 text-xs font-medium">
            <button
              onClick={() => setDateRange('7d')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                dateRange === '7d'
                  ? 'bg-[#203C34] text-white'
                  : 'text-[#758078] hover:text-[#202923] dark:hover:text-white'
              }`}
            >
              7d
            </button>
            <button
              onClick={() => setDateRange('30d')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                dateRange === '30d'
                  ? 'bg-[#203C34] text-white'
                  : 'text-[#758078] hover:text-[#202923] dark:hover:text-white'
              }`}
            >
              30d
            </button>
            <button
              onClick={() => setDateRange('90d')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                dateRange === '90d'
                  ? 'bg-[#203C34] text-white'
                  : 'text-[#758078] hover:text-[#202923] dark:hover:text-white'
              }`}
            >
              90d
            </button>
          </div>

          <button
            onClick={handleExportReport}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] bg-white dark:bg-[#1C2420] text-xs font-semibold text-[#202923] dark:text-white hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] transition-all shadow-subtle"
          >
            <Download className="w-3.5 h-3.5 text-[#739181]" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Available */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card hover:shadow-dropdown transition-all space-y-3">
          <div className="flex items-center justify-between text-xs text-[#758078] dark:text-[#8E9C93]">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Total Database</span>
            <Database className="w-4 h-4 text-[#739181]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#202923] dark:text-white">
              15,000
            </span>
            <span className="text-xs text-[#3D8060] font-medium flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +12%
            </span>
          </div>
          <div className="text-[11px] text-[#758078] flex items-center justify-between pt-1 border-t border-[#E8ECE7]/60 dark:border-[#2C3731]/60">
            <span>Danish CVR indexed</span>
            <span className="font-mono text-[#203C34] dark:text-[#8BB09D] font-semibold">100% verified</span>
          </div>
        </div>

        {/* Accessible Contacts */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card hover:shadow-dropdown transition-all space-y-3">
          <div className="flex items-center justify-between text-xs text-[#758078] dark:text-[#8E9C93]">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Accessible Contacts</span>
            <Users className="w-4 h-4 text-[#739181]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#202923] dark:text-white">
              {user.plan === 'annual_pro' ? '15,000' : '10,000'}
            </span>
            <span className="text-xs text-[#758078]">
              {user.plan === 'annual_pro' ? 'All unlocked' : 'Free tier'}
            </span>
          </div>
          <div className="text-[11px] text-[#758078] flex items-center justify-between pt-1 border-t border-[#E8ECE7]/60 dark:border-[#2C3731]/60">
            <span>{user.plan === 'annual_pro' ? 'Annual Pro Plan' : '5,000 Premium locked'}</span>
            <Link to="/app/contacts" className="text-[#203C34] dark:text-[#8BB09D] font-semibold hover:underline">
              Browse
            </Link>
          </div>
        </div>

        {/* Enriched Contacts */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card hover:shadow-dropdown transition-all space-y-3">
          <div className="flex items-center justify-between text-xs text-[#758078] dark:text-[#8E9C93]">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Enriched Contacts</span>
            <Sparkles className="w-4 h-4 text-[#3D8060]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#202923] dark:text-white">
              2,486
            </span>
            <span className="text-xs text-[#3D8060] font-medium flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +18.4%
            </span>
          </div>
          <div className="text-[11px] text-[#758078] flex items-center justify-between pt-1 border-t border-[#E8ECE7]/60 dark:border-[#2C3731]/60">
            <span>Waterfall verified</span>
            <span className="font-mono text-[#3D8060] font-semibold">98.2% valid</span>
          </div>
        </div>

        {/* Available Credits */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card hover:shadow-dropdown transition-all space-y-3">
          <div className="flex items-center justify-between text-xs text-[#758078] dark:text-[#8E9C93]">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Prepaid Credits</span>
            <Wallet className="w-4 h-4 text-[#C18A45]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#202923] dark:text-white font-mono">
              {user.credits.toLocaleString()}
            </span>
            <span className="text-xs text-[#758078]">available</span>
          </div>
          <div className="text-[11px] text-[#758078] flex items-center justify-between pt-1 border-t border-[#E8ECE7]/60 dark:border-[#2C3731]/60">
            <span>No negative balance</span>
            <Link to="/app/credits" className="text-[#203C34] dark:text-[#8BB09D] font-semibold hover:underline">
              + Top up
            </Link>
          </div>
        </div>
      </div>

      {/* Visualizations Grid: Area Chart + Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Enrichment Activity Area Chart */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-bold text-[#202923] dark:text-white">
                Enrichment Volume & Credit Consumption
              </h3>
              <p className="text-xs text-[#758078] dark:text-[#8E9C93]">
                Daily successful email and direct phone lookups across connected waterfall providers
              </p>
            </div>
            <div className="flex items-center space-x-4 text-xs font-mono">
              <span className="flex items-center space-x-1.5 text-[#203C34] dark:text-[#8BB09D]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#203C34] dark:bg-[#739181]" />
                <span>Reveals</span>
              </span>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="enrichColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#739181" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#739181" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8ECE7" opacity={0.6} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#758078' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#758078' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    border: '1px solid #E8ECE7',
                    fontSize: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="enrichments" 
                  stroke="#203C34" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#enrichColor)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Database Usage Donut Chart */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-display text-base font-bold text-[#202923] dark:text-white">
              Database Utilization
            </h3>
            <p className="text-xs text-[#758078] dark:text-[#8E9C93]">
              15,000 total Danish contacts breakdown
            </p>
          </div>

          <div className="h-44 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    border: '1px solid #E8ECE7',
                    fontSize: '12px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-display text-xl font-extrabold text-[#203C34] dark:text-white">
                15,000
              </span>
              <span className="text-[10px] text-[#758078] uppercase font-mono">Contacts</span>
            </div>
          </div>

          <div className="space-y-2 text-xs border-t border-[#E8ECE7] dark:border-[#2C3731] pt-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#739181]" />
                <span className="text-[#202923] dark:text-white">Free Database</span>
              </span>
              <span className="font-mono font-semibold text-[#758078]">10,000 (67%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#203C34]" />
                <span className="text-[#202923] dark:text-white">Premium Executive</span>
              </span>
              <span className="font-mono font-semibold text-[#758078]">5,000 (33%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <Link
          to="/app/contacts"
          className="p-4 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-white dark:bg-[#1C2420] hover:border-[#739181] hover:shadow-card transition-all text-left group"
        >
          <Users className="w-4 h-4 text-[#203C34] dark:text-[#8BB09D] mb-2 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-[#202923] dark:text-white">Find Contacts</div>
          <div className="text-[11px] text-[#758078]">Search 15k Danish leads</div>
        </Link>

        <Link
          to="/app/enrichment"
          className="p-4 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-white dark:bg-[#1C2420] hover:border-[#739181] hover:shadow-card transition-all text-left group"
        >
          <Sparkles className="w-4 h-4 text-[#3D8060] mb-2 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-[#202923] dark:text-white">Find & Enrich</div>
          <div className="text-[11px] text-[#758078]">Reveal email & phone</div>
        </Link>

        <Link
          to="/app/lists"
          className="p-4 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-white dark:bg-[#1C2420] hover:border-[#739181] hover:shadow-card transition-all text-left group"
        >
          <ListFilter className="w-4 h-4 text-[#739181] mb-2 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-[#202923] dark:text-white">Create List</div>
          <div className="text-[11px] text-[#758078]">Segment target accounts</div>
        </Link>

        <Link
          to="/app/credits"
          className="p-4 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-white dark:bg-[#1C2420] hover:border-[#739181] hover:shadow-card transition-all text-left group"
        >
          <Wallet className="w-4 h-4 text-[#C18A45] mb-2 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-[#202923] dark:text-white">Buy Credits</div>
          <div className="text-[11px] text-[#758078]">Starter, Growth, Scale</div>
        </Link>

        <Link
          to="/app/exports"
          className="p-4 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-white dark:bg-[#1C2420] hover:border-[#739181] hover:shadow-card transition-all text-left group"
        >
          <Download className="w-4 h-4 text-[#758078] mb-2 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-[#202923] dark:text-white">Export CSV</div>
          <div className="text-[11px] text-[#758078]">Download lead lists</div>
        </Link>
      </div>

      {/* Two Column Layout: Recent Prospects Table + Recent Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Prospects Table */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-bold text-[#202923] dark:text-white">
                Recent Prospects
              </h3>
              <p className="text-xs text-[#758078] dark:text-[#8E9C93]">
                Danish decision-makers identified in your recent searches
              </p>
            </div>
            <Link
              to="/app/contacts"
              className="text-xs font-semibold text-[#203C34] dark:text-[#8BB09D] hover:underline flex items-center space-x-1"
            >
              <span>View all database</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E8ECE7] dark:border-[#2C3731] text-[11px] font-semibold text-[#758078] uppercase tracking-wider">
                  <th className="py-2.5 px-3">Name</th>
                  <th className="py-2.5 px-3">Company</th>
                  <th className="py-2.5 px-3">Region</th>
                  <th className="py-2.5 px-3">Email Status</th>
                  <th className="py-2.5 px-3 text-right">Access Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECE7] dark:divide-[#2C3731]">
                {recentContacts.map((contact) => (
                  <tr 
                    key={contact.id} 
                    onClick={() => navigate('/app/contacts')}
                    className="hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-3">
                      <div className="font-semibold text-[#202923] dark:text-white">
                        {contact.name}
                      </div>
                      <div className="text-[11px] text-[#758078]">
                        {contact.jobTitle}
                      </div>
                    </td>
                    <td className="py-3 px-3 font-medium text-[#202923] dark:text-white">
                      {contact.company}
                    </td>
                    <td className="py-3 px-3 text-[#758078]">
                      {contact.region}
                    </td>
                    <td className="py-3 px-3">
                      <Badge variant={contact.revealedEmail ? 'verified' : 'not_revealed'}>
                        {contact.revealedEmail ? 'Verified' : 'Not Revealed'}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Badge variant={contact.access === 'free' ? 'free' : 'premium'}>
                        {contact.access.toUpperCase()}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-bold text-[#202923] dark:text-white">
              Recent Activity
            </h3>
            <Link
              to="/app/enrichment-activity"
              className="text-xs text-[#739181] hover:underline"
            >
              All logs
            </Link>
          </div>

          <div className="space-y-3.5">
            {activities.slice(0, 5).map((act) => (
              <div 
                key={act.id} 
                onClick={() => navigate('/app/enrichment-activity')}
                className="p-3 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] hover:border-[#739181] transition-all cursor-pointer bg-[#F7F8F5]/50 dark:bg-[#141A17]/50"
              >
                <div className="flex items-start justify-between text-xs mb-1">
                  <span className="font-semibold text-[#202923] dark:text-white truncate pr-2">
                    {act.contactName}
                  </span>
                  <span className="font-mono text-[10px] text-[#758078] flex-shrink-0">
                    {act.date.split(' ')[1] || act.date}
                  </span>
                </div>
                <div className="text-[11px] text-[#758078] flex items-center justify-between">
                  <span>{act.companyName}</span>
                  <span className="font-mono text-[10px] text-[#3D8060] font-semibold">
                    via {act.provider}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
