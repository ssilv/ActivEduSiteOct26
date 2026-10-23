import { club } from "@/config/constants";
import { container } from "@/lib/styles";
import { SectionHeading } from "@/components/SectionHeading";

const principles = [
  {
    title: "Grupe mici",
    text: "Maximum 8 elevi, ca mentorul să vadă unde se blochează fiecare, nu doar cine termină primul.",
  },
  {
    title: "Practică de la prima ședință",
    text: "Robotul este pe masă. Nu începem cu un slide despre ce vom face „cândva”.",
  },
  {
    title: "Un proiect care se poate arăta",
    text: "La capătul modulului, copilul pornește ce a construit și poate explica de ce merge.",
  },
] as const;

export function AboutSection() {
  return (
    <section id="despre" aria-labelledby="titlu-despre" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className={`${container} grid items-start gap-12 lg:grid-cols-2`}>
        <SectionHeading
          id="titlu-despre"
          eyebrow="Despre noi"
          title="Un laborator, nu o sală de predare."
        >
          ActivEdu este clubul de robotică și programare din {club.city}, pentru copii și
          adolescenți între 6 și 18 ani. Mentorul stă lângă elev cât timp robotul ratează virajul
          și rămâne până când algoritmul face exact ce a fost scris să facă.
        </SectionHeading>

        <ul className="overflow-hidden rounded-3xl border border-blue-900/40 bg-ink text-white">
          {principles.map((item, index) => (
            <li
              key={item.title}
              className={`px-6 py-6 sm:px-8 ${index > 0 ? "border-t border-white/10" : ""}`}
            >
              <p className="font-display text-lg font-semibold text-white">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
