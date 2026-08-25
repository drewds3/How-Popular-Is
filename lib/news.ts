import {
  getCache,
  saveCache,
  isExpired
} from "@/lib/cache";

type GNewsResponse = {
  totalArticles: number;
};

export async function getNewsMentions(
  query: string
): Promise<number> {
  // Revisar si está guardado en la caché desde hace menos de 1 hora
  const cached = await getCache(
    query,
    "gnews"
  );

  if (
    cached &&
    !isExpired(cached.created_at, 1)
  )
  {
    console.log("GNews desde caché");
    return cached.data;
  }

  // Hacer la llamada a la api
  const apiKey = process.env.GNEWS_API_KEY;

  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 30);

  const from = fromDate.toISOString();

  const url =
  `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&from=${from}&apikey=${apiKey}`;
  
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Error obteniendo noticias"
    );
  }

  const data =
    await response.json() as GNewsResponse;

  await saveCache(
    query,
    "gnews",
    data.totalArticles
  );

  console.log("Gnews desde API");

  return data.totalArticles;
}