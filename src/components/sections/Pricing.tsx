'use client';

import React, { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Reveal } from '@/components/ui/Reveal';
import { PRICING_PLANS, cn } from '@/lib/utils';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState('Pro');

  const handleSelectPlan = (planName: string) => {
    setSelectedPlanName(planName);
    setModalOpen(true);
  };

  return (
    <section id="pricing" className="relative py-24 sm:py-32 bg-slate-950/60 border-t border-white/10">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Illustrative plans"
          badgeVariant="cyan"
          title="A simple shape for"
          highlight="workspaces of any size"
          description="Explore a sample plan-selection interface. Prices and included items are fictional portfolio examples; no purchase or subscription is possible here."
        />

        {/* Monthly vs Annual Toggle */}
        <div className="flex items-center justify-center gap-3 mb-16">
          <button
            type="button"
            aria-pressed={!isAnnual}
            aria-label="Switch to monthly billing"
            onClick={() => setIsAnnual(false)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer',
              !isAnnual
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan'
                : 'text-slate-400 hover:text-white border border-transparent'
            )}
          >
            Monthly Billing
          </button>

          <button
            type="button"
            onClick={() => setIsAnnual(!isAnnual)}
            aria-label="Toggle annual billing discount"
            aria-pressed={isAnnual}
            className="relative w-14 h-8 rounded-full bg-slate-900 border border-white/20 p-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
          >
            <div
              className={cn(
                'w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 shadow-glow-cyan transition-transform duration-300',
                isAnnual ? 'translate-x-6' : 'translate-x-0'
              )}
            />
          </button>

          <button
            type="button"
            aria-pressed={isAnnual}
            aria-label="Switch to annual billing"
            onClick={() => setIsAnnual(true)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer',
              isAnnual
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan'
                : 'text-slate-400 hover:text-white border border-transparent'
            )}
          >
            <span>Annual Billing</span>
            <Badge variant="cyan" dot={false}>
              Save 20%
            </Badge>
          </button>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan, index) => {
            const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;

            return (
              <Reveal key={plan.id} delay={index * 0.08} className="h-full">
                <div
                  className={cn(
                    'relative rounded-2xl p-8 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between h-full group',
                    plan.popular
                      ? 'border-2 border-cyan-400/60 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950 shadow-2xl shadow-cyan-950/40 lg:-translate-y-2'
                      : 'border border-white/10 bg-slate-900/60 hover:border-white/20'
                  )}
                >
                  {/* Popular Flag */}
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 font-bold text-xs shadow-glow-cyan uppercase tracking-wider">
                        Most Popular Tier
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white tracking-tight">{plan.name}</h3>
                      {plan.popular && <Sparkles className="w-5 h-5 text-cyan-400" />}
                    </div>

                    <p className="text-slate-400 text-sm mb-6 min-h-[40px] leading-relaxed">
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-white/10">
                      <span className="text-4xl sm:text-5xl font-black font-mono text-white">
                        ${price}
                      </span>
                      <span className="text-slate-400 text-sm">/ month</span>
                      {isAnnual && (
                      <span className="text-xs text-cyan-400 font-mono ml-2">example annual rate</span>
                      )}
                    </div>

                    {/* Feature Checklist */}
                    <div className="space-y-3.5 mb-8">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                        Included Capabilities:
                      </div>
                      {plan.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-3 text-sm text-slate-300">
                          <div className="mt-0.5 rounded-full p-0.5 bg-cyan-500/20 text-cyan-400 shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Plan CTA */}
                  <Button
                    variant={plan.popular ? 'primary' : 'secondary'}
                    size="lg"
                    onClick={() => handleSelectPlan(plan.name)}
                    className="w-full"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {plan.ctaLabel}
                  </Button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Local plan preview modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Preview ${selectedPlanName} plan`}
        defaultPlan={selectedPlanName}
      />
    </section>
  );
}
