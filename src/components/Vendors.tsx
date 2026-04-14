import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Star, Heart } from "lucide-react";
import { DirectoryLayout } from "./DirectoryLayout";
import { cn } from "../lib/utils";
import { supabase } from "../lib/supabase";

interface Vendor {
  id: number;
  name: string;
  type: string;
  location: string;
  rating: number;
  min_price: number;
  image: string;
  experience_years?: number;
}

const VENDOR_TYPES = ["Any", "Venue", "Florist", "Catering", "Entertainment", "Decor", "Salon & Makeover", "Photography & Video"];

export const Vendors = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("Any");
  const [priceRange, setPriceRange] = useState(20000);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const { data, error } = await supabase
          .from("vendors")
          .select("*")
          .order("id");
          
        if (error) throw error;
        if (data) setVendors(data);
      } catch (err) {
        console.error("Error fetching vendors:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVendors();
  }, []);

  const filteredVendors = vendors.filter((vendor) => {
    if (selectedType !== "Any" && vendor.type !== selectedType) return false;
    if (vendor.min_price > priceRange) return false;
    return true;
  });

  const filters = (
    <>
      <div>
        <h3 className="text-sm text-neutral-500 mb-3">Operating Type</h3>
        <div className="flex flex-wrap gap-2">
          {VENDOR_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={cn(
                "px-3 py-1.5 text-sm rounded-sm transition-all border",
                selectedType === type 
                  ? "bg-brand-burgundy text-white border-brand-burgundy" 
                  : "bg-white text-neutral-600 border-neutral-200 hover:border-brand-gold hover:text-brand-burgundy"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm text-neutral-500">Max Starting Price</h3>
        </div>
        <input 
          type="range" 
          min="1000" 
          max="20000" 
          step="500"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-brand-gold"
        />
        <div className="flex justify-between text-xs text-neutral-400 mt-2">
          <span>₹0</span>
          <span>₹{priceRange.toLocaleString()}</span>
        </div>
      </div>
    </>
  );

  return (
    <DirectoryLayout 
      title="Elite Vendors" 
      subtitle="Discover our hand-selected network of master artisans who bring the Nimish vision to life."
      filters={filters}
      resultsCount={filteredVendors.length}
    >
      {loading ? (
        <div className="py-20 flex justify-center text-brand-gold">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full"
          />
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          {filteredVendors.map((vendor, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              key={vendor.id}
              className="group flex flex-col md:flex-row bg-white rounded-sm border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-gold/30 transition-all duration-300"
            >
              {/* Image Section */}
              <div className="relative w-full md:w-72 h-48 md:h-auto overflow-hidden flex-shrink-0">
                <img 
                  src={vendor.image} 
                  alt={vendor.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase text-brand-burgundy shadow-sm">
                  {vendor.type}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-serif text-brand-burgundy group-hover:text-brand-gold transition-colors">{vendor.name}</h3>
                  <button className="text-neutral-300 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-brand-gold" />
                    <span>{vendor.location}</span>
                  </div>
                  {vendor.experience_years && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs bg-neutral-100 px-2 py-0.5 rounded text-neutral-600">
                        {vendor.experience_years} Years Exp.
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1 bg-brand-gold/10 text-brand-burgundy px-2 py-0.5 rounded text-xs font-bold font-mono">
                    {vendor.rating} <Star className="w-3 h-3 fill-current inline-block pb-0.5" />
                  </div>
                  <span className="text-xs text-neutral-400">(Selected Partner)</span>
                </div>

                <div className="mt-auto pt-4 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-xs text-neutral-400 block">Starting from</span>
                    <span className="text-lg font-mono font-bold text-neutral-800">₹{vendor.min_price.toLocaleString()}</span>
                  </div>
                  <button className="px-5 py-2 border border-brand-burgundy text-brand-burgundy hover:bg-brand-burgundy hover:text-white transition-colors text-sm font-medium rounded-sm">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
      
      {!loading && filteredVendors.length === 0 && (
        <div className="text-center py-20 text-neutral-500">
          No vendors found matching your filters.
        </div>
      )}
    </DirectoryLayout>
  );
};
