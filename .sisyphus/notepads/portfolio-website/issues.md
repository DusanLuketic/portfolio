# Issues — portfolio-website

## Known Gotchas
- create-next-app scaffolds Tailwind v3 — MUST migrate to v4 immediately after scaffold
- postcss.config.mjs must be updated to use @tailwindcss/postcss (critical!)
- tailwind.config.ts MUST be deleted after scaffold
- Scaffold command uses '.' to install in current directory (not a subdirectory) — .sisyphus/ already exists
- WCAG: Electric Blue (#0066FF) on bg-neutral-950 = 4.64:1 ratio — AA for large text/UI only
- scroll-margin-top: 4rem needed on sections to prevent content hiding behind fixed navbar

## No Issues Yet
- Project started fresh

## [2026-03-13] Final Code Quality Review (F2)
- Next.js build warns that  is not set in , so OG/Twitter metadata resolves against .
-  still ships placeholder social/profile targets ( and ), so footer links are not production-ready.

- Correction: missing metadataBase in src/app/layout.tsx triggers a Next.js build warning and localhost OG/Twitter URL fallback.
- Correction: src/components/sections/Footer.tsx uses placeholder social targets (#) and a placeholder email address.

## [2026-03-13] Final Manual QA (F3)
- Mobile viewport at 375px has horizontal overflow: body/document scrollWidth = 384px while innerWidth = 375px.
- npm run build fails during page data collection for /favicon.ico with PageNotFoundError: Cannot find module for page: /favicon.ico.
