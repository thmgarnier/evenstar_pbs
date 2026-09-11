---
type: "review"
status: "recorded"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "review"]
sources: []
---

# Source section coverage

Major source sections map to derived concepts/registries. Child headings are covered by their numbered/major parent section; original details remain available in the intact source. This is section coverage, not a claim that every sentence became a requirement.

## IDS

| Original major section | Derived homes |
| --- | --- |
| The Problem | [[IDS_CONTEXT]] |
| Information Is Repeated Instead of Reused | [[IDS_CONTEXT]] |
| The Spreadsheet Problem | [[IDS_CONTEXT]] |
| The CAD Problem | [[IDS_CONTEXT]] |
| The Engineering Software Problem | [[IDS_CONTEXT]] |
| The Blank-File Problem | [[EVENSTAR_PRINCIPLES]], [[IDS_CONTEXT]] |
| The Database Should Be More Than Storage | [[IDS_CONTEXT]] |
| Our Direction | [[ADR-014]], [[AI_ASSISTANCE]], [[EV-REQ-009]], [[EVENSTAR_PRINCIPLES]], [[IDS_CONTEXT]] |
| What We Want Work to Feel Like | [[IDS_CONTEXT]] |
| Engineering as a Demonstration of the IDS Philosophy | [[EVENSTAR_VISION]], [[IDS_CONTEXT]] |
| This Is Not About Replacing Every Existing Tool | [[EV-REQ-009]], [[IDS_CONTEXT]] |
| The Objective | [[IDS_CONTEXT]] |

## PBS

