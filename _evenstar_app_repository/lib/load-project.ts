import { createClient } from "@supabase/supabase-js";
import {
  fixtureProject,
  type Connection,
  type ConnectionType,
  type EngineeringObject,
  type ObjectStatus,
  type ObjectType,
  type PipeSegment,
  type PlantSystem,
  type PortDirection,
  type ProjectSnapshot,
} from "./domain";

function asFixture(note: ProjectSnapshot["loadNote"], error?: string): ProjectSnapshot {
  return { ...fixtureProject, source: "fixture", loadNote: note, loadError: error };
}

export async function loadSeedProject(): Promise<ProjectSnapshot> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return asFixture("missing-env");

  try {
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { data: project, error } = await supabase
      .from("projects")
      .select("id, code, name, current_revision")
      .eq("code", "EV-DEMO-001")
      .single();
    if (error || !project) return asFixture("fallback-error", error?.message ?? "Demo project EV-DEMO-001 was not found.");

    const { data: plant, error: plantError } = await supabase
      .from("plants")
      .select("id, code, name")
      .eq("project_id", project.id)
      .single();
    if (plantError || !plant) return asFixture("fallback-error", plantError?.message ?? "Plant row missing.");

    const { data: systemRows } = await supabase.from("systems").select("id, code, name, service").eq("plant_id", plant.id);
    const systems: PlantSystem[] = (systemRows ?? []).map((item) => ({
      id: item.id,
      code: item.code,
      name: item.name,
      service: item.service,
    }));
    const systemIds = systems.map((item) => item.id);
    const { data: objectRows } = systemIds.length
      ? await supabase.from("engineering_objects").select("*").in("system_id", systemIds)
      : { data: [] };
    const objectIds = (objectRows ?? []).map((item) => item.id);
    const { data: portRows } = objectIds.length
      ? await supabase.from("ports").select("*").in("engineering_object_id", objectIds)
      : { data: [] };
    const { data: connectionRows } = await supabase
      .from("connections")
      .select("id, from_port_id, to_port_id, connection_type")
      .eq("project_id", project.id);
    const { data: pipeRows } = await supabase
      .from("pipe_segments")
      .select("*")
      .eq("project_id", project.id);

    const systemById = new Map(systems.map((item) => [item.id, item]));
    const objects: EngineeringObject[] = (objectRows ?? []).map((item) => {
      const system = systemById.get(item.system_id);
      return {
        id: item.id,
        tag: item.tag,
        name: item.name,
        objectType: item.object_type as ObjectType,
        status: item.status as ObjectStatus,
        systemId: item.system_id,
        systemCode: system?.code ?? "—",
        systemName: system?.name ?? "Unknown system",
        description: item.description ?? "",
        ports: (portRows ?? [])
          .filter((port) => port.engineering_object_id === item.id)
          .map((port) => ({
            id: port.id,
            code: port.code,
            name: port.name,
            direction: port.direction as PortDirection,
            nominalSizeMm: port.nominal_size_mm,
          })),
        properties: (item.properties ?? {}) as Record<string, string>,
      };
    });

    const connections: Connection[] = (connectionRows ?? []).map((item) => ({
      id: item.id,
      fromPortId: item.from_port_id,
      toPortId: item.to_port_id,
      connectionType: item.connection_type as ConnectionType,
    }));

    const pipeSegments: PipeSegment[] = (pipeRows ?? []).map((item) => ({
      objectId: item.engineering_object_id,
      fromPortId: item.from_port_id,
      toPortId: item.to_port_id,
      nominalDiameterMm: item.nominal_diameter_mm,
      insideDiameterMm: item.inside_diameter_mm,
      lengthM: Number(item.length_m),
      elevationDeltaM: Number(item.elevation_delta_m),
      material: item.material,
      specification: item.specification,
    }));

    return {
      id: project.id,
      code: project.code,
      name: project.name,
      plantId: plant.id,
      plantCode: plant.code,
      plantName: plant.name,
      revision: project.current_revision,
      source: "supabase",
      loadNote: "live",
      systems,
      objects,
      connections,
      pipeSegments,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Supabase request failed.";
    return asFixture("fallback-error", message);
  }
}
