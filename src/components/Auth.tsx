import { useState } from "react";
import { motion } from "motion/react";
import { useAuth } from "../contexts/AuthContext";
import { LogIn, Loader2 } from "lucide-react";

export const Auth = () => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    setMessage({ type: "", text: "" });
    
    if (isSignIn) {
      const { error } = await signInWithEmail(email, password);
      if (error) {
        setMessage({ type: "error", text: error.message });
      }
    } else {
      const { error } = await signUpWithEmail(email, password);
      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({ type: "success", text: "Account created! If you are not auto-redirected, please sign in." });
        // Optionally switch to sign in
        setTimeout(() => setIsSignIn(true), 2000);
      }
    }
    setLoading(false);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-8 bg-brand-cream overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#D4AF3715_1px,transparent_1px),linear-gradient(to_bottom,#D4AF3715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 md:p-10 border border-brand-gold/20 relative z-10 flex flex-col items-center"
      >
        <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mb-6 shadow-inner">
          <LogIn className="w-8 h-8 text-brand-burgundy" />
        </div>
        
        <h2 className="text-3xl font-serif text-brand-burgundy mb-2 text-center">
          {isSignIn ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-neutral-500 mb-6 text-sm text-center">
          {isSignIn 
            ? "Sign in to access exclusive vendors and venues for your events."
            : "Sign up to start planning your perfect event today."}
        </p>

        {message.text && (
          <div className={`w-full p-3 rounded-md mb-6 text-sm text-center ${
            message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-md focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-md focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 px-6 py-4 bg-brand-burgundy text-brand-cream rounded-md font-medium shadow-lg hover:bg-brand-burgundy/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 size={18} className="animate-spin" /> Please wait...</> : (isSignIn ? "Sign In" : "Sign Up")}
          </button>
        </form>

        <div className="w-full flex items-center justify-between mb-6">
          <div className="w-full h-px bg-neutral-200"></div>
          <span className="px-4 text-xs text-neutral-400 uppercase tracking-wider font-medium">Or</span>
          <div className="w-full h-px bg-neutral-200"></div>
        </div>

        <button
          type="button"
          onClick={signInWithGoogle}
          className="w-full relative group px-6 py-3 bg-white border border-neutral-200 text-neutral-700 rounded-md overflow-hidden hover:bg-neutral-50 transition-colors shadow-sm"
        >
          <span className="relative z-10 font-medium flex items-center justify-center gap-3 text-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </span>
        </button>

        <p className="mt-8 text-sm text-neutral-500">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <button 
            type="button" 
            onClick={() => {
              setIsSignIn(!isSignIn);
              setMessage({ type: "", text: "" });
            }} 
            className="text-brand-burgundy font-medium hover:underline focus:outline-none"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </button>
        </p>

      </motion.div>
    </section>
  );
};
