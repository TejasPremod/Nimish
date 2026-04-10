/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

export const About = () => {
  return (
    <section className="py-32 px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <span className="text-brand-gold font-mono text-xs tracking-[0.4em] uppercase">
              Our Story
            </span>
            <h1 className="text-5xl md:text-6xl font-serif text-brand-burgundy leading-tight">
              Redefining the <br /> Art of Celebration
            </h1>
            <div className="text-neutral-600 space-y-4 text-lg leading-relaxed">
              <p>
                At Nimish, we don't just plan events; we architect them. Founded with a vision to merge structural elegance with emotional resonance, our team of dedicated designers, coordinators, and logistics experts treat every wedding like a blank canvas.
              </p>
              <p>
                Our philosophy is simple: Infinite possibilities, meticulously executed. The infinity symbol at the core of our identity represents our boundless dedication to creating experiences that outlast the memory of a single day.
              </p>
              <p>
                From intimate oceanfront vows to grand ballroom galas, Nimish stands at the intersection of luxury, precision, and unforgettable artistry.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-brand-gold/10 -translate-x-4 translate-y-4 rounded-sm" />
            <img 
              src="https://picsum.photos/seed/aboutus/800/1000" 
              alt="Nimish Team" 
              className="relative z-10 w-full h-[600px] object-cover rounded-sm shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
