'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Users, Trophy, Clock } from 'lucide-react';
import { SectionProps } from '@/types';

const reasons = [
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: 'Proven Results',
    description: 'Track record of delivering successful projects that exceed expectations.'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Expert Team',
    description: 'Seasoned professionals with extensive experience in cutting-edge technologies.'
  },
  {
    icon: <Trophy className="w-8 h-8" />,
    title: 'Award-Winning',
    description: 'Recognized for excellence in design, development, and client satisfaction.'
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: 'Timely Delivery',
    description: 'Committed to meeting deadlines without compromising on quality.'
  }
];

const Why: React.FC<SectionProps> = ({ id = 'why', className }) => {
  return (
    <section 
      id={id}
      className={`py-20 bg-gray-50 dark:bg-gray-900 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose MeshSpire?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We combine creativity, technical expertise, and strategic thinking to deliver exceptional results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-4 bg-white dark:bg-black p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-mesh-purple dark:text-mesh-green flex-shrink-0">
                {reason.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {reason.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Why;
