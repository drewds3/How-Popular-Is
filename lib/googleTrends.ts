import googleTrends from "google-trends-api";

import {
  getCache,
  saveCache,
  isExpired
} from "@/lib/cache";

export async function getGoogleTrendsScore(
  keyword: string
): Promise<number> {
  // Revisar si está guardado en la caché desde hace menos de 1 hora
  const cached = await getCache(
    keyword,
    "google_trends"
  );

  if (
    cached &&
    !isExpired(cached.created_at, 6)
  )
  {
    console.log("Google Trends desde caché");
    return cached.data;
  }

  // Hacer la llamada a la api
  const result =
    await googleTrends.interestOverTime({
      keyword,
      startTime: new Date(
        Date.now() - 30 * 24 * 60 * 60 * 1000
      ),
    });

  const data = JSON.parse(result);

  const timeline =
    data.default.timelineData;

  if (!timeline.length) {
    return 0;
  }

  const average =
    timeline.reduce(
      (sum: number, point: {
        value: number[];
      }) =>
        sum + point.value[0],
      0
    ) / timeline.length;

  await saveCache(
    keyword,
    "google_trends",
    average
  );

  return average;
}