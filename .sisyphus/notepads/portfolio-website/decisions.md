# Decisions — portfolio-website

## Architecture Decisions
- Single-page app with scroll navigation (no routing)
- Server components by default, client components only where needed
- FadeIn uses whileInView (NOT useInView hook) — simpler implementation
- Zod schema shared between Contact.tsx (client) and contact.ts (server action)

## Animation Strategy
- FadeIn: whileInView, viewport: { once: true, margin: "-100px" }
- Default direction: up (40px offset), duration 0.5s
- Hero: staggered 0, 0.2, 0.4, 0.8, 1.0 delays
- Sections: staggered 0.1 increments per element

## Contact Form Flow
- Client validates with Zod before server action fires
- Server action re-validates (defense in depth)
- useActionState manages form state (pending, success, error)
- No real Resend key needed for dev — graceful failure

## Image Strategy
- Project thumbnails: inline SVG placeholders in public/projects/
- Profile photo: public/about/profile-placeholder.svg
- All Next.js Image component (not raw img)
