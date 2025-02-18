'use client'
import image1 from "@/assets/advantage1.png";
import image2 from "@/assets/advantage2.png";
import image3 from "@/assets/advantage3.png";
import image4 from "@/assets/advantage4.png";
import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Reusable AdvantageCard Component
const AdvantageCard = ({
  image,
  title,
  description,
  imagePosition = "left",
}: {
  image: any;
  title: string;
  description: string;
  imagePosition?: "left" | "right";
}) => {
  return (
    <div className="relative flex flex-col md:flex-row items-center mb-12 bg-[#EDF2F7] rounded-2xl p-6 border-4 border-transparent hover:border-[#d4dcff] transition-all duration-500">
      {imagePosition === "left" && (
        <div className="w-full md:w-auto md:mr-6" data-aos="fade-right">
          <Image
            src={image}
            alt="Product Image"
            className="rounded-2xl w-full h-auto"
            height={120}
            width={400}
          />
        </div>
      )}
      <div className="text-left flex-1">
        <h2 className="text-black text-xl md:text-[40px] md:leading-[50px] font-medium mt-5">
          {title}
        </h2>
        <p className="text-left sm:text-[14px] lg:text-[20px] leading-[40px] tracking-tight text-[#010D3E] mt-5">
          {description}
        </p>
      </div>
      {imagePosition === "right" && (
        <div className="w-full md:w-auto md:ml-6" data-aos="fade-left">
          <Image
            src={image}
            alt="Product Image"
            className="rounded-2xl w-full h-auto"
            height={120}
            width={400}
          />
        </div>
      )}
    </div>
  );
};

export const Advantages = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const advantagesData = [
    {
      image: image1,
      title: "Customizable Dashboards",
      description:
        "Our customizable dashboard offers real-time energy insights with personalized widgets, charts, and reports, enabling efficient monitoring and informed decisions for optimized renewable grid performance.",
      imagePosition: "left",
    },
    {
      image: image2,
      title: "Data driven renewables management",
      description:
        "Leverage data-driven renewables management to optimize energy performance. Analyze real-time data, forecast trends, and make informed decisions for efficient, reliable, and sustainable energy operations.",
      imagePosition: "right",
    },
    {
      image: image3,
      title: "Comprehensive Asset Monitoring",
      description:
        "Comprehensive asset monitoring provides real-time tracking and performance analysis of renewable energy assets, ensuring optimal efficiency, reduced downtime, and maximized operational reliability.",
      imagePosition: "left",
    },
    {
      image: image4,
      title: "Seamless Integration and Scalability",
      description:
        "Seamless integration and scalability ensure that our solution effortlessly connects with existing systems and grows with your needs, adapting to new technologies and expanding operations.",
      imagePosition: "right",
    },
  ];

  return (
    <section className="bg-white py-24 overflow-x-clip">
      <div className="container">
        {advantagesData.map((advantage, index) => (
          <AdvantageCard
            key={index}
            image={advantage.image}
            title={advantage.title}
            description={advantage.description}
            imagePosition={advantage.imagePosition as "left" | "right"}
          />
        ))}
      </div>
    </section>
  );
};