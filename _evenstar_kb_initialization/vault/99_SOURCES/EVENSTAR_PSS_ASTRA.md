# Evenstar — Plant Simulation System (PSS)
## Astra Project Brain / Product & Architecture Specification

> **Purpose:** Governing context for Astra when planning, designing, or implementing the Evenstar Plant Simulation System (PSS). PSS is a constituent of Evenstar alongside PBS (Plant Build System) and PMS (Project Management System).

## 1. Vision

PSS is a modern engineering computation environment for plant/process simulation, thermodynamics, hydraulics, process dynamics/control studies, and standalone engineering calculations.

PSS must solve a major usability problem in conventional process simulators: **engineers should not repeatedly reconstruct known project information just to begin a new simulation.**

Core principle:

> **Create engineering information once; reuse it everywhere. Start from the project, not from scratch.**

PSS remains the computational authority for simulation models and solver state. It consumes reusable project engineering information from Evenstar/PBS/Supabase and from a per-project Airtable PSS Engineering Register, and publishes curated engineering results back to that register.

## 2. Relationship to Evenstar

```text
                         EVENSTAR
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
         PBS               PSS               PMS
   What are we        How does it        How do we
     building?          behave?           deliver it?
          │                 │                 │
          └─────────────────┼─────────────────┘
                            │
                     SUPABASE CORE
              canonical identity / project data
```

- **PBS** owns the canonical plant/build definition: equipment, piping, topology, geometry, KKS/tags, systems, instrumentation, etc.
- **PSS** owns simulation models, solver configuration, thermodynamic configuration, computational state, calculations and simulation results.
- **PMS** owns project execution: deliverables, tasks, milestones, reviews, approvals, changes and coordination.
- **Supabase/PostgreSQL** provides canonical project/object identity and integration data.
- **Airtable PSS Engineering Register** is the human-friendly project workspace for reusable PSS engineering inputs and published simulation results.

Stable UUIDs are technical identity. KKS/tag identifiers remain human engineering identifiers and attributes.

## 3. Product Character

PSS should feel like a modern analytical engineering application rather than a legacy flowsheet package.

Desired qualities:

- fast to start;
- project-aware;
- reusable-data-first;
- visual and analytical;
- explicit about assumptions and provenance;
- unit-aware and strongly typed;
- reproducible;
- modular and engine-agnostic where practical;
- suitable for both quick calculations and full plant studies;
- capable of working locally while integrating with collaborative project data.

The user should spend time on **engineering decisions**, not repetitive transcription.

## 4. Major PSS Workspaces

### 4.1 Process Simulation

Support steady-state flowsheets and, progressively, dynamic simulation.

Expected domains include:

- material and energy balances;
- process streams;
- separators;
- mixers/splitters;
- valves;
- pumps/compressors;
- heat exchangers;
- reactors where supported;
- columns and separation operations;
- utilities;
- recycle/convergence;
- sensitivity and case studies;
- equipment/process performance calculations.

DWSIM may provide important open-source backend algorithms, but PSS must not be architecturally hard-coded to a single engine.

### 4.2 Physical Properties / Thermodynamics Laboratory

PSS is more than a plant flowsheet simulator. It must provide a first-class standalone thermodynamics workspace for pure fluids and mixtures.

Target capabilities include:

- density, viscosity, Cp, thermal conductivity and speed of sound;
- vapor/saturation pressure;
- flash calculations;
- phase envelopes;
- VLE/LLE where supported;
- enthalpy, entropy, internal energy, Gibbs and Helmholtz properties;
- residual/departure properties;
- fugacity/activity coefficients;
- compressibility;
- exergy/availability and entropy-generation analysis;
- configurable property and phase diagrams;
- comparison of EOS/correlations/property packages;
- validity ranges, assumptions, units and provenance.

### 4.3 Water / Wastewater / Aqueous Chemistry

Target capabilities include:

- water/effluent characterization;
- aqueous speciation and charge balance;
- pH, alkalinity and acidity;
- ionic strength/activity corrections;
- carbonate chemistry;
- precipitation/scaling and saturation indices;
- dosing and neutralization;
- reverse-osmosis/membrane calculations;
- recovery/rejection/permeate/concentrate balances;
- osmotic pressure and flux where supported.

Water analyses stored as project data should be reusable directly in these calculations.

### 4.4 Hydraulics

Hydraulics must follow the same **do not rebuild known project information** principle.

If PBS already knows the piping network, PSS must be able to derive the hydraulic model from PBS/Supabase rather than asking the engineer to redraw/re-enter it.

