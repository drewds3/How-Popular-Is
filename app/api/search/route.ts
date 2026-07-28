import { NextResponse } from "next/server";
import { getWikipediaViews } from "@/lib/wikipedia";
import { getNewsMentions } from "@/lib/news";

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

  try 
  {
    const views = await getWikipediaViews(
      query.replaceAll(" ", "_")
    );

    const newsMentions = await getNewsMentions(
      query
    );

    return NextResponse.json({
      query,
      wikipediaViews: views,
      newsMentions
    });
  } catch 
  {
    return NextResponse.json(
      { error: "No se encontraron datos" },
      { status: 500 }
    );
  }
}