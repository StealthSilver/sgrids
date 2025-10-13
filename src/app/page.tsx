import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { LogoTicker } from "@/components/sections/LogoTicker";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <LogoTicker />
    </main>
  );
}
