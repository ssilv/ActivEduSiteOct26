# ActivEdu

Site public de prezentare pentru clubul de robotică și programare. Platforma internă (portal părinți, catalog, administrare) rămâne o aplicație separată; de aici se ajunge la ea prin butonul de autentificare.

## Pornire

```bash
npm install
npm run dev
```

Deschide [http://localhost:3000](http://localhost:3000).

## Portalul intern

Adresa se schimbă din variabila de mediu, nu din componente:

```bash
NEXT_PUBLIC_APP_PORTAL_URL="https://app.domeniu.ro"
```

Copiază `.env.example` în `.env.local` pentru dezvoltare. La build, valoarea `NEXT_PUBLIC_` este inclusă în site, deci trebuie să fie cea corectă în mediul în care rulezi `npm run build`.

## Datele clubului

Telefon, email, program, adresă și rețele sociale stau în `src/config/constants.ts`.

## Formularul de înscriere

Validează datele pe server. Ca să le și trimită mai departe, setează `ENROLLMENT_WEBHOOK_URL` cu un endpoint care acceptă POST JSON. Fără acest URL, formularul confirmă pe ecran, dar nu expediază cererea.
