import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap) return;

    // Entrance Animation - Elegant staggered reveal
    const tl = gsap.timeline({ delay: 0.2 });
    
    tl.fromTo('.hero-line',
      { scaleX: 0 },
      { scaleX: 1, duration: 1, ease: 'power3.inOut' }
    )
    .fromTo('.hero-title-line',
      { y: '100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1.2, ease: 'power3.out', stagger: 0.15 },
      '-=0.6'
    )
    .fromTo('.hero-tagline',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo('.hero-vision',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo('.hero-cta',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1 },
      '-=0.3'
    )
    .fromTo('.hero-meta',
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.2'
    );

    // Scroll-triggered parallax
    if (ScrollTrigger) {
      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        y: -80,
        opacity: 0,
      });
    }
  }, []);

  const scrollToWork = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden"
    >
      {/* Chicago Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/chicago-skyline.jpg)' }}
      />
      
      {/* Dark overlay for readability */}
      <div className={`absolute inset-0 ${
        theme === 'dark' 
          ? 'bg-black/80' 
          : 'bg-white/85'
      }`} />

      {/* Subtle gradient overlay */}
      <div className={`absolute inset-0 ${
        theme === 'dark' 
          ? 'bg-gradient-to-t from-black via-transparent to-black/50' 
          : 'bg-gradient-to-t from-white via-transparent to-white/50'
      }`} />

      {/* Content */}
      <div ref={textRef} className="relative z-10 px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto w-full">
        {/* Decorative line */}
        <div className={`hero-line h-px w-24 mb-12 origin-left ${
          theme === 'dark' ? 'bg-white/30' : 'bg-black/30'
        }`} />

        {/* Main Headline - Just the name, no label */}
        <div className="mb-8 md:mb-10">
          <div className="overflow-hidden mb-2">
            <h1 
              className={`hero-title-line text-[12vw] md:text-[9vw] lg:text-[7vw] font-black leading-[0.9] tracking-[-0.03em] ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Billy
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 
              className={`hero-title-line text-[12vw] md:text-[9vw] lg:text-[7vw] font-black leading-[0.9] tracking-[-0.03em] ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Ndizeye
            </h1>
          </div>
        </div>

        {/* Tagline */}
        <p 
          className={`hero-tagline text-lg md:text-xl lg:text-2xl max-w-2xl mb-6 leading-relaxed font-medium ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}
        >
          I build things at the intersection of design, technology, and community.
        </p>

        {/* Vision Statement */}
        <p 
          className={`hero-vision text-sm md:text-base max-w-lg mb-12 leading-relaxed ${
            theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
          }`}
        >
          Driven by curiosity and data, I believe the best solutions emerge when we bridge disciplines 
          and center the people we're building for.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <button
            onClick={scrollToWork}
            className={`hero-cta group inline-flex items-center gap-3 text-sm font-medium tracking-wide transition-all duration-300 ${
              theme === 'dark'
                ? 'text-white hover:text-zinc-300'
                : 'text-black hover:text-zinc-600'
            }`}
          >
            <span className={`w-12 h-px transition-all duration-300 group-hover:w-16 ${
              theme === 'dark' ? 'bg-white' : 'bg-black'
            }`} />
            View Work
          </button>
          <button
            onClick={scrollToContact}
            className={`hero-cta group inline-flex items-center gap-3 text-sm font-medium tracking-wide transition-all duration-300 ${
              theme === 'dark'
                ? 'text-zinc-400 hover:text-white'
                : 'text-zinc-500 hover:text-black'
            }`}
          >
            <span className={`w-8 h-px transition-all duration-300 group-hover:w-12 ${
              theme === 'dark' ? 'bg-zinc-400 group-hover:bg-white' : 'bg-zinc-500 group-hover:bg-black'
            }`} />
            Get in Touch
          </button>
        </div>
      </div>

      {/* Bottom meta info */}
      <div className={`hero-meta absolute bottom-8 left-6 md:left-12 lg:left-24 right-6 md:right-12 lg:right-24 flex justify-between items-end ${
        theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
      }`}>
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase">
          Chicago, IL
        </span>
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase">
          Building &amp; Learning
        </span>
      </div>
    </section>
  );
};

export default Hero;
