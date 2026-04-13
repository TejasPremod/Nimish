/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[100dvh] flex flex-col px-8 pt-[240px] md:pt-[260px] pb-20 md:pb-12 overflow-hidden justify-center">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-2">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-brand-gold font-mono text-sm tracking-[0.3em] uppercase"
            >
              Modern Event Architecture
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-6xl md:text-7xl font-serif text-brand-burgundy leading-[0.9] tracking-tight"
            >
              Celebrating Love <br />
              <span className="italic text-shimmer">to Infinity</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl text-neutral-600 max-w-md leading-relaxed"
          >
            Sleek. Sophisticated. Unique Experiences Crafted to Perfection. 
            We turn your vision into a modern masterpiece.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.hash = "#vendors"}
              className="group relative px-10 py-5 bg-brand-burgundy text-brand-cream rounded-sm overflow-hidden flex items-center gap-3 cursor-pointer"
            >
              <span className="relative z-10 font-medium text-lg">Plan Your Event</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-brand-gold/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.button>
            <button 
              onClick={() => window.location.hash = "#portfolio"}
              className="text-brand-burgundy font-medium text-lg border-b-2 border-brand-gold/30 hover:border-brand-gold transition-all py-1 cursor-pointer">
              View Portfolio
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative aspect-[4/5] w-full max-w-lg mx-auto lg:ml-auto"
        >
          {/* Decorative Gold Frames */}
          <div className="absolute -top-8 -left-8 w-full h-full border border-brand-gold/20 -z-10" />
          <div className="absolute -bottom-8 -right-8 w-full h-full border border-brand-gold/20 -z-10" />
          
          <div className="w-full h-full overflow-hidden rounded-sm shadow-2xl relative group">
            <img
              src="https://picsum.photos/seed/wedding-minimal/1200/1500"
              alt="Modern Event Design"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-burgundy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>

          {/* Floating Badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl rounded-sm border border-brand-gold/10"
          >
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-serif text-brand-burgundy">500+</span>
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Events Crafted</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
