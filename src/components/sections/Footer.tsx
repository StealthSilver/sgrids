"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string | undefined>();

  useEffect(() => {
    setMounted(true);


    const isDark = document.documentElement.classList.contains("dark");
    setCurrentTheme(isDark ? "dark" : "light");
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setCurrentTheme(isDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const footerLinks = {
    product: [
      { name: "SCADA", href: "#" },
      { name: "EMS", href: "#" },
      { name: "PPC", href: "#" },
      { name: "EPM", href: "#" },
      { name: "Intelligent Bidding", href: "#" },
    ],
    solutions: [
      { name: "Solar Parks", href: "#" },
      { name: "Wind Farms", href: "#" },
      { name: "Hybrid Plants", href: "#" },
      { name: "Energy Storage", href: "#" },
      { name: "Grid Integration", href: "#" },
    ],
    company: [
      { name: "About Us", href: "/#about" },
      { name: "Careers", href: "/careers" },
      { name: "Blogs", href: "/blogs" },
      { name: "Contact", href: "/#contact" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Cookie Policy", href: "/cookie-policy" },
    ],
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://in.linkedin.com/company/smart-grid-analytics",
      target: "_blank",
      rel: "noopener noreferrer",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "X",
      href: "https://x.com/smartgrids",
      target: "_blank",
      icon: (
        <FaXTwitter className="w-6 h-6" />
      ),
    },
  ];

  return (
    <footer
      id="footer"
      className="relative w-full overflow-hidden bg-white/90 dark:bg-black/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-12 mb-8 sm:mb-12">
          {/* Logo and Description */}
          <div className="col-span-2 lg:col-span-2 mb-4 sm:mb-0">
            <div className="mb-3 sm:mb-4">
              <Link href="/" className="cursor-pointer">
                <motion.img
                  key={mounted ? currentTheme : "default"}
                  src={
                    !mounted
                      ? "/logo_light.svg"
                      : currentTheme === "dark"
                        ? "/logo_dark.svg"
                        : "/logo_light.svg"
                  }
                  alt="Smart Grid Analytics"
                  className="h-8 sm:h-10 w-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 font-sans">
              Engineering the operating system for the renewable century with
              AI-powered solutions for clean energy optimization.
            </p>
            {/* Social Links */}
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition-all duration-300"
                  aria-label={social.name}
                  target={social.target}
                  rel={social.rel}
                >
                  {React.isValidElement(social.icon)
                    ? React.cloneElement(social.icon as React.ReactElement<any>, {
                        ...(React.isValidElement(social.icon) ? (social.icon.props as object) : {}),
                        className: social.name === "LinkedIn" 
                          ? "w-3 h-3 sm:w-6 sm:h-6" 
                          : "w-4 h-4 sm:w-6 sm:h-6"
                      })
                    : social.icon}
                </a>
              ))}
            </div>
          </div>

        
          {Object.entries(footerLinks).map(([section, links]) => (
            <div
              key={section}
              className="mb-0 lg:mb-0"
            >
              <h3 className="text-gray-900 dark:text-gray-100 font-bold text-xs sm:text-sm uppercase tracking-wider mb-1.5 sm:mb-4 font-sans">
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </h3>
              <ul className="flex flex-col space-y-1.5 lg:space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors text-xs sm:text-sm font-sans whitespace-nowrap">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-[100vw] border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 sm:space-y-3 md:space-y-0 gap-2 sm:gap-0">
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-sans text-center md:text-left">
              © {currentYear} Smart Grid Analytics. All rights reserved.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-sans text-center md:text-right">
              Powered by{" "}
              <a href="/#solvyn" className="font-semibold text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                Solvyn
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
