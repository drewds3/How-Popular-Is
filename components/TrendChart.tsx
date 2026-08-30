const data = [25, 40, 35, 50, 55, 45, 70, 85];

export default function TrendChart() {
  const max = Math.max(...data);

  return (
    <div className="mt-6 rounded-3xl border border-line bg-surface p-6">
      <h3 className="mb-6 font-semibold uppercase tracking-wide text-ink-muted">
        Evolución últimas 8 semanas
      </h3>

      <div className="flex h-40 items-end gap-1">
        {data.map((value, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-md bg-accent-soft transition-all"
            style={{ height: `${(value / max) * 100}%` }}
          />
        ))}
      </div>

      <div className="mt-3 flex justify-between text-sm text-ink-muted">
        <span>hace 8 sem.</span>
        <span>hace 4 sem.</span>
        <span>ahora</span>
      </div>
    </div>
  );
}