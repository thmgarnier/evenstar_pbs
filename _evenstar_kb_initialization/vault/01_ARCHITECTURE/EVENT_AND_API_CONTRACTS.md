---
type: "proposed-design"
status: "proposed"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "proposed-design"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#20. APIs / Events|PBS — 20. APIs / Events]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#16. Integration Architecture|PSS — 16. Integration Architecture]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#20. Open Questions for Astra|PSS — 20. Open Questions for Astra]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#20. Integration Layer|PMS — 20. Integration Layer]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#29. Open Questions for Astra|PMS — 29. Open Questions for Astra]]"]
---

# Events and API contracts

**Proposed contract inventory. No endpoint, event schema or transport is ratified or implemented by this vault.**

| Contract candidate | Minimum information to resolve | Decision dependency |
| --- | --- | --- |
| Project provisioning / connect base | Project UUID, subsystem, base mapping, template version, outcome | OQ-010, OQ-011 |
| PBS topology read | Source revision, stable nodes/edges, geometry, units, missing physical fields | OQ-003, OQ-006 |
| Project Data read/write/compare | Domain ID, source mapping, typed value, basis, expected revision, authorized action | OQ-007, OQ-008 |
| Design proposal | Origin run, affected UUIDs, before/after, reason, source revision, review outcome | OQ-005 |
| PMS engineering reference refresh | Project/object UUID, display attributes, source revision/freshness | OQ-016 |
| PSS evidence promotion | Immutable evidence identity/version, selected scope, target deliverable revision | OQ-017 |

PBS source candidates include `project.created`, `engineering_object.updated`, `pipe.route_changed`, `revision.created` and `design_change.proposed/accepted/rejected`. PSS candidates include `pss.run.completed`, `pss.results.published`, `pss.design_proposal.created` and `project_data.changed`. These names preserve source direction without constituting a protocol.

PMS source examples include `GET /projects/{id}/deliverables`, `/milestones`, `/documents`, `/issues` and `POST /projects/{id}/engineering-references` or `/promoted-pss-evidence`. Their exact schemas, authorization, error semantics and versioning are open.

Recommended design checks: stale-version detection, explicit unit/basis validation, idempotent retry where writes can be repeated, traceable actor/origin, and no partial success presented as full completion. These are proposed contract review criteria; transport and transaction design need decisions.

## Related notes

- [[INTEGRATION_ARCHITECTURE]]
- [[OPEN_ARCHITECTURE_QUESTIONS]]
- [[INTEGRATION_REQUIREMENTS]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#20. APIs / Events|PBS — 20. APIs / Events]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#16. Integration Architecture|PSS — 16. Integration Architecture]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#20. Open Questions for Astra|PSS — 20. Open Questions for Astra]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#20. Integration Layer|PMS — 20. Integration Layer]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#29. Open Questions for Astra|PMS — 29. Open Questions for Astra]]

## Related requirements

- [[INT-REQ-007]]
