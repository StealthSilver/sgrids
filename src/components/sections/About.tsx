"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const About = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

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

  // Particle effect behind the about image
  useEffect(() => {
    const canvas = canvasRef.current;
    const host = heroRef.current;
    if (!canvas || !host) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.max(1, window.devicePixelRatio || 1);
    let rafId = 0;

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      color: string;
      life: number;
      maxLife: number;
    };

    const palette = [
      "rgba(255, 122, 24, ALPHA)",
      "rgba(255, 165, 77, ALPHA)",
      "rgba(168, 85, 247, ALPHA)",
      "rgba(139, 92, 246, ALPHA)",
    ];

    let particles: Particle[] = [];

    const spawn = (count: number) => {
      for (let i = 0; i < count; i++) {
        const maxLife = 240 + Math.random() * 360;
        const color = palette[Math.floor(Math.random() * palette.length)];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -(0.08 + Math.random() * 0.35),
          r: 0.6 + Math.random() * 1.6,
          color,
          life: Math.random() * maxLife,
          maxLife,
        });
      }
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(
        140,
        Math.max(60, Math.floor((width * height) / 14000))
      );
      particles = [];
      spawn(target);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Soft connecting lines between nearby particles
      const maxDist = 90;
      const lineAlphaBase = isDarkMode ? 0.08 : 0.06;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDist * maxDist) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / maxDist) * lineAlphaBase;
            ctx.strokeStyle = `rgba(255, 122, 24, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        p.life += 1;
        p.x += p.vx;
        p.y += p.vy;

        // Respawn on exit or end of life
        if (
          p.life > p.maxLife ||
          p.y < -10 ||
          p.x < -10 ||
          p.x > width + 10
        ) {
          p.x = Math.random() * width;
          p.y = height + 10;
          p.vx = (Math.random() - 0.5) * 0.25;
          p.vy = -(0.08 + Math.random() * 0.35);
          p.r = 0.6 + Math.random() * 1.6;
          p.color = palette[Math.floor(Math.random() * palette.length)];
          p.life = 0;
          p.maxLife = 240 + Math.random() * 360;
        }

        // Fade in/out across life
        const t = p.life / p.maxLife;
        const fade =
          t < 0.15 ? t / 0.15 : t > 0.85 ? (1 - t) / 0.15 : 1;
        const alpha = (isDarkMode ? 0.75 : 0.55) * fade;

        ctx.beginPath();
        ctx.fillStyle = p.color.replace("ALPHA", alpha.toFixed(3));
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        // Soft glow
        ctx.beginPath();
        ctx.fillStyle = p.color.replace(
          "ALPHA",
          (alpha * 0.25).toFixed(3)
        );
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [isDarkMode, mounted]);

  return (
    <section
      id="about"
      className="relative w-full px-4 sm:px-6 pt-6 sm:pt-10 bg-white/70 dark:bg-black/70 backdrop-blur-md overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Unified Hero: label + centered diffused image with particles and overlaid text */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative mx-auto w-full max-w-5xl min-h-[520px] sm:min-h-[600px] lg:min-h-[680px] flex items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl bg-transparent dark:bg-black/50 mb-8 sm:mb-12 lg:mb-16"
        >
          {/* Radial gradient glow behind everything */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 55% at 50% 50%, rgba(255,122,24,0.18) 0%, rgba(168,85,247,0.14) 35%, rgba(0,0,0,0) 75%)",
            }}
          />

          {/* Diffused, center-aligned about image */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <img
              src="/about-img.png"
              alt="About Smart Grid Analytics"
              className="w-[90%] sm:w-[70%] md:w-[55%] lg:w-[48%] max-w-[520px] object-contain select-none"
              style={{
                opacity: isDarkMode ? 0.5 : 0.42,
                filter: `blur(6px) saturate(1.1) ${
                  isDarkMode ? "brightness(1.1)" : "brightness(1.05)"
                }`,
                WebkitMaskImage:
                  "radial-gradient(circle at 50% 50%, #000 42%, rgba(0,0,0,0.6) 62%, rgba(0,0,0,0) 82%)",
                maskImage:
                  "radial-gradient(circle at 50% 50%, #000 42%, rgba(0,0,0,0.6) 62%, rgba(0,0,0,0) 82%)",
              }}
            />
          </div>

          {/* Particle canvas */}
          <canvas
            ref={canvasRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
          />

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
