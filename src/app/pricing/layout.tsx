import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing - CombineKit',
  description: 'Choose the perfect plan for your PDF merging needs',
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {children}
    </div>
  )
}