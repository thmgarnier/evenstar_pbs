---
type: "future"
status: "future"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PSS"]
aliases: ["Python Blocks"]
tags: ["evenstar", "future"]
sources: ["[[99_SOURCES/EVENSTAR_PSS_ASTRA#4. Major PSS Workspaces|PSS — 4. Major PSS Workspaces]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#20. Open Questions for Astra|PSS — 20. Open Questions for Astra]]"]
---

# Python and custom calculation blocks

Python/custom calculation blocks are a target extension capability, particularly for controls and standalone calculations. They need typed input/output signal contracts and reproducible model context.

Execution isolation, runtime/package versions, resource limits, scheduling, trust model and error handling are design questions. No unrestricted code execution architecture or plugin API is accepted here. The first engine-adapter decision should distinguish engine plugins from user-authored model blocks.

## Related notes

- [[PSS_HOME]]
- [[PSS_CONTROLS_DYNAMICS]]
- [[PSS_ENGINE_ADAPTERS]]
- [[OQ-012]]
- [[OQ-014]]

## Source

- [[99_SOURCES/EVENSTAR_PSS_ASTRA#4. Major PSS Workspaces|PSS — 4. Major PSS Workspaces]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#20. Open Questions for Astra|PSS — 20. Open Questions for Astra]]

## Related requirements

- [[PSS-REQ-017]]
