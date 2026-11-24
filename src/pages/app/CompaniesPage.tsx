import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Company } from '../../types';
import { 
  Building2, 
  Search, 
  RotateCw, 
  ExternalLink, 
  MapPin, 
  Users, 
  Calendar, 
  CheckCircle2, 
  X, 
  Filter, 
  Briefcase, 
  FileText,
  Phone,
  Mail,
  ShieldCheck
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const CompaniesPage: React.FC = () => {
  const { companies, syncCompanyCVR } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const industries = ['Technology', 'Finance', 'Manufacturing', 'Healthcare', 'Retail', 'Consulting', 'Logistics', 'Construction'];
  const regions = ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Other Denmark'];

  const filteredCompanies = companies.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.cvr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesIndustry = selectedIndustry === 'all' || c.industry === selectedIndustry;
    const matchesRegion = selectedRegion === 'all' || c.region === selectedRegion;

    return matchesSearch && matchesIndustry && matchesRegion;
  });

  const handleRefreshCvr = async (companyId: string) => {
    setIsSyncing(true);
    await syncCompanyCVR(companyId);
    setIsSyncing(false);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#202923] dark:text-white">
            Company Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-[#758078] dark:text-[#8E9C93] mt-1">
            Explore Danish registered enterprises with structured CVR data from Erhvervsstyrelsen.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-[#739181] bg-[#E9EEE9] dark:bg-[#25332C] px-3 py-1.5 rounded-lg border border-[#739181]/30">
          <ShieldCheck className="w-4 h-4 text-[#3D8060]" />
          <span>Official Danish CVR Data Feed</span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[#758078] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search company name, CVR number (e.g. DK38472910), or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white placeholder-[#758078] focus:outline-none focus:border-[#203C34]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs">
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none"
          >
            <option value="all">All Industries</option>
            {industries.map(i => <option key={i} value={i}>{i}</option>)}
          </select>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none"
          >
            <option value="all">All Danish Regions</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>

          {(selectedIndustry !== 'all' || selectedRegion !== 'all' || searchQuery) && (
            <button
              onClick={() => { setSelectedIndustry('all'); setSelectedRegion('all'); setSearchQuery(''); }}
              className="text-[#B85D57] hover:underline text-xs"
            >
              Reset filters
            </button>
          )}

          <div className="ml-auto text-[11px] font-mono text-[#758078]">
            Showing <span className="font-bold text-[#202923] dark:text-white">{filteredCompanies.length}</span> enterprises
          </div>
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-white dark:bg-[#1C2420] rounded-2xl border border-[#E8ECE7] dark:border-[#2C3731] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5]/60 dark:bg-[#141A17]/60 text-[11px] font-semibold text-[#758078] uppercase tracking-wider">
                <th className="py-3 px-4">Company Name</th>
                <th className="py-3 px-3">CVR Number</th>
                <th className="py-3 px-3">Industry</th>
                <th className="py-3 px-3">Location / Region</th>
                <th className="py-3 px-3">Employees</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Last CVR Sync</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECE7] dark:divide-[#2C3731]">
              {filteredCompanies.map((comp) => (
                <tr
                  key={comp.id}
                  onClick={() => setSelectedCompany(comp)}
                  className="nordic-table-row cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 font-semibold text-[#202923] dark:text-white">
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-3.5 h-3.5 text-[#739181] flex-shrink-0" />
                      <span>{comp.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono text-[#758078]">
                    {comp.cvr}
                  </td>
                  <td className="py-3 px-3 text-[#202923] dark:text-white">
                    {comp.industry}
                  </td>
                  <td className="py-3 px-3 text-[#758078]">
                    {comp.region}
                  </td>
                  <td className="py-3 px-3 font-mono text-[#758078]">
                    {comp.employees}
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#3D8060]/10 text-[#3D8060]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3D8060]" />
                      <span className="capitalize">{comp.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-[#758078]">
                    {comp.lastCvrSync}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-xs font-semibold text-[#203C34] dark:text-[#8BB09D] hover:underline">
                      View CVR
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Company Detail Drawer */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 command-backdrop">
          <div className="w-full max-w-md bg-white dark:bg-[#1C2420] h-full shadow-modal border-l border-[#E8ECE7] dark:border-[#2C3731] flex flex-col p-6 overflow-y-auto animate-fade-in">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#E8ECE7] dark:border-[#2C3731]">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E9EEE9] dark:bg-[#25332C] text-[#203C34] dark:text-[#8BB09D] font-bold">
                  OFFICIAL CVR RECORD
                </span>
                <h3 className="font-display text-lg font-bold text-[#202923] dark:text-white mt-1.5">
                  {selectedCompany.name}
                </h3>
                <div className="text-xs text-[#758078] font-mono mt-0.5">
                  {selectedCompany.cvr}
                </div>
              </div>

              <button
                onClick={() => setSelectedCompany(null)}
                className="p-1.5 rounded-lg text-[#758078] hover:text-[#202923] dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Details */}
            <div className="py-6 space-y-5 text-xs flex-1">
              <div className="p-3.5 rounded-xl bg-[#F7F8F5] dark:bg-[#141A17] border border-[#E8ECE7] dark:border-[#2C3731] space-y-1">
                <div className="font-semibold text-[#202923] dark:text-white">Business Purpose</div>
                <p className="text-[#758078] leading-relaxed">
                  {selectedCompany.description}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-1.5 border-b border-[#E8ECE7] dark:border-[#2C3731]">
                  <span className="text-[#758078]">Official Legal Status:</span>
                  <span className="font-semibold text-[#3D8060] capitalize">{selectedCompany.status} (Normal)</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-[#E8ECE7] dark:border-[#2C3731]">
                  <span className="text-[#758078]">Primary Industry:</span>
                  <span className="font-semibold text-[#202923] dark:text-white">{selectedCompany.industry}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-[#E8ECE7] dark:border-[#2C3731]">
                  <span className="text-[#758078]">Registered Address:</span>
                  <span className="font-semibold text-[#202923] dark:text-white text-right">{selectedCompany.address}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-[#E8ECE7] dark:border-[#2C3731]">
                  <span className="text-[#758078]">Employee Bracket:</span>
                  <span className="font-mono font-semibold text-[#202923] dark:text-white">{selectedCompany.employees}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-[#E8ECE7] dark:border-[#2C3731]">
                  <span className="text-[#758078]">Estimated Revenue:</span>
                  <span className="font-mono font-semibold text-[#202923] dark:text-white">{selectedCompany.revenueRange}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-[#E8ECE7] dark:border-[#2C3731]">
                  <span className="text-[#758078]">Founded Year:</span>
                  <span className="font-mono font-semibold text-[#202923] dark:text-white">{selectedCompany.foundedYear}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-[#E8ECE7] dark:border-[#2C3731]">
                  <span className="text-[#758078]">Website:</span>
                  <a href={selectedCompany.website} target="_blank" rel="noreferrer" className="text-[#739181] hover:underline flex items-center space-x-1">
                    <span>{selectedCompany.website.replace('https://', '')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-[#E8ECE7] dark:border-[#2C3731]">
                  <span className="text-[#758078]">Key Decision Makers:</span>
                  <span className="font-mono font-semibold text-[#203C34] dark:text-[#8BB09D]">{selectedCompany.contactPersons} verified profiles</span>
                </div>
              </div>

              {/* Sync Timestamp Card */}
              <div className="p-3.5 rounded-xl border border-[#739181]/30 bg-[#E9EEE9]/50 dark:bg-[#25332C]/50 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#203C34] dark:text-[#8BB09D]">
                    Last CVR Synchronization
                  </span>
                  <span className="font-mono text-[10px] text-[#758078]">
                    {selectedCompany.lastCvrSync}
                  </span>
                </div>
                <p className="text-[10px] text-[#758078]">
                  Verified through Danish Central Business Register (datacvr.virk.dk).
                </p>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-4 border-t border-[#E8ECE7] dark:border-[#2C3731] space-y-2">
              <button
                onClick={() => handleRefreshCvr(selectedCompany.id)}
                disabled={isSyncing}
                className="w-full py-2.5 px-4 rounded-xl bg-[#203C34] text-white text-xs font-semibold hover:bg-[#2c544a] transition-all flex items-center justify-center space-x-2"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Synchronizing with CVR...' : 'Refresh CVR Data'}</span>
              </button>

              <button
                onClick={() => setSelectedCompany(null)}
                className="w-full py-2 text-xs font-medium text-[#758078] hover:text-[#202923] dark:hover:text-white"
              >
                Close Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
