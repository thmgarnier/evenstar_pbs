---
type: "proposed-design"
status: "proposed"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PSS"]
aliases: []
tags: ["evenstar", "proposed-design"]
sources: ["[[99_SOURCES/EVENSTAR_PSS_ASTRA#4. Major PSS Workspaces|PSS — 4. Major PSS Workspaces]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#19. Guardrails|PSS — 19. Guardrails]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#20. Open Questions for Astra|PSS — 20. Open Questions for Astra]]"]
---

# PSS engine adapters

Engine-agnostic architecture is the intended direction where practical. DWSIM may supply important open-source algorithms, but the domain must not be permanently coupled to one backend.

Proposed adapter review topics: supported unit operations/property methods, typed units and chemical identifiers, error/convergence reporting, model portability, version/provenance and local execution. Exact adapter API, first engine and numerical validation benchmarks remain undecided.

## Related notes

- [[PSS_HOME]]
- [[TECHNOLOGY_REGISTER]]
- [[OQ-009]]
- [[OQ-012]]

## Source

- [[99_SOURCES/EVENSTAR_PSS_ASTRA#4. Major PSS Workspaces|PSS — 4. Major PSS Workspaces]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#19. Guardrails|PSS — 19. Guardrails]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#20. Open Questions for Astra|PSS — 20. Open Questions for Astra]]

## Related requirements

- [[PSS-REQ-013]]
