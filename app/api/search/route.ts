import { NextResponse } from "next/server";
import { getWikipediaViews } from "@/lib/wikipedia";
import { getNewsMentions } from "@/lib/news";
import { getYoutubePopularity } from "@/lib/youtube";

export async function GET(request: Request) 
{
  //Obtener el valor de la petición
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Query requerida" },
      { status: 400 }
    );
  }

  let wikipediaViews = -1;

  try 
  {
    wikipediaViews = await getWikipediaViews(
    query.replaceAll(" ", "_"));
  } catch (error) 
  {
    console.error("Wikipedia:", error);
  }

  let newsMentions = -1;

  try 
  {
    newsMentions = await getNewsMentions(
    query);
  } catch (error) 
  {
    console.error("GNews:", error);
  }
  
  let youtubeViews = -1
  
  try {
    youtubeViews = await getYoutubePopularity(query);
  } catch (error)
  {
    console.error("Youtube:", error);
  }

    return NextResponse.json({
      query,
      wikipediaViews,
      newsMentions,
      youtubeViews
    });
 
  
}