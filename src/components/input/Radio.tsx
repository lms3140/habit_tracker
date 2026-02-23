import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

type Option = { label: string; value: string };

export function SegmentedRadioGroup<T extends FieldValues>({
  title,
  name,
  options,
  register,
  required = true,
}: {
  title: string;
  name: Path<T>;
  options: readonly Option[];
  register: UseFormRegister<T>;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm text-ds-ink-muted">{title}</div>

      <div
        className="
          inline-flex w-full overflow-hidden
          rounded-ds border border-ds-border bg-ds-surface
        "
      >
        {options.map((opt, idx) => (
          <label key={opt.value} className="flex-1 cursor-pointer">
            <input
              type="radio"
              value={opt.value}
              {...register(name, { required })}
              className="peer sr-only"
            />
            <span
              className={`
                flex items-center justify-center
                py-2 text-sm select-none
                text-ds-ink
                transition
                peer-checked:bg-ds-ink peer-checked:text-ds-surface
                ${idx !== 0 ? "border-l border-ds-border" : ""}
              `}
            >
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
