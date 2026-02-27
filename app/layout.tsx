import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s — Volodymyr Pivoshenko',
    default: 'Volodymyr Pivoshenko',
  },
  description:
    'Personal blog on software engineering, distributed systems, and developer tooling.',
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
      <body className="bg-stone-50 text-stone-900 dark:bg-[#0c0a09] dark:text-stone-100 font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex flex-col">
            <Nav />
            <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-12">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
