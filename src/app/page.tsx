import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { LogoTicker } from "@/sections/LogoTicker";
import { ProductShowcase } from "@/sections/ProductShowcase";
import { Advantages } from "@/sections/Advantages";
import { About } from "@/sections/About";
import { Trust } from "@/sections/Trust";
import { CallToAction } from "@/sections/CallToAction";
import { Footer } from "@/sections/Footer";


export default function Home() {
  return (
    <>
      
      <Header />
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="products">
        <ProductShowcase />
      </section>
      <section id="advantages">
        <Advantages />
      </section>
      <section id="trust">
        <Trust />
      </section>
      <section id="logo-ticker">
        <LogoTicker />
      </section>
      <section id="cta">
        <CallToAction />
      </section>
      <Footer />
    </>
  );
}