import {TrendingUp } from "lucide-react";
import CircularScore from "./CircularScore"
import type {SearchResult} from "@/app/dashboard/page"
import { PlatformCardProps } from "./PlatformCard";

//Calcula el score promedio
function createScore(platforms : PlatformCardProps[])
{
  let totalScore = 0;
 
  platforms.forEach((platform) => {
    totalScore += platform.score;
  });

  const averageScore = totalScore / platforms.length;

  return Math.floor(averageScore);
}

//Función principal
export default function SummaryCard({
  keyword,
  platforms
}: SearchResult) {
  const averageScore = createScore(platforms);

  let popularity = "";

  if (averageScore < 10) popularity = "Popularidad muy baja"
  else if (averageScore < 25) popularity = "Popularidad baja"
  else if (averageScore < 50) popularity = "Popularidad regular"
  else if (averageScore < 75) popularity = "Popularidad alta"
  else if (averageScore < 90) popularity = "Popularidad muy alta"
  else popularity = "Popularidad extremadamente alta"

  let popularInPlatformsCount = 0;

  platforms.forEach((platform) => {
    if (platform.score > 75) popularInPlatformsCount += 1;
  });

  if ( averageScore > -1)
  return (
    <div className="rounded-3xl border border-slate-800 bg-linear-to-r from-slate-900 to-slate-900/60 p-6">
      <div className="flex items-center gap-8">

        <CircularScore score={averageScore} />

        {/* Texto */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-white">
            {popularity}
          </h2>

          <p className="mt-2 text-slate-400">
            {keyword} aparece en tendencia en {popularInPlatformsCount} de {platforms.length} fuentes analizadas
            durante los últimos 30 días.
          </p>

          {/* <div className="mt-4 inline-flex  items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-emerald-400">
           <TrendingUp size={16} /> 
           <span>+{12}% esta semana</span>
          </div> */}
        </div>
      </div>
    </div>
  )
}