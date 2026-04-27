# High Ridge Web Design — Codex Implementation Plan

## Overview

This plan migrates the site from a Vite + Express SPA to Next.js 15 (App Router), then adds trust-building components on top. Execute phases in order. Do not skip ahead.

**Current stack:** React 19 + Vite 7 + Express dev server + Tailwind v4 + wouter routing + Vercel deployment  
**Target stack:** Next.js 15 (App Router) + Tailwind v4 + Vercel deployment  
**Package manager:** pnpm

---

## Phase 0 — Next.js Migration

This is the foundation. Complete all steps before moving to Phase 1.

### Step 0.1 — Install / Remove Dependencies

```bash
pnpm add next@15
pnpm remove express vite @vitejs/plugin-react @tailwindcss/vite tsx esbuild wouter
pnpm remove @builder.io/vite-plugin-jsx-loc vite-plugin-manus-runtime vitest
```

Keep everything else: React 19, Radix UI, lucide-react, zod, tailwindcss, framer-motion, etc.

### Step 0.2 — Update `package.json` Scripts

Replace the scripts block with:
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "check": "tsc --noEmit",
  "format": "prettier --write ."
}
```

### Step 0.3 — Create `next.config.ts`

Create at repo root:
```ts
import type { NextConfig } from "next";

const config: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-site" },
        ],
      },
    ];
  },
};

