/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Users, Sparkles, Heart } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Vendor Ecosystem",
    description: "A curated network of premium vendors. Connect, collaborate, and build the perfect team for your celebration.",
  },
  {
    icon: Sparkles,
    title: "Seamless Planning",
    description: "Intuitive tools to manage every detail. From initial concept to the final toast, we keep everything in sync.",
  },
  {
    icon: Heart,
    title: "Bespoke Experiences",
    description: "No two weddings are the same. We architect unique environments that reflect your personal love story.",
  },
];

export const Features = () => {
  return (
    <section id="services" className="py-32 px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-gold font-mono text-xs tracking-[0.4em] uppercase"
          >
            The Nimish Advantage
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-brand-burgundy"
          >
            Architecting Your Perfect Day
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className="group p-10 bg-white/50 backdrop-blur-sm border border-brand-gold/10 rounded-sm hover:bg-white hover:shadow-2xl hover:shadow-brand-gold/5 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mb-8 group-hover:bg-brand-burgundy transition-colors duration-500">
                <f.icon className="w-8 h-8 text-brand-burgundy group-hover:text-brand-cream transition-all duration-500 group-hover:scale-110" />
              </div>
              <h3 className="text-2xl font-serif text-brand-burgundy mb-4">{f.title}</h3>
              <p className="text-neutral-600 leading-relaxed">
                {f.description}
              </p>
              <div className="mt-8 flex items-center gap-2 text-brand-gold font-medium text-sm group-hover:gap-4 transition-all cursor-pointer">
                Learn More <div className="w-4 h-px bg-brand-gold" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
