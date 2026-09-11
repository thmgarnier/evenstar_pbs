---
type: "workflow"
status: "proposed"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "workflow"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#21. Project Creation|PBS — 21. Project Creation]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#10. PSS Project Base Provisioning|PSS — 10. PSS Project Base Provisioning]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#4. One PMS Base Per Project|PMS — 4. One PMS Base Per Project]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#5. Project Provisioning|PMS — 5. Project Provisioning]]"]
---

# Evenstar project creation

**Trigger:** Create or connect an Evenstar project.

## Flow

1. Establish a canonical Project UUID and plant context.
2. Configure enabled PSS/PMS contexts; provision or connect separate project bases under their selected template/schema versions.
3. Register project/base/model mappings in the canonical integration registry.
4. Expose the project to users without ordinary manual table-ID mapping.

## Ownership and exceptions

Shared identity is accepted; the provisioning service, PMS base cardinality confirmation, platform capability and partial-failure recovery are unresolved. This flow is intended behavior, not an implemented wizard. Do not invent a completed project when one base failed.

## Intended completion evidence

One traceable project identity and explicit subsystem/base mappings; creation/connect outcomes are visible.

## Related notes

- [[WORKFLOWS_INDEX]]
- [[PROJECT_IDENTITY]]
- [[OQ-010]]
- [[OQ-011]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#21. Project Creation|PBS — 21. Project Creation]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#10. PSS Project Base Provisioning|PSS — 10. PSS Project Base Provisioning]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#4. One PMS Base Per Project|PMS — 4. One PMS Base Per Project]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#5. Project Provisioning|PMS — 5. Project Provisioning]]

## Related requirements

- [[INT-REQ-003]]
