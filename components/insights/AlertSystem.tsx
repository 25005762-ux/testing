"use client"

import { AlertCircle, AlertTriangle, CheckCircle2, Wrench, Eye, X } from "lucide-react"
import { alerts } from "@/lib/mockData"

export function AlertSystem() {
  const getAlertStyles = (type: string) => {
    switch (type) {
      case "critical":
        return {
          bg: "bg-destructive/10",
          border: "border-destructive/30",
          icon: AlertCircle,
          iconColor: "text-destructive",
          dot: "bg-destructive",
        }
      case "warning":
        return {
          bg: "bg-warning/10",
          border: "border-warning/30",
          icon: AlertTriangle,
          iconColor: "text-warning",
          dot: "bg-warning",
        }
      default:
        return {
          bg: "bg-success/10",
          border: "border-success/30",
          icon: CheckCircle2,
          iconColor: "text-success",
          dot: "bg-success",
        }
    }
  }

  const criticalCount = alerts.filter((a) => a.type === "critical").length
  const warningCount = alerts.filter((a) => a.type === "warning").length
  const successCount = alerts.filter((a) => a.type === "success").length

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Alerts & Predictions</h2>
          <p className="text-sm text-muted-foreground">Real-time system notifications</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-destructive/20 border border-destructive/30">
            <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            <span className="text-xs font-medium text-destructive">{criticalCount}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-warning/20 border border-warning/30">
            <div className="w-2 h-2 rounded-full bg-warning" />
            <span className="text-xs font-medium text-warning">{warningCount}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-success/20 border border-success/30">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span className="text-xs font-medium text-success">{successCount}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
        {alerts.map((alert) => {
          const styles = getAlertStyles(alert.type)
          const Icon = styles.icon

          return (
            <div
              key={alert.id}
              className={`p-4 rounded-xl ${styles.bg} ${styles.border} border transition-all hover:scale-[1.01]`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${styles.bg} ${styles.iconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`text-sm font-medium ${styles.iconColor}`}>{alert.title}</h4>
                    <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{alert.message}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {alert.actions.map((action, i) => (
                      <button
                        key={i}
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                          i === 0
                            ? `${styles.bg} ${styles.iconColor} hover:opacity-80`
                            : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }`}
                      >
                        {i === 0 && action.includes("Fix") && <Wrench className="w-3 h-3" />}
                        {action.includes("View") && <Eye className="w-3 h-3" />}
                        {action.includes("Ignore") || action.includes("Dismiss") ? <X className="w-3 h-3" /> : null}
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}