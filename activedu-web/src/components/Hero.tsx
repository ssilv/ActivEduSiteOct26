import Link from "next/link";
import { portalUrl } from "@/config/constants";
import { buttonPrimary, buttonSkyDark, container } from "@/lib/styles";

const strengths = [
  { label: "Grupe", value: "Maximum 8 elevi" },
  { label: "Metodă", value: "Învățare practică" },
  { label: "Rezultat", value: "Proiecte reale" },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white" aria-labelledby="titlu-principal">
      <div className="tech-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-24 top-8 size-80 rounded-full bg-blue-600/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 size-72 rounded-full bg-sky-500/15 blur-3xl"
        aria-hidden="true"
      />

      <div className={`${container} relative grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:py-24`}>
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-sky-200">
            <span className="size-1.5 rounded-full bg-sky-300" aria-hidden="true" />
            Buzău · Robotică și programare
          </p>
          <h1
            id="titlu-principal"
            className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            Viitorul se scrie în algoritmi.
            <span className="mt-2 block text-sky-300">Se vede pe robot.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-pretty text-slate-200 sm:text-lg">
            La ActivEdu, copiii și adolescenții trec de la primul bloc Scratch la algoritmi,
            senzori și circuite. Grupe mici, un mentor lângă ei și proiecte pe care le pot porni
            și explica.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/#contact" className={buttonPrimary}>
              Înscriere lecție demo
            </Link>
            <Link href="/#cursuri" className={buttonSkyDark}>
              Vezi programa cursurilor
            </Link>
          </div>

          <p className="mt-4 text-sm text-slate-300">
            Ești deja înscris?{" "}
            <a
              href={portalUrl}
              className="font-semibold text-sky-200 underline decoration-sky-400/80 underline-offset-4 hover:text-white"
            >
              Intră în contul tău
            </a>
          </p>

          <dl className="mt-10 grid gap-3 sm:grid-cols-3">
            {strengths.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-blue-900/50 bg-white/5 px-4 py-3"
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-white">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <LabPanel />
      </div>
    </section>
  );
}

function LabPanel() {
  return (
    <div className="relative" aria-hidden="true">
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-blue-600/10 blur-2xl" />
      <div className="overflow-hidden rounded-3xl border border-blue-900/50 bg-[#111a2e] shadow-2xl shadow-blue-950/50">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="size-2.5 rounded-full bg-sky-400" />
          <span className="size-2.5 rounded-full bg-blue-500" />
          <span className="size-2.5 rounded-full bg-slate-600" />
          <p className="ml-2 font-mono text-xs text-slate-400">laborator · traseu.py</p>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          <svg viewBox="0 0 360 150" className="h-auto w-full text-sky-300">
            <rect x="18" y="48" width="210" height="62" rx="16" fill="#1E293B" stroke="currentColor" strokeWidth="2" />
            <rect x="46" y="34" width="78" height="18" rx="8" fill="#0B1120" stroke="#38BDF8" strokeWidth="2" />
            <circle cx="68" cy="43" r="3" fill="#38BDF8" />
            <circle cx="102" cy="43" r="3" fill="#2563EB" />
            <circle cx="62" cy="112" r="16" fill="#0B1120" stroke="#38BDF8" strokeWidth="3" />
            <circle cx="184" cy="112" r="16" fill="#0B1120" stroke="#38BDF8" strokeWidth="3" />
            <path d="M228 70h46l28-24" fill="none" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M274 46h42" fill="none" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
            <circle cx="320" cy="46" r="6" fill="#38BDF8" />
            <path d="M250 128c28 10 62 8 92-8" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeDasharray="5 6" />
          </svg>

          <pre className="overflow-x-auto rounded-2xl bg-black/35 p-4 font-mono text-[13px] leading-6 text-sky-100">
            <code>
              {`distanță = senzor()
dacă distanță < 15:
    rotește(90)
altfel:
    mergi(distanță)`}
            </code>
          </pre>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-blue-900/50 bg-ink px-3 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-300">Senzor</p>
              <p className="mt-1 text-sm font-semibold text-white">12 cm</p>
            </div>
            <div className="rounded-2xl border border-blue-900/50 bg-ink px-3 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-300">Decizie</p>
              <p className="mt-1 text-sm font-semibold text-white">viraj dreapta</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
