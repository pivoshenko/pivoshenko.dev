import { Footer } from '@/components/footer'
import { Nav } from '@/components/nav'
import { ReadingProgress } from '@/components/reading-progress'
import { ScrollToTop } from '@/components/scroll-to-top'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})
import { ThemeProvider } from 'next-themes'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://pivoshenko.dev'),
  title: {
    template: '%s — Volodymyr Pivoshenko',
    default: 'Volodymyr Pivoshenko',
  },
  description:
    'Practical notes on software engineering, distributed systems, and developer tooling.',
  keywords: [
    'Volodymyr Pivoshenko',
    'software engineering',
    'distributed systems',
    'developer tooling',
    'AI',
    'machine learning',
  ],
  authors: [{ name: 'Volodymyr Pivoshenko', url: 'https://pivoshenko.dev' }],
  creator: 'Volodymyr Pivoshenko',
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': 'https://pivoshenko.dev/rss.xml',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://pivoshenko.dev',
    siteName: 'pivoshenko.dev',
    title: 'Volodymyr Pivoshenko',
    description:
      'Practical notes on software engineering, distributed systems, and developer tooling.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Volodymyr Pivoshenko',
    description:
      'Practical notes on software engineering, distributed systems, and developer tooling.',
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
      className={jetbrainsMono.variable}
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
