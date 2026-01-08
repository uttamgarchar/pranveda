import { Leaf, Shield, Heart, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "Pure Ayurvedic ingredients sourced from nature, free from harmful chemicals and additives.",
  },
  {
    icon: Shield,
    title: "Quality Tested",
    description: "Every product undergoes rigorous testing to ensure safety, purity, and effectiveness.",
  },
  {
    icon: Heart,
    title: "Holistic Wellness",
    description: "Ancient wisdom meets modern science for complete mind, body, and spirit balance.",
  },
  {
    icon: Sparkles,
    title: "Traditional Methods",
    description: "Crafted using time-tested Ayurvedic processes for maximum potency and benefits.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-bounce-in">
            <Leaf className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Our Promise</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Why Choose PRANVEDA?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Experience the power of authentic Ayurveda with our carefully crafted products, 
            <span className="text-primary font-medium"> blessed by nature</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-border hover:border-primary/30 bg-card overflow-hidden relative"
              >
                <CardContent className="p-8 relative z-10">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
