/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Kate Davis",
    role: "Wedding Client",
    content: "The attention to detail was fantastic. It's motivating to see how much our vision improved over time. The app has a great mix of vendors.",
    rating: 4.9,
    logo: "https://picsum.photos/seed/hulu/100/40",
  },
  {
    name: "Martin Kazlauskas",
    role: "Event Planner",
    content: "Nimish has transformed how we connect with vendors. The minimal UI makes it a joy to use daily for our high-end projects.",
    rating: 5.0,
    logo: "https://picsum.photos/seed/hbomax/100/40",
  },
  {
    name: "Sanjay Sharma",
    role: "Vendor Partner",
    content: "As a vendor, being part of this ecosystem has opened doors to incredible clients. The platform is sleek and professional.",
    rating: 4.8,
    logo: "https://picsum.photos/seed/disney/100/40",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-32 px-8 bg-neutral-900 text-brand-cream relative overflow-hidden">
      {/* Subtle Background Effect */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-gold font-mono text-xs tracking-[0.4em] uppercase"
          >
            Our Trusted Partners
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif"
          >
            What Our Clients Say
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-sm flex flex-col gap-6"
            >
              <div className="flex justify-between items-center">
                <img src={t.logo} alt="Partner Logo" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
                <div className="flex items-center gap-1 text-brand-gold">
                  <span className="text-sm font-bold">{t.rating}</span>
                  <Star className="w-4 h-4 fill-current" />
                </div>
              </div>
              <p className="text-neutral-400 italic leading-relaxed">
                "{t.content}"
              </p>
              <div className="mt-auto pt-6 border-t border-white/10">
                <h4 className="font-serif text-lg">{t.name}</h4>
                <span className="text-xs uppercase tracking-widest text-neutral-500 font-bold">{t.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
