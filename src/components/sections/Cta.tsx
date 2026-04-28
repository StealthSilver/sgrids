"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShimmerButton } from "../ui/ShimmerButton";
import { LazyLogoTicker } from "../ui/LazyLogoTicker";
import { BorderBeam } from "../ui/BorderBeam"; // animated border
import { reveal } from "@/lib/scrollReveal";

export const Cta = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", company: "", message: "" });
        setPrivacyAccepted(false);

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle");
        }, 5000);
      } else {
        setSubmitStatus("error");
        console.error("Error sending email:", data.error);

        // Reset error message after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle");
        }, 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");

      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="footer"
      className="relative w-full px-4 sm:px-6 py-20 sm:py-24 lg:py-20 bg-white/70 dark:bg-black/70 backdrop-blur-md overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Trusted By Section */}
        <motion.div
          {...reveal({ transition: { duration: 0.9 } })}
          className="mb-8 sm:mb-12 lg:mb-16"
        >
          <p className="text-center text-gray-500 dark:text-gray-500 mb-6 sm:mb-8 text-xs sm:text-sm font-semibold uppercase tracking-wider font-sans">
            Trusted by Industry Leaders
          </p>
          <LazyLogoTicker />
        </motion.div>

        {/* CTA Heading */}
        <motion.div
          {...reveal({ transition: { duration: 0.9, delay: 0.2 } })}
          className="text-center mb-10 sm:mb-16 lg:mb-28"
        >
          <div className="py-16 sm:py-14 lg:py-20">
            <h2 className="font-ibm-plex-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 sm:mb-4 lg:mb-6 tracking-tight">
              <span
                className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 dark:from-orange-400 dark:via-orange-300 dark:to-orange-400 bg-clip-text text-transparent inline-block animate-gradient pb-1"
                style={{ backgroundSize: "200% 200%" }}
              >
                Amp it up with Solvyn
              </span>
            </h2>

            <p className="text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-sans leading-relaxed px-2">
              Ready to transform your renewable energy operations? Connect with our team and discover how Solvyn can power your success.
            </p>
          </div>
        </motion.div>

        {/* Content Grid - Mobile: Form first, then Contact Info */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-20 items-start">
          {/* Form - Shows first on mobile, second on desktop */}
          <motion.div
            {...reveal({ direction: "left", offset: 40, transition: { duration: 0.9, delay: 0.2 } })}
            className="relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-800 overflow-hidden w-full order-1 lg:order-2"
          >
            {/* Animated Border Beam */}
            <BorderBeam
              size={300}
              duration={12}
              colorFrom="#ff7a18"
              colorTo="#ffb74d"
              borderWidth={1.5}
            />

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6 relative z-10">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 mb-1.5 sm:mb-2 font-sans"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all font-sans"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 mb-1.5 sm:mb-2 font-sans"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all font-sans"
                  placeholder="your.email@company.com"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 mb-1.5 sm:mb-2 font-sans"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all font-sans"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 mb-1.5 sm:mb-2 font-sans"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none font-sans"
                  placeholder="Tell us about your project and requirements..."
                />
              </div>

              {/* Privacy Policy Checkbox */}
              <div className="pt-1 sm:pt-2">
                <label className="flex items-start space-x-2 sm:space-x-3 cursor-pointer group">
                  <div className="flex items-center h-4 sm:h-5 mt-0.5">
                    <input
                      type="checkbox"
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                      required
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-gray-300 dark:border-gray-600 text-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-offset-0 bg-white dark:bg-gray-800 cursor-pointer"
                    />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
                    We value your privacy. By submitting this form, you agree to our{" "}
                    <a
                      href="/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 underline font-medium transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
              </div>

              <div className="pt-1 sm:pt-2">
                <ShimmerButton
                  type="submit"
                  disabled={isSubmitting || !privacyAccepted}
                  className="w-full font-sans px-4 sm:px-6 py-2.5 sm:py-3 lg:py-4 text-sm sm:text-base font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  background="#ff7a18"
                  shimmerColor="#ffffff"
                >
                  {isSubmitting ? "SENDING..." : "CONNECT NOW"}
                </ShimmerButton>
              </div>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-green-600 dark:text-green-400 text-xs sm:text-sm font-semibold font-sans"
                >
                  Thank you! We'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-red-600 dark:text-red-400 text-xs sm:text-sm font-semibold font-sans"
                >
                  Failed to send message. Please try again or email us directly.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Info - Shows second on mobile, first on desktop */}
          <motion.div
            {...reveal({ direction: "right", offset: 40, transition: { duration: 0.9, delay: 0.2 } })}
            className="space-y-6 sm:space-y-7 lg:space-y-8 w-full order-2 lg:order-1"
          >
            <div className="space-y-4 sm:space-y-5 lg:space-y-6 mt-0 lg:mt-8">
              {/* Contact Item */}
              {[
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  ),
                  title: "Email Us",
                  text: "info@sgrids.io",
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  ),
                  title: "Call Us",
                  text: "+91 95133 79911",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2 sm:space-x-3">
                  <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-xs sm:text-sm mb-0.5 sm:mb-1 font-sans">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-sans">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}

              {/* Location */}
              <div className="flex items-start space-x-2 sm:space-x-3 pt-2 sm:pt-4">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-xs sm:text-sm mb-0.5 sm:mb-1 font-sans">
                    Visit Us
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-sans mb-2 sm:mb-3 leading-relaxed">
                    Smart Grid Analytics Pvt Ltd<br />
                    2nd Floor, MSM Plaza, Service Road, Outer Ring Rd, Banaswadi,<br />
                    Bengaluru, Karnataka 560113
                  </p>
                  <div className="rounded-lg mt-4 sm:mt-6 lg:mt-8 overflow-hidden border border-gray-200 dark:border-gray-700">
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=Smart+Grid+Analytics+Pvt+Ltd,2nd+Floor+MSM+Plaza+Service+Road+Outer+Ring+Rd+Banaswadi+Bengaluru+Karnataka+560113&zoom=15&maptype=roadmap`}
                      width="100%"
                      height="200"
                      style={{
                        border: 0,
                        filter: isDark ? "invert(90%) hue-rotate(180deg)" : "none",
                        transition: "filter 0.3s ease",
                      }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full sm:h-[220px] lg:h-[260px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
