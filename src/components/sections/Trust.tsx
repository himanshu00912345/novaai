import { Activity, Code2, Layers3, Workflow } from 'lucide-react';
import { DemoCounter } from '@/components/ui/DemoCounter';

const previews = [
  { label: 'Interactive panels', value: 3, icon: Activity },
  { label: 'Workflow stages', value: 3, icon: Workflow },
  { label: 'Product themes', value: 5, icon: Layers3 },
  { label: 'AI services connected', value: null, icon: Code2 },
];

export function Trust() {
  return (
    <section aria-labelledby="preview-overview" className="border-y border-white/[0.08] bg-white/[0.018] py-9 sm:py-11">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-300">Concept overview</p>
            <h2 id="preview-overview" className="mt-2 text-lg font-medium tracking-tight text-white">A small tour of the product idea</h2>
          </div>
          <p className="max-w-xl text-xs leading-5 text-slate-400">Every figure here describes this front-end demo. No customer, performance, or service data is represented.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {previews.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.045] to-slate-950/60 px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,.04)]">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-300/15 bg-cyan-300/[0.07] text-cyan-200"><Icon className="h-4 w-4" /></span>
              <div className="min-w-0"><p className="font-mono text-lg leading-5 text-white">{value === null ? 'None' : <DemoCounter value={value} />}</p><p className="mt-1 text-[11px] leading-4 text-slate-400">{label}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
