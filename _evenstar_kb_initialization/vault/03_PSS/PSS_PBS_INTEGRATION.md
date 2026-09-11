---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PSS"]
aliases: []
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PSS_ASTRA#2. Relationship to Evenstar|PSS — 2. Relationship to Evenstar]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#4. Major PSS Workspaces|PSS — 4. Major PSS Workspaces]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#15. Study Overrides and Design Proposals|PSS — 15. Study Overrides and Design Proposals]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#16. Integration Architecture|PSS — 16. Integration Architecture]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#20. Open Questions for Astra|PSS — 20. Open Questions for Astra]]"]
---

# PSS ↔ PBS integration

PSS reads canonical plant identity, topology and physical/design values through a domain contract. It keeps source revision and stable object mappings so changed plant data can be detected.

Study-specific assumptions and overrides belong to PSS. Returning a successful alternative to PBS creates a proposal with origin evidence and affected canonical objects. PBS controls application; the cross-system review workflow is unresolved.

## Related notes

- [[PSS_HOME]]
- [[PBS_PSS_INTEGRATION]]
- [[PBS_TO_PSS_HYDRAULICS]]
- [[PSS_TO_PBS_DESIGN_CHANGE]]

## Source

- [[99_SOURCES/EVENSTAR_PSS_ASTRA#2. Relationship to Evenstar|PSS — 2. Relationship to Evenstar]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#4. Major PSS Workspaces|PSS — 4. Major PSS Workspaces]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#15. Study Overrides and Design Proposals|PSS — 15. Study Overrides and Design Proposals]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#16. Integration Architecture|PSS — 16. Integration Architecture]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#20. Open Questions for Astra|PSS — 20. Open Questions for Astra]]
