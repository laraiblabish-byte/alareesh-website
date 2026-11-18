import { useEffect, useRef, useState } from 'react';

export default function Reveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  className = '',
  threshold = 0.12,
  triggerOnce = true
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(() => {
    return typeof window === 'undefined' || !('IntersectionObserver' in window);
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(currentRef);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, triggerOnce]);

  const getInitialTransform = () => {
    switch (animation) {
      case 'fade-up':
        return 'translate-y-8 opacity-0';
      case 'fade-down':
        return '-translate-y-8 opacity-0';
      case 'fade-left':
        return 'translate-x-8 opacity-0';
      case 'fade-right':
        return '-translate-x-8 opacity-0';
      case 'zoom-in':
        return 'scale-95 opacity-0';
      case 'fade':
      default:
        return 'opacity-0';
    }
  };

  const getVisibleTransform = () => {
    switch (animation) {
      case 'fade-up':
      case 'fade-down':
        return 'translate-y-0 opacity-100';
      case 'fade-left':
      case 'fade-right':
        return 'translate-x-0 opacity-100';
      case 'zoom-in':
        return 'scale-100 opacity-100';
      case 'fade':
      default:
        return 'opacity-100';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
      className={`transition-all ease-out transform will-change-transform ${
        isVisible ? getVisibleTransform() : getInitialTransform()
      } ${className}`}
    >
      {children}
    </div>
  );
}
