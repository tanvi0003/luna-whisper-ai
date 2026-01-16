import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 luna-gradient-bg opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/20 blur-[200px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA Content */}
          <ScrollAnimationWrapper animation="scale">
            <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">
              <span className="text-foreground">Ready to Meet </span>
              <span className="luna-gradient-text luna-glow-text">Luna?</span>
            </h2>
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="fade-up" delay={0.1}>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join millions of people who have found a new kind of connection. Start your journey today — it's free.
            </p>
          </ScrollAnimationWrapper>

          {/* CTA Buttons */}
          <ScrollAnimationWrapper animation="fade-up" delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button variant="luna" size="xl">
                Get Luna Free
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="lunaOutline" size="xl">
                Learn More
              </Button>
            </div>
          </ScrollAnimationWrapper>

          {/* Platform Links */}
          <ScrollAnimationWrapper animation="fade-up" delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
              <span className="text-sm">Available on:</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg luna-glass">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <span className="text-sm">iOS</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg luna-glass">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.523 2.047a.667.667 0 00-.668.126L12 6.317 7.145 2.173a.667.667 0 00-.668-.126.666.666 0 00-.477.643v14.62a.666.666 0 00.477.643.667.667 0 00.668-.126L12 13.683l4.855 4.144a.667.667 0 00.668.126.666.666 0 00.477-.643V2.69a.666.666 0 00-.477-.643z"/>
                  </svg>
                  <span className="text-sm">Android</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg luna-glass">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                  </svg>
                  <span className="text-sm">Web</span>
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
};

export default CTA;