| Original major section | Derived homes |
| --- | --- |
| 1. Position Inside Evenstar | [[ADR-001]], [[EV-REQ-001]], [[PBS_HOME]], [[SYSTEM_MAP]] |
| 2. Vision | [[ADR-004]], [[EVENSTAR_PRINCIPLES]], [[EVENSTAR_VISION]], [[PBS_VISION]] |
| 3. Product Character | [[ADR-004]], [[PBS_VISION]] |
| 4. Core Ownership | [[ADR-001]], [[DATA_OWNERSHIP]], [[EQUIPMENT]], [[EV-REQ-001]], [[EVENSTAR_ARCHITECTURE]], [[INSTRUMENT]], [[OQ-021]], [[PBS_ARCHITECTURE]] (+2 additional backlinks) |
| 5. Canonical Identity | [[ADR-002]], [[ADR-003]], [[CANONICAL_ENGINEERING_OBJECT]], [[CANONICAL_IDENTITY]], [[ENGINEERING_OBJECT_LIFECYCLE]], [[EV-REQ-002]], [[EV-REQ-003]], [[OQ-002]] (+2 additional backlinks) |
| 6. Canonical Hierarchy | [[CANONICAL_IDENTITY]], [[CONNECTION]], [[GLOSSARY]], [[OQ-003]], [[PBS-REQ-001]], [[PBS_DATA_MODEL]], [[PBS_PIPING]], [[PIPE_LINE_STREAM]] (+3 additional backlinks) |
| 7. Core Entities | [[CANONICAL_ENGINEERING_OBJECT]], [[CONNECTION]], [[ENGINEERING_OBJECT_LIFECYCLE]], [[EQUIPMENT]], [[GLOSSARY]], [[INSTRUMENT]], [[OQ-001]], [[PBS-REQ-001]] (+4 additional backlinks) |
| 8. P&ID / Process Definition | [[CONNECTION]], [[PBS-REQ-002]], [[PBS-REQ-003]], [[PBS_PID]], [[PORT]] |
| 9. Plant 3D Builder | [[OQ-004]], [[PBS-REQ-004]], [[PBS_PLANT_3D]] |
| 10. KKS-Based Layers | [[OQ-002]], [[PBS-REQ-005]], [[PBS_KKS]], [[PBS_PLANT_3D]], [[SYSTEM]] |
| 11. Smart Piping Routing | [[OQ-004]], [[PBS-REQ-007]], [[PBS-REQ-012]], [[PBS_SMART_ROUTING]] |
| 12. Piping as Engineering Data | [[CONNECTION]], [[PBS-REQ-006]], [[PBS_DATA_MODEL]], [[PBS_PIPING]], [[PIPE_LINE_STREAM]], [[PORT]] |
| 13. PBS → PSS Hydraulics | [[ADR-009]], [[ADR-010]], [[INT-REQ-004]], [[INTEGRATION_ARCHITECTURE]], [[OQ-006]], [[PBS-REQ-006]], [[PBS_PIPING]], [[PBS_PSS_INTEGRATION]] (+1 additional backlinks) |
| 14. Engineering Data / Parts / Materials | [[GLOSSARY]], [[PBS-REQ-008]], [[PBS_ENGINEERING_DATA]] |
| 15. One Object, Many Representations | [[ADR-004]], [[CANONICAL_ENGINEERING_OBJECT]], [[CANONICAL_IDENTITY]], [[ENGINEERING_OBJECT_LIFECYCLE]], [[EQUIPMENT]], [[EV-REQ-002]], [[INT-REQ-009]], [[PBS_PID]] |
| 16. Supabase / PostgreSQL | [[ADR-006]], [[CONFLICT_REGISTER]], [[EVENSTAR_ARCHITECTURE]], [[OQ-015]], [[PBS_ARCHITECTURE]], [[SYSTEM_MAP]], [[TECHNOLOGY_REGISTER]] |
| 17. Object Storage | [[CONFLICT_REGISTER]], [[OQ-015]], [[PBS_ARCHITECTURE]], [[PBS_ENGINEERING_DATA]], [[TECHNOLOGY_REGISTER]] |
| 18. Data Ownership | [[ADR-005]], [[CONFLICT_REGISTER]], [[DATA_OWNERSHIP]], [[EV-REQ-004]], [[EVENSTAR_PRINCIPLES]], [[OQ-021]], [[PBS_PIPING]], [[SYSTEM_BOUNDARIES]] |
| 19. Cross-System Change Principle | [[ADR-005]], [[ADR-009]], [[ADR-011]], [[DATA_OWNERSHIP]], [[ENGINEERING_CHANGE]], [[EV-REQ-004]], [[INT-REQ-005]], [[INT-REQ-006]] (+8 additional backlinks) |
| 20. APIs / Events | [[EVENSTAR_ARCHITECTURE]], [[EVENT_AND_API_CONTRACTS]], [[INTEGRATION_ARCHITECTURE]] |
| 21. Project Creation | [[INT-REQ-001]], [[OQ-010]], [[PROJECT]], [[PROJECT_CREATION]], [[PROJECT_IDENTITY]], [[SYSTEM_MAP]] |
| 22. Relationship to PSS | [[ADR-001]], [[INSTRUMENT]], [[INTEGRATION_ARCHITECTURE]], [[PBS_ARCHITECTURE]], [[PBS_PSS_INTEGRATION]], [[SYSTEM_BOUNDARIES]], [[SYSTEM_MAP]] |
| 23. Relationship to PMS | [[ADR-001]], [[INTEGRATION_ARCHITECTURE]], [[OQ-016]], [[PBS_ARCHITECTURE]], [[PBS_PMS_INTEGRATION]], [[SYSTEM_BOUNDARIES]], [[SYSTEM_MAP]] |
| 24. Relationship to North Star | [[FUTURE_IDEAS]], [[NORTH_STAR_BOUNDARY]], [[OQ-018]], [[SYSTEM_MAP]] |
| 25. Collaboration | [[FUTURE_IDEAS]], [[OQ-013]], [[PBS_COLLABORATION]] |
| 26. Revisions and Engineering Change | [[ADR-011]], [[CONFLICT_REGISTER]], [[ENGINEERING_CHANGE]], [[ENGINEERING_OBJECT_LIFECYCLE]], [[EV-REQ-006]], [[INT-REQ-006]], [[OQ-005]], [[PBS-REQ-009]] (+5 additional backlinks) |
| 27. Historical Demo Strategy | [[ADR-001]], [[ADR-016]], [[ADR_INDEX]], [[CONFLICT_REGISTER]], [[DEMO_STRATEGY]], [[HISTORICAL_ARCHITECTURE]], [[OQ-024]], [[PBS_ARCHITECTURE]] |
| 28. Initial Technical Direction | [[ADR-006]], [[EV-REQ-009]], [[EVENSTAR_ARCHITECTURE]], [[FUTURE_IDEAS]], [[OQ-013]], [[PBS_ARCHITECTURE]], [[PBS_PLANT_3D]], [[TECHNOLOGY_REGISTER]] |
| 29. Security | [[OQ-019]], [[PBS-REQ-010]], [[PBS_COLLABORATION]], [[SECURITY_AND_ACCESS]] |
| 30. Open Source | [[ADR-006]], [[ADR-014]], [[EV-REQ-005]], [[EVENSTAR_PRINCIPLES]], [[OQ-018]], [[TECHNOLOGY_REGISTER]] |
| 31. Reference Plants | [[FUTURE_IDEAS]], [[MVP]], [[OQ-024]], [[PBS-REQ-011]], [[REFERENCE_PLANTS]], [[SEED_PLANT]] |
| 32. UX Navigation | [[PBS_SEARCH_EXPLORER]] |
| 33. Search / Explorer | [[INT-REQ-009]], [[PBS-REQ-008]], [[PBS_ENGINEERING_DATA]], [[PBS_KKS]], [[PBS_SEARCH_EXPLORER]] |
| 34. AI | [[AI_ASSISTANCE]], [[EV-REQ-007]], [[FUTURE_IDEAS]] |
| 35. Accepted Historical Decisions | [[ADR-002]], [[ADR-003]], [[ADR-004]], [[ADR-006]], [[ADR-014]], [[ADR-016]], [[ADR_INDEX]], [[CONFLICT_REGISTER]] (+13 additional backlinks) |
| 36. Decisions Requiring Reconciliation | [[ADR-016]], [[ADR_INDEX]], [[CONFLICT_REGISTER]], [[ENGINEERING_CHANGE]], [[EVENSTAR_ARCHITECTURE]], [[EXTRACTION_REVIEW]], [[HISTORICAL_ARCHITECTURE]], [[INSTRUMENT]] (+10 additional backlinks) |
| 37. Initial Requirements | [[ADR-010]], [[DEMO_STRATEGY]], [[EV-REQ-002]], [[EV-REQ-005]], [[EV-REQ-006]], [[INT-REQ-004]], [[INT-REQ-005]], [[INT-REQ-009]] (+17 additional backlinks) |
| 38. Backlog Direction | [[BACKLOG]], [[CURRENT_STATE]], [[MVP]], [[OQ-024]], [[PBS_SMART_ROUTING]], [[ROADMAP]] |
| 39. Astra Operating Model | [[KNOWLEDGE_GOVERNANCE]] |
| 40. Guardrails | [[AI_ASSISTANCE]], [[EV-REQ-005]], [[EV-REQ-007]], [[EVENSTAR_PRINCIPLES]] |
| 41. Open Questions | [[EXTRACTION_REVIEW]], [[FUTURE_IDEAS]], [[OPEN_QUESTIONS]], [[OQ-001]], [[OQ-002]], [[OQ-003]], [[OQ-004]], [[OQ-005]] (+16 additional backlinks) |
| 42. Definition of Success | [[DEMO_STRATEGY]], [[ENGINEERING_OBJECT_LIFECYCLE]], [[EVENSTAR_VISION]], [[PBS_VISION]] |

