'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart3, Check, Clipboard, GitBranch, Play, RotateCw, Sparkles, Workflow, Zap } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Reveal } from '@/components/ui/Reveal';

type DashboardTab = 'studio' | 'workflow' | 'activity';
type RangeKey = '24h' | '7d' | '30d';

const examples = [
  {
    title: 'Task summary',
    prompt: 'Turn a long project update into a concise summary with clear next steps.',
    output: 'Project summary\n\n• The new onboarding flow is ready for review.\n• API documentation needs one final pass.\n• Next: confirm owners for the open launch tasks.\n\nThis is a fixed sample response for the NovaAI interface demo.',
  },
  {
    title: 'Release checklist',
    prompt: 'Draft a practical checklist for a small web app release.',
    output: 'Release checklist\n\n[ ] Review the final changes\n[ ] Run the project checks\n[ ] Confirm the deployment environment\n[ ] Share the release notes\n\nThis is a fixed sample response for the NovaAI interface demo.',
  },
];

const sampleRanges: Record<RangeKey, { metrics: { label: string; value: string; note: string }[]; bars: number[] }> = {
  '24h': { metrics: [{ label: 'Example requests', value: '1.2k', note: 'sample value' }, { label: 'Median latency', value: '184 ms', note: 'sample value' }, { label: 'Error rate', value: '0.8%', note: 'sample value' }, { label: 'Service status', value: 'Demo', note: 'not connected' }], bars: [34, 42, 37, 56, 48, 65, 54, 74, 62, 82, 70, 59, 76, 88, 68, 80, 64, 91, 73, 60, 78, 55, 69, 48] },
  '7d': { metrics: [{ label: 'Example requests', value: '7.8k', note: 'sample value' }, { label: 'Median latency', value: '191 ms', note: 'sample value' }, { label: 'Error rate', value: '1.1%', note: 'sample value' }, { label: 'Service status', value: 'Demo', note: 'not connected' }], bars: [54, 48, 66, 72, 58, 82, 65, 76, 61, 52, 71, 88, 64, 77, 58, 83, 69, 92, 72, 62, 80, 68, 74, 85] },
  '30d': { metrics: [{ label: 'Example requests', value: '31k', note: 'sample value' }, { label: 'Median latency', value: '188 ms', note: 'sample value' }, { label: 'Error rate', value: '0.9%', note: 'sample value' }, { label: 'Service status', value: 'Demo', note: 'not connected' }], bars: [42, 58, 64, 50, 73, 69, 84, 60, 77, 68, 90, 75, 55, 82, 70, 63, 88, 72, 61, 80, 67, 92, 76, 84] },
};

const tabs: { id: DashboardTab; label: string; icon: typeof Sparkles }[] = [
  { id: 'studio', label: 'Content Studio', icon: Sparkles },
  { id: 'workflow', label: 'DAG Pipelines', icon: Workflow },
  { id: 'activity', label: 'Telemetry', icon: BarChart3 },
];

