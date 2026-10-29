import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Trust } from '@/components/sections/Trust';
import { Features } from '@/components/sections/Features';
import { Dashboard } from '@/components/sections/Dashboard';
import { Workflow } from '@/components/sections/Workflow';
import { Pricing } from '@/components/sections/Pricing';
import { Testimonials } from '@/components/sections/Testimonials';
import { Principles } from '@/components/sections/Principles';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-slate-950 text-slate-100 selection:bg-cyan-400/25 selection:text-cyan-100">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <Hero />
        <Trust />
        <Features />
        <Dashboard />
        <Workflow />
        <Pricing />
        <Testimonials />
        <Principles />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
