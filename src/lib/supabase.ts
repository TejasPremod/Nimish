import { createClient } from "@supabase/supabase-js";

// Hardcoded for Vercel deployment since the anon key is safely publishable
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://tydiuhvytofiedapxpjh.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_rbk2KYtCVlACTMtVcDZ39w_MxZ79q95";

// Check if this is a fresh tab session
if (!window.sessionStorage.getItem('tab_initialized')) {
  // Fresh tab / browser open! Wipe out persistent local storage auth tokens to require login again on exit.
  Object.keys(window.localStorage).forEach(key => {
    if (key.startsWith('sb-') && key.endsWith('-auth-token')) {
      window.localStorage.removeItem(key);
    }
  });
  window.sessionStorage.setItem('tab_initialized', 'true');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
