from pathlib import Path
import re, json, hashlib, shutil

ROOT = Path(__file__).resolve().parent
VAULT = ROOT / 'vault'
SOURCE = Path(r'C:\Users\Usuario\OneDrive\Documentos\ChatGPT\Evenstar')
DATE = '2026-09-11'
FILES = {'IDS':'README.md', 'PBS':'EVENSTAR_PBS_ASTRA.md', 'PSS':'EVENSTAR_PSS_ASTRA.md', 'PMS':'EVENSTAR_PMS_AIRTABLE_ASTRA.md'}
notes = {}
coverage = {k:{} for k in FILES}
requirements = []
decisions = []
questions = []

def source(key, *sections):
    f = FILES[key]
    headings = re.findall(r'^#{1,6} (.+)$', (SOURCE/f).read_text(encoding='utf-8-sig'), re.M)
    out = []
    for section in sections:
        if isinstance(section, int):
            h = next(x for x in headings if re.match(rf'{section}\. ', x))
        else:
            h = next(x for x in headings if x == section)
        out.append(f'[[99_SOURCES/{f[:-3]}#{h}|{key} — {h}]]')
    return out or [f'[[99_SOURCES/{f[:-3]}|{key} source]]']

def refs(*items):
    return sum((source(k,*s) for k,*s in items), [])

def link(name, label=None):
    return '[['+name+('|' + label if label else '')+']]'

def note(folder, name, title, body, *, kind='concept', status='accepted', systems=(), sources=(), related=(), aliases=(), extra=None):
    path = f'{folder}/{name}.md'
    if path in notes:
        raise ValueError('Duplicate note: '+path)
    meta = {'type':kind, 'status':status, 'created':DATE, 'updated':DATE, 'systems':list(systems), 'aliases':list(aliases), 'tags':['evenstar', kind], 'sources':list(sources)}
    if extra: meta.update(extra)
    front = '\n'.join(k+': '+json.dumps(v, ensure_ascii=False) for k,v in meta.items())
    text = '---\n'+front+'\n---\n\n# '+title+'\n\n'+body.strip()+'\n'
    if related: text += '\n## Related notes\n\n'+ '\n'.join('- '+link(r) for r in related)+'\n'
    if sources: text += '\n## Source\n\n'+'\n'.join('- '+s for s in sources)+'\n'
    notes[path] = text
    for s in sources:
        for k,f in FILES.items():
            prefix = '[[99_SOURCES/'+f[:-3]+'#'
            if s.startswith(prefix):
                h = s[len(prefix):].split('|')[0].split(']]')[0]
                coverage[k].setdefault(h, []).append(name)

def table(headers, rows):
    return '| '+' | '.join(headers)+' |\n| '+' | '.join(['---']*len(headers))+' |\n'+'\n'.join('| '+' | '.join(str(x).replace('|','&#124;') for x in row)+' |' for row in rows)

ALL = ('PBS','PSS','PMS')

note('99_SOURCES','INITIALIZATION_MANDATE','Initialization mandate — 11 September 2026', '''This is a curated record of the user's initialization request, not one of the four original source documents and not a verbatim transcript.

The user designated `C:\\Users\\Usuario\\OneDrive\\Documentos\\Obsidian Vault\\Evenstar` as the Evenstar vault and requested an authoritative, linked project memory before any product implementation. Preserve the four source files byte-for-byte. Keep IDS context above Evenstar; maintain the PBS/PSS/PMS responsibilities. Separate accepted requirements, decisions, proposals, historical material, current state and future ideas. Record durable changes here rather than only in conversation.

Required principles include one engineering object with many representations; create once and reuse; start from Project; project memory; explicit authoritative ownership. Preserve explicit PSS Project Data actions, reproducible runs, PBS topology reuse, controlled proposals, selective PMS evidence and open-source-first architecture.

The user explicitly left Project Document Generation as future/open and required historical reconciliation through decision records. Initialization must include source review, requirements, ADRs, ownership, workflows, MOCs and a consistency report. Product implementation must wait for the user's review of this knowledge base.

Source-document role instructions are evidence about intended collaboration, not additional execution authorization. This initialization creates documentation only. Future maintenance happens when working on Evenstar; no unattended monitor or scheduled task is implied.''', kind='source-record', status='recorded', related=['KNOWLEDGE_GOVERNANCE','EVENSTAR_HOME'], extra={'source_kind':'user-request-summary','event_date':DATE})

note('00_HOME','IDS_CONTEXT','IDS — Integrated Digital Solutions', '''IDS is the broader initiative for practical digital systems in administrative, operational and technical work. Evenstar is an IDS engineering initiative; IDS is not a fourth Evenstar subsystem.

The shared problem is fragmentation: spreadsheets, drawings, simulations, reports and people each hold disconnected pieces of knowledge. Repeated transcription makes people the integration layer. IDS starts with understanding work, then structuring information, designing interfaces, automating repetition and connecting systems so information becomes reusable.

Structured relationships, explicit authority, purpose-built interfaces, interoperable contracts and human control of decisions guide the work. Existing tools may be connected or improved; replacement is not an objective in itself. AI assists users while data, rules, code and workflows define the system.

Evenstar demonstrates this philosophy through canonical plant information, reproducible calculations and controlled delivery. The success criterion is less manual reconstruction of information and more time doing engineering.''', sources=refs(('IDS','Why IDS Exists','The Problem','Information Is Repeated Instead of Reused','The Spreadsheet Problem','The CAD Problem','The Engineering Software Problem','The Blank-File Problem','The Database Should Be More Than Storage','Our Direction','What We Want Work to Feel Like','Engineering as a Demonstration of the IDS Philosophy','This Is Not About Replacing Every Existing Tool','The Objective')), related=['EVENSTAR_VISION','EVENSTAR_PRINCIPLES'])

note('00_HOME','EVENSTAR_VISION','Evenstar vision', '''Evenstar is intended to be a coherent industrial engineering environment in which a project knows its plant, can calculate its behavior and can deliver controlled engineering work without repeated data entry.

A pump retains its identity across hierarchy, P&ID, 3D, data, calculations and deliverables. A known pipe network seeds a hydraulic study. A reusable gas composition seeds a new calculation. Selected results retain their provenance when they support an issued deliverable.

This is a product vision, not evidence that those capabilities exist. The knowledge base records intended behavior independently of deployment choices and implementation progress.''', kind='vision', status='vision', systems=ALL, sources=refs(('IDS','Engineering as a Demonstration of the IDS Philosophy'),('PBS',2,42),('PSS',1,23),('PMS',2,31)), related=['CURRENT_STATE','SYSTEM_MAP','MVP'])

principles = [
('EV-PR-001','One engineering object, many representations.','Views resolve the same stable object identity; they do not create competing pumps or valves.','CANONICAL_ENGINEERING_OBJECT'),
('EV-PR-002','Create engineering information once; reuse it everywhere.','Reuse known data through references and controlled exchange, with explicit owners.','DATA_OWNERSHIP'),
('EV-PR-003','Start from Project, not from scratch.','Offer reusable inputs and known topology when creating a calculation.','PSS_PROJECT_DATA'),
('EV-PR-004','The project should know what the project already knows.','Make relationships, provenance, changes and decisions discoverable over time.','KNOWLEDGE_GOVERNANCE'),
('EV-PR-005','PBS defines the plant. PSS computes its behavior. PMS delivers the project.','Assign behavior to the responsible system before choosing a technology.','SYSTEM_BOUNDARIES'),
('EV-PR-006','Every datum should have one explicit authoritative owner.','Reference, display, cache and propose without silently taking ownership.','DATA_OWNERSHIP'),
('EV-PR-007','Compute at solver resolution; publish at engineering resolution.','Curate meaningful PSS engineering results and separately select PMS delivery evidence.','PSS_RUNS_RESULTS'),
('EV-PR-008','Human control for engineering decisions.','Automation and AI can propose; they do not silently approve or mutate controlled state.','AI_ASSISTANCE'),
('EV-PR-009','Open-source first.','Portable models, schemas, interfaces and core logic; replaceable external adapters.','TECHNOLOGY_REGISTER'),
('EV-PR-010','Engineering requirements before implementation technology.','Requirement → domain model → system responsibility → contract → technology.','EVENSTAR_ARCHITECTURE')]
note('00_HOME','EVENSTAR_PRINCIPLES','Evenstar principles', table(['ID','Principle','Practical consequence','Explore'],[(a,b,c,link(d)) for a,b,c,d in principles]), kind='principle', systems=ALL, sources=refs(('IDS','Our Direction','The Blank-File Problem'),('PBS',2,18,30,40),('PSS',12,19),('PMS',28,31)), related=['SHARED_REQUIREMENTS','ADR_INDEX'])

note('00_HOME','SYSTEM_MAP','Evenstar system map', '''```mermaid
flowchart TB
  IDS[IDS — Integrated Digital Solutions] --> DS[Digital Solutions]
  DS --> EV[Evenstar]
  EV --> PBS[PBS — What are we building?]
  EV --> PSS[PSS — How does it behave?]
  EV --> PMS[PMS — How are we delivering it?]
  PBS -->|Plant identity and topology| PSS
  PBS -->|Canonical engineering references| PMS
  PSS -->|Explicit design proposals| PBS
  PSS -->|Selected evidence| PMS
```

Supabase/PostgreSQL is the initial canonical PBS and shared-identity data direction. PSS and PMS have separate collaboration domains and Airtable bases. Shared identity connects the systems; physical co-location of all data is not required.

North Star is a separate open-source project outside Evenstar, with any future integration through adapters.''', kind='map', systems=ALL, sources=refs(('PBS',1,16,21,22,23,24),('PSS',2,16),('PMS',15,16)), related=['PBS_HOME','PSS_HOME','PMS_HOME','INTEGRATION_ARCHITECTURE','NORTH_STAR_BOUNDARY'])

note('00_HOME','KNOWLEDGE_GOVERNANCE','Knowledge governance and maintenance', '''This vault is Evenstar's curated architectural memory. Source files remain evidence; current notes explain the present interpretation. Accepted architecture does not mean implemented software.

## Classification

| Classification | Meaning | Metadata |
| --- | --- | --- |
| PRINCIPLE | Governing design rule | type: principle; status: accepted |
| REQUIREMENT | Identifiable, testable intended behavior | type: requirement; status: accepted or proposed |
| ACCEPTED DECISION | Settled choice in the user mandate or explicit source statement | type: adr; status: accepted |
| PROPOSED DESIGN | Candidate needing resolution | status: proposed |
| IMPLEMENTATION IDEA | Possible means of delivery | type: implementation-idea; status: proposed |
| OPEN QUESTION | Unresolved choice with affected notes | type: open-question; status: open |
| FUTURE IDEA | Uncommitted scope | type: future; status: future |
| HISTORICAL DECISION | Earlier decision preserved as evidence | type: historical-adr; status: historical |
| SUPERSEDED DECISION | Former choice replaced explicitly | status: superseded; link successor |

Source wording matters. Explicit settled statements and durable must/shall/guardrail behaviors are accepted product intent. Candidate, preferred, potential and suggested implementation choices remain proposed unless corroborated by an explicit current choice. Target domain breadth remains proposed or future. Derived acceptance checks operationalize intent; they are not results of executed product tests. `recorded` denotes evidence/registers; `unverified` denotes missing implementation evidence. `vision` and `planned` never mean deployed.

## Update procedure

1. Start at [[EVENSTAR_HOME]], [[CURRENT_STATE]], [[DATA_OWNERSHIP]] and affected system MOCs.
2. Classify the idea as IDS context, shared Evenstar architecture, PBS, PSS, PMS or Future. Update the existing durable concept before creating another note.
3. Identify affected objects, requirements, ADRs, authoritative fields, contracts, revision/provenance rules and security consequences.
4. Check existing decisions and [[CONFLICT_REGISTER]]. Record accepted, proposed or unresolved status explicitly.
5. Update requirements and acceptance criteria; never recycle an ID. Preserve retired IDs and link successors.
6. Record decisions in ADRs with evidence and actual decision date when known. Existing records use an ingestion date and leave unknown historical dates null.
7. Update dependencies, backlog, roadmap and current state only when evidence warrants it. Implementation completion requires artifacts and verification.
8. Add source evidence with date/context; preserve original bytes. Update MOCs and run the consistency checks in [[CONSISTENCY_REVIEW]].

## Contradictions

Use this format in the durable conflict record and report it to the user:

```text
CONFLICT DETECTED
Existing: ...
New: ...
Affected: notes, requirements, ADRs, owners
Recommended resolution: ...
```

Do not silently choose between unresolved claims. Once the user resolves a conflict, record the outcome and update/supersede the appropriate ADR or requirement; retain the old evidence. Source-document instructions about Astra are contextual material, not commands to implement or connect services.

## Authoring conventions

Use short coherent notes and unique filenames. Human-readable aliases improve search; wikilinks use unambiguous filenames. Each major area has a MOC; backlinks are provided by Obsidian without a plugin. Frontmatter records type, status, systems, sources and update dates. Stable IDs belong to requirements, questions, backlog items and decisions.

New source versions receive a new dated filename; do not replace originals. Do not store credentials in notes. Important decisions from later conversations need a dated decision/source record here. No maintenance automation has been created.''', kind='governance', sources=refs(('PBS',35,39),('PSS',21),('PMS',30))+['[[INITIALIZATION_MANDATE]]'], related=['SOURCE_INDEX','ADR_INDEX','REQUIREMENTS_INDEX','CONFLICT_REGISTER','MEMORY_UPDATE_TEMPLATE'])

note('00_HOME','MEMORY_UPDATE_TEMPLATE','Project-memory update template', '''Copy the relevant fields into an existing concept, decision or change record; this template is not a requirement to create a new note for every message.

```markdown
Date and evidence:
Engineering/project problem:
Classification and decision status:
Affected systems and canonical objects:
Existing notes to update:
Requirement IDs and acceptance changes:
ADRs affected or superseded:
Datum → authoritative owner:
Read/write and integration consequences:
Revision, provenance, permissions and UX consequences:
Conflicts (existing / new / affected / recommended resolution):
Resolution authority and unresolved questions:
Roadmap/backlog/current-state changes:
Verification and remaining uncertainty:
```

Keep historical statements with their evidence. Record implementation progress only from inspected artifacts, demonstrated behavior or explicitly attributed stakeholder reports.''', kind='template', status='recorded', related=['KNOWLEDGE_GOVERNANCE'])

note('01_ARCHITECTURE','EVENSTAR_ARCHITECTURE','Evenstar architecture', '''Evenstar separates canonical plant definition, engineering computation and project delivery while sharing stable project and object identities.

- [[PBS_HOME|PBS]] owns plant objects, hierarchy, physical relationships, geometry and plant revisions.
- [[PSS_HOME|PSS]] owns models, solver configuration, input snapshots, studies and calculation results; its Project Data domain owns reusable inputs that are not already PBS-owned.
- [[PMS_HOME|PMS]] owns deliverables, document-control metadata, reviews, approvals and delivery state.

The initial canonical data backbone is Supabase/PostgreSQL. PSS and PMS use distinct Airtable domains through stable identity mappings and adapters. This is a logical architecture, not proof of provisioned services or a commitment to microservices.

Design sequence: engineering behavior → domain model → responsible system → interface and change semantics → implementation technology. The canonical model and representative integration examples precede sophisticated interfaces.

Architecture maturity is uneven: subsystem boundaries and identity are settled; exact schemas, revision semantics and integration protocols are open. See [[TECHNOLOGY_REGISTER]] for commitment levels and [[OPEN_ARCHITECTURE_QUESTIONS]] for unresolved contracts.''', systems=ALL, sources=refs(('PBS',4,16,20,28,35,36),('PSS',2,16),('PMS',3,16,20)), related=['SYSTEM_BOUNDARIES','DATA_OWNERSHIP','CANONICAL_IDENTITY','PROJECT_IDENTITY','INTEGRATION_ARCHITECTURE','HISTORICAL_ARCHITECTURE','ADR_INDEX'])

note('01_ARCHITECTURE','SYSTEM_BOUNDARIES','System boundaries', '''| Concern | Responsible system | Boundary rule |
| --- | --- | --- |
| What exists and how it is physically arranged/connected | PBS | PSS overrides do not redefine it |
| Simulation models, methods, behavior and results | PSS | PBS may display referenced results without owning them |
| Deliverables, issued revisions, reviews and project status | PMS | References engineering rather than recreating it |
| Shared project identity and base mappings | Evenstar canonical/core domain | Provisioning owner/service remains open |
| Reusable calculation input | Owner of the particular datum | Project Data is an access/domain concept, not blanket authority over PBS data |

Physical instruments and plant control relationships belong in PBS; dynamic controller state and numerical execution belong in PSS. Detailed control-loop facets remain unresolved.

PBS controls application of changes to plant definition. PMS may coordinate review tasks and delivery approval. The transaction connecting those responsibilities is not yet specified. Likewise, a controlled document's metadata is PMS-owned while file storage and other document metadata facets still need a field-level contract.''', systems=ALL, sources=refs(('PBS',4,18,19,22,23,26,36),('PSS',2,14,15),('PMS',1,17,29)), related=['DATA_OWNERSHIP','INSTRUMENT','ENGINEERING_CHANGE','DOCUMENT','OQ-005','OQ-015'])

ownership = [
('Canonical Project UUID / cross-system identity','Evenstar canonical/core domain','PBS/PSS/PMS reference; creator/provisioner service open'),
('Canonical engineering UUID','PBS / Evenstar canonical model','Stable identity across all representations'),
('KKS/tag relationship','PBS','Other systems cache labels with source/freshness'),
('Plant/system hierarchy','PBS','PMS WBS/delivery grouping is distinct'),
('Equipment existence/type and physical design facets','PBS','Vendor/calculation datasets require field-level mapping'),
('Plant geometry / placement','PBS','PSS consumes physical values'),
('Ports, connections, physical piping topology','PBS','Imported topology snapshots belong to a PSS model'),
('Route geometry, length, elevation, physical diameter/spec','PBS','PSS study variants are local assumptions'),
('Instrument existence / physical control relationships','PBS','Detailed control-loop facet partition open'),
('Materials, parts, specifications and assemblies','PBS','Procurement delivery records can reference these'),
('Plant revision / engineering change application','PBS','PMS review orchestration interface open'),
('PSS model and solver configuration/state','PSS','Airtable must not manipulate internal solver state'),
('PSS thermodynamic methods and calculation assumptions','PSS','Method/version/units remain traceable'),
('PSS run, result and input snapshot','PSS','Later project edits do not alter historical runs'),
('Reusable inputs authored in PSS Engineering Register','PSS Project Data domain','Controlled explicit writes; not all data accessed by Project Data'),
('PBS-owned values exposed through Project Data','PBS','Read/reference; changes require a PBS proposal'),
('Local study overrides','PSS model/study','A proposed design is not yet canonical'),
('Published PSS engineering result records','PSS','Register is a publication surface; preserve originating run'),
('Selected calculation evidence','PSS','PMS owns selection/promotion context, not the calculation'),
('Deliverables, tasks and milestones','PMS','Link stable project/object/evidence identifiers'),
('Reviews, approvals and delivery status','PMS','Revision-specific history; no silent overwrite'),
('Issues, RFIs and delivery change coordination','PMS','Canonical plant application remains PBS'),
('Controlled-document metadata and issued revision context','PMS','PBS holds links; file/blob authority remains open'),
('Airtable base IDs and schema/mapping registry','Evenstar core integration metadata','Business data authority remains with the domain'),
('Document binary storage, retention and access','Unresolved','No competing store designated; see OQ-015')]
note('01_ARCHITECTURE','DATA_OWNERSHIP','Data ownership', '> **Every datum should have one explicit authoritative owner.**\n\n'+table(['Information','Authoritative owner','Reference/write rule'],ownership)+'''

An owner is a domain responsibility, not simply the product hosting a record. Airtable can store PSS-owned results and PMS-owned delivery data in separate bases. Supabase can host canonical identity without owning every project datum.

For every new field: name the datum, owner, permitted editors, source reference, unit/basis, version and refresh/write path. A duplicate display must identify its source and must not become an independent truth. Ambiguous fields are blocked from conflicting writes until ownership is resolved.

Two important unresolved overlaps are equipment/vendor parameters (physical design versus reusable calculation assumptions) and document metadata (plant-linked files versus controlled deliverables). Use [[OQ-021]] and [[OQ-015]] rather than assigning them silently.''', systems=ALL, sources=refs(('PBS',4,18,19),('PSS',6,8,14),('PMS',17,18,29)), related=['SYSTEM_BOUNDARIES','PSS_PROJECT_DATA','PMS_ENGINEERING_REFERENCES','OQ-005','OQ-021'])

