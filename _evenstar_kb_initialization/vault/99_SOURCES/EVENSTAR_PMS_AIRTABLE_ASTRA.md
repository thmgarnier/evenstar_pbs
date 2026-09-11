# Evenstar PMS --- Project Management System

## Airtable-Centered Consolidated Astra Project Brief

> **Purpose:** Consolidated source document for Astra for the Evenstar
> Project Management System (PMS). PMS is initially an Airtable-centered
> project-delivery application integrated with PBS and PSS through
> stable project and engineering-object identities.

# 1. Position Inside Evenstar

``` text
                         EVENSTAR
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
         PBS               PSS               PMS
  Plant Build System  Plant Simulation  Project Management
                           System            System
```

PMS answers **How are we delivering the project?** PBS answers **What
are we building?** PSS answers **How does it behave?**

PMS must not become a duplicate plant database or simulation database.

# 2. Vision

PMS connects engineering work with deliverables, disciplines,
systems/areas, responsibilities, due dates, milestones, reviews,
approvals, revisions, issues, changes, documents, procurement, and
project status.

> **Project management records should know what engineering they refer
> to.**

A deliverable should reference the canonical PBS objects/systems it
concerns. A process deliverable should be able to reference the selected
PSS model, run, study, report, or promoted design basis supporting it.

# 3. Airtable as PMS Application Layer

The first PMS implementation should be built primarily in **Airtable**.

Airtable provides relational project records, collaborative editing,
views, filters, Interfaces, dashboards, forms, comments, attachments,
lightweight automations, permissions, and project registers.

For the initial implementation:

> **Airtable is the PMS application/workspace layer.**

PMS should nevertheless retain stable Evenstar project and engineering
identities so it remains interoperable and portable.

# 4. One PMS Base Per Project

Preferred structure:

``` text
EVENSTAR PROJECT
       ├── PBS canonical project
       ├── PSS Project Base / Engineering Register
       └── PMS Airtable Project Base
```

One PMS base per project provides clean boundaries, simpler permissions,
project-specific Interfaces, manageable records, easier archiving, and
template provisioning.

Portfolio reporting can later use a central aggregation layer.

# 5. Project Provisioning

Creating an Evenstar project should eventually provision a PMS Airtable
base from a versioned template.

``` text
CREATE EVENSTAR PROJECT
        ▼
Canonical Project UUID
        ├── PBS project
        ├── PSS project/base
        └── PMS project
               ▼
       Create Airtable PMS Base
               ├── core tables
               ├── relationships
               ├── interfaces/views
               ├── automations
               └── template version
```

Evenstar Core/Supabase should register the project UUID, Airtable base
ID, schema/template version, and mapping metadata. Users should not
manage Airtable table IDs/API details manually.

# 6. Deliverable-Centered Model

PMS should be **deliverable-centered**, not task-centered.

``` text
PROJECT
   ├── PHASES
   ├── DISCIPLINES
   ├── SYSTEMS / AREAS
   └── DELIVERABLES
          ├── Tasks
          ├── Milestones
          ├── Documents / Revisions
          ├── Reviews / Approvals
          ├── Engineering Object References
          ├── PSS Evidence
          ├── Issues / RFIs / Changes
          └── Ownership / Dates / Status
```

Tasks support deliverables; deliverables are the stronger center of
gravity.

# 7. Recommended Airtable Tables

## Projects

Project UUID, code, name, client, location, type, dates, manager,
status, phase, PBS/PSS references, template version.

## Phases

Concept, Feasibility, Pre-FEED, FEED, Basic Engineering, Detailed
Engineering, Procurement, Construction, Commissioning, Handover.

## Disciplines

Process, Mechanical, Piping, Electrical, Instrumentation & Control,
Civil, Structural, HSE, Project Controls, Procurement.

PMS must be multi-discipline.

## Systems / Areas

Project-facing references to PBS systems, areas, units, packages, or WBS
elements. Do not recreate their engineering definition unnecessarily.

## Work Packages

Optional delivery/procurement/construction grouping.

## Deliverables

Central table. Suggested fields: UUID, number, title, type, discipline,
phase, system/area, work package, owner, reviewer, approver, planned
start, due/forecast/actual dates, status, progress, priority, revision,
PBS references, PSS evidence, document link, dependencies, notes.

## Tasks

Task, Deliverable, Owner, Due Date, Status, Priority, Dependencies,
Notes.

## Milestones

Major project gates and issue dates.

## Engineering Object References

Bridge to PBS canonical identity: Project UUID, PBS Object UUID,
KKS/tag, object type/name/system, refresh/source metadata. This is not a
duplicate canonical equipment database.

## Documents

Document
UUID/number/title/type/discipline/deliverable/revision/status/file or
URL/owner/issue date/PBS and PSS references.

## Revisions

Revision ID, document/deliverable, code, description, creator/date,
issue purpose, status, supersedes.

## Reviews

