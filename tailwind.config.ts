import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular'],
      },
      typography: (theme: (key: string) => string) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.stone[700]'),
            '--tw-prose-headings': theme('colors.stone[900]'),
            '--tw-prose-links': theme('colors.stone[900]'),
            '--tw-prose-bold': theme('colors.stone[900]'),
            '--tw-prose-counters': theme('colors.stone[500]'),
            '--tw-prose-bullets': theme('colors.stone[400]'),
            '--tw-prose-hr': theme('colors.stone[200]'),
            '--tw-prose-quotes': theme('colors.stone[900]'),
            '--tw-prose-quote-borders': theme('colors.stone[300]'),
            '--tw-prose-captions': theme('colors.stone[500]'),
            '--tw-prose-code': theme('colors.stone[900]'),
            '--tw-prose-pre-code': theme('colors.stone[100]'),
            '--tw-prose-pre-bg': theme('colors.stone[900]'),
            '--tw-prose-th-borders': theme('colors.stone[300]'),
            '--tw-prose-td-borders': theme('colors.stone[200]'),
            '--tw-prose-invert-body': theme('colors.stone[300]'),
            '--tw-prose-invert-headings': theme('colors.stone[100]'),
            '--tw-prose-invert-links': theme('colors.stone[100]'),
            '--tw-prose-invert-bold': theme('colors.stone[100]'),
            '--tw-prose-invert-counters': theme('colors.stone[400]'),
            '--tw-prose-invert-bullets': theme('colors.stone[600]'),
            '--tw-prose-invert-hr': theme('colors.stone[700]'),
            '--tw-prose-invert-quotes': theme('colors.stone[100]'),
            '--tw-prose-invert-quote-borders': theme('colors.stone[700]'),
            '--tw-prose-invert-captions': theme('colors.stone[400]'),
            '--tw-prose-invert-code': theme('colors.stone[100]'),
            '--tw-prose-invert-pre-code': theme('colors.stone[300]'),
            '--tw-prose-invert-pre-bg': 'transparent',
            '--tw-prose-invert-th-borders': theme('colors.stone[600]'),
            '--tw-prose-invert-td-borders': theme('colors.stone[700]'),
            maxWidth: 'none',
            a: {
              fontWeight: '400',
              textUnderlineOffset: '3px',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '0.875em',
              fontWeight: '400',
              backgroundColor: theme('colors.stone[100]'),
              padding: '0.125rem 0.3rem',
              borderRadius: '0.25rem',
            },
            pre: {
              borderRadius: '0.5rem',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
            },
          },
        },
        invert: {
          css: {
            code: {
              backgroundColor: theme('colors.stone[800]'),
            },
            'pre code': {
              backgroundColor: 'transparent',
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
}

export default config
