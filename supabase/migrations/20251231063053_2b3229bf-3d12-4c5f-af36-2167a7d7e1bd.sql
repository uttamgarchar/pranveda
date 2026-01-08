-- Add user_id column to orders table for linking orders to authenticated users
-- This column is nullable to support guest checkout but allows tracking for logged-in users
ALTER TABLE public.orders ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Create index for faster lookups
CREATE INDEX idx_orders_user_id ON public.orders(user_id);

-- Drop the existing overly permissive INSERT policy
DROP POLICY IF EXISTS "Anyone can insert orders" ON public.orders;

-- Create new INSERT policy - allows authenticated users to insert orders with their user_id
-- Also allows unauthenticated users for guest checkout
CREATE POLICY "Users can insert their own orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (
  (auth.uid() IS NULL) OR (user_id = auth.uid() OR user_id IS NULL)
);

-- Create SELECT policy for users to view their own orders
CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
USING (
  (user_id = auth.uid()) OR has_role(auth.uid(), 'admin'::app_role)
);

-- Drop the admin-only SELECT policy since we now have a combined policy
DROP POLICY IF EXISTS "Only admins can view orders" ON public.orders;