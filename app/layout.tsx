import { Footer } from '@/components/footer'
import { Nav } from '@/components/nav'
import { ReadingProgress } from '@/components/reading-progress'
import { ScrollToTop } from '@/components/scroll-to-top'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s — Volodymyr Pivoshenko',
    default: 'Volodymyr Pivoshenko',
  },
  description:
    'Personal blog on software engineering, distributed systems, and developer tooling.',
  alternates: {
    types: {
      'application/rss+xml': 'https://pivoshenko.dev/rss.xml',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="bg-stone-50 text-stone-900 dark:bg-black dark:text-stone-100 font-mono antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex flex-col">
            <ReadingProgress />
            <Nav />
            <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6">
              {children}
            </main>
            <Footer />
          </div>
          <ScrollToTop />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
