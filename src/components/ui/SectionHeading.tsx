import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './Badge';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: 'cyan' | 'violet' | 'emerald' | 'amber';
  title: string;
  highlight?: string;
  description?: string;
  align?: 'center' | 'left';
  className?: string;
}

export function SectionHeading({
  badge,
  badgeVariant = 'cyan',
  title,
  highlight,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'max-w-3xl mb-10 md:mb-12',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      <div>
        {badge && (
          <div className="mb-4">
            <Badge variant={badgeVariant}>{badge}</Badge>
          </div>
        )}
        <h2 className="text-[1.8rem] font-semibold leading-[1.1] tracking-[-0.045em] text-white sm:text-[2.3rem] lg:text-[2.65rem]">
          {title}{' '}
          {highlight && (
            <span className="bg-gradient-to-r from-cyan-200 via-sky-300 to-violet-300 bg-clip-text text-transparent">
              {highlight}
            </span>
          )}
        </h2>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
