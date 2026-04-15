// @ts-ignore: Deno import not recognized by Node.js TypeScript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// @ts-ignore: Deno import not recognized by Node.js TypeScript
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

// Declare Deno globally so Node.js TypeScript stops complaining
declare const Deno: any;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amount } = await req.json()

    // Create a new Razorpay Order using Razorpay API
    // https://razorpay.com/docs/api/orders/
    const auth = btoa(`${Deno.env.get('RAZORPAY_KEY_ID')}:${Deno.env.get('RAZORPAY_KEY_SECRET')}`)
    
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      },
      body: JSON.stringify({
        amount: amount * 100, // Razorpay amount is in paise
        currency: 'INR',
        // Enable Route/Escrow for this order. We would pass recipient accounts based on the platform logic
        // This is a basic setup
        receipt: `receipt_${Math.floor(Math.random() * 10000)}`
      })
    });

    const order = await response.json();

    if (!response.ok) {
      throw new Error(order.error?.description || 'Failed to create order');
    }

    return new Response(
      JSON.stringify(order),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
