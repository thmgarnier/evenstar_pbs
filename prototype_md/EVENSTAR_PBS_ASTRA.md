# Evenstar PBS --- Plant Build System

## Consolidated Astra Project Brief

> **Purpose:** Consolidated source document for Astra. It preserves the
> established PBS architecture while applying the newer Evenstar
> boundary: **PBS owns what is being built; PSS owns how it behaves; PMS
> owns how it is delivered.**

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

PBS is Evenstar's canonical plant-definition and plant-design
environment.

Its primary question is **What are we building?**

PSS answers **How does it behave?**

PMS answers **How are we delivering it?**

# 2. Vision

PBS is an open-source environment for defining, designing, visualizing,
connecting, organizing, and documenting industrial plants.

A plant must not be a pile of disconnected files. PBS treats it as a
canonical set of engineering objects with multiple synchronized
representations.

> **ONE ENGINEERING OBJECT, MANY REPRESENTATIONS.**

And across Evenstar:

> **CREATE ENGINEERING INFORMATION ONCE; REUSE IT EVERYWHERE.**

The same pump, valve, vessel, exchanger, instrument, line, system, or
component may appear in plant hierarchy, PFD/P&ID, 3D, engineering data,
piping topology, instrumentation, documents, PSS references, and PMS
references without becoming duplicate identities.

# 3. Product Character

PBS should be minimal, fast, contextual, searchable, keyboard-friendly,
collaborative, visually sophisticated, engineering-rigorous, open-source
first, and consistent with the Evenstar design language.

Do not force 3D, P&ID, data tables, and inspectors into one generic
interaction paradigm.

# 4. Core Ownership

PBS is authoritative for canonical **plant definition**, including as
applicable:

-   project/plant/system hierarchy as it relates to plant definition;
-   canonical engineering-object identity;
-   KKS/tag relationships;
-   equipment identity and PBS-owned physical/design metadata;
-   ports/nozzles/connection points;
-   physical connectivity;
-   piping/line topology;
-   plant geometry and equipment placement;
-   pipe routes;
-   instruments as plant engineering objects;
-   physical/control relationships defining what exists;
-   components/assemblies;
-   materials/parts/specifications;
-   links to controlled documents;
-   plant revisions/change sets.

PBS does not own PSS solver/model state or simulation results, nor PMS
delivery workflow state.

# 5. Canonical Identity

Every persistent engineering object receives a stable UUID. KKS and
engineering tags are first-class human identifiers but not relational
primary keys.

``` text
UUID:   6f...91
KKS:    10LAC10AP001
Type:   centrifugal_pump
System: Feedwater
```

A KKS/tag may change under controlled revision without breaking
relationships.

# 6. Canonical Hierarchy

``` text
Project
└── Plant
    └── System
        └── Engineering Object
            ├── Equipment
            ├── Instrument
            ├── Line / Pipe
            ├── Stream relationship
            ├── Component
            └── other typed objects
```

Astra must explicitly distinguish physical lines/pipes, process-stream
identity, connections, and PSS computational streams.

# 7. Core Entities

PBS must refine at least:

-   Project
-   Plant
-   System
-   Engineering Object
-   Equipment
-   Ports / Nozzles / Connection Points
-   Connections
-   Lines / Pipes
-   Streams where required for plant definition/linking
-   Instruments
-   Control Relationships / Loops
-   Components
-   Materials
-   Parts Catalog
-   Documents
-   Revisions / Change Sets

Relationships are first-class data.

PBS should answer questions such as: what connects to this nozzle; where
is this valve in P&ID and 3D; which instruments affect this object;
which PSS model references it; which PMS deliverable references it; what
documents apply; and what changed in the latest revision.

# 8. P&ID / Process Definition

PBS should provide a native data-driven P&ID/process-definition
interface.

A placed symbol instantiates or references a real engineering object. A
line between ports creates/modifies an explicit relationship. The P&ID
is not merely a drawing.

