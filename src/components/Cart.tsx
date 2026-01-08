import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Product } from "./ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import CustomerDetailsForm, { CustomerDetails } from "./CustomerDetailsForm";

export interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
}

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Cart = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails | null>(null);
  const { toast } = useToast();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleProceedToCheckout = () => {
    if (items.length === 0) return;
    setShowForm(true);
  };

  const handleCustomerDetailsSubmit = async (details: CustomerDetails) => {
    setCustomerDetails(details);
    setIsProcessing(true);
    
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load payment gateway");
      }

      const { data, error } = await supabase.functions.invoke("razorpay-payment", {
        body: {
          action: "create-order",
          amount: total,
          currency: "INR",
          receipt: `order_${Date.now()}`,
        },
      });

      if (error || !data?.orderId) {
        throw new Error(error?.message || data?.error || "Failed to create order");
      }

      const options: RazorpayOptions = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "PRANVEDA",
        description: `Order for ${items.length} item(s)`,
        order_id: data.orderId,
        handler: async (response: RazorpayResponse) => {
          try {
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke(
              "razorpay-payment",
              {
                body: {
                  action: "verify-payment",
                  orderId: response.razorpay_order_id,
                  paymentId: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                  customerDetails: details,
                  orderItems: items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                  })),
                  totalAmount: total,
                },
              }
            );

            if (verifyError || !verifyData?.verified) {
              throw new Error("Payment verification failed");
            }

            toast({
              title: "Payment Successful!",
              description: `Your order has been placed. Payment ID: ${response.razorpay_payment_id}`,
            });

            items.forEach(item => onRemoveItem(item.id));
            setShowForm(false);
            setCustomerDetails(null);
            onClose();
          } catch (err) {
            console.error("Verification error:", err);
            toast({
              title: "Verification Failed",
              description: "Please contact support with your payment details.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: details.name,
          email: details.email,
          contact: details.phone,
        },
        theme: {
          color: "#2d6a4f",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Checkout error:", err);
      toast({
        title: "Checkout Failed",
        description: err instanceof Error ? err.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBack = () => {
    setShowForm(false);
    setCustomerDetails(null);
  };

  const handleClose = () => {
    setShowForm(false);
    setCustomerDetails(null);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{showForm ? "Checkout" : "Shopping Cart"}</SheetTitle>
          <SheetDescription>
            {showForm 
              ? "Fill in your details to complete the order"
              : items.length === 0
                ? "Your cart is empty"
                : `${items.length} item${items.length > 1 ? "s" : ""} in your cart`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 py-6">
          {showForm ? (
            <CustomerDetailsForm 
              onSubmit={handleCustomerDetailsSubmit}
              onBack={handleBack}
              isProcessing={isProcessing}
            />
          ) : items.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>Add some products to get started!</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 flex-1 overflow-y-auto max-h-[50vh]">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-lg border bg-card"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1 space-y-2">
                      <h4 className="font-semibold text-sm">{item.name}</h4>
                      <p className="text-primary font-semibold">₹{item.price}</p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 ml-auto text-destructive"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <SheetFooter className="flex-col gap-4">
                <div className="flex items-center justify-between text-lg font-semibold border-t pt-4">
                  <span>Total:</span>
                  <span className="text-primary">₹{total.toFixed(2)}</span>
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleProceedToCheckout}
                  disabled={items.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
