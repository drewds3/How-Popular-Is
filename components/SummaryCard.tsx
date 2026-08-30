import CircularScore from "./CircularScore";
import type { SearchResult } from "@/app/dashboard/page";
import { PlatformCardProps } from "./PlatformCard";

function createScore(platforms: PlatformCardProps[]) {
  let totalScore = 0;
  platforms.forEach((platform) => {
    totalScore += platform.score;
  });
  return Math.floor(totalScore / platforms.length);
}

export default function SummaryCard({ keyword, platforms }: SearchResult) {
  const averageScore = createScore(platforms);

  let popularity = "";
  if (averageScore < 10) popularity = "Popularidad muy baja";
  else if (averageScore < 25) popularity = "Popularidad baja";
  else if (averageScore < 50) popularity = "Popularidad regular";
  else if (averageScore < 75) popularity = "Popularidad alta";
  else if (averageScore < 90) popularity = "Popularidad muy alta";
  else popularity = "Popularidad extremadamente alta";

  let popularInPlatformsCount = 0;
  platforms.forEach((platform) => {
    if (platform.score > 75) popularInPlatformsCount += 1;
  });

  if (averageScore > -1)
    return (
      <div className="rounded-3xl border border-line bg-gradient-to-r from-surface to-cream p-6">
        <div className="flex items-center gap-8">
          <CircularScore score={averageScore} />

          <div className="flex-1">
            <h2 className="text-3xl font-bold text-ink">{popularity}</h2>
            <p className="mt-2 text-ink-soft">
              {keyword} aparece en tendencia en {popularInPlatformsCount} de {platforms.length} fuentes
              analizadas durante los últimos 30 días.
            </p>
          </div>
        </div>
      </div>
    );
}