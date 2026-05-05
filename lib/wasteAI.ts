export const wasteOptions = [
  { id: 'banana peel', label: 'Banana peel' },
  { id: 'rice husk', label: 'Rice husk' },
  { id: 'vegetable scraps', label: 'Vegetable scraps' },
  { id: 'fish waste', label: 'Fish waste' },
  { id: 'eggshells', label: 'Eggshells' },
  { id: 'coffee grounds', label: 'Coffee grounds' },
] as const

export const cropOptions = [
  { id: 'lettuce', label: 'Lettuce' },
  { id: 'tomato', label: 'Tomato' },
  { id: 'chili', label: 'Chili' },
  { id: 'spinach', label: 'Spinach' },
  { id: 'cucumber', label: 'Cucumber' },
] as const

export type WasteType = (typeof wasteOptions)[number]['id']
export type CropType = (typeof cropOptions)[number]['id']

export type NutrientLevel = 'High' | 'Medium' | 'Low'
export type SuitabilityTone = 'good' | 'moderate' | 'low'

export interface WasteRecommendation {
  fertilizerType: string
  nutrientProfile: {
    nitrogen: NutrientLevel
    phosphorus: NutrientLevel
    potassium: NutrientLevel
  }
  cropLabel: string
  cropScore: number
  suitabilityTone: SuitabilityTone
  summary: string
  insights: string[]
  warnings: string[]
  wasteMaterials: string[]
  cropType: CropType
  generatedAt: string
}

type WasteProfile = {
  nitrogen: number
  phosphorus: number
  potassium: number
  summary: string
  insight: string
  warning?: string
}

type CropProfile = {
  label: string
  ideal: { nitrogen: number; phosphorus: number; potassium: number }
  bonusWaste: Record<string, number>
  insight: string
  warning?: string
}

const wasteProfiles: Record<string, WasteProfile> = {
  'banana peel': {
    nitrogen: 1,
    phosphorus: 2,
    potassium: 4,
    summary: 'Potassium-heavy fruit and root support',
    insight: 'Great for crops that need stronger flowering and fruiting support.',
  },
  'rice husk': {
    nitrogen: 1,
    phosphorus: 1,
    potassium: 1,
    summary: 'Carbon-rich structural compost material',
    insight: 'Best blended into compost to improve aeration and slow-release structure.',
    warning: 'Rice husk should be composted or pre-processed before direct application.',
  },
  'vegetable scraps': {
    nitrogen: 4,
    phosphorus: 2,
    potassium: 2,
    summary: 'Balanced green-waste compost base',
    insight: 'Ideal for building a fast-acting compost mix with solid nitrogen content.',
  },
  'fish waste': {
    nitrogen: 5,
    phosphorus: 4,
    potassium: 1,
    summary: 'Strong nitrogen and phosphorus booster',
    insight: 'Useful for making nutrient-dense compost teas and heavy-feeding blends.',
    warning: 'Fish waste should be fully composted before direct use to avoid burn and odor issues.',
  },
  eggshells: {
    nitrogen: 1,
    phosphorus: 4,
    potassium: 1,
    summary: 'Mineral-supporting calcium and phosphorus source',
    insight: 'Crushed eggshells help buffer acidity and support root strength over time.',
  },
  'coffee grounds': {
    nitrogen: 3,
    phosphorus: 1,
    potassium: 2,
    summary: 'Nitrogen-leaning organic booster',
    insight: 'A useful amendment in small amounts for leafy crops and compost stacks.',
    warning: 'Coffee grounds are best used in moderation because they can increase acidity.',
  },
}

