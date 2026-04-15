import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Users, Heart } from "lucide-react";
import { DirectoryLayout } from "./DirectoryLayout";
import { cn } from "../lib/utils";
import { supabase } from "../lib/supabase";
import { VenueModal } from "./VenueModal";
import { useLikedItems } from "../lib/LikedItemsContext";
import { useAuth } from "../contexts/AuthContext";

interface Venue {
  id: number;
  name: string;
  type: string;
  location: string;
  capacity: number;
  min_price: number;
  image: string;
}

const VENUE_TYPES = ["Any", "Indoor", "Outdoor", "Resort", "Vineyard"];

export const Venues = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("Any");
  const [capacity, setCapacity] = useState(100);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  const { isLiked, toggleLike } = useLikedItems();
  const { user } = useAuth();

  useEffect(() => {
    let isMounted = true;
    
    const fetchVenues = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("venues")
          .select("*")
          .order("id");
          
        if (error) {
          throw error;
        }
        
        if (isMounted && data) {
          setVenues(data);
        }
      } catch (err) {
        console.error("Error fetching venues:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchVenues();

    const handler = (e: any) => {
      setVenues((currentVenues) => {
        const v = currentVenues.find(ven => ven.id === e.detail);
        if (v) setSelectedVenue(v);
        return currentVenues;
      });
    };
    window.addEventListener('open-venue-modal', handler);
    
    return () => {
      isMounted = false;
      window.removeEventListener('open-venue-modal', handler);
    };
  }, []);

  const filteredVenues = venues.filter((venue) => {
    if (selectedType !== "Any" && venue.type !== selectedType) return false;
    if (venue.capacity < capacity) return false;
    return true;
  });

  const filters = (
    <>
      <div>
        <h3 className="text-sm text-neutral-500 mb-3">Venue Setting</h3>
        <div className="flex flex-wrap gap-2">
          {VENUE_TYPES.map((type) => (
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
          <h3 className="text-sm text-neutral-500">Minimum Capacity</h3>
        </div>
        <input 
          type="range" 
          min="50" 
          max="500" 
          step="50"
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value))}
          className="w-full accent-brand-gold"
        />
        <div className="flex justify-between text-xs text-neutral-400 mt-2">
          <span>50 guests</span>
          <span>{capacity}+ guests</span>
        </div>
      </div>
    </>
  );

  return (
    <DirectoryLayout 
      title="Exclusive Venues" 
      subtitle="Find the perfect architectural backdrop for your bespoke event."
      filters={filters}
      resultsCount={filteredVenues.length}
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
          {filteredVenues.map((venue, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              key={venue.id}
              className="group flex flex-col md:flex-row bg-white rounded-sm border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-gold/30 transition-all duration-300"
            >
              {/* Image Section */}
              <div className="relative w-full md:w-72 h-48 md:h-auto overflow-hidden flex-shrink-0">
                <img 
                  src={venue.image} 
                  alt={venue.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase text-brand-burgundy shadow-sm">
                  {venue.type}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-serif text-brand-burgundy group-hover:text-brand-gold transition-colors">{venue.name}</h3>
                  {user && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike({
                          id: venue.id,
                          type: 'venue',
                          name: venue.name,
                          category: venue.type,
                          image: venue.image,
                          min_price: venue.min_price
                        });
                      }}
                      className={cn(
                        "transition-colors",
                        isLiked(venue.id, 'venue') ? "text-red-500" : "text-neutral-300 hover:text-red-500"
                      )}
                    >
                      <Heart className={cn("w-5 h-5", isLiked(venue.id, 'venue') && "fill-current")} />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-brand-gold" />
                    <span>{venue.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1 bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded text-xs">
                    <Users className="w-3 h-3" /> Up to {venue.capacity}
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-xs text-neutral-400 block">Starting from</span>
                    <span className="text-lg font-mono font-bold text-neutral-800">₹{venue.min_price.toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedVenue(venue)}
                    className="px-5 py-2 border border-brand-burgundy text-brand-burgundy hover:bg-brand-burgundy hover:text-white transition-colors text-sm font-medium rounded-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
      
      {!loading && filteredVenues.length === 0 && (
        <div className="text-center py-20 text-neutral-500">
          No venues found matching your capacity requirements.
        </div>
      )}

      <AnimatePresence>
        {selectedVenue && (
          <VenueModal 
            venue={selectedVenue} 
            onClose={() => setSelectedVenue(null)} 
          />
        )}
      </AnimatePresence>
    </DirectoryLayout>
  );
};
