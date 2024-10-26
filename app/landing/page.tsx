// app/landing/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import localFont from 'next/font/local'

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

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen">
        {/* Logo Section */}
        <div className="text-center pt-8">
          <div className="mx-auto mb-2 w-24 h-12">
            <Image
              src="/logo.png"
              alt="CustoSupreme Logo"
              width={48}
              height={48}
              className="mx-auto"
            />
          </div>
          <h1 className="text-3xl md:text-4xl tracking-wider font-benzin text-white">
            CustoSupreme
          </h1>
        </div>

        {/* Main Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="z-20 text-center md:text-left pt-8 md:pt-16">
              <div className="space-y-2 mb-12">
                <h2 className="text-[#5cddff] text-5xl sm:text-6xl md:text-7xl font-benzin leading-none tracking-wide">
                  &quot;Raising
                </h2>
                <div className="text-white text-5xl sm:text-6xl md:text-7xl font-benzin leading-none tracking-wide">
                  the Standard 
                </div>
                <div className="text-5xl sm:text-6xl md:text-7xl font-benzin leading-none tracking-wide">
                  <span className="text-[#5cddff]">of Clean&quot;</span>
                </div>
              </div>

              <div className="mb-8">
                <Link 
                  href="/"
                  className="inline-block bg-[#0077cc] text-white px-8 md:px-16 py-3 md:py-4 rounded-lg text-xl md:text-2xl 
                  font-benzin tracking-wide transition-all duration-300 w-full sm:w-auto text-center hover:bg-[#0066bb]"
                >
                  Schedule a FREE Quote
                </Link>
              </div>

              <div className="relative z-20">
                <div className="absolute inset-0 bg-gradient-to-t from-[#001428] to-transparent md:hidden" />
                <p className="text-white text-xl md:text-2xl font-benzin tracking-wider relative z-30">
                  Book a quote now and receive 10% off<br className="hidden md:inline" />
                  your first month&apos;s service
                </p>
              </div>
            </div>

            {/* Image Container */}
            <div className="relative md:absolute md:right-0 md:bottom-0 md:w-[45%] h-[400px] md:h-[90%] mt-8 md:mt-0">
              <div className="absolute inset-0 md:relative w-full h-full">
                <Image
                  src="/janitor_image.png"
                  alt="Cleaning professional"
                  fill
                  className="object-contain md:object-right-bottom"
                  sizes="(max-width: 768px) 100vw, 45vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}