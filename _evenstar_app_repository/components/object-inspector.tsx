"use client";

import { useState, type ReactNode } from "react";
import { Check, Copy, PanelRight } from "lucide-react";
import type { EngineeringObject, ProjectSnapshot } from "@/lib/domain";
import { typeLabel } from "@/lib/domain";
import { compactId, dn, neighborsOf, objectsOnPipe, pipeById } from "@/lib/graph";

const laterRepresentations = [
  { id: "pid", label: "P&ID" },
  { id: "plant3d", label: "Plant 3D" },
  { id: "pss", label: "PSS calculation" },
  { id: "pms", label: "PMS deliverable" },
];

export function ObjectInspector({
  project,
  selected,
  onSelect,
}: {
  project: ProjectSnapshot;
  selected: EngineeringObject;
  onSelect: (id: string) => void;
}) {
  const neighbors = neighborsOf(project, selected.id);
  const segment = pipeById(project, selected.id);
  const endpointIds = new Set(neighbors.map((item) => item.otherObject.id));
  const inline = selected.objectType === "pipe"
    ? objectsOnPipe(project, selected.id).filter((item) => !endpointIds.has(item.id))
    : [];

  return (
    <aside className="flex h-full min-h-0 flex-col border-t border-[#273b45] bg-[#0f1c24] xl:border-l xl:border-t-0">
      <div className="flex items-center justify-between border-b border-[#273b45] px-5 py-4">
        <div className="flex items-center gap-2">
          <PanelRight size={16} className="text-[#35d0ba]" />
          <h2 className="text-sm font-semibold">Object inspector</h2>
        </div>
        <span className="rounded bg-[#1d333c] px-2 py-1 text-[10px] uppercase tracking-wider text-[#83a0aa]">Canonical</span>
      </div>
      <div className="scrollbar min-h-0 flex-1 overflow-y-auto px-5 py-5">
        <div className="mb-6 border-b border-[#273b45] pb-5">
          <div className="font-mono text-xs font-semibold tracking-[.04em] text-[#35d0ba]">{selected.tag}</div>
          <h3 className="mt-1 text-xl font-semibold">{selected.name}</h3>
          <p className="mt-2 text-sm leading-6 text-[#91a6ae]">{selected.description}</p>
        </div>

        <section className="mb-6">
          <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[.15em] text-[#708993]">Identity</h4>
          <dl className="space-y-3 text-sm">
            <Row term="UUID">
              <CopyValue value={selected.id} display={compactId(selected.id)} />
            </Row>
            <Row term="Tag / KKS">{selected.tag}</Row>
            <Row term="Object type">{typeLabel[selected.objectType]}</Row>
            <Row term="System">{selected.systemCode} · {selected.systemName}</Row>
            <Row term="Status"><span className="capitalize">{selected.status}</span></Row>
            <Row term="Revision">{project.revision}</Row>
          </dl>
          <p className="mt-3 text-[11px] leading-5 text-[#6f8791]">The UUID is technical identity. The tag is a human identifier and may change under revision.</p>
        </section>

        <section className="mb-6">
          <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[.15em] text-[#708993]">Engineering data</h4>
          {segment ? (
            <dl className="space-y-3 text-sm">
              <Row term="Nominal">{dn(segment.nominalDiameterMm)}</Row>
              <Row term="Inside Ø">{segment.insideDiameterMm ? `${segment.insideDiameterMm} mm` : "—"}</Row>
              <Row term="Length">{segment.lengthM} m</Row>
              <Row term="Δ elevation">{segment.elevationDeltaM >= 0 ? "+" : ""}{segment.elevationDeltaM} m</Row>
              <Row term="Material">{segment.material ?? "—"}</Row>
              <Row term="Spec">{segment.specification ?? "—"}</Row>
            </dl>
          ) : (
            <dl className="space-y-3 text-sm">
              {Object.entries(selected.properties).map(([term, detail]) => (
                <Row key={term} term={term}>{detail}</Row>
              ))}
            </dl>
          )}
        </section>

        <section className="mb-6">
          <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[.15em] text-[#708993]">
            {selected.objectType === "pipe" ? "Endpoints" : "Ports / nozzles"}
          </h4>
          {selected.objectType === "pipe" ? (
            <div className="space-y-2">
              {neighbors.map((neighbor) => (
                <button
                  key={neighbor.connectionId}
                  onClick={() => onSelect(neighbor.otherObject.id)}
                  className="w-full rounded-lg border border-[#2a414c] bg-[#12242d] p-3 text-left hover:border-[#35d0ba66]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold">{neighbor.localPort.code} · {neighbor.otherObject.name}</span>
                    <span className="font-mono text-xs text-[#35d0ba]">{neighbor.otherObject.tag}</span>
                  </div>
                  <div className="mt-1 text-xs text-[#78909a]">
                    {neighbor.otherPort.code} · {neighbor.otherPort.name} · {neighbor.otherPort.direction} · {dn(neighbor.otherPort.nominalSizeMm)}
                  </div>
                </button>
              ))}
              {inline.length > 0 && (
                <div className="rounded-lg border border-dashed border-[#334b56] p-3">
                  <div className="mb-2 text-[11px] uppercase tracking-[.14em] text-[#6f8791]">Inline objects</div>
                  <div className="space-y-1">
                    {inline.map((object) => (
                      <button key={object.id} onClick={() => onSelect(object.id)} className="flex w-full items-center justify-between rounded px-1 py-1 text-left text-sm text-[#d5e2e4] hover:text-white">
                        <span>{object.name}</span>
                        <span className="font-mono text-xs text-[#35d0ba]">{object.tag}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : selected.ports.length ? (
            <div className="space-y-2">
              {selected.ports.map((port) => {
                const link = neighbors.find((item) => item.localPort.id === port.id);
                return (
                  <div key={port.id} className="rounded-lg border border-[#2a414c] bg-[#12242d] p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">{port.code} · {port.name}</span>
                      <span className="text-xs text-[#35d0ba]">{dn(port.nominalSizeMm)}</span>
                    </div>
                    <div className="mt-1 text-xs capitalize text-[#78909a]">{port.direction} · {compactId(port.id)}</div>
                    {link ? (
                      <button onClick={() => onSelect(link.otherObject.id)} className="mt-3 w-full rounded-md border border-[#314853] bg-[#0e1c24] px-3 py-2 text-left hover:border-[#35d0ba66]">
                        <div className="text-[10px] uppercase tracking-[.14em] text-[#6f8791]">Connects to</div>
                        <div className="mt-1 text-sm text-[#e8f1ef]">{link.otherObject.name} · {link.otherPort.code}</div>
                        <div className="font-mono text-[11px] text-[#35d0ba]">
                          {link.otherObject.tag}
                          {link.pipe ? ` · via ${link.pipe.tag}` : ""}
                        </div>
                      </button>
                    ) : (
                      <div className="mt-3 text-xs text-[#728b95]">No physical connection recorded.</div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-[#334b56] p-4 text-sm text-[#728b95]">No ports on this object.</div>
          )}
        </section>

        <section>
          <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[.15em] text-[#708993]">Representations</h4>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between rounded-md bg-[#173039] px-3 py-2 text-sm">
              <span>Object Explorer</span>
              <span className="text-[10px] uppercase tracking-wider text-[#35d0ba]">Here</span>
            </div>
            {laterRepresentations.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-[#6f8791]">
                <span>{item.label}</span>
                <span className="text-[10px] uppercase tracking-wider">Later</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}

function Row({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[108px_1fr] gap-3">
      <dt className="text-[#6f8791]">{term}</dt>
      <dd className="text-right font-medium">{children}</dd>
    </div>
  );
}

function CopyValue({ value, display }: { value: string; display: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="inline-flex items-center gap-1.5 font-mono text-xs text-[#d5e4e8] hover:text-white"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1200);
        } catch {
          setCopied(false);
        }
      }}
      title={value}
    >
      {display}
      {copied ? <Check size={12} className="text-[#35d0ba]" /> : <Copy size={12} className="text-[#708993]" />}
    </button>
  );
}
