/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import heroBg from '../assets/pexels-photo-10282581.jpeg';

export const Hero = () => {
  return (
    <section className="relative min-h-[100dvh] flex flex-col px-6 md:px-8 pt-[120px] md:pt-[160px] pb-12 overflow-hidden justify-center shrink-0">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center flex-1">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col gap-6 md:gap-8"
        >
          <div className="flex flex-col gap-2">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-brand-gold font-mono text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase"
            >
              Modern Event Architecture
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-serif text-brand-burgundy leading-[1.05] md:leading-[0.9] tracking-tight"
            >
              Celebrating Love <br />
              <span className="italic text-shimmer">to Infinity</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-neutral-600 max-w-md leading-relaxed"
          >
            Sleek. Sophisticated. Unique Experiences Crafted to Perfection.
            We turn your vision into a modern masterpiece.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-center w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.hash = "#vendors"}
              className="group relative px-8 md:px-10 py-4 md:py-5 bg-brand-burgundy text-brand-cream rounded-sm overflow-hidden flex items-center justify-center gap-3 cursor-pointer w-full sm:w-auto"
            >
              <span className="relative z-10 font-medium text-base md:text-lg">Plan Your Event</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-brand-gold/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.button>
            <button
              onClick={() => window.location.hash = "#portfolio"}
              className="text-brand-burgundy font-medium text-base md:text-lg border-b-2 border-brand-gold/30 hover:border-brand-gold transition-all py-1.5 cursor-pointer text-center w-full sm:w-auto">
              View Portfolio
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative aspect-square md:aspect-[4/5] w-full max-w-md md:max-w-lg mx-auto lg:ml-auto mt-8 lg:mt-0"
        >
          {/* Decorative Gold Frames */}
          <div className="absolute -top-4 -left-4 md:-top-8 md:-left-8 w-full h-full border border-brand-gold/20 -z-10" />
          <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 w-full h-full border border-brand-gold/20 -z-10" />

          <div className="w-full h-full overflow-hidden rounded-sm shadow-2xl relative group">
            <img
              src={heroBg}
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
            style={{ willChange: "transform" }}
            className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white p-4 md:p-6 shadow-xl rounded-sm border border-brand-gold/10"
          >
            <div className="flex flex-col gap-0 md:gap-1">
              <span className="text-2xl md:text-3xl font-serif text-brand-burgundy">500+</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Events Crafted</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
