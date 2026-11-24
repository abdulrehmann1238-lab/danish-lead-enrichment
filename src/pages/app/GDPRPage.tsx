import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OptOutRecord, GDPRRequest } from '../../types';
import { SUBPROCESSORS } from '../../data/mockData';
import { 
  ShieldCheck, 
  AlertTriangle, 
  UserX, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Globe, 
  Lock,
  ExternalLink,
  X
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const GDPRPage: React.FC = () => {
  const { optOuts, addOptOut, removeOptOut, gdprRequests, updateGDPRRequestStatus, contacts } = useApp();
  
  // Opt-out form state
  const [optEmail, setOptEmail] = useState('');
  const [optName, setOptName] = useState('');
  const [optCompany, setOptCompany] = useState('');
  const [optReason, setOptReason] = useState('Exercised GDPR Article 21 right to object.');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddOptOut = (e: React.FormEvent) => {
    e.preventDefault();
    if (!optEmail.trim()) return;
    addOptOut(optEmail, optName, optCompany, optReason);
    setOptEmail('');
    setOptName('');
    setOptCompany('');
    setShowAddModal(false);
  };

  const optedOutContactsCount = contacts.filter(c => c.optedOut).length;

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#202923] dark:text-white">
          GDPR & Privacy Control Center
        </h1>
        <p className="text-xs sm:text-sm text-[#758078] dark:text-[#8E9C93] mt-1">
          Danish and European privacy compliance, suppression list enforcement, and subprocessor governance.
        </p>
      </div>

      {/* Mandatory Legal Warning Banner */}
      <div className="p-5 rounded-2xl bg-[#E9EEE9]/60 dark:bg-[#1C2420] border-2 border-[#739181]/40 shadow-card space-y-2">
        <div className="flex items-center space-x-2 text-[#203C34] dark:text-[#8BB09D] font-bold text-xs">
          <ShieldCheck className="w-4 h-4 text-[#3D8060]" />
          <span className="uppercase tracking-wider">European Regulatory Compliance Notice</span>
        </div>
        <p className="text-xs text-[#202923] dark:text-[#E9EFEA] leading-relaxed">
          Production deployment requires verified data processing agreements, documented international transfer safeguards where applicable, and a review of the applicable GDPR legal basis and controller/processor responsibilities.
        </p>
      </div>

      {/* Opt-Out Suppression Management */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-display text-base font-bold text-[#202923] dark:text-white">
                Danish Opt-Out & Suppression Registry
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#B85D57]/10 text-[#B85D57] font-semibold">
                Article 21 Enforced
              </span>
            </div>
            <p className="text-xs text-[#758078] dark:text-[#8E9C93] mt-0.5">
              Individuals on this list cannot be enriched, queried, or exported anywhere in the platform.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-[#203C34] text-white text-xs font-semibold hover:bg-[#2c544a] transition-all flex items-center space-x-1.5 shadow-subtle self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Opt-Out Record</span>
          </button>
        </div>

        {/* Suppression Table */}
        <div className="border border-[#E8ECE7] dark:border-[#2C3731] rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5]/60 dark:bg-[#141A17]/60 text-[11px] font-semibold text-[#758078] uppercase">
                <th className="py-2.5 px-3">Suppressed Email</th>
                <th className="py-2.5 px-3">Name / Entity</th>
                <th className="py-2.5 px-3">Date Registered</th>
                <th className="py-2.5 px-3">Legal Basis / Reason</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECE7] dark:divide-[#2C3731]">
              {optOuts.map((opt) => (
                <tr key={opt.id} className="hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] transition-colors">
                  <td className="py-2.5 px-3 font-mono font-semibold text-[#B85D57]">{opt.email}</td>
                  <td className="py-2.5 px-3 font-medium text-[#202923] dark:text-white">
                    {opt.contactName || opt.company || '—'}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-[#758078]">{opt.date}</td>
                  <td className="py-2.5 px-3 text-[11px] text-[#758078]">{opt.reason}</td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => removeOptOut(opt.id)}
                      className="text-[11px] text-[#B85D57] hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Data Subject Requests (DSR) */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-4">
        <div>
          <h3 className="font-display text-base font-bold text-[#202923] dark:text-white">
            Data Subject Requests (DSR Log)
          </h3>
          <p className="text-xs text-[#758078] dark:text-[#8E9C93]">
            Track GDPR Article 15 (Access), 16 (Rectification), 17 (Erasure), and 18 (Restriction) inquiries.
          </p>
        </div>

        <div className="border border-[#E8ECE7] dark:border-[#2C3731] rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5]/60 dark:bg-[#141A17]/60 text-[11px] font-semibold text-[#758078] uppercase">
                <th className="py-2.5 px-3">Request ID</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Subject Email</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Submitted</th>
                <th className="py-2.5 px-3 text-right">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECE7] dark:divide-[#2C3731]">
              {gdprRequests.map((req) => (
                <tr key={req.id} className="hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] transition-colors">
                  <td className="py-2.5 px-3 font-mono font-semibold text-[#202923] dark:text-white">{req.id}</td>
                  <td className="py-2.5 px-3 font-mono capitalize">{req.type}</td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-[#758078]">{req.email}</td>
                  <td className="py-2.5 px-3">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                      req.status === 'completed'
                        ? 'bg-[#3D8060]/10 text-[#3D8060]'
                        : 'bg-[#C18A45]/10 text-[#C18A45]'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-[#758078]">{req.submittedAt}</td>
                  <td className="py-2.5 px-3 text-right">
                    <select
                      value={req.status}
                      onChange={(e) => updateGDPRRequestStatus(req.id, e.target.value as any)}
                      className="px-2 py-1 rounded border border-[#E8ECE7] dark:border-[#2C3731] bg-white dark:bg-[#1C2420] text-[11px]"
                    >
                      <option value="completed">Completed</option>
                      <option value="in_review">In Review</option>
                      <option value="pending">Pending</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subprocessor Registry */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-4">
        <div>
          <h3 className="font-display text-base font-bold text-[#202923] dark:text-white">
            Subprocessor Registry (15 Providers)
          </h3>
          <p className="text-xs text-[#758078] dark:text-[#8E9C93]">
            Mandatory disclosure of third-party infrastructure and waterfall data processors.
          </p>
        </div>

        <div className="border border-[#E8ECE7] dark:border-[#2C3731] rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5]/60 dark:bg-[#141A17]/60 text-[11px] font-semibold text-[#758078] uppercase">
                <th className="py-2.5 px-3">Subprocessor</th>
                <th className="py-2.5 px-3">Processing Purpose</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Data Center Region</th>
                <th className="py-2.5 px-3 text-right">DPA Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECE7] dark:divide-[#2C3731]">
              {SUBPROCESSORS.map((sub, i) => (
                <tr key={i} className="hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-[#202923] dark:text-white">{sub.name}</td>
                  <td className="py-2.5 px-3 text-[#758078]">{sub.purpose}</td>
                  <td className="py-2.5 px-3 font-mono text-[10px] text-[#758078]">{sub.category}</td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-[#758078]">{sub.region}</td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C18A45]/10 text-[#C18A45] font-semibold">
                      {sub.dpaStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Opt-Out Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 command-backdrop">
          <div className="w-full max-w-md bg-white dark:bg-[#1C2420] rounded-2xl shadow-modal border border-[#E8ECE7] dark:border-[#2C3731] p-6 space-y-4 animate-fade-in text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8ECE7] dark:border-[#2C3731]">
              <h3 className="font-display font-bold text-sm text-[#202923] dark:text-white">
                Add Email to Opt-Out Registry
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#758078]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddOptOut} className="space-y-3">
              <div>
                <label className="block font-semibold text-[#202923] dark:text-white mb-1">Email Address *</label>
                <input
                  type="email"
                  placeholder="contact@company.dk"
                  value={optEmail}
                  onChange={(e) => setOptEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="block font-semibold text-[#202923] dark:text-white mb-1">Contact Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Thomas Vang"
                  value={optName}
                  onChange={(e) => setOptName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#202923] dark:text-white mb-1">Reason / Note</label>
                <input
                  type="text"
                  value={optReason}
                  onChange={(e) => setOptReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-[#758078]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#203C34] text-white font-semibold hover:bg-[#2c544a]"
                >
                  Register Suppression
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
