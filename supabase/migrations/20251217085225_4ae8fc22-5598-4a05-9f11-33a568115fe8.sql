-- Create orders table to store successful orders
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  customer_address text NOT NULL,
  customer_city text NOT NULL,
  customer_pincode text NOT NULL,
  order_items jsonb NOT NULL,
  total_amount numeric NOT NULL,
  razorpay_order_id text NOT NULL,
  razorpay_payment_id text NOT NULL,
  payment_status text NOT NULL DEFAULT 'success',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policy: Only admins can view orders
CREATE POLICY "Only admins can view orders"
ON public.orders
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Policy: Anyone can insert orders (for checkout flow)
CREATE POLICY "Anyone can insert orders"
ON public.orders
FOR INSERT
WITH CHECK (true);