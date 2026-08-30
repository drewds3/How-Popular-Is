interface GoogleButtonProps {
  onClick: () => void;
  loading?: boolean;
}

export function GoogleButton({ onClick, loading }: GoogleButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="inline-flex items-center gap-3 rounded-full border-[1.5px] border-line bg-surface px-7 py-3.5 font-body text-[15px] font-semibold text-ink transition-all hover:-translate-y-px hover:border-accent hover:shadow-[0_4px_14px_rgba(166,50,30,0.14)] disabled:opacity-60"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
        <path fill="#4285F4" d="M23.52 12.27c0-.85-.07-1.66-.21-2.44H12v4.62h6.48c-.28 1.5-1.13 2.78-2.4 3.63v3.02h3.88c2.27-2.09 3.56-5.17 3.56-8.83z" />
        <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3.02c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.12C3.24 21.3 7.29 24 12 24z" />
        <path fill="#FBBC05" d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54V6.62H1.26a12 12 0 0 0 0 10.77l4.01-3.12z" />
        <path fill="#EA4335" d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.29 0 3.24 2.7 1.26 6.62l4.01 3.12C6.22 6.88 8.87 4.77 12 4.77z" />
      </svg>
      {loading ? "Conectando..." : "Continuar con Google"}
    </button>
  );
}