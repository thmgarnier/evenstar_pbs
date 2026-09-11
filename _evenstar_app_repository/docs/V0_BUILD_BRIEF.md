# v0 handoff brief — Evenstar PBS

Use this repository as the source. Extend the existing Next.js application. Do not generate a separate product. Do not replace the Supabase schema.

## Product

Evenstar PBS defines what an industrial plant contains. The same pump, valve, vessel, pipe and port keeps one stable UUID across every representation. Human KKS/tags can change without breaking identity.

## First experience

The first screen is a working engineering surface, not a marketing page. Preserve the three-panel Object Explorer:

- left: PBS workspace navigation and plant hierarchy (equipment vs lines);
- center: data-driven physical topology plus searchable engineering-object register;
- right: selected object identity, engineering data, ports and **connectivity**.

The UI must remain dense, calm and precise, with strong typography and clear selection state. Keep the dark technical-grid visual language, teal identity accent and amber flow-direction cues. It must work on desktop and stack with Hierarchy / Plant / Inspector tabs on smaller screens.

## Data contract

Use the existing tables and fields in `supabase/migrations/20260911000100_initial_pbs.sql`.

Required client model (already implemented in `lib/domain.ts` and `lib/load-project.ts`):

- `projects`, `plants`, `systems`, `engineering_objects`, `ports`, `connections`, `pipe_segments`
- UUID primary keys; KKS/tag is a displayed human identifier, never the relational key
- topology and inspector connectivity are derived from `connections` and `pipe_segments`, not hardcoded coordinates

Do not create duplicate equipment records for P&ID or 3D. Do not let the client use a Supabase secret/service key.

## Required behavior

- Selecting an object in hierarchy, topology, register or inspector updates every other view.
- Search filters by tag, UUID, name, type, system and port.
- `/` and `Ctrl+K` focus search; arrows move the selection.
- The source indicator distinguishes live Supabase data from the local fixture.
- If Supabase fails, show the error and fall back to the fixture — do not fail silently.
- Empty search and missing-object states must be explicit.
- Inspector must answer: what is this object, what are its ports, and what does each nozzle connect to.

## Out of scope for this slice

No landing page, billing, AI chat, P&ID editor, 3D renderer, hydraulic solver, PMS workflow, generic analytics dashboard, or second database of the same equipment.