Capabilities should include equipment, lines, ports/nozzles, valves,
instruments, control relationships, KKS/tags, inspectors,
validation/completeness checks, revision awareness, and cross-navigation
to 3D/data/PSS/PMS.

PBS may display PSS results contextually, but calculation remains a PSS
concern.

# 9. Plant 3D Builder

The 3D builder is a defining PBS interface. It should combine the
accessibility of a building/strategy game with real engineering
semantics.

Users should be able to place/move/rotate equipment, define areas,
connect equipment, use pipe racks/support concepts, inspect canonical
objects, route piping, modify generated routes, and navigate among
representations.

3D objects are not decorative meshes; relevant objects resolve to
canonical engineering identity.

# 10. KKS-Based Layers

KKS/system hierarchy should drive useful visibility similar to CAD
layers.

Engineers should be able to show/hide systems, subsystems, services,
equipment classes, disciplines, selected KKS ranges, instrumentation,
and later other engineering layers.

Layer state should derive from canonical metadata rather than exist only
inside the renderer.

# 11. Smart Piping Routing

PBS should eventually provide constraint-aware smart pipe routing.

> **Automatic enough to save time, editable enough to remain
> engineering.**

Routing should consider compatible connection points, obstacles,
racks/corridors, orderly alignment, practical symmetry, unnecessary
turns, clearances/constraints as the system matures, manual waypoints,
locked segments, rerouting, undo/redo, and visible conflicts.

Generated routes must remain inspectable and modifiable.

# 12. Piping as Engineering Data

A pipe route creates/updates engineering data:

``` text
PIPE OBJECT
├── UUID
├── line/KKS
├── from port
├── to port
├── service
├── diameter
├── specification
├── material
├── route geometry
├── fittings
├── valves/components
├── elevation profile
└── revision
```

Calculated hydraulic values belong to PSS.

# 13. PBS → PSS Hydraulics

If PBS already knows connectivity, lengths, diameters, elevations,
fittings, valves, pumps, and topology, PSS must read that information
and construct the hydraulic model rather than asking the process
engineer to redraw it.

``` text
PBS CANONICAL PLANT
      │
      ├── pipes
      ├── ports/nodes
      ├── topology
      ├── diameters
      ├── lengths
      ├── elevations
      ├── valves/fittings
      └── equipment
      ▼
PSS HYDRAULICS
      ├── imports topology
      ├── adds simulation-only assumptions
      ├── calculates
      └── tests study overrides
```

A PSS study may test a different diameter without altering PBS. A
successful study may generate a **proposed design change** back to PBS.
PSS never silently overwrites canonical plant state.

# 14. Engineering Data / Parts / Materials

PBS should provide modern database-style engineering views for
equipment, line lists, instrument registers, materials, parts,
specifications, assemblies, BOM/MTO concepts, manufacturer/model
references, datasheets/documents, KKS lookup, and system hierarchy.

# 15. One Object, Many Representations

``` text
P-101
├── Canonical UUID
├── KKS / tag
├── P&ID symbol
├── 3D equipment
├── equipment data
├── ports
├── connected piping
├── instrumentation relationships
├── PSS references
├── PMS references
├── documents
└── revision history
```

Selecting P-101 anywhere should allow navigation to the other
representations.

# 16. Supabase / PostgreSQL

Supabase/PostgreSQL is the initial canonical collaboration/data backbone
for PBS.

Candidate responsibilities include projects, plants, systems,
engineering objects, equipment, ports, physical connections, piping
metadata, KKS/tags, instruments, canonical relationships,
materials/parts, document metadata, revisions, permissions, and
cross-system references.

Supabase may also provide authentication, storage, and suitable realtime
features. The architecture must remain portable and open-source
friendly.

# 17. Object Storage

Object storage may hold 3D assets, drawings, P&ID exports, vendor files,
manuals, reports, images, datasheets, and attachments. Metadata and
relationships remain connected to canonical objects.

