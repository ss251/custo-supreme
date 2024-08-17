"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Briefcase, Hospital, GraduationCap, Factory, ShoppingBag, Sparkles, WashingMachine, Construction, DoorClosed } from 'lucide-react';

const routineCleans = [
  { icon: Building, title: "Corporate Offices" },
  { icon: Hospital, title: "Medical Buildings" },
  { icon: GraduationCap, title: "Schools and Daycares" },
  { icon: Factory, title: "Industrial Spaces" },
  { icon: ShoppingBag, title: "Retail Stores" },
];

const floorRevival = [
  { title: "Strip and Wax" },
  { title: "Floor Burnishing" },
  { title: "Carpet Cleaning" },
];

const specialProjects = [
  { icon: DoorClosed, title: "Exit Cleans" },
  { icon: WashingMachine, title: "Deep Cleans" },
  { icon: Construction, title: "Post Construction Cleans" },
];

export function ServicesSection() {
  const [activeTab, setActiveTab] = useState('routine');

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Commercial Cleaning Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your business will receive a tailored scope of work, fitting your specific cleaning and sanitation needs. We guarantee to fix any cleaning concerns within 24 hours.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <button
            className={`px-6 py-2 mr-4 ${activeTab === 'routine' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'} rounded-full`}
            onClick={() => setActiveTab('routine')}
          >
            Routine Cleans
          </button>
          <button
            className={`px-6 py-2 mr-4 ${activeTab === 'floor' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'} rounded-full`}
            onClick={() => setActiveTab('floor')}
          >
            Floor Revival
          </button>
          <button
            className={`px-6 py-2 ${activeTab === 'special' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'} rounded-full`}
            onClick={() => setActiveTab('special')}
          >
            Special Projects
          </button>
        </div>

        {activeTab === 'routine' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {routineCleans.map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <service.icon className="w-16 h-16 text-primary mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'floor' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {floorRevival.map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Sparkles className="w-16 h-16 text-primary mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'special' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialProjects.map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <service.icon className="w-16 h-16 text-primary mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}