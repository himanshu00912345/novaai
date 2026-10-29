'use client';

import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './Badge';
import { BarChart3, Database, ShieldCheck, Sparkles, UsersRound, Workflow, Zap } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  metrics?: string;
  color?: 'cyan' | 'violet' | 'blue' | 'indigo';
  className?: string;
}

export function FeatureCard({
  title,
  description,
  iconName,
  badge,
  metrics,
  color = 'cyan',
  className,
}: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current || e.pointerType === 'touch') return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--spotlight-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--spotlight-y', `${e.clientY - rect.top}px`);
  };

  const iconMap: Record<string, React.ElementType> = {
    BarChart3,
    Database,
    ShieldCheck,
    Sparkles,
    UsersRound,
    Workflow,
    Zap,
  };
  const IconComponent = iconMap[iconName] || Sparkles;

  const colorThemes = {
    cyan: {
      iconBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]',
      borderGlow: 'rgba(0, 240, 255, 0.18)',
      badgeVariant: 'cyan' as const,
    },
    violet: {
      iconBg: 'bg-violet-500/10 border-violet-500/30 text-violet-300 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]',
      borderGlow: 'rgba(168, 85, 247, 0.18)',
      badgeVariant: 'violet' as const,
    },
    blue: {
      iconBg: 'bg-sky-500/10 border-sky-500/30 text-sky-300 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]',
      borderGlow: 'rgba(56, 189, 248, 0.18)',
      badgeVariant: 'cyan' as const,
    },
    indigo: {
      iconBg: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]',
      borderGlow: 'rgba(99, 102, 241, 0.18)',
      badgeVariant: 'violet' as const,
    },
  };

  const theme = colorThemes[color];

  return (
    <div
      ref={cardRef}
      onPointerMove={handleMouseMove}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.10] bg-gradient-to-br from-white/[0.065] via-slate-900/75 to-cyan-950/25 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,.05)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_24px_55px_-38px_rgba(34,211,238,.28)] md:p-8',
        className
      )}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${theme.borderGlow}, transparent 70%)`,
        }}
      />

      {/* Card Header & Icon */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300',
              theme.iconBg
            )}
          >
            <IconComponent className="w-6 h-6" />
          </div>

          {badge && <Badge variant={theme.badgeVariant}>{badge}</Badge>}
        </div>

        <h3 className="text-xl font-bold text-white tracking-tight mb-3 group-hover:text-cyan-200 transition-colors">
          {title}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Card Bottom Meta */}
      {metrics && (
        <div className="relative z-10 flex items-center justify-between border-t border-white/5 pt-4 text-xs">
          <span className="text-slate-500 font-medium">In this concept</span>
          <span className="text-cyan-300 font-semibold font-mono bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
            {metrics}
          </span>
        </div>
      )}
    </div>
  );
}
