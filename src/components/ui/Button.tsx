'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'h-9 px-3.5 text-xs rounded-lg gap-1.5',
      md: 'h-11 px-5 text-sm rounded-xl gap-2',
      lg: 'h-12 px-6 text-sm rounded-xl gap-2.5 font-semibold sm:px-7 sm:text-base',
    };

    const variantClasses = {
      primary:
        'relative bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 font-semibold shadow-glow-cyan hover:shadow-glow-cyan-lg hover:brightness-110 active:scale-[0.98] transition-all duration-300',
      secondary:
        'bg-slate-900/80 hover:bg-slate-800/90 text-white border border-slate-700/60 hover:border-violet-500/50 hover:shadow-glow-violet backdrop-blur-md transition-all duration-300 active:scale-[0.98]',
      outline:
        'border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300',
      ghost:
        'text-slate-300 hover:text-white hover:bg-white/5 active:bg-white/10 transition-colors',
      glow:
        'relative bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-medium shadow-glow-violet hover:shadow-glow-violet-lg transition-all duration-300 active:scale-[0.98]',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'group inline-flex items-center justify-center select-none font-medium outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
        aria-busy={isLoading || props['aria-busy']}
      >
        {isLoading ? (
          <Loader2 aria-hidden="true" className="w-4 h-4 animate-spin text-current motion-reduce:animate-none" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
