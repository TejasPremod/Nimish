import { motion, AnimatePresence } from "motion/react";
import { X, HeartCrack, ArrowRight } from "lucide-react";
import { useLikedItems } from "../lib/LikedItemsContext";

export const LikedItemsSidebar = () => {
  const { likedItems, toggleLike, isSidebarOpen, setSidebarOpen } = useLikedItems();

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-[150]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[200] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-brand-burgundy text-white">
              <h2 className="text-xl font-serif">Saved Favorites</h2>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {likedItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-neutral-400">
                  <HeartCrack className="w-12 h-12 mb-4 opacity-50" />
                  <p className="text-lg font-medium text-neutral-600 mb-2">No saved items yet</p>
                  <p className="text-sm">Click the heart icon on any vendor or venue to save it for later.</p>
                </div>
              ) : (
                likedItems.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={`${item.type}-${item.id}`}
                    className="flex gap-4 p-4 bg-neutral-50 rounded-lg border border-neutral-100 items-center hover:border-brand-gold/30 transition-colors group"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded-md shadow-sm"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase font-bold text-brand-gold mb-1 tracking-wider">
                        {item.type} • {item.category}
                      </div>
                      <h4 className="font-serif text-brand-burgundy truncate">{item.name}</h4>
                      <p className="text-sm font-mono text-neutral-600 mt-1">₹{item.min_price.toLocaleString()}</p>
                    </div>

                    <div className="flex flex-col gap-2 items-end">
                      <button 
                        onClick={() => toggleLike(item)}
                        className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        title="Remove"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          if (item.type === 'vendor') {
                            window.location.hash = '#vendors';
                            setTimeout(() => window.dispatchEvent(new CustomEvent('open-vendor-modal', { detail: item.id })), 100);
                          } else {
                            window.location.hash = '#venues';
                            setTimeout(() => window.dispatchEvent(new CustomEvent('open-venue-modal', { detail: item.id })), 100);
                          }
                          setSidebarOpen(false);
                        }}
                        className="p-2 text-brand-burgundy hover:bg-brand-burgundy/10 rounded-full transition-colors"
                        title="View Directory"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            
            {/* Footer */}
            {likedItems.length > 0 && (
              <div className="p-6 border-t border-neutral-100 bg-neutral-50">
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="w-full py-3 bg-brand-gold text-neutral-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors shadow-sm"
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