export default config;
```

### Step 0.4 — Update `tsconfig.json`

Replace the full `tsconfig.json` at repo root with a standard Next.js config. The critical change is `@/*` must resolve from repo root (not `client/src/`):
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "client", "server", "dist"]
}
```

### Step 0.5 — Move Files to New Locations

Move (do not delete originals yet — move means `git mv` or copy then delete):

| From | To |
|------|----|
| `client/src/components/` | `components/` |
| `client/src/hooks/` | `hooks/` |
| `client/src/contexts/` | `contexts/` |
| `client/src/lib/` | `lib/` |
| `client/public/` | `public/` |

After moving, all `@/components/...` imports in components will resolve correctly because `@/*` now maps to repo root.

Do NOT move `client/src/pages/` — these will be rewritten as `app/` routes (see Step 0.7).  
Do NOT move `client/src/index.css` — this becomes `app/globals.css` (see Step 0.6).  
Do NOT move `client/src/main.tsx` — it is replaced by `app/layout.tsx`.

### Step 0.6 — Create `app/globals.css`

Copy `client/src/index.css` content to `app/globals.css` exactly as-is. Tailwind v4's `@import "tailwindcss"` syntax works unchanged in Next.js.

### Step 0.7 — Create App Router Directory Structure

Create the following files:

#### `app/layout.tsx`
```tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "High Ridge Web Design | Contractor Websites That Generate Leads and Booked Jobs",
  description:
    "High Ridge Web Design builds conversion-focused websites for contractors and service businesses that need more qualified leads, booked calls, and revenue growth.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Navbar />
        </header>
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

#### `app/page.tsx`
This replaces `client/src/pages/Home.tsx`. Remove Navbar/Footer (they are in layout now). Add the JSON-LD schema via a `<script>` tag inside a Server Component:
```tsx
import HeroSection from "@/components/HeroSection";
import OpportunityScorecard from "@/components/OpportunityScorecard";
import ProofBar from "@/components/ProofBar";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ResultsSection from "@/components/ResultsSection";
import ContactSection from "@/components/ContactSection";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "High Ridge Web Design",
  url: "https://www.highridgewebdesign.com/",
  telephone: "+1-828-598-9262",
  email: "jeremy@highridgewebdesign.com",
  areaServed: ["Western North Carolina", "Sylva, NC"],
  description:
    "High Ridge Web Design builds conversion-focused websites and lead generation systems for contractors and local service businesses.",
  sameAs: [],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <HeroSection />
      <OpportunityScorecard />
      <ProofBar />
      <ServicesSection />
      <AboutSection />
      <ResultsSection />
      <ContactSection />
    </>
  );
}
```

#### `app/not-found.tsx`
Port the content of `client/src/pages/NotFound.tsx` here. This is Next.js's automatic 404 handler.

#### `app/demos/page.tsx`
Port the content of `client/src/pages/demo.tsx` here. Add `"use client"` at top if the demo page uses any React hooks or event handlers.

### Step 0.8 — Add `"use client"` to Interactive Components

Any component that uses React hooks (`useState`, `useEffect`, `useRef`, etc.) or DOM event handlers must have `"use client"` as the first line.

Add `"use client"` to these components:
- `components/Navbar.tsx`
- `components/HeroSection.tsx`
- `components/ContactSection.tsx`
- `components/OpportunityScorecard.tsx`
- `components/ComparisonVisual.tsx`
- `components/ScrollReveal.tsx` (uses IntersectionObserver / hooks)
- `components/Map.tsx`
- `components/BrandLogo.tsx` (if it has any interactivity)
- `contexts/ThemeContext.tsx`

Static/pure render components do NOT need `"use client"`:
- `components/ProofBar.tsx`
- `components/ServicesSection.tsx`
- `components/AboutSection.tsx`
- `components/ResultsSection.tsx`
- `components/Footer.tsx`

If unsure, add `"use client"` — it is safe to be conservative here. The performance difference for this marketing site is negligible.

### Step 0.9 — Migrate API Routes

Create Next.js Route Handlers to replace the Express routes and the `api/contact.ts` Vercel function.

#### `app/api/contact/route.ts`

Port the logic from `api/contact.ts`. The handler signature changes from Vercel's format to Next.js Route Handler format:

```ts
import { NextRequest, NextResponse } from "next/server";

// ... port all helper functions from api/contact.ts unchanged ...

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = parseContactPayload(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "VALIDATION_ERROR", message: "Please check the highlighted fields and try again.", issues: parsed.issues },
      { status: 400 }
    );
  }

  const { payload } = parsed;

  if (payload.botcheck) {
    return NextResponse.json({ ok: true, accepted: true }, { status: 202 });
  }

  try {
    logLead(payload);
    const result = await sendWithResend(payload);
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error, message: result.message },
        { status: result.status }
      );
    }
    return NextResponse.json({ ok: true, message: "Your request was sent." });
  } catch (error) {
    console.error("Contact form failed", error);
    return NextResponse.json(
      { ok: false, error: "INTERNAL_ERROR", message: fallbackMessage() },
      { status: 500 }
    );
  }
}
```

Port all private helpers (`parseContactPayload`, `sendWithResend`, `logLead`, `fallbackMessage`, `formatLeadEmail`) from `api/contact.ts` into this file unchanged.

#### `app/api/audit/route.ts`

Port the `/api/audit` handler from `server/index.ts`. Add Node.js runtime directive because `server/audit.ts` uses `cheerio` (Node-only):

```ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auditRequestSchema } from "@/shared/audit";
import { runWebsiteAudit } from "@/server/audit";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const parsed = auditRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "INVALID_URL", message: parsed.error.issues[0]?.message ?? "A valid URL is required." },
      { status: 400 }
    );
  }

  try {
    const audit = await runWebsiteAudit(parsed.data.url);
    return NextResponse.json({ ok: true, audit });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Audit failed", { url: parsed.data.url, message });

    if (message.includes("Invalid URL"))
      return NextResponse.json({ ok: false, error: "INVALID_URL", message: "The submitted URL is not valid." }, { status: 400 });
    if (message.includes("timed out"))
      return NextResponse.json({ ok: false, error: "FETCH_FAILED", message: "The site did not respond in time." }, { status: 504 });
    if (message.includes("Non-HTML"))
      return NextResponse.json({ ok: false, error: "NON_HTML_RESPONSE", message: "The URL did not return an HTML page." }, { status: 422 });
    if (message.match(/ENOTFOUND|ECONNREFUSED|ECONNRESET|HTTP [45]/))
      return NextResponse.json({ ok: false, error: "FETCH_FAILED", message: "Unable to reach the submitted site." }, { status: 502 });

    return NextResponse.json({ ok: false, error: "AUDIT_FAILED", message: "The audit could not be completed." }, { status: 500 });
  }
}
```

#### `app/api/leads/route.ts` (if `server/leads.ts` exists)

Port the `/api/leads` handler from `server/index.ts` using the same Route Handler pattern.

### Step 0.10 — Update Component Imports (if any reference old paths)

Search for any import that references `client/src/` explicitly and update to use `@/` aliases. Most should already use `@/` which will resolve correctly with the updated tsconfig.

Any import of `wouter` (`import { Link, Route } from "wouter"`) must be replaced:
- `<Link href="/demos">` → `import Link from "next/link"; <Link href="/demos">`
- `useLocation()` → `import { useRouter } from "next/navigation"; const router = useRouter();`
- `<Route>` / `<Switch>` → not needed; App Router handles this via the `app/` directory

### Step 0.11 — Update `usePageMeta` Hook (or Remove It)

The `client/src/hooks/usePageMeta.tsx` hook uses `document.title` and `<meta>` tags imperatively. In Next.js, page metadata is handled declaratively via the `metadata` export in `app/page.tsx` and `app/layout.tsx`.

- Remove uses of `usePageMeta` from all page components
- Each `app/**/page.tsx` can export its own `metadata` or `generateMetadata` function instead
- Delete `hooks/usePageMeta.tsx` after removing all usages

### Step 0.12 — Remove Old Directories

After confirming `pnpm dev` starts and the site loads correctly:
- Delete `client/` directory
- Delete `server/index.ts` (API routes are now in `app/api/`)
- Delete `api/contact.ts` (replaced by `app/api/contact/route.ts`)
- Delete `vite.config.ts`

### Step 0.13 — `postcss.config.js`

Next.js uses PostCSS. Create at repo root:
```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Also ensure `pnpm add -D @tailwindcss/postcss` is run if not already present (Tailwind v4 requires this for PostCSS).