# 18. Data Ownership

Initial conceptual ownership:

  -----------------------------------------------------------------------
  Data                                Authoritative owner
  ----------------------------------- -----------------------------------
  Canonical engineering UUID          Evenstar/PBS canonical model

  KKS/tag relationship                PBS

  Plant/system hierarchy              PBS

  Equipment existence/type            PBS

  Plant geometry                      PBS

  Physical piping topology            PBS

  Pipe route/length/elevation         PBS

  Physical diameter/spec              PBS

  Instruments as plant objects        PBS

  Simulation model/state              PSS

  Calculated process properties       PSS

  Hydraulic calculated results        PSS

  Reusable PSS project inputs         PSS Project Data per its ownership
                                      rules

  Deliverables/tasks/reviews          PMS

  Project delivery status             PMS
  -----------------------------------------------------------------------

> **Every datum should have one explicit authoritative owner.**

Other systems may reference, display, cache, or propose changes to it.

# 19. Cross-System Change Principle

No subsystem silently overwrites another subsystem's authoritative
state.

PSS may propose a pipe diameter; PBS controls acceptance/application.
PMS may report delivery status but does not redefine equipment. A PBS
route change should allow PSS to detect stale imported topology and
explicitly refresh.

# 20. APIs / Events

Candidate future events include:

``` text
project.created
plant.created
system.created
engineering_object.created
engineering_object.updated
equipment.created
equipment.updated
equipment.moved
port.created
connection.created
pipe.created
pipe.route_changed
pipe.diameter_changed
instrument.added
document.linked
revision.created
design_change.proposed
design_change.accepted
design_change.rejected
```

The exact event architecture is undecided. Do not introduce unnecessary
distributed complexity.

# 21. Project Creation

``` text
CREATE EVENSTAR PROJECT
        ▼
Canonical Project UUID
        ├── PBS project/plant context
        ├── PSS context + configured PSS Airtable base
        └── PMS context/base
```

PBS consumes the common project identity but need not own all
provisioning.

# 22. Relationship to PSS

PSS is a separate Evenstar constituent.

PBS provides plant definition; PSS provides engineering
calculation/simulation.

PSS may consume equipment identity, topology, physical piping,
geometry/elevation, PBS-owned equipment parameters, instruments/control
relationships, KKS/tags, and hierarchy.

PSS may return calculated states/results, hydraulic profiles,
performance results, and proposed design changes.

# 23. Relationship to PMS

PMS is a separate Evenstar constituent. PMS references PBS canonical
objects by stable identity.

PBS does not own project-delivery workflow merely because a deliverable
concerns a PBS object.

# 24. Relationship to North Star

North Star is a separate open-source project, not part of Evenstar. Any
integration should use APIs/adapters. North Star must not become the
canonical plant database.

# 25. Collaboration

Future capabilities may include users, organizations, teams,
permissions, presence, object comments, mentions, notifications,
history, object locking where required, conflict handling, and review of
proposed plant changes.

# 26. Revisions and Engineering Change

Engineering changes must be traceable.

``` text
CURRENT PLANT
     ▼
PROPOSED CHANGE
     ├── affected objects
     ├── reason
     ├── origin
     ├── before
     └── proposed after
     ▼
REVIEW
   ┌─┴─┐
ACCEPT REJECT
   ▼
NEW REVISION
```

The PBS/PMS boundary for review/approval needs explicit cross-system
design.

# 27. Historical Demo Strategy

The earlier PBS brain defined seven portfolio demos: Process, Control,
Plant 3D, Data, Project, Workflow, and Explorer, sharing one canonical
backend.

Under the newer Evenstar split, Astra must not blindly preserve those as
permanent PBS boundaries. Some responsibilities now belong naturally to
PSS or PMS.

