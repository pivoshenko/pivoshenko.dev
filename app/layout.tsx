import { ReadingProgress } from '@/components/reading-progress'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { PageShell, rssLink } from 'pivoshenko.ui'

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
    card: 'summary_large_image',
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
      data-scroll-behavior="smooth"
      className={jetbrainsMono.variable}
    >
      <body className="bg-stone-50 text-stone-900 dark:bg-black dark:text-stone-100 font-mono antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReadingProgress />
          <PageShell
            brand="pivoshenko.dev"
            navLinks={[
              { href: '/', label: 'Home' },
              { href: '/blog', label: 'Blog' },
              { href: '/projects', label: 'Projects' },
            ]}
            footerExtras={[rssLink]}
          >
            {children}
          </PageShell>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
