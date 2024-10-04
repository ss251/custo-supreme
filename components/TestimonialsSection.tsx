"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-gray-100">
      <div className="container mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        <ReactGoogleReviews
          layout="carousel"
          featurableId={process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_ID || ""}
          reviewCardClassName="w-full sm:w-3/4 lg:w-1/2 mx-auto p-6 bg-white rounded-lg shadow-md"
        />
      </div>
    </section>
  );
}
