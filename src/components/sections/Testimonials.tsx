import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { TESTIMONIALS } from '@/lib/utils';
import { AlertCircle, Quote, Sparkles } from 'lucide-react';

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32 overflow-hidden border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/10 blur-[130px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Illustrative voices"
          badgeVariant="violet"
          title="A sample of the story"
          highlight="told through voices"
          description="These fictional sample quotes demonstrate one way feedback could appear in the interface; they are not customer testimonials."
        />

        {/* Mandatory Fictional Sample Content Disclaimer Notice */}
        <Reveal>
          <div className="max-w-2xl mx-auto mb-12 p-3.5 rounded-xl border border-amber-500/30 bg-amber-950/20 backdrop-blur-md flex items-center justify-center gap-3 text-amber-300 text-xs sm:text-sm text-center">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              <strong>Portfolio notice:</strong> Fictional sample quotes only. No real customers, endorsements, or business results are represented.
            </span>
          </div>
        </Reveal>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.08} className="h-full">
              <div className="relative rounded-2xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl flex flex-col justify-between h-full hover:border-white/20 transition-all duration-300 group">
                <div>
                  {/* Sample label & quote icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/15 bg-cyan-300/[0.05] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.13em] text-cyan-100/70">
                      <Sparkles className="h-3 w-3" /> Sample quote
                    </div>
                    <Quote className="w-6 h-6 text-slate-700 group-hover:text-cyan-400/50 transition-colors" />
                  </div>

                  {/* Quote Text */}
                  <p className="text-slate-300 text-sm leading-relaxed italic mb-8">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Author Meta */}
                <div className="pt-6 border-t border-white/5 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-500 to-violet-600 p-0.5 flex items-center justify-center text-xs font-bold text-white shadow-glow-cyan">
                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                      {item.avatar}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{item.author}</div>
                    <div className="text-xs text-slate-400">{item.role}</div>
                    <div className="text-[11px] text-cyan-400 font-mono mt-0.5">{item.company}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
