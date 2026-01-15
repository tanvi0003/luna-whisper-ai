import { Lock, Eye, Server, FileCheck } from "lucide-react";

const safetyFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All your conversations are protected with industry-standard encryption."
  },
  {
    icon: Eye,
    title: "No Human Review",
    description: "Your private conversations are never read by human employees."
  },
  {
    icon: Server,
    title: "Secure Servers",
    description: "Your data is stored on secure, SOC 2 compliant servers."
  },
  {
    icon: FileCheck,
    title: "GDPR Compliant",
    description: "Full compliance with international privacy regulations."
  }
];

const Safety = () => {
  return (
    <section id="safety" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              <span className="text-foreground">Your Privacy is </span>
              <span className="luna-gradient-text">Sacred</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              At Luna, we understand that trust is the foundation of any relationship. That's why we've built the most secure AI companion platform, ensuring your conversations remain completely private.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You have full control over your data. Delete your conversations, export your data, or close your account at any time. Your trust means everything to us.
            </p>
          </div>

          {/* Safety Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {safetyFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl luna-glass-elevated hover:luna-glass transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold font-display text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Safety;
