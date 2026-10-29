import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  ArrowLeft,
  Layers,
  Cpu,
  Zap,
  ShieldCheck,
  Smartphone,
  Eye,
  CheckCircle2,
  Code2,
} from 'lucide-react';

export const metadata = {
  title: 'Engineering Case Study',
  description: 'Project decisions behind the NovaAI front-end concept: Next.js App Router, reusable components, local interactions, and a procedural Three.js hero.',
};

export default function CaseStudyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1 pt-32 pb-24 outline-none">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back Link */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to NovaAI Landing Page</span>
            </Link>
          </div>

          {/* Header Title */}
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <Badge variant="cyan" dot>
                Technical Deep Dive
              </Badge>
              <span className="text-xs text-slate-400 font-mono">Portfolio Case Study</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-6">
              Engineering NovaAI: Next.js, Three.js & Futuristic Design Systems
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
              A practical walkthrough of this responsive front-end concept, its reusable UI system, local demo interactions, and optional WebGL hero.
            </p>
          </div>

          {/* Quick Architecture Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
            <div className="p-5 rounded-xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
              <div className="text-xs text-slate-400 mb-1">Architecture</div>
              <div className="text-lg font-bold text-white font-mono">Next.js App Router</div>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
              <div className="text-xs text-slate-400 mb-1">3D Graphics</div>
              <div className="text-lg font-bold text-cyan-400 font-mono">Three.js + R3F</div>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
              <div className="text-xs text-slate-400 mb-1">Styling Engine</div>
              <div className="text-lg font-bold text-violet-400 font-mono">Tailwind CSS</div>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
              <div className="text-xs text-slate-400 mb-1">Animation Layer</div>
              <div className="text-lg font-bold text-sky-400 font-mono">Framer Motion</div>
            </div>
          </div>

          {/* Section 1: 3D Performance & Mobile Solutions */}
          <article className="space-y-12 text-slate-300 leading-relaxed text-base">
            <section className="p-8 rounded-2xl border border-white/10 bg-slate-900/40 space-y-4">
              <div className="flex items-center gap-3 text-cyan-400">
                <Cpu className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-white">1. 3D Model Pipeline & Mobile Optimization</h2>
              </div>
              <p>
                The 3D hero is isolated from the server-rendered page so the rest of the interface can load independently. The scene uses a procedural model and has a static CSS fallback:
              </p>
              <ul className="space-y-3 pt-2 text-sm">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Client-only scene:</strong> The 3D canvas is loaded through Next.js dynamic import (<code className="text-cyan-300 font-mono text-xs">ssr: false</code>), with a CSS illustration shown while it loads.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Procedural Cybernetic Robot Geometry:</strong> To prevent empty states or 404 GLB download stalls, the robot utilizes procedural Three.js geometries with PBR materials, glowing emissive visors, and orbital floating nodes.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>DPR Clamping & Mobile Scroll Pan:</strong> Pixel ratio is clamped between 1.0 and 1.5, canvas zoom is disabled, and CSS <code className="text-cyan-300 font-mono text-xs">touch-action: pan-y</code> ensures vertical mobile swiping smoothly scrolls the page without trapping the pointer.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Render fallback:</strong> A React Error Boundary displays a static CSS illustration if the scene throws during rendering (<code className="text-cyan-300 font-mono text-xs">&lt;SceneFallback /&gt;</code>).
                  </span>
                </li>
              </ul>
            </section>

            {/* Section 2: Design Tokens & Glassmorphism */}
            <section className="p-8 rounded-2xl border border-white/10 bg-slate-900/40 space-y-4">
              <div className="flex items-center gap-3 text-violet-400">
                <Layers className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-white">2. Futuristic Dark Mode Design System</h2>
              </div>
              <p>
                The visual aesthetic eschews generic dark gray palettes in favor of deep midnight navies (<code className="text-violet-300 font-mono text-xs">#030712</code>, <code className="text-violet-300 font-mono text-xs">#070b19</code>) punctuated by high-contrast electric cyan (<code className="text-cyan-300 font-mono text-xs">#00f0ff</code>) and violet (<code className="text-violet-300 font-mono text-xs">#a855f7</code>) light sources.
              </p>
              <p className="text-sm">
                Cards use restrained hover lighting (<code className="text-slate-200 font-mono text-xs">onMouseMove</code>) paired with translucent borders, consistent spacing, and a simple typographic hierarchy.
              </p>
            </section>

            {/* Section 3: Accessibility & Reduced Motion */}
            <section className="p-8 rounded-2xl border border-white/10 bg-slate-900/40 space-y-4">
              <div className="flex items-center gap-3 text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-white">3. Accessibility, motion, and clear demo states</h2>
              </div>
              <p>
                Modern SaaS portfolio sites often sacrifice usability for visual flair. NovaAI balances high aesthetics with rigorous engineering standards:
              </p>
              <ul className="space-y-3 pt-2 text-sm">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Reduced Motion Respect:</strong> Custom hook <code className="text-emerald-300 font-mono text-xs">useReducedMotion</code> listens for OS-level preferences and disables 3D levitation, orbital spins, and continuous pulses.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Navigation and demos:</strong> Section links, the case study route, demo tabs, and the local signup preview each have a concrete destination or state change.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Transparent demo content:</strong> Sample output, illustrative telemetry, example plan values, and the local-only signup interaction are labeled as demos.
                  </span>
                </li>
              </ul>
            </section>
          </article>

          {/* Bottom Action */}
          <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
            <Link href="/">
              <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Return to Live Platform
              </Button>
            </Link>

            <span className="text-xs font-mono text-slate-400">
              NovaAI • Front-end portfolio concept
            </span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
