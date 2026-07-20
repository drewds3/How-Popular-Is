import {TrendingUp } from "lucide-react";

import CircularScore from "./CircularScore"

type SummaryCardProps = {
  score: number
  trend: number
  keyword: string
}

export default function SummaryCard({
  score,
  trend,
  keyword,
}: SummaryCardProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-linear-to-r from-slate-900 to-slate-900/60 p-6">
      <div className="flex items-center gap-8">

        <CircularScore score={score} />

        {/* Texto */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-white">
            Popularidad muy alta
          </h2>

          <p className="mt-2 text-slate-400">
            {keyword} aparece en tendencia en 5 de 6 fuentes analizadas
            durante los últimos 30 días.
          </p>

          <div className="mt-4 inline-flex  items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-emerald-400">
           <TrendingUp size={16} /> 
           <span>+{trend}% esta semana</span>
          </div>
        </div>
      </div>
    </div>
  )
}