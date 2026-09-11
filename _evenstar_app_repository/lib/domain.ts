export type PortDirection = "inlet" | "outlet" | "bidirectional";
export type ObjectType = "pump" | "vessel" | "valve" | "tank" | "pipe";
export type ObjectStatus = "design" | "existing" | "proposed";
export type ConnectionType = "physical" | "control" | "signal";
export type DataSource = "supabase" | "fixture";
export type LoadNote = "live" | "missing-env" | "fallback-error";

export type Port = {
  id: string;
  code: string;
  name: string;
  direction: PortDirection;
  nominalSizeMm: number | null;
};

export type EngineeringObject = {
  id: string;
  tag: string;
  name: string;
  objectType: ObjectType;
  status: ObjectStatus;
  systemId: string;
  systemCode: string;
  systemName: string;
  description: string;
  ports: Port[];
  properties: Record<string, string>;
};

export type PlantSystem = {
  id: string;
  code: string;
  name: string;
  service: string | null;
};

export type Connection = {
  id: string;
  fromPortId: string;
  toPortId: string;
  connectionType: ConnectionType;
};

export type PipeSegment = {
  objectId: string;
  fromPortId: string;
  toPortId: string;
  nominalDiameterMm: number;
  insideDiameterMm: number | null;
  lengthM: number;
  elevationDeltaM: number;
  material: string | null;
  specification: string | null;
};

export type ProjectSnapshot = {
  id: string;
  code: string;
  name: string;
  plantId: string;
  plantCode: string;
  plantName: string;
  revision: string;
  source: DataSource;
  loadNote: LoadNote;
  loadError?: string;
  systems: PlantSystem[];
  objects: EngineeringObject[];
  connections: Connection[];
  pipeSegments: PipeSegment[];
};

export const IDS = {
  project: "10000000-0000-4000-8000-000000000001",
  plant: "20000000-0000-4000-8000-000000000001",
  system: "20000000-0000-4000-8000-000000000002",
  vessel: "30000000-0000-4000-8000-000000000001",
  pump: "30000000-0000-4000-8000-000000000002",
  valve: "30000000-0000-4000-8000-000000000003",
  tank: "30000000-0000-4000-8000-000000000004",
  suction: "30000000-0000-4000-8000-000000000005",
  discharge: "30000000-0000-4000-8000-000000000006",
  vesselN1: "40000000-0000-4000-8000-000000000001",
  pumpSuc: "40000000-0000-4000-8000-000000000002",
  pumpDis: "40000000-0000-4000-8000-000000000003",
  valveIn: "40000000-0000-4000-8000-000000000004",
  valveOut: "40000000-0000-4000-8000-000000000005",
  tankN1: "40000000-0000-4000-8000-000000000006",
  connSuction: "50000000-0000-4000-8000-000000000001",
  connPumpValve: "50000000-0000-4000-8000-000000000002",
  connValveTank: "50000000-0000-4000-8000-000000000003",
} as const;

const waterTransfer: PlantSystem = {
  id: IDS.system,
  code: "10LAC",
  name: "Water Transfer",
  service: "Process water transfer",
};

