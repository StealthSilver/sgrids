"use client";

import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_140%_100%_at_bottom_left,#d4dcff_80%,#ffffff)] overflow-x-clip relative">
      <div
        className="absolute lg:h-[80rem] lg:w-[80rem] bg-white rounded-full border border-[#a4bfff] top-[75%] left-1/2 -translate-x-1/2 bg-[radial-gradient(40%_80%_at_35%_5%,rgb(199,216,255),rgb(147,175,250)_38%,rgb(72,105,194)_70%,rgb(29,54,135))] 
                   shadow-[-50px_-50px_100px_rgb(199,216,255,0.3),-80px_-80px_200px_rgb(170,206,255,0.4),0_0_400px_rgb(164,193,248,0.6)]
                   z-10"
      ></div>

      <motion.div
        style={{
          translateY: "-50%",
          translateX: "-50%",
        }}
        animate={{
          rotate: "-1turn",
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        }}
        className="absolute h-[444px] w-[444px] md:h-[96rem] md:w-[96rem] rounded-full border border-white top-[1300px] left-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed"
      >
        <div className="absolute h-2 w-2 left-0 bg-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute h-2 w-2 left-1/2 bg-white rounded-full top-0 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute h-2 w-2 left-full bg-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute h-2 w-2 left-1/2 bg-white rounded-full top-full -translate-x-1/2 -translate-y-1/2"></div>
      </motion.div>

      <motion.div
        style={{
          translateY: "-50%",
          translateX: "-50%",
        }}
        animate={{
          rotate: "1turn",
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
        className="absolute h-[544px] w-[544px] md:h-[90rem] md:w-[90rem] rounded-full border  border-white top-[1320px] left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="absolute h-3 w-3 left-0 bg-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute h-3 w-3 left-full bg-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute h-3 w-3 left-full bg-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute h-3 w-3 left-1/2 bg-white rounded-full top-full -translate-x-1/2 -translate-y-1/2"></div>
      </motion.div>

      <div className="container">
        <div className="flex items-center justify-center">
          <div className="text-center md:w-[478px] lg:w-[750px] lg:h-[800px] pt-10">
            <h1 className="sm:text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-4 pt-14 pb-4">
              Act on real-time insights Drive business growth
            </h1>
            <p className="lg:text-3xl md:text-xl sm:text-l text-[#010D3E] tracking-tight mt-6">
              Optimize All Your Renewable Assets Using One Platform Solar | Wind
              | BESS | Green Hydrogen
            </p>
            <div className="flex justify-center mt-[40px]">
              <button className="btn-cta md:py-4 md:px-10 text-xl text-m px-4 py-2">
                BOOK A DEMO
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