### Acceptance Criteria for Phase 0
- `pnpm dev` starts the Next.js dev server on port 3000
- Home page loads with all sections visible
- `/demos` route loads correctly
- Contact form submits and sends email via Resend
- `/api/audit` endpoint responds to POST requests
- `pnpm check` passes with no TypeScript errors
- No references to `wouter`, `vite`, or `express` remain in active source files

---

## Phase 1 — Trust Fixes (No New Files)

**Two file edits. Zero new files.**

### `components/AboutSection.tsx`

Find the stats array (look for `label: "Client Rating"`). Replace:
```tsx
{ label: "Client Rating", val: "5.0" },
{ label: "WNC Rooted", val: "Local" },
{ label: "Personal Accountability", val: "100%" }
```
With:
```tsx
{ label: "Niche", val: "Contractors" },
{ label: "Home Base", val: "WNC" },
{ label: "Your Contact", val: "Founder" },
```

No other changes.

**Why:** "5.0 Client Rating" with zero clients is deceptive and erodes trust when a visitor notices there are no reviews to back it up. "Niche / Home Base / Your Contact" are honest differentiators — specificity, local presence, direct accountability.

---

### `components/ProofBar.tsx`

Full rewrite. Keep the outer section shell (aria-label, border lines, container, grid). Replace data and render internals.

**New `proofItems` array** (remove old one and all lucide icon imports):
```tsx
const proofItems = [
  {
    stat: "53%",
    description: "of mobile visitors abandon a site that takes over 3 seconds to load",
    source: "Google / SOASTA",
  },
  {
    stat: "76%",
    description: "of people who search locally visit a business within 24 hours",
    source: "Google Consumer Insights",
  },
  {
    stat: "2–3%",
    description: "average conversion rate for an unoptimized local service website",
    source: "CRO Industry Data",
  },
];
```

**New cell render** (replace the old `.map` block):
```tsx
{proofItems.map((item, index) => (
  <div
    key={item.stat}
    className="relative flex flex-col gap-3 px-6 py-8 md:px-8"
  >
    {index > 0 && (
      <div className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent md:left-0 md:right-auto md:top-5 md:h-[calc(100%-2.5rem)] md:w-px md:bg-gradient-to-b" />
    )}
    <span className="text-4xl font-black text-brand-orange leading-none">
      {item.stat}
    </span>
    <p className="text-sm text-foreground/70 leading-relaxed">
      {item.description}
    </p>
    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
      {item.source}
    </span>
  </div>
))}
```

