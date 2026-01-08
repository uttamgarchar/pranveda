import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Eye, Package, Leaf, Info, ShieldCheck } from "lucide-react";
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}
const ProductCard = ({
  product,
  onAddToCart
}: ProductCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return <>
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group hover-lift border-border hover:border-primary/50">
        <div className="aspect-square overflow-hidden bg-gradient-to-br from-background to-muted/20 cursor-pointer relative" onClick={() => setIsOpen(true)}>
          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground animate-bounce-in shadow-lg">
            New
          </Badge>
        </div>
        <CardContent className="p-3">
          <Badge variant="secondary" className="mb-1.5 text-xs">
            {product.category}
          </Badge>
          <h3 className="font-semibold text-base mb-1.5 line-clamp-1">{product.name}</h3>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              ₹{product.price}
            </span>
            <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => setIsOpen(true)}>
              <Eye className="mr-1 h-3 w-3" />
              View
            </Button>
          </div>
        </CardContent>
        <CardFooter className="p-3 pt-0">
          <Button className="w-full h-8 text-xs" onClick={() => onAddToCart(product)}>
            <ShoppingCart className="mr-1 h-3 w-3" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{product.name}</DialogTitle>
            <DialogDescription>
              <Badge variant="secondary" className="mt-2">
                {product.category}
              </Badge>
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-muted-foreground mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-bold text-primary">
                    ₹{product.price}
                  </span>
                </div>
                <Button className="w-full" size="lg" onClick={() => {
                onAddToCart(product);
                setIsOpen(false);
              }}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>

          
        </DialogContent>
      </Dialog>
    </>;
};
export default ProductCard;