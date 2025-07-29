import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - CombineKit',
  description: 'Get in touch with our team for support or business inquiries',
}

export default function ContactLayout({
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