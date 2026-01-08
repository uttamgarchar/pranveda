import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FeaturedProducts from "@/components/FeaturedProducts";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Index = () => {
  const navigate = useNavigate();
  const featuresRef = useScrollReveal();
  const productsRef = useScrollReveal();
  const testimonialsRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  const scrollToProducts = () => {
    navigate("/products");
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero onExploreClick={scrollToProducts} />
      <div
        ref={productsRef.ref}
        className={`scroll-reveal ${productsRef.isVisible ? 'revealed' : ''}`}
      >
        <FeaturedProducts />
      </div>

      <div
        ref={featuresRef.ref}
        className={`scroll-reveal ${featuresRef.isVisible ? 'revealed' : ''}`}
      >
        <Features />
      </div>



      <div
        ref={testimonialsRef.ref}
        className={`scroll-reveal ${testimonialsRef.isVisible ? 'revealed' : ''}`}
      >
        <Testimonials />
      </div>

      <div
        ref={ctaRef.ref}
        className={`scroll-reveal ${ctaRef.isVisible ? 'revealed' : ''}`}
      >
        <CallToAction />
      </div>
    </div>
  );
};

export default Index;
