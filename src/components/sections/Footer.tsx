"use client";
import "@/app/globals.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { MapComponent } from "../ui/MapComponent";


const Items = [
  { name: "About", link: "/about" },
  { name: "News & Updates", link: "#news&updates" },
  { name: "Blogs", link: "#blogs" },
  { name: "Case Studies", link: "/case-studies" },

];
export const Footer = () => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-8 items-center justify-center mx-[7%] border border-gray-300 border-b-0 dark:border-gray-700 p-10 pb-10 rounded-t-lg mb-0 lg:px-20 lg:mx-[8%]">
      <motion.div>
        <Link
          href="/"
          className="flex items-center cursor-pointer"
          prefetch={true}
        >
          <motion.img
            src="/logo.svg"
            alt="SGrids logo"
            className="w-28 h-auto sm:w-32 md:w-36 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </Link>
      </motion.div>
      <div className="flex flex-wrap items-center justify-center gap-6 mt-6 sm:mt-0">
        {Items.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="flex justify-between gap-10 items-center flex-col sm:flex-row ">
        <div className="flex flex-col w-full md:max-w-[40%] gap-3  text-left  text-md text-gray-500 dark:text-gray-400 mt-6">
          <p>
            LinkedIn:  <Link href="https://www.linkedin.com/company/smart-grid-analytics/" className="hover:text-blue-500">
              smart-grid-analytics

            </Link>
          </p>
          <p>
            Email: <a href="mailto:info@sgrids.io" className="hover:text-blue-500">info@sgrids.io</a>
          </p>
          <p>Contact: +91 8883772216</p>
          <p>
            ADDRESS:

          </p>
          <p>
            Smart Grid Analytics Private Limited
            Msm Plaza, 2nd floor, service rd, opp. Kallumantapa, Banaswadi, Bangalore, Karnataka – 560043

          </p>




        </div>
        <div className="w-full h-64 rounded-md overflow-hidden border border-gray-300 w-full md:max-w-[50%]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.967453688077!2d77.63840517507828!3d13.01128638729659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae11111bac8741%3A0x36fbfa445db2acd8!2sSmart%20Grid%20Analytics%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1730143726193!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          {/* <MapComponent/> */}
        </div>


      </div>

    </div>
  );
};
