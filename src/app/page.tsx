import { Hero } from "@/components/sections/Hero";
import { LogoTicker } from "@/components/sections/LogoTicker";
import { Footer } from "@/components/sections/Footer";
import { Cta } from "@/components/sections/Cta";
import Navbar from "@/components/sections/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <LogoTicker />
      <Cta />
      <Footer />
    </main>
  );
}
