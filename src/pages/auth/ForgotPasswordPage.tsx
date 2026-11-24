import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Mail, CheckCircle2, ArrowLeft } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast({
      type: 'info',
      title: 'Reset Instructions Dispatched',
      description: `A simulated password recovery link was sent to ${email}.`,
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F8F5] dark:bg-[#141A17] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-[#202923] dark:text-[#E9EFEA]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center space-x-2.5 mb-6">
          <div className="w-9 h-9 rounded-xl bg-[#203C34] flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border border-[#739181] border-dashed" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight text-[#203C34] dark:text-white">
            LeadEnrich
          </span>
        </Link>
        <h2 className="font-display text-2xl font-bold tracking-tight text-[#202923] dark:text-white">
          Reset your password
        </h2>
        <p className="mt-1 text-xs text-[#758078] dark:text-[#8E9C93]">
          Enter your work email address to receive reset instructions
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white dark:bg-[#1C2420] py-8 px-6 sm:px-10 rounded-2xl border border-[#E8ECE7] dark:border-[#2C3731] shadow-dropdown">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#3D8060]/10 text-[#3D8060] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-display text-base font-bold text-[#202923] dark:text-white">
                Check your inbox
              </h3>
              <p className="text-xs text-[#758078] dark:text-[#8E9C93] leading-relaxed">
                If an account exists for <span className="font-mono font-semibold">{email}</span>, you will receive password reset instructions within 2 minutes.
              </p>
              <div className="pt-4">
                <Link
                  to="/login"
                  className="inline-flex items-center space-x-1.5 text-xs text-[#203C34] dark:text-[#8BB09D] font-semibold hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to login</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#202923] dark:text-white mb-1">
                  Work Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#758078] absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="alex@company.dk"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none focus:border-[#203C34]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-[#203C34] text-white text-xs font-semibold hover:bg-[#2c544a] transition-all shadow-subtle"
              >
                Send Password Reset Email
              </button>

              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center space-x-1.5 text-xs text-[#758078] hover:text-[#202923] dark:hover:text-white"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to sign in</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
