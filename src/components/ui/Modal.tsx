'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, MousePointer2, X } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  defaultPlan?: string;
}

export function Modal({ isOpen, onClose, title = 'Preview the signup flow', defaultPlan = 'Pro' }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [teamSize, setTeamSize] = useState('1-10');
  const [isLoading, setIsLoading] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    const frame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), a[href]'));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
      setIsSubmitted(false);
      setIsLoading(false);
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    window.setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 350);
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div aria-hidden="true" className="absolute inset-0 bg-slate-950/80 backdrop-blur-lg" />
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="modal-title" className="relative z-10 my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0a1020] p-6 shadow-2xl shadow-black/50 sm:p-8">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/[0.08] blur-3xl" />
        <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close dialog" className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/[0.06] hover:text-white"><X className="h-4 w-4" /></button>

        {isSubmitted ? (
          <div className="relative py-5 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200"><CheckCircle2 className="h-7 w-7" /></span>
            <h2 id="modal-title" className="mt-5 text-xl font-medium text-white">Local demo complete</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">Thanks, {name || 'there'}. This interaction stayed in your browser. No account was created, and your details were not sent or saved.</p>
            <div className="mt-5 rounded-xl border border-white/[0.08] bg-slate-950/50 p-4 text-left text-xs leading-6 text-slate-400">
              <p><span className="text-cyan-200">Example plan:</span> {defaultPlan}</p>
              <p><span className="text-violet-200">Team size:</span> {teamSize}</p>
              <p className="break-all"><span className="text-slate-300">Entered email:</span> {email}</p>
            </div>
            <Button type="button" variant="secondary" onClick={onClose} className="mt-6 w-full">Close preview</Button>
          </div>
        ) : (
          <div className="relative">
            <div className="mb-2 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-200"><MousePointer2 className="h-3.5 w-3.5" /> Local interaction demo</div>
            <h2 id="modal-title" className="pr-8 text-2xl font-medium tracking-tight text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">Fill this in to preview the confirmation state. Nothing is submitted to a server or stored.</p>
            <div className="mt-5 rounded-lg border border-amber-300/15 bg-amber-300/[0.04] px-3.5 py-3 text-xs leading-5 text-amber-100/80">Demo only · no trial, workspace, or account will be created.</div>
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label htmlFor="signup-name" className="mb-1.5 block text-xs font-medium text-slate-300">Name</label>
                <input id="signup-name" name="name" type="text" autoComplete="name" required maxLength={80} value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className="w-full rounded-lg border border-white/[0.10] bg-slate-950/65 px-3.5 py-3 text-sm text-white placeholder:text-slate-600 focus:border-cyan-200/50 focus:outline-none focus:ring-1 focus:ring-cyan-200/40" />
              </div>
              <div>
                <label htmlFor="signup-email" className="mb-1.5 block text-xs font-medium text-slate-300">Email address <span className="text-slate-500">(demo only)</span></label>
                <input id="signup-email" name="email" type="email" autoComplete="email" required maxLength={160} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="w-full rounded-lg border border-white/[0.10] bg-slate-950/65 px-3.5 py-3 text-sm text-white placeholder:text-slate-600 focus:border-cyan-200/50 focus:outline-none focus:ring-1 focus:ring-cyan-200/40" />
              </div>
              <div>
                <label htmlFor="signup-team-size" className="mb-1.5 block text-xs font-medium text-slate-300">Team size <span className="text-slate-500">(example)</span></label>
                <select id="signup-team-size" name="teamSize" value={teamSize} onChange={(event) => setTeamSize(event.target.value)} className="w-full rounded-lg border border-white/[0.10] bg-slate-950/65 px-3.5 py-3 text-sm text-white focus:border-cyan-200/50 focus:outline-none focus:ring-1 focus:ring-cyan-200/40">
                  <option value="1">Just me</option>
                  <option value="1-10">2–10 people</option>
                  <option value="11-50">11–50 people</option>
                  <option value="50+">More than 50</option>
                </select>
              </div>
              <Button type="submit" isLoading={isLoading} className="mt-1 w-full">{isLoading ? 'Showing preview…' : 'Show local confirmation'}</Button>
            </form>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