Replace the bottom `<p>` tagline with: `"The math: high local intent bleeds out through slow loads and an unoptimized conversion path."`

Remove all lucide icon imports — the new layout uses no icons.

**Acceptance Criteria Phase 1:**
- No "5.0", "Client Rating", or "100%" in AboutSection
- ProofBar shows three large orange numbers (53%, 76%, 2–3%) with body text and source labels
- `pnpm check` passes

---

## Phase 2 — LeadImpactCalculator

**One new file. Two lines added to `app/page.tsx`.**

### Create `components/LeadImpactCalculator.tsx`

This is a client component (uses `useState`). Add `"use client"` as the first line.

**Full implementation:**

```tsx
"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const TYPICAL_CVR = 0.023;
const OPTIMIZED_CVR = 0.08;

function scrollToContact() {
  const el = document.querySelector("#contact");
  if (!el) { window.location.href = "/#contact"; return; }
  const offset = 120;
  const target = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: target, behavior: "smooth" });
}

function fmt(n: number): string {
  if (n >= 10000) return "$" + Math.round(n / 1000) + "k";
  if (n >= 1000) return "$" + (n / 1000).toFixed(1) + "k";
  return "$" + n.toLocaleString("en-US");
}

export default function LeadImpactCalculator() {
  const [visitors, setVisitors] = useState(300);
  const [jobValue, setJobValue] = useState(2500);

  const currentLeads = Math.round(visitors * TYPICAL_CVR);
  const optimizedLeads = Math.round(visitors * OPTIMIZED_CVR);
  const currentRevenue = currentLeads * jobValue;
  const optimizedRevenue = optimizedLeads * jobValue;
  const revenueGap = optimizedRevenue - currentRevenue;
  const leadGap = optimizedLeads - currentLeads;

  return (
    <section
      id="lead-calculator"
      className="relative py-20 md:py-24 overflow-hidden bg-[oklch(0.095_0.018_260)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute left-1/3 top-1/4 h-72 w-96 -translate-x-1/2 rounded-full bg-brand-orange/[0.04] blur-3xl" />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-[0.28em] text-brand-orange/70">
              Revenue Reality Check
            </span>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-white md:text-5xl">
              How Much Are You Leaving on the Table?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/65 md:text-lg">
              Use your own numbers. See the gap between a typical local site and a
              conversion-optimized build.
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Controls */}
          <ScrollReveal delay={120}>
            <div className="rounded-2xl border border-white/10 bg-[oklch(0.14_0.02_260)] p-7 space-y-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Your Inputs</p>
                <p className="text-sm text-foreground/60 mt-1">Adjust to match your business</p>
              </div>

              {/* Visitors slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <label className="text-sm font-semibold text-white">Monthly Website Visitors</label>
                  <span className="text-lg font-black text-brand-orange">{visitors.toLocaleString()}</span>
                </div>
                <input
                  type="range" min={50} max={2000} step={50} value={visitors}
                  onChange={e => setVisitors(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10"
                  style={{ accentColor: "oklch(0.72 0.19 50)" }}
                />
                <div className="flex justify-between text-xs text-white/25">
                  <span>50</span><span>2,000</span>
                </div>
              </div>

              {/* Job value slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <label className="text-sm font-semibold text-white">Average Job Value</label>
                  <span className="text-lg font-black text-brand-orange">{fmt(jobValue)}</span>
                </div>
                <input
                  type="range" min={500} max={10000} step={250} value={jobValue}
                  onChange={e => setJobValue(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10"
                  style={{ accentColor: "oklch(0.72 0.19 50)" }}
                />
                <div className="flex justify-between text-xs text-white/25">
                  <span>$500</span><span>$10,000</span>
                </div>
              </div>

              {/* Static rate facts */}
              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/50">Typical local service site</span>
                  <span className="font-black text-white/50">2.3%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/50">Conversion-optimized build</span>
                  <span className="font-black text-brand-orange">8%+</span>
                </div>
                <p className="text-[11px] text-white/25 pt-1">
                  Industry averages. Results vary by market, traffic quality, and service type.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Results */}
          <ScrollReveal delay={240}>
            <div className="space-y-4">

              {/* Hero gap */}
              <div className="relative overflow-hidden rounded-2xl border border-brand-orange/25 bg-gradient-to-br from-brand-orange/[0.12] to-transparent p-7 text-center shadow-[0_30px_80px_-48px_rgba(255,106,0,0.9)]">
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-orange/60 to-transparent" />
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-brand-amber/70 mb-3">
                  Monthly Revenue Gap
                </p>
                <div className="text-5xl md:text-6xl font-black text-brand-orange leading-none">
                  {fmt(revenueGap)}
                </div>
                <p className="mt-3 text-sm text-foreground/55">
                  estimated monthly revenue left on the table
                </p>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/10 bg-[oklch(0.14_0.02_260)] p-5 space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-white/35 font-bold">Typical Site</p>
                  <p className="text-2xl font-black text-white/50">
                    {currentLeads}<span className="text-sm font-semibold text-white/25"> leads/mo</span>
                  </p>
                  <p className="text-xs text-white/30">at 2.3% conversion</p>
                  <p className="text-sm text-white/35">{fmt(currentRevenue)}/mo</p>
                </div>
                <div className="rounded-xl border border-brand-orange/20 bg-brand-orange/[0.07] p-5 space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-brand-amber/60 font-bold">Optimized Build</p>
                  <p className="text-2xl font-black text-brand-orange">
                    {optimizedLeads}<span className="text-sm font-semibold text-brand-orange/50"> leads/mo</span>
                  </p>
                  <p className="text-xs text-foreground/40">at 8% conversion</p>
                  <p className="text-sm text-brand-orange/70">{fmt(optimizedRevenue)}/mo</p>
                </div>
              </div>

              {/* Lead gain callout */}
              <div className="rounded-xl border border-white/10 bg-[oklch(0.14_0.02_260)] p-4 flex items-center gap-3">
                <ArrowRight className="w-5 h-5 text-brand-orange shrink-0" />
                <p className="text-sm text-white">
                  <span className="font-black text-brand-orange">{leadGap} more leads</span> per month at your job value
                </p>
              </div>

              <button
                type="button"
                onClick={scrollToContact}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-4 text-sm font-black text-white shadow-[0_18px_45px_rgba(255,106,0,0.25)] transition-all hover:-translate-y-0.5 hover:bg-brand-orange-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Close This Gap — Book a Free Audit
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="text-center text-xs text-foreground/35">
                Industry averages. Results vary by market, traffic quality, and service type.
              </p>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
```

