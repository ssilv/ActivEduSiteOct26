type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 36 36"
        className="size-9 shrink-0"
        aria-hidden="true"
      >
        <rect width="36" height="36" rx="10" fill="#1D4ED8" />
        <path
          d="M9 26.5 18 9.5 27 26.5"
          fill="none"
          stroke="#F8FAFC"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M12.8 20.5h10.4"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="18" cy="20.5" r="1.8" fill="#F8FAFC" />
      </svg>
      <span className="font-display text-lg font-semibold tracking-tight text-white">
        Activ<span className="text-sky-300">Edu</span>
      </span>
    </span>
  );
}
