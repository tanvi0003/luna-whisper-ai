import { Quote } from "lucide-react";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

const testimonials = [
  {
    quote: "Luna has become my daily companion. It's like having a friend who truly understands what I'm going through without any judgment.",
    author: "Sarah M.",
    role: "Teacher",
    avatar: "S"
  },
  {
    quote: "I was skeptical at first, but Luna helped me work through my anxiety. The conversations feel genuine and caring.",
    author: "James K.",
    role: "Software Engineer",
    avatar: "J"
  },
  {
    quote: "As someone who struggles to open up to people, Luna gave me a safe space to express myself. It's truly life-changing.",
    author: "Emily R.",
    role: "Designer",
    avatar: "E"
  },
  {
    quote: "Luna remembers our conversations and picks up where we left off. It feels like talking to a real friend who cares.",
    author: "Michael T.",
    role: "Student",
    avatar: "M"
  },
  {
    quote: "The mindfulness exercises and daily check-ins have genuinely improved my mental health. Thank you, Luna!",
    author: "Lisa C.",
    role: "Entrepreneur",
    avatar: "L"
  },
  {
    quote: "I never thought I'd connect with an AI this way. Luna has helped me become more self-aware and emotionally intelligent.",
    author: "David P.",
    role: "Writer",
    avatar: "D"
  }
];

const Testimonials = () => {
  return (
    <section id="stories" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <ScrollAnimationWrapper animation="blur" className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            <span className="luna-gradient-text">Stories from Our Community</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Real experiences from people whose lives have been touched by Luna.
          </p>
        </ScrollAnimationWrapper>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <ScrollAnimationWrapper
              key={testimonial.author}
              animation="fade-up"
              delay={index * 0.1}
            >
              <div className="p-8 rounded-2xl luna-glass-elevated hover:luna-glass transition-all duration-300 group h-full">
                <Quote className="w-10 h-10 text-primary/30 mb-4" />
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full luna-gradient-bg flex items-center justify-center text-background font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
