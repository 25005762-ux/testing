import { OverviewDashboard } from "@/components/dashboard/OverviewDashboard"
import WaterDashboard from "@/components/environment/WaterDashboard";

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* 1. Member 1 的顶部概览组件 (保持原样) */}
      <div className="w-full">
        <OverviewDashboard />
      </div>
      
      {/* 2. 视觉分割线：区分全局概览和你负责的垂直领域系统 */}
      <div className="max-w-6xl mx-auto w-full px-6">
        <hr className="border-slate-200" />
      </div>

      {/* 3. Member 3: Water & Environment System (你更新后的核心组件) */}
      <div className="flex-1 pb-12">
        <WaterDashboard />
      </div>
    </div>
  );
}