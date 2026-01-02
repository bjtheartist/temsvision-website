import React, { useEffect, useRef } from 'react';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  type?: 'chars' | 'words' | 'lines';
  animation?: 'fade-up' | 'fade-blur' | 'slide-up' | 'rotate-in';
}

const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  delay = 0,
  stagger = 0.03,
  type = 'chars',
  animation = 'fade-up',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger || !containerRef.current) return;

    const container = containerRef.current;
    const elements = container.querySelectorAll('.reveal-item');

    // Set initial state based on animation type
    const getInitialState = () => {
      switch (animation) {
        case 'fade-up':
          return { opacity: 0, y: 40, rotateX: 10 };
        case 'fade-blur':
          return { opacity: 0, filter: 'blur(10px)', y: 20 };
        case 'slide-up':
          return { opacity: 0, y: '100%' };
        case 'rotate-in':
          return { opacity: 0, rotateY: 90, transformOrigin: 'left center' };
        default:
          return { opacity: 0, y: 40 };
      }
    };

    const getFinalState = () => {
      switch (animation) {
        case 'fade-up':
          return { opacity: 1, y: 0, rotateX: 0 };
        case 'fade-blur':
          return { opacity: 1, filter: 'blur(0px)', y: 0 };
        case 'slide-up':
          return { opacity: 1, y: '0%' };
        case 'rotate-in':
          return { opacity: 1, rotateY: 0 };
        default:
          return { opacity: 1, y: 0 };
      }
    };

    gsap.set(elements, getInitialState());

    gsap.to(elements, {
      ...getFinalState(),
      duration: 0.8,
      stagger: stagger,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        once: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger: any) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [delay, stagger, animation]);

  const splitText = () => {
    if (type === 'chars') {
      return children.split('').map((char, index) => (
        <span
          key={index}
          className="reveal-item inline-block"
          style={{ 
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    } else if (type === 'words') {
      return children.split(' ').map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em]">
          <span className="reveal-item inline-block">
            {word}
          </span>
        </span>
      ));
    } else {
      // lines - treat entire text as one line
      return (
        <span className="reveal-item inline-block">
          {children}
        </span>
      );
    }
  };

  return (
    <div ref={containerRef} className={className} style={{ perspective: '1000px' }}>
      {splitText()}
    </div>
  );
};

export default TextReveal;
