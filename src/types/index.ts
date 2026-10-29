export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  metrics?: string;
  color: 'cyan' | 'violet' | 'blue' | 'indigo';
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceAnnual: number;
  popular?: boolean;
  features: string[];
  ctaLabel: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  description: string;
  iconName: string;
  detail: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  tags?: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'platform' | 'security' | 'billing' | 'integration';
}

export interface NavLink {
  label: string;
  href: string;
  badge?: string;
}
