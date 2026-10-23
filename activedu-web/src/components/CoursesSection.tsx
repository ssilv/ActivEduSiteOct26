import { courses } from "@/config/constants";
import { container } from "@/lib/styles";
import { CourseCard } from "@/components/CourseCard";
import { SectionHeading } from "@/components/SectionHeading";

export function CoursesSection() {
  return (
    <section id="cursuri" aria-labelledby="titlu-cursuri" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className={container}>
        <SectionHeading
          id="titlu-cursuri"
          eyebrow="Cursuri și grupe de vârstă"
          title="Trei trasee, de la primul robot la circuite proprii."
        >
          Alegi grupa după vârstă și ritm. Fiecare curs are nivel, durată și un proiect pe care
          copilul îl poate arăta la final.
        </SectionHeading>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
