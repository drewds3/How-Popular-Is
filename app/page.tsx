"use client";

import { supabase } from "@/lib/supabaseClient";

import { PopularityGauge } from "@/components/login/PopularityGauge";
import { GoogleButton } from "@/components/login/GoogleButton";
import { useState } from "react";

export default function Home() 
{
  const [loading, setLoading] = useState(false);

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <main className="flex min-h-screen  justify-center bg-cream px-5 pt-14">
      <div className="w-full max-w-[420px] text-center">
        <PopularityGauge score={94} label="Icónico" />

        <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Medidor de fama
        </p>

        <h1 className="mb-3.5 font-display text-[44px] italic leading-[1.05] text-ink">
          How Popular Is?
        </h1>

        <p className="mx-auto mb-9 max-w-[340px] text-base leading-relaxed text-ink-soft">
          Descubre la popularidad de cualquier persona, marca, artista o tema.
        </p>

        <GoogleButton onClick={loginWithGoogle} loading={loading} />

      </div>
    </main>
  );
}