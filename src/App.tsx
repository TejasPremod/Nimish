/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Background } from "./components/Background";
import { Navbar } from "./components/Navbar";
import { motion, useScroll, useSpring } from "motion/react";

import { Logo } from "./components/Logo";

// Pages
import { Home } from "./components/Home";
import { Vendors } from "./components/Vendors";
import { Portfolio } from "./components/Portfolio";
import { About } from "./components/About";

const Footer = () => (
  <footer className="py-12 px-8 border-t border-brand-gold/10 bg-brand-cream">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex flex-col items-center md:items-start opacity-70 hover:opacity-100 transition-opacity">
        <Logo className="w-24" />
      </div>

      <div className="flex flex-col items-center text-sm text-neutral-600">
        <p className="font-semibold text-brand-burgundy mb-1">Contact</p>
        <p>Abhishek B Nair</p>
        <a href="tel:+919995488911" className="hover:text-brand-gold transition-colors font-mono">99954 88911</a>
      </div>
      
      <div className="flex gap-8 text-sm font-medium text-neutral-500">
        <a href="https://www.instagram.com/nimishevents?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="hover:text-brand-burgundy transition-colors">Instagram</a>
        <a href="https://www.linkedin.com/company/nimish-live" target="_blank" rel="noopener noreferrer" className="hover:text-brand-burgundy transition-colors">LinkedIn</a>
      </div>
      
      <p className="text-xs text-neutral-400 uppercase tracking-widest text-center md:text-left">
        © 2026 Nimish Event Architecture. All Rights Reserved.
      </p>
    </div>
  </footer>
);

export default function App() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const renderPage = () => {
    switch (hash) {
      case "#vendors":
        return <Vendors />;
      case "#portfolio":
        return <Portfolio />;
      case "#about":
        return <About />;
      case "#home":
      case "":
      default:
        // if `#services` is the hash, we still want to render Home, 
        // default browser anchor scrolling will handle scrolling down but we need to ensure Home is rendered.
        return <Home />;
    }
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [hash]);

  return (
    <div className="relative min-h-screen font-sans selection:bg-brand-gold selection:text-brand-burgundy flex flex-col">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-gold z-[60] origin-left"
        style={{ scaleX }}
      />

      <Background />
      <Navbar />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
}
