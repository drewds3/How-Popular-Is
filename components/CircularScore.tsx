type CircularScoreProps = {
  score: number
}

export default function CircularScore({
  score,
}: CircularScoreProps) {
  const radius = 36
  const circumference = 2 * Math.PI * radius

  const strokeDashoffset =
    circumference -
    (score / 100) * circumference

  return (
    <div className="relative h-24 w-24">
      <svg
        className="h-24 w-24 -rotate-90"
        viewBox="0 0 100 100"
      >
        {/* Fondo */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#1e293b"
          strokeWidth="8"
        />

        {/* Progreso */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#4f7cff"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white">
          {score}
        </span>

        <span className="text-xs text-slate-400">
          /100
        </span>
      </div>
    </div>
  )
}