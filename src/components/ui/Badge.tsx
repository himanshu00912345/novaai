import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'cyan' | 'violet' | 'emerald' | 'amber' | 'slate';
  dot?: boolean;
}

export function Badge({
  className,
  variant = 'cyan',
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    cyan: 'border-cyan-500/30 bg-cyan-950/40 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.15)]',
    violet: 'border-violet-500/30 bg-violet-950/40 text-violet-300 shadow-[0_0_12px_rgba(168,85,247,0.15)]',
    emerald: 'border-emerald-500/30 bg-emerald-950/40 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.15)]',
    amber: 'border-amber-500/30 bg-amber-950/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.15)]',
    slate: 'border-slate-700 bg-slate-900/60 text-slate-300',
  };

  const dotColors = {
    cyan: 'bg-cyan-400 shadow-[0_0_8px_#00f0ff]',
    violet: 'bg-violet-400 shadow-[0_0_8px_#a855f7]',
    emerald: 'bg-emerald-400 shadow-[0_0_8px_#10b981]',
    amber: 'bg-amber-400 shadow-[0_0_8px_#f59e0b]',
    slate: 'bg-slate-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full border backdrop-blur-md',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && <span aria-hidden="true" className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
}
