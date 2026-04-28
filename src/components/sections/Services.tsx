"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ServicesBeams } from "../ui/ServicesBeams";
import { useServicesAnimation } from "../../hooks/useServicesAnimation";
import { Points } from "../../types/solvynTypes";
import Image from "next/image";
import { useTheme } from "next-themes";
import { reveal, revealScale } from "@/lib/scrollReveal";
import { useDiagramAnimationReady } from "@/lib/useDiagramAnimationReady";

// Import icons for features
import stackIcon from "@/app/Icons/stack.svg";
import technologyIcon from "@/app/Icons/technology.svg";
import provenIcon from "@/app/Icons/Proven.svg";
import innovationIcon from "@/app/Icons/INNOVATION.svg";
import energyIcon from "@/app/Icons/energyefficiency.svg";
import aiIcon from "@/app/Icons/AiTechnology.svg";
import { Icon } from "@/components/ui/Icon";

export const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  // Create refs for the 4 energy icons
  const bessRef = useRef<HTMLDivElement>(null);
  const solarRef = useRef<HTMLDivElement>(null);
  const windRef = useRef<HTMLDivElement>(null);
  const hydrogenRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Screen size detection for responsive layout
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [points, setPoints] = useState<Points | null>(null);

  const { animationReady: beamAnimationReady, markDiagramImageLoaded } = useDiagramAnimationReady(
    mounted,
    5
  );

  useEffect(() => {
    setMounted(true);
    
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640); // sm breakpoint
      setIsTablet(width >= 640 && width < 1024); // md-lg breakpoint
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Icon active states
  const [iconActive, setIconActive] = useState<boolean[]>([false, false, false, false]);

  // Refs for beam animation
  const pathRefs = useRef<SVGPathElement[]>([]);
  const beamRefs = useRef<{ circle: SVGPathElement | null; core: SVGPathElement | null; pulse: SVGCircleElement | null }[]>(
    Array.from({ length: 4 }, () => ({ circle: null, core: null, pulse: null }))
  );
  const progressRefs = useRef<number[]>([0, 0, 0, 0]); // All start from origin (sgrids logo)

  // Handler to set icon active state
  const handleIconActive = useCallback((index: number, active: boolean) => {
    setIconActive((prev) => {
      const newState = [...prev];
      newState[index] = active;
      return newState;
    });
  }, []);

  // Measure positions - use useCallback to prevent recreation
  const measure = useCallback(() => {
    const container = containerRef.current;
    const centerEl = centerRef.current;
    if (!container || !centerEl) return;

    // Ensure container has dimensions before measuring
    const containerRect = container.getBoundingClientRect();
    if (containerRect.width === 0 || containerRect.height === 0) return;

    const centerRect = centerEl.getBoundingClientRect();

    // Ensure center element is visible and has dimensions
    if (centerRect.width === 0 || centerRect.height === 0) return;

    // Origin: bottom-center of the sgrids logo so the beams emanate from the
    // bottom edge of the logo rather than from inside it.
    const origin = {
      x: centerRect.left + centerRect.width / 2 - containerRect.left,
      y: centerRect.bottom - containerRect.top,
    };

    const targets: { x: number; y: number }[] = [];
    const refs = [bessRef, solarRef, windRef, hydrogenRef];

    for (const ref of refs) {
      const el = ref.current;
      if (!el) continue;
      const targetEl = el.querySelector("[data-beam-target]") as HTMLElement | null;
      const sourceRect = (targetEl || el).getBoundingClientRect();
      
      // Ensure target element has dimensions
      if (sourceRect.width === 0 && sourceRect.height === 0) continue;
      
      const x = sourceRect.left + sourceRect.width / 2 - containerRect.left;
      const y = sourceRect.top - containerRect.top;
      
      if (isNaN(x) || isNaN(y) || !isFinite(x) || !isFinite(y)) continue;
      
      if (isFinite(x) && isFinite(y) && !isNaN(x) && !isNaN(y)) {
        targets.push({ x, y });
      }
    }

    if (targets.length === 4 && 
        isFinite(origin.x) && isFinite(origin.y) && 
        !isNaN(origin.x) && !isNaN(origin.y)) {
        setPoints((prevPoints) => {
        const tolerance = 1;
        if (prevPoints) {
          const originChanged = Math.abs(prevPoints.origin.x - origin.x) > tolerance ||
                                Math.abs(prevPoints.origin.y - origin.y) > tolerance;
          const targetsChanged = prevPoints.targets.some((target, i) => {
            if (!targets[i]) return true;
            return Math.abs(target.x - targets[i].x) > tolerance ||
                   Math.abs(target.y - targets[i].y) > tolerance;
          });
          
          if (!originChanged && !targetsChanged) {
            return prevPoints;
          }
        }
        
        return { origin, targets };
      });
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const scheduleMeasure = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(measure);
      });
    };

    const resizeObserver = new ResizeObserver(scheduleMeasure);

    const observeElements = () => {
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }
      if (centerRef.current) {
        resizeObserver.observe(centerRef.current);
      }
      [bessRef, solarRef, windRef, hydrogenRef].forEach((ref) => {
        if (ref.current) {
          resizeObserver.observe(ref.current);
        }
      });
    };

    observeElements();

    // IntersectionObserver: re-run measurements whenever the section scrolls
    // into view. This is the key fix for the "animation only works after a
    // refresh" bug — the framer-motion `whileInView` entry animations start
    // the icons/logo at scale 0, which gives them a 0×0 bounding box. Without
    // this observer, we'd measure too early (when everything is collapsed)
    // and never re-measure once the entry animation completes.
    let intersectionTimers: ReturnType<typeof setTimeout>[] = [];
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          intersectionTimers.forEach((t) => clearTimeout(t));
          intersectionTimers = [
            setTimeout(scheduleMeasure, 0),
            setTimeout(scheduleMeasure, 100),
            setTimeout(scheduleMeasure, 300),
            setTimeout(scheduleMeasure, 600),
            setTimeout(scheduleMeasure, 1000),
            setTimeout(scheduleMeasure, 1500),
          ];
        }
      },
      { threshold: [0, 0.1, 0.25, 0.5] }
    );
    if (containerRef.current) {
      intersectionObserver.observe(containerRef.current);
    }

    scheduleMeasure();

    const handleResize = scheduleMeasure;
    window.addEventListener("resize", handleResize);

    const timers = [
      setTimeout(scheduleMeasure, 50),
      setTimeout(scheduleMeasure, 150),
      setTimeout(scheduleMeasure, 400),
      setTimeout(scheduleMeasure, 800),
      setTimeout(scheduleMeasure, 1500),
    ];

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      intersectionTimers.forEach((t) => clearTimeout(t));
      window.removeEventListener("resize", handleResize);
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [measure, isMobile, isTablet, mounted]);

  // Trigger a fresh measurement after any of the entry animations complete
  // (center logo scaling from 0 → 1, or the energy icons sliding up). Without
  // this, we rely on setTimeouts racing the animation, which is what caused
  // the "animation only works on refresh" bug.
  const handleEntryAnimationComplete = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(measure);
      setTimeout(measure, 100);
    });
  }, [measure]);

  // Animation hook
  useServicesAnimation({
    points,
    pathRefs,
    beamRefs,
    progressRefs,
    setIconActive: handleIconActive,
    enabled: beamAnimationReady,
  });

  const energyServices = [
    {
      ref: bessRef,
      icon: "/BESS.svg",
      title: "BESS",
      description: "Battery Energy Storage Systems",
    },
    {
      ref: solarRef,
      icon: "/Solar.svg",
      title: "Solar",
      description: "Solar Power Solutions",
    },
    {
      ref: windRef,
      icon: "/wind-power.svg",
      title: "Wind",
      description: "Wind Energy Solutions",
    },
    {
      ref: hydrogenRef,
      icon: "/GreenHydrogen.svg",
      title: "Green Hydrogen",
      description: "Green Hydrogen Solutions",
    },
  ];

  const featureData = [
    {
      icon: technologyIcon,
      title: "TRULY AGNOSTIC",
      description: "Platform-independent solution that works seamlessly across all systems and technologies.",
    },
    {
      icon: stackIcon,
      title: "MODULAR AND SCALABLE",
      description: "Flexible architecture that grows with your infrastructure and adapts to changing needs.",
    },
    {
      icon: energyIcon,
      title: "SEAMLESS INTEGRATION",
      description: "Effortlessly connects with existing grid systems for unified energy management.",
    },
    {
      icon: innovationIcon,
      title: "RAPID INNOVATION",
      description: "Continuous updates and cutting-edge features to stay ahead of industry demands.",
    },
    {
      icon: provenIcon,
      title: "PROVEN TRACK-RECORD",
      description: "Trusted by industry leaders with demonstrated success in real-world deployments.",
    },
    {
      icon: aiIcon,
      title: "FUTURE-READY",
      description: "AI-powered analytics and cloud-based infrastructure built for tomorrow's challenges.",
    },
  ];

  return (
    <section
      id="services"
      className="relative w-full px-4 sm:px-6 pt-2 sm:pt-12 md:pt-20 bg-white/70 dark:bg-black/70 backdrop-blur-md overflow-x-hidden"
    >
      {/* ====== TITLE ====== */}
      <div className="max-w-7xl mx-auto mb-2 sm:mb-8 md:mb-12">
      <motion.div
          {...reveal({ transition: { duration: 0.9 } })}
          className="mb-0 sm:mb-6 md:mb-8 lg:mb-16"
        >
          <p className="text-center text-gray-500 dark:text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 sm:mb-4 md:mb-6 lg:mb-8 font-sans">
            Services
          </p>
        </motion.div>

        <motion.p
          {...reveal({ offset: 18, transition: { duration: 0.9, delay: 0.2 } })}
          className="text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg font-sans leading-relaxed max-w-3xl mx-auto px-4"
        >
          Comprehensive energy solutions powered by cutting-edge technology
        </motion.p>
      </div>

      {/* ====== CENTER ANIMATION ====== */}
      <motion.div
        {...revealScale({ from: 0.95, transition: { duration: 0.9, delay: 0.4 } })}
        onAnimationComplete={handleEntryAnimationComplete}
        className="max-w-6xl mx-auto"
      >
        <div
          ref={containerRef}
          className="relative w-full min-h-[400px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[500px] flex items-center justify-center px-2 sm:px-4 py-4 sm:py-12"
        >
          {/* Center logo */}
          <motion.div
            ref={centerRef}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.6,
              type: "spring",
              bounce: 0.4,
            }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            onAnimationComplete={handleEntryAnimationComplete}
            className="absolute top-12 sm:top-16 md:top-20 left-1/2 -translate-x-1/2 z-20"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-orange-500 via-purple-600 to-orange-500 p-[2px] shadow-2xl hover:shadow-orange-500/30 dark:hover:shadow-orange-500/50 transition-all duration-500 hover:scale-110 group">
              <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 flex items-center justify-center p-2 sm:p-3 md:p-4 backdrop-blur-sm">
                <Image
                  src="/sgrids.svg"
                  alt="SGrids Logo"
                  width={80}
                  height={80}
                  onLoad={() => markDiagramImageLoaded(0)}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Energy service icons */}
          <div className="absolute top-48 sm:top-56 md:top-64 lg:top-72 left-1/2 -translate-x-1/2 w-full max-w-4xl px-2 sm:px-4">
            <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
              {energyServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  ref={service.ref}
                  initial={{ y: 40, scale: 0.85 }}
                  whileInView={{ y: 0, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.8 + index * 0.1,
                    type: "spring",
                    bounce: 0.35,
                  }}
                  viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                  onAnimationComplete={handleEntryAnimationComplete}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl sm:rounded-2xl p-[2px] shadow-md transition-all duration-500 group-hover:scale-110 ${
                    iconActive[index]
                      ? "bg-gradient-to-br from-orange-500 via-purple-600 to-orange-500 scale-110"
                      : "bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] dark:hover:shadow-[0_0_25px_rgba(249,115,22,0.5)]"
                  }`}
                  style={iconActive[index] ? {
                    boxShadow: `
                      0 0 8px rgba(249, 115, 22, 0.15),
                      0 0 15px rgba(249, 115, 22, 0.1),
                      0 0 25px rgba(168, 85, 247, 0.12),
                      0 0 35px rgba(168, 85, 247, 0.08)
                    `
                  } : {}}
                  >
                    <div
                      data-beam-target
                      className={`w-full h-full rounded-xl sm:rounded-2xl flex items-center justify-center p-2 sm:p-2.5 md:p-3 backdrop-blur-sm transition-all duration-500 ${
                        iconActive[index]
                          ? "bg-gradient-to-br from-orange-50 via-purple-50 to-orange-50 dark:from-orange-950/30 dark:via-purple-950/30 dark:to-orange-950/30"
                          : "bg-white dark:bg-gray-950"
                      }`}
                    >
                      <Image
                        src={service.icon}
                        alt={service.title}
                        width={60}
                        height={60}
                        onLoad={() => {
                          markDiagramImageLoaded(index + 1);
                          requestAnimationFrame(() => {
                            requestAnimationFrame(() => measure());
                          });
                        }}
                        className="w-full h-full object-contain brightness-0 dark:brightness-0 dark:invert transition-all duration-500"
                      />
                    </div>
                  </div>
                  <h3 className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base font-bold text-gray-900 dark:text-gray-100 text-center font-sans group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300 px-1">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 text-center font-sans leading-relaxed px-1">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Animated beams */}
          {points && (
            <ServicesBeams
              points={points}
              containerRef={containerRef}
              pathRefs={pathRefs}
              beamRefs={beamRefs}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          )}
        </div>
      </motion.div>

      {/* ====== NEW FEATURES SECTION BELOW ====== */}
      <section
        id="features"
        className="w-full overflow-x-hidden overflow-visible -mt-4 sm:mt-12 md:mt-16 py-2 sm:py-8 md:py-12 lg:py-16 px-2 sm:px-4 md:px-6 flex flex-col items-center justify-center transition-colors duration-700"
      >
        {/* Title */}
        <div className="max-w-7xl mx-auto mb-2 sm:mb-6 md:mb-8 w-full px-2 sm:px-4">
        <motion.div
          {...reveal({ transition: { duration: 0.9 } })}
          className="mb-0 sm:mb-6 md:mb-8 lg:mb-16"
        >
          <p className="text-center py-2 sm:py-4 md:py-6 lg:py-8 text-gray-500 dark:text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 sm:mb-4 md:mb-6 lg:mb-8 font-sans">
            Why Smart Grid Analytics?
          </p>
        </motion.div>

          {/* Description */}
          <motion.div
            {...reveal({ offset: 18, transition: { duration: 0.9, delay: 0.2 } })}
            className="max-w-4xl mx-auto mb-6 sm:mb-8 w-full"
          >
            <p className="text-center text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4 px-2">
              Founded by control engineers and energy futurists, we built <span className="font-semibold text-orange-600 dark:text-orange-400">Solvyn</span> — the only platform unifying SCADA, EMS, PPC, EPM, Intelligent Bidding, Digital Twin, and AI analytics into one seamless system.
            </p>
            <p className="text-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed px-2">
              With <span className="font-semibold text-gray-800 dark:text-gray-200">85+ GW of assets under management across 20 countries</span>, we transform megawatts into decisions and data into foresight — enabling real-time visibility, AI-driven fault prevention, automated dispatch, and built-in compliance with CEA, IEC 62443, AEMO, and global grid codes.
            </p>
          </motion.div>
        </div>

        {/* Feature cards */}
        <div className="max-w-7xl mx-auto w-full px-2 sm:px-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
            {featureData.map((card, index) => (
              <motion.div
                key={index}
                {...reveal({ offset: 40, blur: 6, transition: { duration: 0.8, delay: index * 0.08 } })}
                className="group relative min-h-[240px] sm:min-h-[260px] md:min-h-[280px] p-3 sm:p-4 md:p-6 lg:p-8 overflow-hidden rounded-xl sm:rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] dark:hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:scale-[1.02]"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-0 bg-gradient-to-br from-orange-50 via-purple-50 to-white dark:from-orange-950/20 dark:via-purple-950/20 dark:to-gray-950" />
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className="relative p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-orange-100 to-purple-100 dark:from-orange-900/30 dark:to-purple-900/30 group-hover:scale-110 transition-all duration-500">
                      <Image
                        src={card.icon}
                        alt={card.title}
                        width={32}
                        height={32}
                        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 brightness-0 dark:brightness-0 dark:invert opacity-80 dark:opacity-90"
                      />
                    </div>
                    <div className="w-1 h-6 sm:h-8 rounded-full bg-gradient-to-b from-orange-500 to-purple-600 transition-all duration-500" />
                  </div>

                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-2 sm:mb-3 md:mb-4 text-gray-900 dark:text-gray-100 tracking-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-500 leading-tight">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </section>
  );
};

export default Services;
