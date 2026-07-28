type GNewsResponse = {
  totalArticles: number;
};

export async function getNewsMentions(
  query: string
): Promise<number> {

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

  return data.totalArticles;
}