The durable principles remain: build narrow polished vertical slices,
share canonical identity, prove cross-system navigation, use a common
design language, avoid disconnected apps, and build the canonical model
before sophisticated interfaces.

Migration from the historical seven-demo architecture must be recorded
through ADRs rather than silently rewriting history.

# 28. Initial Technical Direction

For the portfolio/web phase, likely technologies include React/Next.js,
Supabase/PostgreSQL, Three.js/React Three Fiber or equivalent for 3D,
graph/canvas libraries where appropriate, object storage, and
APIs/adapters to PSS/PMS.

These are implementation choices, not product identity. Desktop/hybrid
architecture can evolve later.

# 29. Security

Never expose privileged Supabase service credentials to browser code.
Use RLS appropriately, keep secrets server-side/environment-scoped, use
project/org authorization, log important engineering changes, and
explicitly design cross-system writes.

# 30. Open Source

PBS-owned architecture, code, schemas, and data definitions should
remain open-source friendly and portable. Prefer documented schemas,
exportable data, interoperable formats, modular adapters, and
replaceable infrastructure.

# 31. Reference Plants

Candidate future reference plants include LNG, combined-cycle power,
refinery, water/wastewater, ammonia/fertilizer, hydrogen, utility, and
chemical plants.

For initial development use one compact but rich seed plant. A
water/thermal/process skid remains a sensible first candidate.

# 32. UX Navigation

Potential PBS navigation:

``` text
Home
Plant Explorer
P&ID
Plant 3D
Engineering Data
Piping
Instrumentation
Documents
Changes / History
```

Cross-links may include **Open in PSS** and **Open in PMS**.

Global capabilities may include search, command palette, project
switcher, notifications, undo/redo, object history, and settings.

# 33. Search / Explorer

Search should resolve UUID, KKS, tag, name, type, system, relationships,
and documents. Selecting an object should expose its graph of
representations and relationships.

# 34. AI

AI may assist with search, equipment explanation, KKS suggestions,
routing alternatives, missing-data identification, documentation,
conversational plant queries, and comparison of alternatives.

AI suggestions do not become authoritative engineering decisions
automatically.

# 35. Accepted Historical Decisions

-   **PBS-ADR-001 --- Integrated views:** PBS interfaces represent one
    Plant Build System, not unrelated applications.
-   **PBS-ADR-002 --- Shared canonical backend:** Begin portfolio phase
    with shared Supabase backend; separation may evolve later.
-   **PBS-ADR-003 --- Stable UUIDs:** UUIDs are technical identity;
    KKS/tags are human identifiers.
-   **PBS-ADR-004 --- Astra as architect/build manual:** Astra preserves
    architecture and durable project memory.
-   **PBS-ADR-005 --- Executable human tasks:** Exact actions,
    artifacts, expected results, and verification.
-   **PBS-ADR-006 --- Open source first.**
-   **PBS-ADR-007 --- Canonical model before fancy interfaces.**

# 36. Decisions Requiring Reconciliation

Astra should create explicit ADRs for:

1.  formal PBS/PSS/PMS boundary;
2.  migration of historical PBS Process/Control responsibilities toward
    PSS;
3.  migration of historical PBS Project/Workflow responsibilities toward
    PMS/shared Evenstar;
4.  streams vs physical lines;
5.  instrumentation/control ownership;
6.  PBS vs PMS engineering-change workflow;
7.  cross-system project provisioning;
8.  PSS proposed-design-change contract back to PBS.

Do not resolve these merely by editing old wording.

# 37. Initial Requirements

PBS shall use shared canonical identities; support hierarchical
plant/system organization and KKS/tags; expose stable contracts;
preserve traceability; support reproducible seed data; remain
open-source friendly; enable PSS/PMS cross-navigation; and avoid
duplicate engineering entry.

The P&ID shall instantiate/reference canonical objects, represent typed
connections/ports, expose KKS/tags, support validation, and navigate to
other representations.

