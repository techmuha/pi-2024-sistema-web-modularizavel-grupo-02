import { ReactNode } from "react";

export interface HeadingProps {
  texts: {
    top: string;
    bottom: string;
  };
  right?: ReactNode;
}

export function Heading({ texts, right }: HeadingProps) {
  return (
    <header className="mb-8 flex justify-between gap-2 p-8 pb-0">
      <h1 className="text-3xl text-blue-800">
        <span className="font-light">{texts.top}</span>
        <br />
        <span className="font-bold">{texts.bottom}</span>
      </h1>

      {right}
    </header>
  );
}
