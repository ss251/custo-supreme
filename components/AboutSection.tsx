'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";

const features = [
  "8+ years of commercial cleaning expertise",
  "Licensed and insured professionals",
  "Tailored cleaning plans for each client",
  "Eco-friendly cleaning products and methods",
  "24/7 customer support"
];

const beforeAfterImages = [
  { before: "/about/before-1.jpg", after: "/about/after-1.jpg", description: "" },
  { before: "/about/before-2.jpg", after: "/about/after-2.jpg", description: "" },
  { before: "/about/before-3.jpg", after: "/about/after-3.jpg", description: "" },
  { before: "/about/before-4.JPG", after: "/about/after-4.JPG", description: "" },
];

const ImageSkeleton = () => (
  <div className="bg-gray-200 animate-pulse rounded-lg w-full h-full"></div>
);

const FounderImageSkeleton = () => (
  <div className="bg-gray-200 animate-pulse rounded-full w-20 h-20"></div>
);

export function AboutSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(Array(beforeAfterImages.length * 2).fill(false));
  const [founderImageLoaded, setFounderImageLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % beforeAfterImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + beforeAfterImages.length) % beforeAfterImages.length);
  };

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && videoRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const videoRatio = 16 / 9;
        const containerRatio = width / height;

        if (containerRatio > videoRatio) {
          videoRef.current.style.width = '100%';
          videoRef.current.style.height = 'auto';
        } else {
          videoRef.current.style.width = 'auto';
          videoRef.current.style.height = '100%';
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fallback to show images after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setImagesLoaded(prev => prev.map(() => true));
      setFounderImageLoaded(true);
    }, 3000); // 3 seconds fallback

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About Custo Supreme</h2>
            <p className="text-lg text-gray-600 mb-6">
              With over 8 years of experience in the commercial cleaning industry, Custo Supreme has established itself as a leader in providing top-quality cleaning services to businesses across Chattanooga.
            </p>
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-center text-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <CheckCircle className="text-primary mr-2" />
                  {feature}
                </motion.li>
              ))}
            </ul>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                {!founderImageLoaded && <FounderImageSkeleton />}
                <Image
                  src="/haven-charquette.jpg"
                  alt="Haven Nelson and Charquette Nelson - CEO and Founder"
                  width={80}
                  height={80}
                  className={`rounded-full mr-4 ${founderImageLoaded ? '' : 'hidden'}`}
                  onLoad={() => setFounderImageLoaded(true)}
                  onError={() => setFounderImageLoaded(true)} // Show image even if it fails to load
                />
                <div>
                  <h3 className="text-xl font-semibold">Charquette Nelson and Haven Nelson</h3>
                  <p className="text-gray-600">Founder & CEO</p>
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">
                &quot;Our mission is to provide unparalleled cleaning services
                that not only meet but exceed our clients&apos; expectations.
                We&apos;re committed to creating healthier, more productive
                spaces for businesses across Chattanooga.&quot;
              </p>
              <p className="text-gray-600">
                Haven and Charquette Nelson, the dynamic duo behind Custo
                Supreme, bring a perfect blend of vision and execution to our
                company. As CEO and Founder respectively, they share a passion
                for revolutionizing the cleaning industry through innovative
                solutions and unparalleled customer service. Their combined
                expertise in business management and industry knowledge drives
                Custo Supreme&apos;s commitment to excellence, ensuring that every
                client receives nothing short of the best in professional
                cleaning services.
              </p>
            </div>
          </div>
          <div>
            <div ref={containerRef} className="relative h-[400px] mb-8 overflow-hidden rounded-lg shadow-xl">
              <video
                ref={videoRef}
                src="/about-video.MOV"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
              />
              <div className="absolute inset-0 bg-black/30 z-10" />
              <div className="absolute bottom-4 right-4 flex space-x-2 z-30">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={toggleVideo}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </Button>
              </div>
            </div>
            <div className="relative mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Cleaning Transformations</h3>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    {!imagesLoaded[currentImageIndex * 2] && <ImageSkeleton />}
                    <Image
                      src={beforeAfterImages[currentImageIndex].before}
                      alt={`Before - ${beforeAfterImages[currentImageIndex].description}`}
                      layout="fill"
                      objectFit="cover"
                      className={imagesLoaded[currentImageIndex * 2] ? '' : 'hidden'}
                      onLoad={() => handleImageLoad(currentImageIndex * 2)}
                      onError={() => handleImageLoad(currentImageIndex * 2)} // Show image even if it fails to load
                    />
                    <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 text-sm rounded">
                      Before
                    </div>
                  </div>
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    {!imagesLoaded[currentImageIndex * 2 + 1] && <ImageSkeleton />}
                    <Image
                      src={beforeAfterImages[currentImageIndex].after}
                      alt={`After - ${beforeAfterImages[currentImageIndex].description}`}
                      layout="fill"
                      objectFit="cover"
                      className={imagesLoaded[currentImageIndex * 2 + 1] ? '' : 'hidden'}
                      onLoad={() => handleImageLoad(currentImageIndex * 2 + 1)}
                      onError={() => handleImageLoad(currentImageIndex * 2 + 1)} // Show image even if it fails to load
                    />
                    <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 text-sm rounded">
                      After
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <p className="text-center mt-2 text-gray-600">{beforeAfterImages[currentImageIndex].description}</p>
              <Button
                size="icon"
                variant="ghost"
                onClick={prevImage}
                className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white/75 shadow-md"
              >
                <ChevronLeft size={24} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={nextImage}
                className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white/75 shadow-md"
              >
                <ChevronRight size={24} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}