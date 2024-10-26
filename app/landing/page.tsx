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
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative h-[calc(100vh-120px)]">
          {/* Mobile Background Image */}
          <div className="absolute inset-0 md:hidden">
            <Image
              src="/janitor_image.png"
              alt="Cleaning professional background"
              fill
              className="object-contain object-bottom z-0"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001428] via-[#001428]/80 to-transparent z-10" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center relative h-full">
            {/* Text Content */}
            <div className="z-20 text-center pt-8 md:pt-16 md:text-left">
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

              <p className="text-white text-xl md:text-2xl font-benzin tracking-wider relative">
                Book a quote now and receive 10% off<br className="hidden md:inline" />
                your first month&apos;s service
              </p>
            </div>

            {/* Desktop Image Container */}
            <div className="hidden md:block absolute -right-1/3 bottom-0 w-[650px] h-[850px]">
              <Image
                src="/janitor_image.png"
                alt="Cleaning professional"
                fill
                className="object-contain object-right-bottom"
                sizes="650px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
