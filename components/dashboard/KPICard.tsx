"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface KPICardProps {
  title: string
  value: number
  icon: React.ReactNode
  trend: number
  color: "green" | "aqua" | "blue" | "yellow"
  unit?: string
}

export function KPICard({ title, value, icon, trend, color, unit = "" }: KPICardProps) {
  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    const duration = 1500
    const steps = 60
    const stepValue = value / steps
    let current = 0
    const interval = setInterval(() => {
      current += stepValue
      if (current >= value) {
        setAnimatedValue(value)
        clearInterval(interval)
      } else {
        setAnimatedValue(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(interval)
  }, [value])

  const colorClasses = {
    green: {
      ring: "stroke-neon-green",
      glow: "neon-green-glow",
      bg: "from-neon-green/20 to-neon-green/5",
      text: "text-neon-green",
    },
    aqua: {
      ring: "stroke-neon-aqua",
      glow: "neon-aqua-glow",
      bg: "from-neon-aqua/20 to-neon-aqua/5",
      text: "text-neon-aqua",
    },
    blue: {
      ring: "stroke-neon-blue",
      glow: "neon-blue-glow",
      bg: "from-neon-blue/20 to-neon-blue/5",
      text: "text-neon-blue",
    },
    yellow: {
      ring: "stroke-warning",
      glow: "",
      bg: "from-warning/20 to-warning/5",
      text: "text-warning",
    },
  }

  const colors = colorClasses[color]
  const circumference = 2 * Math.PI * 40
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference

  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-50`} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg bg-secondary/50 ${colors.text}`}>{icon}</div>
          <div className="flex items-center gap-1 text-sm">
            {trend > 0 ? (
              <TrendingUp className="w-4 h-4 text-success" />
            ) : trend < 0 ? (
              <TrendingDown className="w-4 h-4 text-destructive" />
            ) : (
              <Minus className="w-4 h-4 text-muted-foreground" />
            )}
            <span className={trend > 0 ? "text-success" : trend < 0 ? "text-destructive" : "text-muted-foreground"}>
              {trend > 0 ? "+" : ""}{trend}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-secondary/30"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                className={`${colors.ring} transition-all duration-1000 ease-out`}
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset,
                  filter: "drop-shadow(0 0 6px currentColor)",
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-2xl font-bold ${colors.text}`}>
                {animatedValue}{unit}
              </span>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
            <div className="h-8 flex items-end gap-1">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full ${colors.text} opacity-60`}
                  style={{
                    height: `${Math.random() * 24 + 8}px`,
                    opacity: 0.3 + Math.random() * 0.5,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}