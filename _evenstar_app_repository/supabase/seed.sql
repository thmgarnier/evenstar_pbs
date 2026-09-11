insert into public.projects (id, code, name, status, current_revision, demo_public)
values ('10000000-0000-4000-8000-000000000001', 'EV-DEMO-001', 'Evenstar Reference Skid', 'design', 'A', true)
on conflict (id) do update set name = excluded.name, current_revision = excluded.current_revision, demo_public = excluded.demo_public;

insert into public.plants (id, project_id, code, name)
values ('20000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', 'WTD-01', 'Water Transfer Demonstrator')
on conflict (id) do update set name = excluded.name;

insert into public.systems (id, plant_id, code, name, service)
values ('20000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000001', '10LAC', 'Water Transfer', 'Process water transfer')
on conflict (id) do update set name = excluded.name, service = excluded.service;

insert into public.engineering_objects (id, system_id, object_type, tag, name, description, status, properties) values
('30000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000002', 'vessel', '10LAB10BB001', 'Feed Vessel', 'Atmospheric source vessel for the reference transfer loop.', 'design', '{"Design pressure":"0.5 barg","Design temperature":"60 °C"}'),
('30000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000002', 'pump', '10LAC10AP001', 'Transfer Pump', 'Centrifugal pump transferring process water to the receiving tank.', 'design', '{"Rated flow":"120 m³/h","Differential head":"42 m","Driver":"30 kW"}'),
('30000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000002', 'valve', '10LAC10AA001', 'Discharge Isolation Valve', 'Manual isolation valve on the pump discharge line.', 'design', '{"Type":"Gate valve","Rating":"PN16","Position":"Normally open"}'),
('30000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000002', 'tank', '10LAC10BB002', 'Receiving Tank', 'Receiving tank at the elevated boundary of the reference network.', 'design', '{"Operating pressure":"Atmospheric","Inlet elevation":"+12.0 m"}'),
('30000000-0000-4000-8000-000000000005', '20000000-0000-4000-8000-000000000002', 'pipe', '10LAC10BR001', 'Pump Suction Line', 'Physical pipe segment connecting the feed vessel to the pump suction.', 'design', '{"Diameter":"DN100","Length":"8.5 m","Material":"Carbon steel","Elevation":"−0.4 m"}'),
('30000000-0000-4000-8000-000000000006', '20000000-0000-4000-8000-000000000002', 'pipe', '10LAC10BR002', 'Pump Discharge Line', 'Physical pipe segment from the pump through isolation to the receiving tank.', 'design', '{"Diameter":"DN80","Length":"44.0 m","Material":"Carbon steel","Elevation":"+12.4 m"}')
on conflict (id) do update set tag = excluded.tag, name = excluded.name, description = excluded.description, properties = excluded.properties;

insert into public.ports (id, engineering_object_id, code, name, direction, nominal_size_mm) values
('40000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000001', 'N1', 'Liquid outlet', 'outlet', 100),
('40000000-0000-4000-8000-000000000002', '30000000-0000-4000-8000-000000000002', 'SUC', 'Suction', 'inlet', 100),
('40000000-0000-4000-8000-000000000003', '30000000-0000-4000-8000-000000000002', 'DIS', 'Discharge', 'outlet', 80),
('40000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000003', 'IN', 'Inlet', 'inlet', 80),
('40000000-0000-4000-8000-000000000005', '30000000-0000-4000-8000-000000000003', 'OUT', 'Outlet', 'outlet', 80),
('40000000-0000-4000-8000-000000000006', '30000000-0000-4000-8000-000000000004', 'N1', 'Liquid inlet', 'inlet', 80)
on conflict (id) do update set name = excluded.name, direction = excluded.direction, nominal_size_mm = excluded.nominal_size_mm;

insert into public.connections (id, project_id, from_port_id, to_port_id, connection_type) values
('50000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', '40000000-0000-4000-8000-000000000001', '40000000-0000-4000-8000-000000000002', 'physical'),
('50000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000001', '40000000-0000-4000-8000-000000000003', '40000000-0000-4000-8000-000000000004', 'physical'),
('50000000-0000-4000-8000-000000000003', '10000000-0000-4000-8000-000000000001', '40000000-0000-4000-8000-000000000005', '40000000-0000-4000-8000-000000000006', 'physical')
on conflict (id) do nothing;

insert into public.pipe_segments (engineering_object_id, project_id, from_port_id, to_port_id, nominal_diameter_mm, inside_diameter_mm, length_m, elevation_delta_m, material, specification) values
('30000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000000001', '40000000-0000-4000-8000-000000000001', '40000000-0000-4000-8000-000000000002', 100, 102.3, 8.5, -0.4, 'Carbon steel', 'CS-PN16'),
('30000000-0000-4000-8000-000000000006', '10000000-0000-4000-8000-000000000001', '40000000-0000-4000-8000-000000000003', '40000000-0000-4000-8000-000000000006', 80, 77.9, 44.0, 12.4, 'Carbon steel', 'CS-PN16')
on conflict (engineering_object_id) do update set nominal_diameter_mm = excluded.nominal_diameter_mm, inside_diameter_mm = excluded.inside_diameter_mm, length_m = excluded.length_m, elevation_delta_m = excluded.elevation_delta_m;