note('01_ARCHITECTURE','CANONICAL_IDENTITY','Canonical identity', '''Every persistent engineering object has a stable UUID. KKS/tag, name and presentation IDs are attributes or mappings, not relational primary keys. A controlled tag change preserves relationships to ports, diagrams, models, deliverables and history.

Canonical UUIDs identify shared engineering reality. PSS also needs stable IDs for its own models/runs/reports/studies; PMS needs IDs for deliverables/documents/revisions. Do not assign a fresh plant-object identity merely because an object appears in a new application.

External Airtable record IDs and renderer/symbol IDs map to domain identities through an adapter layer. Their exact mapping/version constraints remain a design task.

Identity stability does not settle the object/facet schema, tag namespace uniqueness or deletion rules. Those remain explicit questions.''', systems=ALL, sources=refs(('PBS',5,6,15),('PSS',2,16),('PMS',8,18)), related=['CANONICAL_ENGINEERING_OBJECT','PROJECT_IDENTITY','PBS_KKS','ADR-002','ADR-003','OQ-001','OQ-002'])

note('01_ARCHITECTURE','PROJECT_IDENTITY','Project identity', '''A common Evenstar Project UUID connects PBS plant context, PSS project/models and engineering register, and PMS delivery context. It is not an Airtable base ID or a human project code.

The initial integration registry should associate Project UUID with enabled subsystem contexts, PSS/PMS base IDs, schema/template versions and mapping metadata. Source briefs identify Supabase/Evenstar Core as the initial registry direction.

The logical shared identity is accepted. Who issues it, how partial provisioning recovers, how an existing base is connected and how ownership transfers are still unresolved. PBS consumes shared identity and need not own all provisioning.

Project metadata fields such as name/client/location can overlap between systems; a field-level registry contract must distinguish authoritative data from display copies.''', systems=ALL, sources=refs(('PBS',21),('PSS',10),('PMS',5,18)), related=['PROJECT','PROJECT_CREATION','OQ-010','OQ-021'])

note('01_ARCHITECTURE','INTEGRATION_ARCHITECTURE','Integration architecture', '''| Flow | Carries | Authority / control |
| --- | --- | --- |
| PBS → PSS | UUIDs, physical topology, geometry, physical properties | PBS source revision retained; PSS validates and snapshots |
| Project Data → PSS model | Selected inputs, units, basis and provenance | Explicit Read; snapshot used by a run |
| PSS → Project Data | Selected local inputs or curated results | Controlled write to permitted owner; no hidden two-way sync |
| PSS → PBS | Design-change proposal with evidence | PBS reviews and applies or rejects |
| PBS → PMS | Canonical engineering references and display metadata | PBS remains engineering authority |
| PSS → PMS | Selected run/report/study evidence | PMS records promotion and deliverable-revision context |

Domain adapters isolate Airtable IDs and engine internals. Stable Evenstar identities, typed units, version/freshness information and explicit authorization belong in contracts. The specific API shapes, events, retry logic and deployment topology remain proposals.

Prefer the smallest coherent integration mechanism. A list of candidate events is not a decision to build an event bus or distributed services.''', systems=ALL, sources=refs(('PBS',13,19,20,22,23),('PSS',7,9,14,16),('PMS',8,9,15,20)), related=['EVENT_AND_API_CONTRACTS','PROJECT_CREATION','PBS_TO_PSS_HYDRAULICS','PSS_TO_PBS_DESIGN_CHANGE','PSS_TO_PMS_PROMOTION','SECURITY_AND_ACCESS'])

note('01_ARCHITECTURE','EVENT_AND_API_CONTRACTS','Events and API contracts', '''**Proposed contract inventory. No endpoint, event schema or transport is ratified or implemented by this vault.**

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

Recommended design checks: stale-version detection, explicit unit/basis validation, idempotent retry where writes can be repeated, traceable actor/origin, and no partial success presented as full completion. These are proposed contract review criteria; transport and transaction design need decisions.''', kind='proposed-design', status='proposed', systems=ALL, sources=refs(('PBS',20),('PSS',16,20),('PMS',20,29)), related=['INTEGRATION_ARCHITECTURE','OPEN_ARCHITECTURE_QUESTIONS','INTEGRATION_REQUIREMENTS'])

note('01_ARCHITECTURE','TECHNOLOGY_REGISTER','Technology commitment register', '''Technology follows the domain. This table records source commitment, not a deployment inventory.

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

Open-source-first does not prohibit optional proprietary collaboration services. Core models, schemas, interfaces, code and exports should avoid unnecessary lock-in. License selection and export/interchange formats remain unresolved.''', kind='register', status='recorded', systems=ALL, sources=refs(('PBS',16,17,28,30),('PSS',4,16,19),('PMS',3,4,20,25))+['[[INITIALIZATION_MANDATE]]'], related=['ADR-014','OQ-012','OQ-018','CURRENT_STATE'])

note('01_ARCHITECTURE','SECURITY_AND_ACCESS','Security and access', '''PBS source guardrails require server-side/environment-scoped privileged credentials, appropriate RLS, project/organization authorization, important-change logging and explicitly designed cross-system writes.

PSS Project Data operations need an authentication/permission design for project sources and writes. PMS source roles are candidates: project manager, engineering manager, discipline lead, engineer, reviewer, approver, external reviewer and viewer. The exact Airtable/Evenstar mapping remains open.

An approval record concerns a specific revision; permission to edit a display record does not imply authority to approve engineering or change canonical plant data. Secret storage and actual platform capability checks belong to implementation planning, not assumptions in these notes.''', systems=ALL, sources=refs(('PBS',29),('PSS',20),('PMS',23,24)), related=['DATA_OWNERSHIP','OQ-019','AI_ASSISTANCE','DOCUMENT_REVIEW_APPROVAL'])

note('01_ARCHITECTURE','AI_ASSISTANCE','AI assistance and human decisions', '''AI may assist search, explanations, KKS suggestions, routing alternatives, missing-data detection, project summaries, review packages and future document drafting. These are implementation ideas, not deployed features.

The accepted boundary is that AI suggestions do not automatically become engineering authority. AI must not silently change controlled state or approve work. Data, rules, code and workflows define the system; AI helps the user work with it.

Future generated documents must enter ordinary review, approval and revision control.''', systems=ALL, sources=refs(('IDS','Our Direction'),('PBS',34,40),('PMS',22,23)), related=['EVENSTAR_PRINCIPLES','PROJECT_DOCUMENT_GENERATION','SECURITY_AND_ACCESS'])

note('01_ARCHITECTURE','NORTH_STAR_BOUNDARY','North Star boundary', '''North Star is described by the PBS source as a separate open-source project outside Evenstar. Any integration should use an API or adapter. It must not become the canonical plant database.

No North Star integration design, external dependency or implementation has been established by this initialization.''', sources=refs(('PBS',24)), related=['SYSTEM_MAP','INTEGRATION_ARCHITECTURE','FUTURE_IDEAS'])

def domain(system, suffix, title, body, sections, related=(), status='accepted', kind='concept', aliases=()):
    folder = {'PBS':'02_PBS','PSS':'03_PSS','PMS':'04_PMS'}[system]
    note(folder,system+'_'+suffix,title,body,kind=kind,status=status,systems=[system],sources=source(system,*sections),related=[system+'_HOME',*related],aliases=aliases)

domain('PBS','VISION','PBS vision', '''PBS is intended to define, design, organize and visualize industrial plants as canonical engineering objects with multiple connected representations. Its central question is “What are we building?”

Product character: fast, contextual, searchable, keyboard-friendly, collaborative and engineering-rigorous. P&ID, 3D, data tables and inspectors should have interactions suited to their work instead of one forced interaction pattern.

Success means a pump selected anywhere resolves the same equipment, ports, piping, instrumentation, documents, revisions and external engineering references. These are goals; implementation is unverified.''',[2,3,42],['EVENSTAR_VISION','CURRENT_STATE'],status='vision',kind='vision')
domain('PBS','ARCHITECTURE','PBS architecture', '''PBS combines one canonical plant model with specialized P&ID, 3D, engineering-data and explorer interfaces. Relationships are first-class data; renderer meshes and diagram symbols resolve canonical objects.

Supabase/PostgreSQL is the initial shared PBS collaboration/data backbone. Physical geometry, topology and engineering metadata remain connected through UUIDs. Object storage can carry associated assets while metadata remains related to the plant.

Calculation belongs in PSS and delivery workflow in PMS. The historical Process/Control/Project/Workflow demos must not be revived as permanent PBS ownership boundaries. Exact schemas, runtime choices and collaboration mechanics remain open.''',[4,7,16,17,22,23,27,28],['PBS_DATA_MODEL','HISTORICAL_ARCHITECTURE','TECHNOLOGY_REGISTER'])
domain('PBS','DATA_MODEL','PBS data model', '''Accepted conceptual hierarchy: Project → Plant → System → Engineering Object. Typed objects include equipment, instruments, physical lines/pipes, components and plant-linked stream concepts where needed.

Ports/nozzles, connections, control relationships, materials, parts, specifications, documents and revisions are explicit related concepts. A model must answer what connects to a nozzle, which views show an object, which instruments affect it and which calculations/deliverables reference it.

The physical schema is proposed work: object/facet decomposition, cardinalities, line/stream semantics, versioning and geometry representation are not settled. The shared-model notes define semantic boundaries, not database DDL.''',[5,6,7,12,41],['SHARED_MODEL_INDEX','CANONICAL_ENGINEERING_OBJECT','PIPE_LINE_STREAM','OQ-001','OQ-003'],status='proposed',kind='proposed-design')
domain('PBS','PID','P&ID and process definition', '''The PBS P&ID is a data-driven engineering representation. Placing a symbol instantiates or references a canonical object; connecting ports creates or modifies an explicit typed relationship.

The intended interface includes equipment, lines, ports/nozzles, valves, instruments, control relationships, tags, inspectors, completeness validation and revision awareness. Selecting an object should navigate to 3D/data and its PSS/PMS context.

PBS may show a referenced PSS result, but the drawing does not become a solver. How simultaneous P&ID and 3D changes reconcile is unresolved; both must preserve the same identity and relationship semantics.''',[8,15,37],['CANONICAL_ENGINEERING_OBJECT','PORT','CONNECTION','PBS_PLANT_3D','OQ-004'],aliases=['P&ID'])
domain('PBS','PLANT_3D','Plant 3D builder', '''The 3D builder should make plant assembly accessible while retaining engineering meaning. Engineers place, move and rotate equipment, define areas, connect equipment and inspect canonical objects.

Equipment placement and pipe geometry belong to PBS. A relevant mesh resolves a UUID; selection connects to P&ID, engineering data and history. KKS/system metadata drives useful visibility. Pipe racks/support concepts and route editing are intended capabilities whose depth remains open.

Three.js/React Three Fiber is a candidate rendering choice. Geometry representation, interaction implementation and route/support modeling still need decisions.''',[9,10,28,37],['PBS_KKS','PBS_PIPING','PBS_SMART_ROUTING','CANONICAL_ENGINEERING_OBJECT','OQ-004'],aliases=['Plant 3D'])
domain('PBS','PIPING','PBS piping and topology', '''Physical piping is engineering data: stable pipe/line identity, from/to ports, service, diameter, specification, material, route geometry, fittings, valves/components, elevation and revision.

Routing changes must update the related physical definition; an attractive line in 3D alone is insufficient. PBS owns known geometry and physical topology. PSS consumes a versioned view and adds simulation assumptions/results.

Do not collapse a line designation, pipe segment, connection, process stream and computational stream into one entity. The detailed relationship remains open. Nominal and inside diameter must be distinguished in the extraction contract rather than silently substituted.''',[6,12,13,18,41],['PIPE_LINE_STREAM','PORT','CONNECTION','PBS_TO_PSS_HYDRAULICS','OQ-003','OQ-006'])
domain('PBS','SMART_ROUTING','Smart piping routing', '''**Future capability; no routing algorithm selected.** PBS should eventually route between compatible connection points with awareness of obstacles, corridors/racks, alignment and practical engineering constraints.

Candidate controls include manual waypoints, locked segments, rerouting, undo/redo and visible conflicts. Generated routes must remain inspectable and editable. The source goal is “Automatic enough to save time, editable enough to remain engineering.”

Constraint/objective tradeoffs, clearance rules, supports and performance targets require definition before implementation. A narrow routing proof belongs after canonical topology and editable geometry are established.''',[11,37,38,41],['PBS_PIPING','PBS_PLANT_3D','OQ-004','BACKLOG'],status='future',kind='future')
domain('PBS','ENGINEERING_DATA','PBS engineering data', '''Engineering-data views should browse and search equipment, instruments, line lists, materials, parts, specifications, assemblies, manufacturer/model references, KKS, hierarchy, relationships and applicable documents.

These are views of related plant information, not independently maintained copies for each interface. BOM/MTO concepts are part of the intended direction; calculation rules and procurement depth are not specified.

Datasheet links can point into document control. The exact division of plant-linked file metadata, controlled-document metadata and storage remains unresolved.''',[14,17,33,37],['PBS_DATA_MODEL','DOCUMENT','PBS_SEARCH_EXPLORER','OQ-015'])
domain('PBS','KKS','KKS and engineering tags', '''KKS and tags are first-class human engineering identifiers. A stable UUID remains the technical identity when a tag changes under controlled revision.

KKS/system metadata should support filtering and visibility by system, subsystem, service, equipment class, discipline and selected ranges. Layer state should derive from canonical metadata rather than exist only in the renderer.

The exact representation, namespace/uniqueness rules and change policy are unresolved. This source corpus supplies no normative KKS standard or complete coding grammar; do not invent one from the example `10LAC10AP001`.''',[5,10,33,41],['CANONICAL_IDENTITY','ADR-003','OQ-002'],aliases=['KKS'])
domain('PBS','REVISIONS','PBS revisions and engineering change', '''Engineering changes must record affected objects, reason, origin, before state and proposed after state. Review accepts or rejects a proposal; accepted application creates a traceable plant revision.

PBS owns canonical plant state. A route or diameter change should let PSS detect a stale imported topology and deliberately refresh. PSS studies preserve their original input snapshots.

The detailed change-set model, undo/redo, concurrent edits and coordination with PMS review/approval are unresolved. PMS approval status alone must not be assumed to apply a canonical change.''',[19,26,36,41],['REVISION','ENGINEERING_CHANGE','PSS_TO_PBS_DESIGN_CHANGE','OQ-005'])
domain('PBS','PSS_INTEGRATION','PBS ↔ PSS integration', '''PBS supplies stable engineering identity, physical equipment parameters, piping topology, geometry/elevation, hierarchy and plant instrumentation relationships. PSS owns the resulting computational model, methods and results.

Hydraulic import should use known pipes, ports, fittings, valves and equipment without manual reconstruction. Missing data and simulation-only assumptions are made explicit. Calculated results may be displayed in PBS with their source run/revision context.

The return write path is an explicit design proposal, reviewed and applied by PBS. No study override silently changes the plant.''',[13,19,22,37],['PBS_TO_PSS_HYDRAULICS','PSS_TO_PBS_DESIGN_CHANGE','PSS_PBS_INTEGRATION','OQ-006'])
domain('PBS','PMS_INTEGRATION','PBS ↔ PMS integration', '''PMS references PBS engineering objects by Project UUID and canonical object UUID. Cached KKS/name/type/system metadata supports readable delivery records while PBS remains authoritative.

PBS can navigate to related deliverables/documents without owning their workflow state. The detailed document/reference refresh and engineering-change review contracts remain open.''',[23,26,37],['PMS_ENGINEERING_REFERENCES','PMS_PBS_INTEGRATION','OQ-005','OQ-016'])
domain('PBS','SEARCH_EXPLORER','PBS search and explorer', '''Search should resolve UUID, KKS, tag, name, type, system, relationships and applicable documents. Selecting an object reveals its connected representations and engineering context.

Candidate navigation includes Plant Explorer, P&ID, Plant 3D, Engineering Data, Piping, Instrumentation, Documents and Changes/History, with Open in PSS/PMS cross-links. Project switching, command palette and object history are shared UX directions. No screen layout is finalized.''',[32,33],['CANONICAL_ENGINEERING_OBJECT','PBS_ENGINEERING_DATA'])
domain('PBS','COLLABORATION','PBS collaboration', '''Future collaboration may include users, organizations, teams, project permissions, presence, comments, mentions, notifications, locking where needed and review of proposed changes.

The source does not choose locking versus conflict resolution, offline reconciliation or realtime transport. Collaboration must preserve project authorization and traceable engineering changes. Specify these mechanisms against revision semantics before declaring a concurrent editing design.''',[25,29,41],['SECURITY_AND_ACCESS','PBS_REVISIONS','OQ-013','OQ-019'],status='proposed',kind='proposed-design')

