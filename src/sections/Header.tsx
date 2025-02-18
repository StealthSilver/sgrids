"use client";

import Logo from "@/assets/sgridsLogo.png";
import Image from "next/image";
import menu from "@/assets/menu.png";
import closeIcon from "@/assets/close.png";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 backdrop-blur-lg bg-white/130 z-[999] shadow-md">
      <div className="py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            <Image src={Logo} alt="Saas Logo" height={250} width={200} />

            <button
              className="lg:hidden p-2 z-50"
              onClick={toggleMenu}
            >
              <Image
                src={isMenuOpen ? closeIcon : menu}
                alt="Menu Icon"
                width={30}
                height={30}
              />
            </button>

            <nav className="hidden lg:flex gap-8 text-black/70 items-center font-semibold">
              <a href="#about" className="hover:text-black transition-colors duration-300">About</a>
              <a href="#products" className="hover:text-black transition-colors duration-300">Products</a>
              <a href="#advantages" className="hover:text-black transition-colors duration-300">Why Sgrids</a>
              <a href="#trust" className="hover:text-black transition-colors duration-300">Customers</a>
              <a className="btn btn-cta">BOOK A DEMO</a>
            </nav>

            {/* Mobile Menu */}
            <nav
              className={`lg:hidden fixed top-0 right-0 pb-5 pt-10 w-[300px] h-[400px]  text-lg rounded-l-xl bg-white shadow-xl border-white backdrop-blur-lg pl-10 transition-transform duration-300 ${
                isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <a
                href="#about"
                className="block py-5 text-black/70 hover:text-black"
                onClick={toggleMenu}
              >
                About
              </a>
              <a
                href="#products"
                className="block py-5 text-black/70 hover:text-black"
                onClick={toggleMenu}
              >
                Products
              </a>
              <a
                href="#advantages"
                className="block py-5 text-black/70 hover:text-black"
                onClick={toggleMenu}
              >
                Why Sgrids
              </a>
              <a
                href="#trust"
                className="block py-5 text-black/70 hover:text-black"
                onClick={toggleMenu}
              >
                Customers
              </a>
              <div className="mt-5">
                <a
                  className="bg-[#EB522E] text-white px-4 py-2 rounded-full font-semibold inline-flex items-center justify-start tracking-tight hover:bg-black transition-colors duration-300"
                  onClick={toggleMenu}
                >
                  BOOK A DEMO
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
