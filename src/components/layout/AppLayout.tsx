import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
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
  Search,
  Bell,
  ChevronRight,
  Menu,
  X,
  Plus,
  ArrowUpRight,
  LogOut,
  Moon,
  Sun,
  RotateCcw,
  Check,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { CommandPalette } from '../ui/CommandPalette';
import { ToastContainer } from '../ui/ToastContainer';

interface NavItem {
  name: string;
  path: string;
  icon: any;
  badge?: string;
  highlight?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export const AppLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    user, 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    theme, 
    toggleTheme, 
    resetDemoData, 
    upgradeToAnnualPro 
  } = useApp();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navigationGroups: NavGroup[] = [
    {
      title: 'OVERVIEW',
      items: [
        { name: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
      ],
    },
    {
      title: 'DATABASE',
      items: [
        { name: 'Contacts', path: '/app/contacts', icon: Users, badge: '15k' },
        { name: 'Companies', path: '/app/companies', icon: Building2 },
        { name: 'Lists', path: '/app/lists', icon: ListFilter },
      ],
    },
    {
      title: 'ENRICHMENT',
      items: [
        { name: 'Find & Enrich', path: '/app/enrichment', icon: Sparkles, highlight: true },
        { name: 'Enrichment Activity', path: '/app/enrichment-activity', icon: Activity },
      ],
    },
    {
      title: 'WORKSPACE',
      items: [
        { name: 'Exports', path: '/app/exports', icon: Download },
        { name: 'Integrations', path: '/app/integrations', icon: Plug },
      ],
    },
    {
      title: 'ACCOUNT',
      items: [
        { name: 'Credit Wallet', path: '/app/credits', icon: Wallet, badge: `${user.credits}` },
        { name: 'Billing', path: '/app/billing', icon: CreditCard },
        { name: 'Analytics', path: '/app/analytics', icon: BarChart3 },
        { name: 'GDPR & Privacy', path: '/app/gdpr', icon: ShieldCheck },
        { name: 'Settings', path: '/app/settings', icon: Settings },
      ],
    },
    {
      title: 'ADMINISTRATION',
      items: [
        { name: 'Admin Panel', path: '/app/admin', icon: SlidersHorizontal },
      ],
    },
  ];

  // Derive breadcrumbs
  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === '/app/dashboard') return ['Overview', 'Dashboard'];
    if (path === '/app/contacts') return ['Database', 'Contacts'];
    if (path === '/app/companies') return ['Database', 'Companies'];
    if (path === '/app/lists') return ['Database', 'Prospect Lists'];
    if (path === '/app/enrichment') return ['Enrichment', 'Find & Enrich'];
    if (path === '/app/enrichment-activity') return ['Enrichment', 'Activity Log'];
    if (path === '/app/exports') return ['Workspace', 'Exports & Imports'];
    if (path === '/app/integrations') return ['Workspace', 'Integrations'];
    if (path === '/app/credits') return ['Account', 'Credit Wallet'];
    if (path === '/app/billing') return ['Account', 'Billing & Subscriptions'];
    if (path === '/app/analytics') return ['Account', 'Analytics'];
    if (path === '/app/gdpr') return ['Account', 'GDPR & Privacy'];
    if (path === '/app/settings') return ['Account', 'Settings'];
    if (path === '/app/admin') return ['Administration', 'Admin Panel'];
    return ['LeadEnrich', 'Workspace'];
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="min-h-screen bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-[#E9EFEA] flex flex-col antialiased">
      <ToastContainer />
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden md:flex flex-col border-r border-[#E8ECE7] dark:border-[#2C3731] bg-white dark:bg-[#1C2420] transition-all duration-200 z-20 ${
            sidebarCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          {/* Logo & Workspace Selector */}
          <div className="h-16 px-4 border-b border-[#E8ECE7] dark:border-[#2C3731] flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-[#203C34] flex-shrink-0 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border border-[#739181] border-dashed" />
                <div className="absolute w-1.5 h-1.5 rounded-full bg-[#E9EEE9]" />
              </div>
              {!sidebarCollapsed && (
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center space-x-1">
                    <span className="font-display text-sm font-bold tracking-tight text-[#203C34] dark:text-white">
                      LeadEnrich
                    </span>
                    <span className="text-[9px] font-mono uppercase px-1 py-0.2 rounded bg-[#E9EEE9] dark:bg-[#25332C] text-[#203C34] dark:text-[#8BB09D] font-bold">
                      DK
                    </span>
                  </div>
                  <span className="text-[11px] text-[#758078] truncate">
                    {user.company}
                  </span>
                </div>
              )}
            </Link>

            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 rounded-md text-[#758078] hover:text-[#202923] dark:hover:text-white hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] text-xs"
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${sidebarCollapsed ? '' : 'rotate-180'}`} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
            {navigationGroups.map((group) => (
              <div key={group.title} className="space-y-1">
                {!sidebarCollapsed && (
                  <div className="px-3 pb-1.5 text-[10px] font-semibold tracking-wider text-[#758078] dark:text-[#8E9C93] uppercase">
                    {group.title}
                  </div>
                )}
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      title={sidebarCollapsed ? item.name : undefined}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                        isActive
                          ? 'bg-[#203C34] text-white shadow-subtle'
                          : 'text-[#758078] dark:text-[#8E9C93] hover:text-[#202923] dark:hover:text-white hover:bg-[#F3F5F2] dark:hover:bg-[#232C27]'
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <Icon
                          className={`w-4 h-4 flex-shrink-0 transition-colors ${
                            isActive
                              ? 'text-white'
                              : item.highlight
                              ? 'text-[#739181] group-hover:text-[#203C34] dark:group-hover:text-white'
                              : 'text-[#758078] dark:text-[#8E9C93] group-hover:text-[#202923] dark:group-hover:text-white'
                          }`}
                        />
                        {!sidebarCollapsed && (
                          <span className="truncate">{item.name}</span>
                        )}
                      </div>

                      {!sidebarCollapsed && item.badge && (
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-[#E9EEE9] dark:bg-[#25332C] text-[#203C34] dark:text-[#8BB09D]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>

          {/* User Profile Mini Footer */}
          {!sidebarCollapsed && (
            <div className="p-3 border-t border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5]/50 dark:bg-[#141A17]/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#203C34] text-white flex items-center justify-center font-semibold text-xs flex-shrink-0">
                    AM
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-semibold text-[#202923] dark:text-white truncate">
                      {user.name}
                    </div>
                    <div className="text-[10px] text-[#758078] flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3D8060]" />
                      <span>{user.plan === 'annual_pro' ? 'Annual Pro' : 'Free Demo'}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={toggleTheme}
                  className="p-1.5 rounded-md text-[#758078] hover:text-[#202923] dark:hover:text-white hover:bg-white dark:hover:bg-[#232C27] transition-colors"
                  title="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden bg-black/50 command-backdrop">
            <div className="w-72 bg-white dark:bg-[#1C2420] h-full flex flex-col p-4 shadow-modal">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8ECE7] dark:border-[#2C3731]">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-[#203C34] flex items-center justify-center">
                    <div className="w-3.5 h-3.5 rounded-full border border-[#739181] border-dashed" />
                  </div>
                  <span className="font-display font-bold text-sm text-[#203C34] dark:text-white">
                    LeadEnrich DK
                  </span>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-[#758078] hover:text-black dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {navigationGroups.map((group) => (
                  <div key={group.title} className="space-y-1">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[#758078] px-2">
                      {group.title}
                    </div>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setMobileSidebarOpen(false)}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium ${
                            isActive
                              ? 'bg-[#203C34] text-white'
                              : 'text-[#758078] hover:bg-[#F3F5F2] dark:hover:bg-[#232C27]'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className="w-4 h-4" />
                            <span>{item.name}</span>
                          </div>
                          {item.badge && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/10">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#E8ECE7] dark:border-[#2C3731] flex items-center justify-between text-xs">
                <button
                  onClick={() => { toggleTheme(); setMobileSidebarOpen(false); }}
                  className="flex items-center space-x-1.5 text-[#758078]"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
                </button>
                <button
                  onClick={() => { resetDemoData(); setMobileSidebarOpen(false); }}
                  className="flex items-center space-x-1 text-[#758078]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Demo</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Wrapper */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Header */}
          <header className="h-16 px-4 sm:px-6 border-b border-[#E8ECE7] dark:border-[#2C3731] bg-white dark:bg-[#1C2420] flex items-center justify-between sticky top-0 z-10 transition-colors">
            {/* Left: Mobile hamburger & Breadcrumb */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="p-1.5 rounded-lg text-[#758078] hover:text-[#202923] md:hidden"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-1.5 text-xs text-[#758078] dark:text-[#8E9C93]">
                <span>{breadcrumbs[0]}</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="font-semibold text-[#202923] dark:text-white">
                  {breadcrumbs[1]}
                </span>
              </div>
            </div>

            {/* Right: Search trigger, Credit Wallet Pill, Notifications, User Profile */}
            <div className="flex items-center space-x-3">
              {/* Command Palette Trigger */}
              <button
                onClick={() => setCommandPaletteOpen(true)}
                className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-xs text-[#758078] hover:border-[#739181] transition-all"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search or jump to...</span>
                <kbd className="text-[10px] font-mono px-1.5 py-0.2 bg-white dark:bg-[#232C27] rounded border border-[#E8ECE7] dark:border-[#2C3731]">
                  ⌘K
                </kbd>
              </button>

              {/* Credit Wallet Balance Pill */}
              <Link
                to="/app/credits"
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#E9EEE9] dark:bg-[#25332C] border border-[#739181]/30 hover:border-[#203C34] transition-all group"
                title="View Credit Wallet & Pricing"
              >
                <div className="w-2 h-2 rounded-full bg-[#3D8060] animate-pulse-subtle" />
                <span className="text-xs font-semibold text-[#203C34] dark:text-[#E9EFEA] font-mono">
                  {user.credits.toLocaleString()} credits
                </span>
                <Plus className="w-3.5 h-3.5 text-[#739181] group-hover:rotate-90 transition-transform" />
              </Link>

              {/* Notifications Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 rounded-lg text-[#758078] hover:text-[#202923] dark:hover:text-white hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#B85D57]" />
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1C2420] rounded-xl shadow-dropdown border border-[#E8ECE7] dark:border-[#2C3731] p-3 z-30 animate-fade-in">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E8ECE7] dark:border-[#2C3731]">
                      <span className="text-xs font-semibold text-[#202923] dark:text-white">
                        Notifications ({unreadCount} new)
                      </span>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllNotificationsAsRead}
                          className="text-[11px] text-[#739181] hover:underline"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>

                    <div className="divide-y divide-[#E8ECE7] dark:divide-[#2C3731] max-h-64 overflow-y-auto">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationAsRead(n.id)}
                          className={`py-2.5 px-1 cursor-pointer transition-colors ${
                            !n.read ? 'bg-[#F7F8F5]/80 dark:bg-[#232C27]/50 rounded-lg' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-[#202923] dark:text-white">
                              {n.title}
                            </span>
                            <span className="text-[10px] text-[#758078] font-mono">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-[#758078] dark:text-[#8E9C93] mt-0.5 leading-relaxed">
                            {n.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Menu Trigger */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 p-1 rounded-lg hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-[#203C34] text-white flex items-center justify-center font-semibold text-xs">
                    AM
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#758078]" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1C2420] rounded-xl shadow-dropdown border border-[#E8ECE7] dark:border-[#2C3731] p-2 z-30 animate-fade-in text-xs space-y-1">
                    <div className="px-3 py-2 border-b border-[#E8ECE7] dark:border-[#2C3731]">
                      <div className="font-semibold text-[#202923] dark:text-white">{user.name}</div>
                      <div className="text-[11px] text-[#758078] truncate">{user.email}</div>
                      <div className="mt-1 text-[10px] font-mono inline-block px-1.5 py-0.5 rounded bg-[#E9EEE9] dark:bg-[#25332C] text-[#203C34] dark:text-[#8BB09D]">
                        Plan: {user.plan === 'annual_pro' ? 'Annual Pro' : 'Free Demo'}
                      </div>
                    </div>

                    <Link
                      to="/app/settings"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-[#202923] dark:text-white hover:bg-[#F3F5F2] dark:hover:bg-[#232C27]"
                    >
                      <Settings className="w-3.5 h-3.5 text-[#758078]" />
                      <span>Workspace Settings</span>
                    </Link>

                    {user.plan !== 'annual_pro' && (
                      <button
                        onClick={() => { upgradeToAnnualPro(); setProfileDropdownOpen(false); }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-[#3D8060] hover:bg-[#3D8060]/10 font-semibold"
                      >
                        <span className="flex items-center space-x-2">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Simulate Pro Upgrade</span>
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => { resetDemoData(); setProfileDropdownOpen(false); }}
                      className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-[#758078] hover:text-[#202923] dark:hover:text-white hover:bg-[#F3F5F2] dark:hover:bg-[#232C27]"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Demo Data</span>
                    </button>

                    <div className="border-t border-[#E8ECE7] dark:border-[#2C3731] pt-1">
                      <Link
                        to="/"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-[#B85D57] hover:bg-[#B85D57]/10"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Exit to Landing Page</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Page View Outlet */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
