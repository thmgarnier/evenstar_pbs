---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PSS"]
aliases: []
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PSS_ASTRA#2. Relationship to Evenstar|PSS — 2. Relationship to Evenstar]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#3. Product Character|PSS — 3. Product Character]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#4. Major PSS Workspaces|PSS — 4. Major PSS Workspaces]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#14. Data Ownership|PSS — 14. Data Ownership]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#16. Integration Architecture|PSS — 16. Integration Architecture]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#19. Guardrails|PSS — 19. Guardrails]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#20. Open Questions for Astra|PSS — 20. Open Questions for Astra]]"]
---

# PSS architecture

PSS is the computational authority for models, thermodynamic configuration, solver state, studies and results. Project Data validates/maps reusable inputs from canonical PBS/Evenstar data and a per-project PSS Airtable Engineering Register.

An integration/domain layer isolates external record IDs. Engine adapters should keep the product from being tied permanently to DWSIM or any single backend. Detailed solver output remains in PSS; curated engineering output can be published to the register.

Local calculation is a product objective where avoidable cloud dependencies can be removed. The persistence model, engine adapter interface and offline cache are unresolved.

## Related notes

- [[PSS_HOME]]
- [[PSS_DATA_MODEL]]
- [[PSS_PROJECT_DATA]]
- [[PSS_ENGINE_ADAPTERS]]
- [[TECHNOLOGY_REGISTER]]
- [[OQ-012]]

## Source

- [[99_SOURCES/EVENSTAR_PSS_ASTRA#2. Relationship to Evenstar|PSS — 2. Relationship to Evenstar]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#3. Product Character|PSS — 3. Product Character]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#4. Major PSS Workspaces|PSS — 4. Major PSS Workspaces]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#14. Data Ownership|PSS — 14. Data Ownership]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#16. Integration Architecture|PSS — 16. Integration Architecture]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#19. Guardrails|PSS — 19. Guardrails]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#20. Open Questions for Astra|PSS — 20. Open Questions for Astra]]

## Related requirements

- [[PSS-REQ-008]]
- [[PSS-REQ-014]]
