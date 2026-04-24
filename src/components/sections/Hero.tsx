"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ShimmerButton } from "../ui/ShimmerButton";
import { LazyGlobe } from "../ui/LazyGlobe";
import { NumberTicker } from "../ui/NumberTicker";

const sampleArcs = [
  {
    order: 1,
    startLat: 40,
    startLng: -95,
    endLat: 36,
    endLng: 139,
    arcAlt: 0.1,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 2,
    startLat: 51.5,
    startLng: -0.1,
    endLat: 35.6,
    endLng: 139.6,
    arcAlt: 0.2,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 3,
    startLat: 35.6,
    startLng: 139.6,
    endLat: -33.8,
    endLng: 151.2,
    arcAlt: 0.15,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 4,
    startLat: -33.8,
    startLng: 151.2,
    endLat: 1.3,
    endLng: 103.8,
    arcAlt: 0.18,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 5,
    startLat: 1.3,
    startLng: 103.8,
    endLat: 40.7,
    endLng: -74.0,
    arcAlt: 0.25,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 6,
    startLat: 48.8,
    startLng: 2.3,
    endLat: 52.5,
    endLng: 13.4,
    arcAlt: 0.12,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 7,
    startLat: 52.5,
    startLng: 13.4,
    endLat: 37.7,
    endLng: -122.4,
    arcAlt: 0.22,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 8,
    startLat: 37.7,
    startLng: -122.4,
    endLat: 22.3,
    endLng: 114.2,
    arcAlt: 0.28,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 9,
    startLat: 22.3,
    startLng: 114.2,
    endLat: 40,
    endLng: -95,
    arcAlt: 0.2,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 10,
    startLat: 35.6,
    startLng: 139.6,
    endLat: -37.8,
    endLng: 144.9,
    arcAlt: 0.19,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 11,
    startLat: 19.4,
    startLng: -99.1,
    endLat: 43.6,
    endLng: 7.0,
    arcAlt: 0.23,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 12,
    startLat: 43.6,
    startLng: 7.0,
    endLat: 55.7,
    endLng: 37.6,
    arcAlt: 0.17,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 13,
    startLat: 55.7,
    startLng: 37.6,
    endLat: 31.2,
    endLng: 30.6,
    arcAlt: 0.21,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 14,
    startLat: 31.2,
    startLng: 30.6,
    endLat: 25.2,
    endLng: 55.3,
    arcAlt: 0.24,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 15,
    startLat: 25.2,
    startLng: 55.3,
    endLat: 28.6,
    endLng: 77.2,
    arcAlt: 0.16,
    color: "rgba(255, 122, 24, 0.6)",
  },
  // Additional arcs to double the count
  {
    order: 16,
    startLat: 28.6,
    startLng: 77.2,
    endLat: 13.7,
    endLng: 100.5,
    arcAlt: 0.14,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 17,
    startLat: 13.7,
    startLng: 100.5,
    endLat: -1.3,
    endLng: 36.8,
    arcAlt: 0.26,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 18,
    startLat: -1.3,
    startLng: 36.8,
    endLat: -22.9,
    endLng: -43.2,
    arcAlt: 0.29,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 19,
    startLat: -22.9,
    startLng: -43.2,
    endLat: 19.4,
    endLng: -99.1,
    arcAlt: 0.27,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 20,
    startLat: 40.7,
    startLng: -74.0,
    endLat: 41.9,
    endLng: 12.5,
    arcAlt: 0.13,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 21,
    startLat: 41.9,
    startLng: 12.5,
    endLat: 25.2,
    endLng: 55.3,
    arcAlt: 0.19,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 22,
    startLat: -37.8,
    startLng: 144.9,
    endLat: -41.3,
    endLng: 174.8,
    arcAlt: 0.11,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 23,
    startLat: -41.3,
    startLng: 174.8,
    endLat: 35.6,
    endLng: 139.6,
    arcAlt: 0.25,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 24,
    startLat: 55.7,
    startLng: 37.6,
    endLat: 59.9,
    endLng: 30.3,
    arcAlt: 0.1,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 25,
    startLat: 59.9,
    startLng: 30.3,
    endLat: 51.5,
    endLng: -0.1,
    arcAlt: 0.16,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 26,
    startLat: 22.3,
    startLng: 114.2,
    endLat: 1.3,
    endLng: 103.8,
    arcAlt: 0.15,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 27,
    startLat: 37.7,
    startLng: -122.4,
    endLat: 49.3,
    endLng: -123.1,
    arcAlt: 0.08,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 28,
    startLat: 49.3,
    startLng: -123.1,
    endLat: 64.1,
    endLng: -21.9,
    arcAlt: 0.24,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 29,
    startLat: 64.1,
    startLng: -21.9,
    endLat: 48.8,
    endLng: 2.3,
    arcAlt: 0.18,
    color: "rgba(255, 122, 24, 0.6)",
  },
  {
    order: 30,
    startLat: -33.8,
    startLng: 151.2,
    endLat: -26.2,
    endLng: 28.0,
    arcAlt: 0.3,
    color: "rgba(255, 132, 44, 0.6)",
  },
];

