'use client';

import { ArrowRight, Check, Sparkles } from 'lucide-react';
import type { PricingPlan } from '@/types';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  plan: PricingPlan;
  isAnnual: boolean;
  onSelect: (planName: string) => void;
}

export function PricingCard({ plan, isAnnual, onSelect }: PricingCardProps) {
  const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;

  return (
    <article className={cn(
      'group relative flex h-full flex-col justify-between rounded-2xl p-6 transition duration-300 sm:p-7',
      plan.popular
        ? 'border border-cyan-300/35 bg-gradient-to-b from-cyan-300/[0.08] via-slate-900/85 to-slate-950 shadow-[0_24px_70px_-42px_rgba(34,211,238,.28)] hover:border-cyan-200/55 hover:shadow-[0_30px_80px_-40px_rgba(34,211,238,.32)] lg:-translate-y-2 lg:hover:-translate-y-3'
        : 'border border-white/[0.09] bg-gradient-to-br from-white/[0.035] to-slate-900/60 hover:-translate-y-1 hover:border-white/[0.18] hover:shadow-[0_24px_60px_-44px_rgba(148,163,184,.22)]'
    )}>
      {plan.popular && <span className="absolute -top-3 left-6 rounded-full border border-cyan-300/20 bg-slate-950 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-200">Recommended concept</span>}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">{plan.name}</h3>
          {plan.popular && <Sparkles aria-hidden="true" className="h-4 w-4 text-cyan-200" />}
        </div>
        <p className="mt-2 min-h-10 text-sm leading-5 text-slate-400">{plan.description}</p>
        <div className="mt-6 flex items-end gap-2 border-b border-white/[0.09] pb-6">
          <span className="font-mono text-4xl tracking-tight text-white">{'$' + price}</span>
          <span className="mb-1 text-xs text-slate-400">/ month</span>
          <span className="mb-1 ml-auto text-[10px] text-slate-500">{isAnnual ? 'example annual rate' : 'example monthly rate'}</span>
        </div>
        <ul className="mt-6 space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm leading-5 text-slate-300">
              <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button variant={plan.popular ? 'primary' : 'secondary'} size="lg" onClick={() => onSelect(plan.name)} className="mt-8 w-full" rightIcon={<ArrowRight className="h-4 w-4" />}>
        {plan.ctaLabel}
      </Button>
    </article>
  );
}
