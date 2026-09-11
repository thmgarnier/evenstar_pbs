---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PSS"]
aliases: ["Runs & Results"]
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PSS_ASTRA#9. Input Snapshots and Reproducibility|PSS — 9. Input Snapshots and Reproducibility]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#11. PSS Engineering Register — Recommended Core Tables|PSS — 11. PSS Engineering Register — Recommended Core Tables]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#12. Results Publication Philosophy|PSS — 12. Results Publication Philosophy]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#13. Airtable as Analytical Project Memory|PSS — 13. Airtable as Analytical Project Memory]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#18. Process Engineer Experience|PSS — 18. Process Engineer Experience]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#20. Open Questions for Astra|PSS — 20. Open Questions for Astra]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#22. MVP Vertical Slice|PSS — 22. MVP Vertical Slice]]"]
---

# PSS runs and results

A run is calculation evidence with its input snapshot, model/configuration, case/study, assumptions, warnings and outputs. Its history must survive later edits to project data.

**Compute at solver resolution; publish at engineering resolution.** Keep detailed solver results in the computational domain. Publish meaningful engineering points/records to the PSS register for comparison and collaboration: hydraulic stations, useful case points, selected KPIs or stream/equipment results.

The source MVP suggests roughly 10–20 useful published records, not a permanent record limit. Automatic versus explicit publication policy is unresolved. This is distinct from the stronger PMS boundary: only selected/promoted evidence normally crosses into controlled delivery.

## Related notes

- [[PSS_HOME]]
- [[PSS_PROVENANCE]]
- [[PSS_AIRTABLE_ENGINEERING_REGISTER]]
- [[PSS_TO_PMS_PROMOTION]]
- [[OQ-017]]
- [[OQ-020]]

## Source

- [[99_SOURCES/EVENSTAR_PSS_ASTRA#9. Input Snapshots and Reproducibility|PSS — 9. Input Snapshots and Reproducibility]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#11. PSS Engineering Register — Recommended Core Tables|PSS — 11. PSS Engineering Register — Recommended Core Tables]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#12. Results Publication Philosophy|PSS — 12. Results Publication Philosophy]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#13. Airtable as Analytical Project Memory|PSS — 13. Airtable as Analytical Project Memory]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#18. Process Engineer Experience|PSS — 18. Process Engineer Experience]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#20. Open Questions for Astra|PSS — 20. Open Questions for Astra]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#22. MVP Vertical Slice|PSS — 22. MVP Vertical Slice]]

## Related requirements

- [[PSS-REQ-010]]
