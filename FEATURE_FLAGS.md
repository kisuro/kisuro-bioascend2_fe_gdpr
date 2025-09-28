# Feature Flags

This document describes the available feature flags for the BioAscend frontend application.

## Review Feature Flag

Controls the display of the review functionality throughout the application.

### Environment Variable
```bash
NEXT_PUBLIC_REVIEW_FEATURE=true|false
```

### Default Value
`false` - Reviews are disabled by default

### Behavior

#### When Enabled (`true`)
- ✅ Reviews block is visible on supplement detail pages
- ✅ Rating displays include review count (e.g., "4.5 (23 reviews)")
- ✅ Users can click on stars to rate supplements
- ✅ "Add review" / "Edit review" buttons are shown
- ✅ Review modals are available
- ✅ Review data is fetched from the API

#### When Disabled (`false`)
- ❌ Reviews block is hidden on supplement detail pages
- ❌ Rating displays show only the star rating (e.g., "4.5")
- ❌ Stars are not clickable for rating
- ❌ No review buttons or modals
- ❌ Review data is not fetched from the API

### Implementation Details

The flag is implemented using the `reviewFeatureEnabled` variable in `/lib/features.ts`, which:

1. Checks multiple environment variable variants:
   - `NEXT_PUBLIC_REVIEW_FEATURE`
   - `REVIEW_FEATURE`
   - `REVIEW_FEATURE_ENABLED`
   - `review_feature`

2. Accepts truthy values: `"1"`, `"true"`, `"yes"`, `"on"`, `"enabled"` (case-insensitive)

3. Defaults to `false` if not set

### Usage Example

```bash
# Enable reviews
NEXT_PUBLIC_REVIEW_FEATURE=true

# Disable reviews (default)
NEXT_PUBLIC_REVIEW_FEATURE=false
# or simply omit the variable
```

### Affected Components
- `/app/supplements/[slug]/page.tsx` - Server-side data fetching
- `/app/supplements/[slug]/supplement-detail-client.tsx` - Main detail component
- Rating display components throughout the app

### Development
When developing new review-related features, always check the `reviewFeatureEnabled` flag to ensure proper feature gating.

```typescript
import { reviewFeatureEnabled } from '@/lib/features'

if (reviewFeatureEnabled) {
  // Review-related code here
}
```