3D shall render/select canonical objects, support KKS/system visibility,
physical connections, smart-routing concepts, and editable generated
routes.

Engineering Data shall browse/search equipment, instruments, materials,
parts, specifications, hierarchy, KKS, relationships, and documents.

PBS/PSS integration shall expose topology and physical
geometry/properties needed for hydraulics, allow stable UUID references,
detect/version plant changes, and accept controlled design-change
proposals rather than silent external writes.

PBS/PMS integration shall expose stable object references while leaving
delivery workflow state to PMS.

# 38. Backlog Direction

``` text
PHASE 0  Project brain / repository / architecture reconciliation
PHASE 1  Canonical PBS object model
PHASE 2  Supabase schema + security + seed plant
PHASE 3  Shared shell / object explorer / inspectors
PHASE 4  Engineering Data workspace
PHASE 5  P&ID vertical slice
PHASE 6  3D vertical slice
PHASE 7  Piping topology + smart-routing proof
PHASE 8  PBS pipe network -> PSS hydraulic-model proof
PHASE 9  PBS object -> PMS deliverable proof
PHASE 10 Cross-representation Explorer / polished demo
```

Astra may resequence when justified by dependencies.

# 39. Astra Operating Model

Astra is PBS's lead product architect, systems architect, technical
planner, canonical-model guardian, integrator, project-memory
maintainer, and interactive build manual.

For each substantial idea:

1.  identify the engineering problem;
2.  identify affected PBS objects;
3.  determine whether it belongs to PBS, PSS, PMS, or shared Evenstar;
4.  identify data ownership;
5.  identify existing requirements/ADRs affected;
6.  define data/API contracts;
7.  identify UX consequences;
8.  identify revision/change implications;
9.  identify security/collaboration implications;
10. record open questions;
11. propose the smallest coherent vertical slice;
12. generate exact implementation artifacts when authorized;
13. define acceptance criteria;
14. update durable project memory.

Astra must not allow implementation tools to silently redesign canonical
architecture.

# 40. Guardrails

Avoid disconnected duplicate object definitions; decorative-only 3D; KKS
as relational primary identity; PSS silently changing PBS state; PMS
duplicating the engineering database; simulation state inside PBS;
re-entering topology already known by PBS; hidden routing decisions;
hidden assumptions; automatically authoritative AI decisions;
proprietary lock-in; premature microservices; fancy interfaces before
canonical contracts; and silently rewriting architectural history.

# 41. Open Questions

Keep visible until resolved:

-   exact canonical object/facet schema;
-   exact KKS representation;
-   line vs pipe vs stream semantics;
-   ports/nozzles/connectors schema;
-   plant geometry representation;
-   routing constraint/objective model;
-   supports/pipe-racks;
-   P&ID ↔ 3D synchronization;
-   revision/change-set model;
-   undo/redo;
-   offline/local vs cloud state;
-   collaboration/conflict strategy;
-   instrumentation ownership;
-   PBS ↔ PSS topology contract;
-   PSS design-change proposal contract;
-   PBS ↔ PMS document/deliverable contract;
-   project provisioning;
-   desktop architecture;
-   plugin/extension model;
-   industrial interchange standards.

# 42. Definition of Success

PBS succeeds when an engineer can define a plant once and see that same
engineering reality consistently across representations.

``` text
Engineer creates/selects P-101
        ├── canonical UUID exists
        ├── KKS/tag exists
        ├── equipment data exists
        ├── P&ID resolves to it
        ├── 3D resolves to it
        ├── connected piping resolves to it
        ├── instruments resolve to it
        ├── PSS can consume/reference it
        ├── PMS can reference it
        ├── documents resolve to it
        └── revisions/history remain traceable
```

When PSS needs the plant's hydraulic topology, the process engineer
should not redraw it.

**The project already knows.**

> **PBS defines the plant. PSS computes its behavior. PMS delivers the
> project. Evenstar connects them through shared identity and explicit
> ownership.**
