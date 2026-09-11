# First slice — PBS Object Explorer

## Outcome

An engineer opens one Evenstar project and immediately sees its plant hierarchy, canonical objects, physical network and object inspector. Selecting a pump, vessel, valve, tank or line resolves one stable technical identity everywhere in the interface. Selecting a nozzle shows the connected object, port and pipe.

## Included

- One project, plant and system.
- Four equipment objects and two physical pipe objects.
- Stable UUIDs, human engineering tags, typed ports, physical connections and pipe segments.
- Searchable object register and data-driven topology view.
- Object properties, port inspection and connectivity.
- Keyboard search and selection.
- Supabase PostgreSQL migration, RLS policies and deterministic seed data.
- Local fixture fallback so the UI works before cloud configuration.

## Boundary

PBS owns the plant objects, physical topology and design properties. This slice does not implement P&ID editing, 3D, hydraulics, simulation results, PMS delivery records or cross-system writes.

## Acceptance checks

1. The transfer pump resolves the same UUID in hierarchy, topology, register and inspector.
2. A tag is displayed as a human identifier and is not used as the database primary key.
3. Ports have their own stable identity, direction and nominal size.
4. The inspector names the connected object and port for each nozzle (and the pipe that carries the connection).
5. Topology is laid out from `connections`, not from hardcoded array indexes.
6. The database can be rebuilt from migration and seed files.
7. RLS permits public read only for explicitly marked demo projects; write paths require project membership.
8. Without Supabase environment variables, the interface visibly reports local fixture mode and remains usable.
9. If Supabase is configured but unreadable, the interface reports the failure and still shows the fixture.

## Next slices

1. Connect the remote Supabase development project and verify the live seed.
2. Add authentication and project membership management.
3. Add editable object/port creation with revision history.
4. Add data-driven P&ID representation using the same object IDs.
5. Add Plant 3D representation using the same object IDs.
