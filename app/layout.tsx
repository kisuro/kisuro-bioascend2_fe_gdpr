import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/layout/navigation"
import { ErrorHandler } from "@/components/error-handler"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Bioascend - Biohacking, Mental Health & Longevity",
  description: "Modern web app for biohacking, mental health optimization, and longevity tracking",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stopColor='%23E57373'/%3E%3Cstop offset='50%25' stopColor='%2364B5F6'/%3E%3Cstop offset='100%25' stopColor='%2381C784'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='50' cy='50' r='45' fill='none' stroke='url(%23bg)' strokeWidth='3'/%3E%3Cpath d='M 20 50 Q 30 30, 40 50 T 60 50 T 80 50' fill='none' stroke='%23E57373' strokeWidth='2.5' strokeLinecap='round' opacity='0.8'/%3E%3Cpath d='M 20 45 Q 30 25, 40 45 T 60 45 T 80 45' fill='none' stroke='%2364B5F6' strokeWidth='2.5' strokeLinecap='round' opacity='0.8'/%3E%3Cpath d='M 20 55 Q 30 35, 40 55 T 60 55 T 80 55' fill='none' stroke='%2381C784' strokeWidth='2.5' strokeLinecap='round' opacity='0.8'/%3E%3C/svg%3E",
        sizes: "32x32",
        type: "image/svg+xml",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${inter.style.fontFamily};
  --font-sans: ${inter.variable};
  --font-heading: ${spaceGrotesk.variable};
}
        `}</style>
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <ThemeProvider>
          <ErrorHandler />
          <div className="min-h-screen">
            <Navigation />
            <main className="pt-20">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
