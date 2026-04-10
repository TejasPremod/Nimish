/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { MapPin, Star } from "lucide-react";

const vendors = [
  { id: 1, name: "The Grand Estate", type: "Venue", location: "Beverly Hills, CA", rating: 4.9, image: "https://picsum.photos/seed/estate/800/600" },
  { id: 2, name: "Lumina Florals", type: "Florist", location: "Los Angeles, CA", rating: 5.0, image: "https://picsum.photos/seed/floral/800/600" },
  { id: 3, name: "Culinary Canvas", type: "Catering", location: "Santa Monica, CA", rating: 4.8, image: "https://picsum.photos/seed/catering/800/600" },
  { id: 4, name: "Oceanside Pavilion", type: "Venue", location: "Malibu, CA", rating: 4.9, image: "https://picsum.photos/seed/pavilion/800/600" },
  { id: 5, name: "Rhythmic Beats", type: "Entertainment", location: "Hollywood, CA", rating: 4.7, image: "https://picsum.photos/seed/dj/800/600" },
  { id: 6, name: "Elegance Rentals", type: "Decor", location: "Pasadena, CA", rating: 4.9, image: "https://picsum.photos/seed/decor/800/600" },
];

export const Vendors = () => {
  return (
    <section className="py-32 px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center gap-4 mb-20 pt-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-gold font-mono text-xs tracking-[0.4em] uppercase"
          >
            Curated Ecosystem
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif text-brand-burgundy"
          >
            Venues & Partners
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-600 max-w-2xl mt-4"
          >
            Discover our hand-selected network of premier venues and master artisans who bring the Nimish vision to life.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {vendors.map((vendor, i) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand-gold/10 transition-all duration-500 border border-brand-gold/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={vendor.image} 
                  alt={vendor.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-brand-burgundy tracking-wide uppercase">
                  {vendor.type}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif text-brand-burgundy mb-2">{vendor.name}</h3>
                <div className="flex items-center justify-between text-sm text-neutral-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-brand-gold" />
                    <span>{vendor.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-brand-gold fill-current" />
                    <span>{vendor.rating}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
