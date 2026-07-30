import googleTrends from "google-trends-api";

export async function getGoogleTrendsScore(
  keyword: string
): Promise<number> {

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

  return average;
}