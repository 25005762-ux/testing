import { AIRecommendationPanel } from "@/components/insights/AIRecommendationPanel"
import { AlertSystem } from "@/components/insights/AlertSystem"
import { WasteToFertilizerPanel } from "@/components/insights/WasteToFertilizerPanel"

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <AlertSystem />
      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <AIRecommendationPanel />
        <WasteToFertilizerPanel />
      </div>
    </div>
  )
}