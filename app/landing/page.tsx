// app/landing/page.tsx
'use client';

import Link from 'next/link'
import Image from 'next/image'
import localFont from 'next/font/local'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { InlineWidget } from "react-calendly";
import { toast } from 'react-hot-toast';

const benzin = localFont({
  src: '../fonts/Benzin-Bold.ttf',
  variable: '--font-benzin'
})

export default function LandingPage() {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/createAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      if (response.ok) {
        setShowLeadForm(false);
        setShowCalendly(true);
        toast.success('Information submitted successfully!');
      } else {
        throw new Error('Failed to submit lead information');
      }
    } catch (error) {
      console.error('Error creating lead:', error);
      toast.error('Failed to submit information. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLeadData(prev => ({ ...prev, [name]: value }));
  };

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
                <button 
                  onClick={() => setShowLeadForm(true)}
                  className="inline-block bg-[#0077cc] text-white px-8 md:px-16 py-3 md:py-4 rounded-lg text-xl md:text-2xl 
                  font-benzin tracking-wide transition-all duration-300 w-full sm:w-auto text-center hover:bg-[#0066bb]"
                >
                  Schedule a FREE Quote
                </button>
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

      {/* Lead Capture Form Modal */}
      <AnimatePresence>
        {showLeadForm && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg w-full max-w-[400px] m-4 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setShowLeadForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-4">Schedule a Quote</h2>
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={leadData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={leadData.email}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={leadData.phone}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={leadData.company}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  value={leadData.street}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={leadData.city}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={leadData.state}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="text"
                  name="zipCode"
                  placeholder="Zip Code"
                  value={leadData.zipCode}
                  onChange={handleInputChange}
                  required
                />
                <Button type="submit" className="w-full">Submit</Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendly Inline Widget Modal */}
      <AnimatePresence>
        {showCalendly && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-4 rounded-lg w-full max-w-[800px] h-[600px] m-4 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setShowCalendly(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
              >
                <X size={24} />
              </button>
              <InlineWidget
                url="https://calendly.com/h-nelson-custosupreme/available-walk-through-times"
                styles={{ height: '100%' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
