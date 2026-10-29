import { Eye, GitBranch, UsersRound } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

const principles = [
  { icon: Eye, eyebrow: '01 / clarity', title: 'Keep the work legible', body: 'Use hierarchy, calm contrast, and well-labeled states to make a complex workspace easier to scan.' },
  { icon: GitBranch, eyebrow: '02 / process', title: 'Make each step visible', body: 'Show how an idea moves through a process, and make room for review before the next handoff.' },
  { icon: UsersRound, eyebrow: '03 / people', title: 'Leave room for judgment', body: 'Treat automation as support for a team’s work, with people able to understand and shape the outcome.' },
];

export function Principles() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-violet-500/[0.08] blur-[110px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading badge="Design principles" badgeVariant="violet" title="A workspace that keeps" highlight="people in the loop" description="A few ideas behind the NovaAI concept: clear states, visible processes, and thoughtful human review." />
        <div className="grid gap-4 md:grid-cols-3">
          {principles.map(({ icon: Icon, eyebrow, title, body }, index) => (
            <Reveal key={eyebrow} delay={index * 0.08}>
              <article className="group h-full rounded-2xl border border-white/[0.09] bg-slate-900/45 p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-300/25 hover:bg-slate-900/70 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-violet-300">{eyebrow}</span>
                  <Icon className="h-4 w-4 text-slate-500 transition-colors group-hover:text-violet-200" />
                </div>
                <h3 className="mt-9 text-xl font-medium tracking-tight text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
