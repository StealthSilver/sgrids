"use client";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SetStateAction, useState } from "react";

import product1 from "@/assets/Product1.png";
import product2 from "@/assets/Product2.png";
import product3 from "@/assets/Product3.png";

const products = [
  {
    id: 1,
    name: "A+ SCADA",
    image: product1,
    description: "Advanced SCADA system for efficient monitoring and control.",
  },
  {
    id: 2,
    name: "FORECASTING",
    image: product3,
    description: "Accurate forecasting tools to predict and plan effectively.",
  },
  {
    id: 3,
    name: "CMS + CMMS",
    image: product2,
    description: "Comprehensive CMS and CMMS for asset and custom management.",
  },
];

export const ProductShowcase = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  const handleTagClick = (
    product: SetStateAction<{
      id: number;
      name: string;
      image: StaticImageData;
      description: string;
    }>
  ) => {
    setSelectedProduct(product);
  };

  return (
    <section className="bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-24 overflow-x-clip relative z-[101]">
      <div className="container">
        <div className="section-heading">
          <div className="flex flex-wrap justify-center gap-4">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => handleTagClick(product)}
                className={`tag cursor-pointer transition-all duration-300 px-4 py-2 rounded text-sm sm:text-base ${
                  selectedProduct.id === product.id
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {product.name}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-10 flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProduct.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.35}}
            >
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="rounded-2xl shadow-2xl"
                width = {920}
                height={800}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-10 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={selectedProduct.description}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.35}}
              className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5 px-4 sm:px-0"
            >
              {selectedProduct.description}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
