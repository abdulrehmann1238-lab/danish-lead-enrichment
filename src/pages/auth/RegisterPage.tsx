import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Lock, Mail, User, Building, ArrowRight, Check } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex@nordic-growth.dk');
  const [company, setCompany] = useState('Nordic Growth Studio');
  const [password, setPassword] = useState('Password123!');
  const [confirmPassword, setConfirmPassword] = useState('Password123!');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const navigate = useNavigate();
  const { showToast, updateUserProfile } = useApp();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast({
        type: 'error',
        title: 'Validation Error',
        description: 'Passwords do not match.',
      });
      return;
    }
    updateUserProfile({ name, email, company });
    showToast({
      type: 'success',
      title: 'Demo Workspace Created',
      description: `Welcome ${name}! Your account has 1,250 free credits loaded.`,
    });
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F7F8F5] dark:bg-[#141A17] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-[#202923] dark:text-[#E9EFEA]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center space-x-2.5 mb-6">
          <div className="w-9 h-9 rounded-xl bg-[#203C34] flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border border-[#739181] border-dashed" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-[#E9EEE9]" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight text-[#203C34] dark:text-white">
            LeadEnrich
          </span>
          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#E9EEE9] dark:bg-[#25332C] text-[#203C34] dark:text-[#8BB09D] font-bold">
            DK
          </span>
        </Link>
        <h2 className="font-display text-2xl font-bold tracking-tight text-[#202923] dark:text-white">
          Create your Danish prospecting workspace
        </h2>
        <p className="mt-1 text-xs text-[#758078] dark:text-[#8E9C93]">
          Instant access to 10,000 free contacts and 1,250 enrichment credits
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white dark:bg-[#1C2420] py-8 px-6 sm:px-10 rounded-2xl border border-[#E8ECE7] dark:border-[#2C3731] shadow-dropdown space-y-5">
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-[#202923] dark:text-white mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#758078] absolute left-3 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none focus:border-[#203C34]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#202923] dark:text-white mb-1">
                Work Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#758078] absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none focus:border-[#203C34]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#202923] dark:text-white mb-1">
                Company Name
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-[#758078] absolute left-3 top-3" />
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none focus:border-[#203C34]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#202923] dark:text-white mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#758078] absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none focus:border-[#203C34]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#202923] dark:text-white mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#758078] absolute left-3 top-3" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none focus:border-[#203C34]"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
                className="rounded border-[#E8ECE7] text-[#203C34] focus:ring-[#739181]"
              />
              <label htmlFor="terms" className="text-[#758078]">
                I agree to the LeadEnrich Demo Terms and Privacy Policy
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#203C34] text-white text-xs font-semibold hover:bg-[#2c544a] transition-all shadow-subtle mt-2"
            >
              Create Free Workspace
            </button>
          </form>

          <div className="text-center text-xs text-[#758078] pt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-[#203C34] dark:text-[#8BB09D] font-semibold hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
