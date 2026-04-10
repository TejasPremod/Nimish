/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

export const CTA = () => {
  return (
    <section className="py-32 px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-burgundy p-16 md:p-24 rounded-sm relative overflow-hidden group"
        >
          {/* Animated Background Beam */}
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent skew-x-12"
          />

          <div className="relative z-10 flex flex-col items-center gap-8">
            <h2 className="text-4xl md:text-6xl font-serif text-brand-cream leading-tight">
              Ready to Architect <br />
              <span className="text-brand-gold italic">Your Legacy?</span>
            </h2>
            <p className="text-brand-cream/60 max-w-xl text-lg">
              Join the most exclusive network of event professionals and start planning your modern masterpiece today.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-brand-gold text-brand-burgundy font-bold text-lg rounded-sm shadow-xl hover:shadow-brand-gold/20 transition-all relative overflow-hidden group/btn"
            >
              <span className="relative z-10">Get Started Now</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            </motion.button>
          </div>

          {/* Decorative Corner Elements */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-brand-gold/30 m-8" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-brand-gold/30 m-8" />
        </motion.div>
      </div>

      {/* Parallax Abstract Shape */}
      <motion.div
        style={{ y: 100 }}
        whileInView={{ y: -100 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute -bottom-20 -left-20 w-64 h-64 border border-brand-gold/10 rounded-full"
      />
    </section>
  );
};
