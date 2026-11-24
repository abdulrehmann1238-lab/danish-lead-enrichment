import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Contact, 
  Company, 
  ProspectList, 
  CreditTransaction, 
  EnrichmentActivity, 
  ExportRecord, 
  IntegrationItem, 
  OptOutRecord, 
  GDPRRequest, 
  UserProfile,
  AppNotification
} from '../types';
import { 
  INITIAL_USER, 
  INITIAL_CONTACTS, 
  INITIAL_COMPANIES, 
  INITIAL_LISTS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_ACTIVITIES, 
  INITIAL_EXPORTS, 
  INITIAL_INTEGRATIONS, 
  INITIAL_OPTOUTS, 
  INITIAL_GDPR_REQUESTS, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';
import { exportContactsToCSV } from '../utils/csv';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  description?: string;
  duration?: number;
}

interface AppContextType {
  user: UserProfile;
  contacts: Contact[];
  companies: Company[];
  lists: ProspectList[];
  transactions: CreditTransaction[];
  activities: EnrichmentActivity[];
  exports: ExportRecord[];
  integrations: IntegrationItem[];
  optOuts: OptOutRecord[];
  gdprRequests: GDPRRequest[];
  notifications: AppNotification[];
  theme: 'light' | 'dark';
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  toggleTheme: () => void;
  setThemeMode: (mode: 'light' | 'dark') => void;
  // Credit & Reveal operations
  revealContact: (
    contactId: string, 
    revealType: 'email' | 'phone' | 'combined', 
    provider?: 'Prospeo' | 'Findymail' | 'Coresignal' | 'ContactOut' | 'Forager'
  ) => Promise<{ success: boolean; message: string; creditsDeducted?: number }>;
  addCredits: (amount: number, packName?: string) => void;
  bulkEnrich: (
    contactIds: string[], 
    revealType: 'email' | 'phone' | 'combined'
  ) => Promise<{ success: boolean; message: string; enrichedCount: number; creditsUsed: number }>;
  // Lists operations
  createList: (name: string, description: string, category: string) => ProspectList;
  updateList: (id: string, name: string, description: string, category: string) => void;
  deleteList: (id: string) => void;
  addContactsToList: (listId: string, contactIds: string[]) => void;
  removeContactFromList: (listId: string, contactId: string) => void;
  // CVR sync
  syncCompanyCVR: (companyId: string) => Promise<boolean>;
  // GDPR
  addOptOut: (email: string, contactName?: string, company?: string, reason?: string) => void;
  removeOptOut: (id: string) => void;
  updateGDPRRequestStatus: (id: string, status: 'completed' | 'in_review' | 'pending') => void;
  // Integrations
  toggleIntegrationStatus: (id: string) => void;
  saveIntegrationApiKey: (id: string, key: string) => void;
  // Export
  exportContacts: (contactsToExport: Contact[], filename?: string) => void;
  // User Profile
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  upgradeToAnnualPro: () => void;
  resetDemoData: () => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'leadenrich_user_v1',
  CONTACTS: 'leadenrich_contacts_v1',
  COMPANIES: 'leadenrich_companies_v1',
  LISTS: 'leadenrich_lists_v1',
  TRANSACTIONS: 'leadenrich_transactions_v1',
  ACTIVITIES: 'leadenrich_activities_v1',
  EXPORTS: 'leadenrich_exports_v1',
  INTEGRATIONS: 'leadenrich_integrations_v1',
  OPTOUTS: 'leadenrich_optouts_v1',
  GDPR_REQUESTS: 'leadenrich_gdpr_v1',
  NOTIFICATIONS: 'leadenrich_notifications_v1',
  THEME: 'leadenrich_theme_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light';
  });

  // Centralized demo state with localStorage hydration
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [contacts, setContacts] = useState<Contact[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONTACTS);
    return saved ? JSON.parse(saved) : INITIAL_CONTACTS;
  });

  const [companies, setCompanies] = useState<Company[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COMPANIES);
    return saved ? JSON.parse(saved) : INITIAL_COMPANIES;
  });

  const [lists, setLists] = useState<ProspectList[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LISTS);
    return saved ? JSON.parse(saved) : INITIAL_LISTS;
  });

  const [transactions, setTransactions] = useState<CreditTransaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [activities, setActivities] = useState<EnrichmentActivity[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  const [exports, setExports] = useState<ExportRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EXPORTS);
    return saved ? JSON.parse(saved) : INITIAL_EXPORTS;
  });

  const [integrations, setIntegrations] = useState<IntegrationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INTEGRATIONS);
    return saved ? JSON.parse(saved) : INITIAL_INTEGRATIONS;
  });

  const [optOuts, setOptOuts] = useState<OptOutRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.OPTOUTS);
    return saved ? JSON.parse(saved) : INITIAL_OPTOUTS;
  });

  const [gdprRequests, setGdprRequests] = useState<GDPRRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GDPR_REQUESTS);
    return saved ? JSON.parse(saved) : INITIAL_GDPR_REQUESTS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Apply dark mode class to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  // Persist state updates to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LISTS, JSON.stringify(lists));
  }, [lists]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXPORTS, JSON.stringify(exports));
  }, [exports]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INTEGRATIONS, JSON.stringify(integrations));
  }, [integrations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.OPTOUTS, JSON.stringify(optOuts));
  }, [optOuts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GDPR_REQUESTS, JSON.stringify(gdprRequests));
  }, [gdprRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  // Toast dispatchers
  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { ...toast, id };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const setThemeMode = (mode: 'light' | 'dark') => {
    setTheme(mode);
  };

  // Safe credit deduction rules:
  // Email reveal: 5 credits
  // Phone reveal: 10 credits
  // Combined reveal: 15 credits
  const revealContact = async (
    contactId: string, 
    revealType: 'email' | 'phone' | 'combined', 
    chosenProvider?: 'Prospeo' | 'Findymail' | 'Coresignal' | 'ContactOut' | 'Forager'
  ): Promise<{ success: boolean; message: string; creditsDeducted?: number }> => {
    const contact = contacts.find(c => c.id === contactId);
    if (!contact) {
      return { success: false, message: 'Contact not found.' };
    }

    // 1. GDPR check: Opted-out contacts CANNOT be enriched
    if (contact.optedOut || optOuts.some(o => o.email.toLowerCase() === contact.email.toLowerCase())) {
      showToast({
        type: 'error',
        title: 'GDPR Opt-Out Enforced',
        description: `${contact.name} (${contact.email}) is registered on the suppression list and cannot be processed.`,
      });
      return { success: false, message: 'Contact has opted out under GDPR.' };
    }

    // 2. Subscription check: Premium contacts require annual subscription
    if (contact.access === 'premium' && user.plan !== 'annual_pro') {
      showToast({
        type: 'warning',
        title: 'Premium Contact Locked',
        description: 'This executive contact belongs to the premium 5,000 database. Annual subscription required.',
      });
      return { success: false, message: 'Premium contact requires annual subscription.' };
    }

    // 3. Deduplication check: Do not re-charge if already revealed
    const needEmail = (revealType === 'email' || revealType === 'combined') && !contact.revealedEmail;
    const needPhone = (revealType === 'phone' || revealType === 'combined') && !contact.revealedPhone;

    if (!needEmail && !needPhone) {
      showToast({
        type: 'info',
        title: 'Already Enriched',
        description: 'This contact information has already been revealed in your workspace.',
      });
      return { success: true, message: 'Already revealed at no additional credit cost.', creditsDeducted: 0 };
    }

    let requiredCredits = 0;
    if (needEmail && needPhone) requiredCredits = 15;
    else if (needEmail) requiredCredits = 5;
    else if (needPhone) requiredCredits = 10;

    // 4. Concurrency & Wallet balance check: Wallet balance cannot go below zero
    if (user.credits < requiredCredits) {
      showToast({
        type: 'error',
        title: 'Insufficient Prepaid Credits',
        description: `Operation requires ${requiredCredits} credits, but wallet has only ${user.credits}. Please purchase a credit pack.`,
      });
      return { success: false, message: 'Insufficient credits.' };
    }

    // Deduct credits and update state
    const providerToUse = chosenProvider || (needPhone ? 'ContactOut' : 'Prospeo');
    const newBalance = user.credits - requiredCredits;

    // Atomic update
    setUser(prev => ({ ...prev, credits: newBalance }));

    const nowFormatted = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const txRef = 'LE-REV-' + Math.floor(10000 + Math.random() * 90000);

    const newTx: CreditTransaction = {
      id: 'tx-' + Date.now(),
      description: `${revealType === 'combined' ? 'Combined Reveal' : revealType === 'email' ? 'Email Reveal' : 'Phone Reveal'} — ${contact.name}`,
      type: revealType === 'combined' ? 'combined_reveal' : revealType === 'email' ? 'email_reveal' : 'phone_reveal',
      credits: -requiredCredits,
      date: nowFormatted,
      status: 'completed',
      reference: txRef,
    };
    setTransactions(prev => [newTx, ...prev]);

    // Update contact record
    const updatedContact: Contact = {
      ...contact,
      revealedEmail: contact.revealedEmail || needEmail,
      revealedPhone: contact.revealedPhone || needPhone,
      emailStatus: (contact.revealedEmail || needEmail) ? 'verified' : contact.emailStatus,
      phoneStatus: (contact.revealedPhone || needPhone) ? 'verified' : contact.phoneStatus,
      phone: (needPhone && (contact.phone.includes('••') || !contact.phone)) ? '+45 ' + Math.floor(20 + Math.random() * 70) + ' ' + Math.floor(10 + Math.random() * 89) + ' ' + Math.floor(10 + Math.random() * 89) + ' ' + Math.floor(10 + Math.random() * 89) : contact.phone,
      enrichedAt: nowFormatted,
      enrichedByProvider: providerToUse,
    };

    setContacts(prev => prev.map(c => c.id === contact.id ? updatedContact : c));

    // Add activity record
    const newActivity: EnrichmentActivity = {
      id: 'act-' + Date.now(),
      contactId: contact.id,
      contactName: contact.name,
      companyName: contact.company,
      enrichmentType: revealType,
      provider: providerToUse,
      credits: requiredCredits,
      status: 'success',
      date: nowFormatted,
      details: {
        stageLogs: [
          `Target: ${contact.name} at ${contact.company}`,
          `Provider routed: ${providerToUse}`,
          `Danish MX & SMTP validation confirmed`,
          `Atomic ledger deduction: ${requiredCredits} credits`,
        ],
        returnedData: `${needEmail ? `Email: ${updatedContact.email} (Verified)` : ''} ${needPhone ? `| Phone: ${updatedContact.phone}` : ''}`,
        durationMs: Math.floor(450 + Math.random() * 400),
        matchScore: Math.floor(95 + Math.random() * 5),
      }
    };
    setActivities(prev => [newActivity, ...prev]);

    showToast({
      type: 'success',
      title: 'Enrichment Succeeded',
      description: `Revealed contact info for ${contact.name}. ${requiredCredits} credits deducted.`,
    });

    return { success: true, message: 'Contact successfully enriched.', creditsDeducted: requiredCredits };
  };

  // Add credits from package purchase
  const addCredits = (amount: number, packName: string = 'Prepaid Credit Pack') => {
    const newBalance = user.credits + amount;
    setUser(prev => ({ ...prev, credits: newBalance }));

    const nowFormatted = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newTx: CreditTransaction = {
      id: 'tx-' + Date.now(),
      description: `${packName} Purchase (+${amount.toLocaleString()} credits)`,
      type: 'purchase',
      credits: amount,
      date: nowFormatted,
      status: 'completed',
      reference: 'STRIPE-DEMO-' + Math.floor(10000 + Math.random() * 90000),
    };

    setTransactions(prev => [newTx, ...prev]);

    showToast({
      type: 'success',
      title: 'Credit Pack Added',
      description: `Successfully credited ${amount.toLocaleString()} credits to your wallet. New balance: ${newBalance.toLocaleString()}.`,
    });
  };

  // Bulk enrichment with full pre-flight verification
  const bulkEnrich = async (
    contactIds: string[], 
    revealType: 'email' | 'phone' | 'combined'
  ): Promise<{ success: boolean; message: string; enrichedCount: number; creditsUsed: number }> => {
    // Filter eligible contacts
    const targets = contacts.filter(c => contactIds.includes(c.id));
    
    // Check opt-outs
    const optedOutIds = optOuts.map(o => o.email.toLowerCase());
    const validTargets = targets.filter(c => !c.optedOut && !optedOutIds.includes(c.email.toLowerCase()));

    if (validTargets.length === 0) {
      showToast({
        type: 'error',
        title: 'Bulk Job Blocked',
        description: 'All selected contacts are either opted-out under GDPR or already enriched.',
      });
      return { success: false, message: 'No eligible contacts.', enrichedCount: 0, creditsUsed: 0 };
    }

    // Calculate total required credits
    let totalNeeded = 0;
    const ratePerContact = revealType === 'combined' ? 15 : revealType === 'email' ? 5 : 10;
    
    // Check which ones actually need revealing
    const needWork = validTargets.filter(c => {
      if (revealType === 'email') return !c.revealedEmail;
      if (revealType === 'phone') return !c.revealedPhone;
      return !c.revealedEmail || !c.revealedPhone;
    });

    totalNeeded = needWork.length * ratePerContact;

    // Strict wallet check: block entire job if insufficient
    if (user.credits < totalNeeded) {
      showToast({
        type: 'error',
        title: 'Bulk Job Insufficient Credits',
        description: `This bulk job requires ${totalNeeded.toLocaleString()} credits for ${needWork.length} contacts, but you only have ${user.credits.toLocaleString()}. Please purchase credits.`,
      });
      return { success: false, message: 'Insufficient wallet balance for bulk job.', enrichedCount: 0, creditsUsed: 0 };
    }

    // Deduct credits once atomically
    setUser(prev => ({ ...prev, credits: prev.credits - totalNeeded }));

    const nowFormatted = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newTx: CreditTransaction = {
      id: 'tx-' + Date.now(),
      description: `Bulk ${revealType} Enrichment (${needWork.length} Danish contacts)`,
      type: revealType === 'combined' ? 'combined_reveal' : revealType === 'email' ? 'email_reveal' : 'phone_reveal',
      credits: -totalNeeded,
      date: nowFormatted,
      status: 'completed',
      reference: 'LE-BULK-' + Math.floor(10000 + Math.random() * 90000),
    };
    setTransactions(prev => [newTx, ...prev]);

    // Update contacts
    const updatedIds = new Set(needWork.map(c => c.id));
    setContacts(prev => prev.map(c => {
      if (updatedIds.has(c.id)) {
        return {
          ...c,
          revealedEmail: true,
          revealedPhone: revealType === 'phone' || revealType === 'combined' ? true : c.revealedPhone,
          emailStatus: 'verified',
          phoneStatus: revealType === 'phone' || revealType === 'combined' ? 'verified' : c.phoneStatus,
          phone: (c.phone.includes('••') || !c.phone) ? '+45 ' + Math.floor(20 + Math.random() * 70) + ' ' + Math.floor(10 + Math.random() * 89) + ' ' + Math.floor(10 + Math.random() * 89) + ' ' + Math.floor(10 + Math.random() * 89) : c.phone,
          enrichedAt: nowFormatted,
          enrichedByProvider: 'Prospeo & Findymail Waterfall',
        };
      }
      return c;
    }));

    // Add activity record
    const newActivity: EnrichmentActivity = {
      id: 'act-' + Date.now(),
      contactId: 'bulk',
      contactName: `${needWork.length} Contacts (Batch)`,
      companyName: 'Multiple Danish Companies',
      enrichmentType: revealType,
      provider: 'Prospeo',
      credits: totalNeeded,
      status: 'success',
      date: nowFormatted,
      details: {
        stageLogs: [
          `Batch pre-flight checks: ${targets.length} submitted, ${validTargets.length} validated`,
          `Opt-out exclusions applied: ${targets.length - validTargets.length} skipped`,
          `Waterfall dispatch executed across Prospeo and Findymail`,
          `Atomic deduction: ${totalNeeded} credits`,
        ],
        returnedData: `Successfully revealed ${needWork.length} records.`,
        durationMs: 1420,
        matchScore: 98,
      }
    };
    setActivities(prev => [newActivity, ...prev]);

    showToast({
      type: 'success',
      title: 'Bulk Enrichment Completed',
      description: `Successfully enriched ${needWork.length} contacts using ${totalNeeded} credits.`,
    });

    return { 
      success: true, 
      message: `Enriched ${needWork.length} contacts.`, 
      enrichedCount: needWork.length, 
      creditsUsed: totalNeeded 
    };
  };

  // Lists functions
  const createList = (name: string, description: string, category: string): ProspectList => {
    const newList: ProspectList = {
      id: 'lst-' + Date.now(),
      name,
      description,
      category,
      contactIds: [],
      owner: user.name,
      createdAt: new Date().toISOString().substring(0, 10),
      updatedAt: new Date().toISOString().substring(0, 10),
    };
    setLists(prev => [newList, ...prev]);
    showToast({
      type: 'success',
      title: 'Prospect List Created',
      description: `"${name}" list created successfully.`,
    });
    return newList;
  };

  const updateList = (id: string, name: string, description: string, category: string) => {
    setLists(prev => prev.map(l => l.id === id ? {
      ...l,
      name,
      description,
      category,
      updatedAt: new Date().toISOString().substring(0, 10),
    } : l));
    showToast({
      type: 'success',
      title: 'List Updated',
      description: `List "${name}" updated.`,
    });
  };

  const deleteList = (id: string) => {
    const target = lists.find(l => l.id === id);
    setLists(prev => prev.filter(l => l.id !== id));
    showToast({
      type: 'info',
      title: 'List Removed',
      description: target ? `List "${target.name}" was deleted.` : 'List removed.',
    });
  };

  const addContactsToList = (listId: string, contactIds: string[]) => {
    setLists(prev => prev.map(l => {
      if (l.id === listId) {
        const unique = Array.from(new Set([...l.contactIds, ...contactIds]));
        return {
          ...l,
          contactIds: unique,
          updatedAt: new Date().toISOString().substring(0, 10),
        };
      }
      return l;
    }));
    showToast({
      type: 'success',
      title: 'Contacts Added to List',
      description: `Added ${contactIds.length} contact(s) to target prospect list.`,
    });
  };

  const removeContactFromList = (listId: string, contactId: string) => {
    setLists(prev => prev.map(l => {
      if (l.id === listId) {
        return {
          ...l,
          contactIds: l.contactIds.filter(id => id !== contactId),
          updatedAt: new Date().toISOString().substring(0, 10),
        };
      }
      return l;
    }));
  };

  // CVR simulation
  const syncCompanyCVR = async (companyId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const nowFormatted = new Date().toISOString().replace('T', ' ').substring(0, 16);
    setCompanies(prev => prev.map(c => c.id === companyId ? { ...c, lastCvrSync: nowFormatted } : c));
    showToast({
      type: 'success',
      title: 'CVR Register Refreshed',
      description: 'Synchronized real-time registration data with Erhvervsstyrelsen (Danish Business Authority).',
    });
    return true;
  };

  // GDPR Opt-Out enforcement
  const addOptOut = (email: string, contactName?: string, company?: string, reason: string = 'Exercised GDPR Article 21 right to object.') => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return;

    const newRecord: OptOutRecord = {
      id: 'opt-' + Date.now(),
      email: cleanEmail,
      contactName,
      company,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      source: 'User request',
      reason,
    };

    setOptOuts(prev => [newRecord, ...prev]);

    // Enforce opt-out across contacts immediately
    setContacts(prev => prev.map(c => {
      if (c.email.toLowerCase() === cleanEmail) {
        return {
          ...c,
          optedOut: true,
          emailStatus: 'unavailable',
          phoneStatus: 'unavailable',
        };
      }
      return c;
    }));

    showToast({
      type: 'warning',
      title: 'GDPR Opt-Out Registered',
      description: `${cleanEmail} has been added to suppression list. Ineligible for enrichment and export.`,
    });
  };

  const removeOptOut = (id: string) => {
    const target = optOuts.find(o => o.id === id);
    setOptOuts(prev => prev.filter(o => o.id !== id));
    if (target) {
      setContacts(prev => prev.map(c => {
        if (c.email.toLowerCase() === target.email.toLowerCase()) {
          return { ...c, optedOut: false, emailStatus: 'available' };
        }
        return c;
      }));
    }
    showToast({
      type: 'info',
      title: 'Opt-Out Record Removed',
      description: 'Contact restored to standard processing eligibility.',
    });
  };

  const updateGDPRRequestStatus = (id: string, status: 'completed' | 'in_review' | 'pending') => {
    setGdprRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    showToast({
      type: 'info',
      title: 'DSR Request Updated',
      description: `Data subject request status changed to ${status}.`,
    });
  };

  // Integrations
  const toggleIntegrationStatus = (id: string) => {
    setIntegrations(prev => prev.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === 'connected' ? 'disconnected' : 'connected';
        return { ...item, status: nextStatus, lastSync: new Date().toISOString().replace('T', ' ').substring(0, 16) };
      }
      return item;
    }));
  };

  const saveIntegrationApiKey = (id: string, key: string) => {
    setIntegrations(prev => prev.map(item => {
      if (item.id === id) {
        const masked = key.length > 8 ? `${key.substring(0, 4)}••••••••${key.substring(key.length - 4)}` : '••••••••';
        return { ...item, status: 'connected', apiKeyMasked: masked, lastSync: new Date().toISOString().replace('T', ' ').substring(0, 16) };
      }
      return item;
    }));
    showToast({
      type: 'success',
      title: 'Integration Configured',
      description: 'API credentials saved and connection verified (simulated).',
    });
  };

  // Export contacts as real CSV download
  const exportContacts = (contactsToExport: Contact[], filename: string = 'leadenrich-export.csv') => {
    const safeCount = contactsToExport.filter(c => !c.optedOut).length;
    exportContactsToCSV(contactsToExport, filename);

    const newRecord: ExportRecord = {
      id: 'exp-' + Date.now(),
      name: filename.endsWith('.csv') ? filename : `${filename}.csv`,
      type: 'Filtered Query',
      contactCount: safeCount,
      format: 'CSV',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      fileSize: `${(safeCount * 0.45).toFixed(1)} KB`,
      status: 'ready',
    };

    setExports(prev => [newRecord, ...prev]);

    showToast({
      type: 'success',
      title: 'CSV Export Generated',
      description: `Downloaded ${safeCount} records. Opted-out contacts were automatically excluded.`,
    });
  };

  // User profile & plan
  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
    showToast({
      type: 'success',
      title: 'Profile Updated',
      description: 'Your workspace preferences have been saved.',
    });
  };

  const upgradeToAnnualPro = () => {
    setUser(prev => ({
      ...prev,
      plan: 'annual_pro',
      annualRenewalDate: '2027-11-25',
    }));
    showToast({
      type: 'success',
      title: 'Annual Professional Plan Activated',
      description: 'Full access to all 15,000 Danish contacts unlocked.',
    });
  };

  const resetDemoData = () => {
    setUser(INITIAL_USER);
    setContacts(INITIAL_CONTACTS);
    setCompanies(INITIAL_COMPANIES);
    setLists(INITIAL_LISTS);
    setTransactions(INITIAL_TRANSACTIONS);
    setActivities(INITIAL_ACTIVITIES);
    setExports(INITIAL_EXPORTS);
    setIntegrations(INITIAL_INTEGRATIONS);
    setOptOuts(INITIAL_OPTOUTS);
    setGdprRequests(INITIAL_GDPR_REQUESTS);
    setNotifications(INITIAL_NOTIFICATIONS);

    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.CONTACTS);
    localStorage.removeItem(STORAGE_KEYS.COMPANIES);
    localStorage.removeItem(STORAGE_KEYS.LISTS);
    localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVITIES);
    localStorage.removeItem(STORAGE_KEYS.EXPORTS);
    localStorage.removeItem(STORAGE_KEYS.INTEGRATIONS);
    localStorage.removeItem(STORAGE_KEYS.OPTOUTS);
    localStorage.removeItem(STORAGE_KEYS.GDPR_REQUESTS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);

    showToast({
      type: 'info',
      title: 'Demo State Reset',
      description: 'All mock data, credit balances and prospect lists restored to initial factory states.',
    });
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        contacts,
        companies,
        lists,
        transactions,
        activities,
        exports,
        integrations,
        optOuts,
        gdprRequests,
        notifications,
        theme,
        toasts,
        showToast,
        removeToast,
        toggleTheme,
        setThemeMode,
        revealContact,
        addCredits,
        bulkEnrich,
        createList,
        updateList,
        deleteList,
        addContactsToList,
        removeContactFromList,
        syncCompanyCVR,
        addOptOut,
        removeOptOut,
        updateGDPRRequestStatus,
        toggleIntegrationStatus,
        saveIntegrationApiKey,
        exportContacts,
        updateUserProfile,
        upgradeToAnnualPro,
        resetDemoData,
        markNotificationAsRead,
        markAllNotificationsAsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
