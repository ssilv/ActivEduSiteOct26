import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  invert?: boolean;
};

export function SectionHeading({ id, eyebrow, title, children, invert = false }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p
        className={`text-sm font-semibold uppercase tracking-[0.16em] ${
          invert ? "text-sky-300" : "text-blue-700"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl ${
          invert ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-4 text-base leading-7 text-pretty sm:text-lg ${
          invert ? "text-slate-200" : "text-slate-600"
        }`}
      >
        {children}
      </p>
    </div>
  );
}