PSS should read, where available:

- pipe connectivity/topology;
- nodes;
- elevations;
- lengths/3D routing geometry;
- nominal/inside diameters;
- fittings and valves;
- equipment connections/nozzles;
- materials/specification data;
- canonical UUIDs and KKS/tags.

PSS then adds simulation-specific information such as:

- fluid state;
- boundary conditions;
- roughness/correlation assumptions;
- pump/compressor curves;
- calculation method;
- scenario-specific overrides.

A hydraulic study may temporarily override a project diameter, roughness, valve state, etc. Such an override **must not silently alter PBS**. A successful study may generate a proposed design change for review/promotion back to the canonical plant model.

### 4.5 Process Dynamics and Control

PSS should eventually support dynamic process/control studies using a modern DCS/P&ID-oriented experience.

Target concepts include:

- PID controllers;
- process variables, setpoints and outputs;
- controller tuning;
- dynamic scenarios;
- alarms/events;
- trends;
- interlocks/permissives where appropriate;
- Python/custom calculation blocks;
- typed signal contracts;
- coordination of simulation clock, process model and controller execution.

The detailed architecture of the collaborative/project-data layer for controls remains to be refined. High-frequency dynamic trajectories should not automatically be written record-by-record to Airtable.

## 5. Start From Project

This is a defining PSS workflow.

When creating or opening a model, the engineer should be able to choose **Start from Project** and import known engineering information instead of entering it again.

Examples:

- feed gas composition;
- water analysis;
- stream composition;
- stream temperature/pressure/flow;
- environmental conditions;
- design/operating cases;
- boundary conditions;
- equipment/vendor parameters;
- hydraulic topology from PBS;
- known engineering variables.

Conceptual flow:

```text
PROJECT KNOWLEDGE
  │
  ├── PBS / Supabase canonical plant model
  └── Airtable PSS Engineering Register
              │
              ▼
        PSS Project Data
              │
        validate / map
              │
              ▼
          PSS MODEL
              │
        simulate / study
              │
              ▼
       CURATED RESULTS
              │
              ▼
  Airtable PSS Engineering Register
```

## 6. Local, Project and Linked Inputs

PSS must distinguish three concepts.

### Local input
Exists only in a particular PSS model/study.

### Project input
Reusable engineering information stored in the project's PSS Engineering Register or canonical Evenstar data.

### Linked input
A PSS model input explicitly associated with a project-data record.

Example:

```text
PSS Model                         Project Data
NG-001.Pressure  <------------>  NG-001 / Pressure
70 bar                            70 bar
```

Not every PSS value must be project-linked. Engineers must be free to keep study-specific values local.

## 7. Project Data Read / Write Panel

PSS should provide a first-class **Project Data** panel.

Primary actions:

- **Read from Project**
- **Write to Project**
- **Compare**
- **Refresh**

Read/write should be explicit and selectable rather than uncontrolled two-way synchronization.

The panel should support selection at multiple levels:

- complete operating case;
- stream;
- composition;
- equipment dataset;
- individual engineering variable.

Before overwriting either side, show a comparison/diff where appropriate.

Example:

```text
Variable             PSS          Project       Action
Pressure             68 bar       70 bar        Update PSS
Temperature          25 C         25 C          Same
Mass Flow           125 t/h      130 t/h        Update PSS
Composition          Rev 4        Rev 5          Update PSS
```

No silent overwriting of simulation state or project engineering data.

## 8. Reusable Project Input Model

The Airtable PSS Engineering Register should support reusable inputs including:

### Streams
- canonical/project stream reference where applicable;
- tag/name;
- fluid class;
- temperature;
- pressure;
- flow;
- composition reference;
- case/basis;
- source/provenance.

### Compositions
Compositions should be reusable datasets rather than repeated columns on every stream.

Support:

- gas compositions;
- liquid/mixed stream compositions;
- water analyses;
- mole/mass/concentration bases;
- components/species;
- revision/status/source.

### Engineering Variables
Use a generalized variable model for known inputs:

```text
Object | Variable | Value | Unit | Basis/Case | Source | Revision
```

Examples: ambient temperature, feed pressure, relative humidity, equipment load, design flow.

### Operating / Design Cases
Reusable sets of project conditions for design, summer, winter, turndown, low-pressure, vendor cases, etc.

## 9. Input Snapshots and Reproducibility

When PSS reads project data into a model/run, it should capture a snapshot/reference sufficient to reproduce what was used.

