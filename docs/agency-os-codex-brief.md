# Highridge Agency OS — Codex Build Brief

## Recommendation on `lead-scraper`

Do **not** use `lead-scraper` as the primary foundation for the full Agency OS.

Use it as a **source module** for these pieces only:
- local lead search workflow
- lead data typing patterns
- AI-assisted lead scoring concepts
- Twilio missed-call capture / SMS follow-up flow

Reason:
- it is already a focused lead-generation app with Next.js, Supabase, Twilio, and lead-oriented routes
- but it is still too narrow for the full agency operating system
- its current shape is closer to a lead acquisition tool than a coherent sales + scoping + onboarding + delivery platform

## Product boundary

Build **Phase 1** only.

Phase 1 includes:
- auth
- dashboard
- leads / pipeline
- discovery intake
- proposal builder
- won deal -> onboarding handoff
- basic internal project visibility

Do **not** fully build in Phase 1:
- client portal
- deep SEO planner
- reporting suite
- SOP library
- large AI orchestration layer
- broad automation surface

Architect for those later, but do not let them dilute Phase 1 quality.

## Stack and framework

### Core framework
- **Next.js App Router**
- **TypeScript**
- **React 19**
- **Tailwind CSS**

### Recommended application stack
- **Next.js** for product shell, routing, server actions, protected pages, and API endpoints
- **Supabase** for auth, PostgreSQL, storage, row-level security, and fast iteration
- **Prisma** only if relational modeling becomes complex enough to justify it; otherwise keep Supabase + SQL migrations for speed
- **Zod** for validation across forms, server actions, API inputs, and AI payloads
- **Resend** for transactional email
- **Twilio** for missed-call SMS and lead follow-up workflows
- **TanStack Table** for dense internal data views where needed
- **shadcn/ui** or equivalent reusable primitives for admin UX consistency
- **Vercel** for deployment

### Why this stack
This gives the fastest credible path for an internal operating system without overcommitting to enterprise complexity.

It also matches the existing direction in `lead-scraper`, which already shows:
- Next.js app structure
- Supabase integration
- Twilio webhook handling
- lead data types

## Architecture direction

### App split
Create one product with these bounded contexts:

1. **lead-gen**
   - imports or adapts useful `lead-scraper` logic
   - handles search, capture, score, first-touch workflows

2. **sales**
   - leads
   - pipeline stages
   - activities
   - discovery notes
   - qualification

3. **scoping**
   - intake brief
   - proposal builder
   - assumptions
   - exclusions
   - pricing blocks
   - risk flags

4. **handoff**
   - won proposal to onboarding workspace
   - required assets
   - credentials
   - kickoff readiness

5. **delivery-lite**
   - internal project status
   - blockers
   - approvals
   - milestones

### Rule
Do not let lead-generation concerns define the entire schema. The Agency OS is not a scraper app with extra pages. It is a sales-to-delivery system that happens to include lead generation.

## Data model priorities

Implement these first:
- users
- accounts / organizations
- contacts
- leads
- lead_activities
- discovery_sessions
- intake_briefs
- proposals
- proposal_versions
- proposal_scope_items
- proposal_assumptions
- proposal_exclusions
- onboarding_workspaces
- onboarding_items
- projects
- project_blockers
- approvals

### Lead-specific imports from `lead-scraper`
Keep these concepts, but expand them:
- status
- score
- priority
- AI summary
- AI score explanation
- outreach draft

Add missing agency fields:
- budget range
- timeline
- services requested
- fit score
- source channel
- discovery scheduled
- decision maker status
- proposal status
- close probability
- lost reason

## Required route structure

```txt
/app
  /(marketing)
  /(auth)
  /dashboard
  /leads
  /leads/[id]
  /discovery
  /discovery/[id]
  /proposals
  /proposals/[id]
  /onboarding
  /onboarding/[id]
  /projects
  /projects/[id]
  /settings
  /api
    /webhooks/twilio/missed-call
    /lead-search
    /ai/extract-brief
    /ai/draft-proposal
```

## Build sequence for Codex

### Section 1 — foundation
Build:
- auth
- protected layout
- role model
- database schema
- seed data
- dashboard shell

### Section 2 — leads and pipeline
Build:
- lead list
- lead detail
- lead activities timeline
- status pipeline
- filters
- fit and urgency scoring

### Section 3 — discovery and intake
Build:
- discovery note capture
- structured intake form
- AI extraction into intake brief
- unresolved questions list
- risk detection flags

### Section 4 — proposal builder
Build:
- internal proposal editor
- reusable scope blocks
- assumptions and exclusions
- investment and timeline sections
- internal-only risk and margin notes
- client-safe proposal view

### Section 5 — onboarding handoff
Build:
- proposal won flow
- onboarding workspace creation
- asset requests
- content requests
- access tracking
- kickoff readiness state

### Section 6 — delivery-lite
Build:
- project shell from sold work
- milestones
- blockers
- approvals
- status health

## What to reuse from `lead-scraper`

Reuse only when it clearly fits:
- route patterns for lead search
- lead typing ideas
- Twilio missed-call webhook pattern
- Supabase environment/config direction

Do **not** blindly preserve:
- current route naming if it conflicts with the Agency OS structure
- narrow scraper-first UI assumptions
- simplistic lead statuses if they block a real sales pipeline
- any schema decisions that ignore proposals, onboarding, or project handoff

## Codex instruction block

Use this exactly as the implementation instruction:

> Build **Highridge Agency OS v1** on Next.js App Router + TypeScript + Tailwind + Supabase Postgres + Zod + Resend + Twilio.
> 
> Start from the existing `lead-scraper` ideas only where they support lead capture, scoring, and missed-call automation.
> 
> Do not treat `lead-scraper` as the product architecture. Extract what is useful and reorganize the codebase around these bounded contexts: lead-gen, sales, scoping, handoff, and delivery-lite.
> 
> Fully implement only Phase 1 workflows: auth, dashboard, leads, discovery intake, proposal builder, won-deal onboarding handoff, and basic project visibility.
> 
> Architect later modules cleanly, but do not fully build them now.
> 
> Prioritize strong data modeling, protected routes, practical UI, structured workflows, and realistic seed data. Avoid shallow feature sprawl.

## Definition of done for v1

The build is only successful if it can do these end-to-end:
- create and manage leads
- qualify and move leads through stages
- capture discovery information
- turn discovery into a structured intake brief
- generate a proposal with assumptions and exclusions
- convert a won proposal into an onboarding workspace
- create a linked internal project record
- surface blockers and pending actions on the dashboard

## Final implementation warning

The fastest wrong move is trying to turn `lead-scraper` directly into the full Agency OS.

The right move is:
- **extract** what is good from it
- **reframe** the architecture around agency operations
- **ship Phase 1 deeply** before adding broad modules
