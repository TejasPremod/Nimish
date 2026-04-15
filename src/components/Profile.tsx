import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useAuth, UserProfile } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { User, Camera, Loader2 } from "lucide-react";

export const Profile = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    dob: "",
    avatar_url: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        phone_number: profile.phone_number || "",
        dob: profile.dob || "",
        avatar_url: profile.avatar_url || "",
      });
    } else if (user) {
      // Pre-fill from Google if available
      const fullName = user.user_metadata?.full_name || "";
      const names = fullName.split(" ");
      const firstName = names[0] || "";
      const lastName = names.length > 1 ? names.slice(1).join(" ") : "";
      
      setFormData({
        ...formData,
        first_name: firstName,
        last_name: lastName,
        avatar_url: user.user_metadata?.avatar_url || "",
      });
    }
  }, [profile, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setMessage({ type: "", text: "" });
      
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }
      
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}-${Math.random()}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, avatar_url: publicUrl }));
      setMessage({ type: "success", text: "Avatar uploaded temporarily. Save changes to keep it." });
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Error uploading image" });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      setMessage({ type: "", text: "" });

      if (!formData.first_name || !formData.last_name || !formData.phone_number || !formData.dob) {
        setMessage({ type: "error", text: "Please fill out all required fields." });
        setLoading(false);
        return;
      }

      const updates = {
        id: user.id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
        dob: formData.dob,
        avatar_url: formData.avatar_url,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }

      await refreshProfile();
      setMessage({ type: "success", text: "Profile updated successfully!" });
      
      // If it was their first time, redirect them automatically
      if (!profile) {
        setTimeout(() => {
          window.location.hash = "#home";
        }, 1500);
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <section className="relative min-h-screen pt-32 pb-20 px-8 bg-brand-cream">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-brand-gold/20"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl font-serif text-brand-burgundy mb-4">
              {profile ? "Your Profile" : "Complete Your Profile"}
            </h1>
            <p className="text-neutral-500">
              {profile 
                ? "Update your personal information below." 
                : "Please fill out these details to continue using Nimish Event Architecture."}
            </p>
          </div>

          {message.text && (
            <div className={`p-4 rounded-md mb-6 text-sm ${
              message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {message.text}
            </div>
          )}

          <div className="flex flex-col items-center mb-10">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-brand-cream border-2 border-brand-gold/30 shadow-inner flex items-center justify-center relative">
                {formData.avatar_url ? (
                  <img src={formData.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} className="text-brand-gold/50" />
                )}
                
                <div 
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera size={24} className="text-white" />
                </div>
              </div>
              <input 
                type="hidden" 
                name="avatar_url" 
                value={formData.avatar_url} 
              />
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/png, image/jpeg, image/webp" 
                onChange={handleAvatarUpload} 
                disabled={uploading}
              />
            </div>
            {uploading && <p className="text-xs text-brand-gold mt-2 flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> Uploading...</p>}
            <p className="text-xs text-neutral-400 mt-3 text-center">
              Click the image to upload a new avatar.<br/>Recommended size: 256x256px
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">First Name *</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-md focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-md focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-md focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Date of Birth *</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-md focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 px-6 py-4 bg-brand-burgundy text-brand-cream rounded-md font-medium shadow-lg hover:bg-brand-burgundy/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> Saving Changes...</>
              ) : (
                "Save Profile"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
