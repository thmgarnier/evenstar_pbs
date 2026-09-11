---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PMS"]
aliases: []
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#5. Project Provisioning|PMS — 5. Project Provisioning]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#26. Template Strategy|PMS — 26. Template Strategy]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#29. Open Questions for Astra|PMS — 29. Open Questions for Astra]]"]
---

# PMS templates

PMS provisioning should use versioned templates while preserving stable core contracts. Candidate variants include EPC, owner's engineering, FEED/studies, power, LNG/oil & gas, water/wastewater and consulting.

Register template/schema version and mapping metadata against the Evenstar Project UUID. Normal users should not manage table IDs. Migration and client-specific workflow strategies are unresolved; copying bases without version governance risks uncontrolled schema fragmentation.

## Related notes

- [[PMS_HOME]]
- [[PROJECT_CREATION]]
- [[PMS_AIRTABLE_ARCHITECTURE]]
- [[OQ-010]]
- [[OQ-011]]

## Source

- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#5. Project Provisioning|PMS — 5. Project Provisioning]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#26. Template Strategy|PMS — 26. Template Strategy]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#29. Open Questions for Astra|PMS — 29. Open Questions for Astra]]

## Related requirements

- [[PMS-REQ-009]]
