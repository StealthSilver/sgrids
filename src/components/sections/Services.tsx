'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Rocket, Shield } from 'lucide-react';
import { SectionProps } from '@/types';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

const services = [
  {
    title: 'Web Development',
    description: 'Custom web solutions built with modern technologies and best practices for optimal performance.',
    icon: <Code className="w-8 h-8" />,
  },
  {
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive designs that enhance user experience and drive meaningful engagement.',
    icon: <Palette className="w-8 h-8" />,
  },
  {
    title: 'Performance Optimization',
    description: 'Lightning-fast websites optimized for speed, SEO, and conversions that deliver results.',
    icon: <Rocket className="w-8 h-8" />,
  },
  {
    title: 'Security & Maintenance',
    description: 'Comprehensive security measures and ongoing maintenance support for peace of mind.',
    icon: <Shield className="w-8 h-8" />,
  }
];

const Services: React.FC<SectionProps> = ({ id = 'services', className }) => {
  return (
    <section 
      id={id}
      className={`py-20 bg-white dark:bg-black relative overflow-hidden ${className}`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-mesh-purple/5 to-mesh-green/5 dark:from-mesh-purple/10 dark:to-mesh-green/10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <span className="px-4 py-2 bg-gradient-to-r from-mesh-purple to-mesh-green text-white rounded-full text-sm font-medium">
              Our Services
            </span>
          </motion.div>
          
          <TextGenerateEffect 
            words="Comprehensive Digital Solutions"
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          />
          
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We provide comprehensive digital solutions to help your business thrive in the modern world.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <HoverEffect items={services} />
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
