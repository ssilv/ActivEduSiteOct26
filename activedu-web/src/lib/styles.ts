export const container = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";

const buttonBase =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition duration-200";

export const buttonPrimary = `${buttonBase} bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 disabled:cursor-not-allowed disabled:bg-blue-400 disabled:shadow-none`;

export const buttonGhostDark = `${buttonBase} border border-sky-400/70 bg-transparent text-sky-50 hover:border-sky-300 hover:bg-sky-400/10`;

export const buttonSkyDark = `${buttonBase} border border-sky-400/80 bg-sky-400/5 text-sky-50 hover:border-sky-300 hover:bg-sky-400/15`;

export const fieldClass =
  "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-base text-slate-900 shadow-sm transition placeholder:text-slate-600 focus:border-blue-600 aria-invalid:border-red-600";
