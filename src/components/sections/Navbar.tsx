"use client";

import { useState, useEffect } from "react";
import { Menu, X, Github } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "../ui/ThemeToggle";
import { ShimmerButton } from "../ui/ShimmerButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string | undefined>();

  useEffect(() => {
    setMounted(true);

    // Set initial theme based on document element class
    const isDark = document.documentElement.classList.contains("dark");
    setCurrentTheme(isDark ? "dark" : "light");

    // Listen to class changes on document element
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setCurrentTheme(isDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => setIsOpen((v) => !v);

  const navItems = [
    { name: "About-Us", href: "/#about", external: false },
    { name: "Solvyn", href: "/#solvyn", external: false },
    { name: "Services", href: "/#services", external: false },
    { name: "Case-Studies", href: "/case-studies" },

    {
      name: "White-Papers",
      href: "/white-papers",
    },
    {
      name: "Blogs",
      href: "/blogs",
    },
  ];

  return (
    <nav
      className="
        relative w-full sticky top-0 z-50 px-4 sm:px-6 py-3
        border-b border-gray-200 dark:border-gray-800
        bg-white/50 dark:bg-black/50 backdrop-blur-sm
        transition-colors duration-300
      "
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
        {/* Left: logo + nav items grouped */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
          <Link href="/" className="flex items-center cursor-pointer">
            <motion.img
              key={mounted ? currentTheme : "default"}
              src={
                !mounted
                  ? "/logo_light.svg"
                  : currentTheme === "dark"
                  ? "/logo_dark.svg"
                  : "/logo_light.svg"
              }
              alt="Silver logo"
              className="w-24 h-auto sm:w-28 md:w-32 lg:w-36"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          <div
            className="hidden lg:flex items-center px-4 xl:px-8 font-mono relative gap-2 xl:gap-4"
            onMouseLeave={() => setHovered(null)}
          >
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative px-3 py-1 select-none font-sans font-semibold"
              >
                {hovered === item.name && (
                  <motion.span
                    layoutId="hoverBg"
                    className="
                      absolute inset-0 rounded-full backdrop-blur-sm
                      bg-gray-200/70 border border-gray-300
                      dark:bg-gray-700/70 dark:border-gray-600
                    "
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 40,
                      mass: 0.6,
                    }}
                    initial={false}
                  />
                )}

                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHovered(item.name)}
                    onFocus={() => setHovered(item.name)}
                    className="
                      relative z-10 transition-colors text-sm
                      text-gray-700 hover:text-black
                      dark:text-gray-300 dark:hover:text-white
                    "
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    onMouseEnter={() => setHovered(item.name)}
                    onFocus={() => setHovered(item.name)}
                    className="
                      relative z-10 transition-colors text-sm
                      text-gray-700 hover:text-black
                      dark:text-gray-300 dark:hover:text-white
                    "
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6 font-mono">
          <ThemeToggle />

          <ShimmerButton
            onClick={() => {
              const footer = document.getElementById("footer");
              footer?.scrollIntoView({ behavior: "smooth" });
            }}
            className="font-sans font-bold text-white text-xs xl:text-sm px-4 xl:px-6"
            background="#ff7a18"
            shimmerColor="#ffffff"
          >
            CONNECT NOW
          </ShimmerButton>
        </div>

        {/* Tablet/Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2 sm:gap-3">
          <div className="scale-90 cursor-pointer">
            <ThemeToggle />
          </div>

          <button
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="p-1.5 rounded-md relative h-9 w-9 flex items-center justify-center text-gray-900 dark:text-gray-100"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, scale: 0.85, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.85, rotate: 90 }}
                  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <X size={24} strokeWidth={2} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ opacity: 0, scale: 0.85, rotate: 90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.85, rotate: -90 }}
                  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Menu size={24} strokeWidth={2} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Nav — height + opacity for smooth open/close */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 z-50 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-lg border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <motion.div
                className="flex flex-col items-center space-y-3 sm:space-y-4 py-6 sm:py-8"
                initial={{ y: -8 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              >
                {navItems.map((item, index) =>
                  item.external ? (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors text-sm font-sans font-semibold text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.04 + index * 0.035,
                        duration: 0.25,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      {item.name}
                    </motion.a>
                  ) : (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.04 + index * 0.035,
                        duration: 0.25,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        className="transition-colors text-sm font-sans font-semibold text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  )
                )}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.04 + navItems.length * 0.035,
                    duration: 0.25,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <ShimmerButton
                    onClick={() => {
                      setIsOpen(false);
                      const footer = document.getElementById("footer");
                      footer?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="font-sans font-bold text-white text-sm px-6 py-2.5 mt-2"
                    background="#FF7217"
                    shimmerColor="#ffffff"
                  >
                    CONNECT NOW
                  </ShimmerButton>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
