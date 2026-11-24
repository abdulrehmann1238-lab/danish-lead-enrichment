import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Database,
  Building2,
  Sparkles,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Search,
  ExternalLink
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPlatformDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (id: string) => {
    setPlatformDropdownOpen(false);
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const yOffset = -85;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      // Fallback
      window.location.hash = id;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E8ECE7] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#203C34] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <span className="font-serif font-bold text-base leading-none">L</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg tracking-tight text-[#202923] leading-none">
                LeadEnrich
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#739181] font-semibold mt-0.5">
                Danmark B2B
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {/* Platform Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setPlatformDropdownOpen(!platformDropdownOpen)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  platformDropdownOpen
                    ? 'text-[#203C34] bg-[#F7F8F5]'
                    : 'text-[#202923] hover:text-[#203C34] hover:bg-[#F7F8F5]'
                }`}
              >
                <span>Platform</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#758078] transition-transform duration-200 ${
                    platformDropdownOpen ? 'rotate-180 text-[#203C34]' : ''
                  }`}
                />
              </button>

              {platformDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-84 bg-white rounded-xl shadow-xl border border-[#E8ECE7] p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  style={{ width: '340px' }}
                >
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#758078] px-3 py-1.5">
                    Platform Features
                  </div>

                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => scrollToSection('database')}
                      className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#F7F8F5] transition-colors text-left group"
                    >
                      <div className="p-2 rounded-lg bg-[#E9EEE9] text-[#203C34] group-hover:bg-[#203C34] group-hover:text-white transition-colors mt-0.5">
                        <Database className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[#202923] group-hover:text-[#203C34] flex items-center justify-between">
                          <span>Danish Contact Intelligence</span>
                        </div>
                        <p className="text-xs text-[#758078] mt-0.5">
                          15,000 verified Danish professionals
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToSection('cvr')}
                      className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#F7F8F5] transition-colors text-left group"
                    >
                      <div className="p-2 rounded-lg bg-[#E9EEE9] text-[#203C34] group-hover:bg-[#203C34] group-hover:text-white transition-colors mt-0.5">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[#202923] group-hover:text-[#203C34]">
                          CVR Register Lookup
                        </div>
                        <p className="text-xs text-[#758078] mt-0.5">
                          Official Erhvervsstyrelsen business data
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToSection('enrichment')}
                      className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#F7F8F5] transition-colors text-left group"
                    >
                      <div className="p-2 rounded-lg bg-[#E9EEE9] text-[#203C34] group-hover:bg-[#203C34] group-hover:text-white transition-colors mt-0.5">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[#202923] group-hover:text-[#203C34]">
                          Waterfall Enrichment
                        </div>
                        <p className="text-xs text-[#758078] mt-0.5">
                          Prospeo, Findymail, Coresignal, ContactOut
                        </p>
                      </div>
                    </button>
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#E8ECE7] px-2 py-1.5 flex items-center justify-between bg-[#F7F8F5]/60 rounded-lg">
                    <span className="text-xs text-[#758078]">Direct Workspace Jump</span>
                    <Link
                      to="/app/contacts"
                      onClick={() => setPlatformDropdownOpen(false)}
                      className="text-xs font-semibold text-[#203C34] hover:underline flex items-center gap-1"
                    >
                      Open Database <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Section Anchors */}
            <button
              type="button"
              onClick={() => scrollToSection('database')}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#202923] hover:text-[#203C34] hover:bg-[#F7F8F5] transition-colors"
            >
              Database
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('enrichment')}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#202923] hover:text-[#203C34] hover:bg-[#F7F8F5] transition-colors"
            >
              Enrichment
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('pricing')}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#202923] hover:text-[#203C34] hover:bg-[#F7F8F5] transition-colors"
            >
              Pricing
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('faq')}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#202923] hover:text-[#203C34] hover:bg-[#F7F8F5] transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/app"
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#202923] hover:text-[#203C34] hover:bg-[#F7F8F5] transition-colors"
            >
              Log in
            </Link>

            <Link
              to="/app/contacts"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#203C34] hover:bg-[#182E27] text-white text-sm font-medium shadow-sm transition-all hover:shadow hover:-translate-y-0.5"
            >
              <span>Explore Platform</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#202923] hover:bg-[#F7F8F5]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E8ECE7] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#758078] px-3 py-1">
              Platform Features
            </div>
            <button
              type="button"
              onClick={() => scrollToSection('database')}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#202923] hover:bg-[#F7F8F5] rounded-lg text-left"
            >
              <Database className="w-4 h-4 text-[#203C34]" />
              <span>Danish Contact Intelligence</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('cvr')}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#202923] hover:bg-[#F7F8F5] rounded-lg text-left"
            >
              <Building2 className="w-4 h-4 text-[#203C34]" />
              <span>CVR Register Lookup</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('enrichment')}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#202923] hover:bg-[#F7F8F5] rounded-lg text-left"
            >
              <Sparkles className="w-4 h-4 text-[#203C34]" />
              <span>Waterfall Enrichment</span>
            </button>
          </div>

          <div className="pt-2 border-t border-[#E8ECE7] space-y-1">
            <button
              type="button"
              onClick={() => scrollToSection('database')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-[#202923] hover:bg-[#F7F8F5] rounded-lg"
            >
              Database
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('enrichment')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-[#202923] hover:bg-[#F7F8F5] rounded-lg"
            >
              Enrichment
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('pricing')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-[#202923] hover:bg-[#F7F8F5] rounded-lg"
            >
              Pricing
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('faq')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-[#202923] hover:bg-[#F7F8F5] rounded-lg"
            >
              FAQ
            </button>
          </div>

          <div className="pt-3 border-t border-[#E8ECE7] flex flex-col gap-2">
            <Link
              to="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center rounded-lg text-sm font-medium text-[#202923] border border-[#E8ECE7] hover:bg-[#F7F8F5]"
            >
              Log in to Workspace
            </Link>
            <Link
              to="/app/contacts"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center rounded-lg text-sm font-medium bg-[#203C34] text-white hover:bg-[#182E27] shadow-sm flex items-center justify-center gap-2"
            >
              <span>Explore Platform</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
