import { Cpu, Database, Globe } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { WORKFLOW_STEPS } from '@/lib/utils';

const iconMap = { Database, Cpu, Globe };

export function Workflow() {
  return (
    <section id="workflow" className="relative overflow-hidden py-24 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-[700px] -translate-x-1/2 rounded-full bg-violet-600/[0.08] blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading badge="Example process" badgeVariant="violet" title="From a clear starting point to" highlight="a reviewed outcome" description="A simple workflow concept that makes context, process, and human review visible. These cards illustrate a direction; they do not connect to integrations or run tasks." />
        <div className="grid gap-4 md:grid-cols-3">
          {WORKFLOW_STEPS.map((step, index) => {
            const Icon = iconMap[step.iconName as keyof typeof iconMap] || Cpu;
            return (
              <Reveal key={step.step} delay={index * 0.08}>
                <article className="group h-full rounded-2xl border border-white/[0.09] bg-slate-900/45 p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-300/25 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-3xl text-slate-600 transition-colors group-hover:text-violet-200/70">{step.step}</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-300/[0.06] text-violet-200"><Icon className="h-5 w-5" /></span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium tracking-tight text-white">{step.title}</h3>
                  <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-slate-400">{step.description}</p>
                  <p className="mt-6 border-t border-white/[0.08] pt-4 text-[11px] leading-5 text-slate-500">{step.detail}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
