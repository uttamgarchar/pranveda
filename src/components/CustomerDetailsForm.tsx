import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft } from "lucide-react";

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

interface CustomerDetailsFormProps {
  onSubmit: (details: CustomerDetails) => void;
  onBack: () => void;
  isProcessing: boolean;
}

const CustomerDetailsForm = ({ onSubmit, onBack, isProcessing }: CustomerDetailsFormProps) => {
  const [details, setDetails] = useState<CustomerDetails>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [errors, setErrors] = useState<Partial<CustomerDetails>>({});

  const validate = (): boolean => {
    const newErrors: Partial<CustomerDetails> = {};
    
    if (!details.name.trim()) newErrors.name = "Name is required";
    if (!details.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!details.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[0-9]{10}$/.test(details.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    if (!details.address.trim()) newErrors.address = "Address is required";
    if (!details.city.trim()) newErrors.city = "City is required";
    if (!details.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^[0-9]{6}$/.test(details.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(details);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Button 
        type="button" 
        variant="ghost" 
        size="sm" 
        onClick={onBack}
        className="mb-2 -ml-2"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Cart
      </Button>
      
      <h3 className="font-semibold text-lg">Shipping Details</h3>
      
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          value={details.name}
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
          placeholder="Enter your full name"
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={details.email}
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
          placeholder="Enter your email"
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          value={details.phone}
          onChange={(e) => setDetails({ ...details, phone: e.target.value })}
          placeholder="10-digit mobile number"
          className={errors.phone ? "border-destructive" : ""}
        />
        {errors.phone && <p className="text-destructive text-sm">{errors.phone}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address *</Label>
        <Input
          id="address"
          value={details.address}
          onChange={(e) => setDetails({ ...details, address: e.target.value })}
          placeholder="Enter your full address"
          className={errors.address ? "border-destructive" : ""}
        />
        {errors.address && <p className="text-destructive text-sm">{errors.address}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={details.city}
            onChange={(e) => setDetails({ ...details, city: e.target.value })}
            placeholder="City"
            className={errors.city ? "border-destructive" : ""}
          />
          {errors.city && <p className="text-destructive text-sm">{errors.city}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pincode">Pincode *</Label>
          <Input
            id="pincode"
            value={details.pincode}
            onChange={(e) => setDetails({ ...details, pincode: e.target.value })}
            placeholder="6-digit pincode"
            className={errors.pincode ? "border-destructive" : ""}
          />
          {errors.pincode && <p className="text-destructive text-sm">{errors.pincode}</p>}
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Proceed to Payment"
        )}
      </Button>
    </form>
  );
};

export default CustomerDetailsForm;
