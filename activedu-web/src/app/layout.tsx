import type { Metadata, Viewport } from "next";
import { Manrope, Sora } from "next/font/google";
import { club } from "@/config/constants";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const description =
  "Club de robotică și programare în Buzău, pentru copii și adolescenți. Grupe mici, proiecte reale și lecție demo: Scratch, algoritmi, Python și circuite.";

export const metadata: Metadata = {
  title: {
    default: `${club.name} — Club de robotică și programare`,
    template: `%s · ${club.name}`,
  },
  description,
  applicationName: club.name,
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: club.name,
    title: `${club.name} — Club de robotică și programare`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B1120",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ro"
      data-scroll-behavior="smooth"
      className={`${sora.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-50 font-sans text-slate-900">
        <a
          href="#continut"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Sari la conținut
        </a>
        {children}
      </body>
    </html>
  );
}
