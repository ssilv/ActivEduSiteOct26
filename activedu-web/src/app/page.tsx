import { Suspense } from "react";
import { club } from "@/config/constants";
import { AboutSection } from "@/components/AboutSection";
import { CompetitionsSection } from "@/components/CompetitionsSection";
import { ContactSection } from "@/components/ContactSection";
import { CoursesSection } from "@/components/CoursesSection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { PortalBanner } from "@/components/PortalBanner";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: club.name,
  description: club.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Strada Cuza Vodă",
    addressLocality: club.city,
    addressCountry: "RO",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <main id="continut" tabIndex={-1} className="flex-1 outline-none">
        <Hero />
        <CoursesSection />
        <AboutSection />
        <CompetitionsSection />
        <PortalBanner />
        <Suspense fallback={<ContactFallback />}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function ContactFallback() {
  return (
    <section aria-hidden="true" className="bg-white py-16 sm:py-24">
      <div className="mx-auto h-80 max-w-6xl animate-pulse rounded-3xl bg-slate-100" />
    </section>
  );
}
