import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IntegrationItem } from '../../types';
import { 
  Plug, 
  ExternalLink, 
  Check, 
  RotateCw, 
  Key, 
  ShieldCheck, 
  Settings, 
  X,
  Search,
  CheckCircle2
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const IntegrationsPage: React.FC = () => {
  const { integrations, toggleIntegrationStatus, saveIntegrationApiKey, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeConfigureItem, setActiveConfigureItem] = useState<IntegrationItem | null>(null);
  const [tempApiKey, setTempApiKey] = useState('');

  const categories = ['all', 'Enrichment', 'Intelligence', 'CRM'];

  const filteredIntegrations = integrations.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handleOpenConfigure = (item: IntegrationItem) => {
    setActiveConfigureItem(item);
    setTempApiKey(item.apiKeyMasked || '');
  };

  const handleSaveConfig = () => {
    if (!activeConfigureItem) return;
    saveIntegrationApiKey(activeConfigureItem.id, tempApiKey);
    setActiveConfigureItem(null);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#202923] dark:text-white">
          Integrations & Providers Directory
        </h1>
        <p className="text-xs sm:text-sm text-[#758078] dark:text-[#8E9C93] mt-1">
          Coordinate waterfall enrichment engines, official Danish CVR registries, and enterprise CRM sync channels.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 border-b border-[#E8ECE7] dark:border-[#2C3731] pb-2 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-[#203C34] text-white shadow-subtle'
                : 'text-[#758078] hover:text-[#202923] dark:hover:text-white'
            }`}
          >
            {cat === 'all' ? 'All Integrations (9)' : cat}
          </button>
        ))}
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredIntegrations.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card hover:shadow-dropdown transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-display font-bold text-base text-[#202923] dark:text-white">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-[#E9EEE9] dark:bg-[#25332C] text-[#203C34] dark:text-[#8BB09D] font-bold">
                      {item.category}
                    </span>
                  </div>
                  {item.lastSync && (
                    <div className="text-[10px] font-mono text-[#758078] mt-0.5">
                      Last sync: {item.lastSync}
                    </div>
                  )}
                </div>

                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold flex items-center space-x-1 ${
                    item.status === 'connected'
                      ? 'bg-[#3D8060]/10 text-[#3D8060]'
                      : 'bg-[#C18A45]/10 text-[#C18A45]'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'connected' ? 'bg-[#3D8060]' : 'bg-[#C18A45]'}`} />
                  <span className="capitalize">{item.status}</span>
                </span>
              </div>

              <p className="text-xs text-[#758078] dark:text-[#8E9C93] leading-relaxed">
                {item.description}
              </p>

              {/* Features Pill tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.features.map((feat, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F7F8F5] dark:bg-[#141A17] border border-[#E8ECE7] dark:border-[#2C3731] text-[#758078]"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#E8ECE7] dark:border-[#2C3731] flex items-center justify-between text-xs">
              <button
                onClick={() => handleOpenConfigure(item)}
                className="font-semibold text-[#203C34] dark:text-[#8BB09D] hover:underline flex items-center space-x-1"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Configure</span>
              </button>

              <button
                onClick={() => toggleIntegrationStatus(item.id)}
                className="text-[11px] font-medium text-[#758078] hover:text-[#202923] dark:hover:text-white"
              >
                {item.status === 'connected' ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Configuration Modal */}
      {activeConfigureItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 command-backdrop">
          <div className="w-full max-w-md bg-white dark:bg-[#1C2420] rounded-2xl shadow-modal border border-[#E8ECE7] dark:border-[#2C3731] p-6 space-y-4 animate-fade-in text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8ECE7] dark:border-[#2C3731]">
              <div className="flex items-center space-x-2">
                <Plug className="w-4 h-4 text-[#739181]" />
                <h3 className="font-display font-bold text-sm text-[#202923] dark:text-white">
                  Configure {activeConfigureItem.name}
                </h3>
              </div>
              <button onClick={() => setActiveConfigureItem(null)} className="text-[#758078]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[#758078] leading-relaxed">
              {activeConfigureItem.description}
            </p>

            <div className="space-y-1.5">
              <label className="block font-semibold text-[#202923] dark:text-white">
                API Token / Connection Key
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-[#758078] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="e.g. prsp_live_••••••••90a4"
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none"
                />
              </div>
              <span className="text-[10px] text-[#758078]">
                Credentials are saved locally for this client demo environment.
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#F7F8F5] dark:bg-[#141A17] border border-[#E8ECE7] dark:border-[#2C3731] space-y-1">
              <div className="font-semibold text-[#202923] dark:text-white">Integration Capabilities</div>
              <ul className="text-[11px] text-[#758078] space-y-0.5 list-disc pl-4">
                {activeConfigureItem.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                onClick={() => setActiveConfigureItem(null)}
                className="px-4 py-2 rounded-xl text-[#758078]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveConfig}
                className="px-5 py-2 rounded-xl bg-[#203C34] text-white font-semibold hover:bg-[#2c544a]"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
