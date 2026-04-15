import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, CreditCard, CheckCircle2, Lock } from "lucide-react";
import { supabase } from "../lib/supabase";

interface BookingPaymentModalProps {
  entityId: number;
  entityType: 'vendor' | 'venue';
  date: Date;
  amount: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const BookingPaymentModal = ({ entityId, entityType, date, amount, onClose, onSuccess }: BookingPaymentModalProps) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"details" | "processing" | "success">("details");

  const handlePayment = async () => {
    setLoading(true);
    setStep("processing");

    try {
      // 0. Ensure user is logged in before creating the order
      const { data: userResponse } = await supabase.auth.getUser();
      const user = userResponse.user;
      
      if (!user) {
        alert("Please login first to book.");
        onClose();
        return;
      }

      // 1. Call your Supabase Edge Function to create an Order
      const { data: orderData, error: orderError } = await supabase.functions.invoke('create-razorpay-order', { 
        body: { amount } 
      });
      
      if (orderError) {
        console.error("Supabase edge function error:", orderError);
        throw new Error(`Edge Function Failed: ${orderError.message || JSON.stringify(orderError)}`);
      }

      // 2. Open the Razorpay Popup
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Use an env variable here!
        amount: orderData.amount,
        currency: "INR",
        name: "Nimish Event Architecture",
        description: "Escrow Deposit",
        order_id: orderData.id,
        handler: async function (response: any) {
          // 3. THIS RUNS AFTER SUCCESSFUL PAYMENT!
          // Real booking insertion
          const { data: booking, error: bookingError } = await supabase
            .from('bookings')
            .insert({
              user_id: user.id,
              vendor_id: entityType === 'vendor' ? entityId : null,
              venue_id: entityType === 'venue' ? entityId : null,
              booking_date: date.toISOString().split('T')[0],
              total_amount: amount,
              status: 'pending' // Yellow state (Escrow held)
            })
            .select()
            .single();
            
          if (bookingError) {
            console.error(bookingError);
            alert("Failed to insert booking. Payment was successful.");
            return;
          }

          // Escrow transaction logic
          const { error: escrowError } = await supabase
            .from('escrow_transactions')
            .insert({
              booking_id: booking.id,
              amount: amount,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              status: 'held_in_escrow'
            });

          if (escrowError) {
             console.error(escrowError);
             alert("Failed to log escrow transaction.");
          }
          
          setStep("success");
          
          // Wait to let user see success, then close
          setTimeout(() => {
            onSuccess();
          }, 2500);
        },
        theme: { color: "#5F1A21" } // Brand Burgundy
      };

      const razorpayForm = new (window as any).Razorpay(options);
      razorpayForm.open();

    } catch (error: any) {
      console.error("Payment flow error:", error);
      alert(`Failed to process payment: ${error?.message || error || "Unknown error"}. Please check the console for more details.`);
      setStep("details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white max-w-md w-full rounded-xl shadow-2xl overflow-hidden relative"
      >
        {step === "details" && (
          <>
            <div className="bg-brand-burgundy p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-serif">Secure Checkout</h3>
                <p className="text-white/80 text-sm mt-1 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Fully encrypted escrow payment
                </p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="bg-neutral-50 border border-neutral-100 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-neutral-500 text-sm">Booking Date</span>
                  <span className="font-medium text-brand-burgundy">{date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500 text-sm">Amount to hold in Escrow</span>
                  <span className="font-mono font-bold text-lg text-neutral-900">₹{amount.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded-md mb-6 flex gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  <strong>Escrow Protection:</strong> Your payment will be held securely in a Razorpay Escrow account and will automatically be released to the vendor exactly <strong>2 days after the event</strong>.
                </p>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-brand-gold hover:bg-yellow-500 text-neutral-900 font-bold py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <CreditCard className="w-5 h-5" />
                Pay with Razorpay
              </button>
            </div>
          </>
        )}

        {step === "processing" && (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full mb-4"
            />
            <h3 className="text-xl font-medium text-brand-burgundy mb-2">Processing Payment</h3>
            <p className="text-neutral-500 text-sm">Please do not close this window. Interacting with Razorpay Gateway...</p>
          </div>
        )}

        {step === "success" && (
          <div className="p-12 flex flex-col items-center justify-center text-center bg-green-50">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            >
              <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
            </motion.div>
            <h3 className="text-xl font-medium text-green-800 mb-2">Payment Secured!</h3>
            <p className="text-green-600/80 text-sm">Your funds are now in Escrow and the booking is confirmed.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