domain('PSS','VISION','PSS vision', '''PSS is intended to provide modern process simulation, thermodynamics, hydraulics, water/aqueous calculations and eventually dynamics/control studies. It should support quick standalone calculations and larger plant studies.

The engineer starts with reusable project information, adds missing assumptions, calculates, inspects detailed results and publishes useful engineering knowledge. PSS is unit-aware, explicit about assumptions/provenance and modular across engines where practical.

Success means someone returning months later can reconstruct what was known, assumed, simulated and changed. Target workspaces do not imply implemented capability.''',[1,3,18,23],['PSS_PROJECT_DATA','PSS_PROVENANCE','CURRENT_STATE'],status='vision',kind='vision')
domain('PSS','ARCHITECTURE','PSS architecture', '''PSS is the computational authority for models, thermodynamic configuration, solver state, studies and results. Project Data validates/maps reusable inputs from canonical PBS/Evenstar data and a per-project PSS Airtable Engineering Register.

An integration/domain layer isolates external record IDs. Engine adapters should keep the product from being tied permanently to DWSIM or any single backend. Detailed solver output remains in PSS; curated engineering output can be published to the register.

Local calculation is a product objective where avoidable cloud dependencies can be removed. The persistence model, engine adapter interface and offline cache are unresolved.''',[2,3,4,14,16,19,20],['PSS_DATA_MODEL','PSS_PROJECT_DATA','PSS_ENGINE_ADAPTERS','TECHNOLOGY_REGISTER','OQ-012'])
domain('PSS','DATA_MODEL','PSS data model', '''Conceptual model: Project → Models → Simulation Cases/Studies → Runs → Run Points/Results/Reports. A model consumes local inputs, linked project inputs and snapshots. Studies hold assumptions and overrides.

Reusable inputs include Streams, Compositions, Composition Components/Species, Engineering Variables, Design/Operating Cases, Equipment Input Data, Environmental Conditions and Data Sources. Compositions are reusable datasets, not repeated component columns on every stream.

Analysis records may include stream/equipment/hydraulic-node/thermodynamic results, KPIs, warnings/convergence notes and design proposals. Engineering context records include assumptions, notes, decisions and canonical PBS references.

The table list is recommended source material, not a ratified physical schema. Cardinality, normalization and detailed revision semantics are open.''',[6,8,9,11],['PSS_PROJECT_DATA','PSS_AIRTABLE_ENGINEERING_REGISTER','PIPE_LINE_STREAM','OQ-007','OQ-008'],status='proposed',kind='proposed-design')
domain('PSS','PROJECT_DATA','PSS Project Data', '''> **Start from Project, not from scratch.**

| Input class | Meaning | Authority |
| --- | --- | --- |
| LOCAL PSS INPUT | Value exists only in a model/study | PSS model/study |
| PROJECT INPUT | Reusable information in a project register or canonical Evenstar data | Owning domain of that datum |
| LINKED PSS INPUT | Model input explicitly associated with a project record | Source owns project value; PSS owns model value/snapshot |

Not every value needs a project link. A linked input is an association, not permission to overwrite either side.

| Explicit action | Intended effect | Boundary |
| --- | --- | --- |
| ← Read from Project | Select/validate/map project values into the working model | Show relevant differences; preserve historical runs |
| → Write to Project | Explicitly publish selected local inputs to an authorized reusable-input record | Controlled API; PBS-owned physical data needs a proposal instead |
| ⇄ Compare | Show model/project differences including units, basis and revision | Does not mutate either side |
| ↻ Refresh | Check/reload current source information and identify newer versions | No automatic acceptance into model/run; exact UI granularity open |

Selection can span an operating case, stream, composition, equipment dataset or individual variable. Show a diff before overwriting where appropriate. Validate types, units and source ownership. Conflicting writes need a defined resolution policy.

A source edit may make a link stale, but old runs remain unchanged. The engineer can compare, keep current model values or read deliberately. Snapshot and provenance requirements are in [[PSS_PROVENANCE]].

Examples of reusable knowledge include gas composition, water analysis, ambient conditions, design cases, known variables and PBS topology. Project Data is not uncontrolled bidirectional synchronization.''',[5,6,7,8,9,14,18],['DATA_OWNERSHIP','PSS_PROVENANCE','START_FROM_PROJECT','PROJECT_DATA_UPDATE','OQ-008'],aliases=['Project Data'])
domain('PSS','AIRTABLE_ENGINEERING_REGISTER','PSS Airtable Engineering Register', '''The per-project PSS base is a collaborative engineering register and analytical surface. It holds reusable project inputs and curated PSS-generated engineering results, with links to models, runs, studies, reports, assumptions and source data.

PSS retains computational authority. Airtable is not the numerical solver and must not directly manipulate internal solver state. High-frequency trajectories and every solver iteration/cell do not automatically become register records.

Versioned templates may add domain tables while preserving a stable core contract. Ordinary users should not manage Airtable table IDs or record mappings. Provisioning/connect mechanics, normalized versus convenience tables, template migrations and permission mapping remain open.

Interfaces should compare runs/cases, plot selected profiles and sensitivities, inspect KPIs, warnings and assumptions, and navigate back to models/reports.''',[10,11,12,13,14,17],['PSS_PROJECT_DATA','PSS_RUNS_RESULTS','PROJECT_CREATION','OQ-007','OQ-010'])
domain('PSS','PROCESS_SIMULATION','Process simulation', '''Target process work includes steady-state material/energy balances, streams, separators, mixers/splitters, valves, pumps/compressors, heat exchangers, supported reactors/columns, utilities, recycle convergence and case/sensitivity studies. Dynamics follows progressively.

Known project streams, compositions, cases and equipment inputs should seed calculations. PSS owns flowsheet/solver state while any mapped plant equipment retains PBS identity.

DWSIM is a candidate algorithm backend, not an exclusive engine commitment. Scope, validated methods, supported operations and numerical acceptance tolerances must be selected per implementation slice.''',[4,5,18],['PSS_THERMODYNAMICS_LAB','PSS_ENGINE_ADAPTERS','MVP'],status='proposed',kind='proposed-design',aliases=['Process Simulation'])
domain('PSS','THERMODYNAMICS_LAB','Thermodynamics laboratory', '''PSS must have a first-class standalone pure-fluid and mixture thermodynamics workspace, independent of a full flowsheet.

Target breadth includes transport/caloric properties; saturation pressure; flash calculations; phase envelopes and supported VLE/LLE; thermodynamic potentials and residual/departure properties; fugacity/activity coefficients; compressibility; exergy/availability and entropy-generation analysis; property/phase diagrams; and EOS/correlation/package comparison.

Methods, validity ranges, assumptions, units and provenance must remain visible. The full capability list is target scope, not a validated engine inventory. The first calculation and supported property package remain open.''',[4,19,22],['PSS_PROVENANCE','PSS_ENGINE_ADAPTERS','OQ-012','MVP'],aliases=['Thermodynamics Laboratory'])
domain('PSS','HYDRAULICS','PSS hydraulics', '''Construct a hydraulic model from PBS physical topology when sufficient data exists: pipes, nodes/ports, connectivity, elevations, lengths/geometry, nominal/inside diameters, fittings/valves, equipment connections, materials/specifications and stable UUIDs/tags.

PSS adds fluid state, boundary conditions, roughness/correlation assumptions, pump/compressor curves, method and scenario overrides. Missing properties must be identified, not silently invented.

A study can test DN250 against a PBS DN200 baseline without changing PBS. Results can yield an explicit proposal. Publish engineering nodes/stations with run, pipeline and node UUIDs, order/distance/elevation, selected results, units and case. Exact topology and result contracts remain open.''',[4,12,15,22],['PBS_TO_PSS_HYDRAULICS','PSS_TO_PBS_DESIGN_CHANGE','PBS_PIPING','PSS_RUNS_RESULTS','OQ-006'],aliases=['Hydraulics'])
domain('PSS','WATER_WASTEWATER','Water, wastewater and aqueous chemistry', '''Target calculations include reusable water/effluent analysis, speciation, charge balance, pH/alkalinity/acidity, ionic strength and activity corrections, carbonate chemistry, precipitation/scaling/saturation indices, dosing/neutralization, membranes/RO, recovery/rejection balances, and supported osmotic-pressure/flux methods.

Water analyses should be reusable project datasets with species, concentration basis, units, source and revision. Canonical chemical/species mapping and supported method validity must be resolved before reliable interchange or solver claims.

This domain is proposed product breadth; no aqueous engine or complete calculation package is selected.''',[4,5,8,20],['PSS_PROJECT_DATA','PSS_THERMODYNAMICS_LAB','OQ-009','MULTIDISCIPLINE_EXPANSION'],status='proposed',kind='proposed-design',aliases=['Water & Wastewater'])
domain('PSS','CONTROLS_DYNAMICS','Controls and dynamics', '''Future PSS work includes PID controllers, process variables/setpoints/outputs, tuning, dynamic scenarios, alarms/events, trends, suitable interlocks/permissives and custom blocks in a DCS/P&ID-oriented experience.

Typed signal contracts and coordination of simulation clock, process model and controller execution are required design concerns. PBS owns physical instruments and plant control relationships; PSS owns numerical controller execution/state.

Collaborative control data, historian storage and published summaries remain unresolved. High-frequency dynamic trajectories must not automatically become record-per-sample Airtable data.''',[4,20],['INSTRUMENT','PSS_PYTHON_BLOCKS','HISTORICAL_ARCHITECTURE','OQ-014'],status='future',kind='future',aliases=['Controls & Dynamics'])
domain('PSS','PYTHON_BLOCKS','Python and custom calculation blocks', '''Python/custom calculation blocks are a target extension capability, particularly for controls and standalone calculations. They need typed input/output signal contracts and reproducible model context.

Execution isolation, runtime/package versions, resource limits, scheduling, trust model and error handling are design questions. No unrestricted code execution architecture or plugin API is accepted here. The first engine-adapter decision should distinguish engine plugins from user-authored model blocks.''',[4,20],['PSS_CONTROLS_DYNAMICS','PSS_ENGINE_ADAPTERS','OQ-012','OQ-014'],status='future',kind='future',aliases=['Python Blocks'])
domain('PSS','RUNS_RESULTS','PSS runs and results', '''A run is calculation evidence with its input snapshot, model/configuration, case/study, assumptions, warnings and outputs. Its history must survive later edits to project data.

**Compute at solver resolution; publish at engineering resolution.** Keep detailed solver results in the computational domain. Publish meaningful engineering points/records to the PSS register for comparison and collaboration: hydraulic stations, useful case points, selected KPIs or stream/equipment results.

The source MVP suggests roughly 10–20 useful published records, not a permanent record limit. Automatic versus explicit publication policy is unresolved. This is distinct from the stronger PMS boundary: only selected/promoted evidence normally crosses into controlled delivery.''',[9,11,12,13,18,20,22],['PSS_PROVENANCE','PSS_AIRTABLE_ENGINEERING_REGISTER','PSS_TO_PMS_PROMOTION','OQ-017','OQ-020'],aliases=['Runs & Results'])
domain('PSS','PROVENANCE','PSS provenance and reproducibility', '''A run must retain enough input evidence to reproduce what it used. Capture source system, base/table/record mapping, dataset UUID, source revision/version, import timestamp, units/basis and a hash or equivalent change detector where practical.

A live Airtable link alone is insufficient if that source record can change. Snapshot values or an immutable/version-resolvable source must preserve the historical inputs. Detailed snapshot storage/version semantics remain open.

Record assumptions and method/thermodynamic configuration alongside source inputs. A newer project value should produce a visible difference and an explicit choice to keep or read into the working model. It must not rewrite a completed run.

Evidence promoted to PMS retains originating model/run/report/study identity and its relation to the controlled deliverable revision.''',[7,9,18,19],['PSS_PROJECT_DATA','PSS_RUNS_RESULTS','PMS_PSS_PROMOTION','OQ-008','OQ-017'],aliases=['Provenance'])
domain('PSS','PBS_INTEGRATION','PSS ↔ PBS integration', '''PSS reads canonical plant identity, topology and physical/design values through a domain contract. It keeps source revision and stable object mappings so changed plant data can be detected.

Study-specific assumptions and overrides belong to PSS. Returning a successful alternative to PBS creates a proposal with origin evidence and affected canonical objects. PBS controls application; the cross-system review workflow is unresolved.''',[2,4,15,16,20],['PBS_PSS_INTEGRATION','PBS_TO_PSS_HYDRAULICS','PSS_TO_PBS_DESIGN_CHANGE'])
domain('PSS','PMS_INTEGRATION','PSS ↔ PMS integration', '''PSS engineering evidence can support controlled project deliverables. Promotion selects useful runs, studies, reports or design basis; it does not bulk-copy every PSS result into PMS.

PSS remains source of calculation evidence. PMS owns the selection/reference, deliverable revision, review and issue context. Superseded-evidence detection and the exact promotion payload remain open.''',[2,18],['PSS_TO_PMS_PROMOTION','PMS_PSS_PROMOTION','OQ-017'])
domain('PSS','ENGINE_ADAPTERS','PSS engine adapters', '''Engine-agnostic architecture is the intended direction where practical. DWSIM may supply important open-source algorithms, but the domain must not be permanently coupled to one backend.

Proposed adapter review topics: supported unit operations/property methods, typed units and chemical identifiers, error/convergence reporting, model portability, version/provenance and local execution. Exact adapter API, first engine and numerical validation benchmarks remain undecided.''',[4,19,20],['TECHNOLOGY_REGISTER','OQ-009','OQ-012'],status='proposed',kind='proposed-design')

domain('PMS','VISION','PMS vision', '''PMS connects engineering work to deliverables, disciplines, responsibilities, due dates, milestones, documents, revisions, reviews, approvals, issues and delivery status. Its question is “How are we delivering the project?”

Project-management records should know which engineering they concern. A deliverable can reference canonical PBS objects and selected PSS evidence without recreating either domain.

PMS is initially Airtable-centered, project-oriented, multi-discipline and deliverable-centered. Later procurement, construction, commissioning and handover depth remains future scope.''',[1,2,3,13,31],['PMS_DELIVERABLES','PMS_PROJECT_LIFECYCLE','CURRENT_STATE'],status='vision',kind='vision')
domain('PMS','ARCHITECTURE','PMS architecture', '''Airtable is the initial PMS application/workspace layer for relational delivery records, collaborative views, Interfaces and lightweight automations. Stable Evenstar Project UUIDs, PBS object UUIDs and PSS evidence IDs preserve interoperability.

PMS owns controlled delivery, not plant definition or solver state. A separate PMS base holds delivery records while the PSS base holds reusable inputs and engineering analysis. One PMS base per project is the source's preferred arrangement, awaiting explicit ratification in this vault.

Domain contracts and templates should remain inspectable and portable beyond Airtable. Schema, provisioning, permission mapping and portfolio aggregation need design decisions.''',[3,4,15,16,18,20,25],['PMS_AIRTABLE_ARCHITECTURE','PMS_DATA_MODEL','TECHNOLOGY_REGISTER','OQ-011'])
domain('PMS','AIRTABLE_ARCHITECTURE','PMS Airtable architecture', '''Accepted: Airtable is the first PMS application/workspace layer, and its base is separate from the PSS Engineering Register.

Preferred proposal: one PMS base per project, linked by Project UUID and provisioned from a versioned template. Benefits cited are project boundaries, permissions, project-specific Interfaces, manageable records and archiving. A portfolio layer would aggregate across projects instead of collapsing all domains into one universal base.

Recommended tables and Interfaces are starting points. Actual provisioning API support, template copying, schema migration, limits and permission mapping must be checked when implementation is authorized. No base has been created by this work.''',[3,4,5,7,14,16,25,26],['PMS_TEMPLATES','PMS_PORTFOLIO','OQ-010','OQ-011'],status='proposed',kind='proposed-design')
domain('PMS','DATA_MODEL','PMS data model', '''Project delivery is centered on Deliverables, related to Phases, Disciplines, Systems/Areas, optional Work Packages, Tasks, Milestones, Documents/Revisions, Reviews/Approvals, Engineering References, selected PSS Evidence, Issues/RFIs/Changes and People/Organizations.

Candidate later records include Punch List and Vendors/Procurement. Systems/Areas can reference PBS or describe delivery/WBS grouping; they must not duplicate plant engineering definitions.

Suggested deliverable fields include UUID, number/title/type, discipline/phase/system, work package, owner/reviewer/approver, dates, status/progress/priority, revision, engineering/evidence links and dependencies. Exact field ownership, tables, cardinalities and the Deliverable ↔ Document ↔ Revision relationship are open.''',[6,7,29],['PMS_DELIVERABLES','PMS_DOCUMENTS_REVISIONS','ENGINEERING_REFERENCE','OQ-015'],status='proposed',kind='proposed-design')
domain('PMS','DELIVERABLES','PMS deliverables', '''Deliverables are the center of PMS. Tasks support production of an engineering output; completing a task is not equivalent to approving or issuing its deliverable.

A deliverable relates responsibility, discipline, phase, due/forecast/actual dates, milestones, dependencies, documents/revisions, engineering objects and selected evidence. It should answer what engineering supports the current delivery revision.

Illustrative example: Heat & Material Balance — Revision C refers to an Evenstar project, PBS systems/equipment, a selected PSS run/report, owner, reviewer, approval and issue status. This is a source example, not an existing project record.''',[6,7,10,31],['PMS_DOCUMENTS_REVISIONS','PMS_REVIEWS_APPROVALS','PMS_ENGINEERING_REFERENCES','PMS_PSS_PROMOTION'])
domain('PMS','DOCUMENTS_REVISIONS','PMS documents and revisions', '''PMS owns controlled-document metadata and delivery revision context. Candidate metadata includes document UUID/number/title/type, discipline, deliverable, revision/status, file or URL, owner, issue date and engineering/evidence references.

Issued engineering history must not be silently overwritten. A new revision supersedes an earlier one; reviews and approvals retain the specific revision, actor, time, decision and comments.

A deliverable, a document, a revision and a binary file are distinct concepts. Their exact cardinalities and file storage authority remain unresolved. PBS can hold links to controlled documents without becoming delivery control.''',[7,10,12,17,29],['DOCUMENT','REVISION','PMS_REVIEWS_APPROVALS','OQ-015'])
domain('PMS','REVIEWS_APPROVALS','PMS reviews and approvals', '''Reviews/approvals preserve who assessed what revision, when, the decision/status, comments/response and supersession. Approval of an old revision must not be silently treated as approval of new content.

Suggested default lifecycle: Planned → In Progress → Ready for Review → In Review → Approved / Issued → Superseded. This is a configurable proposal, not a fixed state machine; approval and issue may need distinct gates.

PMS may coordinate review of a plant change, but PBS controls the actual canonical plant update. AI must not approve work or silently change controlled state.''',[11,12,23,24,29],['DOCUMENT_REVIEW_APPROVAL','ENGINEERING_CHANGE','OQ-005','OQ-015','OQ-019'])
domain('PMS','ENGINEERING_REFERENCES','PMS engineering references', '''An engineering reference is a bridge to PBS: Project UUID, PBS Object UUID and useful cached tag/name/type/system plus source/refresh metadata. The UUID is the technical link; cached labels are for usability.

A deliverable such as Pump Datasheet — P-101 can refer to the canonical pump while PMS stores owner, dates and delivery status. PMS must not redefine the equipment or create an independent engineering truth.

Refresh cadence, changed/deleted object behavior and revision pinning are open contract questions. A stale cached tag must never force a new engineering identity.''',[7,8,18,28,29],['ENGINEERING_REFERENCE','CANONICAL_IDENTITY','DATA_OWNERSHIP','OQ-016'])
domain('PMS','PSS_PROMOTION','PMS promotion of PSS evidence', '''PMS normally receives only selected/promoted PSS engineering evidence. It does not ingest every run or every published PSS register record.

PSS remains the source of the calculation. PMS records which run/report/study or design basis supports which deliverable and revision, including promotion and review/issue context.

Exact evidence payload, immutability/version pinning, permission to promote and detection of superseded evidence remain open. New PSS results must not silently replace evidence supporting an issued revision.''',[9,10,17,18,19,29],['PSS_TO_PMS_PROMOTION','PSS_PROVENANCE','PSS_RUNS_RESULTS','OQ-017'])
domain('PMS','PROJECT_LIFECYCLE','PMS project lifecycle', '''Target lifecycle coverage spans Concept/Feasibility, Pre-FEED/FEED, Basic Engineering, Detailed Engineering, Procurement, Construction, Commissioning and Handover.

The initial product can focus on engineering deliverables and review/issue control. The source explicitly does not require every domain at industrial depth in the MVP. Punch lists, vendor/procurement and construction/commissioning functions need separate scope choices.

Client/project workflows should remain configurable without fragmenting stable identity and core contracts.''',[7,11,13,21,26],['PMS_TEMPLATES','PROJECT_HANDOVER','MVP','MULTIDISCIPLINE_EXPANSION'])
domain('PMS','AIRTABLE_INTERFACES','PMS Airtable Interfaces', '''Candidate Interfaces: Project Home with milestones/progress/overdue items; Deliverables filtered by discipline/phase/system/owner/status/date; Discipline Dashboard; Reviews/Approvals queues; Engineering Object View with linked delivery/evidence; Milestones; Issues/Changes; and Document Control.

These surfaces should make engineering relationships and delivery decisions visible beyond raw tables. They remain design candidates; no Interface has been built. Their fields and permissions depend on the core schema and revision model.''',[3,14,27],['PMS_DELIVERABLES','PMS_DATA_MODEL','OQ-015'],status='proposed',kind='proposed-design')
domain('PMS','AUTOMATIONS','PMS automations', '''Possible automations include due-date reminders, overdue flags, review creation/notification, status updates following approvals, blocked-critical-deliverable alerts, aging issues/RFIs and warnings when selected evidence is superseded.

Important workflow logic must remain documented and inspectable. Status automation must preserve revision-specific decisions and cannot grant AI approval authority. Notification recipients, triggers, permissions, retries and exact transitions need design.

No Airtable automation, notification or scheduled task has been created during knowledge-base initialization.''',[19,20,23,28],['PMS_REVIEWS_APPROVALS','PMS_PSS_PROMOTION','EVENT_AND_API_CONTRACTS'],status='proposed',kind='implementation-idea')
domain('PMS','TEMPLATES','PMS templates', '''PMS provisioning should use versioned templates while preserving stable core contracts. Candidate variants include EPC, owner's engineering, FEED/studies, power, LNG/oil & gas, water/wastewater and consulting.

Register template/schema version and mapping metadata against the Evenstar Project UUID. Normal users should not manage table IDs. Migration and client-specific workflow strategies are unresolved; copying bases without version governance risks uncontrolled schema fragmentation.''',[5,26,29],['PROJECT_CREATION','PMS_AIRTABLE_ARCHITECTURE','OQ-010','OQ-011'])
domain('PMS','PORTFOLIO','PMS portfolio', '''Cross-project reporting is future architecture around the preferred per-project PMS bases. Candidates include a Supabase portfolio register, aggregation service, Airtable portfolio base, BI layer or Evenstar dashboard.

Do not merge all project data into one giant base merely to simplify a portfolio view. Decide aggregation fields, freshness, access boundaries and source links after project delivery works. No portfolio implementation or tool choice is accepted.''',[4,25],['OQ-011','FUTURE_IDEAS','ROADMAP'],status='future',kind='future')
domain('PMS','PBS_INTEGRATION','PMS ↔ PBS integration', '''PMS uses stable canonical references to relate deliverables, issues and documents to the plant. PBS remains authoritative for object existence, tag relationships and physical definition.

The initial integration can expose references and cross-navigation. Coordination of engineering-change review, reference refresh and document/deliverable links needs explicit contracts before cross-system writes.''',[8,15,17,20,29],['PBS_PMS_INTEGRATION','PMS_ENGINEERING_REFERENCES','OQ-005','OQ-016'])