const cropProfiles: Record<CropType, CropProfile> = {
  lettuce: {
    label: 'Lettuce',
    ideal: { nitrogen: 0.48, phosphorus: 0.22, potassium: 0.3 },
    bonusWaste: {
      'vegetable scraps': 6,
      'coffee grounds': 4,
      'banana peel': 3,
    },
    insight: 'Leafy greens respond well to nitrogen-rich, compost-based blends.',
    warning: 'Too much nitrogen can make lettuce overly soft and watery.',
  },
  tomato: {
    label: 'Tomato',
    ideal: { nitrogen: 0.28, phosphorus: 0.22, potassium: 0.5 },
    bonusWaste: {
      'banana peel': 8,
      eggshells: 5,
      'vegetable scraps': 3,
    },
    insight: 'Tomatoes need a potassium-forward mix once they shift into flowering.',
    warning: 'High nitrogen may push leaf growth at the expense of fruit yield.',
  },
  chili: {
    label: 'Chili',
    ideal: { nitrogen: 0.22, phosphorus: 0.18, potassium: 0.6 },
    bonusWaste: {
      'banana peel': 8,
      'coffee grounds': 3,
      eggshells: 3,
    },
    insight: 'Fruit-heavy peppers prefer stronger potassium support and steady feeding.',
    warning: 'Avoid overly nitrogen-heavy inputs during flowering.',
  },
  spinach: {
    label: 'Spinach',
    ideal: { nitrogen: 0.55, phosphorus: 0.18, potassium: 0.27 },
    bonusWaste: {
      'vegetable scraps': 8,
      'coffee grounds': 5,
      'banana peel': 2,
    },
    insight: 'Spinach rewards a nitrogen-forward compost blend with moderate minerals.',
    warning: 'Keep the blend balanced to prevent bitter leaf development.',
  },
  cucumber: {
    label: 'Cucumber',
    ideal: { nitrogen: 0.3, phosphorus: 0.22, potassium: 0.48 },
    bonusWaste: {
      'banana peel': 7,
      'vegetable scraps': 4,
      'coffee grounds': 2,
    },
    insight: 'Cucumbers perform best with a balanced compost base and potassium lift.',
    warning: 'Heavy nitrogen feeding can reduce fruiting consistency in cucumbers.',
  },
}

function normalizeWasteName(value: string) {
  return value.trim().toLowerCase()
}

function levelFromTotal(total: number): NutrientLevel {
  if (total >= 9) return 'High'
  if (total >= 5) return 'Medium'
  return 'Low'
}

function clampScore(value: number) {
  return Math.max(18, Math.min(98, Math.round(value)))
}

function suitabilityToneFromScore(score: number): SuitabilityTone {
  if (score >= 85) return 'good'
  if (score >= 65) return 'moderate'
  return 'low'
}

