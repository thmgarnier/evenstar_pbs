---
type: "register"
status: "recorded"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "register"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#16. Supabase / PostgreSQL|PBS — 16. Supabase / PostgreSQL]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#17. Object Storage|PBS — 17. Object Storage]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#18. Data Ownership|PBS — 18. Data Ownership]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#26. Revisions and Engineering Change|PBS — 26. Revisions and Engineering Change]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#27. Historical Demo Strategy|PBS — 27. Historical Demo Strategy]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#35. Accepted Historical Decisions|PBS — 35. Accepted Historical Decisions]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#36. Decisions Requiring Reconciliation|PBS — 36. Decisions Requiring Reconciliation]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#8. Reusable Project Input Model|PSS — 8. Reusable Project Input Model]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#14. Data Ownership|PSS — 14. Data Ownership]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#15. Study Overrides and Design Proposals|PSS — 15. Study Overrides and Design Proposals]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#20. Open Questions for Astra|PSS — 20. Open Questions for Astra]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#4. One PMS Base Per Project|PMS — 4. One PMS Base Per Project]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#17. Data Ownership|PMS — 17. Data Ownership]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#29. Open Questions for Astra|PMS — 29. Open Questions for Astra]]"]
---

# Conflicts, ambiguities and reconciliation

The current briefs largely agree. No direct contradiction among their explicit PBS/PSS/PMS ownership guardrails was found. The following conflicts with historical framing and ambiguous overlaps remain visible. “Recommended resolution” is not an accepted decision unless linked to one.

## C-001 — Historical PBS scope versus current constituent systems

**CONFLICT DETECTED**  
**Existing:** Earlier PBS portfolio named Process, Control, Project and Workflow demos.  
**New:** Current source/user boundary gives computation to PSS and delivery to PMS.  
**Affected:** [[HISTORICAL_ARCHITECTURE]], [[SYSTEM_BOUNDARIES]], [[INSTRUMENT]], [[ENGINEERING_CHANGE]], historical PBS ADR summaries.  
**Recommended resolution:** Preserve history and use [[ADR-001]] / [[ADR-016]] for current responsibility.  
**Status:** Boundary-level evolution recorded; detailed control/review/provisioning migration remains [[OQ-005]], [[OQ-010]], [[OQ-014]]. No implemented migration claimed.

## C-002 — Document metadata and storage overlap

**CONFLICT DETECTED — unresolved ownership ambiguity**  
**Existing:** PBS lists candidate document metadata and object storage responsibilities.  
**New:** PMS explicitly owns document-control metadata; storage ownership is an open source question.  
**Affected:** [[DOCUMENT]], [[PBS_ENGINEERING_DATA]], [[PMS_DOCUMENTS_REVISIONS]], [[DATA_OWNERSHIP]], [[OQ-015]].  
**Recommended resolution:** Distinguish PBS plant links/asset metadata, PMS controlled revision metadata and binary storage; decide field and file authority explicitly.  
**Status:** Open; no binary storage authority assigned.

## C-003 — Engineering-change review versus plant application

**CONFLICT DETECTED — unresolved interface ambiguity**  
**Existing:** PBS owns plant changes/revisions and acceptance/application.  
**New:** PMS owns reviews/approvals/change coordination; PSS proposals may use PBS/PMS workflow.  
**Affected:** [[ENGINEERING_CHANGE]], [[PSS_TO_PBS_DESIGN_CHANGE]], [[PMS_REVIEWS_APPROVALS]], [[OQ-005]].  
**Recommended resolution:** Define review orchestration and canonical application as distinct responsibilities with an explicit transaction.  
**Status:** Open at contract level; accepted high-level owners are preserved.

## C-004 — Reusable equipment inputs versus physical design values

**CONFLICT DETECTED — field-level authority ambiguity**  
**Existing:** PBS owns physical/design equipment metadata.  
**New:** PSS Project Data lists equipment/vendor parameters and reusable engineering variables.  
**Affected:** [[EQUIPMENT]], [[PSS_PROJECT_DATA]], [[DATA_OWNERSHIP]], [[OQ-021]].  
**Recommended resolution:** Map physical design fields, reusable calculation assumptions and reference caches separately before allowing writes.  
**Status:** Open; Project Data access does not grant authority over all returned values.

## Interpretive tensions that are not contradictions

- Open-source-first and initial Airtable use coexist through a portable core and optional adapters; [[ADR-014]].
- A shared canonical backend does not mean every subsystem's data has one domain owner; [[ADR-006]].
- “One PMS base per project” is preferred, not conclusively ratified; [[OQ-011]].
- PSS register publication policy is open; PMS evidence selection remains explicit. See [[OQ-020]] and [[ADR-013]].
- PBS, PSS and PMS describe separate suggested MVPs. Their integrated sequence is a planning proposal, not a contradiction or completed implementation.

## Related notes

- [[KNOWLEDGE_GOVERNANCE]]
- [[OPEN_QUESTIONS]]
- [[ADR_INDEX]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#16. Supabase / PostgreSQL|PBS — 16. Supabase / PostgreSQL]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#17. Object Storage|PBS — 17. Object Storage]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#18. Data Ownership|PBS — 18. Data Ownership]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#26. Revisions and Engineering Change|PBS — 26. Revisions and Engineering Change]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#27. Historical Demo Strategy|PBS — 27. Historical Demo Strategy]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#35. Accepted Historical Decisions|PBS — 35. Accepted Historical Decisions]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#36. Decisions Requiring Reconciliation|PBS — 36. Decisions Requiring Reconciliation]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#8. Reusable Project Input Model|PSS — 8. Reusable Project Input Model]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#14. Data Ownership|PSS — 14. Data Ownership]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#15. Study Overrides and Design Proposals|PSS — 15. Study Overrides and Design Proposals]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#20. Open Questions for Astra|PSS — 20. Open Questions for Astra]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#4. One PMS Base Per Project|PMS — 4. One PMS Base Per Project]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#17. Data Ownership|PMS — 17. Data Ownership]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#29. Open Questions for Astra|PMS — 29. Open Questions for Astra]]
