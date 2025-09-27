import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import { LanguageProvider } from "@/components/language-provider"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Provider } from "react-redux"
import { store } from "@/store/store"
import { ClientProviders } from "./client"

export const metadata: Metadata = {
  title: "Glam Nest - Luxury Hair Styling & Beauty Sanctuary",
  description:
    "Transform your look at Glam Nest, where artistry meets luxury. Expert hair styling, cutting-edge techniques, and personalized beauty experiences in an exclusive salon sanctuary.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ClientProviders>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false}>
          <LanguageProvider>
            <Toaster/>
            <div className="min-h-screen flex flex-col">
              <Suspense fallback={<div>Loading...</div>}>
                <Navigation />
              </Suspense>
              <main className="flex-1">{children}</main>
              <Suspense fallback={<div>Loading...</div>}>
                <Footer />
              </Suspense>
            </div>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </ClientProviders>
      </body>

    </html>
  )
}
