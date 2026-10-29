'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { Reveal } from '@/components/ui/Reveal';
import { FEATURES } from '@/lib/utils';

export function Features() {
  const topFeatures = FEATURES.slice(0, 2);
  const bottomFeatures = FEATURES.slice(2, 5);

  return (
    <section id="features" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-10 right-0 w-96 h-96 bg-violet-600/10 blur-[130px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Platform Architecture"
          badgeVariant="cyan"
          title="Engineered for"
          highlight="Maximum Velocity"
          description="Explore a set of interface ideas for content creation, workflow planning, and activity review. Each panel is a front-end preview with no live AI service behind it."
        />

        {/* Bento Grid Layout */}
        <div className="space-y-4 sm:space-y-5">
          {/* Top Row: 2 Large Feature Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topFeatures.map((feat, index) => (
              <Reveal key={feat.id} delay={index * 0.08}>
                <FeatureCard
                  title={feat.title}
                  description={feat.description}
                  iconName={feat.iconName}
                  badge={feat.badge}
                  metrics={feat.metrics}
                  color={feat.color}
                  className="min-h-[260px]"
                />
              </Reveal>
            ))}
          </div>

          {/* Bottom Row: 3 High-Performance Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bottomFeatures.map((feat, index) => (
              <Reveal key={feat.id} delay={index * 0.06}>
                <FeatureCard
                  title={feat.title}
                  description={feat.description}
                  iconName={feat.iconName}
                  badge={feat.badge}
                  metrics={feat.metrics}
                  color={feat.color}
                  className="min-h-[250px]"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
