'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  Droplets,
  Leaf,
  Lightbulb,
  LineChart,
  Settings,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      label: 'Overview',
      href: '/overview',
      icon: BarChart3,
    },
    {
      label: 'Plant AI',
      href: '/plant-ai',
      icon: Leaf,
    },
    {
      label: 'Water System',
      href: '/water-system',
      icon: Droplets,
    },
    {
      label: 'Environment',
      href: '/environment',
      icon: Zap,
    },
    {
      label: 'Insights',
      href: '/insights',
      icon: Lightbulb,
    },
    {
      label: 'Analytics',
      href: '/analytics',
      icon: LineChart,
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ]

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-neon-aqua/20 flex flex-col h-screen sticky top-0">
      {/* Logo Section */}
      <div className="p-6 border-b border-neon-aqua/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-neon-aqua to-neon-green rounded-lg flex items-center justify-center">
            <Droplets className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-neon-aqua to-neon-green bg-clip-text text-transparent">
              AquaVita
            </h1>
            <p className="text-xs text-slate-400">Smart Farming</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300',
                isActive
                  ? 'bg-gradient-to-r from-neon-aqua/20 to-neon-green/20 text-neon-aqua border border-neon-aqua/50 shadow-[0_0_20px_rgba(0,_229,_200,_0.3)]'
                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-neon-aqua border border-transparent'
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-neon-aqua/20 bg-slate-950/50">
        <div className="text-xs text-slate-400 text-center">
          <p>v1.0.0</p>
          <p className="text-slate-500">Powered by AquaVita</p>
        </div>
      </div>
    </aside>
  )
}
