'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowDown, ArrowRight, Activity, GitBranch, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Reveal } from '@/components/ui/Reveal';
import { SceneFallback } from '@/components/three/SceneFallback';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

const RobotScene = dynamic(() => import('@/components/three/RobotScene'), {
  ssr: false,
  loading: () => <SceneFallback message="Preparing the local robot model…" />,
});

const demoMetrics = [
  { value: '03', label: 'Interactive demos' },
  { value: '05', label: 'Product themes' },
  { value: '0', label: 'AI services connected' },
];

const particles = Array.from({ length: 18 }, (_, index) => ({
  left: `${5 + ((index * 29) % 91)}%`,
  top: `${9 + ((index * 31) % 78)}%`,
  delay: `${(index % 6) * -1.25}s`,
  duration: `${8 + (index % 5) * 1.7}s`,
  size: `${index % 7 === 0 ? 3 : 2}px`,
}));

export function Hero() {
  const reducedMotion = useReducedMotion();
  const [trialOpen, setTrialOpen] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  const explorePlatform = () => {
    setPulseKey((current) => current + 1);
    document.getElementById('dashboard')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const previewTrial = () => {
    setPulseKey((current) => current + 1);
    setTrialOpen(true);
  };

  return (
    <section id="top" className="nova-hero relative isolate flex min-h-[92svh] items-center overflow-hidden pb-12 pt-28 sm:pb-14 sm:pt-28 lg:pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-cyber-grid bg-[size:46px_46px] opacity-[0.13] [mask-image:radial-gradient(ellipse_at_61%_43%,black,transparent_82%)]" />
      <div aria-hidden="true" className="hero-aurora pointer-events-none absolute -inset-[18%] opacity-80 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
        {particles.map((particle, index) => (
          <span
            key={index}
            className="hero-particle"
            style={{
              left: particle.left,
              top: particle.top,
              ['--particle-delay' as string]: particle.delay,
              ['--particle-duration' as string]: particle.duration,
              ['--particle-size' as string]: particle.size,
            }}
          />
        ))}
      </div>
      <div aria-hidden="true" className="nova-hero-horizon pointer-events-none absolute inset-x-0 bottom-0 h-48" />

      <div className="relative z-10 mx-auto w-full max-w-[1420px] px-5 sm:px-8 xl:px-12">
        <div className="grid items-center gap-2 md:grid-cols-[minmax(0,.97fr)_minmax(0,1.03fr)] md:gap-0">
          <div className="relative z-20 max-w-[620px] py-6 lg:py-0">
            <Reveal>
              <div className="mb-7 flex flex-wrap items-center gap-3 sm:mb-8">
                <Badge variant="cyan" dot>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] sm:text-[11px]">Nova Engine 3.8 Live</span>
                </Badge>
                <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-slate-500 sm:inline-flex">
                  <span className="h-px w-5 bg-cyan-300/50" /> An AI workspace concept
                </span>
              </div>

              <h1 className="max-w-[700px] text-[clamp(3rem,6.35vw,5.35rem)] font-extrabold leading-[.94] tracking-[-.065em] text-white md:text-[clamp(2.75rem,5.2vw,3.6rem)] lg:text-[clamp(3.2rem,6.35vw,5.35rem)]">
                <span className="block">Build Smarter</span>
                <span className="block w-fit bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text pb-2 text-transparent">with AI.</span>
              </h1>

              <p className="mt-6 max-w-[520px] text-base leading-7 text-slate-300 sm:mt-7 sm:text-lg sm:leading-8">
                Your intelligent workspace for creating, automating, and growing faster.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center md:flex-col md:items-start lg:flex-row lg:items-center">
                <Button size="lg" onClick={previewTrial} rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Start Free Trial
                </Button>
                <Button variant="secondary" size="lg" onClick={explorePlatform} leftIcon={<ArrowDown className="h-4 w-4 text-cyan-200" />}>
                  Explore the Platform
                </Button>
              </div>

              <div className="mt-9 max-w-[570px] border-t border-white/[0.11] pt-4 sm:mt-11 sm:pt-5">
                <div className="mb-4 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  <Activity aria-hidden="true" className="h-3.5 w-3.5 text-cyan-200/70" /> Illustrative demo values
                </div>
                <div className="grid grid-cols-3 divide-x divide-white/[0.09]">
                  {demoMetrics.map((metric) => (
                    <div key={metric.label} className="min-w-0 px-3 first:pl-0 sm:px-5">
                      <p className="font-mono text-2xl font-medium leading-none tracking-[-.05em] text-white sm:text-[1.75rem]">{metric.value}</p>
                      <p className="mt-2 max-w-28 text-[10px] leading-4 text-slate-400 sm:text-[11px]">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="relative z-10 -mx-5 min-w-0 sm:-mx-8 lg:mx-0">
            <Reveal delay={0.12} className="relative mx-auto w-full max-w-[820px]">
              <div className="nova-hero-stage relative isolate w-full">
                <div aria-hidden="true" className="nova-hero-stage-glow absolute left-1/2 top-[45%] h-[78%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full" />
                <div aria-hidden="true" className="nova-hero-floor-glow absolute bottom-[7%] left-1/2 h-16 w-[56%] -translate-x-1/2 rounded-full bg-cyan-300/15 blur-3xl" />
                <RobotScene pulseKey={pulseKey} />
                <div aria-hidden="true" className="nova-hologram-layer absolute inset-0 z-20">
                  <div className={cn('nova-holo-card nova-holo-card--workflow hidden xl:block', reducedMotion && 'motion-reduce:animate-none')}>
                    <div className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[.16em] text-cyan-100/80">
                      <GitBranch className="h-3 w-3 text-cyan-200" /> Flow preview
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="nova-holo-node">01</span><span className="nova-holo-connector" />
                      <span className="nova-holo-node nova-holo-node--active">02</span><span className="nova-holo-connector" />
                      <span className="nova-holo-node">03</span>
                    </div>
                    <div className="mt-2 flex justify-between font-mono text-[8px] text-slate-500"><span>Context</span><span>Review</span></div>
                  </div>

                  <div className={cn('nova-holo-card nova-holo-card--studio hidden xl:block', reducedMotion && 'motion-reduce:animate-none')}>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[.15em] text-violet-100/85"><Sparkles className="h-3 w-3 text-violet-200" /> Studio preview</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_10px_rgba(103,232,249,.8)]" />
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="h-1.5 w-[88%] rounded-full bg-white/20" />
                      <div className="h-1.5 w-[72%] rounded-full bg-white/10" />
                      <div className="h-1.5 w-[58%] rounded-full bg-gradient-to-r from-cyan-300/35 to-violet-300/25" />
                    </div>
                    <p className="mt-3 font-mono text-[8px] uppercase tracking-[.13em] text-slate-500">Local interface demo</p>
                  </div>
                </div>
                <div className="absolute right-[8%] top-[10%] z-30 hidden rounded-full border border-white/[0.10] bg-slate-950/35 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[.12em] text-slate-300/75 backdrop-blur-xl xl:block">
                  Local GLB <span className="mx-1.5 text-slate-600">/</span> CC0 asset
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <Modal isOpen={trialOpen} onClose={() => setTrialOpen(false)} title="Preview the signup flow" />
    </section>
  );
}
