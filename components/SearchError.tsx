import { AlertTriangle, RotateCw } from "lucide-react";

type SearchErrorProps = {
  query: string;
  onRetry: () => void;
};

export default function SearchError({ query, onRetry }: SearchErrorProps) {
  return (
    <div className="mt-12 flex flex-col items-center gap-5 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-danger/10">
        <AlertTriangle size={26} className="text-danger" />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-ink">
          No pudimos analizar &quot;{query}&quot;
        </h2>
        <p className="mt-2 max-w-md text-ink-soft">
          Las fuentes no respondieron. Puede ser un problema temporal de conexión — intenta de nuevo.
        </p>
      </div>

      <button
        onClick={onRetry}
        className="flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 font-semibold text-white transition hover:bg-accent-hover"
      >
        <RotateCw size={16} />
        Reintentar
      </button>
    </div>
  );
}