import type { Metadata } from 'next'
import { Roboto_Flex, Material_Symbols_Rounded } from 'next/font/google'
import './globals.css'

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-flex',
})

const materialSymbols = Material_Symbols_Rounded({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-material-symbols',
})

export const metadata: Metadata = {
  title: 'M3 Next.js Starter',
  description: 'Material Design 3 design system for Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${robotoFlex.variable} ${materialSymbols.variable}`}>
      <body className={robotoFlex.className}>{children}</body>
    </html>
  )
}
