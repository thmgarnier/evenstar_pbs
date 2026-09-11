---
type: "proposed-design"
status: "proposed"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PMS"]
aliases: []
tags: ["evenstar", "proposed-design"]
sources: ["[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#6. Deliverable-Centered Model|PMS — 6. Deliverable-Centered Model]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#7. Recommended Airtable Tables|PMS — 7. Recommended Airtable Tables]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#29. Open Questions for Astra|PMS — 29. Open Questions for Astra]]"]
---

# PMS data model

Project delivery is centered on Deliverables, related to Phases, Disciplines, Systems/Areas, optional Work Packages, Tasks, Milestones, Documents/Revisions, Reviews/Approvals, Engineering References, selected PSS Evidence, Issues/RFIs/Changes and People/Organizations.

Candidate later records include Punch List and Vendors/Procurement. Systems/Areas can reference PBS or describe delivery/WBS grouping; they must not duplicate plant engineering definitions.

Suggested deliverable fields include UUID, number/title/type, discipline/phase/system, work package, owner/reviewer/approver, dates, status/progress/priority, revision, engineering/evidence links and dependencies. Exact field ownership, tables, cardinalities and the Deliverable ↔ Document ↔ Revision relationship are open.

## Related notes

- [[PMS_HOME]]
- [[PMS_DELIVERABLES]]
- [[PMS_DOCUMENTS_REVISIONS]]
- [[ENGINEERING_REFERENCE]]
- [[OQ-015]]

## Source

- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#6. Deliverable-Centered Model|PMS — 6. Deliverable-Centered Model]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#7. Recommended Airtable Tables|PMS — 7. Recommended Airtable Tables]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#29. Open Questions for Astra|PMS — 29. Open Questions for Astra]]

## Related requirements

- [[PMS-REQ-002]]
