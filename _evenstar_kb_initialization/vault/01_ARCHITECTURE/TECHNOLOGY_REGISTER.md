---
type: "register"
status: "recorded"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "register"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#16. Supabase / PostgreSQL|PBS — 16. Supabase / PostgreSQL]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#17. Object Storage|PBS — 17. Object Storage]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#28. Initial Technical Direction|PBS — 28. Initial Technical Direction]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#30. Open Source|PBS — 30. Open Source]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#4. Major PSS Workspaces|PSS — 4. Major PSS Workspaces]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#16. Integration Architecture|PSS — 16. Integration Architecture]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#19. Guardrails|PSS — 19. Guardrails]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#3. Airtable as PMS Application Layer|PMS — 3. Airtable as PMS Application Layer]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#4. One PMS Base Per Project|PMS — 4. One PMS Base Per Project]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#20. Integration Layer|PMS — 20. Integration Layer]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#25. Portfolio View|PMS — 25. Portfolio View]]", "[[INITIALIZATION_MANDATE]]"]
---

# Technology commitment register

Technology follows the domain. This table records source commitment, not a deployment inventory.

| Technology / choice | Commitment | Scope and limit |
| --- | --- | --- |
| Supabase/PostgreSQL | Accepted initial direction | Canonical PBS backbone and shared identity/mapping data; portable schemas; [[ADR-006]] |
| Airtable for PMS | Accepted initial direction | PMS application/workspace layer; logical model remains portable |
| Airtable PSS Engineering Register | Accepted initial direction | Reusable inputs and curated results; not solver state |
| Separate PSS/PMS bases | Accepted boundary | [[ADR-007]] |
| One PSS base per project | Accepted intended arrangement | Provision/connect mechanism not settled; [[ADR-008]] |
| One PMS base per project | Preferred proposed arrangement | Source explicitly says preferred; confirmation in [[OQ-011]] |
| React / Next.js | Candidate | Portfolio/web interface; no fixed frontend choice |
| Three.js / React Three Fiber or equivalent | Candidate | 3D representation of canonical objects |
| Graph/canvas libraries | Candidate | P&ID/editor technology not selected |
| Python / custom blocks | Target capability, architecture open | Execution, typing and packaging unresolved |
| DWSIM / other open-source engines | Candidate adapter backends | PSS must remain replaceable/engine-agnostic where practical |
| Object storage / Supabase Auth / realtime | Candidate supporting services | Storage authority and exact access architecture remain open |
| n8n / server functions / Airtable API | Candidate integration tools | Conceptual contracts must outlive the tool |
| Vercel | Mentioned in user request only | No selection or deployment evidence in supplied source corpus |
| Desktop/hybrid runtime | Possible later direction | No runtime selection |

Open-source-first does not prohibit optional proprietary collaboration services. Core models, schemas, interfaces, code and exports should avoid unnecessary lock-in. License selection and export/interchange formats remain unresolved.

## Related notes

- [[ADR-014]]
- [[OQ-012]]
- [[OQ-018]]
- [[CURRENT_STATE]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#16. Supabase / PostgreSQL|PBS — 16. Supabase / PostgreSQL]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#17. Object Storage|PBS — 17. Object Storage]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#28. Initial Technical Direction|PBS — 28. Initial Technical Direction]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#30. Open Source|PBS — 30. Open Source]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#4. Major PSS Workspaces|PSS — 4. Major PSS Workspaces]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#16. Integration Architecture|PSS — 16. Integration Architecture]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#19. Guardrails|PSS — 19. Guardrails]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#3. Airtable as PMS Application Layer|PMS — 3. Airtable as PMS Application Layer]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#4. One PMS Base Per Project|PMS — 4. One PMS Base Per Project]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#20. Integration Layer|PMS — 20. Integration Layer]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#25. Portfolio View|PMS — 25. Portfolio View]]
- [[INITIALIZATION_MANDATE]]

## Related requirements

- [[EV-REQ-005]]
- [[EV-REQ-009]]
