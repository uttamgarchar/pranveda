import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, Leaf } from "lucide-react";

const testimonials = [
  {
    name: "Meera Reddy",
    location: "Hyderabad",
    rating: 5,
    text: "The moringa powder is really pure and fresh. I started feeling more energetic within a few days.",
  },
  {
    name: "Vikram Singh",
    location: "Pune",
    rating: 5,
    text: "Pranveda has done a great job with the quality. The powder is fine, clean, and smells natural.",
  },
  {
    name: "Sneha Iyer",
    location: "Bangalore",
    rating: 5,
    text: "I've tried moringa from many places but this one feels the most authentic and effective.",
  },
  {
    name: "Arjun Malhotra",
    location: "Chennai",
    rating: 5,
    text: "Very happy with Pranveda's product. It mixes easily and tastes exactly like natural moringa.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-secondary relative overflow-hidden">
      {/* Decorative elements */}
      <Leaf className="absolute top-20 left-5 w-24 h-24 text-primary/5 rotate-12 animate-float" />
      <Leaf className="absolute bottom-32 right-10 w-32 h-32 text-primary/5 -rotate-45 animate-float animation-delay-400" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-bounce-in">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-foreground">Customer Love</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Real experiences from people who trust PRANVEDA for their 
            <span className="text-primary font-medium"> natural wellness journey</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-border hover:border-primary/30 bg-card relative overflow-hidden hover-lift"
            >
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors" />
              
              <CardContent className="p-8 relative z-10">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-primary text-primary group-hover:scale-110 transition-transform"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic leading-relaxed text-base">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
