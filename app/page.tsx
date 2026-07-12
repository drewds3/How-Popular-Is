"use client";

import { supabase } from "@/lib/supabaseClient";

export default function Home() 
{

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
      {(
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-black">
            How Popular Is?
          </h1>

          <p className="mt-2 text-gray-600">
            Descubre la popularidad de cualquier persona, marca, artista o tema.
          </p>
        </div>
      )}
      {(
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
    </main>
  );
}