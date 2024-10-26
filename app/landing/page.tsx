// app/landing/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import localFont from 'next/font/local'

// Font setup - using a wider, more geometric font to match design
const benzin = localFont({
  src: '../fonts/Benzin-Bold.ttf',
  variable: '--font-benzin'
})

export default function LandingPage() {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#001428] to-[#002952] relative overflow-hidden ${benzin.variable}`}>
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(0,40,80,0.3) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(0,40,80,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Logo Section */}
        <div className="text-center pt-8">
          {/* Logo Placeholder */}
          <div className="mx-auto mb-2 w-24 h-12">
            <Image
              src="/logo.png"
              alt="CustoSupreme Logo"
              width={48}
              height={48}
              className="mx-auto"
            />
          </div>
          <h1 className="text-4xl tracking-wider font-benzin text-white drop-shadow-glow">
            CustoSupreme
          </h1>
        </div>

        {/* Content Section - adjusted spacing to match design */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-12">
          {/* Text Content - exact positioning and font sizes */}
          <div className="flex-1 space-y-6">
            <div className="space-y-0">
              <h2 className="text-[#5cddff] text-7xl font-benzin leading-none tracking-wide">
                &quot;Raising
              </h2>
              <div className="text-white text-7xl font-benzin leading-none tracking-wide">
                the Standard 
              </div>
              <div className="text-7xl font-benzin leading-none tracking-wide">
                <span className="text-[#5cddff]">of Clean&quot;</span>
              </div>
            </div>

            {/* CTA Button - exact styling from design */}
            <div className="pt-12">
              <Link 
                href="/"
                className="inline-block bg-[#0077cc] text-white px-16 py-4 rounded-lg text-2xl 
                font-benzin tracking-wide transition-all duration-300"
              >
                Schedule a FREE Quote
              </Link>
            </div>

            {/* Subtext - exact font and spacing */}
            <p className="text-white text-2xl font-benzin pt-8 tracking-wider opacity-90">
              Book a quote now and receive 10% off<br />
              your first month&apos;s service
            </p>
          </div>

          {/* Image Section - exact positioning */}
          <div className="flex-1 flex justify-end">
            <div className="relative w-[500px] h-[600px]">
              <Image
                src="/janitor_image.png"
                alt="Cleaning professional"
                width={500}
                height={600}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}