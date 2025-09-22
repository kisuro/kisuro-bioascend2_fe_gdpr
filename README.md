# BioAionics Frontend

A comprehensive Next.js-based biohacking platform that empowers users to optimize their health through supplement tracking, biorhythm analysis, meditation, journaling, and AI-powered insights. Built with modern React architecture and glass morphism design.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel)](https://www.bioaionics.com)
[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-0055FF?style=flat-square&logo=framer)](https://www.framer.com/motion/)

## 🌐 Live Application

**Production URLs**:

- **Primary**: [https://www.bioaionics.com](https://www.bioaionics.com)
- **Vercel**: [https://bioaionics.vercel.app](https://bioaionics.vercel.app)

**Backend API**: [https://bioaionics-api.onrender.com](https://bioaionics-api.onrender.com) with [Supabase PostgreSQL](https://supabase.com)

## 🌐 Live Application

**Production URL**: [https://www.bioaionics.com](https://www.bioaionics.com)

**Backend API**: [https://bioaionics-api.onrender.com](https://bioaionics-api.onrender.com) | [API Docs](https://bioaionics-api.onrender.com/docs)

**Repository Links**:

- Frontend: [bioascend2_fe](https://github.com/kisuro/bioascend2_fe)
- Backend: [bioascend2_be](https://github.com/kisuro/bioascend2_be)

## ✨ Platform Features

### 🧬 Advanced Biorhythm Calculator

- **7 Biorhythm Cycles**: Physical (23d), Emotional (28d), Intellectual (33d), Intuitive (38d), Spiritual (53d), Aesthetic (43d), and Charismatic (48d)
- **Interactive Visualizations**: Beautiful Chart.js-powered graphs with extrema detection and trend analysis
- **Flexible Date Ranges**: Analyze biorhythms over 7-30 day periods with customizable start dates
- **Real-time Calculations**: Instant updates with smooth animations and hover interactions
- **Export Capabilities**: Download biorhythm data and charts for personal tracking

### 💊 Comprehensive Supplement Database

- **2000+ Supplements**: Evidence-based supplement profiles with detailed metadata and scientific backing
- **Advanced Search & Filtering**: Filter by categories (adaptogen, nootropic, etc.), goals (focus, energy, sleep), evidence levels, and manufacturers
- **Community Reviews**: User-driven rating and review system with aggregated statistics
- **Smart Recommendations**: Intelligent supplement suggestions based on user goals and preferences
- **Detailed Profiles**: Each supplement includes dosage, timing, cycling protocols, interactions, and side effects

### 📖 Personal Health Journal

- **Supplement Intake Tracking**: Log daily supplement consumption with precise dosages and timing
- **Progress Analytics**: Visual charts showing supplement effectiveness and health trends over time
- **Smart Reminders**: Customizable notification system for supplement schedules and health goals
- **Historical Analysis**: Comprehensive data insights with pattern recognition and correlation analysis
- **Data Export**: CSV and JSON export for external analysis and healthcare provider sharing

### 🧠 Mind Enhancement Hub

- **Curated Audio Library**: 20+ high-quality meditation tracks, brainwave entrainment, and focus soundscapes
- **Multiple Categories**: Meditation, binaural beats, nature sounds, mantras, and cognitive enhancement audio
- **Custom Playlists**: Create and manage personal audio collections for different activities and goals
- **Advanced Audio Player**: Full-featured player with loop, shuffle, and session timer functionality
- **Session Tracking**: Monitor meditation consistency, session duration, and mindfulness progress

### 👤 User Profile & Authentication

- **Secure Authentication**: JWT-based authentication with HTTP-only cookies and email verification
- **Profile Management**: Avatar uploads (Supabase storage), biographical information, and health goal setting
- **Statistics Dashboard**: Comprehensive tracking of supplements tried, reviews written, meditation sessions, and biorhythm checks
- **Achievement System**: Progress tracking with milestone recognition and consistency rewards
- **Privacy Controls**: GDPR-compliant data management with granular privacy settings

### 🎨 Glass Morphism Design System

- **Modern UI/UX**: Custom glass morphism components with liquid animations and smooth transitions
- **Dark/Light Mode**: Automatic system preference detection with manual toggle option
- **Responsive Design**: Mobile-first approach with fluid layouts optimized for all screen sizes
- **Accessibility**: WCAG 2.1 compliant with screen reader support and keyboard navigation
- **Performance Optimized**: Lazy loading, code splitting, and optimized bundle sizes

## 🏗 Architecture & Tech Stack

### Frontend Framework

- **Next.js 15.2** - React framework with App Router, Server Components, and RSC support
- **React 19** - Latest React with concurrent features, automatic batching, and improved performance
- **TypeScript 5.7** - Strict type checking with advanced TypeScript features

### Styling & Design System

- **Tailwind CSS 4.1** - Utility-first CSS framework with custom design tokens
- **Glass Morphism Components** - Custom glass effect library with `GlassCard` and `LiquidButton`
- **Framer Motion 12** - Advanced animations, page transitions, and micro-interactions
- **Radix UI** - Accessible, unstyled component primitives for complex UI elements
- **Lucide React** - Beautiful, consistent icon library with tree-shaking support
- **Geist Font** - Modern typography from Vercel with optimized loading

### State Management & Data Handling

- **Custom Hooks Architecture** - `useUser()` for authentication, `useToast()` for notifications
- **React Hook Form** - Performant forms with minimal re-renders and built-in validation
- **Zod Validation** - Schema-first validation with TypeScript integration
- **Local Storage Integration** - Client-side persistence for user preferences and auth tokens
- **Optimistic UI Updates** - Immediate feedback with background API synchronization

### Data Visualization & Charts

- **Chart.js 4** with **React-Chartjs-2** - Interactive biorhythm charts with real-time updates
- **Recharts** - Responsive charts for supplement analytics and progress tracking
- **Custom D3 Components** - Advanced data visualizations for complex health metrics
- **Canvas-based Rendering** - High-performance chart rendering for large datasets

### Development & Build Tools

- **PNPM 9+** - Fast, disk space efficient package manager with workspace support
- **ESLint & Prettier** - Comprehensive code quality and consistent formatting
- **PostCSS** - Advanced CSS processing with autoprefixer and optimization
- **TypeScript Strict Mode** - Maximum type safety with strict compiler options
- **Bundle Analyzer** - Built-in bundle size analysis and optimization insights

### External Integrations

- **FastAPI Backend** - RESTful API integration with automatic OpenAPI client generation
- **Supabase Storage** - File uploads, avatar management, and CDN delivery
- **JWT Authentication** - Secure token-based auth with HTTP-only cookie storage
- **Email Verification** - Integration with backend email verification system

### Deployment & Performance

- **Vercel Deployment** - Serverless deployment with automatic CI/CD and edge optimization
- **Image Optimization** - Next.js automatic image optimization with WebP/AVIF support
- **Code Splitting** - Automatic route-based and dynamic component code splitting
- **Edge Runtime** - Leverage Vercel Edge Functions for improved performance
- **Progressive Web App** - PWA capabilities with offline support (planned)

## 📁 Project Structure

```
bioascend2_fe/
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Root layout with navigation and theme providers
│   ├── page.tsx                   # Homepage with feature showcase and hero section
│   ├── globals.css                # Global styles, CSS variables, and theme definitions
│   ├── auth/                      # Authentication flow pages
│   │   ├── login/page.tsx         # User login with form validation and error handling
│   │   ├── register/page.tsx      # User registration with email verification flow
│   │   ├── verify-email/page.tsx  # Email verification completion page
│   │   ├── forgot-password/page.tsx # Password reset request form
│   │   └── reset-password/page.tsx  # Password reset completion with token validation
│   ├── biorhythms/page.tsx        # Biorhythm calculator with Chart.js visualizations
│   ├── supplements/               # Supplement database and management
│   │   ├── page.tsx               # Supplement listing with advanced filtering
│   │   ├── [slug]/page.tsx        # Individual supplement details with reviews
│   │   └── loading.tsx            # Loading states with animated placeholders
│   ├── journal/page.tsx           # Personal health journal and intake tracking
│   ├── mind/page.tsx              # Meditation hub with audio library
│   ├── profile/page.tsx           # User profile management and statistics
│   ├── assistant/page.tsx         # AI health assistant (coming soon)
│   ├── premium/page.tsx           # Premium features and subscription management
│   ├── privacy-policy/page.tsx    # Privacy policy and GDPR compliance
│   └── terms-of-service/page.tsx  # Terms of service and user agreements
├── components/                    # Reusable React components
│   ├── ui/                        # Core UI component library
│   │   ├── glass-card.tsx         # Glass morphism card variants (primary, secondary, accent)
│   │   ├── liquid-button.tsx      # Animated buttons with liquid hover effects
│   │   ├── supplement-loader.tsx  # Loading animations with biorhythm-inspired designs
│   │   ├── theme-provider.tsx     # Dark/light theme management with system detection
│   │   ├── page-backgrounds.tsx   # Animated gradient backgrounds for each page
│   │   └── toast.tsx              # Toast notification system with animations
│   ├── layout/                    # Layout and navigation components
│   │   └── navigation.tsx         # Main navigation with mobile support and user menu
│   ├── biorhythms/               # Biorhythm-specific components
│   │   ├── biorhythm-chart.tsx   # Interactive Chart.js biorhythm visualization
│   │   ├── biorhythm-summary.tsx # Analysis summary with extrema points and insights
│   │   └── cycle-legend.tsx       # Color-coded legend for biorhythm cycles
│   ├── supplements/              # Supplement database components
│   │   ├── supplement-card.tsx   # Individual supplement preview cards
│   │   ├── supplement-filters.tsx # Advanced filtering system with categories and goals
│   │   ├── supplement-detail.tsx  # Detailed supplement information display
│   │   ├── review-form.tsx       # Review submission form with rating system
│   │   └── supplements-client.tsx # Client-side supplement data management
│   ├── journal/                  # Journal and health tracking components
│   │   ├── journal-overview.tsx  # Dashboard with analytics and progress charts
│   │   ├── supplement-manager.tsx # Personal supplement stack management
│   │   ├── intake-logger.tsx     # Daily supplement intake logging form
│   │   ├── progress-charts.tsx   # Visual progress tracking with Recharts
│   │   └── journal-history.tsx   # Historical data analysis and export
│   ├── mind/                     # Meditation and audio enhancement components
│   │   ├── audio-library.tsx     # Audio track library with categorization
│   │   ├── audio-player.tsx      # Custom audio player with advanced controls
│   │   ├── playlist-manager.tsx  # Playlist creation and management interface
│   │   └── session-timer.tsx     # Meditation timer with interval bells
│   └── auth/                     # Authentication-related components
│       ├── login-form.tsx        # Login form with validation and error handling
│       ├── register-form.tsx     # Registration form with email verification
│       └── profile-form.tsx      # Profile editing form with avatar upload
├── lib/                          # Utility libraries and helpers
│   ├── utils.ts                  # General utility functions and helpers
│   ├── api.ts                    # API client with request/response interceptors
│   ├── auth.ts                   # Authentication utilities and token management
│   ├── data/                     # Data structures and type definitions
│   │   ├── supplements.ts        # Supplement data types and mock data
│   │   ├── audio.ts              # Audio library data and metadata
│   │   ├── biorhythms.ts         # Biorhythm calculation algorithms
│   │   └── journal.ts            # Journal data structures and validations
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-user.ts           # User authentication and profile management
│   │   ├── use-supplements.ts    # Supplement data fetching and caching
│   │   ├── use-biorhythms.ts     # Biorhythm calculation and caching
│   │   └── use-toast.ts          # Toast notification system management
│   └── stores/                   # State management (Zustand or Context)
│       ├── user-store.ts         # Global user state management
│       └── preferences-store.ts  # User preferences and settings
├── public/                       # Static assets
│   ├── seed/                     # Seed data for development and testing
│   │   ├── supplements.json      # Comprehensive supplement database
│   │   └── audio-tracks.json     # Audio library metadata
│   ├── images/                   # Static images and graphics
│   └── audio/                    # Audio files for meditation and focus
├── styles/                       # Global styles and CSS modules
│   └── globals.css               # Global CSS imports and base styles
├── components.json               # Shadcn/UI component configuration
├── next.config.mjs              # Next.js configuration with optimizations
├── tailwind.config.js           # Tailwind CSS configuration with custom design tokens
├── tsconfig.json                # TypeScript configuration with strict settings
├── package.json                 # Dependencies and scripts
├── pnpm-lock.yaml              # PNPM lockfile for consistent installations
└── README.md                    # This documentation file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** (Node.js 20+ recommended for optimal performance)
- **PNPM 9+** - Fast, disk space efficient package manager
- **Git** - Version control system
- **Backend API** - BioAionics backend API running locally or deployed on Render

### Installation

1. **Clone the repository**:

   \`\`\`bash
   git clone https://github.com/kisuro/bioascend2_fe.git
   cd bioascend2_fe
   \`\`\`

2. **Install dependencies**:

   \`\`\`bash
   pnpm install
   \`\`\`

3. **Environment Configuration**:
   Create `.env.local` file in the root directory:

   ```env
   # API Configuration
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   # Production: https://bioaionics-api.onrender.com

   # Feature Flags
   NEXT_PUBLIC_ENABLE_AI_ASSISTANT=false
   NEXT_PUBLIC_ENABLE_PREMIUM_FEATURES=true
   NEXT_PUBLIC_FORCE_PREMIUM=false  # Set to true for premium feature testing

   # Development Settings
   NEXT_PUBLIC_DEBUG_MODE=true
   NODE_ENV=development

   # Analytics (optional)
   NEXT_PUBLIC_GA_ID=your_google_analytics_id
   NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key

   # Optional: Email testing
   NEXT_PUBLIC_ENABLE_EMAIL_DEBUG=true
   ```

4. **Start the development server**:

   ```bash
   pnpm dev
   # Alternative: npm run dev or yarn dev
   ```

   The application will be available at:

   - **Local**: `http://localhost:3000`
   - **Network**: `http://[your-ip]:3000` (for mobile testing)

5. **Build and test production version**:

   ```bash
   # Build the application
   pnpm build

   # Start production server locally
   pnpm start

   # Analyze bundle size
   pnpm analyze
   ```

### Backend Integration Requirements

**Local Development Setup:**

```bash
# In the backend directory (bioascend2_be)
# Ensure Python virtual environment is activated
source .venv/bin/activate

# Start the FastAPI development server
uvicorn app.main:app --reload --port 8000

# Or use VS Code task: backend:dev
```

**Verify Backend Connection:**

```bash
# Health check
curl http://localhost:8000/v1/health

# API documentation
open http://localhost:8000/docs
```

**Production Backend:**

- Backend automatically deployed on Render at `https://bioaionics-api.onrender.com`
- Database hosted on Supabase with real-time capabilities
- File storage managed through Supabase storage buckets

## 🎨 Design System & UI Architecture

### Glass Morphism Components

**GlassCard Variants:**

```tsx
// Primary glass effect for main content
<GlassCard variant="primary">Main content</GlassCard>

// Secondary glass effect for supporting content
<GlassCard variant="secondary">Supporting content</GlassCard>

// Accent glass effect for highlighting
<GlassCard variant="accent">Highlighted content</GlassCard>
```

**LiquidButton Animations:**

```tsx
// Animated button with liquid hover effects
<LiquidButton variant="primary" size="lg" className="transform hover:scale-105">
  Get Started
</LiquidButton>
```

**Animated Backgrounds:**

```tsx
// Page-specific animated gradient backgrounds
<PageBackground page="biorhythms" />  // Biorhythm-themed gradients
<PageBackground page="supplements" />  // Health-focused gradients
<PageBackground page="mind" />         // Meditation-inspired gradients
```

### Theme System Architecture

**CSS Custom Properties:**

```css
:root {
  /* Glass morphism variables */
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);

  /* Color palette */
  --primary: 210 40% 98%;
  --secondary: 210 40% 96%;
  --accent: 142 76% 36%;

  /* Animation timing */
  --animation-fast: 0.15s;
  --animation-normal: 0.3s;
  --animation-slow: 0.5s;
}
```

**Theme Toggle Implementation:**

- Automatic system preference detection on first visit
- Manual theme toggle with smooth transitions
- Persistent theme preference in localStorage
- Theme-aware component styling with CSS variables

### Responsive Design Principles

**Breakpoint System:**

```javascript
const breakpoints = {
  sm: "640px", // Mobile landscape
  md: "768px", // Tablet portrait
  lg: "1024px", // Tablet landscape / Small desktop
  xl: "1280px", // Desktop
  "2xl": "1536px", // Large desktop
};
```

**Mobile-First Approach:**

- Base styles optimized for mobile devices
- Progressive enhancement for larger screens
- Touch-friendly interactive elements (44px minimum target size)
- Optimized navigation for mobile and desktop

### Animation Philosophy

**Framer Motion Integration:**

```tsx
// Page transitions with stagger animations
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

// Staggered list animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
```

**Performance Considerations:**

- Use `transform` and `opacity` for GPU-accelerated animations
- Implement `will-change` property judiciously
- Respect user's motion preferences (`prefers-reduced-motion`)
- Lazy load heavy animations based on viewport intersection

## 🔗 API Integration & Data Management

### Authentication Flow

**User Registration:**

```typescript
// Registration with email verification
const registerUser = async (userData: RegisterData) => {
  const response = await fetch(`${API_BASE_URL}/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) throw new Error("Registration failed");
  return response.json();
};
```

**Authentication State Management:**

```typescript
// useUser hook implementation
const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/v1/auth/me`, {
        credentials: "include", // Include HTTP-only cookies
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, checkAuthStatus };
};
```

### API Client Architecture

**Base API Configuration:**

```typescript
const apiClient = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",

  // Generic request handler with error handling
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include", // Include cookies for authentication
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new APIError(`API Error: ${response.status}`, response.status);
    }

    return response.json();
  },
};
```

### Supplements API Integration

```typescript
// Get supplements with filtering and pagination
GET /v1/supplements?page=1&limit=20&category=adaptogen&goals=focus,energy&q=ashwagandha

// Get detailed supplement information
GET /v1/supplements/{slug}

// Add authenticated review
POST /v1/reviews/{supplement_id}
{
  "user": "username",
  "rating": 5,
  "comment": "Excellent for stress relief and sleep quality!"
}

// Get aggregated rating statistics
GET /v1/ratings/{supplement_id}/aggregate
```

### Error Handling & User Feedback

**Global Error Management:**

```typescript
// Custom error boundary with user-friendly messages
export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundaryComponent
      fallback={({ error }) => (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <p>{getErrorMessage(error)}</p>
          <button onClick={() => window.location.reload()}>Try again</button>
        </div>
      )}
    >
      {children}
    </ErrorBoundaryComponent>
  );
}

// User-friendly error messages
const getErrorMessage = (error: unknown): string => {
  if (error instanceof APIError) {
    switch (error.status) {
      case 401:
        return "Please log in to continue";
      case 403:
        return "You don't have permission for this action";
      case 404:
        return "The requested resource was not found";
      case 500:
        return "Server error. Please try again later";
      default:
        return "Something went wrong. Please try again";
    }
  }
  return "An unexpected error occurred";
};
```

**Toast Notification System:**

```typescript
// Integrated toast notifications for API responses
const { toast } = useToast();

const handleSuccess = (message: string) => {
  toast({
    title: "Success",
    description: message,
    variant: "default",
  });
};

const handleError = (error: APIError) => {
  toast({
    title: "Error",
    description: getErrorMessage(error),
    variant: "destructive",
  });
};
```

## 📱 Features in Detail

### Biorhythm Calculator

- **7 Different Cycles**: Physical (23d), Emotional (28d), Intellectual (33d), Intuitive (38d), Spiritual (53d), Aesthetic (43d), Charismatic (48d)
- **Interactive Charts**: Zoom, pan, and hover for detailed cycle information
- **Extrema Detection**: Automatic identification of peaks and troughs
- **Date Range Analysis**: Flexible time range selection from 7 to 30 days
- **Export Functionality**: Download biorhythm data as CSV or PNG

### Supplement Database

- **Comprehensive Filtering**: Categories, goals, evidence levels, manufacturers
- **Advanced Search**: Full-text search across names, benefits, and descriptions
- **Rating System**: 5-star rating with detailed statistics
- **Review Management**: CRUD operations for authenticated users
- **Recommendation Engine**: Smart suggestions based on user goals and history

### Personal Journal

- **Intake Tracking**: Log supplement consumption with precise dosages and timing
- **Progress Analytics**: Visual charts showing supplement effectiveness over time
- **Smart Reminders**: Customizable notifications for supplement schedules
- **Data Export**: CSV export for external analysis and healthcare providers
- **Historical Insights**: Pattern recognition and trend analysis

### Mind Enhancement

- **Audio Library**: 20+ high-quality meditation and focus tracks
- **Categories**: Meditation, brainwave entrainment, nature sounds, mantras
- **Custom Playlists**: Create and manage personal audio collections
- **Session Timer**: Built-in meditation timer with interval bells
- **Progress Tracking**: Monitor meditation consistency and session duration

## 🚀 Deployment & Production

### Vercel Deployment (Recommended)

**Automatic Deployment Features:**

- **Git Integration**: Automatic deployments on push to main branch
- **Preview Deployments**: PR/branch previews with unique URLs
- **Edge Functions**: Serverless functions at the edge for optimal performance
- **Image Optimization**: Automatic WebP/AVIF conversion and resizing
- **Built-in Analytics**: Web vitals and performance monitoring

**Production Environment Setup:**

1. **Connect Repository to Vercel**:

   - Link your GitHub repository to Vercel
   - Configure build settings and environment variables
   - Set up custom domain and SSL certificates

2. **Production Environment Variables**:

   ```env
   # API Configuration
   NEXT_PUBLIC_API_BASE_URL=https://bioaionics-api.onrender.com

   # Feature Flags
   NEXT_PUBLIC_ENABLE_AI_ASSISTANT=true
   NEXT_PUBLIC_ENABLE_PREMIUM_FEATURES=true
   NEXT_PUBLIC_FORCE_PREMIUM=false

   # Analytics
   NEXT_PUBLIC_GA_ID=your_production_google_analytics_id
   NEXT_PUBLIC_POSTHOG_KEY=your_production_posthog_key

   # Environment
   NODE_ENV=production
   ```

3. **Build Configuration**:
   ```javascript
   // vercel.json (optional)
   {
     "buildCommand": "pnpm build",
     "outputDirectory": ".next",
     "installCommand": "pnpm install",
     "framework": "nextjs",
     "regions": ["iad1"] // US East for optimal backend connectivity
   }
   ```

### Alternative Deployment Options

**Manual Static Export:**

```bash
# Build and export static files
pnpm build
pnpm export

# Deploy to any static hosting provider
# (Netlify, GitHub Pages, AWS S3, etc.)
```

**Docker Deployment:**

```dockerfile
# Dockerfile for containerized deployment
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM base AS build
COPY . .
RUN npm run build

FROM base AS runtime
COPY --from=build /app/.next ./.next
EXPOSE 3000
CMD ["npm", "start"]
```

### Performance Optimization

**Bundle Analysis:**

```bash
# Analyze bundle size and dependencies
pnpm analyze

# Key metrics to monitor:
# - First Contentful Paint (FCP): < 1.2s
# - Largest Contentful Paint (LCP): < 2.5s
# - Cumulative Layout Shift (CLS): < 0.1
# - First Input Delay (FID): < 100ms
```

**SEO & Meta Optimization:**

- Dynamic meta tags based on page content
- Open Graph and Twitter Card meta tags
- Structured data for supplement pages
- XML sitemap generation
- Robots.txt optimization

## 🧪 Development & Testing

### Code Quality Standards

**TypeScript Configuration:**

```json
// tsconfig.json - Strict type checking
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true
  }
}
```

**ESLint & Prettier Setup:**

```bash
# Run linting
pnpm lint

# Fix auto-fixable issues
pnpm lint:fix

# Check code formatting
pnpm format:check

# Format code
pnpm format
```

### Development Workflow

**Component Development:**

```bash
# Create new component with proper typing
# components/ui/new-component.tsx
export interface NewComponentProps {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

export function NewComponent({ variant = 'primary', children }: NewComponentProps) {
  return (
    <div className={cn(
      'base-styles',
      variant === 'primary' && 'primary-styles',
      variant === 'secondary' && 'secondary-styles'
    )}>
      {children}
    </div>
  )
}
```

**API Integration Testing:**

```bash
# Test API endpoints
curl -X GET "http://localhost:8000/v1/health"
curl -X GET "http://localhost:8000/v1/supplements?limit=5"

# Test authentication flow
curl -X POST "http://localhost:8000/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123","name":"Test User"}'
```

### Performance Monitoring

**Core Web Vitals:**

- Monitor LCP, FID, and CLS in development
- Use Vercel Analytics for production metrics
- Implement performance budgets in CI/CD

**Bundle Size Monitoring:**

```bash
# Generate bundle analysis
pnpm build && pnpm analyze

# Key targets:
# - Initial bundle: < 250KB gzipped
# - Route chunks: < 100KB gzipped
# - Shared chunks: Optimal code splitting
```

### Testing Strategy (Future Implementation)

**Unit Testing:**

```bash
# Jest + Testing Library setup
pnpm test
pnpm test:watch
pnpm test:coverage
```

**Integration Testing:**

```bash
# Cypress E2E testing
pnpm cypress:open
pnpm cypress:run
```

**Key Test Areas:**

- Authentication flows (login, registration, verification)
- Supplement search and filtering
- Biorhythm calculations and visualizations
- Review submission and management
- Responsive design across devices

## �️ Roadmap & Future Development

### Completed Features ✅

**Core Platform:**

- [x] **Next.js 15 Architecture**: App Router with Server/Client Components
- [x] **Biorhythm Calculator**: 7 cycles with interactive Chart.js visualizations
- [x] **Supplement Database**: 2000+ supplements with advanced filtering
- [x] **User Authentication**: JWT-based auth with email verification
- [x] **Review System**: Community reviews with rating aggregation
- [x] **Personal Journal**: Supplement tracking and progress analytics
- [x] **Mind Enhancement Hub**: Audio library with meditation and focus tracks
- [x] **Glass Morphism Design**: Custom UI components with liquid animations
- [x] **Mobile Responsive**: Touch-optimized interface for all devices
- [x] **Production Deployment**: Vercel hosting with Render API integration

### In Progress 🚧

**Current Development Focus:**

- [ ] **AI Health Assistant**: ChatGPT-powered personalized health insights
- [ ] **Advanced Analytics**: Enhanced progress tracking with data correlations
- [ ] **Supplement Stacks**: Personal supplement combination management
- [ ] **Social Features**: User profiles and community interactions
- [ ] **Push Notifications**: Smart reminders and health goal alerts

### Planned Features 🎯

**Q1 2025:**

- [ ] **Mobile App**: React Native app with offline capabilities
- [ ] **Wearable Integration**: Apple Health and Google Fit connectivity
- [ ] **Advanced Biomarker Tracking**: Lab result integration and trend analysis
- [ ] **Recommendation Engine**: ML-powered supplement and lifestyle suggestions
- [ ] **Telemedicine Integration**: Healthcare provider connectivity

**Q2 2025:**

- [ ] **Multi-language Support**: i18n implementation for global users
- [ ] **Advanced Data Visualization**: 3D charts and interactive health timelines
- [ ] **Supplement Interaction Checker**: Drug-supplement interaction warnings
- [ ] **Custom Protocol Builder**: Personalized health protocol creation
- [ ] **Community Challenges**: Gamified health improvement challenges

**Q3-Q4 2025:**

- [ ] **Offline-First Architecture**: PWA with comprehensive offline support
- [ ] **Real-time Collaboration**: Shared health journeys and family tracking
- [ ] **Advanced AI Features**: Computer vision for supplement recognition
- [ ] **Marketplace Integration**: Direct supplement purchasing
- [ ] **Healthcare Provider Dashboard**: Professional tools for practitioners

### Technical Improvements 🔧

**Performance & Scalability:**

- [ ] **Edge Runtime Optimization**: Migrate to Vercel Edge Functions
- [ ] **Database Optimization**: Implement Redis caching layer
- [ ] **Bundle Size Reduction**: Advanced code splitting and tree shaking
- [ ] **Image Optimization**: WebP/AVIF adoption with responsive images
- [ ] **SEO Enhancement**: Advanced structured data and meta optimization

**Developer Experience:**

- [ ] **Comprehensive Testing**: Unit, integration, and E2E test coverage
- [ ] **Storybook Integration**: Component library documentation
- [ ] **CI/CD Pipeline**: GitHub Actions for automated testing and deployment
- [ ] **Monitoring & Observability**: Error tracking and performance monitoring
- [ ] **API Documentation**: Interactive API client for easier integration

### User Experience Enhancements 🎨

**Accessibility & Usability:**

- [ ] **Screen Reader Optimization**: Enhanced ARIA labels and navigation
- [ ] **Keyboard Navigation**: Comprehensive keyboard-only interaction
- [ ] **Voice Control**: Voice commands for hands-free operation
- [ ] **High Contrast Mode**: Enhanced visibility options
- [ ] **Reduced Motion Support**: Respect user motion preferences

**Personalization:**

- [ ] **Adaptive UI**: Interface that learns from user behavior
- [ ] **Custom Themes**: User-created theme support
- [ ] **Dashboard Customization**: Drag-and-drop widget arrangement
- [ ] **Smart Defaults**: Intelligent form pre-filling and suggestions
- [ ] **Context-Aware Help**: Contextual tips and guidance system

## 🤝 Contributing

We welcome contributions from developers, designers, and health enthusiasts! Here's how you can help:

### Getting Started with Contributions

**Development Setup for Contributors:**

1. **Fork the repository** and clone your fork locally
2. **Install dependencies**: `pnpm install`
3. **Set up environment**: Copy `.env.example` to `.env.local` and configure
4. **Start development server**: `pnpm dev`
5. **Create feature branch**: `git checkout -b feature/your-feature-name`

### Contribution Guidelines

**Code Standards:**

- **TypeScript**: Always use proper typing, avoid `any` type
- **Component Structure**: Follow established patterns in `components/ui/`
- **Styling**: Use Tailwind CSS classes, follow glass morphism design system
- **Accessibility**: Ensure WCAG 2.1 compliance for all new components
- **Performance**: Consider loading states and optimization for all features
- **Mobile First**: Design and test for mobile, then enhance for desktop

**Pull Request Process:**

1. **Clear Description**: Explain the problem and your solution approach
2. **Small, Focused Changes**: Keep PRs manageable and focused on single features
3. **Visual Examples**: Include screenshots or GIFs for UI changes
4. **Testing**: Test thoroughly across different devices and browsers
5. **Documentation**: Update README and component documentation as needed

### Areas for Contribution

**Frontend Development:**

- React components and hooks
- UI/UX improvements and animations
- Mobile responsiveness enhancements
- Performance optimizations
- Accessibility improvements

**Design & UX:**

- Glass morphism component designs
- User interface improvements
- User experience research and testing
- Icon and graphic design
- Animation and micro-interaction design

**Content & Documentation:**

- Supplement database improvements
- User guide and documentation
- API documentation
- Translation and internationalization
- SEO and content optimization

**Quality Assurance:**

- Manual testing across devices
- Bug reporting and reproduction
- Test case creation
- Performance testing
- Accessibility auditing

### Development Environment

**Required Tools:**

- Node.js 18+ and PNPM 9+
- VS Code with recommended extensions
- Git for version control
- Backend API running locally or using production endpoint

**Recommended VS Code Extensions:**

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### Community Guidelines

- **Be Respectful**: Treat all community members with respect and kindness
- **Stay On Topic**: Keep discussions focused on the project and health topics
- **Share Knowledge**: Help others learn and contribute to the platform
- **Provide Feedback**: Constructive feedback helps improve the platform
- **Follow Code of Conduct**: Maintain a welcoming environment for all contributors

## � Support & Resources

### Documentation & Help

**Primary Resources:**

- **Live Application**: [https://www.bioaionics.com](https://www.bioaionics.com)
- **API Documentation**: [https://bioaionics-api.onrender.com/docs](https://bioaionics-api.onrender.com/docs)
- **GitHub Issues**: [Report bugs or request features](https://github.com/kisuro/bioascend2_fe/issues)
- **Development Guide**: This README provides comprehensive setup and contribution instructions

### Getting Help

**For Users:**

- Browse the supplement database and read community reviews
- Use the biorhythm calculator to understand your natural cycles
- Track your supplement intake and progress in the journal
- Explore the meditation library for mental wellness resources

**For Developers:**

- Follow the development setup instructions above
- Check the component structure and API integration examples
- Review the design system and glass morphism implementation
- Join the discussion in GitHub Issues for technical questions

**For Contributors:**

- Read the contribution guidelines and code standards
- Start with small improvements or bug fixes
- Reach out via GitHub Issues for guidance on larger features
- Help improve documentation and user experience

### Project Resources

**Repository Links:**

- **Frontend Repository**: [bioascend2_fe](https://github.com/kisuro/bioascend2_fe)
- **Backend Repository**: [bioascend2_be](https://github.com/kisuro/bioascend2_be)
- **Live Frontend**: [https://www.bioaionics.com](https://www.bioaionics.com)
- **Backend API**: [https://bioaionics-api.onrender.com](https://bioaionics-api.onrender.com)

**Technology Resources:**

- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **React Documentation**: [https://react.dev](https://react.dev)
- **Tailwind CSS**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Framer Motion**: [https://www.framer.com/motion/](https://www.framer.com/motion/)
- **Chart.js**: [https://www.chartjs.org/docs/](https://www.chartjs.org/docs/)

### Contact & Support

**Technical Support:**

- **GitHub Issues**: For bug reports, feature requests, and technical discussions
- **Email**: Contact the development team for enterprise inquiries and partnerships
- **Community**: Join discussions and help other users in GitHub Issues

**Health & Content:**

- All supplement information is for educational purposes only
- Consult healthcare professionals before making health decisions
- Report any inaccurate health information via GitHub Issues

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for complete details.

```
MIT License

Copyright (c) 2024 BioAionics Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🌟 Acknowledgments

**Built with ❤️ for the biohacking and health optimization community**

**Special Thanks:**

- The open-source community for the amazing tools and libraries
- Contributors who help improve the platform
- Users who provide feedback and share their health journeys
- Healthcare professionals who guide our evidence-based approach

**Technology Stack Appreciation:**

- **Vercel** for seamless deployment and hosting
- **Next.js Team** for the incredible React framework
- **Tailwind CSS** for the utility-first styling approach
- **Framer Motion** for beautiful animations
- **Chart.js** for powerful data visualizations
- **Supabase** for backend services and storage

---

_Last updated: September 2025 | Version: 2.0.0_

**Join us in building the future of personalized health optimization! 🚀**
