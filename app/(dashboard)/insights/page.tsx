import { AIRecommendationPanel } from "@/components/insights/AIRecommendationPanel"
import { AlertSystem } from "@/components/insights/AlertSystem"

export default function InsightsPage() {
  return (
    <>
      <AlertSystem />
      <AIRecommendationPanel />
    </>
  )
}