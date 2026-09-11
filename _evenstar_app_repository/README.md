# Evenstar — Plant Build System

Evenstar is an industrial engineering environment built around one rule: create engineering information once and reuse it across plant definition, simulation and project delivery.

This repository is the first PBS slice: an Object Explorer for a compact water-transfer skid. It proves canonical engineering identity, typed ports, physical topology and a reproducible Supabase data foundation. P&ID, 3D, PSS and PMS are later representations of the same objects, not separate products.

## What works

- Plant hierarchy, data-driven physical topology and object register.
- One stable UUID for each pump, vessel, valve, tank, pipe and port.
- Search by tag, UUID, name, type, system or port.
- Inspector that shows identity, engineering data and **what each nozzle connects to**.
- Keyboard: `/` or `Ctrl+K` to search, arrows to move selection, Escape to clear.
- Local seed fixture when Supabase is not configured; live read when it is.
- Explicit source and error states. No silent fake metrics.

## Local development

Requirements: Node.js 22 or later and pnpm.

```bash
pnpm install
pnpm dev
```

The app works immediately with the local read-only fixture. To read the same dataset from Supabase, copy `.env.example` to `.env.local` and fill in the project URL and **publishable** key.

## Supabase

Authoritative database files:

- `supabase/migrations/20260911000100_initial_pbs.sql`
- `supabase/seed.sql`

Apply migrations and seed data through a development Supabase project or the local Supabase CLI. Never place a Supabase secret/service key in browser code or commit it to Git.

## GitHub → v0

This repo is the source for Vercel v0. After you push it:

1. Open the GitHub repository.
2. In v0, import or attach that repo (do not start a blank chat that generates a second app).
3. Point v0 at `docs/V0_BUILD_BRIEF.md`.

v0 must extend this Next.js application and keep the Supabase schema. It must not generate a landing page, a chat bot, or a second plant database.

## Product scope

Read `docs/FIRST_SLICE.md` for acceptance checks and `docs/V0_BUILD_BRIEF.md` before extending the interface.
