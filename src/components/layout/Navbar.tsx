import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, ShieldCheck, ChevronDown, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#141A17]/95 backdrop-blur-md shadow-subtle border-b border-[#E8ECE7] dark:border-[#2C3731] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#203C34] flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-4 h-4 rounded-full border border-[#739181] border-dashed" />
              <div className="absolute w-1.5 h-1.5 rounded-full bg-[#E9EEE9]" />
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="font-display text-lg font-bold tracking-tight text-[#203C34] dark:text-[#E9EFEA]">
                LeadEnrich
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-[#E9EEE9] dark:bg-[#25332C] text-[#203C34] dark:text-[#8BB09D] font-bold">
                DK
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Platform Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPlatformDropdownOpen(!platformDropdownOpen)}
                onMouseEnter={() => setPlatformDropdownOpen(true)}
                className="flex items-center space-x-1 text-sm font-medium text-[#758078] hover:text-[#203C34] dark:hover:text-white transition-colors"
              >
                <span>Platform</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {platformDropdownOpen && (
                <div
                  onMouseLeave={() => setPlatformDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-64 p-3 bg-white dark:bg-[#1C2420] rounded-xl shadow-dropdown border border-[#E8ECE7] dark:border-[#2C3731] space-y-1 animate-fade-in"
                >
                  <button
                    onClick={() => { setPlatformDropdownOpen(false); scrollToSection('features'); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] text-xs transition-colors"
                  >
                    <div className="font-semibold text-[#203C34] dark:text-white">Danish Contact Intelligence</div>
                    <div className="text-[#758078] text-[11px]">15,000 verified Danish professionals</div>
                  </button>
                  <button
                    onClick={() => { setPlatformDropdownOpen(false); scrollToSection('cvr'); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] text-xs transition-colors"
                  >
                    <div className="font-semibold text-[#203C34] dark:text-white">CVR Register Lookup</div>
                    <div className="text-[#758078] text-[11px]">Official Erhvervsstyrelsen business data</div>
                  </button>
                  <button
                    onClick={() => { setPlatformDropdownOpen(false); scrollToSection('providers'); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] text-xs transition-colors"
                  >
                    <div className="font-semibold text-[#203C34] dark:text-white">Waterfall Enrichment</div>
                    <div className="text-[#758078] text-[11px]">Prospeo, Findymail, Coresignal, ContactOut</div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection('database')}
              className="text-sm font-medium text-[#758078] hover:text-[#203C34] dark:hover:text-white transition-colors"
            >
              Database
            </button>
            <button
              onClick={() => scrollToSection('enrichment')}
              className="text-sm font-medium text-[#758078] hover:text-[#203C34] dark:hover:text-white transition-colors"
            >
              Enrichment
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-sm font-medium text-[#758078] hover:text-[#203C34] dark:hover:text-white transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-sm font-medium text-[#758078] hover:text-[#203C34] dark:hover:text-white transition-colors"
            >
              Resources & FAQ
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/login"
              className="text-sm font-medium px-3.5 py-2 rounded-lg text-[#203C34] dark:text-[#E9EFEA] hover:bg-[#E9EEE9] dark:hover:bg-[#25332C] transition-colors"
            >
              Log in
            </Link>

            {/* Direct Demo Entry Button */}
            <Link
              to="/app/dashboard"
              className="inline-flex items-center space-x-2 text-sm font-medium px-4 py-2 rounded-lg bg-[#203C34] text-white hover:bg-[#2c544a] transition-all shadow-card hover:shadow-dropdown group"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E9EEE9] group-hover:rotate-12 transition-transform" />
              <span>Explore Platform Demo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              to="/app/dashboard"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#203C34] text-white"
            >
              Demo
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#202923] dark:text-white hover:bg-[#E9EEE9] dark:hover:bg-[#25332C]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#1C2420] border-b border-[#E8ECE7] dark:border-[#2C3731] px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-lg">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => scrollToSection('features')}
              className="text-left py-2 text-sm font-medium text-[#202923] dark:text-white"
            >
              Platform Overview
            </button>
            <button
              onClick={() => scrollToSection('database')}
              className="text-left py-2 text-sm font-medium text-[#202923] dark:text-white"
            >
              Danish Database (15,000 Contacts)
            </button>
            <button
              onClick={() => scrollToSection('enrichment')}
              className="text-left py-2 text-sm font-medium text-[#202923] dark:text-white"
            >
              Waterfall Enrichment
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-left py-2 text-sm font-medium text-[#202923] dark:text-white"
            >
              Pricing & Plans
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left py-2 text-sm font-medium text-[#202923] dark:text-white"
            >
              GDPR & FAQ
            </button>
          </div>

          <div className="pt-4 border-t border-[#E8ECE7] dark:border-[#2C3731] flex flex-col space-y-2">
            <Link
              to="/login"
              className="w-full text-center py-2.5 text-sm font-medium rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] text-[#202923] dark:text-white"
            >
              Log in
            </Link>
            <Link
              to="/app/dashboard"
              className="w-full text-center py-2.5 text-sm font-semibold rounded-lg bg-[#203C34] text-white flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-[#E9EEE9]" />
              <span>Explore Platform Demo</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
