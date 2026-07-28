import PlatformsGrid from "./PlatformsGrid"
import TrendChart from "./TrendChart"

import type {PlatformsProps} from "./ResultsDashboard"

export default function AnalyticsSection(
  result : PlatformsProps) 
  {
    return (
      <div className="mt-8 space-y-6">
        <PlatformsGrid 
        platforms = {result.result.platforms}/>
       {/*  <TrendChart /> */}
      </div>
    )
}