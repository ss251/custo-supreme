"use client"
import { motion } from 'framer-motion';
import { ClipboardCheck } from 'lucide-react';

export function InspectionsSection() {
  return (
    <section id="inspections" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Quality Assurance Inspections</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We&apos;re committed to maintaining the highest standards of cleanliness for your business.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center mb-6">
            <ClipboardCheck className="w-12 h-12 text-primary mr-4" />
            <h3 className="text-2xl font-semibold text-gray-900">50-Point Inspection</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Our retention department performs a comprehensive 50-point inspection every 4-6 weeks to ensure every aspect of your scope of work is performed diligently.
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Thorough check of all cleaned areas</li>
            <li>Verification of task completion</li>
            <li>Assessment of cleaning quality</li>
            <li>Immediate addressing of any concerns</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}