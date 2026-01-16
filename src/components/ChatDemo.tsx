import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Send, RotateCcw } from "lucide-react";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

interface Message {
  id: number;
  content: string;
  sender: "luna" | "user";
  typing?: boolean;
}

const conversationFlow: Omit<Message, "id">[] = [
  { sender: "luna", content: "Hey there! ✨ I'm Luna, your AI companion. How are you feeling today?" },
  { sender: "user", content: "Hi Luna! I've been feeling a bit stressed lately with work." },
  { sender: "luna", content: "I hear you. Work stress can really weigh on us. 💜 Would you like to talk about what's been on your mind, or would you prefer some relaxation techniques?" },
  { sender: "user", content: "Maybe some tips to help me relax?" },
  { sender: "luna", content: "Of course! Here's a quick breathing exercise: Breathe in for 4 counts, hold for 4, and exhale for 6. Try it with me now... 🌙" },
  { sender: "user", content: "That actually helped! Thanks Luna 💜" },
  { sender: "luna", content: "I'm so glad! Remember, I'm always here whenever you need to talk or just want some company. You're doing great! ✨" },
];

const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-2">
    <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
    <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
    <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
  </div>
);

const MessageBubble = ({ message, index }: { message: Message; index: number }) => {
  const isLuna = message.sender === "luna";
  
  return (
    <div
      className={`flex items-end gap-3 luna-animate-slide-up ${isLuna ? "" : "flex-row-reverse"}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Avatar */}
      {isLuna && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full luna-gradient-bg flex items-center justify-center shadow-lg shadow-primary/20">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
      )}
      
      {/* Message */}
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          isLuna
            ? "bg-card/80 border border-border/50 rounded-bl-md"
            : "luna-gradient-bg text-white rounded-br-md"
        }`}
      >
        {message.typing ? (
          <TypingIndicator />
        ) : (
          <p className={`text-sm leading-relaxed ${isLuna ? "text-foreground" : "text-white"}`}>
            {message.content}
          </p>
        )}
      </div>
      
      {/* User Avatar */}
      {!isLuna && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <Heart className="w-5 h-5 text-muted-foreground" />
        </div>
      )}
    </div>
  );
};

const ChatDemo = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (currentIndex >= conversationFlow.length) {
      setIsComplete(true);
      return;
    }

    const nextMessage = conversationFlow[currentIndex];
    
    // Show typing indicator for Luna messages
    if (nextMessage.sender === "luna") {
      setIsTyping(true);
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { ...nextMessage, id: currentIndex }]);
        setCurrentIndex(prev => prev + 1);
      }, 1500 + Math.random() * 1000);
      
      return () => clearTimeout(typingTimer);
    } else {
      // User messages appear after a delay
      const messageTimer = setTimeout(() => {
        setMessages(prev => [...prev, { ...nextMessage, id: currentIndex }]);
        setCurrentIndex(prev => prev + 1);
      }, 2000);
      
      return () => clearTimeout(messageTimer);
    }
  }, [currentIndex]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const resetConversation = () => {
    setMessages([]);
    setCurrentIndex(0);
    setIsTyping(false);
    setIsComplete(false);
  };

  return (
    <section className="py-24 relative overflow-hidden" id="demo">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <ScrollAnimationWrapper animation="blur" className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full luna-glass mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Live Demo</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            <span className="text-foreground">Experience </span>
            <span className="luna-gradient-text">Luna</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how Luna creates meaningful conversations that feel natural and supportive
          </p>
        </ScrollAnimationWrapper>

        {/* Chat Demo Container */}
        <div className="max-w-2xl mx-auto">
          <div className="luna-glass rounded-3xl overflow-hidden border border-border/30 shadow-2xl shadow-primary/5">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-border/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full luna-gradient-bg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Luna</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-muted-foreground">Always here for you</span>
                  </div>
                </div>
              </div>
              
              {isComplete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetConversation}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Replay
                </Button>
              )}
            </div>

            {/* Messages Container */}
            <div
              ref={chatContainerRef}
              className="h-[400px] overflow-y-auto p-6 space-y-4 scroll-smooth"
            >
              {messages.map((message, index) => (
                <MessageBubble key={message.id} message={message} index={index} />
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-end gap-3 luna-animate-fade-in">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full luna-gradient-bg flex items-center justify-center shadow-lg shadow-primary/20">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-card/80 border border-border/50 px-4 py-3 rounded-2xl rounded-bl-md">
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="px-6 py-4 border-t border-border/30">
              <div className="flex items-center gap-3">
                <div className="flex-1 px-4 py-3 rounded-full bg-muted/50 border border-border/30 text-muted-foreground text-sm">
                  Type a message...
                </div>
                <button className="w-10 h-10 rounded-full luna-gradient-bg flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* CTA Below Demo */}
          <div className="mt-8 text-center luna-animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <p className="text-muted-foreground mb-4">
              Ready to start your own conversation?
            </p>
            <Button variant="luna" size="lg">
              <Sparkles className="w-4 h-4 mr-2" />
              Try Luna Free
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;