## PSS

| Original major section | Derived homes |
| --- | --- |
| 1. Vision | [[ADR-008]], [[EVENSTAR_VISION]], [[PSS-REQ-001]], [[PSS_VISION]] |
| 2. Relationship to Evenstar | [[ADR-001]], [[ADR-002]], [[ADR-003]], [[ADR-006]], [[CANONICAL_IDENTITY]], [[EV-REQ-001]], [[EV-REQ-003]], [[EVENSTAR_ARCHITECTURE]] (+7 additional backlinks) |
| 3. Product Character | [[OQ-013]], [[PSS-REQ-004]], [[PSS-REQ-014]], [[PSS_ARCHITECTURE]], [[PSS_VISION]] |
| 4. Major PSS Workspaces | [[ADR-009]], [[ADR-010]], [[FUTURE_IDEAS]], [[GLOSSARY]], [[INT-REQ-004]], [[MULTIDISCIPLINE_EXPANSION]], [[OQ-006]], [[OQ-012]] (+18 additional backlinks) |
| 5. Start From Project | [[OQ-021]], [[PSS-REQ-001]], [[PSS-REQ-016]], [[PSS_PROCESS_SIMULATION]], [[PSS_PROJECT_DATA]], [[PSS_WATER_WASTEWATER]], [[START_FROM_PROJECT]] |
| 6. Local, Project and Linked Inputs | [[ADR-015]], [[DATA_OWNERSHIP]], [[GLOSSARY]], [[PROJECT_DATA_UPDATE]], [[PSS-REQ-002]], [[PSS_DATA_MODEL]], [[PSS_PROJECT_DATA]] |
| 7. Project Data Read / Write Panel | [[ADR-015]], [[INT-REQ-008]], [[INTEGRATION_ARCHITECTURE]], [[OQ-008]], [[PROJECT_DATA_UPDATE]], [[PSS-REQ-003]], [[PSS_PROJECT_DATA]], [[PSS_PROVENANCE]] (+1 additional backlinks) |
| 8. Reusable Project Input Model | [[CONFLICT_REGISTER]], [[DATA_OWNERSHIP]], [[OQ-003]], [[OQ-007]], [[OQ-009]], [[OQ-021]], [[PSS-REQ-005]], [[PSS-REQ-016]] (+3 additional backlinks) |
| 9. Input Snapshots and Reproducibility | [[ADR-015]], [[INT-REQ-005]], [[INTEGRATION_ARCHITECTURE]], [[OQ-008]], [[PROJECT_DATA_UPDATE]], [[PSS-REQ-003]], [[PSS-REQ-006]], [[PSS-REQ-007]] (+5 additional backlinks) |
| 10. PSS Project Base Provisioning | [[ADR-006]], [[ADR-008]], [[INT-REQ-001]], [[INT-REQ-003]], [[OQ-010]], [[PROJECT_CREATION]], [[PROJECT_IDENTITY]], [[PSS_AIRTABLE_ENGINEERING_REGISTER]] |
| 11. PSS Engineering Register — Recommended Core Tables | [[OQ-007]], [[PSS-REQ-010]], [[PSS_AIRTABLE_ENGINEERING_REGISTER]], [[PSS_DATA_MODEL]], [[PSS_RUNS_RESULTS]] |
| 12. Results Publication Philosophy | [[EVENSTAR_PRINCIPLES]], [[GLOSSARY]], [[OQ-006]], [[OQ-020]], [[PBS_TO_PSS_HYDRAULICS]], [[PSS-REQ-010]], [[PSS_AIRTABLE_ENGINEERING_REGISTER]], [[PSS_HYDRAULICS]] (+1 additional backlinks) |
| 13. Airtable as Analytical Project Memory | [[PSS-REQ-010]], [[PSS-REQ-011]], [[PSS_AIRTABLE_ENGINEERING_REGISTER]], [[PSS_RUNS_RESULTS]] |
| 14. Data Ownership | [[ADR-005]], [[ADR-015]], [[CONFLICT_REGISTER]], [[DATA_OWNERSHIP]], [[EV-REQ-004]], [[INT-REQ-008]], [[INTEGRATION_ARCHITECTURE]], [[OQ-021]] (+7 additional backlinks) |
| 15. Study Overrides and Design Proposals | [[ADR-009]], [[ADR-011]], [[CONFLICT_REGISTER]], [[INT-REQ-006]], [[OQ-005]], [[PBS_TO_PSS_HYDRAULICS]], [[PSS-REQ-009]], [[PSS_HYDRAULICS]] (+3 additional backlinks) |
| 16. Integration Architecture | [[CANONICAL_IDENTITY]], [[EVENSTAR_ARCHITECTURE]], [[EVENT_AND_API_CONTRACTS]], [[INT-REQ-007]], [[INTEGRATION_ARCHITECTURE]], [[PSS_ARCHITECTURE]], [[PSS_PBS_INTEGRATION]], [[SYSTEM_MAP]] (+1 additional backlinks) |
| 17. Project Templates | [[ADR-008]], [[INT-REQ-003]], [[MULTIDISCIPLINE_EXPANSION]], [[OQ-010]], [[PSS_AIRTABLE_ENGINEERING_REGISTER]], [[REFERENCE_PLANTS]] |
| 18. Process Engineer Experience | [[OQ-009]], [[PSS-REQ-001]], [[PSS-REQ-004]], [[PSS-REQ-011]], [[PSS_PMS_INTEGRATION]], [[PSS_PROCESS_SIMULATION]], [[PSS_PROJECT_DATA]], [[PSS_PROVENANCE]] (+4 additional backlinks) |
| 19. Guardrails | [[ADR-015]], [[EVENSTAR_PRINCIPLES]], [[OQ-013]], [[PSS-REQ-004]], [[PSS-REQ-006]], [[PSS-REQ-012]], [[PSS-REQ-013]], [[PSS-REQ-014]] (+5 additional backlinks) |
| 20. Open Questions for Astra | [[BACKLOG]], [[CONFLICT_REGISTER]], [[EVENT_AND_API_CONTRACTS]], [[EXTRACTION_REVIEW]], [[FUTURE_IDEAS]], [[OPEN_QUESTIONS]], [[OQ-003]], [[OQ-005]] (+23 additional backlinks) |
| 21. Astra's Role | [[KNOWLEDGE_GOVERNANCE]] |
| 22. MVP Vertical Slice | [[BACKLOG]], [[CURRENT_STATE]], [[DEMO_STRATEGY]], [[MVP]], [[OQ-012]], [[OQ-024]], [[PBS_TO_PSS_HYDRAULICS]], [[PSS_HYDRAULICS]] (+5 additional backlinks) |
| 23. Definition of Success | [[EVENSTAR_VISION]], [[PSS_VISION]] |

