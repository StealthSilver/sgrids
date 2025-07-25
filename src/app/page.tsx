import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Why from '@/components/sections/Why';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Services />
      <Why />
      <Testimonials />
      <CTA />
      <Contact />
    </main>
  );
}
