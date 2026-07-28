"use client"

import { useState } from "react"
import SummaryCard from "./SummaryCard"
import Tabs from "./Tabs"
import AnalyticsSection from "./AnalyticsSection"

import type {SearchResult} from "@/app/dashboard/page"

export type PlatformsProps = {
  result: SearchResult;
}

export default function ResultsDashboard({
  result
}: PlatformsProps) {
  const [activeTab, setActiveTab] =
    useState("Resumen")

  return (
    <section className="mt-10">

      <div className="mb-8 flex justify-between px-4">
        <div>
          <p className="mb-4 text-sm uppercase tracking-wider text-slate-500">
            Resultados para
          </p>

          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        <div className="self-start rounded-full border border-blue-500/30 bg-blue-500/10 px-4 text-blue-400">
          {result.keyword}
        </div>
      </div>

      {activeTab === "Resumen" && (
        <>
        <SummaryCard
          keyword={result.keyword}
          score={85}
          trend={12}
        />

        <AnalyticsSection
          result = {result}/>
        </>
      )}

      {activeTab === "Por plataforma" && (
        <div className="rounded-3xl border border-slate-800 p-8">
          Próximamente...
        </div>
      )}

      {activeTab === "Tendencia" && (
        <div className="rounded-3xl border border-slate-800 p-8">
          Próximamente...
        </div>
      )}
    </section>
  )
}