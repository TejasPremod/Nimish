import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const payload = await req.json()
    
    // In a real application, you MUST verify the webhook signature using crypto
    // const signature = req.headers.get('x-razorpay-signature')

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Handle payment.captured (Funds moved to Escrow)
    if (payload.event === 'payment.captured') {
      const payment = payload.payload.payment.entity;
      
      // Update escrow transaction status
      await supabase
        .from('escrow_transactions')
        .update({ status: 'held_in_escrow' })
        .eq('razorpay_payment_id', payment.id);
    }
    
    // Handle Escrow settlement/release trigger logic
    // Usually handled by a cron job or webhook when event is done

    return new Response(
      JSON.stringify({ received: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
