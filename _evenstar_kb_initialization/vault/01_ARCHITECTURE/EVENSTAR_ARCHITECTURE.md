---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#4. Core Ownership|PBS — 4. Core Ownership]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#16. Supabase / PostgreSQL|PBS — 16. Supabase / PostgreSQL]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#20. APIs / Events|PBS — 20. APIs / Events]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#28. Initial Technical Direction|PBS — 28. Initial Technical Direction]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#35. Accepted Historical Decisions|PBS — 35. Accepted Historical Decisions]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#36. Decisions Requiring Reconciliation|PBS — 36. Decisions Requiring Reconciliation]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#2. Relationship to Evenstar|PSS — 2. Relationship to Evenstar]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#16. Integration Architecture|PSS — 16. Integration Architecture]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#3. Airtable as PMS Application Layer|PMS — 3. Airtable as PMS Application Layer]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#16. PSS Base vs PMS Base|PMS — 16. PSS Base vs PMS Base]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#20. Integration Layer|PMS — 20. Integration Layer]]"]
---

# Evenstar architecture

Evenstar separates canonical plant definition, engineering computation and project delivery while sharing stable project and object identities.

- [[PBS_HOME|PBS]] owns plant objects, hierarchy, physical relationships, geometry and plant revisions.
- [[PSS_HOME|PSS]] owns models, solver configuration, input snapshots, studies and calculation results; its Project Data domain owns reusable inputs that are not already PBS-owned.
- [[PMS_HOME|PMS]] owns deliverables, document-control metadata, reviews, approvals and delivery state.

The initial canonical data backbone is Supabase/PostgreSQL. PSS and PMS use distinct Airtable domains through stable identity mappings and adapters. This is a logical architecture, not proof of provisioned services or a commitment to microservices.

Design sequence: engineering behavior → domain model → responsible system → interface and change semantics → implementation technology. The canonical model and representative integration examples precede sophisticated interfaces.

Architecture maturity is uneven: subsystem boundaries and identity are settled; exact schemas, revision semantics and integration protocols are open. See [[TECHNOLOGY_REGISTER]] for commitment levels and [[OPEN_ARCHITECTURE_QUESTIONS]] for unresolved contracts.

## Related notes

- [[SYSTEM_BOUNDARIES]]
- [[DATA_OWNERSHIP]]
- [[CANONICAL_IDENTITY]]
- [[PROJECT_IDENTITY]]
- [[INTEGRATION_ARCHITECTURE]]
- [[HISTORICAL_ARCHITECTURE]]
- [[ADR_INDEX]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#4. Core Ownership|PBS — 4. Core Ownership]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#16. Supabase / PostgreSQL|PBS — 16. Supabase / PostgreSQL]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#20. APIs / Events|PBS — 20. APIs / Events]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#28. Initial Technical Direction|PBS — 28. Initial Technical Direction]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#35. Accepted Historical Decisions|PBS — 35. Accepted Historical Decisions]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#36. Decisions Requiring Reconciliation|PBS — 36. Decisions Requiring Reconciliation]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#2. Relationship to Evenstar|PSS — 2. Relationship to Evenstar]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#16. Integration Architecture|PSS — 16. Integration Architecture]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#3. Airtable as PMS Application Layer|PMS — 3. Airtable as PMS Application Layer]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#16. PSS Base vs PMS Base|PMS — 16. PSS Base vs PMS Base]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#20. Integration Layer|PMS — 20. Integration Layer]]

## Related requirements

- [[EV-REQ-009]]
