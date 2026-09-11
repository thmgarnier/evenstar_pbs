---
type: "requirement"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "requirement"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#1. Position Inside Evenstar|PBS — 1. Position Inside Evenstar]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#4. Core Ownership|PBS — 4. Core Ownership]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#2. Relationship to Evenstar|PSS — 2. Relationship to Evenstar]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#1. Position Inside Evenstar|PMS — 1. Position Inside Evenstar]]"]
id: "EV-REQ-001"
implementation_status: "unverified"
---

# EV-REQ-001 — Subsystem responsibility

**Classification:** REQUIREMENT

**Status:** Accepted product intent. **Implementation:** Unverified.

Evenstar shall preserve PBS plant-definition, PSS computation and PMS delivery responsibilities.

## Acceptance criteria

A plant update, solver run and deliverable approval each resolve to their designated authority; shared screens do not transfer ownership.

These criteria are derived verification targets, not executed product tests.

## Related notes

- [[SYSTEM_BOUNDARIES]]
- [[ADR-001]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#1. Position Inside Evenstar|PBS — 1. Position Inside Evenstar]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#4. Core Ownership|PBS — 4. Core Ownership]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#2. Relationship to Evenstar|PSS — 2. Relationship to Evenstar]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#1. Position Inside Evenstar|PMS — 1. Position Inside Evenstar]]
