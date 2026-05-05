"use client"

import { useEffect, useState } from "react"
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  History,
  Leaf,
  Plus,
  Recycle,
  Sparkles,
  TriangleAlert,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  cropOptions,
  generateWasteRecommendation,
  type CropType,
  type WasteRecommendation,
  wasteOptions,
} from "@/lib/wasteAI"
import { cn } from "@/lib/utils"

type SavedRecommendation = WasteRecommendation & { id: string }

const historyStorageKey = "aquavita-waste-fertilizer-history"

function formatDateTime(value: string) {
  return new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

function badgeToneClass(tone: WasteRecommendation["suitabilityTone"]) {
  switch (tone) {
    case "good":
      return "border-success/30 bg-success/10 text-success"
    case "moderate":
      return "border-warning/30 bg-warning/10 text-warning"
    default:
      return "border-destructive/30 bg-destructive/10 text-destructive"
  }
}

function levelColor(level: string) {
  switch (level) {
    case "High":
      return "text-success"
    case "Medium":
      return "text-warning"
    default:
      return "text-muted-foreground"
  }
}

export function WasteToFertilizerPanel() {
  const [selectedWastes, setSelectedWastes] = useState<string[]>(["vegetable scraps", "banana peel"])
  const [customWaste, setCustomWaste] = useState("")
  const [cropType, setCropType] = useState<CropType>("lettuce")
  const [result, setResult] = useState<WasteRecommendation | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [history, setHistory] = useState<SavedRecommendation[]>([])

  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const stored = window.localStorage.getItem(historyStorageKey)
      if (!stored) return

      const parsed = JSON.parse(stored) as SavedRecommendation[]
      setHistory(parsed)
    } catch {
      setHistory([])
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(historyStorageKey, JSON.stringify(history.slice(0, 12)))
  }, [history])

  useEffect(() => {
    if (!result) {
      setShowResult(false)
      return
    }

    const frame = window.requestAnimationFrame(() => setShowResult(true))
    return () => window.cancelAnimationFrame(frame)
  }, [result])

  const toggleWaste = (value: string) => {
    setSelectedWastes((current) =>
      current.some((item) => item.toLowerCase() === value.toLowerCase())
        ? current.filter((item) => item.toLowerCase() !== value.toLowerCase())
        : [...current, value],
    )
  }

  const addCustomWaste = () => {
    const trimmed = customWaste.trim()
    if (!trimmed) return

    setSelectedWastes((current) =>
      current.some((item) => item.toLowerCase() === trimmed.toLowerCase()) ? current : [...current, trimmed],
    )
    setCustomWaste("")
  }

  const handleGenerate = () => {
    if (!selectedWastes.length) return

    setIsGenerating(true)
    setShowResult(false)

    window.setTimeout(() => {
      const nextResult = generateWasteRecommendation(selectedWastes, cropType)
      setResult(nextResult)
      setHistory((current) => [
        {
          ...nextResult,
          id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        },
        ...current,
      ])
      setIsGenerating(false)
    }, 450)
  }

  const cropTrendCards = cropOptions
    .map((option) => {
      const entries = history.filter((item) => item.cropType === option.id)
      const averageScore = entries.length
        ? Math.round(entries.reduce((sum, item) => sum + item.cropScore, 0) / entries.length)
        : 0

      return {
        label: option.label,
        count: entries.length,
        averageScore,
      }
    })
    .sort((a, b) => b.averageScore - a.averageScore)

  const topRecommendation = history[0]

  return (
    <Card className="glass-card relative overflow-hidden rounded-3xl border-border/50 shadow-2xl shadow-neon-aqua/10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,229,200,0.14),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(124,240,134,0.12),_transparent_40%)]" />
      <CardHeader className="relative pb-0">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-neon-aqua/25 bg-neon-aqua/10 px-3 py-1 text-xs font-medium text-neon-aqua">
              <Sparkles className="h-3.5 w-3.5" />
              AquaVita AI Engine
            </div>
            <CardTitle className="text-2xl text-foreground">Waste to Fertilizer Recommendation Studio</CardTitle>
            <CardDescription className="max-w-2xl text-sm text-muted-foreground">
              Simulate circular agriculture waste recycling and convert farm scraps into a crop-aware fertilizer plan.
            </CardDescription>
          </div>
          <div className="hidden items-center gap-2 rounded-2xl border border-border/60 bg-background/40 px-4 py-3 backdrop-blur-sm sm:flex">
            <Recycle className="h-4 w-4 text-neon-green" />
            <div>
              <p className="text-xs text-muted-foreground">Live simulation</p>
              <p className="text-sm font-semibold text-foreground">No backend needed</p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative pt-6">
        <Tabs defaultValue="recommendation" className="w-full">
          <TabsList className="mb-6 grid h-auto w-full grid-cols-2 bg-secondary/40 p-1">
            <TabsTrigger value="recommendation" className="rounded-lg text-sm data-[state=active]:bg-background">
              Recommendation
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-lg text-sm data-[state=active]:bg-background">
              AI Insight History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommendation" className="space-y-6 outline-none">
            <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-5 rounded-2xl border border-border/50 bg-background/30 p-5 backdrop-blur-sm">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Recycle className="h-4 w-4 text-neon-green" />
                    Input agricultural waste materials
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Select one or more waste sources, or add your own local residue for a custom simulation.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {wasteOptions.map((option) => {
                    const active = selectedWastes.some((item) => item.toLowerCase() === option.id)
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => toggleWaste(option.id)}
                        className={cn(
                          "rounded-xl border px-3 py-3 text-left text-sm transition-all duration-200 hover:-translate-y-0.5",
                          active
                            ? "border-neon-green/40 bg-neon-green/10 text-neon-green shadow-[0_0_20px_rgba(124,240,134,0.15)]"
                            : "border-border/60 bg-secondary/20 text-foreground hover:border-neon-aqua/30 hover:bg-secondary/40",
                        )}
                      >
                        <span className="block font-medium">{option.label}</span>
                        <span className="mt-1 block text-[11px] text-muted-foreground">
                          {active ? "Selected" : "Tap to add"}
                        </span>
                      </button>
                    )
                  })}
                </div>

                <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                  <Input
                    value={customWaste}
                    onChange={(event) => setCustomWaste(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault()
                        addCustomWaste()
                      }
                    }}
                    placeholder="Add custom waste material"
                    className="bg-background/40"
                  />
                  <Button type="button" onClick={addCustomWaste} variant="outline" className="border-neon-aqua/30">
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedWastes.map((waste) => (
                    <button
                      key={waste}
                      type="button"
                      onClick={() => toggleWaste(waste)}
                      className="inline-flex items-center gap-2 rounded-full border border-neon-aqua/25 bg-neon-aqua/10 px-3 py-1.5 text-xs font-medium text-neon-aqua transition-colors hover:bg-neon-aqua/20"
                    >
                      {waste}
                      <X className="h-3 w-3" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-5 rounded-2xl border border-border/50 bg-background/30 p-5 backdrop-blur-sm">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Leaf className="h-4 w-4 text-neon-aqua" />
                    Select target crop
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Choose the crop you want to optimize for and the engine will score the blend.
                  </p>
                </div>

                <div className="space-y-2">
                  <Select value={cropType} onValueChange={(value) => setCropType(value as CropType)}>
                    <SelectTrigger className="w-full bg-background/40">
                      <SelectValue placeholder="Choose crop" />
                    </SelectTrigger>
                    <SelectContent>
                      {cropOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-neon-green/8 via-neon-aqua/5 to-transparent p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Selected crop</p>
                      <h3 className="text-xl font-semibold text-foreground">
                        {cropOptions.find((option) => option.id === cropType)?.label}
                      </h3>
                    </div>
                    <div className="rounded-2xl border border-neon-aqua/25 bg-background/50 px-4 py-3 text-right">
                      <p className="text-xs text-muted-foreground">Waste inputs</p>
                      <p className="text-lg font-semibold text-neon-aqua">{selectedWastes.length}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedWastes.length ? (
                      selectedWastes.map((waste) => (
                        <span
                          key={waste}
                          className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs text-muted-foreground"
                        >
                          {waste}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground">No waste selected yet.</span>
                    )}
                  </div>

                  <Button
                    type="button"
                    onClick={handleGenerate}
                    disabled={!selectedWastes.length || isGenerating}
                    className="mt-4 w-full bg-gradient-to-r from-neon-green via-neon-aqua to-neon-blue text-background hover:opacity-95"
                  >
                    {isGenerating ? 'Generating recommendation...' : 'Generate Recommendation'}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div
              className={cn(
                'grid gap-6 xl:grid-cols-[1.05fr_0.95fr] transition-all duration-500',
                result && showResult ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
              )}
            >
              <div className="rounded-2xl border border-border/50 bg-background/35 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Recommendation output</p>
                    <h3 className="mt-1 text-xl font-semibold text-foreground">Fertilizer Type Recommendation</h3>
                  </div>
                  {result ? (
                    <div
                      className={cn(
                        'rounded-full border px-3 py-1 text-xs font-medium',
                        badgeToneClass(result.suitabilityTone),
                      )}
                    >
                      {result.summary}
                    </div>
                  ) : null}
                </div>

                <div className="mt-5 rounded-2xl border border-neon-aqua/20 bg-gradient-to-br from-neon-aqua/10 via-transparent to-neon-green/10 p-5">
                  <p className="text-sm text-muted-foreground">Recommended blend</p>
                  <h4 className="mt-1 text-2xl font-semibold text-foreground">
                    {result?.fertilizerType ?? 'Waiting for simulation'}
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {result?.summary ?? 'Choose wastes and a crop, then generate the recommendation to reveal the result.'}
                  </p>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {result
                    ? [
                        { label: 'Nitrogen (N)', value: result.nutrientProfile.nitrogen },
                        { label: 'Phosphorus (P)', value: result.nutrientProfile.phosphorus },
                        { label: 'Potassium (K)', value: result.nutrientProfile.potassium },
                      ].map((item) => (
                        <div key={item.label} className="rounded-xl border border-border/50 bg-background/40 p-4">
                          <p className="text-xs text-muted-foreground">{item.label}</p>
                          <p className={cn('mt-2 text-lg font-semibold', levelColor(item.value))}>{item.value}</p>
                        </div>
                      ))
                    : [
                        { label: 'Nitrogen (N)', value: 'Low' },
                        { label: 'Phosphorus (P)', value: 'Low' },
                        { label: 'Potassium (K)', value: 'Low' },
                      ].map((item) => (
                        <div key={item.label} className="rounded-xl border border-border/50 bg-background/40 p-4">
                          <p className="text-xs text-muted-foreground">{item.label}</p>
                          <p className="mt-2 text-lg font-semibold text-muted-foreground">{item.value}</p>
                        </div>
                      ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border/50 bg-background/35 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Crop score</p>
                    <h3 className="mt-1 text-xl font-semibold text-foreground">Best Crop Match Score</h3>
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-background/50 px-4 py-3">
                    <span className="text-2xl font-bold text-neon-green">{result ? `${result.cropScore}%` : '--'}</span>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-neon-green/20 bg-neon-green/10 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-neon-green">
                    <CheckCircle2 className="h-4 w-4" />
                    {result?.summary ?? 'Generate a result to see crop suitability.'}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {result?.cropLabel
                      ? `Highly tuned for ${result.cropLabel} in a circular farming workflow.`
                      : 'The AI-style score is derived from selected waste composition and crop demand.'}
                  </p>
                </div>

                <div className="mt-4 space-y-3">
                  <h4 className="text-sm font-semibold text-foreground">Warning / Insight Section</h4>
                  <div className="space-y-2">
                    {result ? (
                      result.warnings.length ? (
                        result.warnings.map((warning) => (
                          <div
                            key={warning}
                            className="flex items-start gap-3 rounded-xl border border-warning/20 bg-warning/10 p-3 text-sm text-warning"
                          >
                            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                            <span>{warning}</span>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-xl border border-success/20 bg-success/10 p-3 text-sm text-success">
                          No major warnings detected for this blend.
                        </div>
                      )
                    ) : (
                      <div className="rounded-xl border border-border/50 bg-background/40 p-3 text-sm text-muted-foreground">
                        Results will appear here after you generate a recommendation.
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 pt-2">
                    {result?.insights?.map((insight) => (
                      <div
                        key={insight}
                        className="flex items-start gap-3 rounded-xl border border-neon-aqua/20 bg-neon-aqua/10 p-3 text-sm text-neon-aqua"
                      >
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-border/50 bg-secondary/20 p-4 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Real-world context:</span> This simulation supports circular agriculture waste recycling for sustainable urban farming.
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6 outline-none">
            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-2xl border border-border/50 bg-background/35 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <History className="h-4 w-4 text-neon-aqua" />
                  AI Insight History
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Store previous waste-to-fertilizer recommendations and review which crop targets perform best.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border/50 bg-background/40 p-4">
                    <p className="text-xs text-muted-foreground">Saved recommendations</p>
                    <p className="mt-2 text-2xl font-bold text-neon-green">{history.length}</p>
                  </div>
                  <div className="rounded-xl border border-border/50 bg-background/40 p-4">
                    <p className="text-xs text-muted-foreground">Top score</p>
                    <p className="mt-2 text-2xl font-bold text-neon-aqua">
                      {topRecommendation ? `${topRecommendation.cropScore}%` : '--'}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-neon-aqua/20 bg-neon-aqua/10 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">What is working best</p>
                  {cropTrendCards.filter((card) => card.count > 0).length ? (
                    <div className="mt-3 space-y-3">
                      {cropTrendCards
                        .filter((card) => card.count > 0)
                        .slice(0, 3)
                        .map((card) => (
                          <div key={card.label}>
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium text-foreground">{card.label}</span>
                              <span className="text-muted-foreground">{card.averageScore}% avg</span>
                            </div>
                            <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary/60">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-neon-green to-neon-aqua"
                                style={{ width: `${card.averageScore}%` }}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Generate a few recommendations to see crop trends and average suitability scores.
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3 rounded-2xl border border-border/50 bg-background/35 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">History feed</p>
                    <h3 className="mt-1 text-xl font-semibold text-foreground">Previous waste to fertilizer runs</h3>
                  </div>
                  <div className="rounded-full border border-border/60 bg-background/50 px-3 py-1 text-xs text-muted-foreground">
                    {history.length} total
                  </div>
                </div>

                <div className="max-h-[28rem] space-y-3 overflow-y-auto pr-1">
                  {history.length ? (
                    history.map((entry) => (
                      <div key={entry.id} className="rounded-2xl border border-border/50 bg-background/40 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                              <Leaf className="h-4 w-4 text-neon-green" />
                              {entry.cropLabel}
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">{formatDateTime(entry.generatedAt)}</p>
                          </div>
                          <div
                            className={cn(
                              'rounded-full border px-3 py-1 text-xs font-medium',
                              badgeToneClass(entry.suitabilityTone),
                            )}
                          >
                            {entry.cropScore}%
                          </div>
                        </div>

                        <p className="mt-3 text-sm font-medium text-foreground">{entry.fertilizerType}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{entry.wasteMaterials.join(', ')}</p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {entry.wasteMaterials.map((waste) => (
                            <span
                              key={`${entry.id}-${waste}`}
                              className="rounded-full border border-border/60 bg-secondary/30 px-2.5 py-1 text-[11px] text-muted-foreground"
                            >
                              {waste}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-border/60 bg-background/30 p-6 text-center text-sm text-muted-foreground">
                      No saved recommendations yet. Generate one to populate the AI insight history.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
