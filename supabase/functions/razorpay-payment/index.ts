import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RAZORPAY_KEY_ID = Deno.env.get('RAZORPAY_KEY_ID');
const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, amount, currency = 'INR', receipt, orderId, paymentId, signature, customerDetails, orderItems, totalAmount } = await req.json();
    
    console.log(`Razorpay action: ${action}`);

    if (action === 'create-order') {
      const orderData = {
        amount: Math.round(amount * 100),
        currency,
        receipt: receipt || `order_${Date.now()}`,
      };

      console.log('Creating order with data:', orderData);

      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`),
        },
        body: JSON.stringify(orderData),
      });

      const order = await response.json();
      
      if (!response.ok) {
        console.error('Razorpay order creation failed:', order);
        throw new Error(order.error?.description || 'Failed to create order');
      }

      console.log('Order created successfully:', order.id);

      return new Response(JSON.stringify({ 
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: RAZORPAY_KEY_ID,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'verify-payment') {
      const crypto = await import("https://deno.land/std@0.177.0/crypto/mod.ts");
      
      const body = orderId + "|" + paymentId;
      const key = new TextEncoder().encode(RAZORPAY_KEY_SECRET);
      const data = new TextEncoder().encode(body);
      
      const cryptoKey = await crypto.crypto.subtle.importKey(
        "raw",
        key,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );
      
      const signatureBuffer = await crypto.crypto.subtle.sign("HMAC", cryptoKey, data);
      const generatedSignature = Array.from(new Uint8Array(signatureBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      const isValid = generatedSignature === signature;
      
      console.log('Payment verification:', isValid ? 'SUCCESS' : 'FAILED');

      // If payment is valid, save order to database
      if (isValid && customerDetails && orderItems) {
        const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
        
        // Get user_id from the authorization header if present
        const authHeader = req.headers.get('Authorization');
        let userId = null;
        if (authHeader) {
          const token = authHeader.replace('Bearer ', '');
          const { data: { user } } = await supabase.auth.getUser(token);
          userId = user?.id || null;
        }
        
        const { error: insertError } = await supabase
          .from('orders')
          .insert({
            customer_name: customerDetails.name,
            customer_email: customerDetails.email,
            customer_phone: customerDetails.phone,
            customer_address: customerDetails.address,
            customer_city: customerDetails.city,
            customer_pincode: customerDetails.pincode,
            order_items: orderItems,
            total_amount: totalAmount,
            razorpay_order_id: orderId,
            razorpay_payment_id: paymentId,
            payment_status: 'success',
            user_id: userId,
          });

        if (insertError) {
          console.error('Failed to save order:', insertError);
        } else {
          console.log('Order saved successfully');
        }
      }

      return new Response(JSON.stringify({ 
        verified: isValid,
        paymentId,
        orderId,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    throw new Error('Invalid action');

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error in razorpay-payment function:', errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
