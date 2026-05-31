import { ReadingProgress } from '@/components/reading-progress'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { rssLink } from 'pivoshenko.ui'
import {
  siteViewport,
  siteMetadata,
  SiteLayout,
} from 'pivoshenko.ui/next/site-layout'
import './globals.css'

export const metadata = {
  ...siteMetadata({
    url: 'https://pivoshenko.dev',
    brand: 'pivoshenko.dev',
    title: 'Volodymyr Pivoshenko',
    titleTemplate: '%s — Volodymyr Pivoshenko',
    description: 'Tech blog',
  }),
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
}

export const viewport = siteViewport

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SiteLayout
      brand="pivoshenko.dev"
      navLinks={[
        { href: '/', label: 'Home' },
        { href: '/blog', label: 'Blog' },
        { href: '/projects', label: 'Projects' },
      ]}
      footerExtras={[rssLink]}
      beforeShell={<ReadingProgress />}
      afterShell={<SpeedInsights />}
    >
      {children}
    </SiteLayout>
  )
}
