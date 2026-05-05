"use client"

import { useState } from "react"
import { Sparkles, Send, ChevronDown, ChevronUp } from "lucide-react"
import { aiInsights } from "@/lib/mockData"

export function AIRecommendationPanel() {
  const [message, setMessage] = useState("")
  const [expanded, setExpanded] = useState(true)
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "ai"; content: string }[]>([
    { role: "ai", content: "Hello! I'm your AquaVita AI Advisor. Ask me anything about your farm's performance, plant health, or optimization strategies." },
  ])

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-warning/10 border-warning/30 text-warning"
      case "alert":
        return "bg-destructive/10 border-destructive/30 text-destructive"
      case "suggestion":
        return "bg-neon-green/10 border-neon-green/30 text-neon-green"
      default:
        return "bg-neon-aqua/10 border-neon-aqua/30 text-neon-aqua"
    }
  }

  const handleSend = () => {
    if (!message.trim()) return

    setChatHistory((prev) => [
      ...prev,
      { role: "user", content: message },
      {
        role: "ai",
        content: `Based on current sensor data, ${message.toLowerCase().includes("slow") ? "the slower growth rate in Layer 3 is likely due to suboptimal light exposure. I recommend increasing LED intensity by 15% during the 6AM-10AM window." : "your system is performing well. Current pH levels are optimal at 6.2, and nutrient concentrations are within ideal ranges."}`,
      },
    ])
    setMessage("")
  }

  return (
    <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-green to-neon-aqua flex items-center justify-center animate-pulse-glow">
            <Sparkles className="w-5 h-5 text-background" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">AquaVita AI Advisor</h2>
            <p className="text-xs text-muted-foreground">Powered by Plant Intelligence</p>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 rounded-lg hover:bg-secondary/50 transition-colors text-muted-foreground"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {expanded && (
        <>
          <div className="space-y-3 mb-4 flex-1 overflow-y-auto max-h-64">
            {aiInsights.map((insight) => (
              <div
                key={insight.id}
                className={`p-3 rounded-xl border ${getTypeStyles(insight.type)} transition-all hover:scale-[1.01]`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-current/10">
                    <insight.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium">{insight.title}</h4>
                      <span className="text-xs opacity-60">{insight.timestamp}</span>
                    </div>
                    <p className="text-xs opacity-80 mb-2">{insight.message}</p>
                    <button className="text-xs font-medium px-2 py-1 rounded-md bg-current/10 hover:bg-current/20 transition-colors">
                      {insight.action}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border/30 pt-4 mt-auto">
            <div className="max-h-32 overflow-y-auto mb-3 space-y-2">
              {chatHistory.slice(-4).map((chat, i) => (
                <div
                  key={i}
                  className={`text-xs p-2 rounded-lg ${
                    chat.role === "user"
                      ? "bg-neon-green/10 text-neon-green ml-8"
                      : "bg-secondary/50 text-foreground mr-8"
                  }`}
                >
                  {chat.content}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about your farm..."
                className="flex-1 bg-secondary/30 border border-border/50 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-neon-green/50 transition-colors placeholder:text-muted-foreground"
              />
              <button
                onClick={handleSend}
                className="p-2.5 rounded-xl bg-gradient-to-r from-neon-green to-neon-aqua text-background hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}