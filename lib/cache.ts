import { supabase } from "@/lib/supabaseClient";

export async function getCache(
  query: string,
  source: string
)
{
    const { data, error } = await supabase
        .from("api_cache")
        .select("*")
        .eq("query", query)
        .eq("source", source)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

    console.log("CACHE DATA:", data);
    console.log("CACHE ERROR:", error);

    if (error)
    {
        return null;
    }

    return data;
}

export async function saveCache(
  query: string,
  source: string,
  data: unknown
)
{
    console.log("Intentando guardar caché");
    
    const result = await supabase
        .from("api_cache")
        .upsert({
            query,
            source,
            data
        });

    console.log(result);
}

export function isExpired(
  createdAt: string,
  hours: number
)
{
  const created = new Date(createdAt);
  const now = new Date();

  const diff =
    now.getTime() - created.getTime();

  return diff > hours * 60 * 60 * 1000;
}