"use client"

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  { before: '/before-1.jpg', after: '/after-1.jpg', alt: 'Office cleaning before and after' },
  { before: '/before-2.jpg', after: '/after-2.jpg', alt: 'Medical facility cleaning before and after' },
  { before: '/before-3.jpg', after: '/after-3.jpg', alt: 'Industrial space cleaning before and after' },
  { before: '/before-4.jpg', after: '/after-4.jpg', alt: 'Retail store cleaning before and after' },
];

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextImage = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <section id="gallery" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Work in Action</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See the Custo Supreme difference with our before and after gallery.
          </p>
        </div>
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row gap-8"
            >
              <div className="flex-1">
                <Image
                  src={images[activeIndex].before}
                  alt={`Before: ${images[activeIndex].alt}`}
                  width={500}
                  height={300}
                  layout="responsive"
                  className="rounded-lg shadow-md"
                />
                <p className="text-center mt-2 font-semibold">Before</p>
              </div>
              <div className="flex-1">
                <Image
                  src={images[activeIndex].after}
                  alt={`After: ${images[activeIndex].alt}`}
                  width={500}
                  height={300}
                  layout="responsive"
                  className="rounded-lg shadow-md"
                />
                <p className="text-center mt-2 font-semibold">After</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between">
            <button
              onClick={prevImage}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={nextImage}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === activeIndex ? 'bg-primary' : 'bg-gray-300'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}