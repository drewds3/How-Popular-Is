"use client";

import { useState } from "react";
import SummaryCard from "./SummaryCard";
import Tabs from "./Tabs";
import AnalyticsSection from "./AnalyticsSection";
import type { SearchResult } from "@/app/dashboard/page";

export type PlatformsProps = {
  result: SearchResult;
};

export default function ResultsDashboard({ result }: PlatformsProps) {
  const [activeTab, setActiveTab] = useState("Resumen");

  return (
    <section className="mt-10">
      <div className="mb-8 flex justify-between px-4">
        <div>
          <p className="mb-4 text-sm uppercase tracking-wider text-ink-muted">
            Resultados para
          </p>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="self-start rounded-full border border-accent-border bg-accent-bg px-4 py-1 text-accent">
          {result.keyword}
        </div>
      </div>

      {activeTab === "Resumen" && (
        <>
          <SummaryCard keyword={result.keyword} platforms={result.platforms} />
          <AnalyticsSection result={result} />
        </>
      )}

      {activeTab === "Por plataforma" && (
        <div className="rounded-3xl border border-line p-8 text-ink-soft">Próximamente...</div>
      )}

      {activeTab === "Tendencia" && (
        <div className="rounded-3xl border border-line p-8 text-ink-soft">Próximamente...</div>
      )}
    </section>
  );
}