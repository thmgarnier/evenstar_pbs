---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PSS"]
aliases: []
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PSS_ASTRA#10. PSS Project Base Provisioning|PSS — 10. PSS Project Base Provisioning]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#11. PSS Engineering Register — Recommended Core Tables|PSS — 11. PSS Engineering Register — Recommended Core Tables]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#12. Results Publication Philosophy|PSS — 12. Results Publication Philosophy]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#13. Airtable as Analytical Project Memory|PSS — 13. Airtable as Analytical Project Memory]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#14. Data Ownership|PSS — 14. Data Ownership]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#17. Project Templates|PSS — 17. Project Templates]]"]
---

# PSS Airtable Engineering Register

The per-project PSS base is a collaborative engineering register and analytical surface. It holds reusable project inputs and curated PSS-generated engineering results, with links to models, runs, studies, reports, assumptions and source data.

PSS retains computational authority. Airtable is not the numerical solver and must not directly manipulate internal solver state. High-frequency trajectories and every solver iteration/cell do not automatically become register records.

Versioned templates may add domain tables while preserving a stable core contract. Ordinary users should not manage Airtable table IDs or record mappings. Provisioning/connect mechanics, normalized versus convenience tables, template migrations and permission mapping remain open.

Interfaces should compare runs/cases, plot selected profiles and sensitivities, inspect KPIs, warnings and assumptions, and navigate back to models/reports.

## Related notes

- [[PSS_HOME]]
- [[PSS_PROJECT_DATA]]
- [[PSS_RUNS_RESULTS]]
- [[PROJECT_CREATION]]
- [[OQ-007]]
- [[OQ-010]]

## Source

- [[99_SOURCES/EVENSTAR_PSS_ASTRA#10. PSS Project Base Provisioning|PSS — 10. PSS Project Base Provisioning]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#11. PSS Engineering Register — Recommended Core Tables|PSS — 11. PSS Engineering Register — Recommended Core Tables]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#12. Results Publication Philosophy|PSS — 12. Results Publication Philosophy]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#13. Airtable as Analytical Project Memory|PSS — 13. Airtable as Analytical Project Memory]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#14. Data Ownership|PSS — 14. Data Ownership]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#17. Project Templates|PSS — 17. Project Templates]]

## Related requirements

- [[PSS-REQ-010]]
- [[PSS-REQ-011]]
