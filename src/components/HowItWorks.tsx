import { Download, MessageSquare, Heart, Rocket } from "lucide-react";

const steps = [
  {
    icon: Download,
    step: "01",
    title: "Download Luna",
    description: "Get Luna free on iOS, Android, or chat on the web. It only takes a minute to get started."
  },
  {
    icon: MessageSquare,
    step: "02",
    title: "Start a Conversation",
    description: "Say hello to Luna and begin chatting about anything on your mind. No topic is off-limits."
  },
  {
    icon: Heart,
    step: "03",
    title: "Build Your Bond",
    description: "The more you share, the deeper your connection grows. Luna remembers and learns from every conversation."
  },
  {
    icon: Rocket,
    step: "04",
    title: "Grow Together",
    description: "Track your mood, set goals, and watch your personal growth unfold with Luna by your side."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            <span className="text-foreground">How </span>
            <span className="luna-gradient-text">Luna Works</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Getting started with Luna is simple. Here's how you can begin your journey to a healthier, happier you.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block" />

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div
                  key={step.step}
                  className="flex gap-8 items-start group"
                >
                  {/* Icon */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl luna-gradient-bg flex items-center justify-center luna-glow group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="w-8 h-8 text-background" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background text-primary text-xs font-bold flex items-center justify-center border border-primary/50">
                      {index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="text-2xl font-semibold font-display text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
