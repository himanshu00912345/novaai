'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Bot, Menu, X } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Overview', href: '/#top' },
  { label: 'Features', href: '/#features' },
  { label: 'Console', href: '/#dashboard' },
  { label: 'Workflow', href: '/#workflow' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Case study', href: '/case-study' },
];

export function Navbar() {
  const { isScrolled } = useScrollPosition();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [trialOpen, setTrialOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    if (pathname !== '/' || !href.startsWith('/#')) return;
    const target = document.getElementById(href.slice(2));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', href.slice(1));
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 border-b transition-all duration-300',
          isScrolled
            ? 'border-white/[0.08] bg-slate-950/85 py-3 shadow-lg shadow-black/10 backdrop-blur-xl'
            : 'border-transparent bg-slate-950/15 py-4 backdrop-blur-sm'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
          <Link
            href="/#top"
            aria-label="NovaAI home"
            onClick={(event) => handleNavClick(event, '/#top')}
            className="group inline-flex shrink-0 items-center gap-2.5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-200/20 bg-gradient-to-br from-cyan-300/15 to-violet-300/10 text-cyan-100 transition group-hover:border-cyan-200/40 shadow-glow-cyan">
              <Bot className="h-[18px] w-[18px]" />
            </span>
            <span className="text-[17px] font-semibold tracking-[-0.04em] text-white">
              Nova<span className="text-cyan-200">AI</span>
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-0.5 rounded-full border border-white/[0.07] bg-slate-950/35 p-1 xl:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                className="rounded-full px-3 py-2 text-xs text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center xl:flex">
            <Button
              size="sm"
              onClick={() => setTrialOpen(true)}
              rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
            >
              Start Free Trial
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:border-white/20 hover:bg-white/[0.05] focus-visible:ring-2 focus-visible:ring-cyan-200 xl:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div
          id="mobile-navigation"
          hidden={!mobileMenuOpen}
          className="border-t border-white/[0.08] bg-slate-950/95 px-5 pb-5 pt-3 shadow-2xl backdrop-blur-xl xl:hidden sm:px-8"
        >
          <nav aria-label="Mobile navigation" className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                className="rounded-lg px-3 py-3 text-sm text-slate-300 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                setTrialOpen(true);
              }}
              className="mt-2 w-full"
            >
              Start Free Trial
            </Button>
          </nav>
        </div>
      </header>

      <Modal
        isOpen={trialOpen}
        onClose={() => setTrialOpen(false)}
        title="Preview the signup flow"
      />
    </>
  );
}
