import { type Metadata } from 'next'
import {
  ClerkProvider
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'CombineKit - Merge PDF Files Online',
  description: 'Combine multiple PDF files into one document in seconds. Free, secure, and no installation required.',
  keywords: ['PDF merger', 'combine PDF', 'merge PDF files', 'PDF tools', 'online PDF merger'],
  authors: [{ name: 'CombineKit Team' }],
  creator: 'CombineKit',
  publisher: 'CombineKit',
  openGraph: {
    title: 'CombineKit - Merge PDF Files Online',
    description: 'Combine multiple PDF files into one document in seconds. Free, secure, and no installation required.',
    url: 'https://combinekit.com',
    siteName: 'CombineKit',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CombineKit - PDF Merger',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CombineKit - Merge PDF Files Online',
    description: 'Combine multiple PDF files into one document in seconds. Free, secure, and no installation required.',
    images: ['/twitter-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}