import Link from "next/link";
import { ArrowRight, Blocks, Bot, CircuitBoard, Code, Cpu, Terminal, type LucideIcon } from "lucide-react";
import type { Course } from "@/config/constants";

const icons: Record<Course["icon"], LucideIcon> = {
  blocks: Blocks,
  cpu: Cpu,
  circuit: CircuitBoard,
  bot: Bot,
  terminal: Terminal,
  code: Code,
};

type CourseCardProps = {
  course: Course;
  index: number;
};

export function CourseCard({ course, index }: CourseCardProps) {
  const Icon = icons[course.icon];
  const order = String(index + 1).padStart(2, "0");
  const tags = [
    { label: "Nivel", value: course.level },
    { label: "Vârstă", value: course.age },
    { label: "Durată", value: course.duration },
  ];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-blue-500/15">
      <div className="h-1 bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-300" aria-hidden="true" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <span className="flex size-12 items-center justify-center rounded-xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
            <Icon className="size-6" aria-hidden="true" />
          </span>
          <span className="font-display text-sm font-semibold text-sky-600">{order}</span>
        </div>

        <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-balance text-slate-900">
          {course.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-pretty text-slate-600">{course.summary}</p>

        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          {course.outcomes.map((outcome) => (
            <li key={outcome} className="flex gap-2">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden="true" />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>

        <ul className="mt-auto flex flex-wrap gap-2 pt-5" aria-label={`Detalii pentru ${course.title}`}>
          {tags.map((tag) => (
            <li
              key={tag.label}
              className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-950 ring-1 ring-sky-200"
            >
              <span className="text-sky-700">{tag.label}:</span> {tag.value}
            </li>
          ))}
        </ul>

        <Link
          href={`/?curs=${course.id}#contact`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800"
        >
          Înscrie-te la acest curs
          <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