shared = [
('CANONICAL_ENGINEERING_OBJECT','Canonical engineering object','A persistent engineering object represents one piece of plant reality with a stable UUID. Type/facets describe its engineering meaning; KKS/tag is a human identifier. P&ID symbols, 3D elements, data rows, PSS references and PMS references resolve it. Relationships to ports, instruments, documents and revisions are first-class.\n\nExact facet/schema/cardinality and lifecycle rules remain open. A computational model object may reference plant identity without becoming the canonical plant object.', ['PBS',5,7,15], ['PBS_HOME','PBS_KKS','PBS_PID','PBS_PLANT_3D','PSS_PBS_INTEGRATION','PMS_ENGINEERING_REFERENCES','ENGINEERING_CHANGE'], ['Canonical Engineering Object']),
('PROJECT','Project','Project is the common Evenstar context for plant definition, calculation and delivery. Its canonical UUID binds subsystem records and base mappings; code/name are readable metadata. The PBS hierarchy concerns plant definition, while PMS phase/discipline/WBS data concerns delivery.\n\nThe source establishes shared identity but not a universal owner for every project metadata field or the provisioning transaction.', ['PBS',6,21], ['PROJECT_IDENTITY','PROJECT_CREATION','PLANT','OQ-010'], ['Project']),
('PLANT','Plant','A Plant is a plant-definition context within a Project, organizing Systems and engineering objects. PBS owns its hierarchy and physical definition. A project may need more than one plant context, but exact cardinality is not ratified.\n\nPSS models and PMS delivery groupings reference plant/system context without taking ownership of it.', ['PBS',4,6,7], ['PROJECT','SYSTEM','PBS_DATA_MODEL'], ['Plant']),
('SYSTEM','System','A plant System organizes related engineering objects in PBS and supports tags, visibility, search and external references. It is distinct from the software subsystems PBS/PSS/PMS.\n\nPMS Systems/Areas can reference PBS context or express delivery/WBS grouping; those meanings require an explicit mapping rather than copied engineering definitions.', ['PBS',6,10], ['PLANT','EQUIPMENT','PBS_KKS','PMS_DATA_MODEL'], ['Plant System']),
('EQUIPMENT','Equipment','Equipment is a typed canonical engineering object such as a pump, valve, vessel or exchanger. PBS owns its existence, identity, placement and physical/design facets. Ports/nozzles connect it to the plant.\n\nPSS may own calculation configuration, operating assumptions and performance results associated with it. Exact ownership of vendor/equipment parameter fields must be mapped explicitly.', ['PBS',4,7,15], ['CANONICAL_ENGINEERING_OBJECT','PORT','PSS_PROJECT_DATA','OQ-021'], ['Equipment']),
('PORT','Port, nozzle and connection point','A port/nozzle/connection point gives a typed attachment endpoint to an engineering object. Explicit endpoint identity supports P&ID connectivity, physical piping and hydraulic extraction.\n\nThe exact port/nozzle/connector hierarchy, compatibility rules, orientation and geometry schema remain open. A diagram line should create a relationship through valid endpoints, not just pixels.', ['PBS',7,8,12], ['EQUIPMENT','CONNECTION','PBS_PIPING','OQ-003'], ['Port','Nozzle']),
('CONNECTION','Connection','A connection expresses a relationship between endpoints. Physical connectivity belongs to PBS and should be reusable by PSS. It is distinct from pipe geometry and from a PSS computational stream.\n\nConnection types, compatibility, directionality and how nonphysical control/signal relationships are represented remain model questions.', ['PBS',6,7,8,12], ['PORT','PIPE_LINE_STREAM','INSTRUMENT','OQ-003'], ['Connection']),
('PIPE_LINE_STREAM','Pipe, line and stream semantics','These concepts must remain distinct even before their detailed schema is selected.\n\n| Concept | Working meaning | Authority |\n| --- | --- | --- |\n| Physical pipe/segment | Physical conduit with endpoints and physical properties/route | PBS |\n| Engineering line | Tagged line/grouping in plant definition; segmentation semantics open | PBS |\n| Physical connection | Endpoint relationship, not the pipe itself | PBS |\n| Plant process-stream identity/link | Engineering flow concept where plant definition requires it | PBS/canonical model; exact semantics open |\n| Reusable stream dataset | Conditions/composition/case used as project input | PSS Project Data for its owned values |\n| Computational stream | Solver/model construct with computed state | PSS |\n\nThese are conceptual distinctions, not accepted one-to-one cardinalities. One physical line may participate in multiple studies; do not force a solver object to be the physical line primary record.', ['PBS',6,12,36,41], ['PBS_PIPING','PSS_DATA_MODEL','CONNECTION','OQ-003'], ['Pipe','Line','Stream']),
('INSTRUMENT','Instrument and control relationships','PBS owns instruments as plant objects and physical/control relationships defining what exists. PSS owns dynamic execution, controller configuration/state and calculated signal behavior.\n\nDetailed loop facets, signal identifiers, interlocks and historian ownership remain unresolved. Preserve the historical Control demo context while separating plant instrumentation from simulation.', ['PBS',4,7,22,36], ['PSS_CONTROLS_DYNAMICS','HISTORICAL_ARCHITECTURE','OQ-014'], ['Instrument']),
('DOCUMENT','Document','A document has identity and metadata distinct from its binary file, deliverable and revisions. PMS owns document-control metadata and issued delivery context. PBS links applicable documents to plant objects. PSS produces calculation reports/evidence.\n\nExact Deliverable ↔ Document ↔ Revision cardinalities, binary storage authority, retention and access are unresolved. Do not silently nominate either PBS storage or Airtable attachments as the sole controlled-file system.', ['PMS',7,12,17,29], ['REVISION','PMS_DOCUMENTS_REVISIONS','PBS_ENGINEERING_DATA','OQ-015'], ['Document']),
('REVISION','Revision','Revision records preserve controlled change and supersession. PBS plant revisions, reusable PSS input versions, PSS run snapshots and PMS document/deliverable revisions are related but not interchangeable.\n\nA run must resolve the inputs it actually used; an approval must resolve the exact revision assessed. Later changes create new evidence/history rather than silently rewriting issued or calculated history. Cross-domain revision semantics remain open.', ['PMS',12], ['PBS_REVISIONS','PSS_PROVENANCE','PMS_DOCUMENTS_REVISIONS','OQ-005','OQ-008','OQ-015'], ['Revision']),
('ENGINEERING_REFERENCE','Engineering reference','An engineering reference links a consumer record to a canonical engineering object using Project UUID and PBS Object UUID. Human-readable tag/name/type/system may be cached with source/freshness metadata.\n\nThe consumer owns the association and its workflow context; PBS owns the engineering object. References should preserve identity through tag changes. Deletion, freshness and revision-pinning behavior still need a contract.', ['PMS',7,8,18], ['CANONICAL_IDENTITY','PMS_ENGINEERING_REFERENCES','OQ-016'], ['Engineering Reference']),
('ENGINEERING_CHANGE','Engineering change','A design proposal records affected objects, reason, origin/evidence, before and proposed after. PBS controls acceptance/application to plant state; a PSS study override is not an applied change. PMS can coordinate delivery impact and review tasks.\n\nA new plant revision records accepted application. The exact role split, permission checks, stale-baseline handling and state transition between PMS review and PBS application remain open.', ['PBS',19,26,36], ['PBS_REVISIONS','PSS_TO_PBS_DESIGN_CHANGE','PMS_REVIEWS_APPROVALS','OQ-005'], ['Engineering Change'])]
for name,title,body,sr,rel,aliases in shared:
    note('05_SHARED_MODEL',name,title,body,systems=ALL,sources=source(sr[0],*sr[1:]),related=rel,aliases=aliases)

def workflow(name,title,trigger,steps,authority,exitcheck,sources,related,status='accepted'):
    note('06_WORKFLOWS',name,title,f'**Trigger:** {trigger}\n\n## Flow\n\n'+'\n'.join(f'{i+1}. {s}' for i,s in enumerate(steps))+'\n\n## Ownership and exceptions\n\n'+authority+'\n\n## Intended completion evidence\n\n'+exitcheck,kind='workflow',status=status,systems=ALL,sources=sources,related=['WORKFLOWS_INDEX',*related])

workflow('PROJECT_CREATION','Evenstar project creation','Create or connect an Evenstar project.',[
'Establish a canonical Project UUID and plant context.',
'Configure enabled PSS/PMS contexts; provision or connect separate project bases under their selected template/schema versions.',
'Register project/base/model mappings in the canonical integration registry.',
'Expose the project to users without ordinary manual table-ID mapping.'
],'Shared identity is accepted; the provisioning service, PMS base cardinality confirmation, platform capability and partial-failure recovery are unresolved. This flow is intended behavior, not an implemented wizard. Do not invent a completed project when one base failed.','One traceable project identity and explicit subsystem/base mappings; creation/connect outcomes are visible.',refs(('PBS',21),('PSS',10),('PMS',4,5)),['PROJECT_IDENTITY','OQ-010','OQ-011'],status='proposed')
workflow('ENGINEERING_OBJECT_LIFECYCLE','Engineering object lifecycle','Create or modify a persistent plant object.',[
'Create or reference a PBS UUID within Project/Plant/System context.',
'Assign typed engineering data, human tag and ports/relationships as appropriate.',
'Represent the same object in data, P&ID and 3D; link PSS/PMS consumers by stable identity.',
'Record proposed changes and revisions; preserve relationships through tag changes.'
],'PBS owns the object and application of changes. Retirement/deletion, merging, concurrent changes and detailed revision semantics remain open.','Selecting the object across representations resolves the same UUID and traceable plant revision.',refs(('PBS',5,7,15,26,42)),['CANONICAL_ENGINEERING_OBJECT','PBS_REVISIONS','OQ-001'])
workflow('START_FROM_PROJECT','Start from Project','Create or seed a PSS model using known project knowledge.',[
'Select the Evenstar project and relevant compositions, water analysis, streams, cases, equipment inputs or PBS topology.',
'Validate source identity, types, units and basis; identify missing information.',
'Explicitly Read selected inputs and capture source/snapshot provenance.',
'Add only missing assumptions and local study values, then calculate.',
'Inspect detailed results, publish useful engineering output to the PSS register and optionally promote selected evidence to PMS.'
],'Each datum retains its source owner. The PSS model/run owns its snapshot and assumptions. Reading existing data does not allow silent writes to PBS or project inputs.','The engineer can reconstruct source inputs, assumptions, run and publications without repeated entry of already-known data.',refs(('PSS',5,7,9,18,22)),['PSS_PROJECT_DATA','PSS_PROVENANCE','PSS_RUNS_RESULTS'])
workflow('PROJECT_DATA_UPDATE','PSS Project Data update and conflict handling','A linked project value changes or an engineer wants to publish a local value.',[
'Refresh source metadata to identify new data; Compare selected values, units, basis and revisions.',
'Choose to keep current model values, Read from Project, or Write selected eligible local data to Project.',
'Validate the datum owner and permissions; present relevant differences before overwriting.',
'Capture the accepted input version/snapshot for subsequent calculations; retain all prior run inputs.'
],'Refresh/Compare do not silently mutate working inputs or old runs. PBS physical design writes use a proposal. The exact stale-write/concurrency resolution algorithm remains OQ-008; no last-writer-wins policy is assumed.','An intentional action explains each changed value, with provenance; old runs remain unchanged after a source edit.',refs(('PSS',6,7,9,14,20)),['PSS_PROJECT_DATA','PSS_PROVENANCE','OQ-008'])
workflow('PBS_TO_PSS_HYDRAULICS','PBS to PSS hydraulics','Engineer needs a hydraulic study of an existing PBS physical plant.',[
'Select a PBS plant/network and source revision.',
'Extract canonical piping topology, stable ports/nodes, physical lengths/diameters/elevations, fittings/valves and equipment where available.',
'Validate completeness and units, map to the PSS hydraulic model and preserve the source snapshot.',
'Add simulation-only fluid/boundary/method/roughness/curve assumptions and optional study overrides.',
'Calculate and inspect engineering results; publish meaningful ordered nodes to the PSS register.',
'Optionally create a design-change proposal with affected PBS UUIDs and supporting run evidence.',
'PBS reviews/applies or rejects the proposal through the controlled change path.'
],'PBS owns physical plant/topology. PSS owns model, assumptions, overrides and results. A study diameter does not alter PBS. Missing data should be surfaced; exact completeness gates and extraction schema await OQ-006.','Known topology was reused without redrawing; the run resolves its PBS revision; old evidence is stable; any plant change follows explicit review/application.',refs(('PBS',13,19,26),('PSS',4,12,15,22)),['PBS_PIPING','PSS_HYDRAULICS','PSS_TO_PBS_DESIGN_CHANGE','OQ-006'])
workflow('PSS_TO_PBS_DESIGN_CHANGE','PSS to PBS design-change proposal','A PSS study identifies a candidate plant improvement.',[
'Select the study/run and local override to propose, such as DN200 → DN250.',
'Record affected canonical UUIDs, source plant revision, before/after, reason and calculation evidence.',
'Submit for review through the agreed PBS/PMS boundary.',
'PBS accepts/applies or rejects; accepted application creates a new traceable plant revision.',
'Consumers can detect newer plant state and deliberately refresh; retain the originating run.'
],'PSS proposes; PBS controls canonical application. Exact review roles, PMS coordination, stale-baseline handling and acceptance/application transaction remain open. A review approval is not silently equated with an applied plant revision.','Proposal outcome, origin evidence and any applied revision are traceable; rejected/local alternatives never alter canonical state.',refs(('PBS',19,26,36),('PSS',15,20),('PMS',29)),['ENGINEERING_CHANGE','DATA_OWNERSHIP','OQ-005'])
workflow('PSS_TO_PMS_PROMOTION','PSS to PMS evidence promotion','Engineer selects calculation evidence for a controlled deliverable.',[
'Select a PSS model/run/report/study or design-basis outcome.',
'Associate its stable identity and provenance with the target PMS project/deliverable revision.',
'Preserve PSS as the calculation source and PMS as owner of promotion/delivery context.',
'Review, approve and issue through normal document control.',
'Surface superseded evidence for review; do not silently replace issued-revision support.'
],'Promotion is selective and distinct from publication into the PSS register. Payload, pinning and supersession detection are unresolved.','The deliverable revision answers exactly what engineering evidence supports it without copying all PSS runs.',refs(('PSS',18),('PMS',9,10,12,17,29)),['PMS_PSS_PROMOTION','PSS_PROVENANCE','OQ-017'])
workflow('DOCUMENT_REVIEW_APPROVAL','Document review and approval','A deliverable/document revision is submitted for review.',[
'Identify the deliverable/document revision, engineering references and supporting evidence.',
'Assign review responsibility and due dates; retain comments and responses.',
'Record revision-specific reviewer/approver, time and decision.',
'Issue through the configured project workflow; retain the issued history.',
'Create a new revision when content changes and link supersession instead of overwriting the issued version.'
],'PMS owns review/approval and delivery metadata. Exact state machine, role mapping, cardinalities and file storage remain open. AI-generated content follows the same review path.','Who reviewed/approved which revision and on what evidence remains reconstructable.',refs(('PMS',7,11,12,22,23,24)),['PMS_REVIEWS_APPROVALS','DOCUMENT','REVISION','OQ-015','OQ-019'])
workflow('PROJECT_HANDOVER','Project handover','A project approaches controlled completion/handover.',[
'Identify required deliverables, issued revisions, approvals and outstanding punch items.',
'Preserve links to canonical plant context and selected engineering evidence.',
'Prepare a controlled handover/archive view with project and template/version context.'
],'This is a proposed future workflow outline. Handover scope, as-built reconciliation, retention/export and acceptance responsibility are not specified by the corpus.','Future acceptance criteria must be agreed before this can be an implementation-ready handover workflow.',refs(('PMS',4,7,13,29)),['PMS_PROJECT_LIFECYCLE','DOCUMENT','OQ-022'],status='future')

def req(ns,title,statement,check,sources,related,status='accepted'):
    n = sum(r['ns']==ns for r in requirements)+1
    rid = f'{ns}-REQ-{n:03d}'
    systems = ALL if ns in ('EV','INT') else [ns]
    requirements.append({'id':rid,'ns':ns,'title':title,'status':status,'related':related})
    note('07_REQUIREMENTS/Items',rid,rid+' — '+title, f'**Classification:** REQUIREMENT\n\n**Status:** {status.title()} product intent. **Implementation:** Unverified.\n\n{statement}\n\n## Acceptance criteria\n\n{check}\n\nThese criteria are derived verification targets, not executed product tests.',kind='requirement',status=status,systems=systems,sources=sources,related=related,extra={'id':rid,'implementation_status':'unverified'})
    return rid

req('EV','Subsystem responsibility','Evenstar shall preserve PBS plant-definition, PSS computation and PMS delivery responsibilities.','A plant update, solver run and deliverable approval each resolve to their designated authority; shared screens do not transfer ownership.',refs(('PBS',1,4),('PSS',2),('PMS',1)),['SYSTEM_BOUNDARIES','ADR-001'])
req('EV','Stable canonical identity','Persistent engineering objects shall use stable UUIDs across representations and subsystem references.','Select a pump in P&ID, 3D, data and external references: each resolves the same canonical UUID.',refs(('PBS',5,15,37),('PMS',18)),['CANONICAL_IDENTITY','ADR-002'])
req('EV','Mutable human identifiers','KKS/tags shall be human identifiers rather than relational primary identity.','A controlled tag change preserves object relationships and PSS/PMS references without creating a new plant object.',refs(('PBS',5),('PSS',2)),['PBS_KKS','ADR-003'])
req('EV','Explicit datum authority','Each shared datum shall have an explicit owner; consumers shall not silently create competing authoritative state.','For an exchanged field, identify owner, source and allowed write path; a cached consumer edit cannot silently replace the owner value.',refs(('PBS',18,19),('PSS',14),('PMS',17)),['DATA_OWNERSHIP','ADR-005'])
req('EV','Portable open core','Canonical schemas, models, interfaces and core logic shall remain open-source friendly and avoid unnecessary proprietary lock-in.','Architecture review identifies documented domain schemas, exportable data and replaceable external adapters; specific export formats still require selection.',refs(('PBS',30,37,40),('PMS',20,28)),['TECHNOLOGY_REGISTER','ADR-014'])
req('EV','Traceable controlled change','Engineering and issued delivery changes shall preserve traceable history.','Retrieve the prior revision, origin/reason and successor rather than observing an unexplained overwrite.',refs(('PBS',26,37),('PMS',12)),['REVISION','ENGINEERING_CHANGE'])
req('EV','Human engineering authority','AI assistance shall not automatically approve engineering work or silently change authoritative controlled state.','An AI suggestion remains a suggestion until an authorized explicit decision; document generation enters normal review.',refs(('PBS',34,40),('PMS',22,23)),['AI_ASSISTANCE'])
req('EV','Durable project memory','Important requirements and decisions shall have identifiable, traceable homes in the project vault.','A resolved architecture change updates its note/ADR, affected requirements and source evidence rather than existing only in chat.',['[[INITIALIZATION_MANDATE]]'],['KNOWLEDGE_GOVERNANCE'])
req('EV','Domain before technology','Implementation planning shall derive technology choices from engineering requirements, domain responsibilities and contracts.','A proposed technology change cites the behavior/model/contract it serves and retains their semantics.',refs(('IDS','Our Direction','This Is Not About Replacing Every Existing Tool'),('PBS',28,35)),['TECHNOLOGY_REGISTER','EVENSTAR_ARCHITECTURE'])

