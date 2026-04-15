/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import { Logo } from "./Logo";
import { Menu, X, LogOut, Heart } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useLikedItems } from "../lib/LikedItemsContext";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const { likedItems, setSidebarOpen } = useLikedItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Services", "Vendors", "Venues", "Portfolio", "About"];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-5 md:py-6 transition-all duration-300",
          isScrolled ? "bg-brand-cream/95 backdrop-blur-md border-b-0 py-4" : "bg-transparent"
        )}
      >
        <div 
          className="group cursor-pointer flex-shrink-0"
          onClick={() => {
            window.location.hash = "#home";
            setIsMobileMenuOpen(false);
          }}
        >
          <Logo className={cn("transition-all duration-500 group-hover:scale-105", isScrolled ? "w-12 md:w-20" : "w-20 md:w-28")} />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12 bg-white/30 backdrop-blur-md px-8 py-3 rounded-full border border-white/20 shadow-sm">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-neutral-600 hover:text-brand-burgundy transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="relative p-2 text-neutral-500 hover:text-red-500 transition-colors mr-2"
          >
            <Heart className={cn("w-5 h-5", likedItems.length > 0 && "text-red-500 fill-current")} />
            {likedItems.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {likedItems.length}
              </span>
            )}
          </button>
          {!user ? (
            <a href="#login" className="text-sm font-medium text-brand-burgundy hover:text-brand-gold transition-colors block px-4">
              Sign In
            </a>
          ) : (
            <div className="flex items-center gap-4">
              <a href="#profile" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-brand-cream border border-brand-gold/30">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-burgundy font-medium text-sm">
                      {profile?.first_name?.[0] || user.user_metadata?.full_name?.[0] || "U"}
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium text-brand-burgundy group-hover:text-brand-gold transition-colors">
                  {profile?.first_name || user.user_metadata?.full_name?.split(" ")[0] || "Profile"}
                </span>
              </a>
              <button onClick={signOut} className="text-sm font-medium text-neutral-400 hover:text-red-600 transition-colors flex items-center gap-1 focus:outline-none" title="Sign Out">
                <LogOut size={16} />
              </button>
            </div>
          )}
          <motion.a
            href="tel:+919995488911"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group px-8 py-3 bg-brand-burgundy text-brand-cream rounded-sm overflow-hidden"
          >
            <span className="relative z-10 font-medium">Contact</span>
            {/* Border Beam / Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-brand-gold/10 blur-xl" />
          </motion.a>
        </div>

        {/* Mobile Menu Toggle Button & Global Triggers */}
        <div className="flex md:hidden items-center gap-4 relative z-[60]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="relative p-2 text-neutral-500 hover:text-red-500 transition-colors"
          >
            <Heart className={cn("w-5 h-5", likedItems.length > 0 && "text-red-500 fill-current")} />
            {likedItems.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {likedItems.length}
              </span>
            )}
          </button>
          
          <button 
            className="p-2 text-brand-burgundy focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-brand-cream flex flex-col items-center justify-center pt-20 px-8"
          >
            <div className="flex flex-col items-center gap-8 w-full max-w-sm">
              {navLinks.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-serif text-brand-burgundy hover:text-brand-gold transition-colors"
                >
                  {item}
                </a>
              ))}
              
              {!user ? (
                <a 
                  href="#login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-serif text-brand-gold hover:text-brand-burgundy transition-colors mt-4"
                >
                  Sign In
                </a>
              ) : (
                <>
                  <a 
                    href="#profile" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-serif text-brand-gold hover:text-brand-burgundy transition-colors mt-4 flex items-center gap-3"
                  >
                    Profile
                  </a>
                  <button 
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-2xl font-serif text-red-600 hover:text-red-700 transition-colors mt-2 flex items-center gap-3"
                  >
                    <LogOut size={24} /> Sign Out
                  </button>
                </>
              )}

              <div className="w-full h-px bg-brand-gold/20 my-4" />
              
              <div className="flex flex-col items-center text-center gap-2">
                <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Contact Us</span>
                <span className="text-xl text-brand-burgundy font-medium">Abhishek B Nair</span>
                <a 
                  href="tel:+919995488911"
                  className="text-2xl font-mono text-brand-gold hover:text-brand-burgundy transition-colors mt-2"
                >
                  99954 88911
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
