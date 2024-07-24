'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle, Award, Shield } from 'lucide-react';

export function AboutSection() {
  const features = [
    "8+ years of commercial cleaning expertise",
    "Licensed and insured professionals",
    "Tailored cleaning plans for each client",
    "Eco-friendly cleaning products and methods",
    "24/7 customer support"
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About Custo Supreme</h2>
            <p className="text-lg text-gray-600 mb-6">
              With over 8 years of experience in the commercial cleaning industry, Custo Supreme has established itself as a leader in providing top-quality cleaning services to businesses across Chattanooga.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              As a licensed and insured company, we take pride in our commitment to excellence and professionalism. Our team of experts is dedicated to maintaining the highest standards of cleanliness and hygiene for your business premises.
            </p>
            <ul className="space-y-3">
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
          </motion.div>
          <motion.div
            className="relative h-96 lg:h-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/about-image.jpg"
              alt="Custo Supreme Cleaning Team"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <Award className="text-primary mr-2" />
                <span className="font-semibold">8+ Years of Excellence</span>
              </div>
              <div className="flex items-center">
                <Shield className="text-primary mr-2" />
                <span className="font-semibold">Licensed & Insured</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}