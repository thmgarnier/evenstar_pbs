---
type: "workflow"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "workflow"]
sources: ["[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#7. Recommended Airtable Tables|PMS — 7. Recommended Airtable Tables]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#11. Suggested Lifecycle|PMS — 11. Suggested Lifecycle]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#12. Review, Approval and Revision|PMS — 12. Review, Approval and Revision]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#22. Future Side Project --- Project Document Generation|PMS — 22. Future Side Project --- Project Document Generation]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#23. AI|PMS — 23. AI]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#24. Permissions|PMS — 24. Permissions]]"]
---

# Document review and approval

**Trigger:** A deliverable/document revision is submitted for review.

## Flow

1. Identify the deliverable/document revision, engineering references and supporting evidence.
2. Assign review responsibility and due dates; retain comments and responses.
3. Record revision-specific reviewer/approver, time and decision.
4. Issue through the configured project workflow; retain the issued history.
5. Create a new revision when content changes and link supersession instead of overwriting the issued version.

## Ownership and exceptions

PMS owns review/approval and delivery metadata. Exact state machine, role mapping, cardinalities and file storage remain open. AI-generated content follows the same review path.

## Intended completion evidence

Who reviewed/approved which revision and on what evidence remains reconstructable.

## Related notes

- [[WORKFLOWS_INDEX]]
- [[PMS_REVIEWS_APPROVALS]]
- [[DOCUMENT]]
- [[REVISION]]
- [[OQ-015]]
- [[OQ-019]]

## Source

- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#7. Recommended Airtable Tables|PMS — 7. Recommended Airtable Tables]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#11. Suggested Lifecycle|PMS — 11. Suggested Lifecycle]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#12. Review, Approval and Revision|PMS — 12. Review, Approval and Revision]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#22. Future Side Project --- Project Document Generation|PMS — 22. Future Side Project --- Project Document Generation]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#23. AI|PMS — 23. AI]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#24. Permissions|PMS — 24. Permissions]]

## Related requirements

- [[PMS-REQ-006]]
