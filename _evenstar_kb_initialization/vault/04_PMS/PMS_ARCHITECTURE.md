---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PMS"]
aliases: []
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#3. Airtable as PMS Application Layer|PMS — 3. Airtable as PMS Application Layer]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#4. One PMS Base Per Project|PMS — 4. One PMS Base Per Project]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#15. Data Flow|PMS — 15. Data Flow]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#16. PSS Base vs PMS Base|PMS — 16. PSS Base vs PMS Base]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#18. Cross-System Identity|PMS — 18. Cross-System Identity]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#20. Integration Layer|PMS — 20. Integration Layer]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#25. Portfolio View|PMS — 25. Portfolio View]]"]
---

# PMS architecture

Airtable is the initial PMS application/workspace layer for relational delivery records, collaborative views, Interfaces and lightweight automations. Stable Evenstar Project UUIDs, PBS object UUIDs and PSS evidence IDs preserve interoperability.

PMS owns controlled delivery, not plant definition or solver state. A separate PMS base holds delivery records while the PSS base holds reusable inputs and engineering analysis. One PMS base per project is the source's preferred arrangement, awaiting explicit ratification in this vault.

Domain contracts and templates should remain inspectable and portable beyond Airtable. Schema, provisioning, permission mapping and portfolio aggregation need design decisions.

## Related notes

- [[PMS_HOME]]
- [[PMS_AIRTABLE_ARCHITECTURE]]
- [[PMS_DATA_MODEL]]
- [[TECHNOLOGY_REGISTER]]
- [[OQ-011]]

## Source

- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#3. Airtable as PMS Application Layer|PMS — 3. Airtable as PMS Application Layer]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#4. One PMS Base Per Project|PMS — 4. One PMS Base Per Project]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#15. Data Flow|PMS — 15. Data Flow]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#16. PSS Base vs PMS Base|PMS — 16. PSS Base vs PMS Base]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#18. Cross-System Identity|PMS — 18. Cross-System Identity]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#20. Integration Layer|PMS — 20. Integration Layer]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#25. Portfolio View|PMS — 25. Portfolio View]]
