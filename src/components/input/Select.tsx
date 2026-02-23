import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

type Option = { label: string; value: string };

export function SelectField<T extends FieldValues>({
  title,
  name,
  options,
  register,
  required = true,
  placeholder = "선택하세요",
}: {
  title: string;
  name: Path<T>;
  options: readonly Option[];
  register: UseFormRegister<T>;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm text-ds-ink-muted">{title}</div>

      <select
        {...register(name, { required })}
        defaultValue=""
        className="
          w-full h-11
          rounded-ds border border-ds-border
          bg-ds-surface text-ds-ink text-sm
          px-3
          outline-none
          focus-visible:ring-2 focus-visible:ring-ds-ring
          focus-visible:ring-offset-2 focus-visible:ring-offset-ds-surface
          transition
        "
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
