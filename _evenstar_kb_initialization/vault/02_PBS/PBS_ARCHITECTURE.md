---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS"]
aliases: []
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#4. Core Ownership|PBS — 4. Core Ownership]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#7. Core Entities|PBS — 7. Core Entities]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#16. Supabase / PostgreSQL|PBS — 16. Supabase / PostgreSQL]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#17. Object Storage|PBS — 17. Object Storage]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#22. Relationship to PSS|PBS — 22. Relationship to PSS]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#23. Relationship to PMS|PBS — 23. Relationship to PMS]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#27. Historical Demo Strategy|PBS — 27. Historical Demo Strategy]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#28. Initial Technical Direction|PBS — 28. Initial Technical Direction]]"]
---

# PBS architecture

PBS combines one canonical plant model with specialized P&ID, 3D, engineering-data and explorer interfaces. Relationships are first-class data; renderer meshes and diagram symbols resolve canonical objects.

Supabase/PostgreSQL is the initial shared PBS collaboration/data backbone. Physical geometry, topology and engineering metadata remain connected through UUIDs. Object storage can carry associated assets while metadata remains related to the plant.

Calculation belongs in PSS and delivery workflow in PMS. The historical Process/Control/Project/Workflow demos must not be revived as permanent PBS ownership boundaries. Exact schemas, runtime choices and collaboration mechanics remain open.

## Related notes

- [[PBS_HOME]]
- [[PBS_DATA_MODEL]]
- [[HISTORICAL_ARCHITECTURE]]
- [[TECHNOLOGY_REGISTER]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#4. Core Ownership|PBS — 4. Core Ownership]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#7. Core Entities|PBS — 7. Core Entities]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#16. Supabase / PostgreSQL|PBS — 16. Supabase / PostgreSQL]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#17. Object Storage|PBS — 17. Object Storage]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#22. Relationship to PSS|PBS — 22. Relationship to PSS]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#23. Relationship to PMS|PBS — 23. Relationship to PMS]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#27. Historical Demo Strategy|PBS — 27. Historical Demo Strategy]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#28. Initial Technical Direction|PBS — 28. Initial Technical Direction]]
