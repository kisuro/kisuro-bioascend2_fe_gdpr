const truthyValues = new Set(["1", "true", "yes", "on", "enabled"])

function parseFlag(value: string | undefined, defaultValue = false): boolean {
  if (!value) {
    return defaultValue
  }
  return truthyValues.has(value.trim().toLowerCase())
}

const rawJournalFlag =
  process.env.NEXT_PUBLIC_JOURNAL_FEATURE ??
  process.env.JOURNAL_FEATURE ??
  process.env.JOURNAL_FEATURE_ENABLED ??
  process.env["journal_feature"]

export const journalFeatureEnabled = parseFlag(rawJournalFlag, false)

export { parseFlag }
