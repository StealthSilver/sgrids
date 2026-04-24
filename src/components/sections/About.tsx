"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const About = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (mounted) {
      const isDark =
        resolvedTheme === "dark" ||
        theme === "dark" ||
        document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    }
  }, [theme, resolvedTheme, mounted]);

  return (
    <section
      id="about"
      className="relative w-full px-4 sm:px-6 pt-6 sm:pt-10 bg-white/70 dark:bg-black/70 backdrop-blur-md overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Unified Hero: label + centered diffused image and overlaid text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative mx-auto w-full max-w-5xl min-h-[520px] sm:min-h-[600px] lg:min-h-[680px] flex items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl bg-transparent dark:bg-black/50 mb-8 sm:mb-12 lg:mb-16"
        >
          {/* Diffused, center-aligned about image */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <img
              src="/about-img.png"
              alt="About Smart Grid Analytics"
              className="w-[90%] sm:w-[70%] md:w-[55%] lg:w-[48%] max-w-[520px] object-contain select-none"
              style={{
                opacity: isDarkMode ? 0.5 : 0.7,
                filter: `${isDarkMode ? "blur(6px)" : "blur(3px)"} saturate(1.1) ${
                  isDarkMode ? "brightness(1.1)" : "brightness(1.05)"
                }`,
                WebkitMaskImage: isDarkMode
                  ? "radial-gradient(circle at 50% 50%, #000 42%, rgba(0,0,0,0.6) 62%, rgba(0,0,0,0) 82%)"
                  : "radial-gradient(circle at 50% 50%, #000 50%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0) 86%)",
                maskImage: isDarkMode
                  ? "radial-gradient(circle at 50% 50%, #000 42%, rgba(0,0,0,0.6) 62%, rgba(0,0,0,0) 82%)"
                  : "radial-gradient(circle at 50% 50%, #000 50%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0) 86%)",
              }}
            />
          </div>

          {/* Vignette for text readability (dark mode only) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden dark:block"
            style={{
              background:
                "radial-gradient(55% 50% at 50% 50%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 75%)",
            }}
          />

          {/* Overlaid, center-aligned text content */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-8 py-14 sm:py-20 lg:py-24 max-w-3xl text-gray-600 dark:text-white dark:[text-shadow:0_1px_3px_rgba(0,0,0,0.45)]">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-xs sm:text-sm font-semibold uppercase tracking-wider font-sans mb-6 sm:mb-8 text-gray-500 dark:text-white dark:[text-shadow:0_1px_2px_rgba(0,0,0,0.35)]"
            >
              About Us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-gray-900 dark:text-white font-sans tracking-tight"
            >
              We're not just building software  we're engineering the operating
              system for the renewable century.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              viewport={{ once: true }}
              className="mt-6 sm:mt-8 text-sm sm:text-base lg:text-lg leading-relaxed font-sans text-gray-600 dark:text-white"
            >
              At Smart Grid Analytics, our mission is to transform how clean
              energy is orchestrated, controlled, and optimized. Our flagship
              platform,{" "}
              <span className="font-semibold text-orange-600 dark:text-orange-400 [text-shadow:none]">
                Solvyn
              </span>
              , brings together SCADA, EMS, PPC, EPM, and IB (Intelligent
              Bidding) into a single AI-powered core that makes renewable
              systems faster, smarter, and more reliable than ever.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-4 sm:mt-5 text-xs sm:text-sm lg:text-base leading-relaxed font-sans text-gray-600 dark:text-white"
            >
              From solar parks and wind farms to hybrid plants and large-scale
              storage,{" "}
              <span className="font-semibold text-orange-600 dark:text-orange-400 [text-shadow:none]">
                Solvyn
              </span>{" "}
              helps operators run assets with precision, investors unlock
              maximum value, and governments achieve their clean energy goals.
              It's not just about monitoring — it's about turning data into
              foresight, compliance into confidence, and megawatts into
              intelligence.
            </motion.p>
          </div>
        </motion.div>

        {/* About the Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 lg:mt-32"
        >
          <p className="text-center text-gray-500 dark:text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-6 sm:mb-8 font-sans">
            About our team
          </p>

          <div className="space-y-12 sm:space-y-16 md:space-y-24 lg:space-y-48 mt-8 sm:mt-12 lg:mt-28 py-4 sm:py-6 lg:py-8">
            {/* Team Member 1 - Kumar M */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative border-2 border-gray-300 dark:border-gray-700 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-10 backdrop-blur-md bg-white/50 dark:bg-black/50 min-h-[200px] sm:min-h-[280px] lg:min-h-[320px]"
            >
              {/* Mobile/Tablet Layout */}
              <div className="lg:hidden flex flex-col items-center mb-4 sm:mb-6">
                <div className="w-32 sm:w-40 h-32 sm:h-40 rounded-2xl overflow-hidden mb-4">
                  <img
                    src="/Kumar.png"
                    alt="Kumar M"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                  Kumar M
                </h4>
                <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">
                  Founder & CEO
                </p>
              </div>

              {/* Desktop Layout - Image on right */}
              <div className="hidden lg:block absolute -top-12 -right-4 bottom-0 w-80 overflow-hidden rounded-3xl">
                <img
                  src="/Kumar.png"
                  alt="Kumar M"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="pt-0 lg:pt-6 lg:pr-80 lg:pl-4">
                <h4 className="hidden lg:block text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  Kumar M
                </h4>
                <p className="hidden lg:block text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
                  Founder & CEO
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm lg:text-base leading-relaxed font-sans text-center lg:text-left">
                  A visionary in the energy sector with over 20 years of hands-on experience, Kumar M has been at the forefront of renewable innovation, grid automation, and digital transformation. Since founding Armax in 2005 and later Smart Grid Analytics, he has led the development of intelligent energy platforms that now power gigawatts of assets globally. His work bridges deep engineering insight with entrepreneurial foresight—delivering technologies like Solvyn that are redefining how renewable infrastructure is monitored, controlled, and optimized.
                </p>
              </div>
            </motion.div>

            {/* Team Member 2 - Venkata Krishnan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative border-2 border-gray-300 dark:border-gray-700 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-10 backdrop-blur-md bg-white/50 dark:bg-black/50 min-h-[200px] sm:min-h-[280px] lg:min-h-[320px]"
            >
              {/* Mobile/Tablet Layout */}
              <div className="lg:hidden flex flex-col items-center mb-4 sm:mb-6">
                <div className="w-32 sm:w-40 h-32 sm:h-40 rounded-2xl overflow-hidden mb-4">
                  <img
                    src="/Venkata.png"
                    alt="Venkata Krishnan"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                  Venkata Krishnan
                </h4>
                <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">
                  Co-founder & CGO
                </p>
              </div>

              {/* Desktop Layout - Image on left */}
              <div className="hidden lg:block absolute -top-12 -left-4 bottom-0 w-80 overflow-hidden rounded-3xl">
                <img
                  src="/Venkata.png"
                  alt="Venkata Krishnan"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="pt-0 lg:pt-6 lg:pl-80 lg:pr-4">
                <h4 className="hidden lg:block text-3xl font-bold text-gray-900 dark:text-white mb-3 text-right">
                  Venkata Krishnan
                </h4>
                <p className="hidden lg:block text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6 text-right">
                  Co-founder & CGO
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm lg:text-base leading-relaxed font-sans text-center lg:text-right">
                  A growth architect with over two decades of experience in renewable energy and industrial automation, Venkata Krishnan brings a rare blend of strategic insight and executional excellence. As Co-founder and CGO of Smart Grid Analytics, he leads global expansion, partnerships, and customer success—driving Solvyn's adoption across diverse energy markets. His deep understanding of utility-scale operations and ability to translate technical solutions into business value makes him a catalyst for transformation in the clean energy ecosystem.
                </p>
              </div>
            </motion.div>

            {/* Team Member 3 - Tirumaleswara Reddy K */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative border-2 border-gray-300 dark:border-gray-700 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-10 backdrop-blur-md bg-white/50 dark:bg-black/50 min-h-[200px] sm:min-h-[280px] lg:min-h-[320px]"
            >
              {/* Mobile/Tablet Layout */}
              <div className="lg:hidden flex flex-col items-center mb-4 sm:mb-6">
                <div className="w-32 sm:w-40 h-32 sm:h-40 rounded-2xl overflow-hidden mb-4">
                  <img
                    src="/Tirumaleshwar.png"
                    alt="Tirumaleswara Reddy K"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                  Tirumaleswara Reddy K
                </h4>
                <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">
                  CTO
                </p>
              </div>

              {/* Desktop Layout - Image on right */}
              <div className="hidden lg:block absolute -top-12 -right-4 bottom-0 w-80 overflow-hidden rounded-3xl">
                <img
                  src="/Tirumaleshwar.png"
                  alt="Tirumaleswara Reddy K"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="pt-0 lg:pt-6 lg:pr-80 lg:pl-4">
                <h4 className="hidden lg:block text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  Tirumaleswara Reddy K
                </h4>
                <p className="hidden lg:block text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
                  CTO
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm lg:text-base leading-relaxed font-sans text-center lg:text-left">
                  A software innovator with over two decades of experience in architecting scalable enterprise platforms, Tirumaleswara Reddy K leads the technology vision at Smart Grid Analytics. As CTO, he drives the design and development of Solvyn—an integrated, cloud-native platform built for the complexities of modern renewable energy systems. His expertise spans system architecture, data engineering, cybersecurity, and intelligent automation, making him the backbone of Solvyn's transformation from concept to global deployment.
                </p>
              </div>
            </motion.div>

            {/* Team Member 4 - Pankaj Ghai */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative border-2 border-gray-300 dark:border-gray-700 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-10 backdrop-blur-md bg-white/50 dark:bg-black/50 min-h-[200px] sm:min-h-[280px] lg:min-h-[320px]"
            >
              {/* Mobile/Tablet Layout */}
              <div className="lg:hidden flex flex-col items-center mb-4 sm:mb-6">
                <div className="w-32 sm:w-40 h-32 sm:h-40 rounded-2xl overflow-hidden mb-4">
                  <img
                    src="/Pankaj.png"
                    alt="Pankaj Ghai"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                  Pankaj Ghai
                </h4>
                <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">
                  Senior Advisor
                </p>
              </div>

              {/* Desktop Layout - Image on left */}
              <div className="hidden lg:block absolute -top-12 -left-4 bottom-0 w-80 overflow-hidden rounded-3xl">
                <img
                  src="/Pankaj.png"
                  alt="Pankaj Ghai"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="pt-0 lg:pt-6 lg:pl-80 lg:pr-4">
                <h4 className="hidden lg:block text-3xl font-bold text-gray-900 dark:text-white mb-3 text-right">
                  Pankaj Ghai
                </h4>
                <p className="hidden lg:block text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6 text-right">
                  Senior Advisor
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm lg:text-base leading-relaxed font-sans text-center lg:text-right">
                  A seasoned leader in private equity and climate infrastructure, Pankaj Ghai brings deep financial and strategic insight to Smart Grid Analytics. As Senior Advisor, he plays a key role in guiding Solvyn's North American growth, forging investor alliances, and shaping long-term value creation. With a track record of driving capital efficiency and scaling climate-focused ventures, he bridges financial discipline with purpose-driven innovation in the clean energy sector.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
