import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import Head from 'next/head'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "CustoSupreme",
    "description": "Professional commercial cleaning services in Chattanooga, TN",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main Street",
      "addressLocality": "Chattanooga",
      "addressRegion": "TN",
      "postalCode": "37402",
      "addressCountry": "US"
    },
    "telephone": "+1-123-456-7890",
    "url": "https://www.custosupreme.com",
    "image": "https://www.custosupreme.com/logo.png",
    "priceRange": "$$",
    "openingHours": "Mo-Fr 08:00-18:00",
    "sameAs": [
      "https://www.facebook.com/custosupreme",
      "https://www.instagram.com/custosupreme",
      "https://www.linkedin.com/company/custosupreme"
    ],
    "areaServed": {
      "@type": "City",
      "name": "Chattanooga"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 35.0456,
        "longitude": -85.3097
      },
      "geoRadius": "30000"
    }
  };

  return (
    <html lang="en" className={inter.variable}>
      <Head>
        <title>CustoSupreme - Professional Cleaning Services</title>
        <meta name="description" content="CustoSupreme offers top-quality residential and commercial cleaning services. Trust our professional team to keep your space spotless." />
        <meta name="keywords" content="cleaning services, residential cleaning, commercial cleaning, professional cleaners" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
      <body className={cn('font-sans antialiased')}>
        {children}
      </body>
    </html>
  )
}