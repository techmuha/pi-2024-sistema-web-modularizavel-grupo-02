import { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="h-16 w-full rounded-xl border-none p-6 placeholder:text-blue-900"
    />
  );
}
