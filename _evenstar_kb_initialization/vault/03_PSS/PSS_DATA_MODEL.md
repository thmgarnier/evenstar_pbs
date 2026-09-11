---
type: "proposed-design"
status: "proposed"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PSS"]
aliases: []
tags: ["evenstar", "proposed-design"]
sources: ["[[99_SOURCES/EVENSTAR_PSS_ASTRA#6. Local, Project and Linked Inputs|PSS — 6. Local, Project and Linked Inputs]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#8. Reusable Project Input Model|PSS — 8. Reusable Project Input Model]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#9. Input Snapshots and Reproducibility|PSS — 9. Input Snapshots and Reproducibility]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#11. PSS Engineering Register — Recommended Core Tables|PSS — 11. PSS Engineering Register — Recommended Core Tables]]"]
---

# PSS data model

Conceptual model: Project → Models → Simulation Cases/Studies → Runs → Run Points/Results/Reports. A model consumes local inputs, linked project inputs and snapshots. Studies hold assumptions and overrides.

Reusable inputs include Streams, Compositions, Composition Components/Species, Engineering Variables, Design/Operating Cases, Equipment Input Data, Environmental Conditions and Data Sources. Compositions are reusable datasets, not repeated component columns on every stream.

Analysis records may include stream/equipment/hydraulic-node/thermodynamic results, KPIs, warnings/convergence notes and design proposals. Engineering context records include assumptions, notes, decisions and canonical PBS references.

The table list is recommended source material, not a ratified physical schema. Cardinality, normalization and detailed revision semantics are open.

## Related notes

- [[PSS_HOME]]
- [[PSS_PROJECT_DATA]]
- [[PSS_AIRTABLE_ENGINEERING_REGISTER]]
- [[PIPE_LINE_STREAM]]
- [[OQ-007]]
- [[OQ-008]]

## Source

- [[99_SOURCES/EVENSTAR_PSS_ASTRA#6. Local, Project and Linked Inputs|PSS — 6. Local, Project and Linked Inputs]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#8. Reusable Project Input Model|PSS — 8. Reusable Project Input Model]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#9. Input Snapshots and Reproducibility|PSS — 9. Input Snapshots and Reproducibility]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#11. PSS Engineering Register — Recommended Core Tables|PSS — 11. PSS Engineering Register — Recommended Core Tables]]

## Related requirements

- [[PSS-REQ-005]]
