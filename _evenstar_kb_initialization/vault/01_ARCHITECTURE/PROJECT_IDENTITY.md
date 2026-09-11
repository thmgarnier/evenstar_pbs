---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#21. Project Creation|PBS — 21. Project Creation]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#10. PSS Project Base Provisioning|PSS — 10. PSS Project Base Provisioning]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#5. Project Provisioning|PMS — 5. Project Provisioning]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#18. Cross-System Identity|PMS — 18. Cross-System Identity]]"]
---

# Project identity

A common Evenstar Project UUID connects PBS plant context, PSS project/models and engineering register, and PMS delivery context. It is not an Airtable base ID or a human project code.

The initial integration registry should associate Project UUID with enabled subsystem contexts, PSS/PMS base IDs, schema/template versions and mapping metadata. Source briefs identify Supabase/Evenstar Core as the initial registry direction.

The logical shared identity is accepted. Who issues it, how partial provisioning recovers, how an existing base is connected and how ownership transfers are still unresolved. PBS consumes shared identity and need not own all provisioning.

Project metadata fields such as name/client/location can overlap between systems; a field-level registry contract must distinguish authoritative data from display copies.

## Related notes

- [[PROJECT]]
- [[PROJECT_CREATION]]
- [[OQ-010]]
- [[OQ-021]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#21. Project Creation|PBS — 21. Project Creation]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#10. PSS Project Base Provisioning|PSS — 10. PSS Project Base Provisioning]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#5. Project Provisioning|PMS — 5. Project Provisioning]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#18. Cross-System Identity|PMS — 18. Cross-System Identity]]

## Related requirements

- [[INT-REQ-001]]
