import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Space_Grotesk, Orbitron } from 'next/font/google'
import './globals.css'

const agustina = localFont({
  src: '../src/assets/fonts/Agustina.woff',
  variable: '--font-agustina',
  display: 'swap',
})

const montserrat = localFont({
  src: '../src/assets/fonts/Montserrat-Regular.ttf',
  variable: '--font-montserrat',
  display: 'swap',
})

// display: 'optional' — font loads without blocking rendering
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'optional',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'optional',
})

export const metadata: Metadata = {
  title: 'Hrithik Adhikari — Software Engineer',
  description:
    'Curiosity-driven Software Engineer. Scaled a B2C product from zero to 1M+ daily active users. Founding engineer experience. Now building AI infrastructure at TrueFoundry.',
  openGraph: {
    title: 'Hrithik Adhikari — Software Engineer',
    description: 'Curiosity-driven Software Engineer.',
    url: 'https://hrithikadhikari.in',
    siteName: 'Hrithik Adhikari',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Hrithik Adhikari — Software Engineer',
    description: 'Curiosity-driven Software Engineer.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${agustina.variable} ${montserrat.variable} ${spaceGrotesk.variable} ${orbitron.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
