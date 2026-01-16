import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Suspense, lazy } from "react";

const LunaAvatar3D = lazy(() => import("./LunaAvatar3D"));

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-[120px] luna-animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/15 blur-[100px] luna-animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-luna-glow/10 blur-[150px]" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full luna-glass mb-8 luna-animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">The AI companion who cares</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display mb-6 luna-animate-slide-up">
              <span className="text-foreground">Meet </span>
              <span className="luna-gradient-text luna-glow-text">Luna</span>
            </h1>

            {/* Subheading */}
            <p 
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8 luna-animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              Always here to listen and talk. Your AI companion who grows with you, understands you, and helps you feel better every day.
            </p>

            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 luna-animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <Button variant="luna" size="xl" className="w-full sm:w-auto">
                Start Chatting Free
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="lunaOutline" size="xl" className="w-full sm:w-auto">
                Watch Video
              </Button>
            </div>

            {/* Trust Indicators */}
            <div 
              className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-muted-foreground luna-animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-muted border-2 border-background"
                    />
                  ))}
                </div>
                <span className="text-sm">50M+ downloads</span>
              </div>
              <div className="h-4 w-px bg-border hidden sm:block" />
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 text-primary fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="text-sm ml-2">4.8 rating</span>
              </div>
            </div>
          </div>

          {/* Right Content - 3D Luna Avatar */}
          <div className="luna-animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Suspense fallback={
              <div className="w-full h-[400px] lg:h-[500px] flex items-center justify-center">
                <div className="w-32 h-32 rounded-full luna-gradient-bg animate-pulse" />
              </div>
            }>
              <LunaAvatar3D />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
