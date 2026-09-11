create extension if not exists pgcrypto;

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  status text not null default 'design' check (status in ('draft', 'design', 'active', 'archived')),
  current_revision text not null default 'A',
  demo_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_members (
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner', 'engineer', 'reviewer', 'viewer')),
  primary key (project_id, user_id)
);

create table public.plants (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  code text not null,
  name text not null,
  created_at timestamptz not null default now(),
  unique (project_id, code)
);

create table public.systems (
  id uuid primary key default gen_random_uuid(),
  plant_id uuid not null references public.plants(id) on delete cascade,
  code text not null,
  name text not null,
  service text,
  created_at timestamptz not null default now(),
  unique (plant_id, code)
);

create table public.engineering_objects (
  id uuid primary key default gen_random_uuid(),
  system_id uuid not null references public.systems(id) on delete restrict,
  object_type text not null check (object_type in ('pump', 'vessel', 'valve', 'tank', 'pipe')),
  tag text not null,
  name text not null,
  description text,
  status text not null default 'design' check (status in ('design', 'existing', 'proposed')),
  properties jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (system_id, tag)
);

comment on column public.engineering_objects.id is 'Stable technical identity. KKS/tag is a mutable human identifier.';

create table public.ports (
  id uuid primary key default gen_random_uuid(),
  engineering_object_id uuid not null references public.engineering_objects(id) on delete cascade,
  code text not null,
  name text not null,
  direction text not null check (direction in ('inlet', 'outlet', 'bidirectional')),
  nominal_size_mm integer check (nominal_size_mm is null or nominal_size_mm > 0),
  created_at timestamptz not null default now(),
  unique (engineering_object_id, code)
);

create table public.connections (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  from_port_id uuid not null references public.ports(id) on delete restrict,
  to_port_id uuid not null references public.ports(id) on delete restrict,
  connection_type text not null default 'physical' check (connection_type in ('physical', 'control', 'signal')),
  created_at timestamptz not null default now(),
  check (from_port_id <> to_port_id),
  unique (from_port_id, to_port_id, connection_type)
);

create table public.pipe_segments (
  engineering_object_id uuid primary key references public.engineering_objects(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  from_port_id uuid not null references public.ports(id) on delete restrict,
  to_port_id uuid not null references public.ports(id) on delete restrict,
  nominal_diameter_mm integer not null check (nominal_diameter_mm > 0),
  inside_diameter_mm numeric(10,3),
  length_m numeric(12,3) not null check (length_m > 0),
  elevation_delta_m numeric(12,3) not null default 0,
  material text,
  specification text,
  check (from_port_id <> to_port_id)
);

create index engineering_objects_system_idx on public.engineering_objects(system_id);
create index engineering_objects_tag_idx on public.engineering_objects(tag);
create index ports_object_idx on public.ports(engineering_object_id);
create index connections_project_idx on public.connections(project_id);

create or replace function public.can_read_project(target_project_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.projects p
    where p.id = target_project_id
      and (
        p.demo_public
        or exists (
          select 1 from public.project_members pm
          where pm.project_id = p.id and pm.user_id = auth.uid()
        )
      )
  );
$$;

create or replace function public.can_edit_project(target_project_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.project_members pm
    where pm.project_id = target_project_id
      and pm.user_id = auth.uid()
      and pm.role in ('owner', 'engineer')
  );
$$;

alter table public.projects enable row level security;
alter table public.project_members enable row level security;
alter table public.plants enable row level security;
alter table public.systems enable row level security;
alter table public.engineering_objects enable row level security;
alter table public.ports enable row level security;
alter table public.connections enable row level security;
alter table public.pipe_segments enable row level security;

create policy "read visible projects" on public.projects for select using (public.can_read_project(id));
create policy "members read own membership" on public.project_members for select using (user_id = auth.uid());
create policy "read visible plants" on public.plants for select using (public.can_read_project(project_id));
create policy "read visible systems" on public.systems for select using (
  exists (select 1 from public.plants p where p.id = plant_id and public.can_read_project(p.project_id))
);
create policy "read visible engineering objects" on public.engineering_objects for select using (
  exists (
    select 1 from public.systems s join public.plants p on p.id = s.plant_id
    where s.id = system_id and public.can_read_project(p.project_id)
  )
);
create policy "read visible ports" on public.ports for select using (
  exists (
    select 1 from public.engineering_objects eo
    join public.systems s on s.id = eo.system_id
    join public.plants p on p.id = s.plant_id
    where eo.id = engineering_object_id and public.can_read_project(p.project_id)
  )
);
create policy "read visible connections" on public.connections for select using (public.can_read_project(project_id));
create policy "read visible pipe segments" on public.pipe_segments for select using (public.can_read_project(project_id));

create policy "edit owned projects" on public.projects for update using (public.can_edit_project(id)) with check (public.can_edit_project(id));
create policy "edit project plants" on public.plants for all using (public.can_edit_project(project_id)) with check (public.can_edit_project(project_id));
create policy "edit project systems" on public.systems for all using (
  exists (select 1 from public.plants p where p.id = plant_id and public.can_edit_project(p.project_id))
) with check (
  exists (select 1 from public.plants p where p.id = plant_id and public.can_edit_project(p.project_id))
);
create policy "edit project engineering objects" on public.engineering_objects for all using (
  exists (
    select 1 from public.systems s join public.plants p on p.id = s.plant_id
    where s.id = system_id and public.can_edit_project(p.project_id)
  )
) with check (
  exists (
    select 1 from public.systems s join public.plants p on p.id = s.plant_id
    where s.id = system_id and public.can_edit_project(p.project_id)
  )
);
create policy "edit project ports" on public.ports for all using (
  exists (
    select 1 from public.engineering_objects eo
    join public.systems s on s.id = eo.system_id
    join public.plants p on p.id = s.plant_id
    where eo.id = engineering_object_id and public.can_edit_project(p.project_id)
  )
) with check (
  exists (
    select 1 from public.engineering_objects eo
    join public.systems s on s.id = eo.system_id
    join public.plants p on p.id = s.plant_id
    where eo.id = engineering_object_id and public.can_edit_project(p.project_id)
  )
);
create policy "edit project connections" on public.connections for all using (public.can_edit_project(project_id)) with check (public.can_edit_project(project_id));
create policy "edit project pipe segments" on public.pipe_segments for all using (public.can_edit_project(project_id)) with check (public.can_edit_project(project_id));

grant select on public.projects, public.plants, public.systems, public.engineering_objects, public.ports, public.connections, public.pipe_segments to anon, authenticated;
grant select on public.project_members to authenticated;
grant update on public.projects to authenticated;
grant insert, update, delete on public.plants, public.systems, public.engineering_objects, public.ports, public.connections, public.pipe_segments to authenticated;
