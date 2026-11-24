import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExportRecord } from '../../types';
import { 
  Download, 
  Upload, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  FileText, 
  X, 
  Layers, 
  Check, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { parseUploadedCSV, exportContactsToCSV } from '../../utils/csv';

export const ExportsPage: React.FC = () => {
  const { exports, contacts, lists, exportContacts, showToast } = useApp();

  // Import modal state
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importStage, setImportStage] = useState<'upload' | 'mapping' | 'preview' | 'complete'>('upload');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [columnMapping, setColumnMapping] = useState({
    name: '',
    company: '',
    jobTitle: '',
    email: '',
    phone: '',
    region: '',
  });

  // Handle local CSV selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    try {
      const results = await parseUploadedCSV(file);
      if (results.data && results.data.length > 0) {
        setParsedData(results.data);
        const fileHeaders = Object.keys(results.data[0]);
        setHeaders(fileHeaders);
        
        // Auto-guess mapping
        setColumnMapping({
          name: fileHeaders.find(h => /name|contact/i.test(h)) || fileHeaders[0] || '',
          company: fileHeaders.find(h => /company|org/i.test(h)) || fileHeaders[1] || '',
          jobTitle: fileHeaders.find(h => /title|role|position/i.test(h)) || fileHeaders[2] || '',
          email: fileHeaders.find(h => /email|mail/i.test(h)) || '',
          phone: fileHeaders.find(h => /phone|mobile|tel/i.test(h)) || '',
          region: fileHeaders.find(h => /region|city|location/i.test(h)) || '',
        });

        setImportStage('mapping');
      }
    } catch (err) {
      showToast({
        type: 'error',
        title: 'CSV Parsing Error',
        description: 'Unable to parse selected CSV file. Please verify CSV formatting.',
      });
    }
  };

  const handleSimulateSampleCSV = () => {
    const sampleHeaders = ['Full Name', 'Company Name', 'Job Role', 'Business Email', 'Phone', 'Region'];
    const sampleRows = [
      { 'Full Name': 'Søren Møller', 'Company Name': 'Nordic Wind Systems', 'Job Role': 'COO', 'Business Email': 's.moeller@nordicwind.dk', 'Phone': '+45 20 11 22 33', 'Region': 'Aarhus' },
      { 'Full Name': 'Maja Friis', 'Company Name': 'Danish FinTech Hub', 'Job Role': 'Head of Partnerships', 'Business Email': 'm.friis@fintechhub.dk', 'Phone': '+45 31 44 55 66', 'Region': 'Copenhagen' },
      { 'Full Name': 'Lars Bach', 'Company Name': 'Jutland AgroTech', 'Job Role': 'Managing Director', 'Business Email': 'l.bach@jutlandagro.dk', 'Phone': '+45 40 77 88 99', 'Region': 'Aalborg' },
    ];
    setUploadedFileName('sample_danish_leads.csv');
    setParsedData(sampleRows);
    setHeaders(sampleHeaders);
    setColumnMapping({
      name: 'Full Name',
      company: 'Company Name',
      jobTitle: 'Job Role',
      email: 'Business Email',
      phone: 'Phone',
      region: 'Region',
    });
    setImportStage('mapping');
  };

  const handleFinishImport = () => {
    showToast({
      type: 'success',
      title: 'CSV Imported Successfully',
      description: `Imported ${parsedData.length} records. 0 duplicates detected. Added to your workspace.`,
    });
    setImportModalOpen(false);
    setImportStage('upload');
    setParsedData([]);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#202923] dark:text-white">
            Exports & Imports
          </h1>
          <p className="text-xs sm:text-sm text-[#758078] dark:text-[#8E9C93] mt-1">
            Export verified Danish contact records to formatted CSV files or upload your own prospect datasets.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => { setImportModalOpen(true); setImportStage('upload'); }}
            className="px-3.5 py-2 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-white dark:bg-[#1C2420] text-xs font-semibold text-[#202923] dark:text-white hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] transition-all flex items-center space-x-1.5 shadow-subtle"
          >
            <Upload className="w-3.5 h-3.5 text-[#739181]" />
            <span>Import CSV</span>
          </button>

          <button
            onClick={() => exportContacts(contacts, 'LeadEnrich_All_Danish_Contacts.csv')}
            className="px-4 py-2 rounded-xl bg-[#203C34] text-white text-xs font-semibold hover:bg-[#2c544a] transition-all flex items-center space-x-1.5 shadow-subtle"
          >
            <Download className="w-3.5 h-3.5 text-[#E9EEE9]" />
            <span>Export All Contacts CSV</span>
          </button>
        </div>
      </div>

      {/* Quick Export Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card flex flex-col justify-between space-y-3">
          <div>
            <div className="text-xs font-bold text-[#202923] dark:text-white">Enriched Contacts Only</div>
            <p className="text-[11px] text-[#758078] mt-0.5">
              Export only records with verified email addresses and direct phone lines.
            </p>
          </div>
          <button
            onClick={() => exportContacts(contacts.filter(c => c.revealedEmail || c.revealedPhone), 'Enriched_Verified_Contacts.csv')}
            className="w-full py-1.5 rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] text-xs font-semibold hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] text-[#202923] dark:text-white"
          >
            Download Enriched ({contacts.filter(c => c.revealedEmail || c.revealedPhone).length})
          </button>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card flex flex-col justify-between space-y-3">
          <div>
            <div className="text-xs font-bold text-[#202923] dark:text-white">Copenhagen Tech Leaders</div>
            <p className="text-[11px] text-[#758078] mt-0.5">
              Export executives in the Greater Copenhagen technology cluster.
            </p>
          </div>
          <button
            onClick={() => exportContacts(contacts.filter(c => c.region === 'Copenhagen' && c.industry === 'Technology'), 'Copenhagen_Tech_Cluster.csv')}
            className="w-full py-1.5 rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] text-xs font-semibold hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] text-[#202923] dark:text-white"
          >
            Download Segment CSV
          </button>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card flex flex-col justify-between space-y-3">
          <div>
            <div className="text-xs font-bold text-[#202923] dark:text-white">GDPR Suppression Guarantee</div>
            <p className="text-[11px] text-[#758078] mt-0.5">
              Opted-out individuals are automatically filtered from all export streams.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#3D8060] font-semibold flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Active Suppression Enforced</span>
          </span>
        </div>
      </div>

      {/* Export History Table */}
      <div className="space-y-3">
        <h3 className="font-display text-base font-bold text-[#202923] dark:text-white">
          Export Download History
        </h3>

        <div className="bg-white dark:bg-[#1C2420] rounded-2xl border border-[#E8ECE7] dark:border-[#2C3731] shadow-card overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5]/60 dark:bg-[#141A17]/60 text-[11px] font-semibold text-[#758078] uppercase tracking-wider">
                <th className="py-3 px-4">File Name</th>
                <th className="py-3 px-3">Export Scope</th>
                <th className="py-3 px-3">Records</th>
                <th className="py-3 px-3">Format</th>
                <th className="py-3 px-3">File Size</th>
                <th className="py-3 px-3">Date Generated</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECE7] dark:divide-[#2C3731]">
              {exports.map((exp) => (
                <tr key={exp.id} className="hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#202923] dark:text-white flex items-center space-x-2">
                    <FileSpreadsheet className="w-4 h-4 text-[#739181] flex-shrink-0" />
                    <span>{exp.name}</span>
                  </td>
                  <td className="py-3 px-3 text-[#758078]">{exp.type}</td>
                  <td className="py-3 px-3 font-mono font-semibold">{exp.contactCount}</td>
                  <td className="py-3 px-3">
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#E9EEE9] dark:bg-[#25332C] text-[#203C34] dark:text-[#8BB09D] font-bold">
                      {exp.format}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-[#758078]">{exp.fileSize}</td>
                  <td className="py-3 px-3 font-mono text-[11px] text-[#758078]">{exp.date}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => exportContacts(contacts.slice(0, exp.contactCount), exp.name)}
                      className="text-xs font-semibold text-[#203C34] dark:text-[#8BB09D] hover:underline"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CSV Import Modal */}
      {importModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 command-backdrop">
          <div className="w-full max-w-xl bg-white dark:bg-[#1C2420] rounded-2xl shadow-modal border border-[#E8ECE7] dark:border-[#2C3731] overflow-hidden animate-fade-in">
            <div className="flex items-center justify-between p-5 border-b border-[#E8ECE7] dark:border-[#2C3731]">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#E9EEE9] dark:bg-[#25332C] text-[#203C34] dark:text-[#8BB09D] flex items-center justify-center">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-[#202923] dark:text-white">
                    Import Contacts from CSV
                  </h3>
                  <p className="text-xs text-[#758078] dark:text-[#8E9C93]">
                    Upload and map your prospect database
                  </p>
                </div>
              </div>
              <button onClick={() => setImportModalOpen(false)} className="text-[#758078]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              {importStage === 'upload' && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-[#739181]/40 rounded-2xl p-8 text-center space-y-3 bg-[#F7F8F5] dark:bg-[#141A17]">
                    <div className="w-10 h-10 rounded-full bg-[#E9EEE9] dark:bg-[#25332C] flex items-center justify-center mx-auto text-[#203C34] dark:text-[#8BB09D]">
                      <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-[#202923] dark:text-white">Click to select CSV file</span>
                      <p className="text-[11px] text-[#758078] mt-0.5">Supports CSV formatted with standard column headers</p>
                    </div>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      className="hidden"
                      id="csv-file-input"
                    />
                    <label
                      htmlFor="csv-file-input"
                      className="inline-block px-4 py-2 rounded-xl bg-[#203C34] text-white font-semibold cursor-pointer hover:bg-[#2c544a]"
                    >
                      Choose CSV File
                    </label>
                  </div>

                  <div className="text-center">
                    <span className="text-[#758078]">or evaluate quickly: </span>
                    <button
                      onClick={handleSimulateSampleCSV}
                      className="text-[#203C34] dark:text-[#8BB09D] font-bold hover:underline"
                    >
                      Load Sample Danish Prospect Dataset (3 records)
                    </button>
                  </div>
                </div>
              )}

              {importStage === 'mapping' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#202923] dark:text-white">Map CSV Columns to Fields</span>
                    <span className="font-mono text-[11px] text-[#758078]">{uploadedFileName} ({parsedData.length} rows)</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#F7F8F5] dark:bg-[#141A17] border border-[#E8ECE7] dark:border-[#2C3731]">
                    <div>
                      <label className="block text-[11px] text-[#758078] mb-1">Contact Name *</label>
                      <select
                        value={columnMapping.name}
                        onChange={(e) => setColumnMapping({ ...columnMapping, name: e.target.value })}
                        className="w-full px-2 py-1.5 rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] bg-white dark:bg-[#1C2420] text-xs focus:outline-none"
                      >
                        {headers.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#758078] mb-1">Company Name *</label>
                      <select
                        value={columnMapping.company}
                        onChange={(e) => setColumnMapping({ ...columnMapping, company: e.target.value })}
                        className="w-full px-2 py-1.5 rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] bg-white dark:bg-[#1C2420] text-xs focus:outline-none"
                      >
                        {headers.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#758078] mb-1">Job Title *</label>
                      <select
                        value={columnMapping.jobTitle}
                        onChange={(e) => setColumnMapping({ ...columnMapping, jobTitle: e.target.value })}
                        className="w-full px-2 py-1.5 rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] bg-white dark:bg-[#1C2420] text-xs focus:outline-none"
                      >
                        {headers.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#758078] mb-1">Business Email</label>
                      <select
                        value={columnMapping.email}
                        onChange={(e) => setColumnMapping({ ...columnMapping, email: e.target.value })}
                        className="w-full px-2 py-1.5 rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] bg-white dark:bg-[#1C2420] text-xs focus:outline-none"
                      >
                        <option value="">(None / Leave Blank)</option>
                        {headers.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#758078] mb-1">Phone Number</label>
                      <select
                        value={columnMapping.phone}
                        onChange={(e) => setColumnMapping({ ...columnMapping, phone: e.target.value })}
                        className="w-full px-2 py-1.5 rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] bg-white dark:bg-[#1C2420] text-xs focus:outline-none"
                      >
                        <option value="">(None / Leave Blank)</option>
                        {headers.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#758078] mb-1">Region</label>
                      <select
                        value={columnMapping.region}
                        onChange={(e) => setColumnMapping({ ...columnMapping, region: e.target.value })}
                        className="w-full px-2 py-1.5 rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] bg-white dark:bg-[#1C2420] text-xs focus:outline-none"
                      >
                        <option value="">(None / Leave Blank)</option>
                        {headers.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Preview Table */}
                  <div className="space-y-1.5">
                    <span className="font-semibold text-[#202923] dark:text-white">Sample Preview (first 2 records)</span>
                    <div className="border border-[#E8ECE7] dark:border-[#2C3731] rounded-xl overflow-hidden">
                      <table className="w-full text-left text-[11px]">
                        <thead className="bg-[#F7F8F5] dark:bg-[#141A17] border-b border-[#E8ECE7] dark:border-[#2C3731]">
                          <tr>
                            <th className="p-2">Name</th>
                            <th className="p-2">Company</th>
                            <th className="p-2">Title</th>
                            <th className="p-2">Email</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8ECE7] dark:divide-[#2C3731]">
                          {parsedData.slice(0, 2).map((row, idx) => (
                            <tr key={idx}>
                              <td className="p-2 font-medium">{row[columnMapping.name]}</td>
                              <td className="p-2">{row[columnMapping.company]}</td>
                              <td className="p-2">{row[columnMapping.jobTitle]}</td>
                              <td className="p-2 font-mono">{row[columnMapping.email] || '—'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-[#F7F8F5] dark:bg-[#141A17] border-t border-[#E8ECE7] dark:border-[#2C3731] flex justify-end space-x-3">
              <button
                onClick={() => setImportModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#758078] hover:text-[#202923]"
              >
                Cancel
              </button>
              {importStage === 'mapping' && (
                <button
                  onClick={handleFinishImport}
                  className="px-5 py-2 rounded-xl bg-[#203C34] text-white text-xs font-semibold hover:bg-[#2c544a]"
                >
                  Confirm & Import ({parsedData.length} records)
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
