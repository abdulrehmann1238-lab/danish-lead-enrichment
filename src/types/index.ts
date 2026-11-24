export type AccessType = 'free' | 'premium';
export type EmailStatus = 'available' | 'not_revealed' | 'verified' | 'unavailable';
export type PhoneStatus = 'available' | 'not_revealed' | 'verified' | 'unavailable';

export interface Contact {
  id: string;
  name: string;
  jobTitle: string;
  company: string;
  companyId?: string;
  industry: string;
  region: 'Copenhagen' | 'Aarhus' | 'Odense' | 'Aalborg' | 'Other Denmark';
  email: string;
  emailStatus: EmailStatus;
  phone: string;
  phoneStatus: PhoneStatus;
  access: AccessType;
  cvr: string;
  linkedin?: string;
  avatarUrl?: string;
  tags?: string[];
  optedOut: boolean;
  addedDate: string;
  enrichedAt?: string;
  enrichedByProvider?: string;
  revealedEmail?: boolean;
  revealedPhone?: boolean;
}

export interface Company {
  id: string;
  name: string;
  cvr: string;
  industry: string;
  location: string;
  region: 'Copenhagen' | 'Aarhus' | 'Odense' | 'Aalborg' | 'Other Denmark';
  employees: string;
  revenueRange: string;
  status: 'active' | 'normal' | 'dissolved';
  address: string;
  website: string;
  contactPersons: number;
  lastCvrSync: string;
  description: string;
  foundedYear: number;
  phone?: string;
  email?: string;
}

export interface ProspectList {
  id: string;
  name: string;
  description: string;
  category: string;
  contactIds: string[];
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export type TransactionType = 'purchase' | 'email_reveal' | 'phone_reveal' | 'combined_reveal' | 'reversal';
export type TransactionStatus = 'completed' | 'pending' | 'failed';

export interface CreditTransaction {
  id: string;
  description: string;
  type: TransactionType;
  credits: number;
  date: string;
  status: TransactionStatus;
  reference: string;
}

export interface EnrichmentActivity {
  id: string;
  contactId: string;
  contactName: string;
  companyName: string;
  enrichmentType: 'email' | 'phone' | 'combined' | 'cvr';
  provider: 'Prospeo' | 'Findymail' | 'Coresignal' | 'ContactOut' | 'Forager' | 'CVR Register';
  credits: number;
  status: 'success' | 'failed';
  date: string;
  details: {
    stageLogs: string[];
    returnedData: string;
    durationMs: number;
    matchScore: number;
  };
}

export interface ExportRecord {
  id: string;
  name: string;
  type: 'All Contacts' | 'Filtered Query' | 'Prospect List' | 'Enriched Contacts';
  contactCount: number;
  format: 'CSV' | 'XLSX';
  date: string;
  fileSize: string;
  status: 'ready' | 'processing';
}

export interface IntegrationItem {
  id: string;
  name: string;
  category: 'Enrichment' | 'CRM' | 'Intelligence' | 'Analytics' | 'Infrastructure';
  description: string;
  status: 'connected' | 'demo' | 'disconnected';
  icon: string;
  docsUrl: string;
  features: string[];
  apiKeyMasked?: string;
  lastSync?: string;
}

export interface OptOutRecord {
  id: string;
  email: string;
  contactName?: string;
  company?: string;
  date: string;
  source: 'User request' | 'Admin opt-out' | 'API webhook';
  reason: string;
}

export interface GDPRRequest {
  id: string;
  type: 'access' | 'rectification' | 'erasure' | 'restriction';
  subject: string;
  email: string;
  submittedAt: string;
  status: 'completed' | 'in_review' | 'pending';
  notes: string;
}

export interface SubprocessorItem {
  name: string;
  purpose: string;
  category: string;
  region: string;
  dpaStatus: 'To be verified' | 'In Progress';
}

export interface UserProfile {
  name: string;
  email: string;
  company: string;
  role: string;
  plan: 'free' | 'annual_pro';
  credits: number;
  annualRenewalDate: string;
  avatarUrl: string;
  twoFactorEnabled: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'credit';
  read: boolean;
}
