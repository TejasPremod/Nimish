/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

const portfolioItems = [
  { id: 1, title: "Royal Botanical Wedding", scope: "Full Architecture", size: "tall", image: "https://picsum.photos/seed/wed1/800/1200" },
  { id: 2, title: "Modern Minimalist Gala", scope: "Design & Decor", size: "wide", image: "https://picsum.photos/seed/wed2/1200/800" },
  { id: 3, title: "Oceanfront Vows", scope: "Full Architecture", size: "square", image: "https://picsum.photos/seed/wed3/800/800" },
  { id: 4, title: "Desert Mirage Anniversary", scope: "Design & Exec", size: "square", image: "https://picsum.photos/seed/wed4/800/800" },
  { id: 5, title: "Enchanted Forest Retreat", scope: "Full Architecture", size: "tall", image: "https://picsum.photos/seed/wed5/800/1200" },
];

export const Portfolio = () => {
  return (
    <section className="py-32 px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center gap-4 mb-20 pt-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-gold font-mono text-xs tracking-[0.4em] uppercase"
          >
            Our Masterpieces
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif text-brand-burgundy"
          >
            Portfolio
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-600 max-w-2xl mt-4"
          >
            A glimpse into the extraordinary experiences we've crafted. Each event is a unique reflection of our clients' vision, elevated by Nimish architecture.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-[400px]">
          {portfolioItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className={`group relative overflow-hidden rounded-sm bg-brand-cream ${
                item.size === 'tall' ? 'md:row-span-2' : ''
              } ${item.size === 'wide' ? 'md:col-span-2' : ''}`}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-burgundy/80 via-brand-burgundy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-brand-gold text-xs font-mono uppercase tracking-widest">{item.scope}</span>
                <h3 className="text-2xl font-serif text-white mt-2">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
