/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import { Logo } from "./Logo";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Services", "Portfolio", "About"];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-5 md:py-6 transition-all duration-300",
          isScrolled ? "bg-[#FAF9F6]/95 backdrop-blur-md shadow-sm border-b border-[#D4AF37]/20 py-4" : "bg-transparent"
        )}
      >
        <div 
          className="group cursor-pointer flex-shrink-0"
          onClick={() => {
            window.location.hash = "#home";
            setIsMobileMenuOpen(false);
          }}
        >
          <Logo className="w-24 md:w-32 group-hover:scale-105 transition-transform duration-500" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12 bg-white/30 backdrop-blur-md px-8 py-3 rounded-full border border-white/20 shadow-sm">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-neutral-600 hover:text-brand-burgundy transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Desktop Contact Button */}
        <motion.a
          href="tel:+919995488911"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block relative group px-8 py-3 bg-brand-burgundy text-brand-cream rounded-sm overflow-hidden"
        >
          <span className="relative z-10 font-medium">Contact</span>
          {/* Border Beam / Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-brand-gold/10 blur-xl" />
        </motion.a>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="md:hidden relative z-[60] p-2 text-brand-burgundy focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-brand-cream flex flex-col items-center justify-center pt-20 px-8"
          >
            <div className="flex flex-col items-center gap-8 w-full max-w-sm">
              {navLinks.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-serif text-brand-burgundy hover:text-brand-gold transition-colors"
                >
                  {item}
                </a>
              ))}
              
              <div className="w-full h-px bg-brand-gold/20 my-4" />
              
              <div className="flex flex-col items-center text-center gap-2">
                <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Contact Us</span>
                <span className="text-xl text-brand-burgundy font-medium">Abhishek B Nair</span>
                <a 
                  href="tel:+919995488911"
                  className="text-2xl font-mono text-brand-gold hover:text-brand-burgundy transition-colors mt-2"
                >
                  99954 88911
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
