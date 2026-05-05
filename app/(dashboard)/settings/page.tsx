export default function SettingsPage() {
  return (
    <div className="glass-card rounded-2xl p-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">System preferences and dashboard configuration</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border/50 bg-secondary/20 p-4">
          <p className="text-sm font-medium text-foreground">Notifications</p>
          <p className="text-xs text-muted-foreground mt-1">Alert frequency, thresholds, and delivery settings.</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-secondary/20 p-4">
          <p className="text-sm font-medium text-foreground">Display</p>
          <p className="text-xs text-muted-foreground mt-1">Dashboard density, theme, and data refresh preferences.</p>
        </div>
      </div>
    </div>
  )
}