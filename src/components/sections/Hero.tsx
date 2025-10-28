"use client";

import { Globe, World } from "../ui/Globe";
import Link from "next/link";
import { motion } from "framer-motion";
import globeData from "@/data/globe.json";

export const Hero = () => {
  const globeConfig = {
    globeColor: "#1d072e",
    pointLight: "#ffffff",
    ambientLight: "#ffffff",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
  };

  const data = [
    { order: 1, startLat: 40.7128, startLng: -74.006, endLat: 51.5074, endLng: -0.1278, arcAlt: 0.3, color: "#ff9900" },
    { order: 2, startLat: 37.7749, startLng: -122.4194, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.4, color: "#ffaa33" },
    { order: 3, startLat: 28.6139, startLng: 77.209, endLat: 48.8566, endLng: 2.3522, arcAlt: 0.5, color: "#ff8800" },
    { order: 4, startLat: 12.9716, startLng: 77.5946, endLat: 1.3521, endLng: 103.8198, arcAlt: 0.35, color: "#ffaa55" },
    { order: 5, startLat: 25.276987, startLng: 55.296249, endLat: -33.8688, endLng: 151.2093, arcAlt: 0.45, color: "#ffbb33" },
    { order: 6, startLat: 43.65107, startLng: -79.347015, endLat: 52.52, endLng: 13.405, arcAlt: 0.3, color: "#ffcc00" },
    { order: 7, startLat: 34.0522, startLng: -118.2437, endLat: -23.5505, endLng: -46.6333, arcAlt: 0.5, color: "#ff9933" },
    { order: 8, startLat: 55.7558, startLng: 37.6173, endLat: -33.9249, endLng: 18.4241, arcAlt: 0.4, color: "#ffaa00" },
    { order: 9, startLat: 39.9042, startLng: 116.4074, endLat: 37.7749, endLng: -122.4194, arcAlt: 0.5, color: "#ffbb55" },
    { order: 10, startLat: 19.076, startLng: 72.8777, endLat: 51.5074, endLng: -0.1278, arcAlt: 0.4, color: "#ff8800" },
  ];

  return (
<section className="min-h-screen flex flex-col md:flex-row gap-10 py-20   justify-center items-center  px-6 sm:px-10 bg-[var(--color-background)] text-[var(--color-foreground)] relative overflow-hidden md:ml-10 lg:ml-20 w-full">

  {/* LEFT SIDE — TEXT CONTENT */}
  <div className="relative z-10 w-full md:w-1/2 text-center gap-10 md:text-left flex flex-col items-center md:items-start space-y-4">
    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-3xl sm:text-4xl md:text-5xl font-primary font-bold leading-tight mb-5 "
    >
      The Only Platform You Need For Renewable Intelligence
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="text-base sm:text-lg text-gray-400 max-w-lg"
    >
      Optimise renewable assets, ensure compliance, and streamline grid access — all on one platform with <strong>Solvyn</strong>.
    </motion.p>

    <motion.a
      href="#footer"
      className="relative rounded-full px-[1px] py-[1px] overflow-hidden transition-all duration-300 group"
      whileHover={{ scale: 1.05 }}
    >
      <span
        className="absolute inset-0 rounded-full animate-border-move bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600"
      ></span>
      <span
        className="relative z-10 block rounded-full px-6 py-1.5 bg-transparent text-[var(--color-foreground)] transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-orange-600 group-hover:text-white font-bold"
      >
        Book A Demo
      </span>
    </motion.a>
  </div>

  {/* RIGHT SIDE — GLOBE */}
  <div className=" flex flex-end w-full  flex justify-center items-center mr-0 py-10 ">
    <div className="w-full   sm:w-[450px] sm:h-[450px] md:w-[500px] md:h-[500px] overflow-hidden ">
      <World globeConfig={globeConfig} data={data} />
    </div>
  </div>
</section>

  );
};
