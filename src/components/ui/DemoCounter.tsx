'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface DemoCounterProps {
  value: number;
  digits?: number;
  className?: string;
}

/** Count up a fixed, illustrative UI value when it enters view. */
export function DemoCounter({ value, digits = 2, className }: DemoCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.65 });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(() => String(value).padStart(digits, '0'));

  useEffect(() => {
    if (reducedMotion || !inView) return;

    const controls = animate(0, value, {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplay(String(Math.round(latest)).padStart(digits, '0'));
      },
    });

    return () => controls.stop();
  }, [inView, reducedMotion, value, digits]);

  return (
    <span ref={ref} className={className}>
      <span>{display}</span>
    </span>
  );
}
