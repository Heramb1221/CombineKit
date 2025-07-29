import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PDF Merger Dashboard - CombineKit',
  description: 'Merge your PDF files quickly and easily with our online PDF merger tool.',
}

export default function DashboardLayout({
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