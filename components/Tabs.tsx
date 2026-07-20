type TabsProps = {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function Tabs({
  activeTab,
  setActiveTab,
}: TabsProps) {
  const tabs = [
    "Resumen",
    "Por plataforma",
    "Tendencia",
  ]

  return (
    <div className="flex gap-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-2 transition ${
            activeTab === tab
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-slate-400 hover:text-white"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}