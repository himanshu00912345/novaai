# AGENTS.md — Development Guidelines for NovaAI

This document outlines architectural patterns, code styling rules, and conventions for AI agents and human engineers contributing to the NovaAI codebase.

---

## 1. Core Principles

1. **Strict Dark Mode First**: NovaAI uses a curated midnight navy palette (`#030712`, `#070b19`, `#0f172a`) with electric cyan (`#00f0ff`) and violet (`#a855f7`). Never introduce default light backgrounds or unstyled white surfaces.
2. **Graceful 3D Degradation**: All React Three Fiber (`@react-three/fiber`) components must be rendered client-side only via dynamic imports (`ssr: false`) and wrapped in `<WebGLErrorBoundary>` with `<SceneFallback>` loaders.
3. **Mobile & Touch Protection**:
   - Always apply `touch-action: pan-y` on Three.js canvas containers to prevent vertical scroll interception.
   - Restrict OrbitControls zoom (`enableZoom={false}`) and clamp polar/azimuth angles.
   - Clamp DPR to `[1, 1.5]` to avoid device thermal throttling.
4. **No Dead Links / Empty Handlers**: Every CTA button or link must lead to an actual section anchor, an interactive modal dialog, or a valid route.
5. **Reduced-Motion Respect**: Check the `useReducedMotion` hook before initiating looping animations or spring physics in 3D or GSAP/Framer Motion.

---

## 2. Component Hierarchy & Conventions

- Components in `src/components/ui/` should remain pure, stateless where possible, and highly reusable.
- Components in `src/components/sections/` assemble UI components and represent specific sections of the landing page.
- Components in `src/components/three/` encapsulate all WebGL, Drei, and Three.js logic.
- Use the `cn()` utility (`clsx` + `tailwind-merge`) for conditional and override class names.

---

## 3. Testing & Verification Commands

```bash
# Type check & Next.js production build
npm run build

# Start production server
npm run start
```
