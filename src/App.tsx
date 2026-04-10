/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Background } from "./components/Background";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Testimonials } from "./components/Testimonials";
import { CTA } from "./components/CTA";
import { motion, useScroll, useSpring } from "motion/react";

import { Logo } from "./components/Logo";

const Footer = () => (
  <footer className="py-12 px-8 border-t border-brand-gold/10 bg-brand-cream">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <Logo className="w-24" />
      
      <div className="flex gap-8 text-sm font-medium text-neutral-500">
        <a href="#" className="hover:text-brand-burgundy transition-colors">Instagram</a>
        <a href="#" className="hover:text-brand-burgundy transition-colors">Pinterest</a>
        <a href="#" className="hover:text-brand-burgundy transition-colors">LinkedIn</a>
      </div>
      
      <p className="text-xs text-neutral-400 uppercase tracking-widest">
        © 2026 Nimish Event Architecture. All Rights Reserved.
      </p>
    </div>
  </footer>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen font-sans selection:bg-brand-gold selection:text-brand-burgundy">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-gold z-[60] origin-left"
        style={{ scaleX }}
      />

      <Background />
      <Navbar />
      
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
