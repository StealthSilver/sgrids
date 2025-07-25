'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SectionProps } from '@/types';
import Button from '@/components/ui/Button';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

const CTA: React.FC<SectionProps> = ({ id = 'cta', className }) => {
  return (
    <section 
      id={id}
      className={`py-20 bg-gradient-to-r from-mesh-purple via-mesh-purple to-mesh-green relative overflow-hidden ${className}`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>

          <TextGenerateEffect 
            words="Ready to Transform Your Digital Presence?"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
          />
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <TextGenerateEffect 
              words="Join hundreds of satisfied clients who have elevated their business with our innovative solutions. Let's create something amazing together."
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              duration={0.03}
            />
          </motion.div>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-mesh-green hover:bg-mesh-green/90 text-white border-none shadow-lg"
            >
              Start Your Project <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-mesh-purple transition-all duration-300"
            >
              Schedule Consultation
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
