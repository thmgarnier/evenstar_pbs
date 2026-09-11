---
type: "requirement"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PSS"]
aliases: []
tags: ["evenstar", "requirement"]
sources: ["[[99_SOURCES/EVENSTAR_PSS_ASTRA#4. Major PSS Workspaces|PSS — 4. Major PSS Workspaces]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#15. Study Overrides and Design Proposals|PSS — 15. Study Overrides and Design Proposals]]"]
id: "PSS-REQ-009"
implementation_status: "unverified"
---

# PSS-REQ-009 — Safe study overrides

**Classification:** REQUIREMENT

**Status:** Accepted product intent. **Implementation:** Unverified.

PSS shall allow study overrides without silently changing canonical PBS design.

## Acceptance criteria

Test DN250 against a DN200 imported baseline; PBS remains DN200 unless a separate proposal is accepted/applied.

These criteria are derived verification targets, not executed product tests.

## Related notes

- [[PSS_HYDRAULICS]]
- [[PSS_TO_PBS_DESIGN_CHANGE]]
- [[ADR-009]]

## Source

- [[99_SOURCES/EVENSTAR_PSS_ASTRA#4. Major PSS Workspaces|PSS — 4. Major PSS Workspaces]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#15. Study Overrides and Design Proposals|PSS — 15. Study Overrides and Design Proposals]]
