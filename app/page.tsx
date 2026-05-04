"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

export default function Home() 
{
  const [user, setUser] = useState<User | null>(null);

  const loginWithGoogle = async () => 
    {
      await supabase.auth.signInWithOAuth
      ({
        provider: "google",
        options: 
        {
          redirectTo: "http://localhost:3000/auth/callback",
        },
      });
    };

  useEffect(() =>
  {
    const fetchUser = async () =>
  {
    const response = await supabase.auth.getUser();

    setUser(response.data.user);
  };

  fetchUser();
  }, []);

  const avatarUrl = user?.user_metadata?.avatar_url;
  const fullName = user?.user_metadata?.full_name;
  const [open, setOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
      {!user && (
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-black">
            ¡Bienvenido a mi primera página web!
          </h1>

          <p className="mt-2 text-gray-600">
            Por favor, regístrese antes de continuar.
          </p>
        </div>
      )}
      {!user && (
        <button
          onClick={loginWithGoogle}
          className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-6 py-3 text-black shadow-sm hover:bg-gray-100"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google logo"
            className="h-5 w-5"
          />

          <span>Continuar con Google</span>
        </button>
      )}
      {user && 
      (
        <div className="absolute right-6 top-6">
          <img
            src={avatarUrl || ""}
            alt="avatar"
            onClick={() => setOpen(true)}
            className="h-12 w-12 rounded-full cursor-pointer border-2 border-gray-300"
          />
        </div>
      )}
      {open && user && 
      (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="rounded-2xl bg-white p-6 text-black w-80 flex flex-col items-center gap-3">
            
            <img
              src={avatarUrl || ""}
              className="h-20 w-20 rounded-full"
            />

            <h2 className="text-lg font-semibold">
              {fullName || "Usuario"}
            </h2>

            <p className="text-sm text-gray-600">
              {user.email}
            </p>

            <button
              onClick={async () => {
                await supabase.auth.signOut();
                setUser(null);
                setOpen(false);
              }}
              className="mt-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Cerrar sesión
            </button>

            <button
              onClick={() => setOpen(false)}
              className="text-sm text-gray-500 mt-2"
            >
              Cerrar
            </button>

          </div>
        </div>
      )}
      {user && (
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-black">
            ¡Más funcionalidades cooming soon!
          </h1>
        </div>
      )}
    </main>
  );
}