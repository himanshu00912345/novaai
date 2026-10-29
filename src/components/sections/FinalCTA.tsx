'use client';

import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function FinalCTA() {
  const exploreDemo = () => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative overflow-hidden border-t border-white/[0.08] py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-cyber-grid bg-[size:42px_42px] opacity-[0.12] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-500/[0.10] via-indigo-500/[0.10] to-violet-500/[0.10] blur-[100px]" />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Badge variant="violet"><Sparkles className="h-3.5 w-3.5" /> Front-end product concept</Badge>
        <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.04em] text-white sm:text-5xl">Explore the interface.<br /><span className="bg-gradient-to-r from-cyan-200 to-violet-300 bg-clip-text text-transparent">See the idea in motion.</span></h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">Try the interactive previews and local signup flow. No account is created, and no service is connected.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" onClick={exploreDemo} rightIcon={<ArrowUpRight className="h-4 w-4" />}>Explore the demo</Button>
          <a href="#pricing" className="inline-flex h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.06]">View example plans</a>
        </div>
      </div>
    </section>
  );
}
