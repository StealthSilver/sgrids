"use client";

import { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const About = () => {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  type SectionProps = {
    title: string;
    text: string;
  };

  const sections = [
    {
      title: "Our Story",
      text: "Smart Grid Solutions was founded by a team of experienced engineers who are passionate about renewable energy. Our mission is to revolutionize the renewable energy sector, driving innovation and technology to achieve a net-zero future."
    },
    {
      title: "Our Vision",
      text: "Our vision is to be a leader in empowering businesses with transformative, data-driven renewable energy solutions that achieve net-zero emissions and unlock significant cost savings."
    },
    {
      title: "Our Technology",
      text: "Our Hardware-enabled SaaS platform is built using state-of-the-art technology and is designed to provide accurate and efficient data analytics for solar, wind, energy storage, and hydrogen plants. Our platform is scalable, flexible, and customizable to meet your specific needs."
    }
  ];

  const Section = ({ title, text }: SectionProps) => (
    <div className="mb-10 md:mb-14" data-aos="fade-up">
      <div className="flex justify-left">
        <h2 className="text-center text-2xl md:text-4xl lg:text-[54px] lg:leading-[60px] font-medium tracking-tighter mt-5">
          {title}
        </h2>
      </div>
      <p className="text-left text-lg md:text-xl lg:text-[26px] sm:text-[16px] lg:leading-[40px] tracking-tight text-[#010D3E] mt-5">
        {text}
      </p>
    </div>
  );

  return (
    <section className="px-26 bg-white py-12 md:py-24 overflow-x-clip relative z-[101]">
      <div className="container px-30 mt-10">
        <div className="relative border-l-4 border-[#d4dcff]] pl-6">
          {sections.map((section, index) => (
            <div key={index} className="mb-10 mt-10 relative">
              <div className="absolute -left-9 w-5 h-5 bg-[#d4dcff] rounded-full top-10"></div>
              <Section {...section} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};