Record where practical:

- source system;
- source base/table/record identity;
- dataset UUID;
- revision/version;
- import timestamp;
- units/basis;
- hash or equivalent change detector.

A later change to Airtable must **not silently mutate a historical simulation**.

If linked project data changes, PSS should indicate that newer project data exists and allow the engineer to compare, keep the current model value, or update deliberately.

## 10. PSS Project Base Provisioning

When an Evenstar project is created with PSS enabled, the system should be able to provision a **PSS Airtable base for that project** from a versioned template.

The project wizard may configure:

- whether to create/connect a PSS base;
- base template;
- enabled data domains;
- Airtable workspace/location;
- schema version.

Supabase should register the association between:

- Evenstar project UUID;
- PSS project/model identities;
- Airtable base ID;
- schema/template version;
- mapping metadata.

Users should not have to manually configure table IDs or record mappings during ordinary use.

## 11. PSS Engineering Register — Recommended Core Tables

Initial schema should consider:

### Project Data
- Project
- Streams
- Compositions
- Composition Components / Species
- Engineering Variables
- Design / Operating Cases
- Equipment Input Data
- Environmental Conditions
- Data Sources / References

### PSS Analysis
- Models
- Simulation Cases / Studies
- Runs
- Run Points / Case Points
- Stream Results
- Equipment Results
- Hydraulic Node Results
- Thermodynamic Results
- KPIs
- Reports
- Warnings / Convergence Notes
- Design Proposals

### Engineering Context
- Assumptions
- Notes
- Design Decisions
- links to canonical PBS objects/systems

Astra should refine the exact Airtable schema rather than treating this list as immutable.

## 12. Results Publication Philosophy

PSS may calculate at much higher numerical resolution than should be published to Airtable.

Core rule:

> **Compute at solver resolution; publish at engineering resolution.**

Examples:

- A hydraulic solver may discretize a pipeline into hundreds of cells.
- The Airtable result set may contain only meaningful engineering nodes (inlet, outlet, high point, equipment boundaries, user-defined stations) plus optional selected sample points.

A hydraulic result record should be linkable to:

- run UUID;
- pipeline UUID;
- node/station UUID;
- order/distance/elevation;
- pressure and other selected results;
- units and case.

This allows Airtable Interfaces to plot pressure/elevation profiles without storing irrelevant solver internals.

The same principle applies to process simulations and thermodynamic studies: publish the 10–20 or otherwise useful records/points that support engineering analysis, comparison and collaboration.

## 13. Airtable as Analytical Project Memory

The PSS base should support lightweight engineering analysis through Airtable Interfaces:

- compare runs/cases;
- plot hydraulic profiles;
- plot sensitivity studies;
- compare equipment performance;
- inspect KPIs;
- filter by model/system/case;
- review assumptions/warnings;
- navigate to reports and PSS models.

Airtable is not a replacement for the PSS solver. It is a durable, collaborative engineering register and analytical surface around PSS.

## 14. Data Ownership

Every datum should have an explicit authoritative owner.

Recommended ownership:

- canonical plant objects/topology/geometry: PBS/Supabase;
- PSS simulation model and solver state: PSS;
- reusable PSS project inputs entered/published through the PSS Engineering Register: project-data domain;
- published PSS results: PSS-generated records in the Engineering Register;
- project execution/deliverable state: PMS.

PSS writing an explicitly selected local input to the PSS Engineering Register is allowed. This creates/updates reusable project engineering data through a controlled API/service boundary.

Airtable must not directly manipulate internal PSS solver state.

## 15. Study Overrides and Design Proposals

PSS must make experimentation easy without corrupting the design basis.

Example:

1. PBS says pipeline diameter = DN200.
2. PSS imports the hydraulic network.
3. Engineer creates a study override = DN250.
4. Simulation shows improved performance.
5. PSS can create a **design proposal/change candidate**.
6. The proposal may be reviewed and eventually promoted through the appropriate PBS/PMS workflow.

Study overrides are not canonical design changes.

## 16. Integration Architecture

Conceptually:

```text
                     EVENSTAR PROJECT
                            │
                     SUPABASE CORE
        project UUIDs / canonical objects / mappings
                            │
             ┌──────────────┼──────────────┐
             │              │              │
            PBS            PSS            PMS
             │              │
             │        Project Data API
             │              │
             │        ┌─────▼─────┐
             └───────►│ Airtable  │
                      │ PSS Base  │
                      └───────────┘
```

