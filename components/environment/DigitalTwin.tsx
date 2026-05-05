"use client"

import { useState, useEffect } from "react"
import { Leaf, Droplets, Zap, ThermometerSun, Fish } from "lucide-react"
import { farmLayers } from "@/lib/mockData"

export function DigitalTwin() {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null)
  const [flowAnimation, setFlowAnimation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setFlowAnimation((prev) => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const getHealthColor = (health: number) => {
    if (health >= 85) return "text-success bg-success/20 border-success/30"
    if (health >= 70) return "text-warning bg-warning/20 border-warning/30"
    return "text-destructive bg-destructive/20 border-destructive/30"
  }

  const getHealthGlow = (health: number) => {
    if (health >= 85) return "shadow-[0_0_10px_rgba(34,197,94,0.5)]"
    if (health >= 70) return "shadow-[0_0_10px_rgba(234,179,8,0.5)]"
    return "shadow-[0_0_10px_rgba(239,68,68,0.5)]"
  }

  return (
    <div className="glass-card rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Farm Digital Twin</h2>
          <p className="text-sm text-muted-foreground">Real-time System Visualization</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-green/20 border border-neon-green/30">
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="text-xs font-medium text-neon-green">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 relative">
          <div className="space-y-2">
            {farmLayers.map((layer) => (
              <div
                key={layer.id}
                onClick={() => setSelectedLayer(selectedLayer === layer.id ? null : layer.id)}
                className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                  selectedLayer === layer.id
                    ? "bg-neon-green/10 border-neon-green/50 " + getHealthGlow(layer.health)
                    : "bg-secondary/30 border-border/50 hover:bg-secondary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getHealthColor(layer.health)} border`}>
                      <Leaf className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{layer.name}</p>
                      <p className="text-xs text-muted-foreground">{layer.plants}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-warning" />
                      <span className="text-xs text-muted-foreground">{layer.light}%</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Droplets className="w-3.5 h-3.5 text-neon-aqua" />
                      <span className="text-xs text-muted-foreground">{layer.moisture}%</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthColor(layer.health)} border`}>
                      {layer.health}%
                    </div>
                  </div>
                </div>

                {selectedLayer === layer.id && (
                  <div className="mt-4 pt-4 border-t border-border/30 grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">Light Intensity</p>
                      <div className="h-2 rounded-full bg-secondary/50 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-warning to-warning/60 rounded-full"
                          style={{ width: `${layer.light}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">Moisture Level</p>
                      <div className="h-2 rounded-full bg-secondary/50 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-neon-aqua to-neon-aqua/60 rounded-full"
                          style={{ width: `${layer.moisture}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">Health Score</p>
                      <div className="h-2 rounded-full bg-secondary/50 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-success to-success/60 rounded-full"
                          style={{ width: `${layer.health}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-neon-blue/20 flex items-center justify-center animate-pulse-glow text-neon-blue">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-neon-blue">UV Sterilization Active</p>
                <p className="text-xs text-muted-foreground">Cycle 3 of 5 • 85% Complete</p>
              </div>
            </div>
            <div className="w-24 h-2 rounded-full bg-secondary/50 overflow-hidden">
              <div className="h-full w-[85%] bg-gradient-to-r from-neon-blue to-neon-aqua rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-card rounded-xl p-4 bg-gradient-to-br from-neon-aqua/10 to-neon-blue/5 border border-neon-aqua/30">
            <div className="flex items-center gap-2 mb-4">
              <Fish className="w-5 h-5 text-neon-aqua" />
              <h3 className="font-medium text-neon-aqua">Aquaponics System</h3>
            </div>

            <div className="relative h-32 rounded-xl bg-gradient-to-b from-neon-blue/20 to-neon-aqua/30 border border-neon-aqua/20 overflow-hidden mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 200 100">
                  <path
                    d="M 10 50 Q 50 30 100 50 T 190 50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-neon-aqua/50"
                    strokeDasharray="10 5"
                    style={{ strokeDashoffset: -flowAnimation }}
                  />
                  <path
                    d="M 10 60 Q 50 80 100 60 T 190 60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-neon-aqua/30"
                    strokeDasharray="10 5"
                    style={{ strokeDashoffset: flowAnimation }}
                  />
                </svg>
              </div>

              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-float"
                  style={{
                    left: `${20 + i * 20}%`,
                    top: `${30 + (i % 2) * 30}%`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                >
                  <Fish className="w-4 h-4 text-neon-aqua" style={{ transform: i % 2 === 0 ? "scaleX(-1)" : "scaleX(1)" }} />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Ammonia → Nitrate</span>
                <span className="text-neon-green font-medium">Converting</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 rounded-full bg-secondary/50 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-warning via-neon-aqua to-neon-green rounded-full"
                    style={{ width: "78%" }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">78%</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Droplets className="w-4 h-4 text-neon-aqua" />
              <h4 className="text-sm font-medium">Water Circulation</h4>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Flow Rate</span>
                <span className="text-xs font-medium text-neon-aqua">2.4 L/min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Temperature</span>
                <span className="text-xs font-medium text-success">24°C</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Dissolved O₂</span>
                <span className="text-xs font-medium text-neon-green">8.2 mg/L</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <ThermometerSun className="w-4 h-4 text-warning" />
              <h4 className="text-sm font-medium">Environment</h4>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 rounded-lg bg-secondary/30">
                <p className="text-lg font-bold text-warning">26°C</p>
                <p className="text-xs text-muted-foreground">Air Temp</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-secondary/30">
                <p className="text-lg font-bold text-neon-aqua">68%</p>
                <p className="text-xs text-muted-foreground">Humidity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}