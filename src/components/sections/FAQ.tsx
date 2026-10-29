'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FAQ_ITEMS, cn } from '@/lib/utils';
import { Reveal } from '@/components/ui/Reveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <section id="faq" className="border-t border-white/[0.08] bg-slate-950/70 py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading badge="Good to know" title="A few clear answers about" highlight="this concept" description="What’s interactive, what’s sample content, and what happens when you try the local signup flow." />
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;
            const answerId = 'faq-answer-' + item.id;
            return (
              <Reveal key={item.id} delay={index * 0.035}>
              <article className={cn('overflow-hidden rounded-xl border transition-colors', isOpen ? 'border-cyan-300/25 bg-slate-900/75' : 'border-white/[0.08] bg-slate-900/35 hover:border-white/[0.14]')}>
                <h3>
                  <button type="button" onClick={() => setOpenId(isOpen ? null : item.id)} aria-expanded={isOpen} aria-controls={answerId} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left focus-visible:outline-cyan-200 sm:px-6">
                    <span className="text-sm font-medium leading-6 text-white sm:text-base">{item.question}</span>
                    <ChevronDown aria-hidden="true" className={cn('h-4 w-4 shrink-0 text-slate-400 transition-transform', isOpen && 'rotate-180 text-cyan-200')} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={answerId}
                      role="region"
                      aria-label={item.question}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/[0.06] px-5 py-4 text-sm leading-6 text-slate-400 sm:px-6">{item.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
