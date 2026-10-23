/**
 * Configurare publică a site-ului ActivEdu.
 * Telefonul, emailul, programul și rețelele sociale se schimbă doar aici.
 * Adresa portalului vine din NEXT_PUBLIC_APP_PORTAL_URL (.env.local / producție).
 */

const FALLBACK_PORTAL_URL = "https://app.activedu.ro";

function sanitizePortalUrl(value: string | undefined): string {
  const candidate = value?.trim() || FALLBACK_PORTAL_URL;

  try {
    const url = new URL(candidate);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return FALLBACK_PORTAL_URL;
    }
    url.hash = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return FALLBACK_PORTAL_URL;
  }
}

/** Acces direct, ca Next.js să poată include variabila NEXT_PUBLIC_ la build. */
export const portalUrl = sanitizePortalUrl(
  process.env.NEXT_PUBLIC_APP_PORTAL_URL,
);

export const club = {
  name: "ActivEdu",
  city: "Buzău",
  /** Publicat: laboratorul funcționează pe strada Cuza Vodă, în spatele Primăriei. */
  address: "Strada Cuza Vodă, Buzău",
  addressNote: "În spatele Primăriei",
  /**
   * Completează cu datele reale. Rândurile goale nu apar în pagină.
   * phoneHref trebuie să fie în format tel:, de exemplu "tel:+40722123456".
   */
  email: "contact@activedu.ro",
  phoneDisplay: "0770 727 722",
  phoneHref: "+40770727722",
  hours: [
    "Grupe după-amiaza, în zilele de școală",
    "Sâmbăta: atelier și pregătire de concurs",
  ],
  description:
    "Club educațional de robotică și programare pentru copii și adolescenți, în Buzău.",
} as const;

export const socialLinks: { label: string; href: string }[] = [
  // { label: "Instagram", href: "https://instagram.com/activedu" },
  // { label: "Facebook", href: "https://facebook.com/activedu" },
  // { label: "YouTube", href: "https://youtube.com/@activedu" },
];

export const navLinks = [
  { href: "/#cursuri", label: "Cursuri" },
  { href: "/#despre", label: "Despre noi" },
  { href: "/#competitii", label: "Competiții" },
  { href: "/#contact", label: "Contact" },
] as const;

export type CourseIcon = "blocks" | "cpu" | "circuit" | "bot" | "terminal" | "code";

export type Course = {
  id: string;
  title: string;
  summary: string;
  level: string;
  age: string;
  duration: string;
  outcomes: readonly string[];
  icon: CourseIcon;
};

export const courses: readonly Course[] = [
  {
    id: "scratch",
    title: "Scratch și robotică introductivă",
    summary:
      "Primul contact cu logica de programare și cu un robot care ascultă de cod. Copiii construiesc, testează și repară chiar de la prima ședință.",
    level: "Începător",
    age: "6–10 ani",
    duration: "90 min / săptămână",
    outcomes: [
      "Secvențe, bucle și condiții în Scratch",
      "Un robot care urmează un traseu gândit de ei",
      "Prima depanare, când rezultatul nu iese din prima",
    ],
    icon: "blocks",
  },
  {
    id: "algoritmi",
    title: "Algoritmi și robotică avansată",
    summary:
      "De la traseu la strategie. Elevii scriu algoritmi pentru linie, obstacole și probe asemănătoare concursurilor, apoi îi văd pe robot.",
    level: "Intermediar",
    age: "10–14 ani",
    duration: "90 min / săptămână",
    outcomes: [
      "Decizii pentru linie, obstacol și intersecție",
      "Senzori combinați și reacție în timp real",
      "Lucru pe echipe, cu roluri clare",
    ],
    icon: "cpu",
  },
  {
  id: "python-robotica-apps",
  title: "Python: Aplicații Grafice și Programare de Roboți",
  summary:
    "Trecerea de la blocuri vizuale la cod real scris de mână. Elevii învață Python prin crearea de aplicații interactive cu interfață grafică (Tkinter), algoritmi de logică și controlul roboților programați direct în Python.",
  level: "Intermediar",
  age: "12–16 ani",
  duration: "90 min / săptămână",
  outcomes: [
    "Sintaxă Python reală: variabile, liste, condiții, bucle și funcții modulare",
    "Aplicații desktop cu interfață (GUI): ferestre, butoane, formulare și mici utilitare create în Tkinter",
    "Codare directă pentru robotică: citire senzori, sincronizare motoare și navigare autonomă în Python",
    "Proiecte practice portabile: mini-jocuri, panouri de control pe ecran și roboți programați cap-coadă",
  ],
  icon: "bot", // sau "code", "terminal"
},
  
  {
  id: "python-liceu",
  title: "Python: Algoritmică și Informatică de Liceu",
  summary:
    "Gândire algoritmică riguroasă și cod curat în Python. Aprofundăm programa de liceu prin rezolvarea de probleme clasice, optimizări de complexitate și aplicații software practice.",
  level: "Intermediar – Avansat",
  age: "14–19 ani (Clasele IX–XII)",
  duration: "90 min / săptămână",
  outcomes: [
    "Stăpânirea algoritmilor esențiali: sortare, căutare, divizibilitate și tehnici combinate",
    "Structuri de date fundamentale: liste, dicționare, tupluri, mulțimi, stive și cozi",
    "Gândire modulară și structurată: funcții, parametri, recursivitate și depanare eficientă",
    "Pregătire solidă pentru școală, bacalaureat și baze reale pentru viitorul profil tehnic",
  ],
  icon: "code", // sau "terminal", "brackets"
}
  
];

export const competitionTeams = ["RoboActive", "ProActive"] as const;

export function courseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}
