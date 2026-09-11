---
type: "requirement"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "requirement"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#13. PBS → PSS Hydraulics|PBS — 13. PBS → PSS Hydraulics]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#37. Initial Requirements|PBS — 37. Initial Requirements]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#4. Major PSS Workspaces|PSS — 4. Major PSS Workspaces]]"]
id: "INT-REQ-004"
implementation_status: "unverified"
---

# INT-REQ-004 — PBS topology reuse for hydraulics

**Classification:** REQUIREMENT

**Status:** Accepted product intent. **Implementation:** Unverified.

PSS shall construct a hydraulic model from sufficient known PBS topology/physical data without requiring manual network redraw.

## Acceptance criteria

An agreed PBS network seeds a hydraulic model preserving nodes/connectivity/physical fields and source revision; missing assumptions are explicit.

These criteria are derived verification targets, not executed product tests.

## Related notes

- [[PBS_TO_PSS_HYDRAULICS]]
- [[ADR-010]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#13. PBS → PSS Hydraulics|PBS — 13. PBS → PSS Hydraulics]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#37. Initial Requirements|PBS — 37. Initial Requirements]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#4. Major PSS Workspaces|PSS — 4. Major PSS Workspaces]]