### Update `app/page.tsx`

Add import:
```tsx
import LeadImpactCalculator from "@/components/LeadImpactCalculator";
```

Insert `<LeadImpactCalculator />` between `<ProofBar />` and `<ServicesSection />`.

**Final section order:**
```
<HeroSection />
<OpportunityScorecard />
<ProofBar />
<LeadImpactCalculator />    ← new
<ServicesSection />
<AboutSection />
<ResultsSection />
<ContactSection />
```

**Acceptance Criteria Phase 2:**
- Default (300 visitors, $2,500 job): currentLeads=7, optimizedLeads=24, gap=17, revenueGap=$42,500
- Both sliders update all values in real time
- CTA scrolls to `#contact`
- `pnpm check` passes

---

## Phase 3 — Methodology Transparency + FAQ

**Two file edits. One new file.**

### `components/AboutSection.tsx`

Add `CheckCircle2` to the lucide-react import.

After the italic quote block (the `<div className="relative">` containing the orange left-bar and italic text), insert:

```tsx
<ul className="space-y-3 mt-8">
  {[
    "Contractor-niche only — no lifestyle brands, no e-commerce, no generalist work",
    "Direct founder involvement on every build — no junior handoffs",
    "Revenue-first design — every decision traces back to calls and booked jobs",
  ].map((point) => (
    <li key={point} className="flex items-start gap-3 text-base text-foreground/70">
      <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-1" />
      {point}
    </li>
  ))}
</ul>
```

