---
type: "future"
status: "future"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PSS"]
aliases: ["Controls & Dynamics"]
tags: ["evenstar", "future"]
sources: ["[[99_SOURCES/EVENSTAR_PSS_ASTRA#4. Major PSS Workspaces|PSS — 4. Major PSS Workspaces]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#20. Open Questions for Astra|PSS — 20. Open Questions for Astra]]"]
---

# Controls and dynamics

Future PSS work includes PID controllers, process variables/setpoints/outputs, tuning, dynamic scenarios, alarms/events, trends, suitable interlocks/permissives and custom blocks in a DCS/P&ID-oriented experience.

Typed signal contracts and coordination of simulation clock, process model and controller execution are required design concerns. PBS owns physical instruments and plant control relationships; PSS owns numerical controller execution/state.

Collaborative control data, historian storage and published summaries remain unresolved. High-frequency dynamic trajectories must not automatically become record-per-sample Airtable data.

## Related notes

- [[PSS_HOME]]
- [[INSTRUMENT]]
- [[PSS_PYTHON_BLOCKS]]
- [[HISTORICAL_ARCHITECTURE]]
- [[OQ-014]]

## Source

- [[99_SOURCES/EVENSTAR_PSS_ASTRA#4. Major PSS Workspaces|PSS — 4. Major PSS Workspaces]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#20. Open Questions for Astra|PSS — 20. Open Questions for Astra]]

## Related requirements

- [[PSS-REQ-017]]
