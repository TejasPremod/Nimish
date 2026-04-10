/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";
import { Logo } from "./Logo";

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6"
    >
      <div className="group cursor-pointer">
        <Logo className="w-32 group-hover:scale-105 transition-transform duration-500" />
      </div>

      <div className="hidden md:flex items-center gap-12 bg-white/30 backdrop-blur-md px-8 py-3 rounded-full border border-white/20 shadow-sm">
        {["Services", "Portfolio", "About"].map((item) => (
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

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group px-8 py-3 bg-brand-burgundy text-brand-cream rounded-sm overflow-hidden"
      >
        <span className="relative z-10 font-medium">Contact</span>
        {/* Border Beam / Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-brand-gold/10 blur-xl" />
      </motion.button>
    </motion.nav>
  );
};
