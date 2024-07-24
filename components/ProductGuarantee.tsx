"use client"
import { motion } from 'framer-motion';
import { Shield, BriefcaseMedical, Sparkles } from 'lucide-react';

export function ProductGuarantee() {
  return (
    <section id="product-guarantee" className="py-24 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Product Guarantee</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We use only the highest quality products to ensure the best results for your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Shield className="w-16 h-16 text-primary mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Hospital Grade Products</h3>
            <p className="text-gray-700">
              Custo Supreme uses commercial, hospital grade products that not only clean but sanitize spaces.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <BriefcaseMedical className="w-16 h-16 text-primary mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Virus Protection</h3>
            <p className="text-gray-700">
              Our products help prevent an abundance of viruses, including Covid-19, ensuring a safe environment.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Sparkles className="w-16 h-16 text-primary mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">High-Grade Wax</h3>
            <p className="text-gray-700">
              We use high-grade wax on floors to ensure an unmatched shine that lasts.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}