export const fixtureProject: ProjectSnapshot = {
  id: IDS.project,
  code: "EV-DEMO-001",
  name: "Evenstar Reference Skid",
  plantId: IDS.plant,
  plantCode: "WTD-01",
  plantName: "Water Transfer Demonstrator",
  revision: "A",
  source: "fixture",
  loadNote: "missing-env",
  systems: [waterTransfer],
  objects: [
    {
      id: IDS.vessel,
      tag: "10LAB10BB001",
      name: "Feed Vessel",
      objectType: "vessel",
      status: "design",
      systemId: IDS.system,
      systemCode: "10LAC",
      systemName: "Water Transfer",
      description: "Atmospheric source vessel for the reference transfer loop.",
      ports: [{ id: IDS.vesselN1, code: "N1", name: "Liquid outlet", direction: "outlet", nominalSizeMm: 100 }],
      properties: { "Design pressure": "0.5 barg", "Design temperature": "60 °C" },
    },
    {
      id: IDS.pump,
      tag: "10LAC10AP001",
      name: "Transfer Pump",
      objectType: "pump",
      status: "design",
      systemId: IDS.system,
      systemCode: "10LAC",
      systemName: "Water Transfer",
      description: "Centrifugal pump transferring process water to the receiving tank.",
      ports: [
        { id: IDS.pumpSuc, code: "SUC", name: "Suction", direction: "inlet", nominalSizeMm: 100 },
        { id: IDS.pumpDis, code: "DIS", name: "Discharge", direction: "outlet", nominalSizeMm: 80 },
      ],
      properties: { "Rated flow": "120 m³/h", "Differential head": "42 m", Driver: "30 kW" },
    },
    {
      id: IDS.valve,
      tag: "10LAC10AA001",
      name: "Discharge Isolation Valve",
      objectType: "valve",
      status: "design",
      systemId: IDS.system,
      systemCode: "10LAC",
      systemName: "Water Transfer",
      description: "Manual isolation valve on the pump discharge line.",
      ports: [
        { id: IDS.valveIn, code: "IN", name: "Inlet", direction: "inlet", nominalSizeMm: 80 },
        { id: IDS.valveOut, code: "OUT", name: "Outlet", direction: "outlet", nominalSizeMm: 80 },
      ],
      properties: { Type: "Gate valve", Rating: "PN16", Position: "Normally open" },
    },
    {
      id: IDS.tank,
      tag: "10LAC10BB002",
      name: "Receiving Tank",
      objectType: "tank",
      status: "design",
      systemId: IDS.system,
      systemCode: "10LAC",
      systemName: "Water Transfer",
      description: "Receiving tank at the elevated boundary of the reference network.",
      ports: [{ id: IDS.tankN1, code: "N1", name: "Liquid inlet", direction: "inlet", nominalSizeMm: 80 }],
      properties: { "Operating pressure": "Atmospheric", "Inlet elevation": "+12.0 m" },
    },
    {
      id: IDS.suction,
      tag: "10LAC10BR001",
      name: "Pump Suction Line",
      objectType: "pipe",
      status: "design",
      systemId: IDS.system,
      systemCode: "10LAC",
      systemName: "Water Transfer",
      description: "Physical pipe segment connecting the feed vessel to the pump suction.",
      ports: [],
      properties: { Diameter: "DN100", Length: "8.5 m", Material: "Carbon steel", Elevation: "−0.4 m" },
    },
    {
      id: IDS.discharge,
      tag: "10LAC10BR002",
      name: "Pump Discharge Line",
      objectType: "pipe",
      status: "design",
      systemId: IDS.system,
      systemCode: "10LAC",
      systemName: "Water Transfer",
      description: "Physical pipe segment from the pump through isolation to the receiving tank.",
      ports: [],
      properties: { Diameter: "DN80", Length: "44.0 m", Material: "Carbon steel", Elevation: "+12.4 m" },
    },
  ],
  connections: [
    { id: IDS.connSuction, fromPortId: IDS.vesselN1, toPortId: IDS.pumpSuc, connectionType: "physical" },
    { id: IDS.connPumpValve, fromPortId: IDS.pumpDis, toPortId: IDS.valveIn, connectionType: "physical" },
    { id: IDS.connValveTank, fromPortId: IDS.valveOut, toPortId: IDS.tankN1, connectionType: "physical" },
  ],
  pipeSegments: [
    {
      objectId: IDS.suction,
      fromPortId: IDS.vesselN1,
      toPortId: IDS.pumpSuc,
      nominalDiameterMm: 100,
      insideDiameterMm: 102.3,
      lengthM: 8.5,
      elevationDeltaM: -0.4,
      material: "Carbon steel",
      specification: "CS-PN16",
    },
    {
      objectId: IDS.discharge,
      fromPortId: IDS.pumpDis,
      toPortId: IDS.tankN1,
      nominalDiameterMm: 80,
      insideDiameterMm: 77.9,
      lengthM: 44.0,
      elevationDeltaM: 12.4,
      material: "Carbon steel",
      specification: "CS-PN16",
    },
  ],
};

export const typeLabel: Record<ObjectType, string> = {
  pump: "Centrifugal pump",
  vessel: "Vessel",
  valve: "Isolation valve",
  tank: "Storage tank",
  pipe: "Physical pipe",
};
