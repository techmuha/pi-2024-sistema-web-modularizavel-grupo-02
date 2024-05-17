import { ButtonHTMLAttributes } from "react";

export function Button({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`h-16 w-full rounded-3xl bg-orange-400 font-bold text-white ${className}`.trim()}
    />
  );
}
