import { useEffect, useRef, useState, RefObject } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = <T extends HTMLElement>(
  options: UseScrollAnimationOptions = {}
): [RefObject<T>, boolean] => {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
};

// Hook for staggered children animations
interface UseStaggerAnimationOptions extends UseScrollAnimationOptions {
  staggerDelay?: number;
  baseDelay?: number;
}

export const useStaggerAnimation = <T extends HTMLElement>(
  itemCount: number,
  options: UseStaggerAnimationOptions = {}
): [RefObject<T>, boolean, (index: number) => string] => {
  const { staggerDelay = 0.1, baseDelay = 0, ...scrollOptions } = options;
  const [ref, isVisible] = useScrollAnimation<T>(scrollOptions);

  const getStaggerDelay = (index: number): string => {
    return `${baseDelay + index * staggerDelay}s`;
  };

  return [ref, isVisible, getStaggerDelay];
};
