# Dusan Luketic — Portfolio Website

## TL;DR

> **Quick Summary**: Build a minimalist, high-end dark portfolio site for Dusan Luketic (Senior Frontend Developer) using Next.js 15, Tailwind CSS v4, and Framer Motion. Single-page layout with 4 sections, scroll-triggered animations, bento-grid projects, and a Resend-powered contact form.
> 
> **Deliverables**:
> - Fully responsive single-page portfolio at `localhost:3000`
> - 6 sections: Navbar, Hero, Projects (bento grid), About, Contact, Footer
> - Scroll-triggered fade-in animations via Framer Motion
> - Contact form with server-side validation + email delivery via Resend
> - Vercel-ready deployment configuration
> - SEO metadata + Open Graph tags
> 
> **Estimated Effort**: Medium
> **Parallel Execution**: YES — 4 waves (1 foundation → 6 parallel sections → 3 parallel integrations → 4 parallel verifications)
> **Critical Path**: Task 1 → Tasks 2-7 (parallel) → Tasks 8-10 (parallel) → F1-F4 (parallel)

---

## Context

### Original Request
Build a personal portfolio website focusing on minimalism and high-end aesthetics. Dark mode using bg-neutral-950, Electric Blue (#0066FF) accent, modern sans-serif typography, bento-box project grid, scroll-triggered fade-in animations. Sections: Hero, Projects, About, Contact. Tech: React/Next.js + Tailwind CSS.

### Interview Summary
**Key Discussions**:
- **Project content**: Placeholder projects — user will swap real content later
- **Navigation**: Sticky navbar with section links + minimal footer with socials/copyright
- **Contact form**: Email delivery via Resend using Next.js Server Actions
- **Deployment**: Vercel (native Next.js hosting, zero-config)
- **Tests**: No unit tests — Agent-Executed QA via Playwright for all visual verification
- **Dark mode**: Permanent dark theme (no toggle) — the entire site is dark-only

**Research Findings**:
- **Tailwind v4**: CSS-first config via `@theme {}` directive in `globals.css` — no `tailwind.config.ts` file
- **CRITICAL**: `create-next-app` scaffolds Tailwind v3 — explicit migration to v4 required (install `tailwindcss@latest` + `@tailwindcss/postcss`, delete `tailwind.config.ts`, update `postcss.config.mjs`)
- **Framer Motion**: Package renamed to `motion` — import from `motion/react`, NOT `framer-motion`
- **Fonts**: `next/font/google` supports Geist + Inter with CSS variable approach (`--font-geist`, `--font-inter`)
- **Forms**: `useActionState` hook in React 19 / Next.js 15 for server action form handling
- **PostCSS gotcha**: `create-next-app` generates `postcss.config.mjs` with v3 plugin — must update to `@tailwindcss/postcss` or the build breaks

### Metis Review
**Identified Gaps** (addressed):
- **Recipient email**: Plan uses `CONTACT_EMAIL` environment variable — user configures in `.env.local`
- **Hero animation type**: Defaulted to staggered fade-in sequence (matches "subtle" requirement)
- **Font roles**: Geist Sans for headings/display, Inter for body text
- **Tailwind v3→v4 migration**: Added explicit migration step in scaffold task to prevent build failures
- **PostCSS conflict**: Plan includes deletion/update of `postcss.config.mjs` after scaffold
- **WCAG contrast**: Electric Blue (#0066FF) on bg-neutral-950 has 4.64:1 ratio — passes AA for normal text, plan notes to use on large text or UI elements only, with white text for body
- **Bento grid**: CSS Grid only — no JS masonry library (scope lock)
- **Mobile nav**: Hamburger menu required for responsive nav (addressed in Nav task)

---

## Work Objectives

### Core Objective
Deliver a production-ready, Vercel-deployable portfolio website with a dark minimalist aesthetic, scroll-triggered animations, and a working contact form — using placeholder content that the user can easily swap for real projects.

### Concrete Deliverables
- `app/page.tsx` — Single-page layout composing all sections
- `app/layout.tsx` — Root layout with fonts, metadata, dark background
- `app/globals.css` — Tailwind v4 theme (colors, fonts, animations)
- `components/sections/` — Navbar, Hero, Projects, About, Contact, Footer
- `components/ui/` — FadeIn, Reveal, Button, SectionWrapper
- `app/actions/contact.ts` — Server action for contact form + Resend
- `public/` — Placeholder images for projects and about photo
- `.env.local.example` — Template for Resend API key and contact email

### Definition of Done
- [ ] `npm run build` completes with zero errors
- [ ] `npm run dev` serves site at localhost:3000
- [ ] All 6 sections render correctly on desktop (1440px) and mobile (375px)
- [ ] Scroll animations trigger on viewport entry
- [ ] Contact form validates inputs and shows success/error states
- [ ] Vercel deployment succeeds from `main` branch

### Must Have
- Dark-only theme: `bg-neutral-950` background everywhere
- Electric Blue (#0066FF) as sole accent color
- Geist Sans for headings, Inter for body text
- Bento-box grid with uneven cells for projects
- Hover lift effect on project cards (`translateY(-8px)` + shadow)
- Smooth scrolling between sections (`scroll-behavior: smooth`)
- Scroll-triggered fade-in on every section
- Mobile-responsive layout (mobile-first)
- Contact form with Name, Email, Message + Zod validation
- Sticky navbar with section anchor links
- Semantic HTML landmarks (`<header>`, `<main>`, `<section>`, `<footer>`)

### Must NOT Have (Guardrails)
- No light mode / theme toggle — dark only
- No parallax, typing effect, or particle animations — only subtle fade-in/slide-up
- No JS masonry library — bento grid uses pure CSS Grid
- No page transitions or route animations — single-page scroll only
- No auto-reply email, spam filtering, or rate limiting on contact form
- No CMS integration, blog, authentication, or analytics
- No tooltips, modals, carousels, toasts, or UI components beyond spec
- No `framer-motion` package — use `motion` package with `motion/react` imports
- No `tailwind.config.ts` file — Tailwind v4 uses CSS-first `@theme` config only
- No excessive JSDoc comments or over-abstracted utility layers
- No `as any`, `@ts-ignore`, or `console.log` in committed code

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO (greenfield)
- **Automated tests**: NO (visual portfolio — unit tests not proportional)
- **Framework**: None
- **Agent-Executed QA**: YES — Playwright for every UI task, curl for server action

### QA Policy
Every task includes agent-executed QA scenarios. Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **UI Sections**: Playwright — navigate, scroll, assert DOM elements, capture screenshots
- **Animations**: Playwright — scroll to trigger, verify opacity/transform transitions
- **Contact Form**: Playwright (UI) + curl (server action endpoint)
- **Responsive**: Playwright viewport resize — test at 375px (mobile) and 1440px (desktop)
- **Build**: `npm run build` — zero errors, zero warnings

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — sequential, everything depends on this):
└── Task 1: Scaffold Next.js 15 + Tailwind v4 migration + fonts + design tokens + animation components [quick]

Wave 2 (All sections — 6 parallel tasks, depend only on Task 1):
├── Task 2: Sticky navigation bar + mobile hamburger [visual-engineering]
├── Task 3: Hero section [visual-engineering]
├── Task 4: Projects bento grid [visual-engineering]
├── Task 5: About section [visual-engineering]
├── Task 6: Contact form UI + client validation [visual-engineering]
└── Task 7: Footer [quick]

Wave 3 (Integration — 3 parallel tasks, depend on Wave 2):
├── Task 8: Page assembly + smooth scroll behavior (depends: 2-7) [visual-engineering]
├── Task 9: Contact server action + Resend integration (depends: 6) [quick]
└── Task 10: SEO metadata + Open Graph + favicon (depends: 8) [quick]

Wave FINAL (After ALL tasks — 4 parallel verification agents):
├── F1: Plan compliance audit (oracle)
├── F2: Code quality review (unspecified-high)
├── F3: Real manual QA — Playwright (unspecified-high + playwright skill)
└── F4: Scope fidelity check (deep)

Critical Path: Task 1 → Task 6 → Task 9 (for contact form) OR Task 1 → Tasks 2-7 → Task 8 → Task 10 (for full assembly)
Parallel Speedup: ~65% faster than sequential
Max Concurrent: 6 (Wave 2)
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|-----------|--------|------|
| 1 | — | 2, 3, 4, 5, 6, 7 | 1 |
| 2 | 1 | 8 | 2 |
| 3 | 1 | 8 | 2 |
| 4 | 1 | 8 | 2 |
| 5 | 1 | 8 | 2 |
| 6 | 1 | 8, 9 | 2 |
| 7 | 1 | 8 | 2 |
| 8 | 2, 3, 4, 5, 6, 7 | 10 | 3 |
| 9 | 6 | 10 | 3 |
| 10 | 8, 9 | F1-F4 | 3 |
| F1-F4 | 10 | — | FINAL |

### Agent Dispatch Summary

- **Wave 1**: **1 task** — T1 → `quick`
- **Wave 2**: **6 tasks** — T2-T6 → `visual-engineering`, T7 → `quick`
- **Wave 3**: **3 tasks** — T8 → `visual-engineering`, T9 → `quick`, T10 → `quick`
- **FINAL**: **4 tasks** — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high` + `playwright`, F4 → `deep`

---

## TODOs

- [x] 1. Project Scaffold + Design Foundation

  **What to do**:
  - Run `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"` (use `.` to scaffold in current directory since `.sisyphus/` already exists)
  - **Tailwind v4 migration** (CRITICAL — create-next-app scaffolds v3):
    - `npm install tailwindcss@latest @tailwindcss/postcss`
    - Delete `tailwind.config.ts` entirely
    - Update `postcss.config.mjs` to use `@tailwindcss/postcss` plugin instead of the v3 `tailwindcss` plugin:
      ```js
      export default { plugins: { "@tailwindcss/postcss": {} } }
      ```
    - Replace contents of `src/app/globals.css` with Tailwind v4 CSS-first config (see below)
  - Install additional dependencies: `npm install motion resend zod`
  - **Font setup** in `src/app/layout.tsx`:
    - Import `Geist` and `Inter` from `next/font/google`
    - Configure with `subsets: ['latin']`, `variable: '--font-geist'` / `'--font-inter'`, `display: 'swap'`
    - Apply both CSS variables to `<html>` className
    - Set `<html lang="en">` and `<body className="bg-neutral-950 text-neutral-100 font-sans antialiased">`
  - **Global styles** in `src/app/globals.css`:
    ```css
    @import "tailwindcss";
    
    @theme {
      --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
      --font-display: var(--font-geist), ui-sans-serif, system-ui, sans-serif;
      --color-accent: #0066FF;
      --color-accent-hover: #0052CC;
      --color-accent-light: #0066FF1A;
    }
    ```
    Include `html { scroll-behavior: smooth; }` after the Tailwind import
  - **Animation components** in `src/components/ui/`:
    - `FadeIn.tsx` — Client component using `motion/react`. Props: `children`, `direction` (up|down|left|right, default: up), `delay` (number, default: 0), `duration` (number, default: 0.5). Uses `whileInView` with `viewport: { once: true, margin: "-100px" }`. Moves 40px in the specified direction, fades from 0 to 1 opacity.
    - `SectionWrapper.tsx` — Wrapper component for consistent section spacing. Props: `children`, `id` (string for scroll anchoring), `className` (optional). Renders `<section id={id} className="py-20 md:py-32 px-4 md:px-6 lg:px-8 {className}">` with a `max-w-7xl mx-auto` inner container.
  - **Cleanup**: Delete all default Next.js boilerplate from `src/app/page.tsx` — replace with a minimal `<main>` containing a temporary "Coming soon" heading so the build passes
  - Delete `src/app/favicon.ico` if it's the default Next.js favicon (will be replaced in Task 10)
  - Create `.env.local.example` with:
    ```
    RESEND_API_KEY=re_your_api_key_here
    CONTACT_EMAIL=your@email.com
    ```
  - Verify `npm run build` passes after all changes

  **Must NOT do**:
  - Do NOT install `framer-motion` — use the `motion` package
  - Do NOT keep `tailwind.config.ts` — Tailwind v4 uses CSS-first config only
  - Do NOT add a theme toggle or light mode styles
  - Do NOT add any section content beyond the temporary placeholder

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: This is scaffolding and configuration — no complex logic or visual design, just running commands and editing config files
  - **Skills**: []
    - No specialized skills needed — this is standard Next.js project setup
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Not needed — no visual design work in this task, only config
    - `playwright`: Not needed — QA uses build check only

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 1 (solo — foundation)
  - **Blocks**: Tasks 2, 3, 4, 5, 6, 7
  - **Blocked By**: None (first task)

  **References**:

  **Pattern References**:
  - This is a greenfield project — no existing code to reference

  **External References**:
  - Next.js `create-next-app` CLI: https://nextjs.org/docs/app/api-reference/cli/create-next-app — use `--app --src-dir --typescript --tailwind --eslint` flags
  - Tailwind CSS v4 installation: https://tailwindcss.com/docs/installation/framework-guides/nextjs — follow the Next.js-specific guide for v4 setup with `@tailwindcss/postcss`
  - `next/font` Geist: https://nextjs.org/docs/app/building-your-application/optimizing/fonts — CSS variable approach with `variable` prop
  - Motion (Framer Motion successor): https://motion.dev/docs/react-quick-start — install `motion`, import from `motion/react`
  - Resend Node SDK: https://resend.com/docs/sdks/node — will be used in Task 9, just install here

  **WHY Each Reference Matters**:
  - `create-next-app` docs: Ensures correct CLI flags are used — wrong flags mean different project structure
  - Tailwind v4 guide: The migration from v3→v4 is the riskiest step — wrong PostCSS config = build failure
  - `next/font` docs: CSS variable approach is required for Tailwind v4 `@theme` font integration
  - Motion docs: Must confirm the `motion` package name and `motion/react` import path (NOT `framer-motion`)

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: Build passes after scaffold + Tailwind v4 migration
    Tool: Bash
    Preconditions: All scaffold and migration steps completed
    Steps:
      1. Run `npm run build` in project root
      2. Check exit code is 0
      3. Run `npx tsc --noEmit` to verify TypeScript compiles
    Expected Result: Both commands exit with code 0, no errors in output
    Failure Indicators: "Module not found", "Cannot find module 'tailwindcss'", any TypeScript errors
    Evidence: .sisyphus/evidence/task-1-build-passes.txt

  Scenario: Tailwind v4 config is correct (no v3 remnants)
    Tool: Bash
    Preconditions: Migration completed
    Steps:
      1. Verify `tailwind.config.ts` does NOT exist: `ls tailwind.config.ts` should fail
      2. Verify `postcss.config.mjs` contains `@tailwindcss/postcss`: read file contents
      3. Verify `globals.css` starts with `@import "tailwindcss"`: read first line
      4. Verify `globals.css` contains `@theme {` directive: grep for it
    Expected Result: No v3 config file, correct PostCSS plugin, CSS-first theme config present
    Failure Indicators: `tailwind.config.ts` exists, PostCSS still uses `tailwindcss` plugin
    Evidence: .sisyphus/evidence/task-1-tailwind-v4-config.txt

  Scenario: Fonts and design tokens load correctly
    Tool: Playwright
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to `http://localhost:3000`
      2. Assert `<html>` element has classes containing `--font-geist` and `--font-inter` CSS variables
      3. Assert `<body>` has `bg-neutral-950` background (computed: rgb(10, 10, 10) approximately)
      4. Assert page renders the temporary "Coming soon" heading
    Expected Result: Fonts loaded as CSS variables, dark background applied, page renders
    Failure Indicators: White background, missing font variables, blank page
    Evidence: .sisyphus/evidence/task-1-fonts-design-tokens.png

  Scenario: FadeIn component exists and exports correctly
    Tool: Bash
    Preconditions: Component files created
    Steps:
      1. Verify `src/components/ui/FadeIn.tsx` exists
      2. Verify it contains `'use client'` directive
      3. Verify it imports from `motion/react` (NOT `framer-motion`)
      4. Verify it exports `FadeIn` as named export
    Expected Result: File exists with correct client directive, motion/react import, and named export
    Failure Indicators: Missing file, wrong import path, missing 'use client'
    Evidence: .sisyphus/evidence/task-1-fadein-component.txt
  ```

  **Evidence to Capture**:
  - [ ] task-1-build-passes.txt — build + tsc output
  - [ ] task-1-tailwind-v4-config.txt — config file verification
  - [ ] task-1-fonts-design-tokens.png — Playwright screenshot of loaded page
  - [ ] task-1-fadein-component.txt — component file verification

  **Commit**: YES
  - Message: `chore(init): scaffold Next.js 15 with Tailwind v4, fonts, and animation utilities`
  - Files: `package.json`, `tsconfig.json`, `postcss.config.mjs`, `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`, `src/components/ui/FadeIn.tsx`, `src/components/ui/SectionWrapper.tsx`, `.env.local.example`
  - Pre-commit: `npm run build`

- [x] 2. Sticky Navigation Bar

  **What to do**:
  - Create `src/components/sections/Navbar.tsx` as a client component (`'use client'`)
  - **Desktop layout** (md and up):
    - Fixed/sticky header: `<header className="fixed top-0 left-0 right-0 z-50">`
    - Semi-transparent background with backdrop blur: `bg-neutral-950/80 backdrop-blur-md`
    - Border bottom: `border-b border-neutral-800/50`
    - Inner container: `max-w-7xl mx-auto px-4 md:px-6 lg:px-8` with `flex items-center justify-between h-16`
    - Left: Name/logo text — "Dusan Luketic" in `font-display font-semibold text-neutral-100`
    - Right: Navigation links — `<nav>` with `<a>` anchors for: Projects, About, Contact
    - Link styling: `text-sm text-neutral-400 hover:text-neutral-100 transition-colors duration-200`
    - Active link (optional bonus): highlight link whose section is currently in viewport using IntersectionObserver
  - **Mobile layout** (below md):
    - Hamburger button (three horizontal lines icon — build with `<span>` divs, NOT an icon library): visible on mobile, hidden on md+
    - Mobile menu: slides down from header, same semi-transparent background, full-width
    - Mobile links: stacked vertically, larger tap targets (`py-3`), same color scheme
    - Close on link click (navigates to section and closes menu)
    - Use React state (`useState`) for open/close toggle
  - **Scroll behavior**:
    - All nav links use `href="#section-id"` for smooth scroll (relies on `scroll-behavior: smooth` from globals.css)
    - Navbar should have a subtle background opacity increase on scroll (starts slightly transparent, becomes more opaque after scrolling ~50px) — use a scroll event listener with `useState`
  - Add `pt-16` (or equivalent) to the main content wrapper in page.tsx to account for fixed navbar height — OR use `scroll-margin-top: 4rem` on sections

  **Must NOT do**:
  - Do NOT install any icon library (Lucide, Heroicons, etc.) — build hamburger icon with CSS/spans
  - Do NOT add dropdown menus or nested navigation
  - Do NOT add a theme toggle button
  - Do NOT add a CTA button or external links in the nav

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Navigation is a UI component with responsive behavior, animations (backdrop blur, scroll opacity), and mobile interaction patterns
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Needed for polished responsive nav with subtle visual effects and mobile UX
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not needed during implementation — QA is separate

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 3, 4, 5, 6, 7)
  - **Blocks**: Task 8 (page assembly)
  - **Blocked By**: Task 1 (needs project scaffold + Tailwind setup)

  **References**:

  **Pattern References**:
  - `src/components/ui/FadeIn.tsx` (created in Task 1) — Reference for `'use client'` directive pattern and `motion/react` import style
  - `src/app/globals.css` (created in Task 1) — Reference for accent color variable `--color-accent` and font-display variable

  **External References**:
  - Tailwind CSS backdrop-blur: https://tailwindcss.com/docs/backdrop-blur — `backdrop-blur-md` class for frosted glass effect
  - `motion/react` AnimatePresence: https://motion.dev/docs/react-animate-presence — for mobile menu enter/exit animation (optional enhancement)

  **WHY Each Reference Matters**:
  - `FadeIn.tsx`: Shows the client component pattern established in this project — follow same structure
  - `globals.css`: Contains the `--color-accent` CSS variable and font variables — use these, don't hardcode hex values
  - Tailwind backdrop-blur docs: Confirms exact class name for the frosted glass navbar effect

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: Navbar renders correctly on desktop (1440px)
    Tool: Playwright
    Preconditions: `npm run dev` running, page loaded
    Steps:
      1. Set viewport to 1440x900
      2. Navigate to `http://localhost:3000`
      3. Assert `<header>` element exists with `fixed` positioning (computed style)
      4. Assert text "Dusan Luketic" is visible in the header
      5. Assert nav links "Projects", "About", "Contact" are all visible
      6. Assert hamburger button is NOT visible (hidden on desktop)
      7. Screenshot the navbar
    Expected Result: Fixed header with name on left, 3 nav links on right, no hamburger icon
    Failure Indicators: Navbar not fixed, missing links, hamburger visible on desktop
    Evidence: .sisyphus/evidence/task-2-navbar-desktop.png

  Scenario: Mobile hamburger menu works (375px)
    Tool: Playwright
    Preconditions: `npm run dev` running
    Steps:
      1. Set viewport to 375x812
      2. Navigate to `http://localhost:3000`
      3. Assert hamburger button IS visible
      4. Assert nav links are NOT visible initially
      5. Click the hamburger button
      6. Assert mobile menu opens — nav links "Projects", "About", "Contact" become visible
      7. Click "Projects" link
      8. Assert mobile menu closes after click
      9. Screenshot open and closed states
    Expected Result: Hamburger toggles mobile menu, links are tappable, menu closes on link click
    Failure Indicators: No hamburger on mobile, menu doesn't open, links not visible, menu stays open
    Evidence: .sisyphus/evidence/task-2-navbar-mobile-open.png, .sisyphus/evidence/task-2-navbar-mobile-closed.png

  Scenario: Navbar backdrop blur and scroll opacity
    Tool: Playwright
    Preconditions: Page loaded with enough content to scroll
    Steps:
      1. Navigate to `http://localhost:3000`
      2. Assert header has `backdrop-blur` or `backdrop-filter` computed style
      3. Scroll down 200px using `page.evaluate(() => window.scrollTo(0, 200))`
      4. Assert header background has increased opacity (check for class change or computed background-color alpha)
      5. Screenshot header before and after scroll
    Expected Result: Header has blur effect, background opacity increases after scrolling
    Failure Indicators: No blur, no opacity change on scroll
    Evidence: .sisyphus/evidence/task-2-navbar-scroll-blur.png
  ```

  **Evidence to Capture**:
  - [ ] task-2-navbar-desktop.png — desktop navbar layout
  - [ ] task-2-navbar-mobile-open.png — mobile menu open state
  - [ ] task-2-navbar-mobile-closed.png — mobile menu closed/hamburger state
  - [ ] task-2-navbar-scroll-blur.png — blur + opacity on scroll

  **Commit**: YES (groups with Tasks 3-7)
  - Message: `feat(sections): add navbar, hero, projects, about, contact, and footer sections`
  - Files: `src/components/sections/Navbar.tsx`
  - Pre-commit: `npm run build`

- [x] 3. Hero Section

  **What to do**:
  - Create `src/components/sections/Hero.tsx` as a client component (`'use client'`)
  - **Layout**: Full viewport height (`min-h-screen`), flexbox centered both horizontally and vertically
  - Add `id="hero"` to the section for scroll anchoring (though hero is at the top)
  - **Content** (all text centered):
    - Small pre-title tag: `<span>` with text "Hello, I'm" in `text-neutral-400 text-lg md:text-xl tracking-wide uppercase` — wrapped in `<FadeIn>` with delay 0
    - Name: `<h1>` with "Dusan Luketic" in `font-display text-5xl md:text-7xl lg:text-8xl font-bold text-neutral-100 tracking-tight` — wrapped in `<FadeIn>` with delay 0.2
    - Title: `<p>` with "Senior Frontend Developer" in `text-xl md:text-2xl text-neutral-400 mt-4` — wrapped in `<FadeIn>` with delay 0.4
    - **Animated sub-headline**: A `<p>` with a subtle text like "Crafting elegant digital experiences" in `text-base md:text-lg text-neutral-500 mt-6` — use Framer Motion `motion.p` with:
      - Initial: `{ opacity: 0, y: 20 }`
      - Animate: `{ opacity: 1, y: 0 }`
      - Transition: `{ delay: 0.8, duration: 0.8, ease: "easeOut" }`
    - **CTA area** (below sub-headline, `mt-10`): Two elements wrapped in `<FadeIn delay={1.0}>`:
      - Primary button: "View My Work" — `<a href="#projects">` styled with `bg-[--color-accent] hover:bg-[--color-accent-hover] text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200`
      - Secondary link: "Get in Touch" — `<a href="#contact">` styled with `text-neutral-400 hover:text-neutral-100 underline underline-offset-4 transition-colors duration-200 ml-6`
  - **Scroll indicator** (optional enhancement at bottom of hero): A subtle animated down-arrow or "scroll" indicator using `motion.div` with repeating `y` bounce animation (`animate: { y: [0, 10, 0] }`, `transition: { repeat: Infinity, duration: 1.5 }`)

  **Must NOT do**:
  - Do NOT add a typing/typewriter effect — only fade-in animations
  - Do NOT add particle effects or animated backgrounds
  - Do NOT use an image/video background — keep it pure text on dark
  - Do NOT add social media icons in the hero — those go in the footer

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Hero section is the flagship visual component — requires precise typography hierarchy, animation timing, and responsive scaling
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Critical for visual polish — the hero is the first thing visitors see, needs refined spacing, type scale, and animation choreography
  - **Skills Evaluated but Omitted**:
    - `playwright`: QA only, not implementation

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 4, 5, 6, 7)
  - **Blocks**: Task 8 (page assembly)
  - **Blocked By**: Task 1 (needs FadeIn component, fonts, globals)

  **References**:

  **Pattern References**:
  - `src/components/ui/FadeIn.tsx` (Task 1) — Use this component for staggered reveal. Wrap each text element in `<FadeIn delay={N}>` with increasing delay values for sequential animation
  - `src/components/ui/SectionWrapper.tsx` (Task 1) — Do NOT use SectionWrapper for Hero (hero is full-screen, not standard section padding). Use raw `<section>` with custom layout
  - `src/app/globals.css` (Task 1) — Use `font-display` class for the name heading (maps to Geist), default `font-sans` for body text (maps to Inter). Use `--color-accent` for the CTA button background

  **External References**:
  - Motion animation props: https://motion.dev/docs/react-animation — `initial`, `animate`, `transition` props for the sub-headline and scroll indicator
  - Tailwind responsive prefixes: `md:text-7xl lg:text-8xl` — use for heading scale across breakpoints

  **WHY Each Reference Matters**:
  - `FadeIn.tsx`: The staggered delay pattern (0, 0.2, 0.4, 0.8, 1.0) creates the "elements appearing one after another" effect the user specified
  - `globals.css`: Ensures accent color consistency — never hardcode `#0066FF`, always use the CSS variable

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: Hero renders with correct content and layout (desktop 1440px)
    Tool: Playwright
    Preconditions: `npm run dev` running
    Steps:
      1. Set viewport to 1440x900
      2. Navigate to `http://localhost:3000`
      3. Wait 2 seconds for all fade-in animations to complete
      4. Assert text "Hello, I'm" is visible on page
      5. Assert `<h1>` contains "Dusan Luketic"
      6. Assert text "Senior Frontend Developer" is visible
      7. Assert text "Crafting elegant digital experiences" (or similar sub-headline) is visible
      8. Assert "View My Work" button/link exists with `href="#projects"`
      9. Assert "Get in Touch" link exists with `href="#contact"`
      10. Assert hero section takes approximately full viewport height (min-height >= 90vh)
      11. Screenshot the hero
    Expected Result: All text elements visible, centered, correct hierarchy, full-viewport hero
    Failure Indicators: Missing text, left-aligned instead of centered, not full height, broken links
    Evidence: .sisyphus/evidence/task-3-hero-desktop.png

  Scenario: Hero animations play in sequence
    Tool: Playwright
    Preconditions: Page loaded fresh (not cached)
    Steps:
      1. Navigate to `http://localhost:3000` with fresh load
      2. Immediately screenshot (t=0, before animations)
      3. Wait 500ms and screenshot (partial animation)
      4. Wait 2000ms and screenshot (all animations complete)
      5. Compare: at t=0 some elements should have opacity 0 or be translated; at t=2000ms all should be visible
    Expected Result: Elements appear sequentially — pre-title first, then name, then title, then sub-headline, then CTAs
    Failure Indicators: All elements appear simultaneously, no animation visible, elements never appear
    Evidence: .sisyphus/evidence/task-3-hero-animation-start.png, .sisyphus/evidence/task-3-hero-animation-end.png

  Scenario: Hero is responsive on mobile (375px)
    Tool: Playwright
    Preconditions: `npm run dev` running
    Steps:
      1. Set viewport to 375x812
      2. Navigate to `http://localhost:3000`
      3. Wait 2 seconds for animations
      4. Assert "Dusan Luketic" heading is visible and doesn't overflow horizontally
      5. Assert all text elements are still centered
      6. Assert font sizes are smaller than desktop (h1 should be ~text-5xl, not text-8xl)
      7. Screenshot mobile hero
    Expected Result: Responsive text sizing, no horizontal overflow, centered layout preserved
    Failure Indicators: Text overflows viewport, elements not centered, text too large for mobile
    Evidence: .sisyphus/evidence/task-3-hero-mobile.png
  ```

  **Evidence to Capture**:
  - [ ] task-3-hero-desktop.png — full hero at 1440px
  - [ ] task-3-hero-animation-start.png — animation t=0
  - [ ] task-3-hero-animation-end.png — animation complete
  - [ ] task-3-hero-mobile.png — hero at 375px

  **Commit**: YES (groups with Tasks 2, 4-7)
  - Message: `feat(sections): add navbar, hero, projects, about, contact, and footer sections`
  - Files: `src/components/sections/Hero.tsx`
  - Pre-commit: `npm run build`

- [x] 4. Projects Bento Grid

  **What to do**:
  - Create `src/components/sections/Projects.tsx` — can be a server component (no client interactivity needed at the section level)
  - Create `src/components/ui/ProjectCard.tsx` as a client component (`'use client'`) for hover effects
  - Add `id="projects"` to the section for scroll anchoring
  - Wrap entire section in `<SectionWrapper id="projects">` from Task 1
  - **Section header**:
    - `<FadeIn>` wrapped `<h2>` with "Selected Projects" in `font-display text-3xl md:text-4xl font-bold text-neutral-100`
    - `<FadeIn delay={0.1}>` wrapped `<p>` with a short subtitle like "A selection of recent work" in `text-neutral-400 mt-2`
    - `mt-12 md:mt-16` gap before the grid
  - **Bento grid layout** using CSS Grid (NOT flexbox, NOT masonry JS):
    - Container: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6`
    - **Uneven cell pattern** (4 cards):
      - Card 1: `lg:col-span-2 lg:row-span-1` (wide card — spans 2 columns)
      - Card 2: `lg:col-span-1 lg:row-span-1` (standard card)
      - Card 3: `lg:col-span-1 lg:row-span-1` (standard card)
      - Card 4: `lg:col-span-2 lg:row-span-1` (wide card — spans 2 columns)
    - This creates a staggered bento pattern: [wide][normal] / [normal][wide]
  - **ProjectCard component** (`src/components/ui/ProjectCard.tsx`):
    - Props: `title: string`, `description: string`, `image: string`, `tags: string[]`, `href?: string`, `className?: string`
    - Card styling: `bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden group`
    - **Thumbnail area**: `<div className="relative aspect-video overflow-hidden">` containing a `<img>` (or Next.js `<Image>`) with `className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"`
    - **Overlay on hover** (optional): subtle gradient overlay that appears on hover
    - **Content area**: `p-6` padding with:
      - Title: `text-xl font-display font-semibold text-neutral-100`
      - Description: `text-neutral-400 text-sm mt-2 line-clamp-2`
      - Tags: row of `<span>` badges — `text-xs px-2 py-1 rounded-full bg-[--color-accent-light] text-[--color-accent]` with `mt-4 flex flex-wrap gap-2`
    - **Hover lift effect**: `transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[--color-accent]/5 hover:border-neutral-700`
    - If `href` is provided, wrap entire card in `<a>` tag
  - **Placeholder data** (4 projects — define as a const array in the file):
    ```
    1. "E-Commerce Platform" — "A modern shopping experience built with Next.js and Stripe integration" — tags: ["Next.js", "TypeScript", "Stripe"]
    2. "AI Dashboard" — "Real-time analytics dashboard with machine learning insights" — tags: ["React", "Python", "TensorFlow"]
    3. "Social Media App" — "A full-stack social platform with real-time messaging" — tags: ["React Native", "Node.js", "Socket.io"]
    4. "Design System" — "A comprehensive component library for enterprise applications" — tags: ["React", "Storybook", "Tailwind"]
    ```
  - **Placeholder images**: Use Next.js `<Image>` with placeholder gray rectangles. Create simple SVG placeholders OR use solid color backgrounds (`bg-neutral-800`) with a centered icon/text as temporary thumbnails. Save as files in `public/projects/` (e.g., `project-1.svg` through `project-4.svg`) — simple SVGs with a neutral background and a subtle grid/code icon
  - Wrap each card in `<FadeIn delay={index * 0.1}>` for staggered reveal on scroll

  **Must NOT do**:
  - Do NOT use a JavaScript masonry library — CSS Grid only
  - Do NOT add filtering/sorting functionality to the grid
  - Do NOT add a "View All Projects" link or pagination
  - Do NOT add modal/lightbox for project details
  - Do NOT install an icon library for placeholder images — use inline SVG or solid backgrounds

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Bento grid is a complex visual layout requiring precise CSS Grid configuration, hover interactions, and responsive behavior
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: The bento grid with uneven cells is a design-heavy component — needs careful visual balance and hover polish
  - **Skills Evaluated but Omitted**:
    - `playwright`: QA only

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 3, 5, 6, 7)
  - **Blocks**: Task 8 (page assembly)
  - **Blocked By**: Task 1 (needs FadeIn, SectionWrapper, design tokens)

  **References**:

  **Pattern References**:
  - `src/components/ui/FadeIn.tsx` (Task 1) — Wrap each `<ProjectCard>` in `<FadeIn delay={index * 0.1}>` for staggered scroll reveal
  - `src/components/ui/SectionWrapper.tsx` (Task 1) — Use as the outer wrapper for consistent section spacing and the `id` attribute
  - `src/app/globals.css` (Task 1) — Use `--color-accent` for tag badge text, `--color-accent-light` for tag badge background

  **External References**:
  - CSS Grid `grid-cols` and `col-span`: https://tailwindcss.com/docs/grid-column — for bento layout column spanning
  - Next.js `<Image>` component: https://nextjs.org/docs/app/api-reference/components/image — for optimized project thumbnails with `fill` or `width/height` props
  - Tailwind `line-clamp`: https://tailwindcss.com/docs/line-clamp — `line-clamp-2` to truncate long descriptions

  **WHY Each Reference Matters**:
  - CSS Grid docs: The bento layout depends on correct `col-span-2` usage — wrong config means uniform boring grid
  - `<Image>` docs: Must use Next.js Image for optimized loading, not raw `<img>` — required for Vercel deployment performance
  - `line-clamp`: Ensures descriptions don't break card layout with varying text lengths

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: Bento grid renders 4 cards with correct layout (desktop 1440px)
    Tool: Playwright
    Preconditions: `npm run dev` running
    Steps:
      1. Set viewport to 1440x900
      2. Navigate to `http://localhost:3000`
      3. Scroll to the `#projects` section
      4. Wait 1 second for animations
      5. Assert heading "Selected Projects" is visible
      6. Assert exactly 4 project cards are rendered (count elements matching the card component class/selector)
      7. Assert first card ("E-Commerce Platform") is wider than second card ("AI Dashboard") — compare bounding box widths
      8. Assert all 4 cards have thumbnail images (or placeholder backgrounds)
      9. Assert technology tags are visible on each card (e.g., "Next.js", "TypeScript")
      10. Screenshot the full projects section
    Expected Result: 4 cards in bento layout — 2 wide cards and 2 standard, all with content
    Failure Indicators: Cards all same width (no bento effect), missing cards, no thumbnails
    Evidence: .sisyphus/evidence/task-4-bento-grid-desktop.png

  Scenario: Project card hover lift effect
    Tool: Playwright
    Preconditions: Projects section visible
    Steps:
      1. Locate the first project card
      2. Get initial Y position of the card (bounding box top)
      3. Hover over the card using `page.hover()`
      4. Wait 400ms for transition to complete
      5. Get new Y position — assert it is less than initial (card moved up)
      6. Assert card has a visible shadow (box-shadow computed style is not "none")
      7. Screenshot the hovered state
    Expected Result: Card moves up ~8px and gains a subtle shadow on hover
    Failure Indicators: No movement on hover, no shadow, transition is instant (not smooth)
    Evidence: .sisyphus/evidence/task-4-card-hover.png

  Scenario: Bento grid stacks on mobile (375px)
    Tool: Playwright
    Preconditions: `npm run dev` running
    Steps:
      1. Set viewport to 375x812
      2. Navigate to `http://localhost:3000`
      3. Scroll to projects section
      4. Assert all 4 cards are stacked vertically (each card width ≈ viewport width)
      5. Assert no horizontal overflow
      6. Screenshot mobile projects
    Expected Result: Cards stack in single column on mobile, no horizontal scroll
    Failure Indicators: Cards side-by-side on mobile, horizontal overflow, cards cut off
    Evidence: .sisyphus/evidence/task-4-bento-grid-mobile.png
  ```

  **Evidence to Capture**:
  - [ ] task-4-bento-grid-desktop.png — full bento grid at 1440px
  - [ ] task-4-card-hover.png — hover lift effect
  - [ ] task-4-bento-grid-mobile.png — stacked cards at 375px

  **Commit**: YES (groups with Tasks 2, 3, 5-7)
  - Message: `feat(sections): add navbar, hero, projects, about, contact, and footer sections`
  - Files: `src/components/sections/Projects.tsx`, `src/components/ui/ProjectCard.tsx`, `public/projects/project-1.svg` through `project-4.svg`
  - Pre-commit: `npm run build`

- [x] 5. About Section

  **What to do**:
  - Create `src/components/sections/About.tsx` — can be a server component (no client interactivity)
  - Add `id="about"` via `<SectionWrapper id="about">`
  - **Two-column layout**:
    - Container: `grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center`
    - **Left column (photo)**: Wrapped in `<FadeIn direction="left">`
      - `<div className="relative aspect-[3/4] md:aspect-square rounded-2xl overflow-hidden">` 
      - Use Next.js `<Image>` with `fill` prop and `className="object-cover"`
      - **Placeholder photo**: Create `public/about/profile-placeholder.svg` — a simple SVG with a neutral-800 background and a subtle silhouette or abstract shape (NOT a stock photo URL, NOT an external image)
      - Subtle border: `border border-neutral-800`
      - Optional: add a decorative accent element — a small `absolute` positioned Electric Blue bar or dot near the photo corner
    - **Right column (bio)**: Wrapped in `<FadeIn direction="right" delay={0.2}>`
      - Pre-title: `<span>` with "About Me" in `text-[--color-accent] text-sm font-medium uppercase tracking-wider`
      - Heading: `<h2>` with "Passionate about creating exceptional web experiences" in `font-display text-3xl md:text-4xl font-bold text-neutral-100 mt-3`
      - Bio paragraphs (2-3 short paragraphs of placeholder text): `text-neutral-400 text-base leading-relaxed mt-6 space-y-4`
        - Paragraph 1: "With over [X] years of experience in frontend development, I specialize in building performant, accessible, and visually stunning web applications."
        - Paragraph 2: "I'm passionate about clean code, modern design patterns, and creating seamless user experiences. My toolkit includes React, Next.js, TypeScript, and Tailwind CSS."
        - Paragraph 3: "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee."
      - **Skills/tech badges** (optional enhancement): A row of tech skill tags below the bio text — same styling as project tags (`text-xs px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300`) with tags like: React, Next.js, TypeScript, Tailwind CSS, Node.js, Figma
  - On mobile (below `md`): columns stack — photo on top, bio below

  **Must NOT do**:
  - Do NOT add a "Download CV" button or link
  - Do NOT add a timeline/work history section
  - Do NOT add social links here — those go in the footer
  - Do NOT use an external image URL — use a local placeholder SVG

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Two-column layout with image, typography hierarchy, decorative accents, and responsive behavior
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Photo + bio layout needs visual balance and appealing spacing
  - **Skills Evaluated but Omitted**:
    - `playwright`: QA only

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 3, 4, 6, 7)
  - **Blocks**: Task 8 (page assembly)
  - **Blocked By**: Task 1 (needs FadeIn, SectionWrapper, design tokens)

  **References**:

  **Pattern References**:
  - `src/components/ui/FadeIn.tsx` (Task 1) — Use `direction="left"` for photo column, `direction="right"` for bio column to create a "sliding in from sides" reveal effect
  - `src/components/ui/SectionWrapper.tsx` (Task 1) — Use for consistent section spacing and scroll anchor `id`
  - `src/app/globals.css` (Task 1) — Use `--color-accent` for the "About Me" pre-title, `font-display` for the heading

  **External References**:
  - Next.js `<Image>` with `fill` prop: https://nextjs.org/docs/app/api-reference/components/image#fill — for responsive photo that fills its container
  - Tailwind `aspect-ratio`: https://tailwindcss.com/docs/aspect-ratio — `aspect-[3/4]` for portrait-like photo ratio on mobile, `aspect-square` on desktop

  **WHY Each Reference Matters**:
  - `FadeIn` directional: The left/right directions create a cinematic split-screen reveal that enhances the two-column layout
  - Image `fill` prop: Required for responsive images in a container — avoids hardcoded width/height

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: About section two-column layout (desktop 1440px)
    Tool: Playwright
    Preconditions: `npm run dev` running
    Steps:
      1. Set viewport to 1440x900
      2. Navigate to `http://localhost:3000`
      3. Scroll to `#about` section
      4. Wait 1 second for animations
      5. Assert "About Me" text is visible with accent color (computed color matches #0066FF or close)
      6. Assert heading contains "exceptional web experiences" (or similar)
      7. Assert bio text paragraphs are visible (at least 2 paragraphs)
      8. Assert photo placeholder is visible (image or SVG element in left column)
      9. Assert layout is side-by-side: photo bounding box is LEFT of bio bounding box (compare x positions)
      10. Screenshot the about section
    Expected Result: Two-column layout — photo left, bio right, accent colored pre-title
    Failure Indicators: Stacked on desktop (not side-by-side), missing photo, no accent color
    Evidence: .sisyphus/evidence/task-5-about-desktop.png

  Scenario: About section stacks on mobile (375px)
    Tool: Playwright
    Preconditions: `npm run dev` running
    Steps:
      1. Set viewport to 375x812
      2. Navigate to `http://localhost:3000`
      3. Scroll to `#about` section
      4. Assert photo appears ABOVE the bio text (compare y positions — photo.top < bio.top)
      5. Assert no horizontal overflow
      6. Screenshot mobile about section
    Expected Result: Photo stacked on top, bio below, single-column layout
    Failure Indicators: Still side-by-side on mobile, content overflowing
    Evidence: .sisyphus/evidence/task-5-about-mobile.png
  ```

  **Evidence to Capture**:
  - [ ] task-5-about-desktop.png — two-column layout at 1440px
  - [ ] task-5-about-mobile.png — stacked layout at 375px

  **Commit**: YES (groups with Tasks 2-4, 6-7)
  - Message: `feat(sections): add navbar, hero, projects, about, contact, and footer sections`
  - Files: `src/components/sections/About.tsx`, `public/about/profile-placeholder.svg`
  - Pre-commit: `npm run build`

- [x] 6. Contact Form UI + Client Validation

  **What to do**:
  - Create `src/components/sections/Contact.tsx` as a client component (`'use client'`)
  - Add `id="contact"` via `<SectionWrapper id="contact">`
  - **Section header** (same pattern as Projects):
    - `<FadeIn>` wrapped `<h2>` with "Get in Touch" in `font-display text-3xl md:text-4xl font-bold text-neutral-100`
    - `<FadeIn delay={0.1}>` wrapped `<p>` with "Have a project in mind? Let's talk." in `text-neutral-400 mt-2`
  - **Form layout**: Centered, `max-w-xl mx-auto mt-12`
  - **Form fields** (all wrapped in `<FadeIn>` with staggered delays):
    - **Name field** (`delay={0.2}`):
      - `<label htmlFor="name">` with "Name" in `text-sm font-medium text-neutral-300 mb-1.5 block`
      - `<input type="text" id="name" name="name" placeholder="John Doe">`
      - Input styling: `w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-[--color-accent] focus:ring-1 focus:ring-[--color-accent] transition-colors duration-200`
    - **Email field** (`delay={0.3}`):
      - Same pattern, `type="email"`, placeholder "john@example.com"
    - **Message field** (`delay={0.4}`):
      - `<textarea id="message" name="message" rows={5} placeholder="Tell me about your project...">`
      - Same styling as inputs + `resize-none` to prevent manual resize
    - **Submit button** (`delay={0.5}`):
      - `<button type="submit">` with text "Send Message"
      - Styling: `w-full py-3 px-6 bg-[--color-accent] hover:bg-[--color-accent-hover] text-white font-medium rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`
  - **Form state management**:
    - Use `useActionState` from `react` for server action integration (hook will be connected in Task 9)
    - For now, create the form with a placeholder action that does nothing — `action={formAction}` where `formAction` is a stub
    - Actually — use a temporary client-side handler that prevents default and logs to console. Task 9 will replace this with the real server action
    - Display states:
      - **Idle**: Normal form
      - **Pending/submitting**: Button shows "Sending..." and is disabled, inputs are disabled
      - **Success**: Green success message below the form — "Message sent successfully! I'll get back to you soon."
      - **Error**: Red error message — field-level errors below each input, general error below submit
    - Field-level validation errors: `<p className="text-red-400 text-sm mt-1.5">` below each input
  - **Client-side validation** (Zod — validate before server action):
    - Import Zod schema (define inline or in a shared `lib/schemas.ts` if useful for Task 9):
      - `name`: `z.string().min(2, "Name must be at least 2 characters")`
      - `email`: `z.string().email("Please enter a valid email address")`
      - `message`: `z.string().min(10, "Message must be at least 10 characters")`

  **Must NOT do**:
  - Do NOT add CAPTCHA, honeypot, or spam protection
  - Do NOT add file upload or additional form fields beyond Name, Email, Message
  - Do NOT add auto-reply confirmation email logic
  - Do NOT implement the actual email sending — that's Task 9
  - Do NOT add a phone number or subject field

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Form UI with focus states, validation feedback, loading states, and responsive styling
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Form UX needs polished focus states, error presentation, and transition effects
  - **Skills Evaluated but Omitted**:
    - `playwright`: QA only

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 3, 4, 5, 7)
  - **Blocks**: Tasks 8 (page assembly), 9 (server action integration)
  - **Blocked By**: Task 1 (needs FadeIn, SectionWrapper, design tokens)

  **References**:

  **Pattern References**:
  - `src/components/ui/FadeIn.tsx` (Task 1) — Staggered delays for sequential field reveal
  - `src/components/ui/SectionWrapper.tsx` (Task 1) — Outer wrapper with `id="contact"`
  - `src/app/globals.css` (Task 1) — `--color-accent` for focus ring and submit button, `--color-accent-hover` for button hover

  **External References**:
  - React `useActionState` hook: https://react.dev/reference/react/useActionState — form state management for server actions (used in Task 9, but set up the hook structure now)
  - Zod validation: https://zod.dev/?id=strings — string validators for name (min), email, message (min)
  - Tailwind `focus:ring`: https://tailwindcss.com/docs/ring-width — for accessible focus indicators on form inputs

  **WHY Each Reference Matters**:
  - `useActionState`: The form needs to be wired for server action integration — setting up the hook now means Task 9 just swaps in the real action function
  - Zod docs: Ensures validation schema matches exactly — same schema will be reused server-side in Task 9
  - Focus ring: Accessibility requirement — visible focus state for keyboard navigation

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: Contact form renders with all fields (desktop 1440px)
    Tool: Playwright
    Preconditions: `npm run dev` running
    Steps:
      1. Set viewport to 1440x900
      2. Navigate to `http://localhost:3000`
      3. Scroll to `#contact` section
      4. Wait 1 second for animations
      5. Assert heading "Get in Touch" is visible
      6. Assert `<input name="name">` exists with placeholder "John Doe"
      7. Assert `<input name="email">` exists with placeholder "john@example.com"
      8. Assert `<textarea name="message">` exists
      9. Assert submit button with text "Send Message" exists
      10. Screenshot the contact form
    Expected Result: All 3 fields + submit button visible, correct placeholders
    Failure Indicators: Missing fields, wrong placeholders, no submit button
    Evidence: .sisyphus/evidence/task-6-contact-form-desktop.png

  Scenario: Form focus states show Electric Blue ring
    Tool: Playwright
    Preconditions: Contact form visible
    Steps:
      1. Click on the Name input to focus it
      2. Assert the input has a visible focus ring (computed `outline` or `box-shadow` or `ring` is not "none")
      3. Assert the focus ring color is approximately #0066FF (check computed border-color or ring-color)
      4. Tab to Email field — assert same focus ring
      5. Tab to Message field — assert same focus ring
      6. Screenshot focused input state
    Expected Result: Electric Blue focus ring appears on all inputs when focused
    Failure Indicators: No visible focus indicator, wrong color, inconsistent between fields
    Evidence: .sisyphus/evidence/task-6-focus-states.png

  Scenario: Client-side validation shows errors for empty/invalid input
    Tool: Playwright
    Preconditions: Contact form visible
    Steps:
      1. Click "Send Message" without filling any fields
      2. Assert error message appears for name field containing "at least 2 characters" (or similar)
      3. Assert error message appears for email field
      4. Assert error message appears for message field
      5. Fill name with "A" (too short) — assert name error persists
      6. Fill email with "notanemail" — assert email error appears
      7. Fill message with "Short" (too short) — assert message error appears
      8. Screenshot the form with validation errors
    Expected Result: Field-level error messages in red below each invalid field
    Failure Indicators: No errors shown, form submits anyway, errors not field-specific
    Evidence: .sisyphus/evidence/task-6-validation-errors.png

  Scenario: Contact form is usable on mobile (375px)
    Tool: Playwright
    Preconditions: `npm run dev` running
    Steps:
      1. Set viewport to 375x812
      2. Scroll to `#contact` section
      3. Assert all fields are full-width (input width ≈ container width)
      4. Assert submit button is full-width
      5. Assert no horizontal overflow
      6. Screenshot mobile contact form
    Expected Result: Full-width fields, no overflow, touch-friendly sizing
    Failure Indicators: Fields too narrow, horizontal scroll, button not full-width
    Evidence: .sisyphus/evidence/task-6-contact-form-mobile.png
  ```

  **Evidence to Capture**:
  - [ ] task-6-contact-form-desktop.png — form at 1440px
  - [ ] task-6-focus-states.png — Electric Blue focus ring
  - [ ] task-6-validation-errors.png — validation error display
  - [ ] task-6-contact-form-mobile.png — form at 375px

  **Commit**: YES (groups with Tasks 2-5, 7)
  - Message: `feat(sections): add navbar, hero, projects, about, contact, and footer sections`
  - Files: `src/components/sections/Contact.tsx`, optionally `src/lib/schemas.ts` (if shared Zod schema)
  - Pre-commit: `npm run build`

- [x] 7. Footer

  **What to do**:
  - Create `src/components/sections/Footer.tsx` — server component (no client interactivity needed)
  - **Layout**: Full-width section, NOT inside SectionWrapper (footer has its own styling). Use `<footer>` semantic element
  - Styling: `border-t border-neutral-800 py-8 md:py-12 px-4 md:px-6 lg:px-8`
  - Inner container: `max-w-7xl mx-auto`
  - **Desktop layout** (md and up): `flex items-center justify-between`
    - **Left**: Copyright text — `© {currentYear} Dusan Luketic. All rights reserved.` in `text-neutral-500 text-sm`
      - Use dynamic year: define `const currentYear = new Date().getFullYear()` in the component
    - **Right**: Social links row — `flex items-center gap-6`
      - Include 3-4 social links: GitHub, LinkedIn, Twitter/X, Email (mailto:)
      - Each link: `<a href="..." target="_blank" rel="noopener noreferrer">` with `text-neutral-500 hover:text-neutral-100 transition-colors duration-200`
      - Use inline SVG icons for each platform (simple, ~20px, single-path icons). Do NOT install an icon library
      - GitHub icon: standard octocat outline, LinkedIn icon: "in" box, Twitter/X icon: bird or X mark, Email icon: envelope
      - Use `href="#"` as placeholder URLs (user will replace with real social links)
  - **Mobile layout** (below md): Stack vertically — socials on top, copyright below, all centered
  - Optionally: a small "Back to top" link that scrolls to `#hero` — styled as `text-neutral-600 hover:text-neutral-400 text-xs`

  **Must NOT do**:
  - Do NOT install any icon library (Lucide, Heroicons, FontAwesome)
  - Do NOT add a newsletter signup form
  - Do NOT add a sitemap or secondary navigation in the footer
  - Do NOT add cookie consent or legal links

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Footer is a simple, self-contained component with minimal logic — just static markup, inline SVG icons, and basic responsive styling
  - **Skills**: []
    - No specialized skills needed for a simple footer
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Overkill for a minimal footer — standard patterns suffice

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 3, 4, 5, 6)
  - **Blocks**: Task 8 (page assembly)
  - **Blocked By**: Task 1 (needs project structure, Tailwind setup)

  **References**:

  **Pattern References**:
  - `src/app/globals.css` (Task 1) — Use neutral color palette from theme tokens. Use `--color-accent` ONLY if adding hover accent to social icons (optional)

  **External References**:
  - Simple SVG icons for socials: https://simpleicons.org — reference for GitHub/LinkedIn/X icon paths (copy just the SVG `<path>` data, render inline)
  - Tailwind `target="_blank"` with `rel="noopener noreferrer"`: security best practice for external links

  **WHY Each Reference Matters**:
  - Simple Icons: provides standard, recognizable SVG paths for social platforms — no library install needed, just copy the `d` attribute
  - Security practice: external social links MUST have `rel="noopener noreferrer"` to prevent tab-napping

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: Footer renders with copyright and social links (desktop 1440px)
    Tool: Playwright
    Preconditions: `npm run dev` running
    Steps:
      1. Set viewport to 1440x900
      2. Navigate to `http://localhost:3000`
      3. Scroll to the bottom of the page
      4. Assert `<footer>` element exists
      5. Assert copyright text contains "Dusan Luketic" and the current year (2026)
      6. Assert at least 3 social link `<a>` elements exist inside the footer
      7. Assert each social link has `target="_blank"` and `rel` containing "noopener"
      8. Assert footer has a top border (border-t visible)
      9. Screenshot the footer
    Expected Result: Footer with copyright left, social icons right, top border
    Failure Indicators: Missing copyright, no social links, no border, wrong year
    Evidence: .sisyphus/evidence/task-7-footer-desktop.png

  Scenario: Footer stacks on mobile (375px)
    Tool: Playwright
    Preconditions: `npm run dev` running
    Steps:
      1. Set viewport to 375x812
      2. Scroll to bottom
      3. Assert social links and copyright are centered (not left/right aligned)
      4. Assert no horizontal overflow
      5. Screenshot mobile footer
    Expected Result: Centered, stacked layout on mobile
    Failure Indicators: Content still side-by-side, overflow, off-center
    Evidence: .sisyphus/evidence/task-7-footer-mobile.png
  ```

  **Evidence to Capture**:
  - [ ] task-7-footer-desktop.png — footer at 1440px
  - [ ] task-7-footer-mobile.png — footer at 375px

  **Commit**: YES (groups with Tasks 2-6)
  - Message: `feat(sections): add navbar, hero, projects, about, contact, and footer sections`
  - Files: `src/components/sections/Footer.tsx`
  - Pre-commit: `npm run build`

- [x] 8. Page Assembly + Smooth Scroll Behavior

  **What to do**:
  - Replace the temporary content in `src/app/page.tsx` with the composed section layout:
    ```tsx
    import { Navbar } from "@/components/sections/Navbar"
    import { Hero } from "@/components/sections/Hero"
    import { Projects } from "@/components/sections/Projects"
    import { About } from "@/components/sections/About"
    import { Contact } from "@/components/sections/Contact"
    import { Footer } from "@/components/sections/Footer"

    export default function Home() {
      return (
        <>
          <Navbar />
          <main>
            <Hero />
            <Projects />
            <About />
            <Contact />
          </main>
          <Footer />
        </>
      )
    }
    ```
  - **Smooth scroll offset**: Each section has `id` attributes set in their respective tasks. Ensure smooth scroll works with the fixed navbar by adding `scroll-margin-top: 4rem` (64px — navbar height) to all sections in `globals.css`:
    ```css
    section[id] {
      scroll-margin-top: 4rem;
    }
    ```
    This prevents sections from being hidden behind the fixed navbar when scrolled to via anchor links
  - **Main content padding**: Add `pt-0` to `<main>` — the Hero section is full-viewport, so no top padding needed (the hero goes BEHIND the transparent navbar). But verify the navbar doesn't overlap hero text
  - **Section spacing verification**: Scroll through the entire page and verify:
    - Consistent vertical spacing between sections (py-20 md:py-32 from SectionWrapper)
    - No unexpected gaps or overlaps
    - Smooth transitions between sections visually
  - **Page-level scroll smoothness**: Verify `html { scroll-behavior: smooth; }` from globals.css works for all anchor links (#projects, #about, #contact)
  - Ensure the page builds and all imports resolve correctly

  **Must NOT do**:
  - Do NOT modify any section component internals — only import and compose them
  - Do NOT add page-level animations or transitions — those are handled per-section
  - Do NOT add loading spinners or Suspense boundaries (no async data fetching)
  - Do NOT add a scroll-to-top button (optional in footer, Task 7 handles it if added)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Page composition requires visual QA — checking section flow, spacing consistency, scroll behavior, and nav-to-section alignment
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Full-page visual polish — ensuring sections flow together cohesively and the scroll experience feels premium
  - **Skills Evaluated but Omitted**:
    - `playwright`: QA only

  **Parallelization**:
  - **Can Run In Parallel**: NO (depends on ALL section components existing)
  - **Parallel Group**: Wave 3 (with Tasks 9, 10)
  - **Blocks**: Task 10 (SEO metadata)
  - **Blocked By**: Tasks 2, 3, 4, 5, 6, 7 (needs all sections)

  **References**:

  **Pattern References**:
  - `src/components/sections/Navbar.tsx` (Task 2) — Verify import path and export name
  - `src/components/sections/Hero.tsx` (Task 3) — Verify import path and export name
  - `src/components/sections/Projects.tsx` (Task 4) — Verify import path and export name
  - `src/components/sections/About.tsx` (Task 5) — Verify import path and export name
  - `src/components/sections/Contact.tsx` (Task 6) — Verify import path and export name
  - `src/components/sections/Footer.tsx` (Task 7) — Verify import path and export name
  - `src/app/globals.css` (Task 1) — Add `scroll-margin-top` rule here

  **WHY Each Reference Matters**:
  - All section imports must match exact file paths and export names from Tasks 2-7 — a single wrong import breaks the build
  - globals.css scroll-margin-top: Without this, clicking nav links scrolls sections BEHIND the fixed navbar

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: Full page renders all sections in correct order (desktop 1440px)
    Tool: Playwright
    Preconditions: `npm run dev` running, all section components built
    Steps:
      1. Set viewport to 1440x900
      2. Navigate to `http://localhost:3000`
      3. Assert sections appear in order from top to bottom:
         - Hero (contains "Dusan Luketic")
         - Projects (contains "Selected Projects")
         - About (contains "About Me")
         - Contact (contains "Get in Touch")
         - Footer (contains copyright)
      4. Assert `<main>` element exists wrapping Hero through Contact
      5. Assert `<footer>` element exists outside `<main>`
      6. Run `npm run build` — assert exit code 0
      7. Full-page screenshot
    Expected Result: All 6 sections rendered in order, build passes
    Failure Indicators: Missing section, wrong order, build errors due to broken imports
    Evidence: .sisyphus/evidence/task-8-full-page-desktop.png

  Scenario: Navbar anchor links scroll to correct sections
    Tool: Playwright
    Preconditions: Full page rendered
    Steps:
      1. Click "Projects" in the navbar
      2. Wait 1 second for smooth scroll
      3. Assert `#projects` section is in viewport (top of section is near viewport top, accounting for navbar offset)
      4. Click "About" in the navbar
      5. Wait 1 second
      6. Assert `#about` section is in viewport
      7. Click "Contact" in the navbar
      8. Wait 1 second
      9. Assert `#contact` section is in viewport
    Expected Result: Each nav link scrolls smoothly to the correct section, section content is visible (not hidden behind navbar)
    Failure Indicators: No scroll happens, section hidden behind navbar, wrong section scrolled to
    Evidence: .sisyphus/evidence/task-8-scroll-to-projects.png, .sisyphus/evidence/task-8-scroll-to-contact.png

  Scenario: Scroll-triggered animations fire during full-page scroll
    Tool: Playwright
    Preconditions: Fresh page load
    Steps:
      1. Navigate to `http://localhost:3000`
      2. Assert hero animations are complete (hero is at top, loads immediately)
      3. Slowly scroll to Projects section — assert project cards fade in (check opacity > 0)
      4. Continue scrolling to About — assert about content fades in
      5. Continue to Contact — assert form fields fade in
      6. Assert all sections have fully visible content after scroll completes
    Expected Result: Each section animates in as it enters the viewport
    Failure Indicators: All content visible immediately (no animation), content stays invisible after scroll
    Evidence: .sisyphus/evidence/task-8-scroll-animations.png

  Scenario: Full page works on mobile (375px)
    Tool: Playwright
    Preconditions: `npm run dev` running
    Steps:
      1. Set viewport to 375x812
      2. Navigate to `http://localhost:3000`
      3. Scroll through entire page — all sections load
      4. Assert no horizontal overflow at any point
      5. Assert all sections are visible
      6. Full-page mobile screenshot
    Expected Result: Complete mobile experience, no overflow, all content accessible
    Failure Indicators: Horizontal scroll, content cut off, sections missing
    Evidence: .sisyphus/evidence/task-8-full-page-mobile.png
  ```

  **Evidence to Capture**:
  - [ ] task-8-full-page-desktop.png — complete page at 1440px
  - [ ] task-8-scroll-to-projects.png — after clicking Projects nav link
  - [ ] task-8-scroll-to-contact.png — after clicking Contact nav link
  - [ ] task-8-scroll-animations.png — mid-scroll showing animations
  - [ ] task-8-full-page-mobile.png — complete page at 375px

  **Commit**: YES (groups with Tasks 9-10)
  - Message: `feat(integration): assemble page, add Resend contact flow, and SEO metadata`
  - Files: `src/app/page.tsx`, `src/app/globals.css` (scroll-margin addition)
  - Pre-commit: `npm run build`

- [x] 9. Contact Server Action + Resend Integration

  **What to do**:
  - Create `src/app/actions/contact.ts` with `'use server'` directive
  - **Server action function** `sendContactEmail`:
    - Signature: `export async function sendContactEmail(prevState: ActionState, formData: FormData): Promise<ActionState>`
    - Type `ActionState`: `{ success?: boolean; errors?: { name?: string[]; email?: string[]; message?: string[] }; message?: string }`
    - **Step 1 — Validate** with Zod: Parse `formData.get('name')`, `formData.get('email')`, `formData.get('message')` using the same schema from Task 6 (or import from shared `lib/schemas.ts`)
    - On validation failure: return `{ success: false, errors: validated.error.flatten().fieldErrors }`
    - **Step 2 — Send email** via Resend:
      ```ts
      import { Resend } from 'resend'
      const resend = new Resend(process.env.RESEND_API_KEY)
      
      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: process.env.CONTACT_EMAIL!,
        subject: `Portfolio Contact: ${validated.data.name}`,
        text: `Name: ${validated.data.name}\nEmail: ${validated.data.email}\n\nMessage:\n${validated.data.message}`,
        replyTo: validated.data.email,
      })
      ```
    - On success: return `{ success: true, message: 'Message sent successfully! I\'ll get back to you soon.' }`
    - On error (catch block): return `{ success: false, message: 'Something went wrong. Please try again later.' }` — do NOT expose the actual error to the client
  - **Update Contact.tsx** (Task 6's component):
    - Import `sendContactEmail` from `@/app/actions/contact`
    - Replace the placeholder/stub action with the real server action
    - Wire up with `useActionState`:
      ```ts
      const [state, formAction, pending] = useActionState(sendContactEmail, initialState)
      ```
    - Set `<form action={formAction}>`
    - Use `pending` to disable inputs and show "Sending..." on the button
    - Display `state.message` on success/error
    - Display `state.errors?.fieldName` for field-level server validation errors
  - **Environment variables**: Verify `.env.local.example` (created in Task 1) has `RESEND_API_KEY` and `CONTACT_EMAIL` entries
  - **Note**: For local development without a real Resend API key, the form should fail gracefully with the generic error message. The form UI and validation should still work perfectly without the API key.

  **Must NOT do**:
  - Do NOT add auto-reply functionality
  - Do NOT add rate limiting or spam protection
  - Do NOT store form submissions in a database
  - Do NOT add file attachment support
  - Do NOT expose the Resend API key or contact email to the client

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Server action is a single file with Zod validation + Resend API call — straightforward backend logic, no complex architecture
  - **Skills**: []
    - No specialized skills needed — standard Next.js server action pattern
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: This is backend logic, not visual
    - `playwright`: QA only

  **Parallelization**:
  - **Can Run In Parallel**: YES (parallel with Task 8 and Task 10, but depends on Task 6 for the Contact component)
  - **Parallel Group**: Wave 3 (with Tasks 8, 10)
  - **Blocks**: Task 10
  - **Blocked By**: Task 6 (needs Contact.tsx to exist for wiring)

  **References**:

  **Pattern References**:
  - `src/components/sections/Contact.tsx` (Task 6) — The form component to update. Must import `useActionState` from `react`, replace stub action with `sendContactEmail`, wire `pending` state to button disabled + text
  - `src/lib/schemas.ts` or inline schema (Task 6) — Reuse the same Zod validation schema both client-side and server-side for consistency

  **External References**:
  - Resend Node SDK: https://resend.com/docs/sdks/node — `resend.emails.send()` API signature with `from`, `to`, `subject`, `text`, `replyTo` fields
  - React `useActionState`: https://react.dev/reference/react/useActionState — `const [state, formAction, pending] = useActionState(fn, initialState)` — returns current state, form action, and pending boolean
  - Next.js Server Actions: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations — `'use server'` directive, FormData handling

  **WHY Each Reference Matters**:
  - Resend SDK: Must use correct method signature — `from` field requires a verified domain or defaults to `onboarding@resend.dev` for testing
  - `useActionState`: This is the React 19 way (not `useFormState` which is deprecated) — critical to use the right hook
  - Server Actions docs: Confirms that `'use server'` must be at top of file, function must accept FormData

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: Server action validates and returns errors for invalid input
    Tool: Bash (curl)
    Preconditions: `npm run dev` running, no RESEND_API_KEY set in .env.local
    Steps:
      1. Use Playwright to fill the form with invalid data: name="" email="notanemail" message="hi"
      2. Submit the form
      3. Assert validation error messages appear:
         - Name: "at least 2 characters" (or similar)
         - Email: "valid email" (or similar)
         - Message: "at least 10 characters" (or similar)
      4. Assert form was NOT submitted to Resend (no network request to Resend API)
    Expected Result: Client-side + server-side validation prevents submission, field errors displayed
    Failure Indicators: Form submits despite invalid data, no error messages, generic error instead of field-specific
    Evidence: .sisyphus/evidence/task-9-validation-errors.txt

  Scenario: Server action handles missing API key gracefully
    Tool: Playwright
    Preconditions: `npm run dev` running, RESEND_API_KEY NOT set in .env.local
    Steps:
      1. Fill form with valid data: name="Test User", email="test@example.com", message="This is a test message for the contact form."
      2. Submit the form
      3. Assert a user-friendly error message appears (NOT a raw error/stack trace)
      4. Assert the message is something like "Something went wrong. Please try again later."
      5. Assert the page does not crash or show a Next.js error overlay
    Expected Result: Graceful error handling — user sees friendly message, no crash
    Failure Indicators: Unhandled error, Next.js error overlay, raw stack trace, page crash
    Evidence: .sisyphus/evidence/task-9-graceful-error.png

  Scenario: Form shows pending state during submission
    Tool: Playwright
    Preconditions: `npm run dev` running
    Steps:
      1. Fill form with valid data
      2. Click submit
      3. Immediately check: button text should change to "Sending..." (or similar)
      4. Assert button is disabled (has disabled attribute)
      5. Assert input fields are disabled during submission
    Expected Result: UI shows loading state — button text changes, controls disabled
    Failure Indicators: No loading state, button stays "Send Message", inputs still editable during submit
    Evidence: .sisyphus/evidence/task-9-pending-state.png

  Scenario: useActionState hook is correctly wired
    Tool: Bash
    Preconditions: All files saved
    Steps:
      1. Read `src/components/sections/Contact.tsx`
      2. Assert it imports `useActionState` from `react`
      3. Assert it imports `sendContactEmail` from `@/app/actions/contact`
      4. Assert `<form>` has `action={formAction}` (not `onSubmit`)
      5. Read `src/app/actions/contact.ts`
      6. Assert it starts with `'use server'`
      7. Assert it imports `Resend` from `resend`
      8. Run `npm run build` — assert it passes
    Expected Result: Correct imports, server directive, and form wiring — build passes
    Failure Indicators: Wrong imports, missing 'use server', build error
    Evidence: .sisyphus/evidence/task-9-wiring-check.txt
  ```

  **Evidence to Capture**:
  - [ ] task-9-validation-errors.txt — validation error test results
  - [ ] task-9-graceful-error.png — error handling without API key
  - [ ] task-9-pending-state.png — loading state during submit
  - [ ] task-9-wiring-check.txt — code verification results

  **Commit**: YES (groups with Tasks 8, 10)
  - Message: `feat(integration): assemble page, add Resend contact flow, and SEO metadata`
  - Files: `src/app/actions/contact.ts`, `src/components/sections/Contact.tsx` (updated)
  - Pre-commit: `npm run build`

