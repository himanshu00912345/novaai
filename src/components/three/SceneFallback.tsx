'use client';

import { Bot, Cpu, Sparkles } from 'lucide-react';

interface SceneFallbackProps {
  message?: string;
  isError?: boolean;
  isStatic?: boolean;
}

export function SceneFallback({
  message = 'Loading the local robot model…',
  isError = false,
  isStatic = false,
}: SceneFallbackProps) {
  const label = isError ? 'Static safe mode' : isStatic ? 'Lightweight visual' : '3D preview loading';

  return (
    <div
      role={isError ? 'img' : 'status'}
      aria-label={isError ? message : undefined}
      aria-live={isError ? undefined : 'polite'}
      className="relative flex h-full min-h-[400px] w-full flex-col items-center justify-center overflow-hidden bg-[#070c18] p-8 sm:min-h-[480px] lg:min-h-[560px]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute h-72 w-72 rounded-full bg-cyan-500/[0.08] blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute h-56 w-56 rounded-full bg-violet-500/[0.07] blur-3xl" />
      <div aria-hidden="true" className="relative flex h-48 w-48 items-center justify-center rounded-full border border-cyan-300/15 sm:h-56 sm:w-56">
        <div className="absolute inset-4 rounded-full border border-dashed border-violet-300/20" />
        <div className="absolute inset-8 rounded-full border border-cyan-300/25" />
        <span className="relative z-10 flex h-24 w-24 items-center justify-center rounded-2xl border border-cyan-200/20 bg-gradient-to-br from-cyan-300/[0.12] to-violet-300/[0.08] text-cyan-100 shadow-[0_0_40px_-18px_rgba(34,211,238,.5)]">
          {isError ? <Cpu className="h-9 w-9" /> : <Bot className="h-10 w-10" />}
        </span>
        <span className="absolute left-1/2 top-0 h-px w-8 -translate-x-1/2 bg-cyan-200/70" />
        <span className="absolute bottom-0 left-1/2 h-px w-8 -translate-x-1/2 bg-violet-200/70" />
      </div>
      <div className="relative z-10 mt-8 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-slate-950/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-300">
          <Sparkles className="h-3.5 w-3.5 text-cyan-200" />
          <span>{label}</span>
        </div>
        <p className="text-sm font-medium text-white">{message}</p>
        <p className="mt-1 text-xs text-slate-500">Local 3D asset · static visual available</p>
      </div>
    </div>
  );
}
