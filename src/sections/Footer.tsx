import Image from "next/image";
import logo from "@/assets/sgridsLogoDark.png";
import SocialLinkedIn from "@/assets/social-linkedin.svg";

export const Footer = () => {
  return (
    <div className="bg-[#121316]">
      <footer className="bg-[#26272a] text-[#BCBCBC] text-sm py-10 mx-20 text-center rounded-3xl">
        <div className="container">
          <div className="inline-flex relative">
            <Image
              src={logo}
              alt="Saas logo"
              height={40}
              className="relative"
            />
          </div>

          <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
            <a
              href="#about"
              className="hover:text-white transition-colors duration-300"
            >
              About
            </a>
            <a
              href="#products"
              className="hover:text-white transition-colors duration-300"
            >
              Product
            </a>
            <a
              href="#advantages"
              className="hover:text-white transition-colors duration-300"
            >
              Why Sgrids
            </a>
            <a
              href="#trust"
              className="hover:text-white transition-colors duration-300"
            >
              Customers
            </a>
          </nav>

          <div className="flex justify-center gap-6 mt-6">
            <a
              href="https://www.linkedin.com/company/smart-grid-analytics/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-300"
            >
              <SocialLinkedIn className="hover:text-white" />
            </a>
            
          </div>
          

          <div className="w-full border-t border-white/10 mt-6"></div>

          <p className="mt-6">&copy;2025 Smart Grid Analytics. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
