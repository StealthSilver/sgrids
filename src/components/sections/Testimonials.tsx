'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionProps } from '@/types';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

const testimonials = [
  {
    quote: "MeshSpire transformed our digital presence completely. Their attention to detail and innovative approach exceeded our expectations. The team's expertise in modern web technologies is truly remarkable.",
    name: "Sarah Johnson",
    designation: "CEO, TechStart",
    src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=1000&auto=format&fit=crop"
  },
  {
    quote: "Working with MeshSpire was a game-changer. They delivered a beautiful, high-performing website that significantly boosted our conversions. Their process is seamless and results-driven.",
    name: "Michael Chen",
    designation: "Founder, GrowthLab",
    src: "https://images.unsplash.com/photo-1507003211169-0f1adf54012f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    quote: "The team at MeshSpire is incredibly professional and talented. They understood our vision and brought it to life perfectly. The level of creativity and technical skill is outstanding.",
    name: "Emily Rodriguez",
    designation: "Marketing Director, InnovateCorp",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
  }
];

const Testimonials: React.FC<SectionProps> = ({ id = 'testimonials', className }) => {
  return (
    <section 
      id={id}
      className={`py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black relative overflow-hidden ${className}`}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-mesh-purple/10 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-mesh-green/10 rounded-full blur-xl" />
      </div>

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
            <span className="px-4 py-2 bg-gradient-to-r from-mesh-green to-mesh-purple text-white rounded-full text-sm font-medium">
              Client Stories
            </span>
          </motion.div>
          
          <TextGenerateEffect 
            words="What Our Clients Say"
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          />
          
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
