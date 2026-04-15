import { createClient } from "@supabase/supabase-js";

// Hardcoded for Vercel deployment since the anon key is safely publishable
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://tydiuhvytofiedapxpjh.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_rbk2KYtCVlACTMtVcDZ39w_MxZ79q95";



export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  }
});
