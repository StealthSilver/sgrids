"use client";

import relience from "@/assets/logo/reliance_logo.png";
import fimer from "@/assets/logo/fimer_logo.png";
import abb from "@/assets/logo/abb_logo.png";
import kec from "@/assets/logo/kec_logo.png";
import refex from "@/assets/logo/refex_logo.png";
import adani from "@/assets/logo/adani_logo.png";
import blupine from "@/assets/logo/blupine_logo.png";
import etap from "@/assets/logo/etap_logo.png";
import ampex from "@/assets/logo/ampex_logo.png";
import renew from "@/assets/logo/renew_logo.png";
import spring from "@/assets/logo/spring_logo.png";
import o2 from "@/assets/logo/o2_logo.png";
import inox from "@/assets/logo/inox_logo.png";
import jackson from "@/assets/logo/jackson_logo.png";
import cleantech from "@/assets/logo/cleantech_logo.png";
import jsw from "@/assets/logo/jsw_logo.jpeg";
import alfanar from "@/assets/logo/alfanar_logo.avif";
import avaada from "@/assets/logo/avaada_logo.jpg";
import azure from "@/assets/logo/azure_logo.png";
import ayana from "@/assets/logo/ayana_logo.png";
import essens from "@/assets/logo/essens_logo.png";
import sw from "@/assets/logo/sw_logo.png";
import vena from "@/assets/logo/vena_logo.png";
import waree from "@/assets/logo/waree_logo.png";
import kalpatru from "@/assets/logo/kalpatru_logo.webp";
import Image from "next/image";

const logos = [
  ampex,
  renew,
  spring,
  o2,
  inox,
  abb,
  adani,
  etap,
  blupine,
  fimer,
  cleantech,
  jsw,
  alfanar,
  avaada,
  azure,
  ayana,
  sw,
  kalpatru,
  vena,
  kec,
  refex,
  waree,
  essens,
];

export const LogoTicker = () => {
  return (
    <div className="py-4 sm:py-5 lg:py-6 mt-6 sm:mt-8 lg:mt-12 mb-6 sm:mb-8 lg:mb-12 bg-transparent relative z-10">
      <div className="container mx-auto px-4">
        <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)] justify-center pointer-events-auto">
          <div className="flex gap-8 sm:gap-12 lg:gap-20 flex-none animate-logo-ticker will-change-transform motion-reduce:animate-none group-hover:[animation-play-state:paused]">
            {logos.concat(logos).map((logo, index) => (
              <Image
                key={index}
                src={logo}
                alt={`Logo ${index + 1}`}
                className="logo-ticker-image h-10 sm:h-12 lg:h-16 cursor-pointer"
                width={180}
                height={40}
                style={{ objectFit: "contain" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
