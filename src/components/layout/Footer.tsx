import Link from 'next/link';
import { Bot, ArrowUpRight } from 'lucide-react';

const sections = [
  { label: 'Features', href: '/#features' },
  { label: 'Product demo', href: '/#dashboard' },
  { label: 'Example workflow', href: '/#workflow' },
  { label: 'Illustrative plans', href: '/#pricing' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#050914] py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 border-b border-white/[0.08] pb-9 md:grid-cols-[1.3fr_.7fr_.8fr]">
          <div>
            <Link href="/#top" className="inline-flex items-center gap-2.5 text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-200/20 bg-cyan-300/[0.07] text-cyan-100"><Bot className="h-4 w-4" /></span>
              <span className="text-base font-semibold tracking-tight">Nova<span className="text-cyan-200">AI</span></span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">A portfolio concept exploring how an AI workspace might bring content, workflows, and review into one considered interface.</p>
          </div>
          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Explore</h2>
            <ul className="mt-4 space-y-2.5">
              {sections.map((item) => <li key={item.href}><a href={item.href} className="text-sm text-slate-400 transition-colors hover:text-cyan-100">{item.label}</a></li>)}
              <li><Link href="/case-study" className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-cyan-100">Engineering case study <ArrowUpRight className="h-3 w-3" /></Link></li>
            </ul>
          </div>
          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Demo notes</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li>Front-end only</li>
              <li>No AI API connected</li>
              <li>Forms do not send or save data</li>
              <li>Plans and telemetry are examples</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} NovaAI · Portfolio concept</p>
          <p>Built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Three.js.</p>
        </div>
      </div>
    </footer>
  );
}
