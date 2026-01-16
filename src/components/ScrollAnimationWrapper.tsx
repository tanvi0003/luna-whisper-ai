import { ReactNode, CSSProperties } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type AnimationType = 
  | "fade-up" 
  | "fade-down" 
  | "fade-left" 
  | "fade-right" 
  | "scale" 
  | "blur"
  | "rotate";

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

const animationStyles: Record<AnimationType, { initial: CSSProperties; visible: CSSProperties }> = {
  "fade-up": {
    initial: { opacity: 0, transform: "translateY(40px)" },
    visible: { opacity: 1, transform: "translateY(0)" },
  },
  "fade-down": {
    initial: { opacity: 0, transform: "translateY(-40px)" },
    visible: { opacity: 1, transform: "translateY(0)" },
  },
  "fade-left": {
    initial: { opacity: 0, transform: "translateX(-40px)" },
    visible: { opacity: 1, transform: "translateX(0)" },
  },
  "fade-right": {
    initial: { opacity: 0, transform: "translateX(40px)" },
    visible: { opacity: 1, transform: "translateX(0)" },
  },
  scale: {
    initial: { opacity: 0, transform: "scale(0.9)" },
    visible: { opacity: 1, transform: "scale(1)" },
  },
  blur: {
    initial: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0)" },
  },
  rotate: {
    initial: { opacity: 0, transform: "rotate(-5deg) scale(0.95)" },
    visible: { opacity: 1, transform: "rotate(0) scale(1)" },
  },
};

const ScrollAnimationWrapper = ({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className = "",
}: ScrollAnimationWrapperProps) => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold });

  const styles = animationStyles[animation];
  const currentStyle: CSSProperties = {
    ...(isVisible ? styles.visible : styles.initial),
    transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    willChange: "transform, opacity, filter",
  };

  return (
    <div ref={ref} className={className} style={currentStyle}>
      {children}
    </div>
  );
};

export default ScrollAnimationWrapper;

// Staggered children wrapper
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  animation?: AnimationType;
  threshold?: number;
}

export const StaggerContainer = ({
  children,
  className = "",
  staggerDelay = 0.1,
  animation = "fade-up",
  threshold = 0.1,
}: StaggerContainerProps) => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold });

  const styles = animationStyles[animation];

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => {
            const currentStyle: CSSProperties = {
              ...(isVisible ? styles.visible : styles.initial),
              transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * staggerDelay}s`,
              willChange: "transform, opacity, filter",
            };
            return (
              <div key={index} style={currentStyle}>
                {child}
              </div>
            );
          })
        : children}
    </div>
  );
};