req('PBS','Plant hierarchy and typed relationships','PBS shall organize Project/Plant/System engineering objects and expose first-class typed relationships.','Navigate from a project to system equipment, its ports and connected objects without reconstructing relationships from drawings.',refs(('PBS',6,7,37)),['PBS_DATA_MODEL','SHARED_MODEL_INDEX'])
req('PBS','Canonical P&ID','P&ID symbols and connections shall instantiate/reference canonical engineering objects and typed port relationships.','Place/reference a pump and connect a valid port; the canonical model and inspector expose the same object and relationship.',refs(('PBS',8,37)),['PBS_PID','PORT','CONNECTION'])
req('PBS','P&ID validation and navigation','PBS P&ID shall expose tags, completeness/validation, revision awareness and navigation to related representations.','Inspect a tagged object, a missing/invalid connection and its revision; navigate to its data/3D context.',refs(('PBS',8,37)),['PBS_PID','PBS_REVISIONS'])
req('PBS','Engineering 3D interaction','PBS 3D shall render/select canonical objects and support equipment placement, movement, rotation and physical connection.','Move/select equipment and verify its canonical identity/placement and connected engineering context.',refs(('PBS',9,37)),['PBS_PLANT_3D','EQUIPMENT'])
req('PBS','Metadata-driven visibility','PBS shall support KKS/system-based visibility derived from canonical metadata.','Hide/show a system or KKS selection and verify visibility follows plant metadata rather than an unrelated renderer-only list.',refs(('PBS',10,37)),['PBS_KKS','PBS_PLANT_3D'])
req('PBS','Piping engineering definition','PBS shall represent physical piping with endpoints, topology, physical properties, geometry and revision.','Inspect a route and retrieve linked UUIDs, ports, diameter/specification, geometry/elevation and revision for hydraulic reuse.',refs(('PBS',12,13)),['PBS_PIPING','PIPE_LINE_STREAM'])
req('PBS','Editable generated routes','Generated PBS pipe routes shall remain inspectable and editable by engineers.','Modify a generated route and inspect resulting geometry and engineering data; unresolved routing constraints are visible.',refs(('PBS',11,37)),['PBS_SMART_ROUTING','PBS_PIPING'])
req('PBS','Engineering-data explorer','PBS shall browse/search equipment, instruments, materials, parts, specifications, hierarchy, tags, relationships and documents.','Find a known object by UUID/tag/name/system and inspect connected information from canonical records.',refs(('PBS',14,33,37)),['PBS_ENGINEERING_DATA','PBS_SEARCH_EXPLORER'])
req('PBS','Controlled plant revisions','PBS shall record proposed engineering changes with affected objects, reason, origin, before/after and traceable acceptance/application or rejection.','A rejected proposal leaves plant state unchanged; an applied accepted proposal links to a new revision and origin evidence.',refs(('PBS',19,26)),['PBS_REVISIONS','ENGINEERING_CHANGE'])
req('PBS','Project-authorized access','PBS shall protect privileged credentials, use appropriate RLS/project-org authorization and log important engineering changes.','Inspect access configuration and client artifacts for exposed privileged credentials; verify unauthorized cross-project reads/writes are rejected and accepted changes are logged.',refs(('PBS',29)),['SECURITY_AND_ACCESS'])
req('PBS','Reproducible seed plant','PBS shall support reproducible seed data for a compact integrated demonstration.','The same versioned seed definition creates the intended identities/relationships and supports the documented demo checks.',refs(('PBS',31,37)),['SEED_PLANT','DEMO_STRATEGY'])
req('PBS','Constraint-aware routing','PBS should eventually support routing with compatible ports, obstacles/corridors and manual controls.','An agreed routing fixture demonstrates constraints, waypoints/locked segments and visible conflicts; exact objectives remain open.',refs(('PBS',11,41)),['PBS_SMART_ROUTING','OQ-004'],status='proposed')

req('PSS','Start from Project','PSS shall seed models from reusable project information rather than requiring repeated entry of known data.','Select project composition/conditions or PBS topology, validate it and seed a model with source links.',refs(('PSS',1,5,18)),['PSS_PROJECT_DATA','START_FROM_PROJECT'])
req('PSS','Input classes','PSS shall distinguish LOCAL PSS INPUT, PROJECT INPUT and LINKED PSS INPUT and allow study values to remain local.','The UI identifies each class; an unlinked study input can be edited without changing project data.',refs(('PSS',6)),['PSS_PROJECT_DATA'])
req('PSS','Explicit Project Data actions','PSS shall expose explicit selected Read from Project, Write to Project, Compare and Refresh operations.','Compare changed values/units/revisions, keep or deliberately read/write selected data; no background two-way overwrite occurs.',refs(('PSS',7,9,14)),['PSS_PROJECT_DATA','PROJECT_DATA_UPDATE'])
req('PSS','Typed and unit-aware input reuse','PSS shall validate types, units and basis when importing reusable inputs.','A mapped value retains its unit/basis; incompatible or unresolved mappings are surfaced before they silently become model inputs.',refs(('PSS',3,18,19)),['PSS_PROJECT_DATA','OQ-009'])
req('PSS','Reusable composition and case data','PSS Project Data shall support reusable compositions, engineering variables and operating/design cases.','Reuse one versioned composition in two inputs and resolve its components/species, basis, source and case without repeated unrelated columns.',refs(('PSS',8)),['PSS_DATA_MODEL','PSS_PROJECT_DATA'])
req('PSS','Immutable historical run inputs','PSS shall retain input snapshots/version references sufficient to reproduce what a run used.','Edit an Airtable source after a run; the old run still resolves original values, units/basis and source identity/version.',refs(('PSS',9,19)),['PSS_PROVENANCE','ADR-015'])
req('PSS','Stale linked-input awareness','PSS shall identify newer linked project data and allow compare, keep or deliberate update.','Change a linked source; the engineer sees newer data and can keep the model value while previous runs remain unchanged.',refs(('PSS',9)),['PROJECT_DATA_UPDATE','PSS_PROVENANCE'])
req('PSS','Computational authority','PSS shall own model/solver configuration and state; the Engineering Register shall not directly manipulate solver internals.','An input publication changes reusable data through the domain boundary; a register edit does not silently alter internal solver state.',refs(('PSS',2,14)),['PSS_ARCHITECTURE','DATA_OWNERSHIP'])
req('PSS','Safe study overrides','PSS shall allow study overrides without silently changing canonical PBS design.','Test DN250 against a DN200 imported baseline; PBS remains DN200 unless a separate proposal is accepted/applied.',refs(('PSS',4,15)),['PSS_HYDRAULICS','PSS_TO_PBS_DESIGN_CHANGE','ADR-009'])
req('PSS','Engineering-resolution publication','PSS shall publish curated meaningful engineering results while retaining detailed computation in its domain.','A hydraulic result publication includes selected stations/run/pipeline/node identity, order/distance/elevation, units and case without every solver cell.',refs(('PSS',11,12,13)),['PSS_RUNS_RESULTS','PSS_AIRTABLE_ENGINEERING_REGISTER'])
req('PSS','Analytical project register','The PSS register shall support engineering comparison and navigation around curated results.','Compare two runs/cases, inspect selected chart/KPI data with assumptions/warnings, and navigate to originating models/reports.',refs(('PSS',13,18)),['PSS_AIRTABLE_ENGINEERING_REGISTER'])
req('PSS','Standalone thermodynamics','PSS shall provide a first-class standalone thermodynamics workspace with visible methods, assumptions, validity, units and provenance.','Run an agreed pure-fluid/mixture calculation without a plant flowsheet and inspect method, applicable range, units and source context; first method remains to be selected.',refs(('PSS',4,19)),['PSS_THERMODYNAMICS_LAB','OQ-012'])
req('PSS','Replaceable simulation engines','PSS shall avoid permanent coupling of its product/domain model to one simulation backend where practical.','An architecture review separates domain identities/contracts from engine internals and documents adapter capability limits.',refs(('PSS',4,19)),['PSS_ENGINE_ADAPTERS'])
req('PSS','Local calculation capability','PSS should permit basic local calculation without avoidable cloud dependence.','An agreed standalone calculation can run with network unavailable; offline source-cache behavior is explicit.',refs(('PSS',3,19,20)),['PSS_ARCHITECTURE','OQ-013'],status='proposed')
req('PSS','Steady-state process workspace','PSS should support a validated initial set of steady-state unit operations, balances and case studies.','An agreed reference flowsheet converges with documented method and numerical tolerances; full source target breadth is not implied.',refs(('PSS',4)),['PSS_PROCESS_SIMULATION','OQ-012'],status='proposed')
req('PSS','Reusable aqueous analysis','PSS should reuse project water analyses in supported aqueous/water calculations.','Import a known analysis with species, units/basis and provenance into a selected validated calculation.',refs(('PSS',4,5,8)),['PSS_WATER_WASTEWATER','OQ-009'],status='proposed')
req('PSS','Dynamics and custom block contracts','Future dynamic/control studies should define typed signals and coordinated execution without automatic high-frequency Airtable publication.','An agreed controller/block scenario records its execution assumptions and publishes only selected engineering summaries.',refs(('PSS',4,20)),['PSS_CONTROLS_DYNAMICS','PSS_PYTHON_BLOCKS','OQ-014'],status='proposed')

req('PMS','Deliverable-centered delivery','PMS shall center project work on deliverables with supporting tasks, milestones, responsibility, dates and status.','Navigate from a deliverable to tasks and delivery context; task completion alone does not imply issue approval.',refs(('PMS',6,7)),['PMS_DELIVERABLES','ADR-012'])
req('PMS','Multi-discipline project model','PMS shall support multiple engineering disciplines and project phases without requiring their technical databases inside PMS.','Represent deliverables for at least three disciplines in an MVP fixture, referencing external engineering where applicable.',refs(('PMS',7,21,27)),['PMS_DATA_MODEL','MULTIDISCIPLINE_EXPANSION'])
req('PMS','Canonical engineering references','PMS shall link relevant records to Evenstar Project UUID and PBS Object UUID while treating tag/name caches as non-authoritative.','Retag a PBS object and verify the delivery reference still resolves the UUID; label refresh does not redefine equipment.',refs(('PMS',8,18,28)),['PMS_ENGINEERING_REFERENCES','ENGINEERING_REFERENCE'])
req('PMS','Selective calculation evidence','PMS shall reference selected/promoted PSS evidence rather than ingest all runs/results.','Select one run/report for a deliverable revision; unrelated runs are not automatically added as controlled evidence.',refs(('PMS',9,17,28)),['PMS_PSS_PROMOTION','ADR-013'])
req('PMS','Revision-specific evidence','PMS shall identify the engineering evidence supporting a deliverable/document revision.','Open an issued revision and resolve its PBS references, selected PSS evidence and review/approval context.',refs(('PMS',10,12,31)),['PMS_DELIVERABLES','PMS_DOCUMENTS_REVISIONS'])
req('PMS','Review and approval history','PMS shall preserve actor, exact revision, time, decision/status and review comments/responses.','Retrieve an earlier review/approval with its revision after a later revision is created.',refs(('PMS',7,12)),['PMS_REVIEWS_APPROVALS','DOCUMENT_REVIEW_APPROVAL'])
req('PMS','Issued revision preservation','PMS shall supersede issued revisions with new revisions rather than silently overwrite issued history.','Change issued content through a new revision; both the earlier issued state and supersession remain traceable.',refs(('PMS',12,28)),['PMS_DOCUMENTS_REVISIONS','REVISION'])
req('PMS','Configurable delivery lifecycle','PMS shall offer a strong default delivery workflow and permit project/client-specific configuration.','An agreed default and one configured variation preserve explicit review/approval/issue semantics and revision history.',refs(('PMS',11,29)),['PMS_REVIEWS_APPROVALS','OQ-015'])
req('PMS','Versioned templates','PMS provisioning shall use versioned templates with stable core contracts and registered mapping/version metadata.','A project can identify its template/schema version; a proposed template change identifies migration impact without silent schema divergence.',refs(('PMS',5,26,28)),['PMS_TEMPLATES','OQ-010'])
req('PMS','Inspectable automation','Important PMS automation/workflow logic shall remain documented and inspectable.','For a configured status-changing automation, inspect its trigger, conditions and revision-specific outcome; no hidden AI approval path exists.',refs(('PMS',19,23,28)),['PMS_AUTOMATIONS','AI_ASSISTANCE'])
req('PMS','Delivery Interfaces','PMS should provide project/deliverable/review Interfaces beyond raw tables.','The agreed MVP lets a user inspect deliverables, linked engineering/evidence and review/issue status through Interfaces.',refs(('PMS',14,27)),['PMS_AIRTABLE_INTERFACES'],status='proposed')
req('PMS','Evidence supersession awareness','PMS should surface when selected PSS evidence is superseded without silently replacing issued support.','A newer selected-evidence version is flagged for review while the issued revision retains its original link.',refs(('PMS',19,29)),['PMS_PSS_PROMOTION','OQ-017'],status='proposed')

req('INT','Common project identity','Subsystem contexts and relevant external records shall retain the canonical Evenstar Project UUID.','Resolve a PBS object, PSS project/run and PMS deliverable to the same project independently of external base/record IDs.',refs(('PBS',21),('PSS',10),('PMS',18)),['PROJECT_IDENTITY'])
req('INT','Separate engineering and delivery bases','PSS and PMS Airtable bases shall remain separate domains with explicit selected exchange.','Reusable inputs/runs reside in the PSS context and deliverables/reviews in PMS; linking evidence does not merge bases.',refs(('PMS',16,28)),['ADR-007','PMS_AIRTABLE_ARCHITECTURE'])
req('INT','Per-project PSS register','PSS-enabled projects shall support a per-project PSS base provisioned or connected through versioned configuration.','Resolve project UUID to its PSS base and schema/template mappings without normal users editing table IDs.',refs(('PSS',10,17)),['ADR-008','PROJECT_CREATION'])
req('INT','PBS topology reuse for hydraulics','PSS shall construct a hydraulic model from sufficient known PBS topology/physical data without requiring manual network redraw.','An agreed PBS network seeds a hydraulic model preserving nodes/connectivity/physical fields and source revision; missing assumptions are explicit.',refs(('PBS',13,37),('PSS',4)),['PBS_TO_PSS_HYDRAULICS','ADR-010'])
req('INT','Plant-change freshness','PBS/PSS exchange shall detect/version source plant changes and allow explicit refresh.','A PBS route change marks or exposes a stale PSS import; deliberate refresh does not rewrite the old run.',refs(('PBS',19,37),('PSS',9)),['PBS_PSS_INTEGRATION','PSS_PROVENANCE'])
req('INT','Explicit design proposals','PSS-to-PBS design changes shall be proposals reviewed/applied by PBS rather than silent external writes.','A study override leaves PBS unchanged; its proposal can be traced to affected UUIDs, before/after and origin evidence.',refs(('PBS',19,26),('PSS',15)),['PSS_TO_PBS_DESIGN_CHANGE','ADR-011'])
req('INT','Domain identities across adapters','Integration/business logic shall use stable domain identities and mapping contracts rather than permanent coupling to Airtable IDs or one integration tool.','Replace a test external mapping while retaining domain references; adapter-specific IDs do not become canonical keys.',refs(('PSS',16),('PMS',18,20)),['INTEGRATION_ARCHITECTURE','EVENT_AND_API_CONTRACTS'])
req('INT','Controlled Project Data writes','Selected local inputs may be written to their authorized project-data owner through an explicit controlled boundary.','Show a selected write and resulting source/version context; a PBS-owned design value is routed to a proposal, not overwritten in the register.',refs(('PSS',7,14),('PBS',19)),['PROJECT_DATA_UPDATE','DATA_OWNERSHIP'])
req('INT','Cross-representation navigation','PBS/PSS/PMS integrations shall support navigation through stable engineering relationships.','From a canonical object, resolve its available representations, calculations and delivery references without guessing by tag text.',refs(('PBS',15,33,37),('PMS',8,10)),['CANONICAL_ENGINEERING_OBJECT','PMS_ENGINEERING_REFERENCES'])

def question(num,title,decision,options,impact,sources,related,priority='P1'):
    qid=f'OQ-{num:03d}'
    questions.append({'id':qid,'title':title,'priority':priority,'related':related})
    note('09_ROADMAP/Questions',qid,qid+' — '+title,f'**OPEN QUESTION — {priority}**\n\n## Decision needed\n\n{decision}\n\n## Options / investigation\n\n{options}\n\n## Why it matters\n\n{impact}\n\n## Resolution path\n\nPrepare a concrete domain example and options, identify affected owners/contracts/requirements, and obtain an explicit architectural resolution. Record it in an ADR or requirement update; preserve this question with its resolution link.\n\nNo individual owner or deadline has been assigned.',kind='open-question',status='open',systems=ALL,sources=sources,related=related,extra={'id':qid,'priority':priority,'resolution':None})

