import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Settings, 
  User, 
  Building, 
  Bell, 
  Shield, 
  Moon, 
  Sun, 
  RotateCcw, 
  Check, 
  Lock,
  Smartphone
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, updateUserProfile, theme, toggleTheme, setThemeMode, resetDemoData, showToast } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [company, setCompany] = useState(user.company);
  const [role, setRole] = useState(user.role);
  const [twoFactor, setTwoFactor] = useState(user.twoFactorEnabled);

  const [notifications, setNotifications] = useState({
    enrichment: true,
    creditAlerts: true,
    billing: true,
    announcements: false,
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, email, company, role, twoFactorEnabled: twoFactor });
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#202923] dark:text-white">
          Workspace Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#758078] dark:text-[#8E9C93] mt-1">
          Manage your account profile, notification alerts, security settings, and demo environment state.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Profile & Workspace */}
        <div className="lg:col-span-8 space-y-6">
          {/* Profile Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-4">
            <h3 className="font-display text-base font-bold text-[#202923] dark:text-white">
              User Profile
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#202923] dark:text-white mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#202923] dark:text-white mb-1">Work Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#202923] dark:text-white mb-1">Company</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#202923] dark:text-white mb-1">Role / Job Title</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#203C34] text-white font-semibold hover:bg-[#2c544a]"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>

          {/* Notifications Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-4">
            <h3 className="font-display text-base font-bold text-[#202923] dark:text-white">
              Notification Preferences
            </h3>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] cursor-pointer">
                <div>
                  <div className="font-semibold text-[#202923] dark:text-white">Enrichment Completions</div>
                  <div className="text-[11px] text-[#758078]">Notify when waterfall background jobs finish</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.enrichment}
                  onChange={(e) => setNotifications({ ...notifications, enrichment: e.target.checked })}
                  className="rounded border-[#E8ECE7] text-[#203C34]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] cursor-pointer">
                <div>
                  <div className="font-semibold text-[#202923] dark:text-white">Credit Balance Low Alerts</div>
                  <div className="text-[11px] text-[#758078]">Alert when wallet falls below 100 credits</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.creditAlerts}
                  onChange={(e) => setNotifications({ ...notifications, creditAlerts: e.target.checked })}
                  className="rounded border-[#E8ECE7] text-[#203C34]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] cursor-pointer">
                <div>
                  <div className="font-semibold text-[#202923] dark:text-white">Billing & Tax Invoices</div>
                  <div className="text-[11px] text-[#758078]">Receive email copies of credit pack purchase invoices</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.billing}
                  onChange={(e) => setNotifications({ ...notifications, billing: e.target.checked })}
                  className="rounded border-[#E8ECE7] text-[#203C34]"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right Side: Appearance, Security & Reset */}
        <div className="lg:col-span-4 space-y-6">
          {/* Appearance Switcher */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-4">
            <h3 className="font-display text-base font-bold text-[#202923] dark:text-white">
              Interface Theme
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setThemeMode('light')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  theme === 'light'
                    ? 'border-[#203C34] bg-[#E9EEE9]/40 font-semibold text-[#203C34]'
                    : 'border-[#E8ECE7] dark:border-[#2C3731] text-[#758078]'
                }`}
              >
                <Sun className="w-4 h-4 mx-auto mb-1 text-[#C18A45]" />
                <span>Light Theme</span>
              </button>

              <button
                type="button"
                onClick={() => setThemeMode('dark')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  theme === 'dark'
                    ? 'border-[#739181] bg-[#25332C]/60 font-semibold text-white'
                    : 'border-[#E8ECE7] dark:border-[#2C3731] text-[#758078]'
                }`}
              >
                <Moon className="w-4 h-4 mx-auto mb-1 text-[#8BB09D]" />
                <span>Dark Theme</span>
              </button>
            </div>
          </div>

          {/* Security */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-4 text-xs">
            <h3 className="font-display text-base font-bold text-[#202923] dark:text-white">
              Security & Access
            </h3>

            <div className="flex items-center justify-between p-3 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731]">
              <div className="flex items-center space-x-2">
                <Smartphone className="w-4 h-4 text-[#739181]" />
                <div>
                  <div className="font-semibold text-[#202923] dark:text-white">Two-Factor Authentication</div>
                  <div className="text-[10px] text-[#758078]">TOTP authenticator app</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={twoFactor}
                onChange={(e) => setTwoFactor(e.target.checked)}
                className="rounded border-[#E8ECE7] text-[#203C34]"
              />
            </div>
          </div>

          {/* Reset Demo Data Card */}
          <div className="p-6 rounded-2xl bg-[#B85D57]/5 border border-[#B85D57]/20 shadow-card space-y-3 text-xs">
            <div className="font-bold text-[#B85D57] flex items-center space-x-1.5">
              <RotateCcw className="w-4 h-4" />
              <span>Reset Demo Environment</span>
            </div>
            <p className="text-[#758078] leading-relaxed">
              Restore initial contacts, revert all revealed emails, reset wallet balance back to 1,250 credits, and clear custom lists.
            </p>
            <button
              onClick={resetDemoData}
              className="w-full py-2 px-3 rounded-xl bg-[#B85D57] text-white font-semibold hover:bg-[#a14f4a] transition-colors"
            >
              Reset to Factory Demo State
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
