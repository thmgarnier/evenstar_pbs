import type {
  Connection,
  EngineeringObject,
  PipeSegment,
  Port,
  ProjectSnapshot,
} from "./domain";

export type PortRef = {
  port: Port;
  object: EngineeringObject;
};

export type Neighbor = {
  connectionId: string;
  localPort: Port;
  otherObject: EngineeringObject;
  otherPort: Port;
  pipe?: EngineeringObject;
};

export type LayoutNode = {
  object: EngineeringObject;
  x: number;
  y: number;
};

export type LayoutEdge = {
  connection: Connection;
  from: LayoutNode;
  to: LayoutNode;
  pipe?: EngineeringObject;
  segment?: PipeSegment;
};

export const CANVAS = { width: 1120, height: 400, nodeWidth: 156, nodeHeight: 86 };

export function compactId(id: string) {
  return `${id.slice(0, 8)}…${id.slice(-4)}`;
}

export function dn(mm: number | null | undefined) {
  return mm ? `DN${mm}` : "—";
}

export function objectById(project: ProjectSnapshot, id: string) {
  return project.objects.find((item) => item.id === id);
}

export function portIndex(project: ProjectSnapshot) {
  const index = new Map<string, PortRef>();
  for (const object of project.objects) {
    for (const port of object.ports) {
      index.set(port.id, { port, object });
    }
  }
  return index;
}

export function pipeById(project: ProjectSnapshot, objectId: string) {
  return project.pipeSegments.find((item) => item.objectId === objectId);
}

