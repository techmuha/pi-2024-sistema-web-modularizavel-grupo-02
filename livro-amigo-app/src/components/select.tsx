import { SelectHTMLAttributes } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{
    label: string;
    value: string;
  }>;
}

export function Select({ options = [], ...props }: SelectProps) {
  return (
    <select
      {...props}
      className="h-16 w-full rounded-xl border-none bg-white px-6"
    >
      <option value="" hidden>
        Selecionar
      </option>
      {options.map(({ value, label }, index) => (
        <option key={`select-option-${value}-${index}`} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
