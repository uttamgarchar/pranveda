import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Leaf, Sprout, TreeDeciduous } from "lucide-react";
import pranvedaLogo from "@/assets/pranveda-logo.png";

interface HeroProps {
  onExploreClick: () => void;
}

const Hero = ({ onExploreClick }: HeroProps) => {
  const [transform, setTransform] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const [isIdle, setIsIdle] = useState(true);
  const logoRef = useRef<HTMLDivElement>(null);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!logoRef.current) return;

    const rect = logoRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Normalize and limit movement (max 30px)
    const maxMove = 30;
    const maxRotate = 30;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const maxDistance = Math.max(window.innerWidth, window.innerHeight) / 2;

    const normalizedX = (deltaX / maxDistance) * maxMove;
    const normalizedY = (deltaY / maxDistance) * maxMove;

    // Calculate rotation (inverted for natural feel)
    const rotateY = (deltaX / maxDistance) * maxRotate;
    const rotateX = -(deltaY / maxDistance) * maxRotate;

    setTransform({
      x: Math.max(-maxMove, Math.min(maxMove, normalizedX)),
      y: Math.max(-maxMove, Math.min(maxMove, normalizedY)),
      rotateX: Math.max(-maxRotate, Math.min(maxRotate, rotateX)),
      rotateY: Math.max(-maxRotate, Math.min(maxRotate, rotateY)),
    });

    setIsIdle(false);

    // Reset idle timeout
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
    idleTimeoutRef.current = setTimeout(() => {
      setIsIdle(true);
      setTransform({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
    }, 2000);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, [handleMouseMove]);

  const logoStyle = isIdle
    ? {}
    : {
        transform: `translate(${transform.x}px, ${transform.y}px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        transition: "transform 0.25s ease-out",
      };

  return (
    <section className="relative bg-secondary py-20 md:py-32 overflow-hidden min-h-[80vh] flex items-center">
      {/* Falling leaves animation */}
      <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
        <Leaf className="absolute top-0 left-[10%] w-6 h-6 text-primary/20 animate-falling-leaf" />
        <Leaf className="absolute top-0 left-[25%] w-5 h-5 text-primary/15 animate-falling-leaf-2 animation-delay-200" />
        <Leaf className="absolute top-0 left-[40%] w-7 h-7 text-primary/18 animate-falling-leaf-3 animation-delay-500" />
        <Leaf className="absolute top-0 left-[55%] w-5 h-5 text-primary/12 animate-falling-leaf animation-delay-300" />
        <Leaf className="absolute top-0 left-[70%] w-6 h-6 text-primary/20 animate-falling-leaf-2 animation-delay-600" />
        <Leaf className="absolute top-0 left-[85%] w-4 h-4 text-primary/15 animate-falling-leaf-3 animation-delay-100" />
        <Leaf className="absolute top-0 left-[5%] w-5 h-5 text-primary/18 animate-falling-leaf-2 animation-delay-400" />
        <Leaf className="absolute top-0 left-[33%] w-6 h-6 text-primary/12 animate-falling-leaf animation-delay-500" />
        <Leaf className="absolute top-0 left-[62%] w-4 h-4 text-primary/20 animate-falling-leaf-3 animation-delay-200" />
        <Leaf className="absolute top-0 left-[78%] w-5 h-5 text-primary/15 animate-falling-leaf animation-delay-400" />
        <Leaf className="absolute top-0 left-[92%] w-6 h-6 text-primary/18 animate-falling-leaf-2 animation-delay-300" />
        <Leaf className="absolute top-0 left-[18%] w-4 h-4 text-primary/12 animate-falling-leaf-3 animation-delay-600" />
      </div>

      {/* Floating leaves decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Top area leaves */}
        <Leaf className="absolute top-10 left-[5%] w-8 h-8 text-primary/12 animate-float rotate-12" />
        <Leaf className="absolute top-20 left-[15%] w-16 h-16 text-primary/8 animate-float animation-delay-200" />
        <Leaf className="absolute top-8 left-[30%] w-6 h-6 text-primary/15 animate-float animation-delay-400 -rotate-45" />
        <Sprout className="absolute top-16 right-[35%] w-10 h-10 text-primary/10 animate-float animation-delay-300" />
        <Leaf className="absolute top-12 right-[20%] w-12 h-12 text-primary/8 animate-float animation-delay-100 rotate-90" />
        <Leaf className="absolute top-24 right-[8%] w-8 h-8 text-primary/12 animate-float animation-delay-500" />
        <Leaf className="absolute top-6 left-[45%] w-5 h-5 text-primary/15 animate-float animation-delay-100 rotate-30" />
        <Sprout className="absolute top-28 left-[55%] w-7 h-7 text-primary/10 animate-float animation-delay-600" />
        <Leaf className="absolute top-4 right-[45%] w-6 h-6 text-primary/12 animate-float animation-delay-200 -rotate-20" />
        <TreeDeciduous className="absolute top-14 left-[70%] w-8 h-8 text-primary/8 animate-float animation-delay-400" />
        
        {/* Upper-middle area leaves */}
        <Leaf className="absolute top-[25%] left-[2%] w-10 h-10 text-primary/10 animate-float animation-delay-300 rotate-60" />
        <Sprout className="absolute top-[28%] left-[18%] w-6 h-6 text-primary/12 animate-float animation-delay-500" />
        <Leaf className="absolute top-[22%] right-[18%] w-8 h-8 text-primary/8 animate-float animation-delay-100 -rotate-30" />
        <Leaf className="absolute top-[30%] right-[3%] w-12 h-12 text-primary/10 animate-float animation-delay-400 rotate-45" />
        
        {/* Middle area leaves */}
        <TreeDeciduous className="absolute top-1/3 left-[3%] w-14 h-14 text-primary/6 animate-float animation-delay-600" />
        <Leaf className="absolute top-1/2 left-[8%] w-10 h-10 text-primary/10 animate-float animation-delay-200 rotate-180" />
        <Sprout className="absolute top-[40%] right-[5%] w-16 h-16 text-primary/8 animate-float animation-delay-400" />
        <Leaf className="absolute top-[55%] right-[12%] w-8 h-8 text-primary/12 animate-float animation-delay-100 -rotate-30" />
        <Leaf className="absolute top-[45%] left-[12%] w-7 h-7 text-primary/10 animate-float animation-delay-500 rotate-20" />
        <Sprout className="absolute top-[50%] right-[8%] w-9 h-9 text-primary/10 animate-float animation-delay-300" />
        <Leaf className="absolute top-[38%] left-[6%] w-5 h-5 text-primary/15 animate-float animation-delay-600 -rotate-60" />
        <TreeDeciduous className="absolute top-[48%] right-[2%] w-11 h-11 text-primary/8 animate-float animation-delay-200" />
        
        {/* Lower-middle area leaves */}
        <Leaf className="absolute top-[60%] left-[4%] w-9 h-9 text-primary/10 animate-float animation-delay-400 rotate-75" />
        <Sprout className="absolute top-[65%] left-[15%] w-6 h-6 text-primary/12 animate-float animation-delay-100" />
        <Leaf className="absolute top-[62%] right-[15%] w-10 h-10 text-primary/8 animate-float animation-delay-500 -rotate-45" />
        <Leaf className="absolute top-[68%] right-[6%] w-7 h-7 text-primary/10 animate-float animation-delay-300 rotate-30" />
        
        {/* Bottom area leaves */}
        <Sprout className="absolute bottom-32 left-[12%] w-12 h-12 text-primary/8 animate-float animation-delay-500" />
        <Leaf className="absolute bottom-20 left-[25%] w-10 h-10 text-primary/10 animate-float animation-delay-300 rotate-45" />
        <Leaf className="absolute bottom-16 right-[30%] w-14 h-14 text-primary/8 animate-float animation-delay-600 rotate-45" />
        <Sprout className="absolute bottom-24 right-[15%] w-8 h-8 text-primary/12 animate-float animation-delay-200" />
        <Leaf className="absolute bottom-10 right-[5%] w-12 h-12 text-primary/8 animate-float animation-delay-400 -rotate-12" />
        <TreeDeciduous className="absolute bottom-28 right-[40%] w-10 h-10 text-primary/6 animate-float animation-delay-100" />
        <Leaf className="absolute bottom-36 left-[35%] w-6 h-6 text-primary/12 animate-float animation-delay-500 rotate-60" />
        <Sprout className="absolute bottom-12 left-[45%] w-8 h-8 text-primary/10 animate-float animation-delay-200" />
        <Leaf className="absolute bottom-28 right-[22%] w-7 h-7 text-primary/10 animate-float animation-delay-400 -rotate-30" />
        <Leaf className="absolute bottom-8 left-[8%] w-9 h-9 text-primary/10 animate-float animation-delay-300 rotate-90" />
        <TreeDeciduous className="absolute bottom-18 right-[48%] w-8 h-8 text-primary/8 animate-float animation-delay-600" />
        <Leaf className="absolute bottom-40 left-[2%] w-11 h-11 text-primary/8 animate-float animation-delay-100 -rotate-15" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Interactive Logo Section */}
        <div className="flex flex-col items-center justify-center mb-12">
          <div 
            ref={logoRef}
            className="relative perspective-1000"
            style={{ perspective: "1000px" }}
          >
            {/* Floating particles */}
            <div className="absolute -top-4 -left-4 w-3 h-3 bg-primary/30 rounded-full animate-float blur-[1px]"></div>
            <div className="absolute top-8 -left-6 w-2 h-2 bg-primary/40 rounded-full animate-float animation-delay-300 blur-[1px]"></div>
            <div className="absolute -top-2 left-12 w-2 h-2 bg-primary/25 rounded-full animate-float animation-delay-500 blur-[1px]"></div>
            <div className="absolute top-4 -right-4 w-3 h-3 bg-primary/30 rounded-full animate-float animation-delay-200 blur-[1px]"></div>
            <div className="absolute -top-6 right-8 w-2 h-2 bg-primary/35 rounded-full animate-float animation-delay-400 blur-[1px]"></div>
            <div className="absolute bottom-8 -left-5 w-2 h-2 bg-primary/28 rounded-full animate-float animation-delay-600 blur-[1px]"></div>
            <div className="absolute bottom-4 -right-6 w-3 h-3 bg-primary/32 rounded-full animate-float animation-delay-100 blur-[1px]"></div>
            <div className="absolute -bottom-2 left-8 w-2 h-2 bg-primary/30 rounded-full animate-float animation-delay-400 blur-[1px]"></div>
            
            {/* Pulsing glow effect */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse-glow scale-110"></div>
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl animate-pulse-glow animation-delay-500 scale-125"></div>
            
            {/* Logo with mouse-follow effect */}
            <img 
              src={pranvedaLogo} 
              alt="Pranveda Logo" 
              className={`w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain relative z-10
                drop-shadow-[0_10px_30px_hsl(153_40%_35%/0.2)] cursor-pointer
                hover:drop-shadow-[0_20px_50px_hsl(153_40%_35%/0.35)]
                ${isIdle ? "animate-float-idle" : ""}`}
              style={logoStyle}
            />
          </div>

          {/* Mouse interaction hint */}
          <p className="mt-6 text-sm text-muted-foreground animate-fade-up animation-delay-300">
            Move your mouse to interact with the logo
          </p>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Nature badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-bounce-in">
            <Leaf className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">100% Natural & Pure</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary leading-tight animate-fade-up drop-shadow-lg">
            Discover Nature's Healing Power
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground animate-fade-up animation-delay-200 max-w-2xl mx-auto leading-relaxed">
            Premium Ayurvedic products rooted in ancient wisdom, 
            <span className="text-primary font-semibold"> crafted with love from nature </span>
            for your modern wellness journey
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-up animation-delay-400">
            <Button 
              size="lg" 
              className="text-base group bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-110 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-500 px-8 py-6 text-lg" 
              onClick={onExploreClick}
            >
              <Sprout className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Explore Natural Products
              <ArrowDown className="ml-2 h-5 w-5 group-hover:animate-bounce" />
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm text-muted-foreground animate-fade-up animation-delay-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span>Certified Organic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse animation-delay-200"></div>
              <span>Lab Tested</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse animation-delay-400"></div>
              <span>Eco-Friendly</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