export function generateWasteRecommendation(wasteMaterials: string[], cropType: CropType): WasteRecommendation {
  const crop = cropProfiles[cropType]
  const profiles = wasteMaterials.map(
    (material) =>
      wasteProfiles[normalizeWasteName(material)] ?? {
        nitrogen: 2,
        phosphorus: 2,
        potassium: 2,
        summary: 'General organic compost input',
        insight: 'Unknown waste is treated as a balanced compostable material in this simulation.',
      },
  )

  const totals = profiles.reduce(
    (accumulator, profile) => {
      accumulator.nitrogen += profile.nitrogen
      accumulator.phosphorus += profile.phosphorus
      accumulator.potassium += profile.potassium
      return accumulator
    },
    { nitrogen: 0, phosphorus: 0, potassium: 0 },
  )

  const totalScore = totals.nitrogen + totals.phosphorus + totals.potassium || 1
  const ratios = {
    nitrogen: totals.nitrogen / totalScore,
    phosphorus: totals.phosphorus / totalScore,
    potassium: totals.potassium / totalScore,
  }

  const idealDiff =
    Math.abs(ratios.nitrogen - crop.ideal.nitrogen) +
    Math.abs(ratios.phosphorus - crop.ideal.phosphorus) +
    Math.abs(ratios.potassium - crop.ideal.potassium)

  let score = 100 - idealDiff * 95

  wasteMaterials.forEach((material) => {
    const normalized = normalizeWasteName(material)
    score += crop.bonusWaste[normalized] ?? 0

    if (normalized === 'fish waste' && (cropType === 'tomato' || cropType === 'chili')) {
      score -= 8
    }

    if (normalized === 'coffee grounds' && (cropType === 'lettuce' || cropType === 'spinach')) {
      score += 4
    }
  })

  if (wasteMaterials.length > 3) {
    score += 2
  }

  const selectedWastes = wasteMaterials.map((material) => material.trim()).filter(Boolean)
  const warnings = new Set<string>()
  const insights = new Set<string>()

  profiles.forEach((profile) => {
    insights.add(profile.insight)
    if (profile.warning) {
      warnings.add(profile.warning)
    }
  })

  if (crop.warning) warnings.add(crop.warning)
  insights.add(crop.insight)

  if (selectedWastes.some((material) => normalizeWasteName(material) === 'fish waste')) {
    warnings.add('Fish waste should be composted before direct use in planting beds.')
  }

  if (selectedWastes.some((material) => normalizeWasteName(material) === 'rice husk')) {
    insights.add('Rice husk increases structure and aeration, but works best as a compost ingredient.')
  }

  if (
    selectedWastes.some((material) => normalizeWasteName(material) === 'eggshells') &&
    (cropType === 'tomato' || cropType === 'cucumber')
  ) {
    insights.add('Crushed eggshells provide slow-release mineral support for fruiting crops.')
  }

  const dominant =
    totals.nitrogen >= totals.phosphorus && totals.nitrogen >= totals.potassium
      ? 'nitrogen'
      : totals.phosphorus >= totals.potassium
        ? 'phosphorus'
        : 'potassium'

  let fertilizerType = 'Balanced compost-based organic fertilizer'
  if (dominant === 'nitrogen') {
    fertilizerType = cropType === 'lettuce' || cropType === 'spinach'
      ? 'Compost-based nitrogen-rich fertilizer'
      : 'Nitrogen-forward organic compost mix'
  }
  if (dominant === 'phosphorus') {
    fertilizerType = 'Root-strengthening phosphorus compost blend'
  }
  if (dominant === 'potassium') {
    fertilizerType = cropType === 'tomato' || cropType === 'chili' || cropType === 'cucumber'
      ? 'Potassium-enhanced organic mix'
      : 'Potassium-supporting compost blend'
  }

  if (
    selectedWastes.some((material) => normalizeWasteName(material) === 'banana peel') &&
    (cropType === 'tomato' || cropType === 'chili' || cropType === 'cucumber')
  ) {
    fertilizerType = 'Potassium-enhanced fruiting fertilizer'
  }

  if (
    selectedWastes.some((material) => normalizeWasteName(material) === 'coffee grounds') &&
    (cropType === 'lettuce' || cropType === 'spinach')
  ) {
    fertilizerType = 'Leafy-green nitrogen compost blend'
  }

  const finalScore = clampScore(score)

  const suitabilityTone = suitabilityToneFromScore(finalScore)
  const summary =
    suitabilityTone === 'good'
      ? `Highly suitable for ${crop.label} (${finalScore}%)`
      : suitabilityTone === 'moderate'
        ? `Moderately suitable for ${crop.label} (${finalScore}%)`
        : `Not recommended as a primary blend for ${crop.label} (${finalScore}%)`

  return {
    fertilizerType,
    nutrientProfile: {
      nitrogen: levelFromTotal(totals.nitrogen),
      phosphorus: levelFromTotal(totals.phosphorus),
      potassium: levelFromTotal(totals.potassium),
    },
    cropLabel: crop.label,
    cropScore: finalScore,
    suitabilityTone,
    summary,
    insights: Array.from(insights),
    warnings: Array.from(warnings),
    wasteMaterials: selectedWastes,
    cropType,
    generatedAt: new Date().toISOString(),
  }
}
