"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";
import {TrendingUp } from "lucide-react";

import SearchHero from "@/components/SearchHero";
import ResultsDashboard from "@/components/ResultsDashboard";

//
import type { PlatformCardProps } from "@/components/PlatformCard";
import { generatePlatforms } from "@/lib/platformFactories";

//
import LoadingDashboard from "@/components/LoadingDashboard";

import UserMenu from "@/components/UserMenu";

import SearchError from "@/components/SearchError";

export type SearchResult = {
  keyword: string;
  platforms: PlatformCardProps[];
};

export default function DashboardPage() {
    
    const router = useRouter();

    // Estados del usuario
    const [user, setUser] = useState<User | null>(null);

    //Estado para la barra de búsqueda
    const [searchTerm, setSearchTerm] = useState("");

    //Estado para renderizar el resultado
    const [result, setResult] = useState<SearchResult | null>(null);

    // Estado del historial
    const [history, setHistory] = useState<string[]>([]);

    // Animación de carga
    const [loading, setLoading] = useState(false);

    // Manejar si todas las apis fallan
    const [error, setError] = useState(false);

    useEffect(() => 
    {
        const checkAndLoadUser = async () => 
        {
            const {
            data: { user },
            } = await supabase.auth.getUser();

            //Expulsa al usuario si no está autenticado
            if (!user) 
            { 
                router.push("/");
                return;
            }
            else setUser(user); //Carga el usuario de lo contrario
        };

        checkAndLoadUser();
    }, [router]);

    const loadHistory = async () => {
        if (!user) return [];

        const { data, error } = await supabase
            .from("search_history")
            .select("query")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(10);

        if (error) {
            console.error(error);
            return [];
        }

        const queries = data.map(item => item.query);

        const uniqueQueries = [...new Set(queries)];

        return uniqueQueries;
    };

    useEffect(() => {
        if (!user) return;

        const fetchHistory = async () => {
            const historyData = await loadHistory();
            setHistory(historyData);
        };

        fetchHistory();
    }, [user]);

    const avatarUrl = user?.user_metadata?.avatar_url;
    const userName = user?.user_metadata?.full_name;
    const email = user?.email;

    //Función que actualiza los resultados de la búqueda
    const handleSearch = async (
        customTerm?: string) => 
    {   
        const query = customTerm ?? searchTerm;

        if (!query.trim()) {
        return;
        }

        setLoading(true);

        setResult(null);

        setError(false);

        try {
            // Guardar historial de búsqueda
            const { data: { user },
            } = await supabase.auth.getUser();

            console.log("USER:", user);

            if (!user) { 
            console.error("Usuario no autenticado");
            return;}

            const { error } = await supabase
            .from("search_history")
            .insert({
                user_id: user.id,
                query: query,
            });

            if (error) {
            console.log("ERROR COMPLETO:");
            console.log(error);
            }

            const historyData = await loadHistory();
            setHistory(historyData);

            // Llamadas a las apis

            const response = await fetch(
                `/api/search?q=${encodeURIComponent(query)}`
            ); 

            if (!response.ok) {
              throw new Error("Fallo en la búsqueda");
            }

            const data = await response.json();

            console.log(data);

            setResult({
                keyword: data.query,
                platforms: generatePlatforms(
                    data.wikipediaViews, 
                    data.newsMentions, 
                    data.youtubeViews,
                data.scoreGoogleTrends),
            });
        } catch {
          setError(true);
        } finally {
        setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-cream relative pt-9 px-4">

  <div className="flex justify-center">
    <span className="gap-2 flex items-center rounded-full border border-accent-border bg-accent-bg px-5 py-2 text-sm text-accent">
      <TrendingUp size={16} />
      POPULARIDAD EN TIEMPO REAL
    </span>
  </div>

  <h1 className="mt-4 text-center pt-2 text-3xl italic text-ink" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
    ¿Qué tan popular es...?
  </h1>

  <p className="mt-1 text-center text-base text-ink-soft pt-4">
    Buscamos en múltiples fuentes y te mostramos el impacto real
  </p>

  <div className="mt-7">
    <SearchHero
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      onSearch={handleSearch}
      history={history}
      loading={loading}
    />
  </div>

  {loading && (
    <>
      <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-line to-transparent" />
      <LoadingDashboard query={searchTerm} />
    </>
  )}

  { user && (
    <UserMenu
        avatarUrl={avatarUrl}
        userName={userName}
        email={email}
        onSignOut={async () => {
        await supabase.auth.signOut();
        router.push("/");
        }}
    />
    )}

    {error && !loading && (
      <>
        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-line to-transparent" />
        <SearchError query={searchTerm} onRetry={() => handleSearch()} />
      </>
    )}

  { result && (
    <div>
      <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-line to-transparent" />
      <ResultsDashboard result={result} />
    </div>
  )}

</main>
    );
}