### Create `components/FAQSection.tsx`

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  {
    q: "Do you have past client examples I can look at?",
    a: "We have live demo sites built to show exactly how a contractor website performs — every layout decision, CTA, and speed optimization is real and measurable. Visit /demos to explore them. Client case studies will be added here as projects launch.",
  },
  {
    q: "Why should I hire someone without a long client list?",
    a: "Because you're not buying a portfolio — you're buying a system. The strategy behind this site (fast load, clear trust signals, local SEO structure, direct CTAs) is the same system we build for clients. You're looking at it right now.",
  },
  {
    q: "How long does a website build take?",
    a: "Typically 3–5 weeks from signed agreement to launch. That covers discovery, design, build, revision rounds, and deployment. We don't stretch projects across months.",
  },
  {
    q: "Do you work with businesses outside Western NC?",
    a: "Yes. We're based in Sylva, NC, but we work with contractors and service businesses remotely across the US. If you're a fit for the system, location doesn't matter.",
  },
  {
    q: "What happens after the site launches?",
    a: "We hand off a working lead system — not a static page. You get training on the site, review request workflows, and a clear path to ongoing SEO content if you want it. Support is not a locked tier.",
  },
  {
    q: "What if I already have a website?",
    a: "Most of our work is rebuilds, not blank-slate builds. We audit what you have, keep what works, and replace what's costing you leads. The free audit call is designed to answer this for your specific situation.",
  },
  {
    q: "How is this different from a $500 Wix site?",
    a: "Speed, structure, and intent. Wix templates render slowly, rank poorly in local search, and give visitors no clear reason to call. We build on a custom stack optimized for Core Web Vitals, with every section written around your specific services and buyer psychology.",
  },
];

export default function FAQSection() {
  return (
    <section
      id="faq"
      className="relative py-20 md:py-24 bg-[oklch(0.12_0.02_260)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-[0.28em] text-brand-orange/70">
              Common Questions
            </span>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-white md:text-5xl">
              Everything You Want to Know Before Reaching Out
            </h2>
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={faq.q} delay={i * 60}>
                <AccordionItem
                  value={`item-${i}`}
                  className="rounded-2xl border border-white/10 bg-[oklch(0.14_0.02_260)] px-6 overflow-hidden"
                >
                  <AccordionTrigger className="text-white font-semibold text-base py-5 hover:no-underline hover:text-brand-orange transition-colors text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/65 leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </ScrollReveal>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
```

### Update `app/page.tsx`

Add import: `import FAQSection from "@/components/FAQSection";`

Insert `<FAQSection />` between `<ResultsSection />` and `<ContactSection />`.

**Final complete section order:**
```
<HeroSection />
<OpportunityScorecard />
<ProofBar />
<LeadImpactCalculator />
<ServicesSection />
<AboutSection />
<ResultsSection />
<FAQSection />
<ContactSection />
```

**Acceptance Criteria Phase 3:**
- AboutSection shows 3 CheckCircle2 bullets below the italic quote block
- FAQ accordion opens and closes all 7 items correctly
- `pnpm check` passes
- No new npm packages added

---

## Phase 4 — Future (First Clients)

Do not implement until first paid project completes and client approves being referenced.

1. **`components/ResultsSection.tsx`** — Add testimonial blockquote using the same orange left-bar + italic style from AboutSection
2. **`components/ProofBar.tsx`** — Replace the "2–3%" cell with a real client result metric
3. **`components/FAQSection.tsx`** — Update item 1 to link to a real case study
4. **`app/layout.tsx` schema** — Add `aggregateRating` and populate `sameAs` with Google Business Profile URL
5. **`components/Navbar.tsx` + `components/Footer.tsx`** — Add `#faq` anchor link

---

## Sequencing Summary

| Phase | Files Modified | Files Created | Prerequisite |
|-------|---------------|---------------|--------------|
| 0 | package.json, tsconfig.json, all pages/components, API routes | next.config.ts, app/layout.tsx, app/page.tsx, app/not-found.tsx, app/demos/page.tsx, app/api/contact/route.ts, app/api/audit/route.ts, app/globals.css | None |
| 1 | components/AboutSection.tsx, components/ProofBar.tsx | — | Phase 0 complete |
| 2 | app/page.tsx | components/LeadImpactCalculator.tsx | Phase 0 complete |
| 3 | components/AboutSection.tsx, app/page.tsx | components/FAQSection.tsx | Phase 0 complete |
| 4 | Multiple | Optional | First client |
