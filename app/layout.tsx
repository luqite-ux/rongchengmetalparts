import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { getNavigation, getSiteSettings } from '@/lib/data'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  metadataBase: new URL('https://rongchengmetalparts.com'),
  title: {
    default: 'RunCing Tech | Valves and connectors manufacturer',
    template: '%s | RunCing Tech',
  },
  description:
    'RunCing Tech (RunCing Electromechanical Technology Co., Ltd.) supplies ball valves, valve assemblies and connector assemblies in brass, stainless steel and aluminum, with OEM/ODM support.',
  applicationName: 'RunCing Tech',
  openGraph: {
    type: 'website',
    siteName: 'RunCing Tech',
    locale: 'en_US',
    url: 'https://rongchengmetalparts.com',
    images: [{ url: '/images/hero-product-range.jpg', width: 2576, height: 1073 }],
  },
  icons: {
    icon: '/images/logo-mark.png',
    apple: '/images/logo-mark.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#006a17',
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [navigation, site] = await Promise.all([getNavigation(), getSiteSettings()])

  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        <SiteHeader items={navigation.primary} />
        <main id="main-content">{children}</main>
        <SiteFooter
          site={site}
          links={navigation.footer.company}
          primary={navigation.primary}
        />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