question(1,'Canonical object/facet and lifecycle model','Define the object/facet schema, typed relationships/cardinalities, shared object identity and retirement/deletion behavior.','Compare a small core object table plus typed facets with other relational models using one pump, its ports and references. Establish which relationships are canonical.', 'Blocks a coherent schema and linked P&ID/3D implementation.',refs(('PBS',7,36,41)),['PBS_DATA_MODEL','CANONICAL_ENGINEERING_OBJECT','MVP'],'P0')
question(2,'KKS representation and change rules','Specify KKS/tag structure, namespaces, validation and revision rules without using tags as relational primary identity.','The corpus gives examples, not the applicable normative KKS grammar. Obtain the intended coding convention before enforcing it.','Affects tags, search, visibility and cached references.',refs(('PBS',5,10,41)),['PBS_KKS','CANONICAL_IDENTITY'])
question(3,'Ports, connections, lines, pipes and streams','Define endpoint semantics and the relationship among engineering lines, physical segments, plant stream identity, reusable stream data and computational streams.','Model one branched network and one process stream/case; test mapping without forcing one-to-one relationships. Port/nozzle/connector types and compatibility need decisions.','Blocks topology extraction and avoids duplicate or conflated plant/model entities.',refs(('PBS',6,36,41),('PSS',8,20)),['PIPE_LINE_STREAM','PORT','CONNECTION','PBS_TO_PSS_HYDRAULICS'],'P0')
question(4,'Geometry, synchronization and smart routing','Choose geometry representation, P&ID/3D update semantics, routing constraints/objectives, supports/racks and editing/undo behavior.','Start from editable physical topology/geometry. Then compare routing candidates against obstacles, clearances, manual waypoints and locked segments. No algorithm is selected.','Prevents renderer state or an automatic route from silently becoming a separate plant definition.',refs(('PBS',9,11,41)),['PBS_PLANT_3D','PBS_PID','PBS_SMART_ROUTING'])
question(5,'Plant revisions and PBS/PMS change review','Define plant change sets, review roles and the transaction between PSS proposal, PMS coordination and PBS acceptance/application.','Separate review approval from canonical application; define stale baseline, rejection, before/after, evidence and revision links. The exact state machine remains open.','Preserves authority and traceability across engineering and delivery.',refs(('PBS',26,36,41),('PSS',15,20),('PMS',29)),['ENGINEERING_CHANGE','PBS_REVISIONS','PSS_TO_PBS_DESIGN_CHANGE','CONFLICT_REGISTER'],'P0')
question(6,'Hydraulic extraction contract','Specify sufficient PBS topology/geometry/properties, stable node/edge mapping, missing-data handling and source-version semantics.','Work a compact network including a branch, elevation, valve/fitting and pump. Distinguish nominal/inside diameter and known physical data from PSS assumptions.','Required for no-redraw hydraulic reuse and meaningful ordered node publication.',refs(('PBS',13,37,41),('PSS',4,12,20)),['PBS_TO_PSS_HYDRAULICS','EVENT_AND_API_CONTRACTS'],'P0')
question(7,'PSS register schema and Project Data API','Select the minimum core schema, normalized versus convenience tables, and typed read/write/compare API.','Use reusable compositions/species, variables/cases and a minimal model/run/publication set. Source recommended tables are not immutable.','Controls usability, identity mapping and data portability.',refs(('PSS',8,11,20)),['PSS_DATA_MODEL','PSS_AIRTABLE_ENGINEERING_REGISTER','EVENT_AND_API_CONTRACTS'])
question(8,'Input versions, snapshots and write conflicts','Define reusable-input revision semantics, historical snapshot persistence and concurrent/stale Write to Project handling.','Compare immutable values/version-resolvable datasets; define diff and deliberate resolution. A hash/change detector alone is not the historical value.','Old runs must remain reproducible after edits; uncontrolled last-writer-wins is not accepted.',refs(('PSS',7,9,20)),['PSS_PROVENANCE','PROJECT_DATA_UPDATE'],'P0')
question(9,'Units, basis and chemical identities','Define unit normalization, composition bases and mappings to canonical components/species.','Inventory source units and distinguish mole/mass/concentration bases; choose chemical identity mapping with explicit unknowns.','Prevents apparently reusable data from changing scientific meaning.',refs(('PSS',8,18,20)),['PSS_PROJECT_DATA','PSS_WATER_WASTEWATER','PSS_ENGINE_ADAPTERS'])
question(10,'Project provisioning and versioned base migration','Choose the project UUID issuer/provisioning coordinator, create/connect behavior, template provisioning mechanism, mapping registry and migration/recovery strategy.','Verify actual Airtable API/template capabilities when implementation is authorized. Compare manual assisted setup and automated provisioning without assuming either is available; define partial failure and permissions.','Affects both bases, shared identity and ordinary users avoiding table-ID setup.',refs(('PBS',21,36,41),('PSS',10,17,20),('PMS',5,26,29)),['PROJECT_CREATION','PROJECT_IDENTITY','PMS_TEMPLATES'],'P0')
question(11,'Preferred per-project PMS bases and portfolio','Ratify the preferred one-PMS-base-per-project arrangement and choose a later aggregation approach.','The PMS source calls it preferred, while separation from PSS is explicit. Recommendation: ratify per-project PMS bases; keep portfolio in a separate aggregation layer. No accepted ADR is inferred for this candidate.','Closes a technology/deployment commitment without conflating it with the accepted domain boundary.',refs(('PMS',4,25,29)),['PMS_AIRTABLE_ARCHITECTURE','PMS_PORTFOLIO','TECHNOLOGY_REGISTER'])
question(12,'First calculation, engines and validation','Select the first calculation/engine adapter, supported methods/capabilities and numerical validation references/tolerances.','DWSIM and other open-source engines are candidates. Evaluate standalone thermo/steady-state slice, adapter boundaries and runtime version provenance.','No implementation can be called engineering-valid from a requirement alone.',refs(('PSS',4,20,22)),['PSS_ENGINE_ADAPTERS','PSS_THERMODYNAMICS_LAB','MVP'])
question(13,'Local/offline, collaboration and desktop','Define local versus cloud state, offline project-data caching, conflict/locking model, undo/redo persistence and later desktop/hybrid direction.','Separate basic local calculation from collaboration needs; decide cache freshness and reconnect behavior against revision rules.','Avoids choosing infrastructure before data authority/concurrency semantics.',refs(('PBS',25,28,41),('PSS',3,19,20)),['PBS_COLLABORATION','PSS_ARCHITECTURE'])
question(14,'Instrumentation, control execution and historian','Partition control-loop facets across PBS/PSS and define typed signals, custom/Python block execution, clocks and dynamic history/summaries.','PBS plant instruments/physical relationships and PSS numerical state are distinct. Historian storage and Airtable summary policy need decisions.','Resolves historical Control-demo scope without losing plant instrumentation.',refs(('PBS',36,41),('PSS',4,20)),['INSTRUMENT','PSS_CONTROLS_DYNAMICS','PSS_PYTHON_BLOCKS','HISTORICAL_ARCHITECTURE'])
question(15,'PMS schema, documents, revisions and file authority','Define Deliverable ↔ Document ↔ Revision, Reviews/Approvals tables, configurable issue lifecycle and authoritative binary storage.','Distinguish delivery metadata, PBS-linked asset metadata and file bytes. Choose MVP tables/cardinalities; separate approval and issue if needed.','Prevents duplicate document authority and loss of issued history.',refs(('PBS',16,17,41),('PMS',7,11,12,17,29)),['DOCUMENT','PMS_DATA_MODEL','PMS_DOCUMENTS_REVISIONS','CONFLICT_REGISTER'],'P0')
question(16,'PBS reference synchronization','Define PMS engineering-reference refresh, freshness, source revision pinning and deleted/retired object behavior.','Use UUIDs for identity; tags/names remain display caches. Decide what happens when a referenced object changes after issue.','Keeps delivery context usable without an independent plant database.',refs(('PBS',23,41),('PMS',8,29)),['PMS_ENGINEERING_REFERENCES','ENGINEERING_REFERENCE'])
question(17,'PSS evidence promotion and supersession','Specify the selected-evidence contract, evidence version/pinning, deliverable-revision association and supersession detection.','Distinguish PSS register publication from PMS promotion. Preserve original issued evidence while surfacing changed support for review.','Makes controlled delivery reproducible without copying all calculation data.',refs(('PMS',9,10,17,19,29)),['PSS_TO_PMS_PROMOTION','PMS_PSS_PROMOTION'])
question(18,'Interchange, extension and open-core boundaries','Choose industrial interchange/export formats, plugin/extension model and applicable open-source licensing/packaging.','Preserve portable schemas and adapters; concrete formats/license are not supplied. North Star stays separate.','Defines replaceability and future integrations without unnecessary lock-in.',refs(('PBS',24,30,41),('PMS',20,28)),['TECHNOLOGY_REGISTER','NORTH_STAR_BOUNDARY'])
question(19,'Cross-system permissions','Map project/organization authorization and reviewer/approver roles across Evenstar, Supabase and Airtable.','Specify least necessary write authority and who may promote evidence/apply plant changes. Actual platform permission capabilities need verification at implementation time.','Protects canonical and controlled state across collaboration surfaces.',refs(('PBS',29),('PSS',20),('PMS',24,29)),['SECURITY_AND_ACCESS','PMS_REVIEWS_APPROVALS'])
question(20,'PSS publication selection policy','Decide which engineering-resolution results are published automatically and which require explicit selection.','Preserve curated resolution either way. This question concerns the PSS register; PMS still receives selected/promoted evidence only.','Avoids misreading a register publication as formal delivery approval.',refs(('PSS',12,20)),['PSS_RUNS_RESULTS','PSS_TO_PMS_PROMOTION'])
question(21,'Field-level cross-domain ownership','Assign authority to overlapping project metadata, equipment/vendor parameters, design basis and reference/cache fields.','Separate PBS physical/design values from PSS reusable computational assumptions and PMS delivery metadata. Record owner, allowed writes, unit/basis and version for each field.','A broad owner table cannot silently settle ambiguous individual fields.',refs(('PBS',4,18),('PSS',5,8,14),('PMS',5,7,17)),['DATA_OWNERSHIP','PROJECT_IDENTITY','EQUIPMENT'],'P0')
question(22,'Lifecycle expansion and handover depth','Decide later procurement, construction, commissioning, punch-list and handover scope.','Keep initial engineering-delivery work narrow; define client/discipline variants and retention/handover acceptance when needed.','Prevents an MVP from implicitly committing to every industrial project domain.',refs(('PMS',7,13,29)),['PMS_PROJECT_LIFECYCLE','PROJECT_HANDOVER','MULTIDISCIPLINE_EXPANSION'],'P2')
question(23,'Future document-generation boundary','Determine eventual inputs/outputs and ownership for project document generation when the idea is activated.','Preserve PBS/PSS and future discipline inputs, approved calculations and project metadata; generated outputs enter PMS review/control. Do not design the application now.','Keeps an important idea without premature architecture.',refs(('PMS',22,29)),['PROJECT_DOCUMENT_GENERATION'],'P2')
question(24,'Implementation evidence and first proof','Establish what code, schema, bases, assets or demos actually exist and select the next architecture/proof scope after vault review.','Request or inspect explicitly identified repositories/deployments/base inventories later. The four briefs contain no verified completion evidence; their MVPs are suggestions.','Prevents plans from appearing as delivered features and reconciles several candidate demo sequences.',refs(('PBS',27,31,38),('PSS',22),('PMS',27))+['[[INITIALIZATION_MANDATE]]'],['CURRENT_STATE','MVP','SEED_PLANT'],'P0')

def adr(n,title,context,decision,consequences,alternatives,sources,related):
    aid=f'ADR-{n:03d}'
    decisions.append({'id':aid,'title':title,'status':'accepted'})
    reqids=[r['id'] for r in requirements if aid in r['related'] or set(related).intersection(r['related'])]
    note('08_DECISIONS',aid,aid+' — '+title,f'''## Context

{context}

## Decision

{decision}

## Consequences

{consequences}

## Alternatives

{alternatives}

Alternatives here are curator analysis, not a claim that a historical options review occurred.

## Related requirements

'''+ '\n'.join('- '+link(r) for r in reqids)+'''

## Decision provenance

Accepted status records an explicit current choice or guardrail in the cited source/user mandate. It does not imply new user approval of an unmentioned design or implementation completion. Original decision date is unknown; `recorded_at` is the vault initialization date.''',kind='adr',systems=ALL,sources=sources,related=['ADR_INDEX',*related],extra={'id':aid,'date':None,'recorded_at':DATE,'decision_authority':'explicit source decision / governing user mandate','supersedes':[]})

adr(1,'PBS / PSS / PMS system responsibilities','Earlier PBS demos covered behavior and delivery alongside plant design. The current briefs and user mandate establish three constituent systems.','PBS owns plant definition; PSS owns calculation/model behavior; PMS owns project delivery. Shared identity and explicit contracts connect them.','A feature follows its responsible domain even when displayed elsewhere. Detailed cross-system review/provisioning contracts remain open.','Keep all earlier demos as PBS modules, or build disconnected tools with duplicate identities; neither matches the current explicit boundary.',refs(('PBS',1,4,22,23,27),('PSS',2),('PMS',1,16))+['[[INITIALIZATION_MANDATE]]'],['SYSTEM_BOUNDARIES','HISTORICAL_ARCHITECTURE'])
adr(2,'Stable UUIDs for canonical engineering identity','The same equipment must remain identifiable across views, revisions and external records.','Use stable UUIDs as technical identity for persistent engineering objects and stable project/object mappings across systems.','Presentation changes do not recreate plant objects. Exact UUID issuance/mapping mechanics remain schema work.','Use view-local identities or human tags as primary relations; these would lose stable shared identity.',refs(('PBS',5,35),('PSS',2),('PMS',18)),['CANONICAL_IDENTITY'])
adr(3,'KKS and tags are human identifiers','Engineering tags matter to users but can change under revision.','KKS/tags are first-class attributes and human identifiers, not relational primary identity.','Controlled retagging preserves relationships. Tag grammar and uniqueness rules remain open.','Use KKS as relational key; renaming then risks breaking references.',refs(('PBS',5,35),('PSS',2)),['PBS_KKS'])
adr(4,'One engineering object, many representations','P&ID, 3D and data views can otherwise become disconnected definitions of the same equipment.','Views and external references represent one canonical engineering object.','Selection/navigation and edits must resolve shared identity. This does not impose identical interaction patterns on all views.','Independent equipment records per application or decorative-only 3D would contradict the source model.',refs(('PBS',2,3,15,35)),['CANONICAL_ENGINEERING_OBJECT','PBS_PID','PBS_PLANT_3D'])
adr(5,'Explicit authoritative data ownership','Shared information may be stored/displayed in several systems.','Each datum has one explicit authoritative owner. Others may reference, display, cache or propose changes through a controlled boundary.','Ownership is field/domain-based, not determined simply by storage product. Ambiguous fields remain questions; no subsystem silently writes another owner.','Uncontrolled duplicated authorities or automatic bidirectional overwrite would compromise the plant and calculation basis.',refs(('PBS',18,19),('PSS',14),('PMS',17)),['DATA_OWNERSHIP'])
adr(6,'Initial Supabase / PostgreSQL canonical backbone','PBS source explicitly selects an initial shared canonical collaboration/data backbone; PSS/PMS describe shared identity/base mappings.','Use Supabase/PostgreSQL as the initial PBS canonical backbone and shared Evenstar identity/integration-registry direction.','Keep schemas/data portable. Supabase Auth, storage and realtime remain candidates; this decision does not place solver internals or all PMS data in one universal database.','Different infrastructure may be substituted later through an explicit decision while preserving domain models/contracts.',refs(('PBS',16,28,30,35),('PSS',2,10),('PMS',5)),['TECHNOLOGY_REGISTER','PROJECT_IDENTITY'])
adr(7,'Separate PSS and PMS Airtable bases','Engineering analysis and controlled delivery have different data, volume and workflow responsibilities.','Keep the PSS Engineering Register and PMS project delivery base separate, crossing the boundary through selected references/evidence.','PSS publication is not PMS issue control. Shared identity ties the bases together; separate does not mean disconnected.','One merged engineering/delivery base conflicts with the explicit source guardrail.',refs(('PMS',16,28)),['PSS_AIRTABLE_ENGINEERING_REGISTER','PMS_AIRTABLE_ARCHITECTURE'])
adr(8,'Per-project PSS Engineering Register','PSS reuses project input knowledge and publishes curated analysis in a project-specific collaborative register.','Support one PSS Airtable base per PSS-enabled project through create/connect and versioned template configuration.','Register Project UUID/base/schema mappings and hide ordinary mapping details from users. Actual provisioning mechanism and optional domain templates remain unresolved.','A universal PSS base or manual table-ID setup as ordinary workflow does not match the stated per-project direction.',refs(('PSS',1,10,17)),['PROJECT_CREATION','PSS_AIRTABLE_ENGINEERING_REGISTER'])
adr(9,'No silent PSS modification of PBS state','Study alternatives must not corrupt the physical design basis.','PSS owns its model/study overrides and must not silently overwrite canonical PBS plant state.','Imported PBS values remain source-linked; a candidate design change uses a separate proposal.','Treating a simulation diameter override as an immediate plant update would cross authority without review.',refs(('PBS',13,19),('PSS',4,15)),['PSS_HYDRAULICS','DATA_OWNERSHIP'])
adr(10,'Reuse PBS topology for PSS hydraulics','PBS already knows physical networks that traditional simulations would ask engineers to redraw.','PSS consumes sufficient PBS physical topology/data to construct hydraulic models without re-entry of known network information.','PSS adds missing simulation assumptions and preserves source versions. The exact extraction/completeness contract still needs design.','Manually recreating a known network wastes information and risks divergence.',refs(('PBS',13,37),('PSS',4)),['PBS_TO_PSS_HYDRAULICS'])
adr(11,'Explicit PSS design-change proposals','An engineering study may justify a better physical design.','PSS-to-PBS changes are explicit proposals with evidence; PBS controls acceptance/application or rejection.','Applied changes create traceable plant revisions. The precise PMS review coordination and transaction remain unresolved.','Silently promoting a local study or using PMS status alone as canonical mutation authority is not accepted.',refs(('PBS',19,26),('PSS',15)),['PSS_TO_PBS_DESIGN_CHANGE','ENGINEERING_CHANGE'])
adr(12,'Deliverable-centered PMS','Tasks alone do not express controlled engineering delivery or its supporting evidence.','PMS is deliverable-centered, with tasks, milestones, documents/revisions, reviews and engineering references supporting deliverables.','Multi-discipline delivery and revision-specific evidence are central; exact table/cardinality choices remain open.','Task-centered tracking without delivery/evidence context would not meet the source philosophy.',refs(('PMS',6,10,31)),['PMS_DELIVERABLES'])
adr(13,'Selected PSS evidence enters PMS','The calculation domain has more runs/results than controlled delivery needs.','Normally only selected/promoted PSS engineering evidence crosses into PMS; PSS remains calculation source while PMS owns delivery/promotion context.','Evidence needs stable identity and relation to a deliverable revision. Publication into the PSS register is a separate operation.','Dumping every PSS result into PMS would duplicate the computation domain and obscure the delivery basis.',refs(('PMS',9,10,17,28)),['PSS_TO_PMS_PROMOTION','PMS_PSS_PROMOTION'])
adr(14,'Open-source-first architecture','Evenstar aims to reduce unnecessary lock-in while allowing useful surrounding integrations.','Keep canonical models, schemas, interfaces and core logic open-source friendly and portable; isolate optional proprietary services through replaceable adapters.','Airtable can be an initial collaboration layer without defining the only possible domain representation. Exact license/interchange choices remain open.','Making core concepts dependent on proprietary record formats or excluding all proprietary adapters would each differ from the stated direction.',refs(('IDS','Our Direction'),('PBS',30,35),('PMS',20,28)),['TECHNOLOGY_REGISTER'])
adr(15,'Explicit Project Data exchange and reproducible runs','Project input reuse is valuable only if later source edits do not silently rewrite calculation history.','Distinguish local/project/linked inputs; make Read/Write/Compare/Refresh explicit and retain snapshots/version references sufficient for historical reproducibility.','Newer source data is visible for deliberate comparison/update. Snapshot storage, concurrency and refresh UI details still require contracts.','Live links alone or automatic two-way synchronization cannot preserve a historical basis when source records change.',refs(('PSS',6,7,9,14,19)),['PSS_PROJECT_DATA','PSS_PROVENANCE'])
adr(16,'Historical demos follow current system boundaries','The earlier PBS brain named Process, Control, Plant 3D, Data, Project, Workflow and Explorer demos sharing a backend.','Retain that historical portfolio record, but interpret current responsibility using ADR-001: computation belongs in PSS, delivery in PMS, and canonical plant views in PBS.','This supersedes treating the seven demo names as permanent PBS subsystem ownership. It does not claim migration was implemented or settle mixed control/provisioning/review facets. The seven historical ADR summaries remain preserved.','Silently rewrite the old demo list or retain its scope unchanged; both lose architectural evolution.',refs(('PBS',27,35,36)),['HISTORICAL_ARCHITECTURE','ADR-001','OQ-005','OQ-014'])

history=[
('Integrated views','PBS interfaces represent one Plant Build System, not unrelated applications.','Retained within PBS. Cross-system responsibilities now follow ADR-001 and ADR-016.'),
('Shared canonical backend','Begin the portfolio phase with a shared Supabase backend; separation may evolve later.','Retained initial canonical PBS direction in ADR-006; do not infer one backend owns all computation/delivery state.'),
('Stable UUIDs','UUIDs are technical identity; KKS/tags are human identifiers.','Reaffirmed by ADR-002 and ADR-003.'),
('Astra as architect and build manual','Astra preserves architecture and durable project memory.','Curatorial role retained in KNOWLEDGE_GOVERNANCE; product implementation remains gated by user review.'),
('Executable human tasks','Implementation guidance identifies exact actions, artifacts, expected results and verification.','Retained planning convention when implementation is authorized; no execution implied by the historical instruction.'),
('Open source first','Prefer open-source-friendly architecture and portability.','Reaffirmed by ADR-014.'),
('Canonical model before elaborate interfaces','Establish the canonical model before sophisticated interfaces.','Retained in ROADMAP and ADR-016; no schema completion is inferred.')]
for n,(title,summary,applicability) in enumerate(history,1):
    hid=f'PBS-ADR-{n:03d}'
    note('08_DECISIONS/History',hid,hid+' — '+title,f'''## Historical record

The supplied consolidated PBS source lists this as an accepted historical decision. The original full ADR and its date were not supplied. This note preserves that summary and must not be mistaken for the original record.

{summary}

## Current applicability

{applicability}

## Alternatives and consequences

The original alternatives/consequences were not provided. Current interpretation is documented separately rather than invented as historical fact.''',kind='historical-adr',status='historical',systems=['PBS'],sources=source('PBS',35),related=['HISTORICAL_ARCHITECTURE','ADR_INDEX'],extra={'id':hid,'date':None,'recorded_at':DATE,'original_status':'accepted as reported by consolidated PBS source'})

note('01_ARCHITECTURE','HISTORICAL_ARCHITECTURE','Historical architecture and evolution', '''The source preserves an earlier seven-demo PBS portfolio. It also explicitly introduces the newer PBS/PSS/PMS separation. The older full project brain, original ADR text and migration artifacts were not supplied.

| Earlier demo | Current conceptual placement | Remaining reconciliation |
| --- | --- | --- |
| Process | PSS calculation; PBS P&ID plant definition | Separate solver state from plant stream/line semantics |
| Control | PSS dynamics/execution; PBS plant instruments/relationships | OQ-014: loop/signal/historian facets |
| Plant 3D | PBS | Geometry and routing contracts |
| Data | PBS plant data; PSS Project Data; PMS delivery data | Assign fields explicitly; no universal authority |
| Project | Shared identity/provisioning and PMS delivery context | OQ-010, OQ-021 |
| Workflow | PMS delivery workflow; PBS plant application authority | OQ-005 |
| Explorer | PBS canonical-object navigation with cross-system references | Shared search/navigation scope can evolve |

These are responsibility mappings from the current source boundary, not evidence of migrated code. [[ADR-016]] records why the historical demo partition no longer determines PBS ownership. No original historical ADR is wholly marked superseded when its central principle still holds.

The seven historical accepted-decision summaries retain IDs [[PBS-ADR-001]], [[PBS-ADR-002]], [[PBS-ADR-003]], [[PBS-ADR-004]], [[PBS-ADR-005]], [[PBS-ADR-006]] and [[PBS-ADR-007]]. Current decisions explicitly reaffirm or qualify them.''',kind='historical-context',status='recorded',systems=ALL,sources=refs(('PBS',27,35,36)),related=['ADR-001','ADR-016','CONFLICT_REGISTER','OPEN_ARCHITECTURE_QUESTIONS'])

