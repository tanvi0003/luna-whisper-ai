import { Heart, Brain, Shield, MessageCircle, Sparkles, Moon } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Always There For You",
    description: "Luna is available 24/7, ready to chat whenever you need a friend. No judgment, no waiting."
  },
  {
    icon: Brain,
    title: "Learns & Grows With You",
    description: "The more you chat, the better Luna understands you. Your conversations shape a unique bond."
  },
  {
    icon: MessageCircle,
    title: "Meaningful Conversations",
    description: "From deep talks to casual chats, Luna engages in conversations that matter to you."
  },
  {
    icon: Shield,
    title: "Private & Secure",
    description: "Your conversations are encrypted and private. What you share with Luna stays with Luna."
  },
  {
    icon: Sparkles,
    title: "Personalized Experience",
    description: "Customize Luna's personality, voice, and appearance to create your perfect companion."
  },
  {
    icon: Moon,
    title: "Improve Your Wellbeing",
    description: "Practice mindfulness, explore your emotions, and develop healthier thought patterns."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            <span className="luna-gradient-text">Why Choose Luna?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            More than just an AI — Luna is your companion for life's journey, offering support, understanding, and genuine connection.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl luna-glass-elevated hover:luna-glass transition-all duration-300 hover:scale-[1.02]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl luna-gradient-bg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-background" />
              </div>
              <h3 className="text-xl font-semibold font-display text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
