import React from 'react'
import './styles.css'
import './globals.css'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/lib/utils'


export const metadata = {
  description: "The Japanese Animation Club at UCLA. JAC at UCLA. UCLA's anime club.",
  title: 'JAC @ UCLA',
}

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <main>{children}</main>
      </body>
    </html>
  )
}
