import type { Metadata } from 'next'

export const metadata = {
  title: 'Farming Comic Game' as const,
  description: 'An interactive comic-based farming adventure' as const,
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' as const
} satisfies Metadata;