Do not tightly couple PSS business logic to Airtable record IDs. Use an integration/domain layer and stable Evenstar identities/mappings.

Potential events include:

```text
pss.project_base.provisioned
pss.project_data.read
pss.project_data.written
pss.model.created
pss.run.started
pss.run.completed
pss.run.failed
pss.results.published
pss.design_proposal.created
project_data.changed
```

## 17. Project Templates

PSS base templates may evolve by project/domain, for example:

- General Process Engineering
- Oil & Gas / LNG
- Power Plant
- Water / Wastewater

Templates may add domain-specific tables/views while preserving a stable core data contract.

Astra should avoid uncontrolled schema fragmentation. Templates require versioning and migration strategy.

## 18. Process Engineer Experience

Target experience:

1. Open an Evenstar project.
2. Create/open a PSS model.
3. Choose **Start from Project**.
4. Select known project data: compositions, streams, cases, equipment or PBS topology.
5. PSS validates units/types and builds/seeds the model.
6. Engineer adds only missing assumptions and study-specific information.
7. Run simulation/study.
8. Inspect detailed results in PSS.
9. Publish selected results to the PSS Engineering Register.
10. Compare runs/cases in Airtable Interfaces.
11. Promote important engineering outcomes into reports/design decisions/PMS workflows where appropriate.

The engineer should be able to return months later and reconstruct what was known, what was assumed, what was simulated, and what changed.

## 19. Guardrails

Avoid:

- forcing engineers to re-enter data already present in PBS/Supabase/Airtable;
- silently synchronizing changed project values into simulation models;
- treating Airtable as the numerical solver;
- dumping every solver cell/iteration into Airtable;
- rebuilding hydraulic topology manually when PBS already knows it;
- overwriting canonical PBS design with PSS study overrides;
- losing input provenance/revision history;
- coupling PSS permanently to one simulation backend;
- hiding thermodynamic methods, assumptions, validity ranges or units;
- forcing cloud connectivity for basic local calculations where avoidable.

## 20. Open Questions for Astra

Astra should capture and resolve these incrementally:

1. Exact Airtable schema and normalized vs convenience tables.
2. Airtable template provisioning mechanism and API limitations.
3. Exact project-data API contract.
4. Versioning/revision semantics for reusable inputs.
5. Conflict handling for Write to Project.
6. Unit normalization between Airtable, Supabase and PSS.
7. Mapping of components/species to canonical chemical identities.
8. Exact hydraulic network extraction contract from PBS.
9. How design proposals are reviewed/promoted into PBS.
10. Dynamic/control historian architecture and what summaries belong in Airtable.
11. Simulation engine adapter architecture (DWSIM and others).
12. Local/offline project-data caching.
13. Authentication/permissions for Airtable operations.
14. Which results are auto-published versus explicitly selected.

## 21. Astra's Role

When this file is active, Astra should behave as PSS lead product architect, requirements partner and implementation planner.

For each idea:

1. capture the engineering problem;
2. identify whether the data already exists elsewhere;
3. prevent duplicate data entry where possible;
4. identify the authoritative owner;
5. identify affected canonical objects;
6. define read/write direction;
7. define typed/unit-aware contracts;
8. preserve provenance and reproducibility;
9. separate solver detail from engineering publication detail;
10. define UX consequences;
11. record unresolved decisions instead of silently assuming them;
12. propose the smallest coherent implementation slice;
13. define acceptance criteria before declaring implementation complete.

## 22. MVP Vertical Slice

A strong first proof of the architecture:

1. Create Evenstar project.
2. Provision/connect PSS Airtable base.
3. Enter a feed-gas composition and design conditions in Airtable **or** enter them in PSS and Write to Project.
4. Create a PSS model using Start from Project.
5. Read the composition/conditions into a feed stream.
6. Run a small steady-state simulation or thermodynamic calculation.
7. Publish ~10–20 meaningful result records to Airtable.
8. Display an Airtable Interface chart comparing case results.
9. Change one project input and demonstrate PSS Compare/Read without silently mutating the existing run.
10. Demonstrate provenance linking the run to the input snapshot.

A second vertical slice should demonstrate hydraulics generated from PBS/Supabase topology and publication of ordered node results to Airtable.

## 23. Definition of Success

PSS succeeds when an engineer no longer experiences each new simulation as an isolated blank file.

Known project information is reusable, simulation inputs are traceable, plant topology can seed calculations, study overrides remain safe, results become durable project knowledge, and the engineer can move between PSS, PBS, Airtable and PMS without repeatedly recreating the same engineering information.
