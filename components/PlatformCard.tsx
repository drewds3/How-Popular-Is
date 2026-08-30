import { LucideIcon } from "lucide-react";

export type PlatformCardProps = {
  name: string;
  score: number;
  rawValue: number;
  color: string;
  icon?: LucideIcon;
  letter?: string;
};

export default function PlatformCard({ name, score, color, icon: Icon, letter }: PlatformCardProps) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <div
        className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${color}20` }}
      >
        {Icon ? (
          <Icon size={18} style={{ color }} />
        ) : (
          <span className="text-lg font-bold" style={{ color }}>
            {letter}
          </span>
        )}
      </div>

      <p className="text-ink-soft">{name}</p>

      <p className="mt-1 text-2xl font-semibold text-ink">{score}</p>

      <div className="mt-4 h-1.5 rounded-full bg-line">
        <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}