## PMS

| Original major section | Derived homes |
| --- | --- |
| 1. Position Inside Evenstar | [[ADR-001]], [[EV-REQ-001]], [[PMS_HOME]], [[PMS_VISION]], [[SYSTEM_BOUNDARIES]] |
| 2. Vision | [[EVENSTAR_VISION]], [[PMS_VISION]] |
| 3. Airtable as PMS Application Layer | [[EVENSTAR_ARCHITECTURE]], [[PMS_AIRTABLE_ARCHITECTURE]], [[PMS_AIRTABLE_INTERFACES]], [[PMS_ARCHITECTURE]], [[PMS_VISION]], [[TECHNOLOGY_REGISTER]] |
| 4. One PMS Base Per Project | [[ADR_INDEX]], [[CONFLICT_REGISTER]], [[OQ-011]], [[PMS_AIRTABLE_ARCHITECTURE]], [[PMS_ARCHITECTURE]], [[PMS_PORTFOLIO]], [[PROJECT_CREATION]], [[PROJECT_HANDOVER]] (+1 additional backlinks) |
| 5. Project Provisioning | [[ADR-006]], [[OQ-010]], [[OQ-021]], [[PMS-REQ-009]], [[PMS_AIRTABLE_ARCHITECTURE]], [[PMS_TEMPLATES]], [[PROJECT_CREATION]], [[PROJECT_IDENTITY]] |
| 6. Deliverable-Centered Model | [[ADR-012]], [[GLOSSARY]], [[PMS-REQ-001]], [[PMS_DATA_MODEL]], [[PMS_DELIVERABLES]] |
| 7. Recommended Airtable Tables | [[DOCUMENT]], [[DOCUMENT_REVIEW_APPROVAL]], [[ENGINEERING_REFERENCE]], [[GLOSSARY]], [[MULTIDISCIPLINE_EXPANSION]], [[OQ-015]], [[OQ-021]], [[OQ-022]] (+10 additional backlinks) |
| 8. PBS Engineering References | [[CANONICAL_IDENTITY]], [[ENGINEERING_REFERENCE]], [[INT-REQ-009]], [[INTEGRATION_ARCHITECTURE]], [[OQ-016]], [[PMS-REQ-003]], [[PMS_ENGINEERING_REFERENCES]], [[PMS_PBS_INTEGRATION]] |
| 9. PSS → PMS Promotion | [[ADR-013]], [[GLOSSARY]], [[INTEGRATION_ARCHITECTURE]], [[OQ-017]], [[PMS-REQ-004]], [[PMS_PSS_PROMOTION]], [[PSS_TO_PMS_PROMOTION]] |
| 10. Deliverable Evidence | [[ADR-012]], [[ADR-013]], [[INT-REQ-009]], [[OQ-017]], [[PMS-REQ-005]], [[PMS_DELIVERABLES]], [[PMS_DOCUMENTS_REVISIONS]], [[PMS_PSS_PROMOTION]] (+1 additional backlinks) |
| 11. Suggested Lifecycle | [[DOCUMENT_REVIEW_APPROVAL]], [[OQ-015]], [[PMS-REQ-008]], [[PMS_PROJECT_LIFECYCLE]], [[PMS_REVIEWS_APPROVALS]] |
| 12. Review, Approval and Revision | [[DOCUMENT]], [[DOCUMENT_REVIEW_APPROVAL]], [[EV-REQ-006]], [[OQ-015]], [[PMS-REQ-005]], [[PMS-REQ-006]], [[PMS-REQ-007]], [[PMS_DOCUMENTS_REVISIONS]] (+3 additional backlinks) |
| 13. Project Lifecycle | [[OQ-022]], [[PMS_PROJECT_LIFECYCLE]], [[PMS_VISION]], [[PROJECT_HANDOVER]] |
| 14. Airtable Interfaces | [[PMS-REQ-011]], [[PMS_AIRTABLE_ARCHITECTURE]], [[PMS_AIRTABLE_INTERFACES]] |
| 15. Data Flow | [[INTEGRATION_ARCHITECTURE]], [[PMS_ARCHITECTURE]], [[PMS_PBS_INTEGRATION]], [[SYSTEM_MAP]] |
| 16. PSS Base vs PMS Base | [[ADR-001]], [[ADR-007]], [[EVENSTAR_ARCHITECTURE]], [[INT-REQ-002]], [[PMS_AIRTABLE_ARCHITECTURE]], [[PMS_ARCHITECTURE]], [[SYSTEM_MAP]] |
| 17. Data Ownership | [[ADR-005]], [[ADR-013]], [[CONFLICT_REGISTER]], [[DATA_OWNERSHIP]], [[DOCUMENT]], [[EV-REQ-004]], [[OQ-015]], [[OQ-017]] (+7 additional backlinks) |
| 18. Cross-System Identity | [[ADR-002]], [[CANONICAL_IDENTITY]], [[DATA_OWNERSHIP]], [[ENGINEERING_REFERENCE]], [[EV-REQ-002]], [[INT-REQ-001]], [[INT-REQ-007]], [[PMS-REQ-003]] (+4 additional backlinks) |
| 19. Airtable Automations | [[OQ-017]], [[PMS-REQ-010]], [[PMS-REQ-012]], [[PMS_AUTOMATIONS]], [[PMS_PSS_PROMOTION]] |
| 20. Integration Layer | [[ADR-014]], [[EV-REQ-005]], [[EVENSTAR_ARCHITECTURE]], [[EVENT_AND_API_CONTRACTS]], [[INT-REQ-007]], [[INTEGRATION_ARCHITECTURE]], [[OQ-018]], [[PMS_ARCHITECTURE]] (+3 additional backlinks) |
| 21. Multi-Discipline Expansion | [[FUTURE_IDEAS]], [[MULTIDISCIPLINE_EXPANSION]], [[PMS-REQ-002]], [[PMS_PROJECT_LIFECYCLE]] |
| 22. Future Side Project --- Project Document Generation | [[AI_ASSISTANCE]], [[DOCUMENT_REVIEW_APPROVAL]], [[EV-REQ-007]], [[FUTURE_IDEAS]], [[MULTIDISCIPLINE_EXPANSION]], [[OQ-023]], [[PROJECT_DOCUMENT_GENERATION]] |
| 23. AI | [[AI_ASSISTANCE]], [[DOCUMENT_REVIEW_APPROVAL]], [[EV-REQ-007]], [[PMS-REQ-010]], [[PMS_AUTOMATIONS]], [[PMS_REVIEWS_APPROVALS]], [[SECURITY_AND_ACCESS]] |
| 24. Permissions | [[DOCUMENT_REVIEW_APPROVAL]], [[OQ-019]], [[PMS_REVIEWS_APPROVALS]], [[SECURITY_AND_ACCESS]] |
| 25. Portfolio View | [[FUTURE_IDEAS]], [[OQ-011]], [[PMS_AIRTABLE_ARCHITECTURE]], [[PMS_ARCHITECTURE]], [[PMS_PORTFOLIO]], [[TECHNOLOGY_REGISTER]] |
| 26. Template Strategy | [[OQ-010]], [[PMS-REQ-009]], [[PMS_AIRTABLE_ARCHITECTURE]], [[PMS_PROJECT_LIFECYCLE]], [[PMS_TEMPLATES]], [[REFERENCE_PLANTS]] |
| 27. Suggested MVP | [[CURRENT_STATE]], [[DEMO_STRATEGY]], [[MVP]], [[OQ-024]], [[PMS-REQ-002]], [[PMS-REQ-011]], [[PMS_AIRTABLE_INTERFACES]], [[ROADMAP]] (+1 additional backlinks) |
| 28. Guardrails | [[ADR-007]], [[ADR-013]], [[ADR-014]], [[EV-REQ-005]], [[EVENSTAR_PRINCIPLES]], [[INT-REQ-002]], [[OQ-018]], [[PMS-REQ-003]] (+6 additional backlinks) |
| 29. Open Questions for Astra | [[BACKLOG]], [[CONFLICT_REGISTER]], [[DATA_OWNERSHIP]], [[DOCUMENT]], [[EVENT_AND_API_CONTRACTS]], [[EXTRACTION_REVIEW]], [[FUTURE_IDEAS]], [[OPEN_QUESTIONS]] (+24 additional backlinks) |
| 30. Astra's Role | [[KNOWLEDGE_GOVERNANCE]] |
| 31. Definition of Success | [[ADR-012]], [[EVENSTAR_PRINCIPLES]], [[EVENSTAR_VISION]], [[PMS-REQ-005]], [[PMS_DELIVERABLES]], [[PMS_VISION]] |

## Related notes

- [[SOURCE_INDEX]]
- [[EXTRACTION_REVIEW]]
