import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Contact, EmailStatus, AccessType } from '../../types';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Mail, 
  Phone, 
  Lock, 
  Check, 
  X, 
  Download, 
  ListFilter, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown, 
  ExternalLink,
  ShieldAlert,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { RevealModal } from '../../components/contacts/RevealModal';
import { PremiumModal } from '../../components/contacts/PremiumModal';
import { BulkEnrichModal } from '../../components/contacts/BulkEnrichModal';
import { AddToListModal } from '../../components/contacts/AddToListModal';

export const ContactsPage: React.FC = () => {
  const { contacts, user, exportContacts, showToast } = useApp();

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedAccess, setSelectedAccess] = useState<string>('all');
  const [selectedEmailStatus, setSelectedEmailStatus] = useState<string>('all');
  const [sortField, setSortField] = useState<'name' | 'company' | 'region' | 'addedDate'>('addedDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Selection state
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);

  // Modals state
  const [revealTarget, setRevealTarget] = useState<Contact | null>(null);
  const [revealType, setRevealType] = useState<'email' | 'phone' | 'combined'>('email');
  const [premiumTarget, setPremiumTarget] = useState<Contact | null>(null);
  const [bulkEnrichOpen, setBulkEnrichOpen] = useState(false);
  const [addToListOpen, setAddToListOpen] = useState(false);

  // Industries list
  const industries = ['Technology', 'Finance', 'Manufacturing', 'Healthcare', 'Retail', 'Consulting', 'Logistics', 'Construction'];
  const regions = ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Other Denmark'];

  // Filter & Search logic
  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      // Search
      const matchesSearch = 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.cvr.toLowerCase().includes(searchQuery.toLowerCase());

      // Industry
      const matchesIndustry = selectedIndustry === 'all' || contact.industry === selectedIndustry;

      // Region
      const matchesRegion = selectedRegion === 'all' || contact.region === selectedRegion;

      // Access
      const matchesAccess = selectedAccess === 'all' || contact.access === selectedAccess;

      // Email status
      const matchesEmail = selectedEmailStatus === 'all' || 
        (selectedEmailStatus === 'revealed' ? contact.revealedEmail : !contact.revealedEmail);

      return matchesSearch && matchesIndustry && matchesRegion && matchesAccess && matchesEmail;
    }).sort((a, b) => {
      const aVal = a[sortField] || '';
      const bVal = b[sortField] || '';
      if (sortDirection === 'asc') {
        return aVal.localeCompare(bVal);
      }
      return bVal.localeCompare(aVal);
    });
  }, [contacts, searchQuery, selectedIndustry, selectedRegion, selectedAccess, selectedEmailStatus, sortField, sortDirection]);

  // Pagination slice
  const totalPages = Math.ceil(filteredContacts.length / pageSize) || 1;
  const paginatedContacts = filteredContacts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Checkbox handlers
  const handleSelectAllOnPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const pageIds = paginatedContacts.map(c => c.id);
      setSelectedContactIds(prev => Array.from(new Set([...prev, ...pageIds])));
    } else {
      const pageIds = new Set(paginatedContacts.map(c => c.id));
      setSelectedContactIds(prev => prev.filter(id => !pageIds.has(id)));
    }
  };

  const handleToggleSelectOne = (id: string) => {
    setSelectedContactIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isAllOnPageSelected = paginatedContacts.length > 0 && paginatedContacts.every(c => selectedContactIds.includes(c.id));

  const handleRevealClick = (contact: Contact, type: 'email' | 'phone' | 'combined') => {
    if (contact.access === 'premium' && user.plan !== 'annual_pro') {
      setPremiumTarget(contact);
      return;
    }
    setRevealType(type);
    setRevealTarget(contact);
  };

  const handleExportSelected = () => {
    const toExport = contacts.filter(c => selectedContactIds.includes(c.id));
    if (toExport.length === 0) return;
    exportContacts(toExport, `Danish_Leads_Selection_${toExport.length}.csv`);
  };

  const handleExportAllFiltered = () => {
    exportContacts(filteredContacts, `LeadEnrich_Filtered_${filteredContacts.length}_Contacts.csv`);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedIndustry('all');
    setSelectedRegion('all');
    setSelectedAccess('all');
    setSelectedEmailStatus('all');
    setCurrentPage(1);
  };

  const activeFilterCount = (selectedIndustry !== 'all' ? 1 : 0) +
    (selectedRegion !== 'all' ? 1 : 0) +
    (selectedAccess !== 'all' ? 1 : 0) +
    (selectedEmailStatus !== 'all' ? 1 : 0);

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Top Header & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#202923] dark:text-white">
            Contact Database
          </h1>
          <p className="text-xs sm:text-sm text-[#758078] dark:text-[#8E9C93] mt-1">
            Explore and manage 15,000 verified Danish business professionals and executives.
          </p>
        </div>

        <button
          onClick={handleExportAllFiltered}
          className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-white dark:bg-[#1C2420] text-xs font-semibold text-[#202923] dark:text-white hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] shadow-subtle transition-all self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-[#739181]" />
          <span>Export Filtered ({filteredContacts.length})</span>
        </button>
      </div>

      {/* Database Distribution Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card">
          <div className="text-[10px] uppercase font-mono text-[#758078] font-semibold">Total Contacts</div>
          <div className="text-xl font-bold text-[#202923] dark:text-white font-mono mt-0.5">15,000</div>
          <div className="text-[11px] text-[#758078] mt-0.5">Danish B2B Directory</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card">
          <div className="text-[10px] uppercase font-mono text-[#739181] font-semibold">Free Database</div>
          <div className="text-xl font-bold text-[#203C34] dark:text-[#8BB09D] font-mono mt-0.5">10,000</div>
          <div className="text-[11px] text-[#758078] mt-0.5">Freely Accessible</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card">
          <div className="text-[10px] uppercase font-mono text-[#C18A45] font-semibold">Premium Database</div>
          <div className="text-xl font-bold text-[#202923] dark:text-white font-mono mt-0.5">5,000</div>
          <div className="text-[11px] text-[#758078] mt-0.5">Annual Plan Locked</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card">
          <div className="text-[10px] uppercase font-mono text-[#3D8060] font-semibold">Enriched Contacts</div>
          <div className="text-xl font-bold text-[#3D8060] font-mono mt-0.5">2,486</div>
          <div className="text-[11px] text-[#758078] mt-0.5">Email / Phone Revealed</div>
        </div>
      </div>

      {/* Search & Multi-Filters Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#758078] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search people, companies, job titles, CVR numbers or keywords..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white placeholder-[#758078] focus:outline-none focus:border-[#203C34]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-[#758078] hover:text-[#202923]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns Row */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs">
          {/* Industry Filter */}
          <select
            value={selectedIndustry}
            onChange={(e) => { setSelectedIndustry(e.target.value); setCurrentPage(1); }}
            className="px-3 py-1.5 rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none"
          >
            <option value="all">All Industries</option>
            {industries.map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>

          {/* Region Filter */}
          <select
            value={selectedRegion}
            onChange={(e) => { setSelectedRegion(e.target.value); setCurrentPage(1); }}
            className="px-3 py-1.5 rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none"
          >
            <option value="all">All Danish Regions</option>
            {regions.map(reg => (
              <option key={reg} value={reg}>{reg}</option>
            ))}
          </select>

          {/* Access Filter */}
          <select
            value={selectedAccess}
            onChange={(e) => { setSelectedAccess(e.target.value); setCurrentPage(1); }}
            className="px-3 py-1.5 rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none"
          >
            <option value="all">All Tiers (Free & Premium)</option>
            <option value="free">Free Tier Contacts (10k)</option>
            <option value="premium">Premium Contacts (5k Locked)</option>
          </select>

          {/* Email Status */}
          <select
            value={selectedEmailStatus}
            onChange={(e) => { setSelectedEmailStatus(e.target.value); setCurrentPage(1); }}
            className="px-3 py-1.5 rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none"
          >
            <option value="all">All Email Statuses</option>
            <option value="revealed">Revealed & Verified</option>
            <option value="unrevealed">Requires Reveal (5 credits)</option>
          </select>

          {activeFilterCount > 0 && (
            <button
              onClick={handleResetFilters}
              className="text-[#B85D57] hover:underline text-xs font-medium px-2 py-1"
            >
              Clear filters ({activeFilterCount})
            </button>
          )}

          <div className="ml-auto text-[11px] font-mono text-[#758078]">
            Showing <span className="font-bold text-[#202923] dark:text-white">{filteredContacts.length}</span> contacts
          </div>
        </div>
      </div>

      {/* Floating Bulk Action Bar */}
      {selectedContactIds.length > 0 && (
        <div className="p-3.5 rounded-xl bg-[#203C34] text-white flex flex-wrap items-center justify-between gap-3 shadow-dropdown animate-fade-in text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-mono font-bold px-2 py-0.5 rounded bg-white/20">
              {selectedContactIds.length}
            </span>
            <span>contact(s) selected</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setBulkEnrichOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-[#3D8060] hover:bg-[#346d52] font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bulk Enrich</span>
            </button>

            <button
              onClick={() => setAddToListOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 font-medium flex items-center space-x-1.5 transition-colors"
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>Add to List</span>
            </button>

            <button
              onClick={handleExportSelected}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 font-medium flex items-center space-x-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Selected CSV</span>
            </button>

            <button
              onClick={() => setSelectedContactIds([])}
              className="p-1.5 rounded-lg text-white/70 hover:text-white"
              title="Clear selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Contacts Table */}
      <div className="bg-white dark:bg-[#1C2420] rounded-2xl border border-[#E8ECE7] dark:border-[#2C3731] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5]/60 dark:bg-[#141A17]/60 text-[11px] font-semibold text-[#758078] uppercase tracking-wider">
                <th className="py-3 px-3.5 w-10">
                  <input
                    type="checkbox"
                    checked={isAllOnPageSelected}
                    onChange={handleSelectAllOnPage}
                    className="rounded border-[#E8ECE7] text-[#203C34] focus:ring-[#739181]"
                  />
                </th>
                <th className="py-3 px-3">Name & Role</th>
                <th className="py-3 px-3">Company & CVR</th>
                <th className="py-3 px-3">Region</th>
                <th className="py-3 px-3">Business Email</th>
                <th className="py-3 px-3">Direct Phone</th>
                <th className="py-3 px-3">Tier</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECE7] dark:divide-[#2C3731]">
              {paginatedContacts.map((contact) => {
                const isSelected = selectedContactIds.includes(contact.id);
                const isPremiumLocked = contact.access === 'premium' && user.plan !== 'annual_pro';

                return (
                  <tr 
                    key={contact.id}
                    className={`nordic-table-row transition-colors ${
                      isSelected ? 'bg-[#E9EEE9]/30 dark:bg-[#25332C]/30' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3 px-3.5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelectOne(contact.id)}
                        className="rounded border-[#E8ECE7] text-[#203C34] focus:ring-[#739181]"
                      />
                    </td>

                    {/* Name & Title */}
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-[#202923] dark:text-white">
                          {contact.name}
                        </span>
                        {contact.optedOut && (
                          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[#B85D57]/10 text-[#B85D57] font-semibold" title="Opted out under GDPR">
                            GDPR OPT-OUT
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#758078] leading-tight">
                        {contact.jobTitle}
                      </div>
                    </td>

                    {/* Company & CVR */}
                    <td className="py-3 px-3">
                      <div className="font-medium text-[#202923] dark:text-white flex items-center space-x-1">
                        <span>{contact.company}</span>
                      </div>
                      <div className="text-[10px] font-mono text-[#758078]">
                        CVR: {contact.cvr} • {contact.industry}
                      </div>
                    </td>

                    {/* Region */}
                    <td className="py-3 px-3 text-[#758078]">
                      {contact.region}
                    </td>

                    {/* Business Email */}
                    <td className="py-3 px-3">
                      {contact.revealedEmail ? (
                        <div className="flex items-center space-x-1 text-[#3D8060] font-mono text-[11px] font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="truncate max-w-[150px]">{contact.email}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleRevealClick(contact, 'email')}
                          disabled={contact.optedOut}
                          className="px-2.5 py-1 rounded-md border border-dashed border-[#739181] text-[#739181] hover:bg-[#E9EEE9] dark:hover:bg-[#25332C] transition-colors text-[11px] font-mono flex items-center space-x-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Reveal Email (5c)</span>
                        </button>
                      )}
                    </td>

                    {/* Direct Phone */}
                    <td className="py-3 px-3">
                      {contact.revealedPhone ? (
                        <div className="flex items-center space-x-1 text-[#3D8060] font-mono text-[11px] font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{contact.phone}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleRevealClick(contact, 'phone')}
                          disabled={contact.optedOut}
                          className="px-2 py-1 rounded-md text-[11px] font-mono text-[#758078] hover:text-[#202923] dark:hover:text-white hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] transition-colors"
                        >
                          +45 •• •• •• •• (10c)
                        </button>
                      )}
                    </td>

                    {/* Tier badge */}
                    <td className="py-3 px-3">
                      {isPremiumLocked ? (
                        <button
                          onClick={() => setPremiumTarget(contact)}
                          className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-[#E9E5DC] text-[#203C34] text-[10px] font-mono font-bold hover:bg-[#dfd9cd] transition-colors"
                          title="Click to view Annual Pro unlock details"
                        >
                          <Lock className="w-3 h-3 text-[#C18A45]" />
                          <span>PREMIUM</span>
                        </button>
                      ) : (
                        <Badge variant={contact.access === 'free' ? 'free' : 'premium'}>
                          {contact.access.toUpperCase()}
                        </Badge>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleRevealClick(contact, 'combined')}
                        disabled={contact.optedOut || (contact.revealedEmail && contact.revealedPhone)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          contact.revealedEmail && contact.revealedPhone
                            ? 'text-[#3D8060] bg-[#3D8060]/10'
                            : 'text-[#203C34] dark:text-[#8BB09D] hover:bg-[#E9EEE9] dark:hover:bg-[#25332C]'
                        }`}
                        title="Reveal all details"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {filteredContacts.length === 0 && (
          <div className="py-12 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#F3F5F2] dark:bg-[#232C27] flex items-center justify-center mx-auto text-[#758078]">
              <Search className="w-5 h-5" />
            </div>
            <div className="text-sm font-semibold text-[#202923] dark:text-white">No Danish contacts found</div>
            <p className="text-xs text-[#758078] max-w-sm mx-auto">
              No contacts match your current search and filter criteria. Try resetting filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-[#203C34] dark:text-[#8BB09D] hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* Pagination Bar */}
        <div className="p-4 border-t border-[#E8ECE7] dark:border-[#2C3731] flex flex-col sm:flex-row items-center justify-between text-xs text-[#758078] gap-3">
          <div>
            Showing <span className="font-semibold text-[#202923] dark:text-white">{Math.min(filteredContacts.length, (currentPage - 1) * pageSize + 1)}</span> to{' '}
            <span className="font-semibold text-[#202923] dark:text-white">{Math.min(filteredContacts.length, currentPage * pageSize)}</span> of{' '}
            <span className="font-semibold text-[#202923] dark:text-white">{filteredContacts.length}</span> contacts
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] disabled:opacity-40 hover:bg-[#F3F5F2] dark:hover:bg-[#232C27]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-mono text-xs px-2">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] disabled:opacity-40 hover:bg-[#F3F5F2] dark:hover:bg-[#232C27]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <RevealModal
        contact={revealTarget}
        initialType={revealType}
        onClose={() => setRevealTarget(null)}
      />

      <PremiumModal
        contact={premiumTarget}
        onClose={() => setPremiumTarget(null)}
      />

      {bulkEnrichOpen && (
        <BulkEnrichModal
          selectedContactIds={selectedContactIds}
          contacts={contacts}
          onClose={() => setBulkEnrichOpen(false)}
          onSuccess={() => setSelectedContactIds([])}
        />
      )}

      {addToListOpen && (
        <AddToListModal
          selectedContactIds={selectedContactIds}
          onClose={() => setAddToListOpen(false)}
          onSuccess={() => setSelectedContactIds([])}
        />
      )}
    </div>
  );
};
