import type { InputClass } from "../lib/domain";

const classLabel: Record<InputClass, string> = {
  linked: "Linked",
  local: "Local",
  project: "Project",
};

const classTone: Record<InputClass, string> = {
  linked: "border-teal/40 text-teal",
  local: "border-amber/40 text-amber",
  project: "border-blue/40 text-blue",
};

export function ClassBadge({ cls }: { cls: InputClass }) {
  return (
    <span className={`rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${classTone[cls]}`}>
      {classLabel[cls]}
    </span>
  );
}

export function QuantityField({
  label,
  value,
  unit,
  cls,
  stale,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  unit: string | null;
  cls: InputClass;
  stale?: boolean;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block rounded-xl border border-line bg-panel px-3 py-2.5">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="text-[11px] uppercase tracking-[.13em] text-muted">{label}</span>
        <span className="flex items-center gap-1.5">
          {stale && <span className="text-[10px] font-semibold uppercase tracking-wider text-amber">Stale</span>}
          <ClassBadge cls={cls} />
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <input
          type="number"
          step={step ?? "any"}
          value={Number.isFinite(value) ? value : 0}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full bg-transparent text-lg font-medium outline-none"
        />
        {unit && <span className="font-mono text-xs text-muted">{unit}</span>}
      </div>
      {min != null && max != null && (
        <input
          type="range"
          min={min}
          max={max}
          step={step ?? (max - min) / 200}
          value={Math.min(max, Math.max(min, value))}
          onChange={(event) => onChange(Number(event.target.value))}
          className="mt-2"
        />
      )}
    </label>
  );
}
