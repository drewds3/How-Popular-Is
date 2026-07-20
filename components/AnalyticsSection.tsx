import PlatformsGrid from "./PlatformsGrid"
import TrendChart from "./TrendChart"

export default function AnalyticsSection() {
  return (
    <div className="mt-8 space-y-6">
      <PlatformsGrid />
      <TrendChart />
    </div>
  )
}