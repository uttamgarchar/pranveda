import { Button } from "@/components/ui/button";
import { MessageCircle, Leaf, Sparkles } from "lucide-react";
const CallToAction = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919725417154", "_blank");
  };
  return <section className="py-20 bg-background relative overflow-hidden">
      <Leaf className="absolute top-10 left-10 w-40 h-40 text-primary/5 animate-float rotate-12" />
      <Leaf className="absolute bottom-10 right-10 w-48 h-48 text-primary/5 animate-float animation-delay-300 -rotate-45" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-primary rounded-3xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <Sparkles className="absolute top-8 right-8 w-12 h-12 text-primary-foreground/20 animate-pulse" />
          <Sparkles className="absolute bottom-8 left-8 w-16 h-16 text-primary-foreground/10 animate-pulse animation-delay-300" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 border border-primary-foreground/30 mb-6 animate-bounce-in">
              <Leaf className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">Let's Connect</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground drop-shadow-lg">
              Ready to Start Your Wellness Journey?
            </h2>
            
            <p className="text-primary-foreground/90 text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with us on WhatsApp for personalized product recommendations
              and expert guidance on your path to 
              <span className="font-bold"> natural health and vitality</span>
            </p>
            
            
            
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-primary-foreground/80 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse"></div>
                <span>Instant Response</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse animation-delay-200"></div>
                <span>Expert Guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse animation-delay-400"></div>
                <span>Free Consultation</span>
              </div>
            </div>
          </div>
          
          {/* Floating leaves */}
          <Leaf className="absolute top-20 left-20 w-8 h-8 text-primary-foreground/10 animate-float" />
          <Leaf className="absolute bottom-20 right-20 w-10 h-10 text-primary-foreground/10 animate-float animation-delay-500 rotate-45" />
        </div>
      </div>
    </section>;
};
export default CallToAction;