Deliverable/document, revision, reviewer, type, due/completed dates,
status, comments/response reference.

## Approvals

Deliverable/document, revision, approver, decision, date, comments.

## Issues

Engineering/project issues requiring resolution.

## RFIs

Requests for information.

## Changes

Project/design changes and impact/status.

## Punch List

Construction/commissioning/handover items.

## Vendors / Procurement

Future vendor/package/purchase tracking.

## People / Organizations

Project participants, companies, roles and responsibilities.

# 8. PBS Engineering References

PMS links delivery to real engineering objects without copying the
canonical plant model.

``` text
PMS DELIVERABLE
"Pump Datasheet — P-101"
       ├── Discipline: Mechanical
       ├── Due Date / Status
       └── PBS Object Reference
                ▼
          PBS UUID: 6f...91
          KKS: 10LAC10AP001
          Type: Pump
```

The PBS UUID is the technical reference; KKS/tag/name may be cached for
Airtable usability.

# 9. PSS → PMS Promotion

PMS should not ingest every PSS run.

``` text
PSS
├── PSS-181
├── PSS-182
├── PSS-183
└── PSS-184 ← selected design basis
          ▼
     PROMOTE / REFERENCE
          ▼
PMS DELIVERABLE
Heat & Material Balance
Revision C
Basis: PSS-184
```

Only selected/promoted engineering information normally becomes formal
PMS evidence.

# 10. Deliverable Evidence

A deliverable may reference PBS systems/equipment, selected PSS
runs/reports, design basis, document revision, reviewer and approval.

PMS should answer:

> **What engineering evidence supports this deliverable and revision?**

# 11. Suggested Lifecycle

``` text
Planned
   ↓
In Progress
   ↓
Ready for Review
   ↓
In Review
   ↓
Approved / Issued
   ↓
Superseded
```

Provide a strong default but permit client/project-specific workflows.

# 12. Review, Approval and Revision

Reviews/approvals should preserve who, what revision, when,
decision/status, comments, and supersession.

Issued engineering history must not be silently overwritten. A new
revision supersedes an earlier revision.

# 13. Project Lifecycle

PMS should eventually support Concept/Feasibility → Pre-FEED/FEED →
Basic Engineering → Detailed Engineering → Procurement → Construction →
Commissioning → Handover.

The MVP need not implement every domain at industrial depth.

# 14. Airtable Interfaces

Design PMS for polished Interfaces, not only raw tables.

Candidate Interfaces:

-   **Project Home:** progress, milestones, overdue deliverables,
    discipline/status charts, key dates.
-   **Deliverables:** filter/group by phase, discipline, system, owner,
    status, date, priority.
-   **Discipline Dashboard:** discipline-specific deliverables and
    review queues.
-   **Reviews / Approvals:** awaiting review, overdue reviews, approval
    queue, issued revisions.
-   **Engineering Object View:** linked
    deliverables/documents/issues/changes/PSS evidence for a PBS object.
-   **Milestones**
-   **Issues / Changes**
-   **Document Control**

# 15. Data Flow

``` text
PBS / SUPABASE
Canonical plant information
        │ stable references
        ▼
       PMS
   Airtable Base
        ▲
        │ selected/promoted evidence
       PSS
Engineering Register / Simulation
```

PMS is where engineering work becomes controlled project-delivery
information.

# 16. PSS Base vs PMS Base

Keep them separate.

``` text
PSS AIRTABLE BASE                 PMS AIRTABLE BASE
Engineering Register             Project Delivery
├── project inputs               ├── deliverables
├── compositions                 ├── tasks
├── cases                        ├── milestones
├── models                       ├── documents
├── runs                         ├── revisions
├── results                      ├── reviews
├── studies                      ├── approvals
└── reports                      ├── issues
                                 └── project status
```

Only selected information crosses the boundary.

# 17. Data Ownership

  -----------------------------------------------------------------------
  Information                         Owner
  ----------------------------------- -----------------------------------
  Canonical engineering identity      PBS / Evenstar canonical model

  Plant geometry/topology             PBS

  Simulation models/runs/results      PSS

  PSS reusable engineering inputs     PSS Project Data

  Deliverables/tasks/milestones       PMS

  Delivery status                     PMS

  Reviews/approvals                   PMS

  Issues/RFIs                         PMS

  PMS document-control metadata       PMS

  Selected calculation evidence       PSS remains source; PMS stores
                                      promotion/reference context
  -----------------------------------------------------------------------

# 18. Cross-System Identity

Every relevant PMS record should retain the Evenstar Project UUID.
Engineering references use PBS UUIDs; PSS evidence uses stable PSS
model/run/report/study identifiers.

# 19. Airtable Automations

Useful automations may notify owners before due dates, flag overdue
deliverables, notify reviewers, create review records, update statuses
after approvals, flag blocked critical deliverables, surface aging
issues/RFIs, and notify when selected PSS evidence is superseded.

Important workflow logic should remain documented and inspectable.

