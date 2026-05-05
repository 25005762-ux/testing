import type { ReactNode } from "react"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { TopNavbar } from "@/components/dashboard/TopNavbar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />

      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <TopNavbar />

        <div className="flex-1 p-6 space-y-6">{children}</div>
      </main>
    </div>
  )
}