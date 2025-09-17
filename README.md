# BioAionics - Biohacking Platform Frontend

A comprehensive Next.js-based biohacking platform that empowers users to optimize their health through supplements tracking, biorhythm analysis, meditation, journaling, and AI-powered insights.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/kisuros-projects/v0-bioascend)
[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 🌐 Live Application

**Production URL**: [https://vercel.com/kisuros-projects/v0-bioascend](https://vercel.com/kisuros-projects/v0-bioascend)

**Backend API**: Deployed on [Render](https://render.com) with [Supabase PostgreSQL](https://supabase.com)

## ✨ Features

### 🧬 Biorhythm Calculator

- **Personal Rhythm Analysis**: Calculate physical, emotional, intellectual, and spiritual cycles
- **Extended Biorhythms**: Additional cycles including intuitive, aesthetic, and charismatic patterns
- **Interactive Visualizations**: Beautiful charts with extrema points and trend analysis
- **Date Range Selection**: Flexible time range analysis (7-30 days)
- **Real-time Calculations**: Instant updates with smooth animations

### 💊 Comprehensive Supplement Database

- **Detailed Supplement Profiles**: Evidence-based information with dosage, timing, and cycling data
- **Advanced Search & Filtering**: Filter by categories, goals, evidence levels, and manufacturers
- **User Reviews & Ratings**: Community-driven supplement feedback system
- **Smart Recommendations**: AI-powered supplement suggestions based on goals
- **Rating Aggregation**: Comprehensive rating statistics and trends

### 📖 Personal Journal System

- **Supplement Intake Tracking**: Log daily supplement consumption with dosages and timing
- **Progress Monitoring**: Visual analytics of supplement effectiveness over time
- **Smart Reminders**: Customizable notification system for supplement schedules
- **Historical Analysis**: Comprehensive data insights and pattern recognition
- **Export Capabilities**: Data export for external analysis

### 🧠 Mind Enhancement Hub

- **Meditation Library**: Curated collection of guided meditations and soundscapes
- **Audio Categories**: Brainwave entrainment, nature sounds, mantras, and focus music
- **Custom Playlists**: Personal meditation and focus session management
- **Session Tracking**: Monitor meditation minutes and consistency
- **Binaural Beats**: Specialized audio for cognitive enhancement

### 👤 User Profile & Authentication

- **Secure Authentication**: JWT-based auth with email verification
- **Profile Management**: Avatar uploads (Supabase storage), bio, and preference settings
- **Statistics Dashboard**: Track supplements, journal entries, meditation, and biorhythm checks
- **Achievement System**: Progress tracking and milestone recognition
- **Data Privacy**: GDPR-compliant user data management

### 🤖 AI Assistant (Coming Soon)

- **Personalized Insights**: AI-powered health and supplement recommendations
- **Natural Language Interface**: Chat-based interaction for health queries
- **Biorhythm Analysis**: AI interpretation of biorhythm patterns
- **Smart Suggestions**: Context-aware supplement and lifestyle recommendations

## 🏗 Tech Stack

### Core Framework

- **Next.js 15.2** - React framework with App Router and Server Components
- **React 19** - Latest React with concurrent features and RSC support
- **TypeScript 5** - Type-safe development with strict type checking

### Styling & UI

- **Tailwind CSS 4.1** - Utility-first CSS framework with custom design system
- **Framer Motion** - Advanced animations and micro-interactions
- **Radix UI** - Accessible, unstyled component primitives
- **Custom Glass Morphism** - Modern glass design system with liquid effects
- **Lucide React** - Beautiful icon library with consistent styling

### State Management & Data

- **React Hook Form** - Performant forms with validation
- **Zod** - Schema validation for type-safe data handling
- **Custom Hooks** - Reusable state management for user auth and data
- **Local Storage** - Client-side data persistence for user preferences

### Visualization & Charts

- **Chart.js & React-Chartjs-2** - Interactive biorhythm charts and analytics
- **Recharts** - Responsive charts for supplement analytics
- **Custom D3 Visualizations** - Advanced data visualization components

### Development & Build

- **PNPM** - Fast, disk space efficient package manager
- **ESLint & Prettier** - Code quality and formatting
- **PostCSS** - Advanced CSS processing with plugins
- **Geist Font** - Modern typography from Vercel

### Deployment & Integration

- **Vercel** - Serverless deployment with automatic CI/CD
- **Backend Integration** - REST API integration with FastAPI backend
- **Supabase Storage** - File uploads and avatar management
- **Environment Configuration** - Multi-environment setup (dev/staging/prod)

## 📁 Project Structure

\`\`\`
app/
 ├─ layout.tsx              # Root layout with navigation and providers
 ├─ page.tsx                # Homepage with feature showcase
 ├─ globals.css             # Global styles and CSS variables
 ├─ auth/                   # Authentication pages
 │   ├─ login/page.tsx      # User login with form validation
 │   ├─ register/page.tsx   # User registration
 │   ├─ verify-email/       # Email verification flow
 │   ├─ forgot-password/    # Password reset request
 │   └─ reset-password/     # Password reset completion
 ├─ biorhythms/page.tsx     # Biorhythm calculator with advanced charts
 ├─ supplements/            # Supplement database and reviews
 │   ├─ page.tsx            # Supplement listing with filters
 │   ├─ [slug]/page.tsx     # Individual supplement details
 │   └─ loading.tsx         # Loading states
 ├─ journal/page.tsx        # Personal health journal and tracking
 ├─ mind/page.tsx           # Meditation and audio enhancement hub
 ├─ profile/page.tsx        # User profile and settings management
 └─ assistant/page.tsx      # AI-powered health assistant

components/
 ├─ ui/                     # Core UI component library
 │   ├─ glass-card.tsx      # Glass morphism card component
 │   ├─ liquid-button.tsx   # Animated button with liquid effects
 │   ├─ supplement-loader.tsx # Loading animations
 │   ├─ theme-provider.tsx  # Dark/light theme management
 │   └─ page-backgrounds.tsx # Animated background components
 ├─ layout/                 # Layout and navigation components
 │   └─ navigation.tsx      # Main navigation with mobile support
 ├─ biorhythms/            # Biorhythm-specific components
 │   ├─ biorhythm-chart.tsx # Interactive biorhythm visualization
 │   └─ biorhythm-summary.tsx # Analysis and insights
 ├─ supplements/           # Supplement database components
 │   ├─ supplement-card.tsx # Individual supplement preview
 │   ├─ supplement-filters.tsx # Advanced filtering system
 │   └─ supplements-client.tsx # Client-side supplement management
 ├─ journal/              # Journal and tracking components
 │   ├─ journal-overview.tsx # Dashboard and analytics
 │   ├─ supplement-manager.tsx # Personal supplement management
 │   ├─ intake-logger.tsx   # Daily intake tracking
 │   └─ journal-history.tsx # Historical data analysis
 └─ mind/                 # Meditation and audio components
     ├─ audio-library.tsx  # Audio track management
     ├─ audio-player.tsx   # Custom audio player
     └─ playlist-manager.tsx # Playlist creation and management

lib/
 ├─ utils.ts               # Utility functions and helpers
 ├─ data/                  # Mock data and type definitions
 │   ├─ supplements.ts     # Supplement database schema
 │   ├─ audio.ts           # Audio library data
 │   └─ journal.ts         # Journal data structures
 ├─ hooks/                 # Custom React hooks
 │   ├─ use-user.ts        # User authentication and profile management
 │   └─ use-toast.ts       # Toast notification system
 └─ stores/               # State management (if needed)

public/
 ├─ seed/                  # Seed data for development
 └─ [media files]          # Images, icons, and audio files
\`\`\`

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** (20+ recommended)
- **PNPM 9+** - Fast package manager
- **Backend API** - BioAionics backend running locally or on Render

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

3. **Environment setup**:
   Create `.env.local` file in the root:

   \`\`\`env
   # API Configuration
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   # Production: https://your-render-app.onrender.com

   # Feature Flags
   NEXT_PUBLIC_ENABLE_AI_ASSISTANT=false
   NEXT_PUBLIC_ENABLE_PREMIUM_FEATURES=true

   # Analytics (optional)
   NEXT_PUBLIC_GA_ID=your_google_analytics_id

   # Environment
   NODE_ENV=development
   \`\`\`

4. **Start the development server**:

   \`\`\`bash
   pnpm dev
   \`\`\`

   The application will be available at `http://localhost:3000`

5. **Build for production**:
   \`\`\`bash
   pnpm build
   pnpm start
   \`\`\`

### Backend Integration

Ensure the BioAionics backend is running:

**Local Development**:

\`\`\`bash
# In the backend directory
uvicorn app.main:app --reload --port 8000
\`\`\`

**Production**: Backend automatically deployed on Render with Supabase PostgreSQL

## 🎨 Design System

### Glass Morphism Components

- **GlassCard**: Multi-variant glass effect containers
- **LiquidButton**: Animated buttons with liquid hover effects
- **GradientBackgrounds**: Dynamic animated backgrounds for each page

### Theme System

- **Dark/Light Mode**: Automatic system preference detection
- **Custom Color Palette**: Carefully crafted for accessibility and beauty
- **Responsive Design**: Mobile-first approach with fluid layouts
- **Typography**: Geist font family with optimized loading

### Animation Philosophy

- **Framer Motion**: Smooth page transitions and micro-interactions
- **Loading States**: Custom loaders with biorhythm-inspired animations
- **Progressive Enhancement**: Graceful degradation for performance

## 🔗 API Integration

### Authentication

\`\`\`typescript
// User registration
POST /v1/auth/register
{
  "email": "user@example.com",
  "password": "securePassword",
  "name": "User Name"
}

// User login (sets JWT cookie)
POST /v1/auth/login
{
  "email": "user@example.com",
  "password": "securePassword"
}

// Get user profile
GET /v1/auth/me
// Returns: UserOut with profile data
\`\`\`

### Supplements

\`\`\`typescript
// Get supplements with filtering
GET /v1/supplements?page=1&q=ashwagandha&goals=focus,energy

// Get supplement details
GET /v1/supplements/{slug}

// Add review (authenticated)
POST /v1/reviews/{supplement_id}
{
  "user": "username",
  "rating": 5,
  "comment": "Great supplement!"
}
\`\`\`

### Error Handling

- **Custom Error Boundaries**: Graceful error handling with user-friendly messages
- **API Error Mapping**: Consistent error presentation across the application
- **Offline Support**: Basic offline functionality with local storage fallback

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

## 🚀 Deployment

### Vercel Deployment (Recommended)

The application is optimized for Vercel deployment:

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Environment Variables**: Configure production environment variables in Vercel dashboard
3. **Build Settings**:
   - Build Command: `pnpm build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`
4. **Domain Configuration**: Set up custom domain and SSL certificates

### Manual Deployment

\`\`\`bash
# Build the application
pnpm build

# Export static files (if needed)
pnpm export

# Deploy to your preferred hosting platform
\`\`\`

### Environment Variables for Production

\`\`\`env
NEXT_PUBLIC_API_BASE_URL=https://your-backend.onrender.com
NEXT_PUBLIC_ENABLE_AI_ASSISTANT=true
NEXT_PUBLIC_ENABLE_PREMIUM_FEATURES=true
NEXT_PUBLIC_GA_ID=your_production_ga_id
NODE_ENV=production
\`\`\`

## 🧪 Development

### Code Quality

- **TypeScript Strict Mode**: Comprehensive type checking
- **ESLint Configuration**: Custom rules for Next.js and React best practices
- **Prettier Integration**: Consistent code formatting
- **Husky Hooks**: Pre-commit quality checks (if configured)

### Performance Optimization

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Bundle Analysis**: Built-in bundle analyzer for optimization insights
- **Lazy Loading**: Efficient component and route loading

### Testing (Future Implementation)

- **Jest + Testing Library**: Component and integration testing
- **Cypress**: End-to-end testing for critical user flows
- **Visual Regression**: Automated UI consistency testing

## 📋 Roadmap

### Completed ✅

- [x] Core biorhythm calculator with 7 cycles
- [x] Comprehensive supplement database with reviews
- [x] Personal journal with intake tracking
- [x] User authentication and profile management
- [x] Mind enhancement hub with audio library
- [x] Responsive design with glass morphism
- [x] Backend integration with real API
- [x] Production deployment on Vercel

### In Progress 🚧

- [ ] AI-powered health assistant
- [ ] Advanced analytics dashboard
- [ ] Mobile app development (React Native)
- [ ] Supplement recommendation engine refinement

### Future Features 🔮

- [ ] Social features and community integration
- [ ] Wearable device integrations (Apple Health, Google Fit)
- [ ] Advanced biomarker tracking
- [ ] Telemedicine integration
- [ ] Multi-language support
- [ ] Offline-first architecture
- [ ] Advanced data visualization
- [ ] Custom supplement stacks

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow code standards**: Use TypeScript, ESLint, and Prettier
4. **Write meaningful commits**: Follow conventional commit format
5. **Test thoroughly**: Ensure all features work as expected
6. **Submit a pull request**: Include detailed description of changes

### Development Guidelines

- **Component Structure**: Follow the established component patterns
- **TypeScript**: Always use proper typing, avoid `any`
- **Accessibility**: Ensure all components are accessible (WCAG 2.1)
- **Performance**: Consider loading states and optimization
- **Mobile First**: Design for mobile, enhance for desktop

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 📞 Support & Contact

- **GitHub Issues**: [Create an issue](https://github.com/kisuro/bioascend2_fe/issues)
- **Documentation**: This README and inline code comments
- **Email**: Contact the development team for enterprise inquiries

---

**Project Links**:

- **Frontend Repository**: [bioascend2_fe](https://github.com/kisuro/bioascend2_fe)
- **Backend Repository**: [bioascend2_be](https://github.com/kisuro/bioascend2_be)
- **Live Application**: [BioAionics Platform](https://vercel.com/kisuros-projects/v0-bioascend)
- **Backend API**: [API Documentation](https://your-backend.onrender.com/docs)

Built with ❤️ for the biohacking community
