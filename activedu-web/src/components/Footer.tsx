import Link from "next/link";
import { LogIn } from "lucide-react";
import { club, navLinks, portalUrl, socialLinks } from "@/config/constants";
import { container } from "@/lib/styles";
import { Logo } from "@/components/Logo";

const visibleSocials = socialLinks.filter((item) => item.href.startsWith("http"));

export function Footer() {
  return (
    <footer className="border-t border-blue-900/40 bg-ink text-slate-200">
      <div className={`${container} grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4`}>
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" aria-label="ActivEdu, pagina principală">
            <Logo />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">{club.description}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-sky-300">Navigare</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-sky-300">Program</h2>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
            {club.hours.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <address className="mt-4 text-sm not-italic leading-6 text-slate-300">
            {club.address}
            <span className="block">{club.addressNote}</span>
          </address>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-sky-300">Contact</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {club.phoneDisplay ? (
              <li>
                {club.phoneHref ? (
                  <a href={club.phoneHref} className="hover:text-white">
                    {club.phoneDisplay}
                  </a>
                ) : (
                  club.phoneDisplay
                )}
              </li>
            ) : null}
            {club.email ? (
              <li>
                <a href={`mailto:${club.email}`} className="hover:text-white">
                  {club.email}
                </a>
              </li>
            ) : null}
            <li>
              <Link href="/#contact" className="hover:text-white">
                Formular lecție demo
              </Link>
            </li>
          </ul>
          <a
            href={portalUrl}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-200 hover:text-white"
          >
            <LogIn className="size-4" aria-hidden="true" />
            Portal administrare
          </a>
          {visibleSocials.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-3 text-sm">
              {visibleSocials.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-white" target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className={`${container} flex flex-col gap-2 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between`}>
          <p>© 2026 {club.name}. Toate drepturile rezervate.</p>
          <a href={portalUrl} className="font-medium text-sky-300 hover:text-sky-200">
            Ești deja înscris? Intră în contul tău
          </a>
        </div>
      </div>
    </footer>
  );
}
