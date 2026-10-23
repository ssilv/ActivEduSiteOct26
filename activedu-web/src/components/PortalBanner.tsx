import { LogIn } from "lucide-react";
import { portalUrl } from "@/config/constants";
import { buttonPrimary, container } from "@/lib/styles";

export function PortalBanner() {
  return (
    <section aria-labelledby="titlu-portal" className="bg-slate-50 pb-16 sm:pb-20">
      <div className={container}>
        <div className="relative overflow-hidden rounded-3xl border border-blue-900/40 bg-ink text-white shadow-xl shadow-blue-950/20">
          <div className="tech-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
          <div className="relative grid items-center gap-8 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-300">
                Cont elev și părinte
              </p>
              <h2 id="titlu-portal" className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Ești deja parte din club?
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200">
                Accesează portalul pentru orar, teme și prezență. Același cont este pentru elev și
                pentru părinte.
              </p>
            </div>
            <a href={portalUrl} className={`${buttonPrimary} w-full lg:w-auto`}>
              <LogIn className="size-4" aria-hidden="true" />
              Intră în portal
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
