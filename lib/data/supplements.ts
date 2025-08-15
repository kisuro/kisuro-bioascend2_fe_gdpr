export interface Supplement {
  id: string
  slug: string
  name: string
  description: string
  goals: string[]
  tags: string[]
  composition: Array<{
    name: string
    amount: string
  }>
  standardization: string
  dosageGuidelines: {
    recommended: string
    minimum: string
    maximum: string
    timing: string[]
    withFood: boolean
  }
  scheduleExamples: Array<{
    name: string
    description: string
    schedule: string
  }>
  contraindications: string[]
  interactions: {
    synergy: string[]
    caution: string[]
    avoid: string[]
  }
  alternatives: string[]
  evidenceLevel: "High" | "Medium" | "Low"
  partOfStacks?: Array<{
    id: string
    slug: string
    name: string
    description: string
  }>
  ratings: Array<{
    userId: string
    score: number
    comment?: string
    date: string
  }>
}

export const supplementsData: Supplement[] = [
  {
    id: "1",
    slug: "omega-3-fish-oil",
    name: "Omega-3 Fish Oil",
    description: "High-quality fish oil supplement providing EPA and DHA for cardiovascular and cognitive health",
    goals: ["Heart Health", "Brain Function", "Anti-inflammatory", "Joint Health"],
    tags: ["Essential Fatty Acids", "Cardiovascular", "Cognitive", "Anti-inflammatory"],
    composition: [
      { name: "EPA (Eicosapentaenoic Acid)", amount: "500mg" },
      { name: "DHA (Docosahexaenoic Acid)", amount: "300mg" },
      { name: "Other Omega-3 Fatty Acids", amount: "200mg" },
    ],
    standardization: "Molecularly distilled, tested for heavy metals and contaminants. Minimum 60% omega-3 content.",
    dosageGuidelines: {
      recommended: "1-2 capsules daily",
      minimum: "1 capsule daily",
      maximum: "3 capsules daily",
      timing: ["With meals", "Morning", "Evening"],
      withFood: true,
    },
    scheduleExamples: [
      {
        name: "General Health",
        description: "Basic maintenance dose for overall health",
        schedule: "1 capsule with breakfast daily",
      },
      {
        name: "Cardiovascular Support",
        description: "Higher dose for heart health optimization",
        schedule: "1 capsule with breakfast, 1 capsule with dinner",
      },
    ],
    contraindications: [
      "Blood thinning medications (consult physician)",
      "Upcoming surgery (discontinue 2 weeks prior)",
      "Fish or shellfish allergies",
      "Bleeding disorders",
    ],
    interactions: {
      synergy: ["Vitamin E", "Coenzyme Q10", "Magnesium"],
      caution: ["Warfarin", "Aspirin", "Other blood thinners"],
      avoid: ["High-dose Vitamin A supplements"],
    },
    alternatives: ["Algae Oil", "Krill Oil", "Flaxseed Oil"],
    evidenceLevel: "High",
    partOfStacks: [
      {
        id: "stack-1",
        slug: "cardiovascular-health",
        name: "Cardiovascular Health Stack",
        description: "Complete heart health optimization",
      },
    ],
    ratings: [
      { userId: "user1", score: 5, comment: "Great quality, noticed improved focus", date: "2024-01-15" },
      { userId: "user2", score: 4, comment: "Good product, no fishy aftertaste", date: "2024-01-10" },
      { userId: "user3", score: 5, comment: "Excellent for joint health", date: "2024-01-05" },
      { userId: "user4", score: 4, date: "2024-01-01" },
    ],
  },
  {
    id: "2",
    slug: "magnesium-glycinate",
    name: "Magnesium Glycinate",
    description: "Highly bioavailable form of magnesium for muscle relaxation, sleep quality, and stress management",
    goals: ["Sleep Quality", "Muscle Recovery", "Stress Management", "Bone Health"],
    tags: ["Minerals", "Sleep", "Recovery", "Relaxation"],
    composition: [
      { name: "Magnesium (as Magnesium Glycinate)", amount: "400mg" },
      { name: "Glycine", amount: "1600mg" },
    ],
    standardization: "Chelated form for maximum absorption, third-party tested for purity",
    dosageGuidelines: {
      recommended: "1-2 capsules daily",
      minimum: "1 capsule daily",
      maximum: "3 capsules daily",
      timing: ["Evening", "Before bed", "Post-workout"],
      withFood: false,
    },
    scheduleExamples: [
      {
        name: "Sleep Support",
        description: "Optimize sleep quality and relaxation",
        schedule: "2 capsules 30-60 minutes before bed",
      },
      {
        name: "Recovery Protocol",
        description: "Enhanced muscle recovery after training",
        schedule: "1 capsule post-workout, 1 capsule before bed",
      },
    ],
    contraindications: ["Kidney disease", "Heart block", "Myasthenia gravis", "Severe diarrhea or digestive issues"],
    interactions: {
      synergy: ["Vitamin D3", "Calcium", "Zinc"],
      caution: ["Antibiotics", "Diuretics", "Proton pump inhibitors"],
      avoid: ["High doses of calcium supplements (separate timing)"],
    },
    alternatives: ["Magnesium Citrate", "Magnesium Oxide", "Magnesium Threonate"],
    evidenceLevel: "High",
    ratings: [
      { userId: "user5", score: 5, comment: "Amazing for sleep quality", date: "2024-01-20" },
      { userId: "user6", score: 5, comment: "No digestive issues, great absorption", date: "2024-01-18" },
      { userId: "user7", score: 4, comment: "Helps with muscle cramps", date: "2024-01-12" },
    ],
  },
  {
    id: "3",
    slug: "vitamin-d3-k2",
    name: "Vitamin D3 + K2",
    description: "Synergistic combination of vitamin D3 and K2 for optimal bone health and calcium metabolism",
    goals: ["Bone Health", "Immune Support", "Calcium Absorption", "Cardiovascular Health"],
    tags: ["Vitamins", "Bone Health", "Immune", "Cardiovascular"],
    composition: [
      { name: "Vitamin D3 (Cholecalciferol)", amount: "5000 IU" },
      { name: "Vitamin K2 (MK-7)", amount: "100mcg" },
    ],
    standardization: "Natural vitamin D3 from lanolin, vitamin K2 as menaquinone-7 (MK-7)",
    dosageGuidelines: {
      recommended: "1 capsule daily",
      minimum: "1 capsule daily",
      maximum: "2 capsules daily",
      timing: ["With meals", "Morning", "Afternoon"],
      withFood: true,
    },
    scheduleExamples: [
      {
        name: "Maintenance",
        description: "Daily support for bone and immune health",
        schedule: "1 capsule with breakfast",
      },
      {
        name: "Deficiency Correction",
        description: "Higher dose for correcting vitamin D deficiency",
        schedule: "2 capsules with breakfast for 8-12 weeks, then 1 capsule daily",
      },
    ],
    contraindications: ["Hypercalcemia", "Kidney stones", "Sarcoidosis", "Warfarin therapy (monitor INR)"],
    interactions: {
      synergy: ["Magnesium", "Calcium", "Omega-3"],
      caution: ["Thiazide diuretics", "Digoxin"],
      avoid: ["High-dose calcium without magnesium"],
    },
    alternatives: ["Vitamin D3 alone", "Vitamin D2", "Cod liver oil"],
    evidenceLevel: "High",
    ratings: [
      { userId: "user8", score: 5, comment: "Perfect combination, improved energy", date: "2024-01-25" },
      { userId: "user9", score: 4, comment: "Good quality, easy to swallow", date: "2024-01-22" },
    ],
  },
]
