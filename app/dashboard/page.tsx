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

export type SearchResult = {
  keyword: string;
  platforms: PlatformCardProps[];
};

export default function DashboardPage() {
    
    /* const router = useRouter();

    const [user, setUser] = useState<User | null>(null); */
    /* const [open, setOpen] = useState(false); */

    //Estado para la barra de búsqueda
    const [searchTerm, setSearchTerm] = useState("");

    //Estado para renderizar el resultado
    const [result, setResult] = useState<SearchResult | null>(null);

    /* useEffect(() => 
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
 */
    /* const avatarUrl = user?.user_metadata?.avatar_url;
    const userName = user?.user_metadata?.full_name;
    const email = user?.email; */

    //Función que actualiza los resultados de la búqueda
    const handleSearch = async () => 
    {
        const response = await fetch(
            `/api/search?q=${encodeURIComponent(searchTerm)}`
        ); 

        const data = await response.json();

        console.log(data);

        setResult({
            keyword: data.query,
            platforms: generatePlatforms(
                data.wikipediaViews, 
                data.newsMentions, 
                data.youtubeViews),
        });
    };

    return (
        <main className="min-h-screen bg-[#070b1a]">
        
        <div className="flex justify-center">
            <span className="gap-2 flex rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm text-blue-400">
              <TrendingUp size={16} />
              POPULARIDAD EN TIEMPO REAL
            </span>
        </div>

        <h1 className="mt-4 text-center text-2xl font-bold text-slate-100">
            ¿Qué tan popular es...?
        </h1>

        <p className="mt-1 text-center text-m text-slate-400">
            Buscamos en múltiples fuentes y te mostramos el impacto real
        </p>

        <div className="mt-7">
            <SearchHero
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSearch={handleSearch} />
        </div>

        
        {/* {user && (
            <div className="absolute top-6 right-6">
            <img
            src={avatarUrl || ""}
            alt="Avatar"
            onClick={() => setOpen(true)}
            className="h-12 w-12 rounded-full cursor-pointer border-2 border-gray-300"
            />
        </div>
        )}

        {open && user && (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/60"
            onClick={() => setOpen(false)}
        >
            <div
            className="bg-white rounded-2xl p-6 w-80 flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
            >
            <img
            src={avatarUrl || ""}
            alt="Avatar"
            className="h-20 w-20 rounded-full"
            />

            <h2 className="text-lg font-semibold text-gray-600">
            {userName}
            </h2>

            <p className="text-sm text-black">
            {email}
            </p>
            <button
            onClick={async () => {
                await supabase.auth.signOut();
                router.push("/");
            }}
            className="mt-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
            Cerrar sesión
            </button>
            <button
            onClick={() => setOpen(false)}
            className="text-sm text-gray-500"
            >
            Cerrar
            </button>

            </div>
            
        </div>
        )} */}

        {result && (
          <div>
          <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-slate-500 to-transparent" />
          <ResultsDashboard result = {result}/>
          </div>
        )}

        </main>
    );
}