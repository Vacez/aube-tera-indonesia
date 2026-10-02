import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  icon: Icon,
  type = 'button',
  disabled = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer';

  const variants = {
    primary: 'bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:via-sky-700 hover:to-blue-700 text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 border border-sky-400/30',
    secondary: 'bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200/80 hover:border-sky-300 shadow-sm',
    white: 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 shadow-md shadow-slate-200/50 hover:border-sky-300',
    outline: 'bg-white/80 backdrop-blur-sm text-sky-600 border border-sky-300 hover:bg-sky-50 hover:border-sky-400 shadow-sm',
    ghost: 'bg-transparent text-slate-700 hover:text-sky-600 hover:bg-sky-50/70',
    whatsapp: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/25 border border-emerald-400/40'
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs font-semibold gap-1.5',
    md: 'px-5 py-2.5 text-sm font-semibold gap-2',
    lg: 'px-7 py-3.5 text-base font-bold gap-2.5'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {Icon && <Icon className={`${size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />}
      <span>{children}</span>
    </button>
  );
};
