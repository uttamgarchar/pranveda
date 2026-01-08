import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const About = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919725417154", "_blank");
  };

  const headerRef = useScrollReveal();
  const storyRef = useScrollReveal();
  const contactRef = useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div 
            ref={headerRef.ref}
            className={`text-center mb-12 scroll-reveal ${headerRef.isVisible ? 'revealed' : ''}`}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              About PRANVEDA
            </h1>
            <p className="text-muted-foreground text-lg">
              The Main Roots of Natural Wellness
            </p>
          </div>

          <div className="space-y-8">
            <div 
              ref={storyRef.ref}
              className={`scroll-reveal ${storyRef.isVisible ? 'revealed' : ''}`}
            >
              <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  Our Story
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  PRANVEDA is rooted in the ancient wisdom of Ayurveda, bringing you
                  the finest natural remedies and wellness products. Our name combines
                  "Prana" (life force) and "Veda" (knowledge), representing our
                  commitment to sharing the knowledge of natural healing.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We carefully source and prepare each product using traditional methods
                  combined with modern quality standards, ensuring you receive the most
                  authentic and effective Ayurvedic solutions for your health and
                  well-being.
                </p>
              </CardContent>
            </Card>
            </div>

            <div 
              ref={contactRef.ref}
              className={`scroll-reveal ${contactRef.isVisible ? 'revealed' : ''}`}
            >
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6 text-primary">
                  Get In Touch
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a
                        href="tel:+919725417154"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        +91 97254 17154
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <MessageCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium mb-2">WhatsApp</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleWhatsAppClick}
                        className="w-full sm:w-auto"
                      >
                        Chat with us on WhatsApp
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a
                        href="mailto:contact@pranveda.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        contact@pranveda.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">
                        Serving customers across India
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </div>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  Our Commitment
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>100% natural and authentic Ayurvedic products</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Sourced from trusted suppliers and traditional methods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Quality tested and certified for your safety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Expert guidance and customer support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
