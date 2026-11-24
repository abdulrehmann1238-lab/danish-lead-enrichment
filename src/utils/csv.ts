import Papa from 'papaparse';
import { Contact } from '../types';

export function exportContactsToCSV(contacts: Contact[], filename: string = 'leadenrich-export.csv') {
  // Exclude opted-out contacts for GDPR compliance
  const safeContacts = contacts.filter(c => !c.optedOut);

  const exportData = safeContacts.map(c => ({
    'Contact Name': c.name,
    'Job Title': c.jobTitle,
    'Company': c.company,
    'CVR Number': c.cvr,
    'Industry': c.industry,
    'Region': c.region,
    'Business Email': c.revealedEmail ? c.email : 'REVEAL_REQUIRED',
    'Email Status': c.emailStatus,
    'Direct Phone': c.revealedPhone ? c.phone : 'REVEAL_REQUIRED',
    'Phone Status': c.phoneStatus,
    'Database Access Tier': c.access.toUpperCase(),
    'LinkedIn': c.linkedin || '',
    'Enriched Provider': c.enrichedByProvider || 'N/A',
    'Enriched Date': c.enrichedAt || 'N/A',
  }));

  const csv = Papa.unparse(exportData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function parseUploadedCSV(file: File): Promise<{ data: any[]; errors: any[]; meta: any }> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
}
