'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn, scrollToSection } from '@/lib/utils';
import { NavItem } from '@/types';
import { useActiveSection } from '@/hooks/useActiveSection';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Button from '@/components/ui/Button';

const navItems: NavItem[] = [
  { name: 'Home', href: '#home', section: 'home' },
  { name: 'Services', href: '#services', section: 'services' },
  { name: 'Why Us', href: '#why', section: 'why' },
  { name: 'Testimonials', href: '#testimonials', section: 'testimonials' },
  { name: 'Contact', href: '#contact', section: 'contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    scrollToSection('home');
  };

  return (
    <motion.nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-800/20' 
          : 'bg-transparent'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0 cursor-pointer"
            onClick={handleLogoClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-2xl font-bold bg-gradient-to-r from-mesh-purple to-mesh-green bg-clip-text text-transparent">
              MeshSpire
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => handleNavClick(item.section)}
                  className={cn(
                    'px-3 py-2 text-sm font-medium transition-all duration-200 relative',
                    activeSection === item.section
                      ? 'text-mesh-purple dark:text-mesh-green'
                      : 'text-gray-700 dark:text-gray-300 hover:text-mesh-purple dark:hover:text-mesh-green'
                  )}
                >
                  {item.name}
                  {activeSection === item.section && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-mesh-purple to-mesh-green"
                      layoutId="activeTab"
                      initial={false}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="primary" size="sm">
              Join Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-mesh-purple dark:hover:text-mesh-green transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 dark:bg-black/95 backdrop-blur-md border-t border-gray-200/20 dark:border-gray-800/20">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => handleNavClick(item.section)}
                  className={cn(
                    'block w-full text-left px-3 py-2 text-base font-medium transition-all duration-200',
                    activeSection === item.section
                      ? 'text-mesh-purple dark:text-mesh-green bg-mesh-purple/10 dark:bg-mesh-green/10'
                      : 'text-gray-700 dark:text-gray-300 hover:text-mesh-purple dark:hover:text-mesh-green hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  )}
                >
                  {item.name}
                </button>
              ))}
              <div className="px-3 pt-2">
                <Button variant="primary" size="md" className="w-full">
                  Join Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