- [x] 10. SEO Metadata + Open Graph + Favicon

  **What to do**:
  - Update `src/app/layout.tsx` with Next.js Metadata API:
    ```ts
    import type { Metadata } from 'next'

    export const metadata: Metadata = {
      title: 'Dusan Luketic | Senior Frontend Developer',
      description: 'Portfolio of Dusan Luketic — Senior Frontend Developer specializing in React, Next.js, and TypeScript. Building elegant, performant web experiences.',
      keywords: ['frontend developer', 'react', 'next.js', 'typescript', 'portfolio', 'web developer'],
      authors: [{ name: 'Dusan Luketic' }],
      creator: 'Dusan Luketic',
      openGraph: {
        type: 'website',
        locale: 'en_US',
        title: 'Dusan Luketic | Senior Frontend Developer',
        description: 'Portfolio of Dusan Luketic — Senior Frontend Developer specializing in React, Next.js, and TypeScript.',
        siteName: 'Dusan Luketic',
        // url: 'https://dusanluketic.com', // Uncomment when domain is ready
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Dusan Luketic | Senior Frontend Developer',
        description: 'Portfolio of Dusan Luketic — Senior Frontend Developer.',
        // images: ['/og-image.png'], // Uncomment when OG image is ready
      },
      robots: {
        index: true,
        follow: true,
      },
    }
    ```
  - **Favicon**: Create a simple placeholder favicon
    - Create `src/app/icon.svg` — Next.js App Router auto-serves SVG files named `icon.svg` in the app directory as the favicon
    - Design: simple SVG — a rounded square with Electric Blue (#0066FF) background and white "DL" initials, or just a solid Electric Blue circle
    - This is a placeholder — user will replace with a real favicon later
  - **OG Image placeholder** (optional but recommended):
    - Create `public/og-image.png` — a 1200x630 image (can be generated as a simple SVG converted to PNG, or a solid color card with text)
    - Alternatively, use Next.js `opengraph-image.tsx` for dynamic OG image generation (more advanced but cool):
      - Create `src/app/opengraph-image.tsx` using Next.js ImageResponse API
      - Generate a 1200x630 image with dark background, "Dusan Luketic" in large text, "Senior Frontend Developer" below
    - Either approach is fine — use whichever is simpler for the agent
  - Verify `<html lang="en">` is already set in layout.tsx (from Task 1)
  - Run `npm run build` and verify no metadata-related warnings

  **Must NOT do**:
  - Do NOT add analytics scripts (Google Analytics, Plausible, etc.)
  - Do NOT add structured data (JSON-LD) — keep it simple
  - Do NOT add a sitemap or robots.txt (Vercel handles these automatically)
  - Do NOT add a manifest.json / PWA configuration

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Metadata is declarative config in layout.tsx + a small SVG file — minimal logic, no visual design
  - **Skills**: []
    - No specialized skills needed
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: No visual work — metadata is invisible until shared on social media

  **Parallelization**:
  - **Can Run In Parallel**: YES (parallel with Tasks 8, 9 in Wave 3)
  - **Parallel Group**: Wave 3 (with Tasks 8, 9)
  - **Blocks**: F1-F4 (final verification)
  - **Blocked By**: Tasks 8, 9 (needs page assembly complete + server action done for final build check)

  **References**:

  **Pattern References**:
  - `src/app/layout.tsx` (Task 1) — This file already exists with font setup. Add `metadata` export to it. Do NOT create a separate metadata file

  **External References**:
  - Next.js Metadata API: https://nextjs.org/docs/app/api-reference/functions/generate-metadata — `Metadata` type with `title`, `description`, `openGraph`, `twitter` fields
  - Next.js favicon convention: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons — `icon.svg` in `app/` directory is auto-served
  - Next.js OG Image: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image — `opengraph-image.tsx` for dynamic generation

  **WHY Each Reference Matters**:
  - Metadata API: Must use exact type shape — wrong fields silently ignored, won't generate proper meta tags
  - Favicon convention: Next.js auto-serves `icon.svg` without any explicit configuration — simpler than the traditional `favicon.ico` approach
  - OG Image docs: If using dynamic generation, the `ImageResponse` API has specific constraints (no external fonts, limited CSS support)

  **Acceptance Criteria**:

  **QA Scenarios**:

  ```
  Scenario: Meta tags render correctly in page source
    Tool: Bash (curl)
    Preconditions: `npm run dev` running
    Steps:
      1. Run `curl -s http://localhost:3000 | head -50` to get the HTML head
      2. Assert `<title>` contains "Dusan Luketic"
      3. Assert `<meta name="description"` contains "Senior Frontend Developer"
      4. Assert `<meta property="og:title"` contains "Dusan Luketic"
      5. Assert `<meta property="og:type"` is "website"
      6. Assert `<meta name="twitter:card"` is "summary_large_image"
      7. Assert `<html lang="en">` is present
    Expected Result: All meta tags present with correct content
    Failure Indicators: Missing meta tags, wrong content, no lang attribute
    Evidence: .sisyphus/evidence/task-10-meta-tags.txt

  Scenario: Favicon loads
    Tool: Playwright
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to `http://localhost:3000`
      2. Check for favicon link in the page (browser may not expose this easily — alternatively, fetch `http://localhost:3000/icon.svg` directly)
      3. Run `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/icon.svg` — assert status 200
      4. Assert the response is a valid SVG (contains `<svg` tag)
    Expected Result: Favicon SVG accessible at /icon.svg, returns 200
    Failure Indicators: 404 on favicon URL, not a valid SVG
    Evidence: .sisyphus/evidence/task-10-favicon-check.txt

  Scenario: Build passes with metadata
    Tool: Bash
    Preconditions: All metadata additions complete
    Steps:
      1. Run `npm run build`
      2. Assert exit code 0
      3. Assert no warnings about metadata in build output
    Expected Result: Clean build with metadata
    Failure Indicators: Build warnings about metadata, type errors in metadata object
    Evidence: .sisyphus/evidence/task-10-build-passes.txt
  ```

  **Evidence to Capture**:
  - [ ] task-10-meta-tags.txt — curl output showing meta tags
  - [ ] task-10-favicon-check.txt — favicon accessibility check
  - [ ] task-10-build-passes.txt — build output

  **Commit**: YES (groups with Tasks 8, 9)
  - Message: `feat(integration): assemble page, add Resend contact flow, and SEO metadata`
  - Files: `src/app/layout.tsx` (updated), `src/app/icon.svg`
  - Pre-commit: `npm run build`

---

## Final Verification Wave

- [x] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, check DOM via Playwright, run build). For each "Must NOT Have": search codebase for forbidden patterns (`framer-motion` imports, `tailwind.config.ts`, `as any`, `console.log`, theme toggle code) — reject with file:line if found. Check all evidence files exist in `.sisyphus/evidence/`. Compare deliverables against plan.
  Output: `Must Have [N/11] | Must NOT Have [N/11] | Tasks [N/10] | VERDICT: APPROVE/REJECT`

- [x] F2. **Code Quality Review** — `unspecified-high`
  Run `npx tsc --noEmit` + `npm run build`. Review all changed files for: `as any`/`@ts-ignore`, empty catch blocks, `console.log` in production code, commented-out code, unused imports. Check for AI slop: excessive comments, over-abstraction, generic variable names (`data`/`result`/`item`/`temp`). Verify Tailwind classes are consistent (no mixing v3 and v4 syntax). Check `motion/react` imports (not `framer-motion`).
  Output: `Build [PASS/FAIL] | TypeScript [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [x] F3. **Real Manual QA** — `unspecified-high` + `playwright` skill
  Start from clean state (`npm run dev`). Execute EVERY QA scenario from EVERY task — follow exact steps in Playwright, capture screenshots as evidence. Test cross-section integration: navbar links scroll to correct sections, all animations trigger in sequence during full scroll, contact form complete flow. Test at 375px (mobile) and 1440px (desktop). Test edge cases: rapid scroll, form with empty fields, form with invalid email, resize during animation. Save all evidence to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Responsive [2/2 viewports] | Edge Cases [N tested] | VERDICT`

- [x] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual files created. Verify 1:1 — everything in spec was built (no missing features), nothing beyond spec was built (no scope creep). Check "Must NOT do" compliance per task. Detect cross-task contamination: Task N modifying files that belong to Task M. Flag unaccounted files not in any task spec. Verify placeholder content is clearly marked for easy replacement.
  Output: `Tasks [N/10 compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

| After | Message | Key Files | Pre-commit Check |
|-------|---------|-----------|-----------------|
| Task 1 | `chore(init): scaffold Next.js 15 with Tailwind v4, fonts, and animation utilities` | `package.json`, `app/layout.tsx`, `app/globals.css`, `components/ui/*` | `npm run build` |
| Tasks 2-7 | `feat(sections): add navbar, hero, projects, about, contact, and footer sections` | `components/sections/*` | `npm run build` |
| Tasks 8-10 | `feat(integration): assemble page, add Resend contact flow, and SEO metadata` | `app/page.tsx`, `app/actions/contact.ts`, `app/layout.tsx` | `npm run build` |

---

## Success Criteria

### Verification Commands
```bash
npm run build        # Expected: "Compiled successfully" with zero errors
npm run dev          # Expected: server starts at localhost:3000
npx tsc --noEmit     # Expected: zero type errors
```

### Final Checklist
- [ ] All 11 "Must Have" items verified present
- [ ] All 11 "Must NOT Have" guardrails verified absent
- [ ] Site renders correctly at 375px and 1440px viewports
- [ ] All scroll animations trigger on viewport entry (not on page load)
- [ ] Contact form validates and shows success/error feedback
- [ ] `npm run build` passes with zero errors
- [ ] All evidence screenshots captured in `.sisyphus/evidence/`
