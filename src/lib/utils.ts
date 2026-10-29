import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Feature, PricingPlan, WorkflowStep, FAQItem, Testimonial } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const FEATURES: Feature[] = [
  {
    id: 'ai-content',
    title: 'Content Studio Preview',
    description:
      'Explore a focused interface for drafting, refining, and organizing sample content. This front-end preview does not call an AI model.',
    iconName: 'Sparkles',
    badge: 'Studio preview',
    metrics: 'Local demo',
    color: 'cyan',
  },
  {
    id: 'workflow-automation',
    title: 'Workflow Planning',
    description:
      'Map an example process into visible stages with room for context, handoffs, and review. No jobs or integrations run from this concept.',
    iconName: 'Workflow',
    badge: 'Process preview',
    metrics: 'Static concept',
    color: 'violet',
  },
  {
    id: 'advanced-analytics',
    title: 'Activity View',
    description:
      'See how sample activity could be arranged in a calm dashboard. The charts use fixed illustrative values, not live service data.',
    iconName: 'BarChart3',
    badge: 'Sample data',
    metrics: 'Illustrative',
    color: 'blue',
  },
  {
    id: 'secure-collaboration',
    title: 'Collaboration Concepts',
    description:
      'Preview how shared context, ownership, and review might fit together. This concept does not implement or certify security controls.',
    iconName: 'ShieldCheck',
    badge: 'Design direction',
    metrics: 'Not implemented',
    color: 'indigo',
  },
  {
    id: 'ai-productivity',
    title: 'Workspace Preview',
    description:
      'Bring prompts, process notes, and review cues into one considered workspace layout designed for focused team work.',
    iconName: 'Zap',
    badge: 'Interface idea',
    metrics: 'Front-end only',
    color: 'cyan',
  },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: '01',
    title: 'Choose a Starting Point',
    description:
      'Decide what context a future workflow would need and where its first step begins. This preview does not connect to external tools.',
    iconName: 'Database',
    detail: 'Example inputs only · no integrations are connected.',
  },
  {
    step: '02',
    title: 'Shape the Process',
    description:
      'Arrange example stages into an understandable sequence, with room for decisions and human review.',
    iconName: 'Cpu',
    detail: 'Static workflow diagram · no tasks are executed.',
  },
  {
    step: '03',
    title: 'Review the Outcome',
    description:
      'Make an example result visible, check it with a person, and choose a next step.',
    iconName: 'Globe',
    detail: 'Concept step · no deployment action is performed.',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'A sample plan layout for an individual workspace.',
    priceMonthly: 29,
    priceAnnual: 24,
    features: [
      'One personal workspace concept',
      'Prompt studio preview',
      'Sample workflow canvas',
      'Illustrative activity view',
    ],
    ctaLabel: 'Preview this plan',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'A shared workspace direction for a small product team.',
    priceMonthly: 79,
    priceAnnual: 64,
    popular: true,
    features: [
      'Shared team workspace concept',
      'Multiple workflow examples',
      'Expanded sample activity view',
      'Review and handoff patterns',
    ],
    ctaLabel: 'Preview this plan',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'A flexible layout concept for more complex review paths.',
    priceMonthly: 249,
    priceAnnual: 199,
    features: [
      'Multiple workspace views',
      'Role and review concepts',
      'Configurable workflow examples',
      'Organization overview concept',
    ],
    ctaLabel: 'Preview this plan',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote:
      'NovaAI helped our design and engineering team visualize complex multi-step pipelines in minutes. The 3D interactions and interface hierarchy make scanning workflows effortless.',
    author: 'Elena Rostova',
    role: 'VP of Engineering',
    company: 'Aether Dynamics (Fictional Sample)',
    avatar: 'ER',
    tags: ['Workflows', 'Productivity'],
  },
  {
    id: 'test-2',
    quote:
      'The dark-mode aesthetics and responsive console previews set a high bar for modern SaaS design. It brings clarity to otherwise chaotic multi-agent processes.',
    author: 'Marcus Vance',
    role: 'Principal System Architect',
    company: 'QuantumPulse Labs (Fictional Sample)',
    avatar: 'MV',
    tags: ['Architecture', 'Observability'],
  },
  {
    id: 'test-3',
    quote:
      'The interactive studio and responsive edge layout showcase true creative engineering. It proves that dark futuristic interfaces can remain exceptionally readable and accessible.',
    author: 'Aria Chen',
    role: 'Head of Product Design',
    company: 'NexaCore Systems (Fictional Sample)',
    avatar: 'AC',
    tags: ['Design System', 'UI/UX'],
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'platform',
    question: 'Is this a working AI product?',
    answer:
      'This site is a front-end portfolio concept. The content studio uses fixed examples and is not connected to an AI model or backend service.',
  },
  {
    id: 'faq-2',
    category: 'security',
    question: 'Does the demo connect to external services or store data?',
    answer:
      'No. The interface previews run locally in your browser. The signup form does not send or save the details you enter.',
  },
  {
    id: 'faq-3',
    category: 'integration',
    question: 'Are the dashboard numbers live?',
    answer:
      'No. The dashboard uses fixed illustrative values and a sample chart so you can explore the layout. It does not report measured performance or service activity.',
  },
  {
    id: 'faq-4',
    category: 'platform',
    question: 'Are the plans and prices real?',
    answer:
      'No. Plan names, prices, and included items are fictional portfolio examples. You cannot start a subscription or make a purchase here.',
  },
  {
    id: 'faq-5',
    category: 'billing',
    question: 'What does the billing switch do?',
    answer:
      'It only toggles between two sample price values in this interface. It does not change billing or create a subscription.',
  },
];