export function matchesQuery(object: EngineeringObject, query: string) {
  const term = query.trim().toLowerCase();
  if (!term) return true;
  const haystack = [
    object.tag,
    object.name,
    object.objectType,
    object.systemCode,
    object.systemName,
    object.id,
    object.description,
    ...object.ports.map((port) => `${port.code} ${port.name} ${port.id}`),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(term);
}

export function pipeForConnection(project: ProjectSnapshot, connection: Connection) {
  const exact = project.pipeSegments.find(
    (segment) =>
      (segment.fromPortId === connection.fromPortId && segment.toPortId === connection.toPortId) ||
      (segment.fromPortId === connection.toPortId && segment.toPortId === connection.fromPortId),
  );
  const covering =
    exact ??
    project.pipeSegments.find(
      (segment) =>
        segment.fromPortId === connection.fromPortId ||
        segment.toPortId === connection.toPortId ||
        segment.fromPortId === connection.toPortId ||
        segment.toPortId === connection.fromPortId,
    );
  return covering ? objectById(project, covering.objectId) : undefined;
}

export function neighborsOf(project: ProjectSnapshot, objectId: string): Neighbor[] {
  const object = objectById(project, objectId);
  if (!object) return [];
  const index = portIndex(project);

  if (object.objectType === "pipe") {
    const segment = pipeById(project, object.id);
    if (!segment) return [];
    const from = index.get(segment.fromPortId);
    const to = index.get(segment.toPortId);
    const synthetic: Neighbor[] = [];
    if (from) {
      synthetic.push({
        connectionId: `${object.id}:from`,
        localPort: { id: segment.fromPortId, code: "FROM", name: "Upstream port", direction: "inlet", nominalSizeMm: segment.nominalDiameterMm },
        otherObject: from.object,
        otherPort: from.port,
        pipe: object,
      });
    }
    if (to) {
      synthetic.push({
        connectionId: `${object.id}:to`,
        localPort: { id: segment.toPortId, code: "TO", name: "Downstream port", direction: "outlet", nominalSizeMm: segment.nominalDiameterMm },
        otherObject: to.object,
        otherPort: to.port,
        pipe: object,
      });
    }
    return synthetic;
  }

  const portIds = new Set(object.ports.map((port) => port.id));
  const result: Neighbor[] = [];
  for (const connection of project.connections) {
    const fromMine = portIds.has(connection.fromPortId);
    const toMine = portIds.has(connection.toPortId);
    if (fromMine === toMine) continue;
    const local = index.get(fromMine ? connection.fromPortId : connection.toPortId);
    const other = index.get(fromMine ? connection.toPortId : connection.fromPortId);
    if (!local || !other) continue;
    result.push({
      connectionId: connection.id,
      localPort: local.port,
      otherObject: other.object,
      otherPort: other.port,
      pipe: pipeForConnection(project, connection),
    });
  }
  return result;
}

export function connectedObjectIds(project: ProjectSnapshot, objectId: string) {
  const ids = new Set<string>([objectId]);
  for (const neighbor of neighborsOf(project, objectId)) {
    ids.add(neighbor.otherObject.id);
    if (neighbor.pipe) ids.add(neighbor.pipe.id);
  }
  const selected = objectById(project, objectId);
  if (selected?.objectType === "pipe") {
    for (const object of objectsOnPipe(project, objectId)) ids.add(object.id);
  }
  return ids;
}

export function objectsOnPipe(project: ProjectSnapshot, pipeId: string) {
  const segment = pipeById(project, pipeId);
  if (!segment) return [];
  const index = portIndex(project);
  const start = index.get(segment.fromPortId)?.object.id;
  const end = index.get(segment.toPortId)?.object.id;
  if (!start || !end) return [];
  return pathObjects(project, start, end);
}

function adjacency(project: ProjectSnapshot) {
  const index = portIndex(project);
  const edges = new Map<string, string[]>();
  const add = (a: string, b: string) => {
    const list = edges.get(a) ?? [];
    if (!list.includes(b)) list.push(b);
    edges.set(a, list);
  };
  for (const connection of project.connections) {
    const from = index.get(connection.fromPortId)?.object.id;
    const to = index.get(connection.toPortId)?.object.id;
    if (!from || !to || from === to) continue;
    add(from, to);
    add(to, from);
  }
  return { index, edges };
}

function pathObjects(project: ProjectSnapshot, startId: string, endId: string) {
  const { edges } = adjacency(project);
  const queue = [startId];
  const seen = new Set([startId]);
  const prev = new Map<string, string>();
  while (queue.length) {
    const current = queue.shift()!;
    if (current === endId) break;
    for (const next of edges.get(current) ?? []) {
      if (seen.has(next)) continue;
      seen.add(next);
      prev.set(next, current);
      queue.push(next);
    }
  }
  if (!seen.has(endId) && startId !== endId) {
    return [objectById(project, startId), objectById(project, endId)].filter(Boolean) as EngineeringObject[];
  }
  const ids = [endId];
  while (ids[0] !== startId) {
    const parent = prev.get(ids[0]);
    if (!parent) break;
    ids.unshift(parent);
  }
  return ids.map((id) => objectById(project, id)).filter(Boolean) as EngineeringObject[];
}

export function orderEquipment(project: ProjectSnapshot) {
  const equipment = project.objects.filter((item) => item.objectType !== "pipe");
  const { index } = adjacency(project);
  const nodes = equipment.map((item) => item.id);
  const incoming = new Map(nodes.map((id) => [id, 0]));
  const outgoing = new Map(nodes.map((id) => [id, [] as string[]]));
  for (const connection of project.connections) {
    const from = index.get(connection.fromPortId)?.object.id;
    const to = index.get(connection.toPortId)?.object.id;
    if (!from || !to || from === to || !incoming.has(to) || !outgoing.has(from)) continue;
    outgoing.get(from)!.push(to);
    incoming.set(to, (incoming.get(to) ?? 0) + 1);
  }
  const queue = nodes.filter((id) => incoming.get(id) === 0);
  const ordered: string[] = [];
  while (queue.length) {
    const id = queue.shift()!;
    ordered.push(id);
    for (const next of outgoing.get(id) ?? []) {
      incoming.set(next, (incoming.get(next) ?? 0) - 1);
      if (incoming.get(next) === 0) queue.push(next);
    }
  }
  const remaining = equipment.filter((item) => !ordered.includes(item.id));
  return [...ordered.map((id) => equipment.find((item) => item.id === id)!), ...remaining];
}

function elevationOf(project: ProjectSnapshot, object: EngineeringObject) {
  const inlet = object.properties["Inlet elevation"];
  if (inlet) {
    const value = Number.parseFloat(inlet.replace(/[^0-9.+-]/g, ""));
    if (!Number.isNaN(value)) return value;
  }
  const segment = project.pipeSegments.find((item) => portIndex(project).get(item.toPortId)?.object.id === object.id);
  return segment?.elevationDeltaM ?? 0;
}

export function layoutTopology(project: ProjectSnapshot): { nodes: LayoutNode[]; edges: LayoutEdge[] } {
  const equipment = orderEquipment(project);
  if (!equipment.length) return { nodes: [], edges: [] };
  const { width, height } = CANVAS;
  const pad = 110;
  const span = Math.max(width - pad * 2, 1);
  const nodes: LayoutNode[] = equipment.map((object, index) => {
    const t = equipment.length === 1 ? 0.5 : index / (equipment.length - 1);
    const elevation = elevationOf(project, object);
    return {
      object,
      x: pad + t * span,
      y: Math.min(height - 70, Math.max(70, 250 - elevation * 7)),
    };
  });
  const byId = new Map(nodes.map((node) => [node.object.id, node]));
  const index = portIndex(project);
  const edges: LayoutEdge[] = [];
  for (const connection of project.connections) {
    const fromObject = index.get(connection.fromPortId)?.object.id;
    const toObject = index.get(connection.toPortId)?.object.id;
    if (!fromObject || !toObject) continue;
    const from = byId.get(fromObject);
    const to = byId.get(toObject);
    if (!from || !to) continue;
    const pipe = pipeForConnection(project, connection);
    edges.push({
      connection,
      from,
      to,
      pipe,
      segment: pipe ? pipeById(project, pipe.id) : undefined,
    });
  }
  return { nodes, edges };
}

export function orthoPath(x1: number, y1: number, x2: number, y2: number) {
  const mid = (x1 + x2) / 2;
  return `M ${x1} ${y1} H ${mid} V ${y2} H ${x2}`;
}

export function counts(project: ProjectSnapshot) {
  const equipment = project.objects.filter((item) => item.objectType !== "pipe");
  const ports = project.objects.reduce((sum, item) => sum + item.ports.length, 0);
  return {
    objects: project.objects.length,
    equipment: equipment.length,
    ports,
    connections: project.connections.length,
  };
}
