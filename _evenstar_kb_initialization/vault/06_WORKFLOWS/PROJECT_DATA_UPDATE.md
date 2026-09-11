---
type: "workflow"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "workflow"]
sources: ["[[99_SOURCES/EVENSTAR_PSS_ASTRA#6. Local, Project and Linked Inputs|PSS — 6. Local, Project and Linked Inputs]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#7. Project Data Read / Write Panel|PSS — 7. Project Data Read / Write Panel]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#9. Input Snapshots and Reproducibility|PSS — 9. Input Snapshots and Reproducibility]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#14. Data Ownership|PSS — 14. Data Ownership]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#20. Open Questions for Astra|PSS — 20. Open Questions for Astra]]"]
---

# PSS Project Data update and conflict handling

**Trigger:** A linked project value changes or an engineer wants to publish a local value.

## Flow

1. Refresh source metadata to identify new data; Compare selected values, units, basis and revisions.
2. Choose to keep current model values, Read from Project, or Write selected eligible local data to Project.
3. Validate the datum owner and permissions; present relevant differences before overwriting.
4. Capture the accepted input version/snapshot for subsequent calculations; retain all prior run inputs.

## Ownership and exceptions

Refresh/Compare do not silently mutate working inputs or old runs. PBS physical design writes use a proposal. The exact stale-write/concurrency resolution algorithm remains OQ-008; no last-writer-wins policy is assumed.

## Intended completion evidence

An intentional action explains each changed value, with provenance; old runs remain unchanged after a source edit.

## Related notes

- [[WORKFLOWS_INDEX]]
- [[PSS_PROJECT_DATA]]
- [[PSS_PROVENANCE]]
- [[OQ-008]]

## Source

- [[99_SOURCES/EVENSTAR_PSS_ASTRA#6. Local, Project and Linked Inputs|PSS — 6. Local, Project and Linked Inputs]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#7. Project Data Read / Write Panel|PSS — 7. Project Data Read / Write Panel]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#9. Input Snapshots and Reproducibility|PSS — 9. Input Snapshots and Reproducibility]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#14. Data Ownership|PSS — 14. Data Ownership]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#20. Open Questions for Astra|PSS — 20. Open Questions for Astra]]

## Related requirements

- [[PSS-REQ-003]]
- [[PSS-REQ-007]]
- [[INT-REQ-008]]
