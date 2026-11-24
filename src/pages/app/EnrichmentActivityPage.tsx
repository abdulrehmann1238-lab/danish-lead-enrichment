import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EnrichmentActivity } from '../../types';
import { 
  Activity, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Download, 
  Sparkles, 
  X,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const EnrichmentActivityPage: React.FC = () => {
  const { activities } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedActivity, setSelectedActivity] = useState<EnrichmentActivity | null>(null);

  const filteredActivities = activities.filter((act) => {
    const matchesSearch = 
      act.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.provider.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesProvider = selectedProvider === 'all' || act.provider === selectedProvider;
    const matchesStatus = selectedStatus === 'all' || act.status === selectedStatus;

    return matchesSearch && matchesProvider && matchesStatus;
  });

  const totalEnrichments = activities.length;
  const successfulCount = activities.filter(a => a.status === 'success').length;
  const failedCount = activities.filter(a => a.status === 'failed').length;
  const creditsConsumed = activities.reduce((acc, a) => acc + a.credits, 0);

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#202923] dark:text-white">
          Enrichment Activity History
        </h1>
        <p className="text-xs sm:text-sm text-[#758078] dark:text-[#8E9C93] mt-1">
          Audit trail of all email reveals, phone lookups, provider durations, and credit deductions.
        </p>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card">
          <div className="text-[10px] uppercase font-mono text-[#758078] font-semibold">Total Requests</div>
          <div className="text-2xl font-bold font-mono text-[#202923] dark:text-white mt-1">{totalEnrichments}</div>
          <div className="text-[11px] text-[#758078]">Lifetime operations</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card">
          <div className="text-[10px] uppercase font-mono text-[#3D8060] font-semibold">Successful</div>
          <div className="text-2xl font-bold font-mono text-[#3D8060] mt-1">{successfulCount}</div>
          <div className="text-[11px] text-[#758078]">Verified matches</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card">
          <div className="text-[10px] uppercase font-mono text-[#B85D57] font-semibold">Failed / Opted-Out</div>
          <div className="text-2xl font-bold font-mono text-[#B85D57] mt-1">{failedCount}</div>
          <div className="text-[11px] text-[#758078]">0 credits deducted</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card">
          <div className="text-[10px] uppercase font-mono text-[#C18A45] font-semibold">Credits Consumed</div>
          <div className="text-2xl font-bold font-mono text-[#203C34] dark:text-[#8BB09D] mt-1">{creditsConsumed}</div>
          <div className="text-[11px] text-[#758078]">Direct wallet ledger</div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-[#758078] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search contact, company, or provider..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none"
          />
        </div>

        <select
          value={selectedProvider}
          onChange={(e) => setSelectedProvider(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none"
        >
          <option value="all">All Providers</option>
          <option value="Prospeo">Prospeo</option>
          <option value="Findymail">Findymail</option>
          <option value="Coresignal">Coresignal</option>
          <option value="ContactOut">ContactOut</option>
          <option value="Forager">Forager</option>
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="success">Successful</option>
          <option value="failed">Failed / Aborted</option>
        </select>
      </div>

      {/* Activity Table */}
      <div className="bg-white dark:bg-[#1C2420] rounded-2xl border border-[#E8ECE7] dark:border-[#2C3731] shadow-card overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5]/60 dark:bg-[#141A17]/60 text-[11px] font-semibold text-[#758078] uppercase tracking-wider">
              <th className="py-3 px-4">Contact & Company</th>
              <th className="py-3 px-3">Type</th>
              <th className="py-3 px-3">Provider</th>
              <th className="py-3 px-3">Credits</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">Timestamp</th>
              <th className="py-3 px-4 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8ECE7] dark:divide-[#2C3731]">
            {filteredActivities.map((act) => (
              <tr
                key={act.id}
                onClick={() => setSelectedActivity(act)}
                className="nordic-table-row cursor-pointer transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="font-semibold text-[#202923] dark:text-white">{act.contactName}</div>
                  <div className="text-[11px] text-[#758078]">{act.companyName}</div>
                </td>
                <td className="py-3 px-3 font-mono capitalize">
                  {act.enrichmentType}
                </td>
                <td className="py-3 px-3">
                  <span className="font-mono text-[#203C34] dark:text-[#8BB09D] font-semibold">
                    {act.provider}
                  </span>
                </td>
                <td className="py-3 px-3 font-mono font-semibold">
                  {act.credits > 0 ? `-${act.credits}` : '0'}
                </td>
                <td className="py-3 px-3">
                  <Badge variant={act.status === 'success' ? 'success' : 'unavailable'}>
                    {act.status.toUpperCase()}
                  </Badge>
                </td>
                <td className="py-3 px-3 font-mono text-[11px] text-[#758078]">
                  {act.date}
                </td>
                <td className="py-3 px-4 text-right">
                  <span className="text-xs font-semibold text-[#203C34] dark:text-[#8BB09D] hover:underline">
                    View Logs
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Activity Details Drawer */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 command-backdrop">
          <div className="w-full max-w-md bg-white dark:bg-[#1C2420] h-full shadow-modal border-l border-[#E8ECE7] dark:border-[#2C3731] flex flex-col p-6 overflow-y-auto animate-fade-in text-xs">
            <div className="flex items-start justify-between pb-4 border-b border-[#E8ECE7] dark:border-[#2C3731]">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E9EEE9] dark:bg-[#25332C] text-[#203C34] dark:text-[#8BB09D] font-bold">
                  AUDIT LOG #{selectedActivity.id}
                </span>
                <h3 className="font-display text-base font-bold text-[#202923] dark:text-white mt-1">
                  {selectedActivity.contactName}
                </h3>
                <div className="text-xs text-[#758078]">{selectedActivity.companyName}</div>
              </div>
              <button
                onClick={() => setSelectedActivity(null)}
                className="p-1.5 rounded-lg text-[#758078] hover:text-[#202923] dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-4 flex-1">
              <div className="p-3.5 rounded-xl bg-[#F7F8F5] dark:bg-[#141A17] border border-[#E8ECE7] dark:border-[#2C3731] space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#758078]">Provider Dispatched:</span>
                  <span className="font-mono font-bold text-[#202923] dark:text-white">{selectedActivity.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#758078]">Credits Deducted:</span>
                  <span className="font-mono font-bold text-[#3D8060]">
                    {selectedActivity.credits} credits
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#758078]">Duration:</span>
                  <span className="font-mono text-[#758078]">{selectedActivity.details.durationMs}ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#758078]">Match Confidence:</span>
                  <span className="font-mono text-[#3D8060] font-semibold">{selectedActivity.details.matchScore}%</span>
                </div>
              </div>

              {/* Stage logs */}
              <div className="space-y-2">
                <span className="font-semibold text-[#202923] dark:text-white">Waterfall Execution Stages</span>
                <div className="p-3 rounded-xl bg-[#F7F8F5] dark:bg-[#141A17] border border-[#E8ECE7] dark:border-[#2C3731] font-mono text-[11px] space-y-1.5 text-[#758078]">
                  {selectedActivity.details.stageLogs.map((log, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <span className="text-[#739181]">›</span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Returned data */}
              <div className="space-y-1.5">
                <span className="font-semibold text-[#202923] dark:text-white">Returned Payload</span>
                <div className="p-3 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] text-[11px] font-mono text-[#203C34] dark:text-[#8BB09D]">
                  {selectedActivity.details.returnedData}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E8ECE7] dark:border-[#2C3731]">
              <button
                onClick={() => setSelectedActivity(null)}
                className="w-full py-2.5 rounded-xl bg-[#203C34] text-white font-semibold hover:bg-[#2c544a]"
              >
                Close Audit Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
