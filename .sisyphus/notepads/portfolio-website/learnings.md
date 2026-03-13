# Learnings — portfolio-website

## Project Architecture
- Greenfield Next.js 15 project
- Single-page layout with scroll-based navigation
- Dark-only theme (bg-neutral-950), Electric Blue (#0066FF) accent

## Critical Tech Decisions
- Tailwind v4 (NOT v3) — CSS-first config via `@theme {}` in globals.css
- NO tailwind.config.ts — deleted after scaffold
- postcss.config.mjs must use `@tailwindcss/postcss` (NOT `tailwindcss`)
- Motion package (NOT framer-motion) — import from `motion/react`
- Geist Sans = headings (font-display), Inter = body (font-sans)
- React 19 / Next.js 15 — use `useActionState` (NOT `useFormState`)

## File Structure
- src/app/page.tsx — single-page root
- src/app/layout.tsx — root layout, fonts, metadata
- src/app/globals.css — Tailwind v4 theme
- src/app/actions/contact.ts — server action ('use server')
- src/components/sections/ — Navbar, Hero, Projects, About, Contact, Footer
- src/components/ui/ — FadeIn, SectionWrapper, ProjectCard
- src/lib/schemas.ts — Zod validation (shared client+server)
- public/projects/ — project placeholder SVGs
- public/about/ — profile placeholder SVG

## Design Tokens (globals.css @theme)
- --font-sans: var(--font-inter)
- --font-display: var(--font-geist)
- --color-accent: #0066FF
- --color-accent-hover: #0052CC
- --color-accent-light: #0066FF1A

## Section IDs for Scroll Anchoring
- hero, projects, about, contact

## [2026-03-13] Task 1: Scaffold Complete
- Tailwind v4 migration: deleted tailwind.config.ts, updated postcss.config.mjs
- motion package (not framer-motion): imports from motion/react  
- Geist + Inter fonts with CSS variables --font-geist and --font-inter
- @theme in globals.css defines --color-accent, --font-display, --font-sans

## [2026-03-13] Task 2: Navbar Complete
- Named export: Navbar
- Uses scrolled state for opacity change (bg-neutral-950/80 → bg-neutral-950/95 at 50px)
- Mobile menu toggled with mobileOpen state
- Hamburger: 3 span elements, no icon library
- Button elements need explicit `type="button"` (lint rule)

## [2026-03-13] Task 3: Hero Complete
- Named export: Hero
- FadeIn for staggered reveal (0, 0.2, 0.4, 1.0 delays)
- motion.p for sub-headline (animate, not whileInView - above fold)
- Scroll indicator: infinite bounce animation at bottom
- SVG decorative icons need aria-hidden="true" (lint rule)

## [2026-03-13] Task 4: Projects Bento Grid Complete
- Named exports: Projects (server), ProjectCard (client)
- Bento: col-span-2 on index 0 and 3 for wide cards
- colSpanClass applied to FadeIn wrapper (not the card itself)
- SVG placeholders in public/projects/
- next/image with fill prop for aspect-video thumbnails
- Tags use design tokens: bg-[--color-accent-light] text-[--color-accent]

## [2026-03-13] Task 5: About Section Complete
- Named export: About (server component)
- FadeIn directional: left for photo, right for bio
- Profile placeholder: public/about/profile-placeholder.svg
- Skills tags: bg-neutral-900 border border-neutral-800

## [2026-03-13] Task 7: Footer Complete
- Named export: Footer (server component)
- Dynamic year via new Date().getFullYear()
- 4 social links with inline SVG icons (GitHub, LinkedIn, Twitter/X, Email)
- Mobile: flex-col centered; Desktop: flex-row justify-between
- All external links have target="_blank" rel="noopener noreferrer"
- aria-label attributes provide screen reader accessibility
- SVG icons use aria-hidden="true" to prevent redundant announcements
- Email link uses mailto: protocol
- Social link hrefs use "#" as placeholder for user to fill in

## [2026-03-13] Task 6: Contact Form Complete
- Named export: Contact (client component)
- Shared schema: src/lib/schemas.ts exports contactSchema and ActionState
- useActionState from "react" (React 19)
- Stub action in Contact.tsx — Task 9 replaces with real server action
- Form uses action={formAction} (not onSubmit)

## [2026-03-13] Task 9: Server Action + Resend Complete
- src/app/actions/contact.ts: 'use server', sendContactEmail function
- Zod validates server-side, same schema as client
- Resend: from onboarding@resend.dev (works without domain setup)
- Catch block: returns generic error message (doesn't expose internal error)
- Contact.tsx: removed stubAction, imported sendContactEmail
- TypeScript: zero errors after changes

## [2026-03-13] Task 8: Page Assembly Complete
- page.tsx assembled all 6 sections in correct order
- scroll-margin-top: 4rem added to globals.css for fixed navbar offset
- Semantic HTML: main wraps Hero-Contact, footer is separate

## [2026-03-13] Task 10: SEO Metadata + Favicon Complete
- Expanded metadata in layout.tsx: keywords, authors, OG, Twitter, robots
- src/app/icon.svg: 32x32 rounded blue square with DL initials
- src/app/opengraph-image.tsx: dynamic OG image via ImageResponse (edge runtime)
- Next.js auto-discovers icon.svg and opengraph-image.tsx — no config needed
- TypeScript compilation: ✓ Zero errors

## [2026-03-13] Final Code Quality Review (F2)
- Treat Next.js build warnings as release blockers when they come from app metadata; missing  surfaces during 
> dusan-luketic-portfolio@0.1.0 build
> next build

   ? Next.js 15.5.12

   Creating an optimized production build ...
 ? Compiled successfully in 2.3s
   Linting and checking validity of types ...
   Collecting page data ....
- Portfolio footer links should be considered incomplete until all social/mail targets use real destinations instead of placeholders.

- Correction: final review confirms missing metadataBase in src/app/layout.tsx is a release blocker because npm run build warns and falls back to localhost metadata URLs.
- Correction: treat placeholder footer contact links as incomplete implementation until real external URLs and email values are supplied.

## [2026-03-13] Final Manual QA (F3)
- Desktop navigation passes anchor scrolling checks for #projects, #about, and #contact after a clean dev-server restart.
- Mobile menu opens and closes correctly on link click, but layout still overflows horizontally at 375px.
- Screenshot evidence captured under .sisyphus/evidence/final-qa/ for page load, desktop nav, mobile nav/full, and contact form states.
