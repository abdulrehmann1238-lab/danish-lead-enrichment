import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Globe, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-[#141A17] border-t border-[#E8ECE7] dark:border-[#2C3731] pt-14 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#E8ECE7] dark:border-[#2C3731]">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#203C34] flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full border border-[#739181] border-dashed" />
                <div className="absolute w-1 h-1 rounded-full bg-[#E9EEE9]" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-[#203C34] dark:text-white">
                LeadEnrich
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#E9EEE9] dark:bg-[#25332C] text-[#203C34] dark:text-[#8BB09D] font-bold">
                DK
              </span>
            </div>

            <p className="text-sm text-[#758078] dark:text-[#8E9C93] max-w-sm leading-relaxed">
              Danish B2B Lead Intelligence, Contact Database & Enrichment Platform. Discover 15,000 verified Danish companies and decision-makers in full GDPR compliance.
            </p>

            <div className="flex items-center space-x-4 text-xs text-[#758078] dark:text-[#8E9C93] pt-1">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-[#739181]" />
                <span>Copenhagen, Denmark</span>
              </span>
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3D8060]" />
                <span>GDPR Art. 21 Compliant</span>
              </span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#202923] dark:text-white mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-[#758078] dark:text-[#8E9C93]">
              <li>
                <Link to="/app/contacts" className="hover:text-[#203C34] dark:hover:text-white transition-colors">
                  Contact Database
                </Link>
              </li>
              <li>
                <Link to="/app/companies" className="hover:text-[#203C34] dark:hover:text-white transition-colors">
                  Company Search & CVR
                </Link>
              </li>
              <li>
                <Link to="/app/enrichment" className="hover:text-[#203C34] dark:hover:text-white transition-colors">
                  Waterfall Enrichment
                </Link>
              </li>
              <li>
                <Link to="/app/lists" className="hover:text-[#203C34] dark:hover:text-white transition-colors">
                  Prospect Lists
                </Link>
              </li>
              <li>
                <Link to="/app/credits" className="hover:text-[#203C34] dark:hover:text-white transition-colors">
                  Prepaid Credit Wallet
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#202923] dark:text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm text-[#758078] dark:text-[#8E9C93]">
              <li>
                <Link to="/app/integrations" className="hover:text-[#203C34] dark:hover:text-white transition-colors">
                  API & Provider Connectors
                </Link>
              </li>
              <li>
                <Link to="/app/analytics" className="hover:text-[#203C34] dark:hover:text-white transition-colors">
                  Usage Analytics
                </Link>
              </li>
              <li>
                <Link to="/app/exports" className="hover:text-[#203C34] dark:hover:text-white transition-colors">
                  CSV Export Documentation
                </Link>
              </li>
              <li>
                <Link to="/app/admin" className="hover:text-[#203C34] dark:hover:text-white transition-colors">
                  Platform Admin Panel
                </Link>
              </li>
              <li>
                <Link to="/app/dashboard" className="hover:text-[#203C34] dark:hover:text-white transition-colors">
                  Interactive Demo Workspace
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#202923] dark:text-white mb-4">
              Company & Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-[#758078] dark:text-[#8E9C93]">
              <li>
                <Link to="/app/gdpr" className="hover:text-[#203C34] dark:hover:text-white transition-colors flex items-center space-x-1">
                  <span>GDPR & Privacy Center</span>
                  <ShieldCheck className="w-3 h-3 text-[#3D8060]" />
                </Link>
              </li>
              <li>
                <Link to="/app/gdpr" className="hover:text-[#203C34] dark:hover:text-white transition-colors">
                  Danish Opt-Out Registry
                </Link>
              </li>
              <li>
                <Link to="/app/gdpr" className="hover:text-[#203C34] dark:hover:text-white transition-colors">
                  Subprocessor Registry (15)
                </Link>
              </li>
              <li>
                <Link to="/app/billing" className="hover:text-[#203C34] dark:hover:text-white transition-colors">
                  Subscription Terms
                </Link>
              </li>
              <li>
                <Link to="/app/settings" className="hover:text-[#203C34] dark:hover:text-white transition-colors">
                  Cookie & Workspace Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#758078] dark:text-[#8E9C93] gap-4">
          <div>
            © {new Date().getFullYear()} LeadEnrich ApS. All rights reserved. Danish B2B Lead Intelligence Demo.
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/app/gdpr" className="hover:text-[#203C34] dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/app/gdpr" className="hover:text-[#203C34] dark:hover:text-white transition-colors">
              Data Processing Agreement
            </Link>
            <Link to="/app/settings" className="hover:text-[#203C34] dark:hover:text-white transition-colors">
              Cookie Preferences
            </Link>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F3F5F2] dark:bg-[#1C2420] text-[#758078]">
              CVR: DK49201948
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
