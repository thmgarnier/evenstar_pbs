---
type: "requirement"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PSS"]
aliases: []
tags: ["evenstar", "requirement"]
sources: ["[[99_SOURCES/EVENSTAR_PSS_ASTRA#4. Major PSS Workspaces|PSS — 4. Major PSS Workspaces]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#19. Guardrails|PSS — 19. Guardrails]]"]
id: "PSS-REQ-013"
implementation_status: "unverified"
---

# PSS-REQ-013 — Replaceable simulation engines

**Classification:** REQUIREMENT

**Status:** Accepted product intent. **Implementation:** Unverified.

PSS shall avoid permanent coupling of its product/domain model to one simulation backend where practical.

## Acceptance criteria

An architecture review separates domain identities/contracts from engine internals and documents adapter capability limits.

These criteria are derived verification targets, not executed product tests.

## Related notes

- [[PSS_ENGINE_ADAPTERS]]

## Source

- [[99_SOURCES/EVENSTAR_PSS_ASTRA#4. Major PSS Workspaces|PSS — 4. Major PSS Workspaces]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#19. Guardrails|PSS — 19. Guardrails]]
