import { competitionTeams } from "@/config/constants";
import { container } from "@/lib/styles";
import { SectionHeading } from "@/components/SectionHeading";

const steps = [
  {
    title: "Provocare de laborator",
    text: "În fiecare modul există o problemă cu timp limitat: linie, labirint sau senzori care se contrazic. Întâi nu iese. Apoi se repară.",
  },
  {
    title: "Simulare pe echipe",
    text: "Elevii repetă un regulament simplu: roluri, strategie și depanare când rămân puține minute. Presiunea este de antrenament, nu de spectacol.",
  },
  {
    title: "FIRST LEGO League",
    text: "Pregătirea de concurs acoperă robotul, misiunile, proiectul de inovație și felul în care echipa își prezintă munca.",
  },
] as const;

export function CompetitionsSection() {
  return (
    <section
      id="competitii"
      aria-labelledby="titlu-competitii"
      className="bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <div className={container}>
        <SectionHeading
          id="titlu-competitii"
          eyebrow="Competiții"
          title="De la provocarea din laborator la linia de start."
        >
          Concursul nu începe în ziua probei. Începe când un traseu nu iese din prima și echipa
          decide cine repară codul și cine ține strategia.
        </SectionHeading>

        <ol className="mt-10 grid gap-5 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="font-display text-3xl font-semibold text-sky-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{step.text}</p>
            </li>
          ))}
        </ol>

        <p className="mt-6 max-w-3xl text-sm leading-6 text-slate-600">
          Echipele clubului, {competitionTeams.join(" și ")}, lucrează pe construcție, programare,
          strategie și prezentare.
        </p>
      </div>
    </section>
  );
}
