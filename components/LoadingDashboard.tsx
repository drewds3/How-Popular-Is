export default function LoadingDashboard({ query }: { query: string }) {
  return (
    <div className="mt-12 flex flex-col items-center gap-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-ink">
          Analizando &quot;{query}&quot;
        </h2>
        <p className="mt-2 text-ink-soft">Consultando múltiples fuentes...</p>
      </div>

      <div className="w-full max-w-3xl rounded-2xl border border-line bg-surface p-6">
        <LoadingRow text="Wikipedia" />
        <LoadingRow text="Noticias" />
        <LoadingRow text="YouTube" />
        <LoadingRow text="Google Trends" />
      </div>
    </div>
  );
}

function LoadingRow({ text }: { text: string }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="mb-2 flex items-center gap-3">
        <div className="h-3 w-3 animate-pulse rounded-full bg-accent" />
        <span className="text-ink-soft">{text}</span>
      </div>

      <div className="relative h-3 w-full overflow-hidden rounded-full bg-line">
        <div className="absolute inset-y-0 w-1/3 animate-[loading_1.5s_infinite] rounded-full bg-accent-soft" />
      </div>
    </div>
  );
}