# NovaAI — AI workspace front-end concept

NovaAI is a responsive portfolio concept for an AI workspace. It demonstrates a marketing site, product dashboard previews, a procedural Three.js hero, local UI interactions, and an accessible dark visual system.

This repository does **not** include an AI backend. The dashboard examples, workflow, telemetry-like values, plan details, and signup form are local front-end demos. No customer names, testimonials, performance claims, or compliance certifications are presented as real.

## Requirements

- Node.js 18.17 or newer
- npm 9 or newer

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The hero loads its Three.js scene client-side. While it loads, or if WebGL rendering fails, the page displays a static CSS illustration.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```

There is no automated test suite configured yet. The commands above run ESLint, TypeScript, and a production build. For a quick manual check, use the navigation on desktop and mobile, switch dashboard tabs and sample ranges, try copying/replaying a sample, change the example billing period, expand the FAQ, and submit the local signup demo. The form does not send or store entered details.

## Production

```bash
npm run build
npm run start
```

The production server runs at [http://localhost:3000](http://localhost:3000).

## Project structure

- `src/app/` — App Router pages, metadata, and global styles
- `src/components/layout/` — responsive navigation and footer
- `src/components/sections/` — landing page sections and product previews
- `src/components/three/` — client-only Three.js scene and static fallback
- `src/components/ui/` — reusable buttons, cards, modal, and reveal motion
- `src/hooks/` — scroll state and reduced-motion preference
- `src/lib/` — reusable content data and class utilities
- `public/icons/icon.svg` — source favicon

The root metadata in `src/app/layout.tsx` points to `/icons/icon.svg`. Replace that SVG to change the site icon. The app uses system font stacks so a network connection is not needed to build.

## Stack

Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Framer Motion, Three.js, React Three Fiber, Drei, Lucide, `clsx`, and `tailwind-merge`.
