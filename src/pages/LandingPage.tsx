import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { 
  Search, 
  Sparkles, 
  Database, 
  Building2, 
  ListFilter, 
  Wallet, 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronDown, 
  Layers, 
  Clock, 
  Lock, 
  Zap, 
  Check, 
  HelpCircle,
  ExternalLink,
  ChevronRight,
  UserCheck
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  // Interactive Hero Preview state
  const [heroCredits, setHeroCredits] = useState(1250);
  const [heroRevealing, setHeroRevealing] = useState(false);
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [heroProviderStep, setHeroProviderStep] = useState<string | null>(null);

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleHeroReveal = () => {
    if (heroRevealed || heroRevealing) return;
    setHeroRevealing(true);
    setHeroProviderStep('Querying Prospeo Danish MX verification...');

    setTimeout(() => {
      setHeroProviderStep('SMTP handshake deliverable (99.2% confidence)...');
      setTimeout(() => {
        setHeroProviderStep(null);
        setHeroRevealing(false);
        setHeroRevealed(true);
        setHeroCredits(prev => Math.max(0, prev - 5));
      }, 700);
    }, 800);
  };

  const faqs = [
    {
      q: 'How many Danish contacts are available in LeadEnrich?',
      a: 'The platform hosts approximately 15,000 verified Danish business contacts across Greater Copenhagen, Midtjylland, Syddanmark, and Nordjylland. 10,000 contacts are completely free to query for registered users, while 5,000 executive decision-makers are part of the Annual Professional database.',
    },
    {
      q: 'What is included in the free database tier?',
      a: 'Registered users enjoy full search and filtering capabilities across 10,000 verified Danish professionals, basic CVR company profile lookups, list creation, and export capabilities subject to standard demo usage bounds.',
    },
    {
      q: 'How does premium database access work?',
      a: 'The premium tier unlocks the 5,000 most requested Danish C-level executives, enterprise managing directors, and specialized industry leaders, complete with direct phone numbers and priority enrichment workflows.',
    },
    {
      q: 'Which enrichment providers are supported?',
      a: 'LeadEnrich coordinates waterfall workflows across 5 top-tier enrichment engines: Prospeo, Findymail, Coresignal, ContactOut, and Forager, backed by authoritative company data directly from the Danish CVR Register (Erhvervsstyrelsen).',
    },
    {
      q: 'How do prepaid credits work?',
      a: 'Credits are purchased in prepaid packs (e.g. Starter 500, Growth 2,000, Scale 5,000). A standard business email reveal costs 5 credits, direct phone line reveals cost 10 credits, and combined reveals cost 15 credits. The platform uses strict concurrency controls: balances never go below zero, and no surprise overages occur.',
    },
    {
      q: 'Can I export contacts to CSV or my CRM?',
      a: 'Yes. You can filter and export contacts directly into formatted CSV files. Contacts that have exercised their GDPR right to object (opt-out) are automatically suppressed from all export streams.',
    },
    {
      q: 'How are GDPR opt-outs and privacy requests handled?',
      a: 'LeadEnrich is built for European enterprise standards. The system maintains an active suppression list. When a Danish professional submits an opt-out under GDPR Article 21, their record is instantly locked against future enrichment and export.',
    },
    {
      q: 'Is the platform designed for GDPR-conscious workflows?',
      a: 'Absolutely. We provide dedicated Data Subject Request (DSR) logs, clear subprocessor disclosures across European data centers, and enforce strict purpose limitation across all lead intelligence activities.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F5] text-[#202923] dark:bg-[#141A17] dark:text-[#E9EFEA] flex flex-col font-sans transition-colors">
      <Navbar />

      {/* 6.2 HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Subtle Scandinavian Ambient Background */}
        <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#E9EEE9] dark:bg-[#203C34] blur-3xl" />
          <div className="absolute top-1/2 -right-40 w-[30rem] h-[30rem] rounded-full bg-[#E9E5DC] dark:bg-[#1C2420] blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#739181_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Eyebrow */}
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E9EEE9] dark:bg-[#25332C] border border-[#739181]/30">
                <span className="w-2 h-2 rounded-full bg-[#3D8060]" />
                <span className="text-xs font-semibold tracking-wider text-[#203C34] dark:text-[#8BB09D] uppercase">
                  The Danish B2B Data Platform
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#202923] dark:text-white tracking-tight leading-[1.1]">
                Find the right people.{' '}
                <span className="text-[#203C34] dark:text-[#8BB09D] underline decoration-[#739181]/40 underline-offset-8">
                  Enrich every opportunity.
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-[#758078] dark:text-[#8E9C93] leading-relaxed max-w-xl mx-auto lg:mx-0">
                Discover Danish companies, identify decision-makers, reveal verified business contact information, and build your next customer pipeline — all from one intelligent workspace.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/app/dashboard"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-xl bg-[#203C34] text-white hover:bg-[#2c544a] transition-all shadow-card hover:shadow-dropdown font-medium text-sm group"
                >
                  <Sparkles className="w-4 h-4 text-[#E9EEE9] group-hover:rotate-12 transition-transform" />
                  <span>Explore the Platform</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-white dark:bg-[#1C2420] text-[#202923] dark:text-white hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] transition-all text-sm font-medium shadow-subtle"
                >
                  <span>See How It Works</span>
                </a>
              </div>

              {/* Supporting Indicators */}
              <div className="pt-6 border-t border-[#E8ECE7] dark:border-[#2C3731] flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#758078] dark:text-[#8E9C93]">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3D8060]" />
                  <span className="font-medium">15,000 Danish contacts</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3D8060]" />
                  <span className="font-medium">Multiple enrichment sources</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#3D8060]" />
                  <span className="font-medium">GDPR-conscious workflows</span>
                </div>
              </div>
            </div>

            {/* Right: Interactive Product Preview Card */}
            <div className="lg:col-span-6">
              <div className="bg-white dark:bg-[#1C2420] rounded-2xl border border-[#E8ECE7] dark:border-[#2C3731] shadow-dropdown p-5 md:p-6 transition-all">
                {/* Mock Browser Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E8ECE7] dark:border-[#2C3731]">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B85D57]/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C18A45]/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3D8060]/70" />
                    <span className="ml-2 text-xs font-mono text-[#758078] dark:text-[#8E9C93]">
                      app.leadenrich.dk/contacts
                    </span>
                  </div>

                  {/* Wallet pill inside preview */}
                  <div className="flex items-center space-x-2 px-2.5 py-1 rounded-md bg-[#E9EEE9] dark:bg-[#25332C] text-[11px] font-mono text-[#203C34] dark:text-[#8BB09D] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3D8060]" />
                    <span>Wallet: {heroCredits.toLocaleString()} credits</span>
                  </div>
                </div>

                {/* Search Bar Preview */}
                <div className="flex items-center space-x-2 px-3 py-2 bg-[#F7F8F5] dark:bg-[#141A17] rounded-lg border border-[#E8ECE7] dark:border-[#2C3731] text-xs text-[#758078] mb-4">
                  <Search className="w-3.5 h-3.5 text-[#739181]" />
                  <span>Search "NordTech Solutions" or "CEO Copenhagen"...</span>
                </div>

                {/* Interactive Contact Item */}
                <div className="border border-[#E8ECE7] dark:border-[#2C3731] rounded-xl p-4 bg-white dark:bg-[#1C2420] hover:border-[#739181]/50 transition-all mb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-[#203C34] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                        AN
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-sm text-[#202923] dark:text-white">
                            Anders Nielsen
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#E9EEE9] dark:bg-[#25332C] text-[#203C34] dark:text-[#8BB09D] font-bold">
                            FREE TIER
                          </span>
                        </div>
                        <div className="text-xs text-[#758078] dark:text-[#8E9C93] mt-0.5">
                          CEO at NordTech Solutions A/S • Copenhagen
                        </div>
                        <div className="text-[11px] font-mono text-[#758078] mt-1">
                          CVR: DK38472910 • 51–200 employees
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Reveal Area */}
                  <div className="mt-4 pt-3 border-t border-[#E8ECE7] dark:border-[#2C3731] flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs">
                      <span className="text-[#758078] mr-2">Email:</span>
                      {heroRevealed ? (
                        <span className="font-mono text-[#3D8060] font-semibold bg-[#3D8060]/10 px-2 py-0.5 rounded border border-[#3D8060]/20 animate-fade-in">
                          a.nielsen@nordtech-solutions.dk (Verified)
                        </span>
                      ) : (
                        <span className="font-mono text-[#758078] bg-[#F3F5F2] dark:bg-[#232C27] px-2 py-0.5 rounded border border-dashed border-[#E8ECE7] dark:border-[#2C3731]">
                          a.n••••••@nordtech-solutions.dk
                        </span>
                      )}
                    </div>

                    <button
                      onClick={handleHeroReveal}
                      disabled={heroRevealing || heroRevealed}
                      className={`text-xs px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
                        heroRevealed
                          ? 'bg-[#3D8060]/15 text-[#3D8060] border border-[#3D8060]/30 cursor-default'
                          : heroRevealing
                          ? 'bg-[#E9EEE9] text-[#203C34] cursor-wait'
                          : 'bg-[#203C34] text-white hover:bg-[#2c544a] shadow-subtle'
                      }`}
                    >
                      {heroRevealing ? (
                        <>
                          <div className="w-3 h-3 rounded-full border border-[#203C34] border-t-transparent animate-spin" />
                          <span>Querying Prospeo...</span>
                        </>
                      ) : heroRevealed ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#3D8060]" />
                          <span>Revealed (5 credits deducted)</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3 text-[#E9EEE9]" />
                          <span>Reveal Email (5 credits)</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Dynamic Status Progress Indicator */}
                  {heroProviderStep && (
                    <div className="mt-2.5 text-[11px] font-mono text-[#739181] flex items-center space-x-1.5 animate-fade-in bg-[#E9EEE9]/40 dark:bg-[#25332C]/40 px-2.5 py-1 rounded">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#739181] animate-ping" />
                      <span>{heroProviderStep}</span>
                    </div>
                  )}
                </div>

                {/* Second Contact Preview */}
                <div className="border border-[#E8ECE7] dark:border-[#2C3731] rounded-xl p-3 bg-[#F7F8F5]/60 dark:bg-[#141A17]/60 flex items-center justify-between text-xs opacity-80">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#739181] text-white flex items-center justify-center font-bold text-[11px]">
                      SL
                    </div>
                    <div>
                      <div className="font-semibold text-[#202923] dark:text-white">Sofie Larsen</div>
                      <div className="text-[11px] text-[#758078]">Head of Marketing • Copenhagen Digital ApS</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] text-[#758078]">
                    Prospeo & Findymail Ready
                  </span>
                </div>

                {/* Footer status notice */}
                <div className="mt-4 pt-3 border-t border-[#E8ECE7] dark:border-[#2C3731] flex items-center justify-between text-[11px] text-[#758078]">
                  <span className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3D8060]" />
                    <span>Real-time CVR Sync: Active</span>
                  </span>
                  <Link to="/app/contacts" className="text-[#203C34] dark:text-[#8BB09D] font-medium hover:underline flex items-center space-x-1">
                    <span>Open full database</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6.3 TRUST AND REFINED STATISTICS */}
      <section className="py-14 border-y border-[#E8ECE7] dark:border-[#2C3731] bg-white dark:bg-[#1C2420] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#203C34] dark:text-[#8BB09D]">
                15,000+
              </div>
              <div className="text-xs sm:text-sm text-[#758078] dark:text-[#8E9C93] font-medium">
                Danish business contacts
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#203C34] dark:text-[#8BB09D]">
                5
              </div>
              <div className="text-xs sm:text-sm text-[#758078] dark:text-[#8E9C93] font-medium">
                Enrichment sources
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#203C34] dark:text-[#8BB09D]">
                10,000
              </div>
              <div className="text-xs sm:text-sm text-[#758078] dark:text-[#8E9C93] font-medium">
                Free database contacts
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#203C34] dark:text-[#8BB09D]">
                1
              </div>
              <div className="text-xs sm:text-sm text-[#758078] dark:text-[#8E9C93] font-medium">
                Unified prospecting workspace
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6.4 PLATFORM FEATURES */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-semibold tracking-wider text-[#739181] uppercase">
              Comprehensive Capabilities
            </h2>
            <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#202923] dark:text-white">
              Built for serious European B2B customer acquisition.
            </h3>
            <p className="text-sm sm:text-base text-[#758078] dark:text-[#8E9C93]">
              From CVR company intelligence to multi-provider email verification, every tool is integrated into one cohesive Scandinavian interface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card hover:shadow-dropdown transition-all space-y-4 group">
              <div className="w-10 h-10 rounded-xl bg-[#E9EEE9] dark:bg-[#25332C] flex items-center justify-center text-[#203C34] dark:text-[#8BB09D] group-hover:scale-105 transition-transform">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="font-display text-lg font-bold text-[#202923] dark:text-white">
                Danish Contact Database
              </h4>
              <p className="text-xs sm:text-sm text-[#758078] dark:text-[#8E9C93] leading-relaxed">
                Search thousands of Danish professionals and companies with verified job titles, locations, and CVR identifiers.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card hover:shadow-dropdown transition-all space-y-4 group">
              <div className="w-10 h-10 rounded-xl bg-[#E9EEE9] dark:bg-[#25332C] flex items-center justify-center text-[#203C34] dark:text-[#8BB09D] group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-display text-lg font-bold text-[#202923] dark:text-white">
                Intelligent Enrichment
              </h4>
              <p className="text-xs sm:text-sm text-[#758078] dark:text-[#8E9C93] leading-relaxed">
                Find business emails and direct mobile numbers through multiple providers with automated waterfall routing.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card hover:shadow-dropdown transition-all space-y-4 group">
              <div className="w-10 h-10 rounded-xl bg-[#E9EEE9] dark:bg-[#25332C] flex items-center justify-center text-[#203C34] dark:text-[#8BB09D] group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="font-display text-lg font-bold text-[#202923] dark:text-white">
                Company Intelligence
              </h4>
              <p className="text-xs sm:text-sm text-[#758078] dark:text-[#8E9C93] leading-relaxed">
                Explore real company registration records from the official Danish Central Business Register (CVR).
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card hover:shadow-dropdown transition-all space-y-4 group">
              <div className="w-10 h-10 rounded-xl bg-[#E9EEE9] dark:bg-[#25332C] flex items-center justify-center text-[#203C34] dark:text-[#8BB09D] group-hover:scale-105 transition-transform">
                <ListFilter className="w-5 h-5" />
              </div>
              <h4 className="font-display text-lg font-bold text-[#202923] dark:text-white">
                Prospect Lists
              </h4>
              <p className="text-xs sm:text-sm text-[#758078] dark:text-[#8E9C93] leading-relaxed">
                Organize, segment, tag, and manage target prospect lists in one place with instant membership filtering.
              </p>
            </div>

            {/* Card 5 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card hover:shadow-dropdown transition-all space-y-4 group">
              <div className="w-10 h-10 rounded-xl bg-[#E9EEE9] dark:bg-[#25332C] flex items-center justify-center text-[#203C34] dark:text-[#8BB09D] group-hover:scale-105 transition-transform">
                <Wallet className="w-5 h-5" />
              </div>
              <h4 className="font-display text-lg font-bold text-[#202923] dark:text-white">
                Prepaid Credit Wallet
              </h4>
              <p className="text-xs sm:text-sm text-[#758078] dark:text-[#8E9C93] leading-relaxed">
                Purchase prepaid credits, monitor consumption in real-time, and eliminate unpredictable SaaS overages.
              </p>
            </div>

            {/* Card 6 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card hover:shadow-dropdown transition-all space-y-4 group">
              <div className="w-10 h-10 rounded-xl bg-[#E9EEE9] dark:bg-[#25332C] flex items-center justify-center text-[#203C34] dark:text-[#8BB09D] group-hover:scale-105 transition-transform">
                <Download className="w-5 h-5" />
              </div>
              <h4 className="font-display text-lg font-bold text-[#202923] dark:text-white">
                Export and CRM
              </h4>
              <p className="text-xs sm:text-sm text-[#758078] dark:text-[#8E9C93] leading-relaxed">
                Prepare enriched contacts for formatted CSV downloads and CRM workflows with automatic opt-out suppression.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6.5 HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-white dark:bg-[#1C2420] border-y border-[#E8ECE7] dark:border-[#2C3731] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-semibold tracking-wider text-[#739181] uppercase">
              Proven Prospecting Workflow
            </h2>
            <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#202923] dark:text-white">
              Four steps from research to action.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="space-y-3 relative p-4 rounded-xl border border-transparent hover:border-[#E8ECE7] dark:hover:border-[#2C3731] transition-all">
              <div className="text-xs font-mono font-bold text-[#739181]">
                01 — DISCOVER
              </div>
              <h4 className="font-display text-base font-bold text-[#202923] dark:text-white">
                Search Danish Companies
              </h4>
              <p className="text-xs text-[#758078] dark:text-[#8E9C93] leading-relaxed">
                Filter by industry, CVR registered location, headcount, and official job titles across Danish markets.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-3 relative p-4 rounded-xl border border-transparent hover:border-[#E8ECE7] dark:hover:border-[#2C3731] transition-all">
              <div className="text-xs font-mono font-bold text-[#739181]">
                02 — SELECT
              </div>
              <h4 className="font-display text-base font-bold text-[#202923] dark:text-white">
                Build Targeted Lists
              </h4>
              <p className="text-xs text-[#758078] dark:text-[#8E9C93] leading-relaxed">
                Curate high-priority prospect segments like "Copenhagen Tech Founders" or "Aarhus Manufacturing CEOs".
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-3 relative p-4 rounded-xl border border-transparent hover:border-[#E8ECE7] dark:hover:border-[#2C3731] transition-all">
              <div className="text-xs font-mono font-bold text-[#739181]">
                03 — ENRICH
              </div>
              <h4 className="font-display text-base font-bold text-[#202923] dark:text-white">
                Reveal Verified Contacts
              </h4>
              <p className="text-xs text-[#758078] dark:text-[#8E9C93] leading-relaxed">
                Consume prepaid credits to discover live business emails and direct mobile lines through 5 waterfall providers.
              </p>
            </div>

            {/* Step 4 */}
            <div className="space-y-3 relative p-4 rounded-xl border border-transparent hover:border-[#E8ECE7] dark:hover:border-[#2C3731] transition-all">
              <div className="text-xs font-mono font-bold text-[#739181]">
                04 — ACTIVATE
              </div>
              <h4 className="font-display text-base font-bold text-[#202923] dark:text-white">
                Export and Sync
              </h4>
              <p className="text-xs text-[#758078] dark:text-[#8E9C93] leading-relaxed">
                Download verified CSV outputs or push enriched records to your CRM pipeline with automatic GDPR compliance checks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6.6 ENRICHMENT PROVIDER SECTION */}
      <section id="providers" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-semibold tracking-wider text-[#739181] uppercase">
              Supported Data Sources
            </h2>
            <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#202923] dark:text-white">
              Integrated with industry-leading enrichment engines.
            </h3>
            <p className="text-sm text-[#758078] dark:text-[#8E9C93]">
              Automatic waterfall fallback ensures highest match rates and verified deliverability across Danish business domains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Prospeo */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-base text-[#202923] dark:text-white">Prospeo</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#3D8060]/10 text-[#3D8060]">Ready</span>
              </div>
              <div className="text-[11px] font-mono uppercase text-[#758078]">Email Verification</div>
              <p className="text-xs text-[#758078] dark:text-[#8E9C93] leading-relaxed">
                SMTP live handshake and catch-all email resolution with 98%+ deliverability guarantee.
              </p>
            </div>

            {/* Findymail */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-base text-[#202923] dark:text-white">Findymail</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#3D8060]/10 text-[#3D8060]">Ready</span>
              </div>
              <div className="text-[11px] font-mono uppercase text-[#758078]">Pattern Cleaning</div>
              <p className="text-xs text-[#758078] dark:text-[#8E9C93] leading-relaxed">
                Algorithmic syntax discovery and clean corporate mailbox scraping.
              </p>
            </div>

            {/* Coresignal */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-base text-[#202923] dark:text-white">Coresignal</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#3D8060]/10 text-[#3D8060]">Ready</span>
              </div>
              <div className="text-[11px] font-mono uppercase text-[#758078]">Workforce Graph</div>
              <p className="text-xs text-[#758078] dark:text-[#8E9C93] leading-relaxed">
                Fresh European professional career transitions and job title changes.
              </p>
            </div>

            {/* ContactOut */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-base text-[#202923] dark:text-white">ContactOut</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#3D8060]/10 text-[#3D8060]">Ready</span>
              </div>
              <div className="text-[11px] font-mono uppercase text-[#758078]">Direct Phone Lines</div>
              <p className="text-xs text-[#758078] dark:text-[#8E9C93] leading-relaxed">
                High-accuracy mobile numbers and direct corporate dials for Danish leads.
              </p>
            </div>

            {/* Forager */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1C2420] border border-[#E8ECE7] dark:border-[#2C3731] shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-base text-[#202923] dark:text-white">Forager</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#3D8060]/10 text-[#3D8060]">Ready</span>
              </div>
              <div className="text-[11px] font-mono uppercase text-[#758078]">SMB Discovery</div>
              <p className="text-xs text-[#758078] dark:text-[#8E9C93] leading-relaxed">
                Alternative web signals and boutique Nordic business contact discovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6.7 PRICING SECTION */}
      <section id="pricing" className="py-24 bg-white dark:bg-[#1C2420] border-y border-[#E8ECE7] dark:border-[#2C3731] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-semibold tracking-wider text-[#739181] uppercase">
              Transparent Model
            </h2>
            <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#202923] dark:text-white">
              Accessible database. Pay-as-you-grow enrichment.
            </h3>
            <p className="text-sm text-[#758078] dark:text-[#8E9C93]">
              10,000 Danish contacts are freely searchable. Expand to all 15,000 with Annual Professional.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Free Database Access */}
            <div className="p-8 rounded-2xl bg-[#F7F8F5] dark:bg-[#141A17] border border-[#E8ECE7] dark:border-[#2C3731] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="text-xs font-mono font-bold tracking-wider text-[#758078] uppercase">
                  Free Database Access
                </div>
                <div className="flex items-baseline space-x-1">
                  <span className="font-display text-4xl font-extrabold text-[#202923] dark:text-white">$0</span>
                  <span className="text-xs text-[#758078]">/ forever</span>
                </div>
                <p className="text-xs text-[#758078] dark:text-[#8E9C93] leading-relaxed">
                  Immediate search access to the foundational Danish B2B contact directory.
                </p>

                <div className="pt-4 border-t border-[#E8ECE7] dark:border-[#2C3731] space-y-2.5 text-xs">
                  <div className="flex items-center space-x-2 text-[#202923] dark:text-white">
                    <Check className="w-4 h-4 text-[#3D8060]" />
                    <span>Access to 10,000 free contacts</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#202923] dark:text-white">
                    <Check className="w-4 h-4 text-[#3D8060]" />
                    <span>Basic Danish company search</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#202923] dark:text-white">
                    <Check className="w-4 h-4 text-[#3D8060]" />
                    <span>Prospect lists & tagging</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#202923] dark:text-white">
                    <Check className="w-4 h-4 text-[#3D8060]" />
                    <span>Standard filters (Industry, Region)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#202923] dark:text-white">
                    <Check className="w-4 h-4 text-[#3D8060]" />
                    <span>CSV export with demo bounds</span>
                  </div>
                </div>
              </div>

              <Link
                to="/app/dashboard"
                className="w-full text-center py-2.5 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-white dark:bg-[#1C2420] text-sm font-semibold text-[#202923] dark:text-white hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] transition-all"
              >
                Access Free Tier Demo
              </Link>
            </div>

            {/* Annual Professional (Featured) */}
            <div className="p-8 rounded-2xl bg-[#203C34] text-white border-2 border-[#739181] shadow-dropdown flex flex-col justify-between space-y-6 relative">
              <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-[#E9E5DC] text-[#203C34] font-bold text-[10px] tracking-wider uppercase">
                Recommended for Enterprise
              </div>

              <div className="space-y-4">
                <div className="text-xs font-mono font-bold tracking-wider text-[#E9EEE9] uppercase">
                  Annual Professional
                </div>
                <div className="flex items-baseline space-x-1">
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-white">Custom Annual</span>
                </div>
                <p className="text-xs text-[#E9EEE9]/80 leading-relaxed">
                  Full executive access to all 15,000 Danish contacts including premium C-level leaders.
                </p>

                <div className="pt-4 border-t border-[#739181]/40 space-y-2.5 text-xs text-[#E9EEE9]">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#E9EEE9]" />
                    <span className="font-semibold text-white">Access to all 15,000 contacts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#E9EEE9]" />
                    <span>5,000 premium executive records</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#E9EEE9]" />
                    <span>Advanced CVR & headcount filters</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#E9EEE9]" />
                    <span>Priority waterfall enrichment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#E9EEE9]" />
                    <span>Full usage telemetry & analytics</span>
                  </div>
                </div>
              </div>

              <Link
                to="/app/billing"
                className="w-full text-center py-2.5 rounded-xl bg-white text-[#203C34] text-sm font-semibold hover:bg-[#E9EEE9] transition-all shadow-subtle"
              >
                Inquire for Annual Access
              </Link>
            </div>

            {/* Prepaid Credits */}
            <div className="p-8 rounded-2xl bg-[#F7F8F5] dark:bg-[#141A17] border border-[#E8ECE7] dark:border-[#2C3731] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="text-xs font-mono font-bold tracking-wider text-[#758078] uppercase">
                  Prepaid Credits
                </div>
                <div className="flex items-baseline space-x-1">
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#202923] dark:text-white">Flexible Packs</span>
                </div>
                <p className="text-xs text-[#758078] dark:text-[#8E9C93] leading-relaxed">
                  On-demand credit packs for revealing emails and direct phone lines.
                </p>

                <div className="pt-4 border-t border-[#E8ECE7] dark:border-[#2C3731] space-y-2.5 text-xs">
                  <div className="flex items-center space-x-2 text-[#202923] dark:text-white">
                    <Check className="w-4 h-4 text-[#3D8060]" />
                    <span>Email reveal: 5 credits</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#202923] dark:text-white">
                    <Check className="w-4 h-4 text-[#3D8060]" />
                    <span>Phone reveal: 10 credits</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#202923] dark:text-white">
                    <Check className="w-4 h-4 text-[#3D8060]" />
                    <span>Combined reveal: 15 credits</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#202923] dark:text-white">
                    <Check className="w-4 h-4 text-[#3D8060]" />
                    <span className="font-medium">No negative balance / No overage</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#202923] dark:text-white">
                    <Check className="w-4 h-4 text-[#3D8060]" />
                    <span>Safe atomic transaction ledger</span>
                  </div>
                </div>
              </div>

              <Link
                to="/app/credits"
                className="w-full text-center py-2.5 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-white dark:bg-[#1C2420] text-sm font-semibold text-[#202923] dark:text-white hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] transition-all"
              >
                Explore Credit Wallet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6.8 FAQ SECTION */}
      <section id="faq" className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-xs font-semibold tracking-wider text-[#739181] uppercase">
              Frequently Asked Questions
            </h2>
            <h3 className="font-display text-3xl font-bold tracking-tight text-[#202923] dark:text-white">
              Everything you need to know about LeadEnrich.
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-white dark:bg-[#1C2420] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-[#202923] dark:text-white hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#758078] transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#203C34] dark:text-white' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#758078] dark:text-[#8E9C93] leading-relaxed border-t border-[#E8ECE7]/50 dark:border-[#2C3731]/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6.9 FINAL CTA */}
      <section className="py-20 bg-[#203C34] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Your next customer is already in the database.
          </h2>
          <p className="text-sm sm:text-base text-[#E9EEE9] max-w-2xl mx-auto leading-relaxed">
            Find your ideal Danish prospects, enrich their verified contact information, and turn research into action.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/app/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-white text-[#203C34] font-semibold text-sm hover:bg-[#E9EEE9] transition-all shadow-dropdown"
            >
              <span>Explore Interactive Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/app/contacts"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl border border-[#739181] bg-transparent text-white font-medium text-sm hover:bg-[#2c544a] transition-all"
            >
              <span>Browse 15,000 Contacts</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6.10 FOOTER */}
      <Footer />
    </div>
  );
};
