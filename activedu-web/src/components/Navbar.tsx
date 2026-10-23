"use client";

import Link from "next/link";
import { LogIn, Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { navLinks, portalUrl } from "@/config/constants";
import { buttonGhostDark, buttonPrimary, container } from "@/lib/styles";
import { Logo } from "@/components/Logo";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  function toggleMenu() {
    setOpen((current) => {
      const next = !current;
      if (next) {
        requestAnimationFrame(() => {
          panelRef.current?.querySelector<HTMLElement>("a")?.focus();
        });
      }
      return next;
    });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-blue-900/40 bg-ink/95 text-white backdrop-blur-md">
      <div className={`${container} flex h-16 items-center justify-between gap-4`}>
        <Link href="/" className="rounded-lg" aria-label="ActivEdu, pagina principală">
          <Logo />
        </Link>

        <nav aria-label="Secțiuni" className="hidden items-center gap-6 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-200 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <a
            href={portalUrl}
            className={buttonGhostDark}
            aria-label="Autentificare Portal — cont elev și părinte"
          >
            <LogIn className="size-4" aria-hidden="true" />
            Autentificare Portal
          </a>
          <Link href="/#contact" className={buttonPrimary}>
            Înscrie-te la Demo
          </Link>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex size-11 cursor-pointer items-center justify-center rounded-xl border border-sky-400/50 text-sky-50 xl:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={toggleMenu}
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          <span className="sr-only">{open ? "Închide meniul" : "Deschide meniul"}</span>
        </button>
      </div>

      {open ? (
        <div
          ref={panelRef}
          id={menuId}
          className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-blue-900/40 bg-ink xl:hidden"
        >
          <nav aria-label="Mobil" className={`${container} flex flex-col gap-1 py-4`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-xl px-3 py-3 text-base font-medium text-slate-100 hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={portalUrl}
              className={`${buttonGhostDark} mt-3 w-full`}
              aria-label="Autentificare Portal — cont elev și părinte"
            >
              <LogIn className="size-4" aria-hidden="true" />
              Cont Elev &amp; Părinte
            </a>
            <Link href="/#contact" onClick={closeMenu} className={`${buttonPrimary} w-full`}>
              Înscrie-te la Demo
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