# 20. Integration Layer

Potential semantics:

``` text
GET  /projects/{id}/deliverables
GET  /projects/{id}/milestones
GET  /projects/{id}/documents
GET  /projects/{id}/issues
POST /projects/{id}/deliverables
POST /projects/{id}/engineering-references
POST /projects/{id}/promoted-pss-evidence
```

Implementation may use Airtable APIs, Supabase/Evenstar services, n8n,
or server functions. Do not bind the conceptual model permanently to one
integration tool.

# 21. Multi-Discipline Expansion

PMS must anticipate Process, Mechanical, Piping, Electrical, I&C, Civil,
Structural and other engineering sources without requiring their
technical databases to live in PMS.

# 22. Future Side Project --- Project Document Generation

**Status: OPEN QUESTION / FUTURE SIDE PROJECT. Do not fully design
yet.**

``` text
PBS / Supabase ──────────────┐
PSS / Process Airtable ──────┤
Electrical Engineering ──────┤
Instrumentation / Control ───┤
Mechanical / Piping ─────────┤
Civil / Structural ──────────┤
Approved calculations ───────┤
Project metadata ─────────────┤
                             ▼
                 DOCUMENT GENERATION SYSTEM
                             │
                 Basic / Detailed Engineering
                             ▼
                            PMS
                 controlled deliverable/document
```

Generated documents must enter normal revision/review/approval control
and must not bypass engineering review because AI or automation produced
them.

# 23. AI

AI may assist with summaries, overdue-item explanations, dependency
identification, project updates, search, missing-evidence detection,
review packages, change summaries, and future document drafting.

AI must not automatically approve work or silently change controlled
state.

# 24. Permissions

Future roles may include Project Manager, Engineering Manager,
Discipline Lead, Engineer, Reviewer, Approver, Client/External Reviewer,
and Viewer. Exact Airtable/Evenstar permission mapping remains an open
design question.

# 25. Portfolio View

One-base-per-project means cross-project reporting needs a separate
portfolio architecture: possible Supabase portfolio register,
aggregation service, Airtable portfolio base, BI layer, or Evenstar
dashboard.

Do not force all projects into one Airtable base merely to simplify
portfolio reporting.

# 26. Template Strategy

Provision PMS from **versioned templates**. Templates may vary for EPC,
owner's engineering, FEED/studies, power, LNG/oil & gas,
water/wastewater, or consulting projects while preserving stable core
contracts.

Avoid uncontrolled schema fragmentation.

# 27. Suggested MVP

One project base with approximately:

-   3 disciplines;
-   2 systems;
-   10--20 deliverables;
-   tasks;
-   milestones;
-   documents/revisions;
-   reviews/approvals;
-   PBS object references;
-   one promoted PSS result/report.

The user should open a dashboard, inspect deliverables, see linked PBS
objects and PSS evidence, submit a revision, review/approve/issue it,
and see status update.

# 28. Guardrails

Avoid making PMS the canonical plant database; copying PBS engineering
data into an independent truth; copying every PSS result; making tasks
more important than deliverables; designing only for Process; merging
PSS/PMS Airtable bases; opaque automation logic; overwriting issued
history; AI bypassing review; one giant universal base; uncontrolled
template divergence; or binding the conceptual PMS model permanently to
Airtable internals.

# 29. Open Questions for Astra

1.  Exact core Airtable schema.
2.  MVP tables versus later tables.
3.  Deliverable ↔ Document ↔ Revision model.
4.  Reviews/Approvals table design.
5.  PBS reference synchronization.
6.  PSS promotion/reference contract.
7.  Detection of superseded PSS evidence.
8.  Airtable provisioning mechanism.
9.  Template versioning/migrations.
10. Portfolio architecture.
11. Permission mapping.
12. PBS engineering-change vs PMS workflow ownership.
13. Client-specific workflow configuration.
14. Document storage ownership.
15. Procurement depth.
16. Construction/commissioning depth.
17. Future document-generation contracts.

# 30. Astra's Role

For each PMS idea Astra should identify the project-management problem,
authoritative owner, subsystem boundary, Airtable tables/relationships,
UUID requirements, Interface consequences, workflow/automation effects,
permissions, API consequences, template/migration consequences, open
questions, smallest coherent implementation, exact Airtable steps when
requested, and acceptance criteria.

Astra must not redesign PBS or PSS inside PMS merely because Airtable
makes duplication easy.

# 31. Definition of Success

``` text
Heat & Material Balance — Revision C
        ├── Project UUID
        ├── Discipline: Process
        ├── PBS Systems / Equipment
        ├── PSS Run PSS-184
        ├── PSS Report
        ├── Owner / Due Date
        ├── Reviewer
        ├── Approval
        └── Issue Status
```

The project manager sees **what is being delivered**. The engineer sees
**what engineering supports it**.

> **PBS defines the plant. PSS computes its behavior. PMS delivers the
> project.**
