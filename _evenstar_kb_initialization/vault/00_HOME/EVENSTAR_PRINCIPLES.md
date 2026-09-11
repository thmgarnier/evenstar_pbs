---
type: "principle"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "principle"]
sources: ["[[99_SOURCES/README#Our Direction|IDS — Our Direction]]", "[[99_SOURCES/README#The Blank-File Problem|IDS — The Blank-File Problem]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#2. Vision|PBS — 2. Vision]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#18. Data Ownership|PBS — 18. Data Ownership]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#30. Open Source|PBS — 30. Open Source]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#40. Guardrails|PBS — 40. Guardrails]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#12. Results Publication Philosophy|PSS — 12. Results Publication Philosophy]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#19. Guardrails|PSS — 19. Guardrails]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#28. Guardrails|PMS — 28. Guardrails]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#31. Definition of Success|PMS — 31. Definition of Success]]"]
---

# Evenstar principles

| ID | Principle | Practical consequence | Explore |
| --- | --- | --- | --- |
| EV-PR-001 | One engineering object, many representations. | Views resolve the same stable object identity; they do not create competing pumps or valves. | [[CANONICAL_ENGINEERING_OBJECT]] |
| EV-PR-002 | Create engineering information once; reuse it everywhere. | Reuse known data through references and controlled exchange, with explicit owners. | [[DATA_OWNERSHIP]] |
| EV-PR-003 | Start from Project, not from scratch. | Offer reusable inputs and known topology when creating a calculation. | [[PSS_PROJECT_DATA]] |
| EV-PR-004 | The project should know what the project already knows. | Make relationships, provenance, changes and decisions discoverable over time. | [[KNOWLEDGE_GOVERNANCE]] |
| EV-PR-005 | PBS defines the plant. PSS computes its behavior. PMS delivers the project. | Assign behavior to the responsible system before choosing a technology. | [[SYSTEM_BOUNDARIES]] |
| EV-PR-006 | Every datum should have one explicit authoritative owner. | Reference, display, cache and propose without silently taking ownership. | [[DATA_OWNERSHIP]] |
| EV-PR-007 | Compute at solver resolution; publish at engineering resolution. | Curate meaningful PSS engineering results and separately select PMS delivery evidence. | [[PSS_RUNS_RESULTS]] |
| EV-PR-008 | Human control for engineering decisions. | Automation and AI can propose; they do not silently approve or mutate controlled state. | [[AI_ASSISTANCE]] |
| EV-PR-009 | Open-source first. | Portable models, schemas, interfaces and core logic; replaceable external adapters. | [[TECHNOLOGY_REGISTER]] |
| EV-PR-010 | Engineering requirements before implementation technology. | Requirement → domain model → system responsibility → contract → technology. | [[EVENSTAR_ARCHITECTURE]] |

## Related notes

- [[SHARED_REQUIREMENTS]]
- [[ADR_INDEX]]

## Source

- [[99_SOURCES/README#Our Direction|IDS — Our Direction]]
- [[99_SOURCES/README#The Blank-File Problem|IDS — The Blank-File Problem]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#2. Vision|PBS — 2. Vision]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#18. Data Ownership|PBS — 18. Data Ownership]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#30. Open Source|PBS — 30. Open Source]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#40. Guardrails|PBS — 40. Guardrails]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#12. Results Publication Philosophy|PSS — 12. Results Publication Philosophy]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#19. Guardrails|PSS — 19. Guardrails]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#28. Guardrails|PMS — 28. Guardrails]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#31. Definition of Success|PMS — 31. Definition of Success]]
