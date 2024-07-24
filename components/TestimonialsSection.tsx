"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Office Manager",
    company: "TechSolutions Inc.",
    content:
      "Custo Supreme has transformed our office environment. Their attention to detail and professional service have made a noticeable difference in our workplace cleanliness and employee satisfaction.",
    rating: 5,
    image: "",
  },
  {
    name: "David Chen",
    role: "Facility Manager",
    company: "Chattanooga Medical Center",
    content:
      "As a medical facility, maintaining a sterile environment is crucial. Custo Supreme consistently delivers exceptional cleaning services, adhering to our strict hygiene standards. They're reliable, thorough, and a pleasure to work with.",
    rating: 5,
    image: "",
  },
  {
    name: "Emily Rodriguez",
    role: "Store Owner",
    company: "Riverside Boutique",
    content:
      "I've worked with several cleaning services, but Custo Supreme stands out. They understand the unique needs of our retail space and always ensure our store looks immaculate for our customers.",
    rating: 5,
    image: "",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section id="testimonials" className="py-24 bg-gray-100">
      <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from businesses across Chattanooga about their experience with
            Custo Supreme.
          </p>
        </motion.div>
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center"
            >
              <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                {testimonials[currentIndex].image && (
                  <Image
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    width={150}
                    height={150}
                    className="rounded-full"
                  />
                )}
              </div>
              <div>
                
                <p className="text-gray-600 mb-6 italic">
                  &quot;{testimonials[currentIndex].content}&quot;
                </p>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-gray-500">
                    {testimonials[currentIndex].role}
                  </p>
                  <p className="text-primary font-medium">
                    {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between">
            <button
              onClick={prevTestimonial}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === currentIndex ? "bg-primary" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