const getGlobeConfig = (isDark: boolean) => ({
  pointSize: 1,
  globeColor: isDark ? "#0a1e3d" : "#9fddfc", // Beautiful bluish color for light mode
  showAtmosphere: true,
  atmosphereColor: isDark ? "#e0f2fe" : "#b3d9f2",
  atmosphereAltitude: 0.15,
  emissive: isDark ? "#001a3d" : "#ffffff", // Bluish emissive for light mode
  emissiveIntensity: isDark ? 0.15 : 0.5,
  shininess: 1.0,
  polygonColor: isDark ? "rgba(148, 197, 255, 0.5)" : "rgba(0, 0, 0, 0.35)", // Dark grey polygons for light mode
  ambientLight: "#ffffff",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: isDark ? "#87ceeb" : "#87ceeb",
  pointColor: isDark ? "rgba(179, 219, 252, 0.4)" : "rgba(179, 219, 252, 0.4)", // Lower opacity for point color
  arcTime: 2000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  autoRotate: true,
  autoRotateSpeed: 0.5,
});

export default function Hero() {
  const [globeConfig, setGlobeConfig] = useState(getGlobeConfig(false));
  const [globeKey, setGlobeKey] = useState(0);

  // The `.dark` class on <html> is the single source of truth for the theme.
  // Reading it directly (and watching for changes) avoids stale values from
  // next-themes when the ThemeToggle runs on a different route and then the
  // user navigates back to the home page.
  useEffect(() => {
    const applyThemeFromDom = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setGlobeConfig(getGlobeConfig(isDark));
      setGlobeKey((prev) => prev + 1);
    };

    applyThemeFromDom();

    const observer = new MutationObserver(applyThemeFromDom);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const dataPoints = [
    { value: 400, suffix: "+", label: "PROJECTS SUCCESSFULLY COMPLETED" },
    { value: 85, suffix: "GW", label: "POWER HANDLED (GIGAWATT)" },
    {
      value: 15,
      suffix: "+",
      label: "INTERNATIONAL INDUSTRY LEADERS AS PARTNERS",
    },
    { value: 20, suffix: "+", label: "YEARS IN RENEWABLES SECTOR" },
    { value: 17, suffix: "+", label: "GRID CODES COMPLIANT" },
  ];

  return (
    <section
      className="
        relative lg:min-h-screen h-full px-4 sm:px-6 pt-20 sm:pt-28 md:pt-36 lg:pt-48 
        bg-white/70 dark:bg-black/70 backdrop-blur-md
        overflow-hidden flex flex-col justify-start mx-auto pb-16 sm:pb-24 md:pb-32
      "
     
    >
      {/* Globe positioned on the right */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -right-[200px] sm:-right-[150px] md:-right-[100px] lg:-right-[800px] -top-12 sm:-top-16 md:-top-20 lg:-top-24 w-[600px] h-[600px] sm:w-[700px] sm:h-[700px] md:w-[850px] md:h-[850px] lg:w-[950px] lg:h-[950px] xl:w-[1100px] xl:h-[1100px] min-w-[600px] min-h-[600px] sm:min-w-[700px] sm:min-h-[700px] md:min-w-[850px] md:min-h-[850px] lg:min-w-[950px] lg:min-h-[950px] xl:min-w-[1100px] xl:min-h-[1100px] relative">
          <LazyGlobe key={globeKey} globeConfig={globeConfig} data={sampleArcs} />
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 flex flex-col items-start text-left space-y-4 sm:space-y-6 md:space-y-8 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight sm:leading-snug md:leading-normal lg:leading-18
            text-gray-900 dark:text-gray-100
            max-w-full sm:max-w-3xl md:max-w-4xl
          "
        >
          <span>The Only Platform You Need For Renewable Intelligence</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="
            max-w-full sm:max-w-xl md:max-w-2xl text-base sm:text-lg md:text-xl lg:text-2xl font-sans leading-relaxed
            text-gray-600 dark:text-gray-400
          "
        >
          Optimise renewable assets, ensure compliance, and streamline grid
          access, all on one platform with - Solvyn
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="
            flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-8 mt-4 sm:mt-6
            w-auto
          "
        >
          <ShimmerButton
            onClick={() => {
              const footer = document.getElementById("footer");
              footer?.scrollIntoView({ behavior: "smooth" });
            }}
            className="font-sans px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-8 lg:py-3 font-bold text-white text-[10px] sm:text-xs md:text-sm lg:text-base w-auto"
            background="#ff7a18"
            shimmerColor="#ffffff"
          >
            CONNECT NOW
          </ShimmerButton>
        </motion.div>
      </div>

      {/* Data Points Section */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 mt-24 sm:mt-32 md:mt-40 lg:mt-48 relative z-40">
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 lg:gap-6 xl:gap-12">
          {dataPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
              className="flex flex-col items-start text-left"
            >
              <div className="font-mono text-gray-900 dark:text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 md:mb-3 lg:mb-4 flex items-baseline gap-0.5 sm:gap-1">
                <NumberTicker
                  value={point.value}
                  className="text-gray-900 dark:text-white"
                />
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">{point.suffix}</span>
              </div>
              <p className="font-mono text-left text-gray-600 dark:text-gray-400 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs uppercase tracking-wide leading-tight">
                {point.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
