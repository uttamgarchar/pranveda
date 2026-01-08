import { useRef, useState, useEffect } from "react";
import ProductCard, { Product } from "@/components/ProductCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface ProductsProps {
  onAddToCart: (product: Product) => void;
}

const Products = ({ onAddToCart }: ProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { toast } = useToast();
  const headerRef = useScrollReveal();
  const productsRef = useScrollReveal();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories from products
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div 
            ref={headerRef.ref}
            className={`text-center mb-12 scroll-reveal ${headerRef.isVisible ? 'revealed' : ''}`}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Our Products
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Handpicked Ayurvedic remedies crafted with pure, natural ingredients
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div 
            ref={productsRef.ref}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 scroll-reveal ${productsRef.isVisible ? 'revealed' : ''}`}
          >
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                {products.length === 0 
                  ? "No products available at the moment."
                  : "No products found matching your search."}
              </div>
            ) : (
              filteredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
