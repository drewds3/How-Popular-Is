"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

export default function DashboardPage() {
    
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [open, setOpen] = useState(false);

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

    const avatarUrl = user?.user_metadata?.avatar_url;
    const userName = user?.user_metadata?.full_name;
    const email = user?.email;

    return (
        <main className="p-8">
        <h1 className="text-3xl font-bold">
            Dashboard
        </h1>

        <p className="mt-4">
            Bienvenido, {userName}
        </p>

        {user && (
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
        )}
        </main>
    );
}