export function Dashboard() {
  const reducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<DashboardTab>('studio');
  const [exampleIndex, setExampleIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isReplaying, setIsReplaying] = useState(false);
  const [range, setRange] = useState<RangeKey>('24h');
  const [notice, setNotice] = useState('');

  const replayExample = () => {
    setIsReplaying(true);
    setNotice('');
    window.setTimeout(() => {
      setIsReplaying(false);
      setNotice('Sample replayed locally. No model was called.');
    }, 450);
  };

  const copyExample = async () => {
    try {
      await navigator.clipboard.writeText(examples[exampleIndex].output);
      setCopied(true);
      setNotice('Sample copied to clipboard.');
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
      setNotice('Clipboard access is unavailable. You can select and copy the sample text.');
    }
  };

  const currentRange = sampleRanges[range];

  return (
    <section id="dashboard" className="border-y border-white/[0.08] bg-[#070c17] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          badge="Interactive Console Preview"
          badgeVariant="violet"
          title="Step inside the"
          highlight="Workspace Mission Control"
          description="Switch between three local demos: a content studio, a workflow preview, and a sample activity view. Prompts and charts use fixed front-end examples; no model or external service is connected."
        />

        <Reveal delay={0.06}>
          <div className="overflow-hidden rounded-2xl border border-white/[0.10] bg-gradient-to-br from-white/[0.045] via-slate-900/80 to-cyan-950/15 shadow-[0_30px_100px_-60px_rgba(34,211,238,.32)]">
            <div className="flex flex-col gap-4 border-b border-white/[0.08] bg-slate-950/55 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex gap-1.5" aria-hidden="true">
                  <i className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                  <i className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                  <i className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
                </span>
                <span className="border-l border-white/10 pl-3 font-mono text-[10px] text-slate-500">
                  NOVA / WORKSPACE PREVIEW
                </span>
              </div>
              <div
                role="tablist"
                aria-label="Workspace demo panels"
                className="grid grid-cols-3 gap-1 rounded-xl border border-white/[0.07] bg-slate-950/65 p-1"
              >
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    id={'tab-' + id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === id}
                    aria-controls="workspace-panel"
                    onClick={() => {
                      setActiveTab(id);
                      setNotice('');
                    }}
                    className={cn(
                      'flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-[10px] transition-colors sm:px-3 sm:text-xs',
                      activeTab === id
                        ? 'bg-white/[0.09] text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-200'
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div
              id="workspace-panel"
              role="tabpanel"
              aria-labelledby={'tab-' + activeTab}
              className="min-h-[420px] p-4 sm:p-6 lg:p-8"
            >
              {activeTab === 'studio' && (
                <div className="space-y-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">Prompt Studio</p>
                      <p className="mt-1 text-xs text-slate-500">Sample prompt templates and output streams</p>
                    </div>
                    <div className="flex flex-wrap gap-2" aria-label="Select a sample prompt">
                      {examples.map((example, index) => (
                        <button
                          key={example.title}
                          type="button"
                          aria-pressed={exampleIndex === index}
                          onClick={() => {
                            setExampleIndex(index);
                            setNotice('');
                          }}
                          className={cn(
                            'rounded-lg border px-3 py-2 text-xs transition-colors',
                            exampleIndex === index
                              ? 'border-cyan-200/25 bg-cyan-200/[0.06] text-cyan-100'
                              : 'border-white/[0.08] text-slate-400 hover:text-white'
                          )}
                        >
                          {example.title}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-slate-950/60 p-4 sm:p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">Example prompt</p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">{examples[exampleIndex].prompt}</p>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-cyan-200/[0.13] bg-[#060a13]">
                    <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Sparkles className="h-3.5 w-3.5 text-cyan-200" />
                        Fixed sample output
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={replayExample}
                          disabled={isReplaying}
                          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] text-slate-400 transition hover:bg-white/[0.06] hover:text-white disabled:opacity-50"
                        >
                          <RotateCw className={cn('h-3 w-3', isReplaying && 'animate-spin')} />
                          {isReplaying ? 'Replaying…' : 'Replay example'}
                        </button>
                        <button
                          type="button"
                          onClick={copyExample}
                          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
                        >
                          {copied ? <Check className="h-3 w-3 text-emerald-300" /> : <Clipboard className="h-3 w-3" />}
                          {copied ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>
                    <pre className="max-h-72 overflow-auto whitespace-pre-wrap p-4 font-mono text-xs leading-6 text-slate-300 sm:p-5">
                      {isReplaying ? 'Replaying this fixed sample…' : examples[exampleIndex].output}
                    </pre>
                  </div>
                </div>
              )}

              {activeTab === 'workflow' && (
                <div className="space-y-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">DAG Review Workflow</p>
                      <p className="mt-1 text-xs text-slate-500">Autonomous multi-stage validation flow</p>
                    </div>
                    <button
                      type="button"
                      onClick={replayExample}
                      disabled={isReplaying}
                      className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-violet-200/15 bg-violet-200/[0.05] px-3.5 py-2.5 text-xs text-violet-100 transition hover:bg-violet-200/[0.09] disabled:opacity-50"
                    >
                      <Play className="h-3.5 w-3.5" />
                      {isReplaying ? 'Previewing…' : 'Preview sample flow'}
                    </button>
                  </div>
                  <div className="grid gap-3 md:grid-cols-4">
                    {[
                      { step: '01', title: 'Add Context', note: 'Task ingestion & payload validation.', icon: GitBranch, color: 'cyan' },
                      { step: '02', title: 'Draft Response', note: 'Speculative draft generation.', icon: Sparkles, color: 'violet' },
                      { step: '03', title: 'Review Pipeline', note: 'Automated policy & safety checks.', icon: Activity, color: 'sky' },
                      { step: '04', title: 'Deploy Action', note: 'Dispatches commit or webhook event.', icon: Zap, color: 'emerald' },
                    ].map(({ step, title, note, icon: Icon, color }) => (
                      <article key={step} className="rounded-xl border border-white/[0.08] bg-slate-950/50 p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] text-slate-600">STEP {step}</span>
                          <Icon
                            className={cn(
                              'h-4 w-4',
                              color === 'cyan'
                                ? 'text-cyan-200'
                                : color === 'violet'
                                ? 'text-violet-200'
                                : color === 'sky'
                                ? 'text-sky-200'
                                : 'text-emerald-200'
                            )}
                          />
                        </div>
                        <h3 className="mt-6 text-sm font-medium text-white">{title}</h3>
                        <p className="mt-2 text-xs leading-5 text-slate-500">{note}</p>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="space-y-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">Telemetry & Analytics</p>
                      <p className="mt-1 text-xs text-slate-500">Fixed example values and an illustrative chart</p>
                    </div>
                    <div
                      role="group"
                      aria-label="Select sample time range"
                      className="flex w-fit gap-1 rounded-lg border border-white/[0.08] bg-slate-950/55 p-1"
                    >
                      {(['24h', '7d', '30d'] as const).map((period) => (
                        <button
                          key={period}
                          type="button"
                          aria-pressed={range === period}
                          onClick={() => setRange(period)}
                          className={cn(
                            'rounded-md px-3 py-1.5 font-mono text-[10px] transition-colors',
                            range === period ? 'bg-white/[0.09] text-white' : 'text-slate-500 hover:text-white'
                          )}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {currentRange.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-xl border border-white/[0.08] bg-slate-950/50 p-4">
                        <p className="text-[11px] text-slate-500">{metric.label}</p>
                        <p className="mt-2 font-mono text-xl text-white sm:text-2xl">{metric.value}</p>
                        <p className="mt-1 text-[10px] text-slate-600">{metric.note}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-slate-950/50 p-4 sm:p-5">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Example Activity Pattern</span>
                      <span className="font-mono">{range} sample</span>
                    </div>
                    <div
                      className="mt-5 flex h-28 items-end gap-1.5 sm:gap-2"
                      role="img"
                      aria-label={'Illustrative bar chart for ' + range}
                    >
                      {currentRange.bars.map((value, index) => (
                        <motion.div
                          key={index}
                          initial={{ height: '0%' }}
                          animate={{ height: `${value}%` }}
                          transition={{
                            duration: reducedMotion ? 0 : 0.5,
                            delay: reducedMotion ? 0 : index * 0.012,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="flex-1 rounded-t-sm bg-gradient-to-t from-cyan-500/20 to-cyan-200/65"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-white/[0.07] bg-slate-950/40 px-4 py-3 sm:px-6">
              <p role="status" aria-live="polite" className="min-h-4 text-[11px] text-slate-500">
                {notice || 'Local demo · sample content is simulated in the front end.'}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