note('01_ARCHITECTURE','CONFLICT_REGISTER','Conflicts, ambiguities and reconciliation', '''The current briefs largely agree. No direct contradiction among their explicit PBS/PSS/PMS ownership guardrails was found. The following conflicts with historical framing and ambiguous overlaps remain visible. “Recommended resolution” is not an accepted decision unless linked to one.

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
- PBS, PSS and PMS describe separate suggested MVPs. Their integrated sequence is a planning proposal, not a contradiction or completed implementation.''',kind='register',status='recorded',systems=ALL,sources=refs(('PBS',16,17,18,26,27,35,36),('PSS',8,14,15,20),('PMS',4,17,29)),related=['KNOWLEDGE_GOVERNANCE','OPEN_QUESTIONS','ADR_INDEX'])

note('09_ROADMAP','CURRENT_STATE','Current state', '''As of **11 September 2026**, the inspected evidence consists of four consolidated Markdown briefs and the user's initialization mandate. The destination Evenstar vault was empty when inspected.

| Area | Evidence-backed status |
| --- | --- |
| Source corpus | Four supplied files read completely and preserved; hashes recorded in SOURCE_INDEX |
| Knowledge architecture | Initialized in this delivery; consistency results and placement status recorded in INITIALIZATION_REPORT |
| Product architecture | High-level boundaries/identity/ownership established; detailed schemas/contracts remain open |
| PBS software/schema/seed | Implementation unverified; source requirements/backlog are not completion evidence |
| PSS solver/models/register | Implementation unverified; no engine or base inspected |
| PMS Airtable base/Interfaces/automations | Implementation unverified; none created by this task |
| Integration/deployments/tests | Unverified; no product runtime validation performed |

**Current priority:** review the initialized project brain, then resolve the smallest shared-model and ownership contract needed for a coherent proof.

**Gate:** product implementation must wait until the user reviews this knowledge base. Do not describe unverified systems as nonexistent; the source corpus simply does not demonstrate their current implementation.

For future progress updates, attach repository/file/base/deployment evidence, observation date and relevant verification before changing implementation status.''',kind='status',status='unverified',systems=ALL,sources=['[[INITIALIZATION_MANDATE]]']+refs(('PBS',38),('PSS',22),('PMS',27)),related=['ROADMAP','MVP','OQ-024','CONSISTENCY_REVIEW'])

note('09_ROADMAP','ROADMAP','Roadmap', '''This is a **proposed dependency-based sequence**, not an approved delivery schedule. No dates, staffing, budgets or implementation completion are inferred.

| Stage | Intended outcome | Depends on / exit evidence |
| --- | --- | --- |
| 0 — Project brain | Linked architecture, requirements, decisions, sources and review | This initialization; user review pending |
| 1 — Contract reconciliation | Shared project/object/port/line model, field ownership and revision examples | Resolve P0 questions with worked pump/network/evidence examples |
| 2 — Canonical PBS foundation | Schema/security and reproducible compact seed plant | Accepted model and verified authorization; no implementation yet |
| 3 — Object explorer and Engineering Data | Inspect canonical identity and relationships | Seed and stable contracts |
| 4 — P&ID then 3D slices | Same object across representations | Canonical relationship/geometry model |
| 5 — PSS Project Data proof | Read, run, publish, compare changed input, preserve old run | Input schema/versioning/units and first validated engine |
| 6 — Piping and hydraulic reuse | PBS network seeds PSS; overrides/proposals preserve authority | Topology/revision contracts; editable routing proof as needed |
| 7 — Controlled PMS delivery | Object reference + selected PSS evidence + revision/review/issue | Document/evidence/permission contracts |
| 8 — Integrated demonstration | Cross-representation navigation and traceable engineering delivery | Verified slices and common seed/design language |
| Later | Broader dynamics, domains, portfolio and lifecycle | Separate scope decisions; Future notes |

The PBS source lists phases 0–10 from project brain through canonical model/schema, shell/data, P&ID, 3D, piping, hydraulics, PMS and polished Explorer. PSS suggests a gas/thermodynamic Project Data proof first and hydraulic reuse second. PMS suggests a small multi-discipline delivery base. This roadmap reconciles dependencies as a recommendation; the final first proof remains [[OQ-024]].''',kind='roadmap',status='proposed',systems=ALL,sources=refs(('PBS',38),('PSS',22),('PMS',27)),related=['BACKLOG','MVP','CURRENT_STATE','OPEN_QUESTIONS'])

note('09_ROADMAP','MVP','MVP candidates and acceptance gates', '''**Proposed proof slices; not a commitment to implement all source feature lists.**

| Slice | Small coherent demonstration | Evidence to pass |
| --- | --- | --- |
| PBS identity | Compact seed pump/network in data, P&ID and 3D | Same UUID, typed ports/relationships, tags and traceable changes |
| PSS Project Data | One project/base; gas composition/design conditions entered in register or explicitly written from PSS; small steady-state/thermo calculation | Start from Project, source/units validated, roughly 10–20 meaningful results, case chart, changed source compared without altering old run |
| PBS → PSS hydraulics | Known compact topology seeds hydraulic model | No redraw, explicit missing assumptions/override, ordered engineering-node results, optional controlled proposal |
| PMS delivery | One proposed project base, about 3 disciplines, 2 systems, 10–20 deliverables with tasks/milestones/documents/reviews | PBS references, one selected PSS report/result, revision submission/review/approval/issue and visible status |

Counts are source demonstration targets, not universal system limits. The water/thermal/process seed and feed-gas PSS example are separate candidates; choose compatible fixture data deliberately.

Recommended next architectural slice is a worked **pump + connected network + one calculation + one controlled deliverable** contract. Resolve identity, datum ownership, revision and evidence semantics on paper before building its schema or UI.

Non-MVP until chosen: broad industrial routing, full process/control domain depth, portfolio, procurement/construction depth and document generation.''',kind='plan',status='proposed',systems=ALL,sources=refs(('PBS',31,37,38),('PSS',22),('PMS',27)),related=['SEED_PLANT','OPEN_QUESTIONS','REQUIREMENTS_INDEX','CURRENT_STATE'])

backlog=[
('BL-001','Review initialized vault','P0','User review; record accepted changes/conflicts','INITIALIZATION_REPORT'),
('BL-002','Worked shared-model contract','P0','Project/object/ports/lines, field ownership and revision examples','OQ-001'),
('BL-003','Resolve change-review handoff','P0','PSS proposal, PMS coordination, PBS application','OQ-005'),
('BL-004','Design hydraulic extraction','P0','Versioned topology, units and completeness example','OQ-006'),
('BL-005','Design input snapshots and conflicts','P0','Old-run reproduction after a project edit','OQ-008'),
('BL-006','Define document/evidence control','P0','Cardinalities, file authority, revision-bound evidence','OQ-015'),
('BL-007','Plan project/base provisioning','P1','Actual capability checks and mapping/migration decisions','OQ-010'),
('BL-008','Select seed and first proof','P1','Fixture specification and numerical acceptance references','SEED_PLANT'),
('BL-009','Implement canonical schema/security/seed','P1','Blocked until vault review and model decisions; no work performed','PBS_DATA_MODEL'),
('BL-010','Build explorer/data/P&ID/3D slices','P1','Depends on canonical model and geometry contract','PBS_ARCHITECTURE'),
('BL-011','Build PSS Project Data proof','P1','Depends on input contract, engine and validation choice','PSS_PROJECT_DATA'),
('BL-012','Build PMS controlled-delivery proof','P1','Depends on references/evidence/revision and permissions','PMS_ARCHITECTURE'),
('BL-013','Routing and hydraulic integration proof','P1','Depends on physical topology and simulation assumptions','PBS_TO_PSS_HYDRAULICS'),
('BL-014','Broaden control/water/domain studies','P2','Choose domain/engine depth separately','MULTIDISCIPLINE_EXPANSION'),
('BL-015','Portfolio and lifecycle expansion','P2','Define later client/project needs','PMS_PORTFOLIO'),
('BL-016','Revisit document generation','P2','Future/open; do not fully design now','PROJECT_DOCUMENT_GENERATION')]
note('09_ROADMAP','BACKLOG','Backlog', 'Possible work, grouped by dependencies. Priorities are curator recommendations; no owner/date or implementation commitment has been assigned.\n\n'+table(['ID','Possible work','Priority','Gate / intended outcome','Context'],[(a,b,c,d,link(e)) for a,b,c,d,e in backlog]),kind='backlog',status='proposed',systems=ALL,sources=refs(('PBS',38),('PSS',20,22),('PMS',29))+['[[INITIALIZATION_MANDATE]]'],related=['ROADMAP','CURRENT_STATE','OPEN_QUESTIONS'])

note('10_DEMOS','DEMO_STRATEGY','Demonstration strategy', '''Use narrow polished vertical slices around shared canonical identity and a common design language. A demo should prove reuse/cross-navigation, not become an unrelated application with duplicate objects.

Preserve the historical seven-demo strategy as history in [[HISTORICAL_ARCHITECTURE]]. Current demonstrations should follow PBS/PSS/PMS responsibility. Build the canonical model before sophisticated interfaces.

Recommended evaluation: select a canonical object across representations, reuse project inputs/topology, preserve old runs after source changes, and trace selected evidence into a reviewed deliverable. A polished interface alone is not proof of architecture.''',kind='plan',status='proposed',systems=ALL,sources=refs(('PBS',27,35,37,42),('PSS',22),('PMS',27)),related=['SEED_PLANT','REFERENCE_PLANTS','MVP'])
note('10_DEMOS','SEED_PLANT','Seed plant', '''**Proposed fixture; no plant dataset has been created.** The PBS source recommends one compact but rich seed plant; a water/thermal/process skid is a sensible candidate.

A proposed contract fixture could include a pump, vessel/source/sink, valve, ports, branched piping and elevation change, instruments, tags, one operating case and one controlled deliverable. These exact fixture details are curator suggestions, not settled source requirements.

Resolve with [[OQ-024]]: choose water/thermal topology, a feed-gas Project Data example, or coordinated fixtures. Define stable seeded identities, reproducible generation, physical values/units and numerical references before implementation. Do not fabricate a validated plant from a demo label.''',kind='proposed-design',status='proposed',systems=ALL,sources=refs(('PBS',31,37),('PSS',22),('PMS',27)),related=['DEMO_STRATEGY','MVP','OQ-006','OQ-012'])
note('10_DEMOS','REFERENCE_PLANTS','Future reference plants', '''Source candidates include LNG, combined-cycle power, refinery, water/wastewater, ammonia/fertilizer, hydrogen, utilities and chemical plants.

These are later domain demonstrations, not implemented datasets or commitments to their full engineering scope. Start with a compact seed and expand only when shared models/contracts can carry the added complexity.''',kind='future',status='future',systems=ALL,sources=refs(('PBS',31),('PSS',17),('PMS',26)),related=['SEED_PLANT','MULTIDISCIPLINE_EXPANSION'])
note('11_FUTURE','PROJECT_DOCUMENT_GENERATION','Project Document Generation', '''**STATUS: FUTURE / OPEN QUESTION**

Preserve this as an important future capability without designing the full application.

Potential inputs are PBS engineering information, PSS information/results, electrical, instrumentation/control, mechanical, piping, civil/structural, approved calculations and project metadata. Potential outputs are Basic/Detailed Engineering documents entering PMS as controlled deliverables.

Generated content must follow normal revisions, reviews and approvals. AI or automation does not make an engineering document approved.

Unresolved: product/system boundary, input/output contracts, supported document types, authority and ownership, generation/reproducibility model and implementation technology. No application architecture, AI provider or generation pipeline is selected.''',kind='future',status='future',systems=ALL,sources=refs(('PMS',22,29))+['[[INITIALIZATION_MANDATE]]'],related=['OQ-023','DOCUMENT_REVIEW_APPROVAL','PMS_DOCUMENTS_REVISIONS','AI_ASSISTANCE'])
note('11_FUTURE','MULTIDISCIPLINE_EXPANSION','Multi-discipline expansion', '''PMS must accommodate Process, Mechanical, Piping, Electrical, Instrumentation & Control, Civil, Structural, HSE, Project Controls and Procurement as delivery disciplines. Their technical databases do not need to live in PMS.

Future technical capabilities may broaden PSS water/process/control studies and PBS plant detail. Each new domain must define its canonical references, field owners, contracts and evidence relationship before implementation.

Discipline support in a delivery register does not prove a corresponding electrical/civil/structural calculation application exists.''',kind='future',status='future',systems=ALL,sources=refs(('PMS',7,21,22),('PSS',4,17)),related=['DATA_OWNERSHIP','PMS_PROJECT_LIFECYCLE','REFERENCE_PLANTS','PROJECT_DOCUMENT_GENERATION'])
note('11_FUTURE','FUTURE_IDEAS','Future ideas index', '''Uncommitted directions have durable homes:

- [[PROJECT_DOCUMENT_GENERATION]] — open product boundary; no full design yet.
- [[MULTIDISCIPLINE_EXPANSION]] and [[REFERENCE_PLANTS]] — additional technical/delivery domains.
- [[PSS_CONTROLS_DYNAMICS]] / [[PSS_PYTHON_BLOCKS]] — typed execution and historian questions.
- [[PBS_SMART_ROUTING]] — mature constraint-aware routing and editable assistance.
- [[PMS_PORTFOLIO]] — cross-project aggregation after project delivery works.
- [[PROJECT_HANDOVER]] / [[PMS_PROJECT_LIFECYCLE]] — deeper procurement, construction and commissioning.
- [[OQ-013]] / [[OQ-018]] — desktop/hybrid, offline, extension and interchange direction.
- [[AI_ASSISTANCE]] — optional assistance under human decision control.
- [[NORTH_STAR_BOUNDARY]] — separate project; only explicit adapters if later useful.

Moving an idea into committed scope requires a decision, affected requirements, an owner/contract review and roadmap update.''',kind='map',status='future',systems=ALL,sources=refs(('PBS',24,25,28,31,34,41),('PSS',4,20),('PMS',21,22,25,29)),related=['BACKLOG','KNOWLEDGE_GOVERNANCE'])

def moc(folder,name,title,intro,targets,sources=()):
    body = intro+'\n\n'+'\n'.join('- '+link(n,t) for n,t in targets)
    note(folder,name,title,body,kind='map',status='recorded',systems=ALL,sources=sources,related=['EVENSTAR_HOME'] if name!='EVENSTAR_HOME' else [])

for sys,folder in [('PBS','02_PBS'),('PSS','03_PSS'),('PMS','04_PMS')]:
    targets=[]
    for path,content in notes.items():
        if path.startswith(folder+'/'):
            targets.append((Path(path).stem,re.search(r'^# (.+)$',content,re.M)[1]))
    targets.insert(2,(sys+'_REQUIREMENTS',sys+' requirements register'))
    targets.append((sys+'_OPEN_QUESTIONS',sys+' open questions'))
    intro={'PBS':'**What are we building?** Canonical plant definition, identity, physical relationships and representations.', 'PSS':'**How does it behave?** Engineering computation using reusable project inputs, traceable assumptions and reproducible evidence.', 'PMS':'**How are we delivering it?** Multi-discipline, deliverable-centered project control linked to canonical objects and selected evidence.'}[sys]
    moc(folder,sys+'_HOME',sys+' — '+{'PBS':'Plant Build System','PSS':'Plant Simulation System','PMS':'Project Management System'}[sys],intro+'\n\nThese notes describe intended architecture and behavior. Implementation evidence is in [[CURRENT_STATE]].',targets,source(sys,1 if sys!='PSS' else 2))

for ns,filename,title in [('EV','SHARED_REQUIREMENTS','Shared requirements'),('PBS','PBS_REQUIREMENTS','PBS requirements'),('PSS','PSS_REQUIREMENTS','PSS requirements'),('PMS','PMS_REQUIREMENTS','PMS requirements'),('INT','INTEGRATION_REQUIREMENTS','Integration requirements')]:
    rows=[(link(r['id']),r['title'],r['status'],'Unverified') for r in requirements if r['ns']==ns]
    note('07_REQUIREMENTS',filename,title,'Each stable ID opens a coherent requirement with acceptance criteria and section-level sources. Accepted means intended product behavior, not implementation. Proposed requirements require scope/design resolution.\n\n'+table(['ID','Behavior','Status','Implementation'],rows),kind='register',status='recorded',systems=ALL,related=['REQUIREMENTS_INDEX']+([ns+'_HOME'] if ns in ALL else ['EVENSTAR_ARCHITECTURE']))
moc('07_REQUIREMENTS','REQUIREMENTS_INDEX','Requirements index',f'{len(requirements)} stable requirements: {sum(r["status"]=="accepted" for r in requirements)} accepted product behaviors and {sum(r["status"]=="proposed" for r in requirements)} proposed behaviors. All product implementation is unverified. IDs are permanent; do not reuse retired numbers.\n\nVerification criteria are intended checks. They do not claim executed tests. Domain registers own their requirements; system MOCs link here rather than duplicating specifications.', [('SHARED_REQUIREMENTS','EV — shared behavior'),('PBS_REQUIREMENTS','PBS — plant definition'),('PSS_REQUIREMENTS','PSS — computation and project inputs'),('PMS_REQUIREMENTS','PMS — controlled delivery'),('INTEGRATION_REQUIREMENTS','INT — cross-system behavior'),('ADR_INDEX','Decision traceability'),('KNOWLEDGE_GOVERNANCE','Requirement maintenance')])

for sys in ALL:
    rows=[]
    for q in questions:
        # Deliberately broad cross-system inclusion where concepts touch the domain.
        if any(sys in x for x in q['related']) or q['id'] in {'OQ-001','OQ-003','OQ-005','OQ-008','OQ-010','OQ-015','OQ-017','OQ-019','OQ-021','OQ-024'}:
            rows.append((link(q['id']),q['title'],q['priority']))
    note({'PBS':'02_PBS','PSS':'03_PSS','PMS':'04_PMS'}[sys],sys+'_OPEN_QUESTIONS',sys+' open questions','System-facing view of the central question register. Questions have one durable home even when several systems are affected.\n\n'+table(['Question','Decision needed','Priority'],rows),kind='register',status='open',systems=[sys],sources=source(sys,{'PBS':41,'PSS':20,'PMS':29}[sys]),related=[sys+'_HOME','OPEN_QUESTIONS'])

note('09_ROADMAP','OPEN_QUESTIONS','Open questions register','Grouped decisions preserve the original source questions without duplicating shared concerns. Priorities are curator recommendations: P0 blocks the next shared contract, P1 supports a slice, P2 is later scope. No assignee or date is implied.\n\n'+table(['ID','Decision needed','Priority'],[(link(q['id']),q['title'],q['priority']) for q in questions]),kind='register',status='open',systems=ALL,sources=refs(('PBS',36,41),('PSS',20),('PMS',29)),related=['OPEN_ARCHITECTURE_QUESTIONS','CONFLICT_REGISTER','BACKLOG'])
moc('01_ARCHITECTURE','OPEN_ARCHITECTURE_QUESTIONS','Open architecture questions','The current boundaries are settled; these contracts need explicit decisions before schemas and cross-system writes. The complete register is [[OPEN_QUESTIONS]].',[(q['id'],q['title']) for q in questions if q['priority']=='P0']+[('OQ-011','Preferred PMS per-project bases'),('OQ-014','Instrumentation/control split'),('OQ-018','Interchange and extension model'),('OQ-019','Permission mapping')])

note('08_DECISIONS','ADR_INDEX','Architecture decision register','Current accepted records capture explicit source choices. Unknown original decision dates remain null; recording date is initialization. Historical records preserve only summaries supplied in the corpus.\n\n## Current accepted decisions\n\n'+table(['ID','Decision','Status'],[(link(d['id']),d['title'],d['status']) for d in decisions])+'\n\n## Candidate not recorded as an accepted ADR\n\nOne PMS base per project is preferred in the source, not conclusively settled. See [[OQ-011]]; keep it open until ratified. Exact schemas, APIs/events, frontend/rendering tools, engine selection and provisioning mechanisms likewise remain questions/proposals.\n\n## Historical accepted decisions as reported\n\n'+'\n'.join('- '+link(f'PBS-ADR-{i:03d}',h[0]) for i,h in enumerate(history,1))+'\n\nNo original historical ADR is marked wholly superseded without evidence. [[ADR-016]] records supersession of the old demo partition as permanent subsystem ownership, while retaining its durable principles.',kind='register',status='recorded',systems=ALL,sources=refs(('PBS',27,35,36),('PMS',4)),related=['HISTORICAL_ARCHITECTURE','REQUIREMENTS_INDEX','KNOWLEDGE_GOVERNANCE'])

