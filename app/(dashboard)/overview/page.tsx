import { OverviewDashboard } from "@/components/dashboard/OverviewDashboard"
import WaterDashboard from "@/components/environment/WaterDashboard";

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* 1. Member 1 Component */}
      <div className="w-full z-0">
        <OverviewDashboard />
      </div>
      
      {/* 2. Visual Divider */}
      <div className="max-w-6xl mx-auto w-full px-6 py-8">
        <hr className="border-slate-200" />
      </div>

      {/* 3. Member 3 Component (Added extra padding to prevent header overlap) */}
      <div className="flex-1 pb-20 px-6">
        <WaterDashboard />
      </div>
    </div>
  );
}