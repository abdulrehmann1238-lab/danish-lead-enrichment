import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  LayoutDashboard, 
  Users, 
  Building2, 
  ListFilter, 
  Sparkles, 
  Activity, 
  Wallet, 
  Download, 
  Plug, 
  BarChart3, 
  CreditCard, 
  ShieldCheck, 
  Settings, 
  SlidersHorizontal,
  Moon,
  Sun,
  RotateCcw,
  Plus
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { theme, toggleTheme, resetDemoData, showToast } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open palette
          const event = new CustomEvent('open-command-palette');
          window.dispatchEvent(event);
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigationItems = [
    { name: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard, category: 'Overview' },
    { name: 'Contact Database (15,000 Contacts)', path: '/app/contacts', icon: Users, category: 'Database' },
    { name: 'Company Intelligence & CVR', path: '/app/companies', icon: Building2, category: 'Database' },
    { name: 'Prospect Lists', path: '/app/lists', icon: ListFilter, category: 'Database' },
    { name: 'Find & Enrich Workflow', path: '/app/enrichment', icon: Sparkles, category: 'Enrichment' },
    { name: 'Enrichment Activity Log', path: '/app/enrichment-activity', icon: Activity, category: 'Enrichment' },
    { name: 'Credit Wallet & Balances', path: '/app/credits', icon: Wallet, category: 'Account' },
    { name: 'CSV Exports & Imports', path: '/app/exports', icon: Download, category: 'Workspace' },
    { name: 'Integrations & Providers', path: '/app/integrations', icon: Plug, category: 'Workspace' },
    { name: 'Analytics & Consumption', path: '/app/analytics', icon: BarChart3, category: 'Account' },
    { name: 'Billing & Subscriptions', path: '/app/billing', icon: CreditCard, category: 'Account' },
    { name: 'GDPR & Privacy Controls', path: '/app/gdpr', icon: ShieldCheck, category: 'Account' },
    { name: 'Settings & Preferences', path: '/app/settings', icon: Settings, category: 'Account' },
    { name: 'Admin Panel', path: '/app/admin', icon: SlidersHorizontal, category: 'Administration' },
  ];

  const quickActions = [
    { 
      name: 'Toggle Dark / Light Mode', 
      icon: theme === 'dark' ? Sun : Moon, 
      action: () => { toggleTheme(); onClose(); } 
    },
    { 
      name: 'Reset Demo State to Initial Factory', 
      icon: RotateCcw, 
      action: () => { resetDemoData(); onClose(); } 
    },
    { 
      name: 'Create New Prospect List', 
      icon: Plus, 
      action: () => { navigate('/app/lists'); onClose(); } 
    },
    { 
      name: 'Download All Contacts as CSV', 
      icon: Download, 
      action: () => { navigate('/app/contacts'); onClose(); } 
    },
  ];

  const filteredNav = navigationItems.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredActions = quickActions.filter(action =>
    action.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectNav = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 command-backdrop">
      <div 
        className="w-full max-w-xl bg-white dark:bg-[#1C2420] rounded-2xl shadow-modal border border-[#E8ECE7] dark:border-[#2C3731] overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E8ECE7] dark:border-[#2C3731]">
          <Search className="w-5 h-5 text-[#758078] dark:text-[#8E9C93] mr-3" />
          <input
            type="text"
            placeholder="Type a command or jump to page... (ESC to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-[#202923] dark:text-[#E9EFEA] placeholder-[#758078] dark:placeholder-[#8E9C93] text-sm focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[#E9EEE9] dark:bg-[#25332C] text-[#203C34] dark:text-[#8BB09D] rounded">
            ESC
          </kbd>
        </div>

        {/* Results list */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filteredNav.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-[11px] font-semibold text-[#758078] uppercase tracking-wider">
                Pages & Navigation
              </div>
              {filteredNav.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleSelectNav(item.path)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm text-[#202923] dark:text-[#E9EFEA] hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4 text-[#739181] group-hover:text-[#203C34] dark:group-hover:text-white" />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#758078] dark:text-[#8E9C93]">
                      {item.category}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {filteredActions.length > 0 && (
            <div className="pt-2 border-t border-[#E8ECE7] dark:border-[#2C3731] mt-2">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-[#758078] uppercase tracking-wider">
                Quick Actions
              </div>
              {filteredActions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={idx}
                    onClick={action.action}
                    className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left text-sm text-[#202923] dark:text-[#E9EFEA] hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] transition-colors group"
                  >
                    <Icon className="w-4 h-4 text-[#C18A45] group-hover:text-[#203C34] dark:group-hover:text-white" />
                    <span>{action.name}</span>
                  </button>
                );
              })}
            </div>
          )}

          {filteredNav.length === 0 && filteredActions.length === 0 && (
            <div className="py-8 text-center text-xs text-[#758078]">
              No matching pages or commands found for "{query}".
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-[#F7F8F5] dark:bg-[#141A17] border-t border-[#E8ECE7] dark:border-[#2C3731] flex items-center justify-between text-[11px] text-[#758078]">
          <span>LeadEnrich Danish Workspace</span>
          <span>Tip: Press <kbd className="font-mono bg-[#E9EEE9] dark:bg-[#25332C] px-1 rounded">Ctrl+K</kbd> anywhere</span>
        </div>
      </div>
    </div>
  );
};
