# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server (Next.js)
pnpm build      # Production build
pnpm check      # TypeScript type-check (no emit)
pnpm format     # Prettier format all files
```

No test suite — `pnpm check` is the primary correctness gate.

## Architecture

This is a **Next.js 15 App Router** marketing site for High Ridge Web Design, a local web design agency in Sylva, NC. React 19, Tailwind v4, TypeScript strict mode. Deployed to Vercel.

### Route structure

- `/` — single-page marketing site, composed of section components stacked in `app/page.tsx`
- `/demos`, `/demos/demo-{conversion,premium,creative}` — standalone demo concepts for prospective clients
- `/privacy` — privacy policy
- `/api/contact` — contact form handler (Resend email delivery)
- `/api/audit` — website audit tool (`runtime = "nodejs"` required for SQLite/Node APIs)

Old `/services`, `/results`, `/about`, `/contact` paths redirect to `/#anchor` via `next.config.ts`.

### Component layout

`components/` holds all page-section components (Navbar, Footer, HeroSection, ServicesSection, etc.). `components/ui/` holds Radix-based primitives (shadcn-style). Use `cn()` from `@/lib/utils` for conditional class merging.

### Path aliases

- `@/*` → repo root
- `@shared/*` → `./shared/`

### Shared / server split

- `shared/` — isomorphic: Zod schemas and types safe to import from both client and server (contact form schema in `shared/contact.ts`, audit schema in `shared/audit.ts`)
- `server/` — Node.js-only: SQLite lead storage (`server/leads.ts`, `data/leads.sqlite`) and website audit crawler (`server/audit.ts`). Import only from API routes with `runtime = "nodejs"`.

### Contact form flow

`ContactSection` → `POST /api/contact` → validates with `shared/contact.ts` schema → sends via Resend API. Requires env vars `RESEND_API_KEY` and `RESEND_FROM_EMAIL`. Honeypot field `botcheck` silently accepts bots. Falls back gracefully with phone/email instructions when Resend is unconfigured.

### Design tokens

Dark-only theme. Brand palette uses oklch: `brand-orange` (primary CTA), `brand-amber`, `brand-gold`, `brand-dark`/`brand-darker` (backgrounds). Heading font is `font-serif` (Georgia). Tokens are defined in `app/globals.css` under `@theme inline`.

### `agency-os/` subdirectory

A separate Next.js app living inside the repo — unrelated to the main site. Ignore it unless explicitly working on it.
