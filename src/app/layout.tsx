import type { Metadata } from 'next'

import { Inter, Montserrat, Roboto } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import Header from '@/components/header'
import Footer from '@/components/footer'

import Background from '@/assets/background.png'

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
})

const roboto = Roboto({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'Cubos App',
  description: 'criado por Cubos app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`${inter.className} ${montserrat.className} ${roboto.className} ${montserrat.variable} ${roboto.variable} antialiased min-h-screen mx-auto flex flex-col h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main
            className="max-w-[1366px] min-w-[414px] mx-auto w-full h-full"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,1) 50%), url(${Background.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
            }}
          >
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
