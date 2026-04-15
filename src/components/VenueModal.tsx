import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Star, Heart, CheckCircle2, ChevronRight, ChevronLeft, Calendar as CalendarIcon, Users } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { supabase } from "../lib/supabase";
import { BookingPaymentModal } from "./BookingPaymentModal";
import { useLikedItems, LikedItem } from "../lib/LikedItemsContext";
import { cn } from "../lib/utils";

interface Venue {
  id: number;
  name: string;
  type: string;
  location: string;
  capacity: number;
  min_price: number;
  image: string;
}

interface VenueModalProps {
  venue: Venue;
  onClose: () => void;
}

export const VenueModal = ({ venue, onClose }: VenueModalProps) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [bookings, setBookings] = useState<any[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const { isLiked, toggleLike } = useLikedItems();
  const liked = isLiked(venue.id, 'venue');

  const handleLike = () => {
    const item: LikedItem = {
      id: venue.id,
      type: 'venue',
      name: venue.name,
      category: venue.type,
      image: venue.image,
      min_price: venue.min_price
    };
    toggleLike(item);
  };

  useEffect(() => {
    if (showCalendar) {
      const fetchBookings = async () => {
        const { data } = await supabase
          .from('bookings')
          .select('*')
          .eq('venue_id', venue.id);
        if (data) setBookings(data);
      };
      fetchBookings();
    }
  }, [showCalendar, venue.id]);

  const bookedDates = bookings.filter(b => b.status === "confirmed").map(b => new Date(b.booking_date));
  const pendingDates = bookings.filter(b => b.status === "pending").map(b => new Date(b.booking_date));

  const modifiers = {
    booked: bookedDates,
    pending: pendingDates,
  };
  
  const modifiersStyles = {
    booked: { color: 'white', backgroundColor: '#ef4444' },
    pending: { color: 'black', backgroundColor: '#facc15' },
  };

  const isDateBooked = (date: Date) => {
    return bookings.some(b => {
       const bDate = new Date(b.booking_date);
       return bDate.getFullYear() === date.getFullYear() && 
              bDate.getMonth() === date.getMonth() && 
              bDate.getDate() === date.getDate();
    });
  };

  const galleryImages = Array.from({ length: 4 }).map((_, i) => `https://picsum.photos/seed/venue-${venue.id}-${i}/800/1000`);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, type: "spring", bounce: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-4xl max-h-[90vh] rounded-xl overflow-hidden flex flex-col shadow-2xl relative"
        >
          <div className="relative h-48 md:h-64 flex-shrink-0">
            <img 
              src={venue.image} 
              alt={venue.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <button 
              onClick={handleLike}
              className={cn(
                "absolute top-4 right-14 bg-white/20 hover:bg-white/40 backdrop-blur-md py-2 px-3 text-sm text-white rounded-full flex items-center gap-1 transition-colors",
                liked && "text-red-500"
              )}
            >
              <Heart className={cn("w-4 h-4", liked && "fill-current")} /> {liked ? 'Saved' : 'Save'}
            </button>

            <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-brand-gold/90 text-neutral-900 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shadow-sm">
                    {venue.type}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-white">{venue.name}</h2>
              </div>
              
              <div className="flex flex-col md:items-end">
                <span className="text-white/80 text-sm">Starting from</span>
                <span className="text-3xl font-mono font-bold text-white tracking-tight">₹{venue.min_price.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto overflow-x-hidden">
            <div className="p-6 md:p-8 space-y-12">
              
              <section>
                <div className="flex items-center gap-6 pb-6 border-b border-neutral-100">
                  <div className="flex items-center gap-1.5 text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-sm text-sm">
                    <MapPin className="w-4 h-4 text-brand-gold" />
                    <span>{venue.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-sm text-sm font-medium">
                    <Users className="w-4 h-4 text-brand-gold" />
                    <span>Up to {venue.capacity}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-brand-burgundy bg-brand-burgundy/5 px-3 py-1.5 rounded-sm text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verified Venue</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-serif text-brand-burgundy mt-6 mb-3">About the Venue</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Welcome to {venue.name}, a magnificent venue perfectly suited for your grand events.
                  Located in the beautiful surroundings of {venue.location}, it offers unparalleled luxury
                  and a breathtaking atmosphere. With a capacity of {venue.capacity} guests, it serves as the ultimate
                  blank canvas for your bespoke architectural event.
                </p>
              </section>

              <section>
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-xl font-serif text-brand-burgundy mb-2">Venue Visuals</h3>
                  <div className="flex gap-2">
                    <button onClick={() => scrollGallery('left')} className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={() => scrollGallery('right')} className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div 
                  ref={galleryRef}
                  className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <style>{`
                    .scrollbar-hide::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>
                  
                  {galleryImages.map((src, idx) => (
                    <div key={idx} className="flex-shrink-0 w-[260px] md:w-[320px] aspect-[4/5] rounded-sm overflow-hidden snap-center group relative cursor-pointer shadow-sm border border-neutral-100">
                      <img 
                        src={src} 
                        alt={`${venue.name} venue visual ${idx + 1}`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/opacity-0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </div>
          
          <div className="border-t border-neutral-100 p-4 md:p-6 bg-white shrink-0 flex items-center justify-between">
            <div className="hidden md:block">
              <div className="text-sm text-neutral-500">Require an inquiry?</div>
              <div className="font-medium text-brand-burgundy">Response usually within 24 hours</div>
            </div>
            <button 
              onClick={() => setShowCalendar(true)}
              className="w-full md:w-auto px-8 py-3 bg-brand-burgundy text-brand-cream rounded-sm font-medium hover:bg-brand-burgundy/90 transition-colors shadow-lg flex items-center gap-2 justify-center"
            >
              <CalendarIcon className="w-4 h-4" />
              Check Availability & Book
            </button>
          </div>
          
          <AnimatePresence>
            {showCalendar && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-neutral-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8 rounded-xl"
              >
                <motion.div 
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 20 }}
                  onClick={(e) => e.stopPropagation()} 
                  className="bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col relative"
                >
                  <div className="flex items-center justify-between p-6 border-b border-neutral-100 bg-neutral-50/50">
                    <div>
                      <h3 className="text-2xl font-serif text-brand-burgundy">Book {venue.name}</h3>
                      <p className="text-sm text-neutral-500 mt-1">Select an available date below to proceed with your booking.</p>
                    </div>
                    <button onClick={() => setShowCalendar(false)} className="p-2 bg-white hover:bg-neutral-100 border border-neutral-200 rounded-full transition-colors shadow-sm">
                      <X className="w-5 h-5 text-neutral-600" />
                    </button>
                  </div>

                  <div className="p-6 flex flex-col md:flex-row gap-8 overflow-y-auto max-h-[60vh]">
                    <div className="flex-1 bg-neutral-50 p-6 rounded-xl shadow-inner border border-neutral-200 flex justify-center items-start">
                      <style>{`
                        .rdp {
                          --rdp-cell-size: 40px;
                          --rdp-accent-color: #581622;
                          --rdp-background-color: #fce7f3;
                          margin: 0;
                        }
                        .rdp-day_selected:not([disabled]), .rdp-day_selected:focus:not([disabled]), .rdp-day_selected:active:not([disabled]), .rdp-day_selected:hover:not([disabled]) {
                          background-color: #16a34a; 
                          color: white;
                        }
                      `}</style>
                      <DayPicker 
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        modifiers={modifiers}
                        modifiersStyles={modifiersStyles}
                        disabled={[{ before: new Date() }, isDateBooked]}
                        className="bg-white p-4 rounded-lg shadow-sm border border-neutral-100"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-start">
                      <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4">Availability Legend</h4>
                      <div className="flex flex-col gap-4 mb-8 bg-neutral-50 p-4 rounded-lg border border-neutral-100">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full bg-green-600 shadow-sm"></div>
                          <span className="text-sm text-neutral-700 font-medium">Available Date <span className="font-normal italic text-neutral-500">(Click to Select)</span></span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-sm"></div>
                          <span className="text-sm text-neutral-700 font-medium">Pending Confirmation</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full bg-red-500 shadow-sm"></div>
                          <span className="text-sm text-neutral-700 font-medium">Booked / Unavailable</span>
                        </div>
                      </div>
                      
                      <div className="mt-auto">
                        {selectedDate ? (
                          <div className="bg-brand-burgundy/5 p-5 rounded-xl border border-brand-burgundy/20 animate-in fade-in slide-in-from-bottom-2">
                            <p className="text-sm text-brand-burgundy font-medium mb-1">Selected Booking Date:</p>
                            <p className="text-xl font-bold text-brand-burgundy mb-5">{selectedDate.toDateString()}</p>
                            <button 
                              onClick={() => setShowPaymentModal(true)}
                              className="w-full py-3.5 bg-brand-gold text-neutral-900 font-bold rounded-lg hover:bg-yellow-500 transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 text-lg"
                            >
                              Book & Pay ₹{venue.min_price.toLocaleString()}
                            </button>
                            <p className="text-xs text-neutral-500 text-center mt-3">Payment held securely in Escrow</p>
                          </div>
                        ) : (
                          <div className="bg-neutral-50 p-6 rounded-xl border-2 border-neutral-200 border-dashed text-center flex flex-col items-center justify-center h-40">
                            <CalendarIcon className="w-8 h-8 text-neutral-300 mb-2" />
                            <p className="text-sm text-neutral-500">Pick an available date to proceed with booking.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {showPaymentModal && selectedDate && (
        <BookingPaymentModal 
          entityId={venue.id}
          entityType={"venue"}
          date={selectedDate}
          amount={venue.min_price}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={() => {
            setShowPaymentModal(false);
            setShowCalendar(false); 
            setTimeout(() => setShowCalendar(true), 100);
          }}
        />
      )}
    </>
  );
};
