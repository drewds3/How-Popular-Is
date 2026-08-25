import {
  getCache,
  saveCache,
  isExpired
} from "@/lib/cache";

/* export async function searchWikipedia(query: string) {
  const response = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
      query)}`, 
      {headers: {"User-Agent":
      "How Popular Is/0.1 (Popularity dashboard; andriudark777@gmail.com)",
      },
    });

  if (!response.ok) {
    throw new Error("Error buscando en Wikipedia");
  }

  return response.json();
} */

type WikipediaPageView = 
{
    views: number;
    timestamp: string;
};

export async function getWikipediaViews(article: string) 
{
  //Revisar si está en la caché
  const cached = await getCache(
    article,
    "wikipedia"
  );

  console.log("CACHE:", cached);

  if ( cached && !isExpired(cached.created_at, 24))
  {
    console.log("Wikipedia desde caché");

    return cached.data;
  }

    //Fechas inicial y final
    const today = new Date();

    const end = today.toISOString().slice(0, 10).replaceAll("-", "");

    const startDate = new Date();
    startDate.setDate(today.getDate() - 30);

    const start = startDate.toISOString().slice(0, 10).replaceAll("-", "");

    //Construcción de la URL
    const url =
        `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/` +
        `en.wikipedia/all-access/user/${encodeURIComponent(article)}/daily/` +
        `${start}/${end}`;

    //Hacer llamada a la api y pedir datos
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "HowPopularIs/0.1 (Popularity Dashboard; andriudark777@gmail.com)"
      }
    });

    if (!response.ok) {
        throw new Error("Wikipedia no devolvió datos");
    }

    const data = await response.json();

    //Suma de las vistas de los últimos 30 días
    const totalViews = data.items.reduce(
        (sum: number, item: WikipediaPageView) => sum + item.views,
        0
    );

    // Se guarda en caché
    await saveCache(
      article,
      "wikipedia",
      totalViews
    );  

    console.log("Wikipedia desde API");
    return totalViews;
}