import {
  getCache,
  saveCache,
  isExpired
} from "@/lib/cache";

type YoutubeSearchResponse = {
  items: {
    id: {
      videoId: string;
    };
  }[];
};

export async function searchYoutubeVideos(
  query: string
): Promise<string[]> {

  const apiKey =
    process.env.YOUTUBE_API_KEY;

  const publishedAfter = new Date();

  publishedAfter.setDate(
    publishedAfter.getDate() - 30
  );

  const url =
    `https://www.googleapis.com/youtube/v3/search?part=id&type=video&maxResults=20&q=${encodeURIComponent(query)}&publishedAfter=${publishedAfter.toISOString()}&key=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Error buscando videos"
    );
  }

  const data =
    await response.json() as YoutubeSearchResponse;

  return data.items.map(
    item => item.id.videoId
  );
}

type YoutubeStatisticsResponse = {
  items: {
    statistics: {
      viewCount: string;
    };
  }[];
};

export async function getYoutubeViews(
  videoIds: string[]
): Promise<number> {
  if (videoIds.length === 0) {
    return 0;
  }

  const apiKey =
    process.env.YOUTUBE_API_KEY;

  const url =
    `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds.join(",")}&key=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Error obteniendo estadísticas"
    );
  }

  const data =
    await response.json() as YoutubeStatisticsResponse;

  return data.items.reduce(
    (sum, item) =>
      sum +
      Number(
        item.statistics.viewCount
      ),
    0
  );
}

export async function getYoutubePopularity(
  query: string
): Promise<number> {
  // Revisar si está guardado en la caché desde hace menos de 1 hora
  const cached = await getCache(
    query,
    "youtube"
  );

  if (
    cached &&
    !isExpired(cached.created_at, 12)
  )
  {
    console.log("Youtube desde caché");
    return cached.data;
  }

  // Hacer la llamada a la api
  const ids =
    await searchYoutubeVideos(query);

  const result = await getYoutubeViews(ids);

  await saveCache(
    query,
    "youtube",
    result
  );

  console.log("YouTube desde API");

  return result;
}