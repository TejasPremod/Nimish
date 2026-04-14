import { motion } from "motion/react";
import { X, MapPin, Star, Heart, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { useRef } from "react";

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

interface VendorModalProps {
  vendor: Vendor;
  onClose: () => void;
}

export const VendorModal = ({ vendor, onClose }: VendorModalProps) => {
  const galleryRef = useRef<HTMLDivElement>(null);

  const galleryImages = [
    "https://tydiuhvytofiedapxpjh.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-14%20at%2016.18.32.jpeg",
    "https://tydiuhvytofiedapxpjh.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-14%20at%2016.18.33.jpeg",
    "https://tydiuhvytofiedapxpjh.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-14%20at%2016.18.37.jpeg",
    "https://tydiuhvytofiedapxpjh.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-14%20at%2016.18.44.jpeg",
    "https://tydiuhvytofiedapxpjh.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-14%20at%2016.18.49.jpeg"
  ];

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-8"
      >
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, type: "spring", bounce: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-4xl max-h-[90vh] rounded-xl overflow-hidden flex flex-col shadow-2xl relative"
        >
          {/* Header Image & Actions */}
          <div className="relative h-48 md:h-64 flex-shrink-0">
            <img 
              src={vendor.image} 
              alt={vendor.name} 
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
              className="absolute top-4 right-14 bg-white/20 hover:bg-white/40 backdrop-blur-md py-2 px-3 text-sm text-white rounded-full flex items-center gap-1 transition-colors"
            >
              <Heart className="w-4 h-4" /> Save
            </button>

            <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-brand-gold/90 text-neutral-900 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shadow-sm">
                    {vendor.type}
                  </span>
                  {vendor.experience_years && (
                    <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded">
                      {vendor.experience_years} Years Exp.
                    </span>
                  )}
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-white">{vendor.name}</h2>
              </div>
              
              <div className="flex flex-col md:items-end">
                <span className="text-white/80 text-sm">Starting from</span>
                <span className="text-3xl font-mono font-bold text-white tracking-tight">₹{vendor.min_price.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-grow overflow-y-auto overflow-x-hidden">
            <div className="p-6 md:p-8 space-y-12">
              
              {/* About Section */}
              <section>
                <div className="flex items-center gap-6 pb-6 border-b border-neutral-100">
                  <div className="flex items-center gap-1.5 text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-sm text-sm">
                    <MapPin className="w-4 h-4 text-brand-gold" />
                    <span>{vendor.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-sm text-sm font-medium">
                    <Star className="w-4 h-4 text-brand-gold fill-current mb-0.5" />
                    <span>{vendor.rating} Rating</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-brand-burgundy bg-brand-burgundy/5 px-3 py-1.5 rounded-sm text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verified Partner</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-serif text-brand-burgundy mt-6 mb-3">About the Vendor</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Welcome to {vendor.name}, one of the premier elite partners in the Nimish networking program.
                  Known for their exquisite attention to detail and outstanding commitment to excellence, they 
                  have served countless breathtaking events. Whether you are seeking minimalist elegance, or 
                  grand spectacles, their deep {vendor.experience_years || 'multi-year'} expertise ensures your 
                  event shines brilliantly.
                </p>
              </section>

              {/* Gallery Section */}
              <section>
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-xl font-serif text-brand-burgundy mb-2">Vendor Portfolio</h3>
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
                  
                  {/* Gallery Items */}
                  {galleryImages.map((src, idx) => (
                    <div key={idx} className="flex-shrink-0 w-[260px] md:w-[320px] aspect-[4/5] rounded-sm overflow-hidden snap-center group relative cursor-pointer shadow-sm border border-neutral-100">
                      <img 
                        src={src} 
                        alt={`${vendor.name} portfolio ${idx + 1}`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/opacity-0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
                    </div>
                  ))}
                </div>
              </section>

              {/* Reviews Section */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-xl font-serif text-brand-burgundy">Client Reviews</h3>
                  <div className="bg-brand-gold/20 text-brand-burgundy text-xs font-bold px-2 py-0.5 rounded-full flex items-center">
                    <Star className="w-3 h-3 fill-current mb-0.5 mr-1" />
                    {vendor.rating}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2].map((review) => (
                    <div key={review} className="bg-neutral-50 p-6 rounded-sm border border-neutral-100 text-sm">
                      <div className="flex items-center gap-1 text-brand-gold mb-3">
                        {[1,2,3,4,5].map(star => <Star key={star} className="w-3 h-3 fill-current" />)}
                      </div>
                      <p className="text-neutral-600 mb-4 leading-relaxed font-serif italic">
                        "{review === 1 ? 'Absolutely breathtaking experience! The attention to detail and the sheer quality of work delivered by them exceeded all our expectations. They truly brought our vision to reality.' : 'Professional, punctual, and exceptionally talented. Booking this vendor was the best decision we made for our big day. Highly highly recommended!'}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-neutral-200 shrink-0" />
                        <div>
                          <div className="font-medium text-neutral-800">{review === 1 ? 'Anjali & Rohan' : 'Sneha & David'}</div>
                          <div className="text-xs text-neutral-400">Verified Client</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </div>
          
          {/* Footer Sticky Action */}
          <div className="border-t border-neutral-100 p-4 md:p-6 bg-white shrink-0 flex items-center justify-between">
            <div className="hidden md:block">
              <div className="text-sm text-neutral-500">Require an inquiry?</div>
              <div className="font-medium text-brand-burgundy">Response usually within 24 hours</div>
            </div>
            <button className="w-full md:w-auto px-8 py-3 bg-brand-burgundy text-brand-cream rounded-sm font-medium hover:bg-brand-burgundy/90 transition-colors shadow-lg">
              Check Availability
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};
