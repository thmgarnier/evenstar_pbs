---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PSS"]
aliases: ["Provenance"]
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PSS_ASTRA#7. Project Data Read / Write Panel|PSS — 7. Project Data Read / Write Panel]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#9. Input Snapshots and Reproducibility|PSS — 9. Input Snapshots and Reproducibility]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#18. Process Engineer Experience|PSS — 18. Process Engineer Experience]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#19. Guardrails|PSS — 19. Guardrails]]"]
---

# PSS provenance and reproducibility

A run must retain enough input evidence to reproduce what it used. Capture source system, base/table/record mapping, dataset UUID, source revision/version, import timestamp, units/basis and a hash or equivalent change detector where practical.

A live Airtable link alone is insufficient if that source record can change. Snapshot values or an immutable/version-resolvable source must preserve the historical inputs. Detailed snapshot storage/version semantics remain open.

Record assumptions and method/thermodynamic configuration alongside source inputs. A newer project value should produce a visible difference and an explicit choice to keep or read into the working model. It must not rewrite a completed run.

Evidence promoted to PMS retains originating model/run/report/study identity and its relation to the controlled deliverable revision.

## Related notes

- [[PSS_HOME]]
- [[PSS_PROJECT_DATA]]
- [[PSS_RUNS_RESULTS]]
- [[PMS_PSS_PROMOTION]]
- [[OQ-008]]
- [[OQ-017]]

## Source

- [[99_SOURCES/EVENSTAR_PSS_ASTRA#7. Project Data Read / Write Panel|PSS — 7. Project Data Read / Write Panel]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#9. Input Snapshots and Reproducibility|PSS — 9. Input Snapshots and Reproducibility]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#18. Process Engineer Experience|PSS — 18. Process Engineer Experience]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#19. Guardrails|PSS — 19. Guardrails]]

## Related requirements

- [[PSS-REQ-006]]
- [[PSS-REQ-007]]
- [[INT-REQ-005]]
