import React from 'react';

interface BadgeProps {
  variant?: 'free' | 'premium' | 'verified' | 'available' | 'not_revealed' | 'unavailable' | 'opted_out' | 'neutral' | 'success';
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ 
  variant = 'neutral', 
  children, 
  className = '',
  size = 'md' 
}) => {
  const sizeClasses = size === 'sm' 
    ? 'px-1.5 py-0.5 text-[10px]' 
    : 'px-2 py-0.5 text-xs';

  let variantClasses = 'bg-[#F3F5F2] text-[#758078] border-[#E8ECE7]';

  switch (variant) {
    case 'free':
      variantClasses = 'bg-[#E9EEE9] text-[#203C34] border-[#739181]/30 font-semibold';
      break;
    case 'premium':
      variantClasses = 'bg-[#E9E5DC] text-[#203C34] border-[#C18A45]/40 font-semibold';
      break;
    case 'verified':
      variantClasses = 'bg-[#3D8060]/10 text-[#3D8060] border-[#3D8060]/30 font-medium';
      break;
    case 'available':
      variantClasses = 'bg-[#739181]/15 text-[#203C34] dark:text-[#8BB09D] border-[#739181]/30 font-medium';
      break;
    case 'not_revealed':
      variantClasses = 'bg-[#F3F5F2] text-[#758078] dark:bg-[#232C27] dark:text-[#8E9C93] border-dashed border-[#E8ECE7] dark:border-[#2C3731]';
      break;
    case 'unavailable':
    case 'opted_out':
      variantClasses = 'bg-[#B85D57]/10 text-[#B85D57] border-[#B85D57]/30 font-medium';
      break;
    case 'success':
      variantClasses = 'bg-[#3D8060]/10 text-[#3D8060] border-[#3D8060]/20 font-medium';
      break;
    case 'neutral':
    default:
      variantClasses = 'bg-[#F3F5F2] text-[#758078] dark:bg-[#232C27] dark:text-[#8E9C93] border-[#E8ECE7] dark:border-[#2C3731]';
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono tracking-tight rounded-md border ${sizeClasses} ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
};
