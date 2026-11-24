import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Lock, Mail, Eye, EyeOff, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('alex@lead-enrich.demo');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();
  const { showToast } = useApp();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    showToast({
      type: 'success',
      title: 'Demo Session Authenticated',
      description: 'Logged in as Alex Morgan (Nordic Growth Studio).',
    });
    navigate('/app/dashboard');
  };

  const handleQuickDemo = () => {
    showToast({
      type: 'success',
      title: 'Welcome to LeadEnrich Demo',
      description: 'Loading Nordic workspace with 1,250 prepaid credits.',
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
          Sign in to your prospecting workspace
        </h2>
        <p className="mt-1 text-xs text-[#758078] dark:text-[#8E9C93]">
          Or explore immediately using the pre-configured demo account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white dark:bg-[#1C2420] py-8 px-6 sm:px-10 rounded-2xl border border-[#E8ECE7] dark:border-[#2C3731] shadow-dropdown space-y-6">
          {/* Prominent Demo Entry Banner */}
          <div className="p-4 rounded-xl bg-[#E9EEE9]/60 dark:bg-[#25332C]/60 border border-[#739181]/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#203C34] dark:text-[#8BB09D] flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#3D8060]" />
                <span>Instant Client Demo Mode</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#3D8060]/10 text-[#3D8060] font-semibold">
                1,250 Credits
              </span>
            </div>
            <p className="text-[11px] text-[#758078] dark:text-[#8E9C93] leading-relaxed">
              No registration or password needed to evaluate the 15,000-contact database and enrichment workflows.
            </p>
            <button
              onClick={handleQuickDemo}
              className="w-full mt-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg bg-[#203C34] text-white text-xs font-semibold hover:bg-[#2c544a] transition-all shadow-subtle"
            >
              <span>Continue with Alex Morgan (Demo Account)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E8ECE7] dark:border-[#2C3731]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-[#1C2420] px-2 text-[#758078] font-mono">
                Or enter credentials
              </span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
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
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-[#202923] dark:text-white">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] text-[#739181] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#758078] absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-9 pr-9 py-2 text-xs rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] bg-[#F7F8F5] dark:bg-[#141A17] text-[#202923] dark:text-white focus:outline-none focus:border-[#203C34]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#758078] hover:text-[#202923]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#E8ECE7] text-[#203C34] focus:ring-[#739181]"
                />
                <span className="text-[#758078]">Remember this device</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#203C34] text-white text-xs font-semibold hover:bg-[#2c544a] transition-all shadow-subtle"
            >
              Sign In
            </button>
          </form>

          {/* Google Sign-in demo visual */}
          <div className="pt-2">
            <button
              onClick={handleQuickDemo}
              className="w-full py-2 px-4 rounded-xl border border-[#E8ECE7] dark:border-[#2C3731] text-xs font-medium text-[#202923] dark:text-white hover:bg-[#F3F5F2] dark:hover:bg-[#232C27] flex items-center justify-center space-x-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google Workspace (Demo)</span>
            </button>
          </div>

          <div className="text-center text-xs text-[#758078]">
            Don't have a workspace?{' '}
            <Link to="/register" className="text-[#203C34] dark:text-[#8BB09D] font-semibold hover:underline">
              Create free account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
