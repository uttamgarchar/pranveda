import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedProducts = () => {
  const navigate = useNavigate();

  const { data: featuredProducts, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(3);
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-20 bg-muted relative overflow-hidden">
      <Leaf className="absolute top-10 right-10 w-32 h-32 text-primary/5 rotate-45 animate-float" />
      <Leaf className="absolute bottom-20 left-10 w-40 h-40 text-primary/5 -rotate-12 animate-float animation-delay-300" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-bounce-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Bestsellers</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Featured Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Discover our most popular Ayurvedic remedies, 
            <span className="text-primary font-medium"> handpicked from nature's bounty</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="overflow-hidden border-border">
                <Skeleton className="aspect-square w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-8 w-1/3" />
                </CardContent>
              </Card>
            ))
          ) : (
            featuredProducts?.map((product, index) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group border-border hover:border-primary/30 bg-card relative hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Nature badge */}
              <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                <Leaf className="w-3 h-3" />
                100% Natural
              </div>
              
              <div className="aspect-square overflow-hidden bg-secondary relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-3"
                />
              </div>
              
              <CardContent className="p-6 relative">
                <h3 className="font-bold text-xl mb-2 text-foreground group-hover:text-primary transition-colors">{product.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          ))
          )}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            onClick={() => navigate("/products")}
            className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg hover:scale-110 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-500"
          >
            <Leaf className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            View All Products
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
