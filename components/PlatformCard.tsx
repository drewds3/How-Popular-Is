import { LucideIcon } from "lucide-react"

type PlatformCardProps = {
  name: string
  score: number
  color: string
  icon?: LucideIcon
  letter?: string
}

export default function PlatformCard({
  name,
  score,
  color,
  icon: Icon,
  letter
}: PlatformCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-2">
      <div
        className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${color}20` }}
      >
        {Icon ? (
        <Icon size={18} style={{ color }} />
        ) : (
        <span
            className="text-lg font-bold"
            style={{ color }}
        >
            {letter}
        </span>
)}
      </div>

      <p className="text-slate-400">
        {name}
      </p>

      <p className="mt-1 text-2xl font-semibold text-white">
        {score}
      </p>

      <div className="mt-4 h-1.5 rounded-full bg-slate-800">
        <div
          className="h-full rounded-full"
          style={{
            width: `${score}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  )
}