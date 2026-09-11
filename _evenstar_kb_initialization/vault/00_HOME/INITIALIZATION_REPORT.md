---
type: "report"
status: "recorded"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "report"]
sources: ["[[INITIALIZATION_MANDATE]]"]
---

# EVENSTAR KNOWLEDGE BASE — INITIALIZATION REPORT

## Vault structure

The supplied Evenstar directory is the vault root; no extra nested EVENSTAR folder is needed. Navigation begins at [[EVENSTAR_HOME]]. Areas: `00_HOME`, `01_ARCHITECTURE`, `02_PBS`, `03_PSS`, `04_PMS`, `05_SHARED_MODEL`, `06_WORKFLOWS`, `07_REQUIREMENTS`, `08_DECISIONS`, `09_ROADMAP`, `10_DEMOS`, `11_FUTURE`, `99_SOURCES`.

Each system has a MOC. Requirements have one canonical register per namespace and individual stable-ID notes. Questions have one durable home with system-facing indexes. Filenames are unique, avoiding ambiguous duplicate requirements notes. Sources remain intact. No Obsidian plugin is required; built-in backlinks, wikilinks, properties and Mermaid support navigation.

## Key principles extracted

One engineering object, many representations; create engineering information once and reuse it everywhere; start from Project, not from scratch; the project knows what it already knows; PBS defines the plant/PSS computes behavior/PMS delivers the project; explicit authoritative ownership; open-source-first; human engineering control; compute at solver resolution and publish at engineering resolution. See [[EVENSTAR_PRINCIPLES]].

## Accepted decisions

16 current accepted ADRs capture subsystem boundaries, stable UUIDs, tags as attributes, shared representations, ownership, initial canonical Supabase/PostgreSQL backbone, separate bases, per-project PSS register, no silent PBS mutation, hydraulic topology reuse, explicit proposals, deliverable-centered PMS, selected evidence, open core, explicit Project Data/reproducible runs and historical scope evolution. 7 historical accepted-decision summaries are preserved separately. See [[ADR_INDEX]].

One PMS base per project remains a preferred proposal in [[OQ-011]], because its source does not conclusively settle it. Exact APIs/events, physical schemas, frontend/renderer/engine choices and provisioning are not accepted implementation decisions.

## Requirements extracted

59 requirements: 52 accepted intended behaviors and 7 proposed behaviors across EV, PBS, PSS, PMS and INT. Each has a stable ID, source links, related concepts and acceptance criteria. All product implementation status is unverified. See [[REQUIREMENTS_INDEX]].

## Open questions

24 grouped questions preserve the source uncertainties. Highest priorities include canonical facets/ports/lines/streams, field ownership, plant revisions/change-review handoff, hydraulic extraction, input snapshots/write conflicts, provisioning, document/revision/file authority and actual implementation evidence. See [[OPEN_QUESTIONS]].

## Conflicts discovered

The current briefs agree on their core boundary. [[CONFLICT_REGISTER]] preserves one historical-scope conflict and three unresolved ownership/interface overlaps: document metadata/storage, PBS/PMS change review/application, and physical equipment metadata versus reusable PSS input fields. These are not silently decided.

## Historical architecture requiring reconciliation

The seven earlier PBS demos are preserved in [[HISTORICAL_ARCHITECTURE]]. [[ADR-016]] applies the current subsystem boundary while leaving detailed control, provisioning and review migration open. No implemented migration is claimed; original full historical ADRs were not supplied.

## Missing information

No inspected code, deployment, Airtable schema/base, validated solver result or implementation-test evidence establishes the current software state. Original historical decision dates/texts, exact domain/API/schema contracts, permission mapping, document storage, numerical reference data, named owners and delivery dates are missing. [[CURRENT_STATE]] separates this uncertainty from vision and plans.

## Recommended next architectural task

After user review, define a worked shared-model/ownership/revision contract for a pump, connected pipe network, one reproducible PSS calculation and one controlled PMS deliverable. Resolve object/port/line/stream semantics and field owners, then specify topology extraction, immutable run evidence and proposal/promotion paths. This is an architecture task; do not begin product implementation yet.

## Verification and placement

See [[CONSISTENCY_REVIEW]] for source byte/hash checks, link/anchor validation, unique IDs, metadata, Home reachability and source-section coverage. Publication to the requested vault is recorded after destination verification in that review. The initialization created project knowledge only; no product code, database, Airtable base or automation was implemented.

## Related notes

- [[EVENSTAR_HOME]]
- [[CONSISTENCY_REVIEW]]
- [[SOURCE_INDEX]]

## Source

- [[INITIALIZATION_MANDATE]]
