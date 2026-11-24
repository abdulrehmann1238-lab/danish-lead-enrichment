import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2.5 max-w-md w-full pointer-events-none px-4">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start space-x-3 p-4 rounded-xl border shadow-dropdown bg-white dark:bg-[#1C2420] transition-all duration-200 transform translate-y-0 ${
              isSuccess
                ? 'border-[#3D8060]/30 text-[#202923] dark:text-[#E9EFEA]'
                : isError
                ? 'border-[#B85D57]/30 text-[#202923] dark:text-[#E9EFEA]'
                : isWarning
                ? 'border-[#C18A45]/30 text-[#202923] dark:text-[#E9EFEA]'
                : 'border-[#E8ECE7] dark:border-[#2C3731] text-[#202923] dark:text-[#E9EFEA]'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#3D8060]" />}
              {isError && <AlertCircle className="w-5 h-5 text-[#B85D57]" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-[#C18A45]" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-[#739181]" />}
            </div>

            <div className="flex-1 min-w-0 pr-2">
              <h4 className="text-sm font-semibold tracking-tight">{toast.title}</h4>
              {toast.description && (
                <p className="text-xs text-[#758078] dark:text-[#8E9C93] mt-0.5 leading-relaxed">
                  {toast.description}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 text-[#758078] hover:text-[#202923] dark:hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