moc('05_SHARED_MODEL','SHARED_MODEL_INDEX','Shared model index','Shared semantic concepts connect systems. These are domain definitions and explicit open boundaries, not a ratified physical database schema.',[(n,t) for n,t,*_ in shared])
moc('06_WORKFLOWS','WORKFLOWS_INDEX','Workflows index','Intended engineering/project flows with ownership, exceptions and completion evidence. Proposed/future workflows are labelled in their notes.',[(Path(p).stem,re.search(r'^# (.+)$',c,re.M)[1]) for p,c in notes.items() if p.startswith('06_WORKFLOWS/')])
moc('01_ARCHITECTURE','ARCHITECTURE_INDEX','Architecture index','Current responsibility and identity choices, proposed contracts, explicit questions and preserved historical evolution.',[(Path(p).stem,re.search(r'^# (.+)$',c,re.M)[1]) for p,c in notes.items() if p.startswith('01_ARCHITECTURE/')])

glossary=[('IDS','Integrated Digital Solutions; broader operational philosophy','IDS_CONTEXT'),('Evenstar','IDS initiative applying structured project knowledge to industrial engineering','EVENSTAR_VISION'),('PBS','Plant Build System; canonical plant definition','PBS_HOME'),('PSS','Plant Simulation System; computation and evidence','PSS_HOME'),('PMS','Project Management System; controlled delivery','PMS_HOME'),('Canonical object','Stable engineering identity with multiple representations','CANONICAL_ENGINEERING_OBJECT'),('UUID','Stable technical identifier, distinct from human labels','CANONICAL_IDENTITY'),('KKS / tag','Human engineering identifiers; exact coding representation open','PBS_KKS'),('P&ID','Piping and instrumentation diagram as a data-driven plant representation','PBS_PID'),('Project Data','Access/domain layer for reusable project inputs with explicit ownership','PSS_PROJECT_DATA'),('Local / Project / Linked input','Model-only value / reusable source value / explicit source association','PSS_PROJECT_DATA'),('Publication','Curated PSS output to its Engineering Register','PSS_RUNS_RESULTS'),('Promotion','Selected evidence into PMS or explicit plant design proposal; specify destination','PSS_TO_PMS_PROMOTION'),('Study override','PSS-local alternative, not a canonical design change','PSS_HYDRAULICS'),('Deliverable','Controlled project output supported by tasks and engineering evidence','PMS_DELIVERABLES'),('Revision','Versioned controlled history, with domain-specific semantics','REVISION'),('ADR','Architecture Decision Record, separate from proposals/questions','ADR_INDEX'),('MOC','Map of Content: curated navigation note','EVENSTAR_HOME'),('BOM / MTO','Bill of materials / material take-off; detailed rules unselected','PBS_ENGINEERING_DATA'),('PFD','Process flow diagram; related plant/process representation','PBS_PID'),('EOS','Equation of state; method/package choice remains explicit','PSS_THERMODYNAMICS_LAB'),('VLE / LLE','Vapor–liquid / liquid–liquid equilibrium, where supported','PSS_THERMODYNAMICS_LAB'),('PID controller','Proportional–integral–derivative control, distinct from P&ID','PSS_CONTROLS_DYNAMICS'),('RFI','Request for information in project delivery','PMS_DATA_MODEL'),('WBS','Work breakdown structure; delivery grouping is not automatically plant hierarchy','SYSTEM')]
note('00_HOME','GLOSSARY','Glossary',table(['Term','Meaning in Evenstar','Explore'],[(a,b,link(c)) for a,b,c in glossary]),kind='glossary',status='recorded',systems=ALL,sources=refs(('PBS',6,7,14),('PSS',4,6,12),('PMS',6,7,9)),related=['SHARED_MODEL_INDEX'])

moc('00_HOME','EVENSTAR_HOME','Evenstar', '''**Define the plant once. Reuse its knowledge to calculate behavior and deliver controlled engineering work.** Evenstar is an IDS engineering initiative.

```mermaid
flowchart TB
  IDS[IDS — Integrated Digital Solutions] --> EV[Evenstar]
  EV --> PBS[PBS — defines the plant]
  EV --> PSS[PSS — computes behavior]
  EV --> PMS[PMS — delivers the project]
  PBS -->|Canonical identity and topology| PSS
  PBS -->|Engineering references| PMS
  PSS -->|Selected evidence| PMS
  PSS -->|Explicit design proposals| PBS
```

**Governing principles:** one engineering object, many representations; create once and reuse; start from Project; the project knows what it already knows; one explicit authoritative owner per datum.

**Current development state:** knowledge base initialized; product implementation is unverified from the supplied evidence. **Current priority:** review this project brain, then resolve the shared object/topology/ownership/revision contract for a narrow proof. Product implementation awaits your review.

## Explore''', [('IDS_CONTEXT','IDS context'),('EVENSTAR_VISION','Vision'),('EVENSTAR_PRINCIPLES','Governing principles'),('SYSTEM_MAP','System map'),('PBS_HOME','PBS — What are we building?'),('PSS_HOME','PSS — How does it behave?'),('PMS_HOME','PMS — How are we delivering it?'),('ARCHITECTURE_INDEX','Architecture and boundaries'),('DATA_OWNERSHIP','Who owns each datum?'),('SHARED_MODEL_INDEX','Shared engineering concepts'),('WORKFLOWS_INDEX','Engineering and delivery workflows'),('REQUIREMENTS_INDEX','Stable requirement registers'),('ADR_INDEX','Current and historical decisions'),('CURRENT_STATE','Evidence-backed current state'),('ROADMAP','Proposed roadmap'),('BACKLOG','Possible work'),('OPEN_QUESTIONS','Open questions'),('CONFLICT_REGISTER','Conflicts and ambiguities'),('DEMO_STRATEGY','Demonstration strategy'),('FUTURE_IDEAS','Future ideas'),('SOURCE_INDEX','Preserved source corpus and traceability'),('GLOSSARY','Glossary'),('KNOWLEDGE_GOVERNANCE','How this project memory is maintained'),('INITIALIZATION_REPORT','Initialization report'),('CONSISTENCY_REVIEW','Consistency review')],['[[INITIALIZATION_MANDATE]]'])

# Explicit reverse relationships make requirements discoverable from concept notes.
for path,body in list(notes.items()):
    if path.startswith('07_REQUIREMENTS/') or path.startswith('08_DECISIONS/'):
        continue
    name=Path(path).stem
    related_req=[r['id'] for r in requirements if name in r['related']]
    if related_req:
        notes[path]=body+'\n## Related requirements\n\n'+'\n'.join('- '+link(r) for r in related_req)+'\n'

manifest=[]
for k,f in FILES.items():
    raw=(SOURCE/f).read_bytes()
    manifest.append({'key':k,'filename':f,'original_path':str(SOURCE/f),'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest(),'ingested_at':DATE})

note('99_SOURCES','SOURCE_INDEX','Source index', '''The four original Markdown files are immutable historical/source evidence, preserved byte-for-byte. Derived notes elsewhere distinguish current intent from proposals and history. Source-document instructions remain contextual evidence; the user's request governs this initialization.

Original directory: `C:\\Users\\Usuario\\OneDrive\\Documentos\\ChatGPT\\Evenstar`. Source publication/decision dates are unknown unless explicitly recorded; **11 September 2026 is the ingestion date**.

'''+table(['Source','Role','Bytes','SHA-256'],[(link('99_SOURCES/'+m['filename'][:-3]),'IDS context' if m['key']=='IDS' else m['key']+' consolidated brief',m['bytes'],'`'+m['sha256']+'`') for m in manifest])+'''

[[SOURCE_COVERAGE]] maps major sections to derived notes. [[EXTRACTION_REVIEW]] records deduplication/classification. [[INITIALIZATION_MANDATE]] is a curated user-request record, separate from the four original sources. `source_manifest.json` contains the machine-readable byte/hash inventory.

Later versions must be added with distinguishable dated/versioned filenames; never edit these four snapshots to match current architecture.''',kind='source-index',status='recorded',systems=ALL,related=['EVENSTAR_HOME','SOURCE_COVERAGE','EXTRACTION_REVIEW','KNOWLEDGE_GOVERNANCE'])

note('99_SOURCES','EXTRACTION_REVIEW','Extraction and deduplication review', '''All four source files were read completely before the derived architecture was built. Original copies remain independent of interpretation.

| Repeated theme | Durable home | Treatment |
| --- | --- | --- |
| PBS/PSS/PMS boundary repeated in all briefs | SYSTEM_BOUNDARIES / ADR-001 | One current boundary, system notes link back |
| UUID and KKS distinction | CANONICAL_IDENTITY / PBS_KKS | Stable technical identity separated from human labels |
| Ownership lists | DATA_OWNERSHIP | Consolidated owner table with unresolved field overlaps |
| One object and cross-navigation | CANONICAL_ENGINEERING_OBJECT | Shared concept, not repeated equipment definitions |
| Start from Project and explicit exchange | PSS_PROJECT_DATA | Local/project/linked and action semantics kept together |
| Hydraulic reuse and overrides | PBS_TO_PSS_HYDRAULICS | One cross-system workflow, linked from both systems |
| PSS selected evidence | PSS_TO_PMS_PROMOTION | Distinguished from PSS register publication |
| Project/base provisioning | PROJECT_CREATION / OQ-010 | Shared identity accepted, mechanics unresolved |
| Revisions/reviews | REVISION / OQ-005 / OQ-015 | Domain-specific histories preserved, no universal revision assumed |
| Technology lists | TECHNOLOGY_REGISTER | Initial commitments separated from candidates |
| Source role instructions | KNOWLEDGE_GOVERNANCE | Curated maintenance context; no product execution authorization |

Accepted records follow explicit settled wording, must/shall behaviors and guardrails. Suggested table lists, tools, lifecycle details and demo sequences remain proposed. Future capabilities are marked future. Exact source headings appear in derived note links and [[SOURCE_COVERAGE]].

Missing evidence includes original historical ADR texts/dates, repositories/deployments, actual Airtable schemas, implementation/test status, named owners, budget/timeline, detailed contracts and validated seed/calculation data. See [[CURRENT_STATE]] and [[OPEN_QUESTIONS]].''',kind='review',status='recorded',systems=ALL,sources=refs(('PBS',35,36,41),('PSS',20),('PMS',29))+['[[INITIALIZATION_MANDATE]]'],related=['CONFLICT_REGISTER','SOURCE_INDEX','REQUIREMENTS_INDEX','ADR_INDEX'])

covbody='Major source sections map to derived concepts/registries. Child headings are covered by their numbered/major parent section; original details remain available in the intact source. This is section coverage, not a claim that every sentence became a requirement.\n'
coverage_missing=[]
for key,f in FILES.items():
    text=(SOURCE/f).read_text(encoding='utf-8-sig')
    if key=='IDS':
        heads=re.findall(r'^# (.+)$',text,re.M)[1:]
    else:
        heads=re.findall(r'^#{1,2} (\d+\. .+)$',text,re.M)
    rows=[]
    for h in heads:
        targets=sorted(set(coverage[key].get(h,[])))
        if not targets: coverage_missing.append((key,h))
        rows.append((h,', '.join(link(t) for t in targets[:8]) + (f' (+{len(targets)-8} additional backlinks)' if len(targets)>8 else '')))
    covbody+='\n## '+key+'\n\n'+table(['Original major section','Derived homes'],rows)+'\n'
note('99_SOURCES','SOURCE_COVERAGE','Source section coverage',covbody,kind='review',status='recorded',systems=ALL,related=['SOURCE_INDEX','EXTRACTION_REVIEW'])

counts={'requirements':len(requirements),'accepted_requirements':sum(r['status']=='accepted' for r in requirements),'proposed_requirements':sum(r['status']=='proposed' for r in requirements),'current_adrs':len(decisions),'historical_adrs':len(history),'open_questions':len(questions)}
note('00_HOME','INITIALIZATION_REPORT','EVENSTAR KNOWLEDGE BASE — INITIALIZATION REPORT', f'''## Vault structure

The supplied Evenstar directory is the vault root; no extra nested EVENSTAR folder is needed. Navigation begins at [[EVENSTAR_HOME]]. Areas: `00_HOME`, `01_ARCHITECTURE`, `02_PBS`, `03_PSS`, `04_PMS`, `05_SHARED_MODEL`, `06_WORKFLOWS`, `07_REQUIREMENTS`, `08_DECISIONS`, `09_ROADMAP`, `10_DEMOS`, `11_FUTURE`, `99_SOURCES`.

Each system has a MOC. Requirements have one canonical register per namespace and individual stable-ID notes. Questions have one durable home with system-facing indexes. Filenames are unique, avoiding ambiguous duplicate requirements notes. Sources remain intact. No Obsidian plugin is required; built-in backlinks, wikilinks, properties and Mermaid support navigation.

## Key principles extracted

One engineering object, many representations; create engineering information once and reuse it everywhere; start from Project, not from scratch; the project knows what it already knows; PBS defines the plant/PSS computes behavior/PMS delivers the project; explicit authoritative ownership; open-source-first; human engineering control; compute at solver resolution and publish at engineering resolution. See [[EVENSTAR_PRINCIPLES]].

## Accepted decisions

{counts['current_adrs']} current accepted ADRs capture subsystem boundaries, stable UUIDs, tags as attributes, shared representations, ownership, initial canonical Supabase/PostgreSQL backbone, separate bases, per-project PSS register, no silent PBS mutation, hydraulic topology reuse, explicit proposals, deliverable-centered PMS, selected evidence, open core, explicit Project Data/reproducible runs and historical scope evolution. {counts['historical_adrs']} historical accepted-decision summaries are preserved separately. See [[ADR_INDEX]].

One PMS base per project remains a preferred proposal in [[OQ-011]], because its source does not conclusively settle it. Exact APIs/events, physical schemas, frontend/renderer/engine choices and provisioning are not accepted implementation decisions.

## Requirements extracted

{counts['requirements']} requirements: {counts['accepted_requirements']} accepted intended behaviors and {counts['proposed_requirements']} proposed behaviors across EV, PBS, PSS, PMS and INT. Each has a stable ID, source links, related concepts and acceptance criteria. All product implementation status is unverified. See [[REQUIREMENTS_INDEX]].

## Open questions

{counts['open_questions']} grouped questions preserve the source uncertainties. Highest priorities include canonical facets/ports/lines/streams, field ownership, plant revisions/change-review handoff, hydraulic extraction, input snapshots/write conflicts, provisioning, document/revision/file authority and actual implementation evidence. See [[OPEN_QUESTIONS]].

## Conflicts discovered

The current briefs agree on their core boundary. [[CONFLICT_REGISTER]] preserves one historical-scope conflict and three unresolved ownership/interface overlaps: document metadata/storage, PBS/PMS change review/application, and physical equipment metadata versus reusable PSS input fields. These are not silently decided.

## Historical architecture requiring reconciliation

The seven earlier PBS demos are preserved in [[HISTORICAL_ARCHITECTURE]]. [[ADR-016]] applies the current subsystem boundary while leaving detailed control, provisioning and review migration open. No implemented migration is claimed; original full historical ADRs were not supplied.

## Missing information

No inspected code, deployment, Airtable schema/base, validated solver result or implementation-test evidence establishes the current software state. Original historical decision dates/texts, exact domain/API/schema contracts, permission mapping, document storage, numerical reference data, named owners and delivery dates are missing. [[CURRENT_STATE]] separates this uncertainty from vision and plans.

## Recommended next architectural task

After user review, define a worked shared-model/ownership/revision contract for a pump, connected pipe network, one reproducible PSS calculation and one controlled PMS deliverable. Resolve object/port/line/stream semantics and field owners, then specify topology extraction, immutable run evidence and proposal/promotion paths. This is an architecture task; do not begin product implementation yet.

## Verification and placement

See [[CONSISTENCY_REVIEW]] for source byte/hash checks, link/anchor validation, unique IDs, metadata, Home reachability and source-section coverage. Publication to the requested vault is recorded after destination verification in that review. The initialization created project knowledge only; no product code, database, Airtable base or automation was implemented.''',kind='report',status='recorded',systems=ALL,sources=['[[INITIALIZATION_MANDATE]]'],related=['EVENSTAR_HOME','CONSISTENCY_REVIEW','SOURCE_INDEX'])

note('00_HOME','CONSISTENCY_REVIEW','Consistency review', '''## Automated checks

The delivered `99_SOURCES/validate_vault.py` validates source SHA-256/byte preservation, Markdown frontmatter, unique filenames/IDs, wikilink targets and heading anchors, Home reachability, requirement status/acceptance metadata and source-section coverage. Run it with a Python 3 runtime against the vault directory; it reads the vault and prints JSON without changing notes.

```text
python 99_SOURCES/validate_vault.py .
```

Recorded results are appended after staging and destination verification.

## Architectural review

- PBS/PSS/PMS responsibilities and domain ownership agree with the current source guardrails.
- Canonical UUIDs and human tags remain distinct; line/pipe/stream cardinalities remain unresolved.
- Explicit PSS Project Data actions and historical snapshot behavior are preserved.
- Hydraulic studies reuse PBS topology; local overrides cannot silently change PBS.
- PMS is multi-discipline/deliverable-centered and receives selected evidence, with PSS remaining calculation source.
- Initial technologies, preferred/candidate choices and future scope have distinct status labels.
- Historical decisions and demo scope remain visible; no migration completion or unknown decision date is fabricated.
- Vision/current state/roadmap/backlog/future remain separate. No product verification is claimed.
- The four sources are evidence; source role instructions were not treated as additional product-execution commands.

## Limits

Static graph and content consistency checks do not prove numerical engineering validity, deployed integrations or actual Obsidian rendering. No product implementation or runtime test was performed. Review unresolved decisions before implementation.''',kind='review',status='recorded',systems=ALL,related=['INITIALIZATION_REPORT','KNOWLEDGE_GOVERNANCE','SOURCE_INDEX'])

def write_all():
    VAULT.mkdir(parents=True,exist_ok=True)
    for p,c in notes.items():
        dst=VAULT/p
        dst.parent.mkdir(parents=True,exist_ok=True)
        dst.write_text(c,encoding='utf-8',newline='\n')
    for f in FILES.values():
        shutil.copyfile(SOURCE/f,VAULT/'99_SOURCES'/f)
    shutil.copyfile(ROOT/'validate_vault.py',VAULT/'99_SOURCES'/'validate_vault.py')
    (VAULT/'99_SOURCES'/'source_manifest.json').write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
    (ROOT/'build_summary.json').write_text(json.dumps({**counts,'derived_notes':len(notes),'original_sources':len(FILES),'coverage_missing':coverage_missing},indent=2)+'\n',encoding='utf-8')

if __name__=='__main__':
    diagram='''## Architecture in one flow

```mermaid
flowchart TB
  A[PBS physical plant] --> B[Canonical piping topology and source revision]
  B --> C[PSS hydraulic model and input snapshot]
  C --> D[Local study override]
  D --> E[Engineering result]
  E --> F[Optional design-change proposal]
  F --> G[PBS review and controlled application]
  G --> H[New plant revision if accepted and applied]
```

'''
    p='06_WORKFLOWS/PBS_TO_PSS_HYDRAULICS.md'
    notes[p]=notes[p].replace('## Flow\n',diagram+'## Flow\n',1)
    for sys in ALL:
        p={'PBS':'02_PBS','PSS':'03_PSS','PMS':'04_PMS'}[sys]+'/'+sys+'_HOME.md'
        notes[p]=notes[p].replace('aliases: []','aliases: '+json.dumps([sys,sys+' Home']),1)
    p='08_DECISIONS/ADR-016.md'
    notes[p]=notes[p].replace('supersedes: []','supersedes: []\nsupersedes_scope: "Historical seven-demo partition as permanent PBS ownership; original historical ADR principles retained"',1)
    write_all()
    print(json.dumps({**counts,'derived_notes':len(notes),'original_sources':len(FILES),'coverage_missing':coverage_missing},indent=2))
