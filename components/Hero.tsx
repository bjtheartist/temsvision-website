import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap) return;

    // Entrance Animation - Staggered reveal
    const tl = gsap.timeline({ delay: 0.3 });
    
    tl.fromTo('.hero-badge',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: 'expo.out' }
    )
    .fromTo('.hero-title-line',
      { opacity: 0, y: 80, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, duration: 1.2, ease: 'expo.out', stagger: 0.1 },
      '-=0.5'
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'expo.out' },
      '-=0.6'
    )
    .fromTo('.hero-cta',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' },
      '-=0.4'
    )
    .fromTo('.scroll-indicator',
      { opacity: 0 },
      { opacity: 0.4, duration: 1, ease: 'power2.out' },
      '-=0.2'
    );

    // Scroll-triggered parallax
    if (ScrollTrigger) {
      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -100,
        opacity: 0.3,
      });

      // Parallax background
      gsap.to(bgImageRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        y: 150,
        scale: 1.1,
      });
    }

    // Magnetic effect on hover
    const headline = textRef.current;
    if (headline) {
      const onMove = (e: MouseEvent) => {
        const rect = headline.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(headline, {
          x: x * 0.05,
          y: y * 0.05,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const onLeave = () => {
        gsap.to(headline, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      };

      headline.addEventListener('mousemove', onMove);
      headline.addEventListener('mouseleave', onLeave);

      return () => {
        headline.removeEventListener('mousemove', onMove);
        headline.removeEventListener('mouseleave', onLeave);
      };
    }
  }, []);

  const scrollToWork = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} className={`relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden ${
      theme === 'dark' ? 'bg-black' : 'bg-white'
    }`}>
      {/* Background Image Container */}
      <div ref={bgImageRef} className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80"
          alt="Abstract Background"
          loading="eager"
          className={`w-full h-full object-cover transition-all duration-1000 ${
            theme === 'dark' ? 'brightness-[0.3] contrast-[1.1]' : 'brightness-[0.9] contrast-[1.05]'
          }`}
        />
        <div className={`absolute inset-0 ${
          theme === 'dark' 
            ? 'bg-gradient-to-b from-black/60 via-black/40 to-black' 
            : 'bg-gradient-to-b from-white/70 via-white/50 to-white'
        }`}></div>
      </div>

      {/* Decorative Elements */}
      <div className={`absolute top-1/4 left-[10%] w-64 h-64 rounded-full blur-[120px] pointer-events-none ${
        theme === 'dark' ? 'bg-white/5' : 'bg-black/5'
      }`} />
      <div className={`absolute bottom-1/4 right-[10%] w-96 h-96 rounded-full blur-[150px] pointer-events-none ${
        theme === 'dark' ? 'bg-white/5' : 'bg-black/5'
      }`} />

      <div ref={textRef} className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Badge */}
        <div className="mb-8 md:mb-12 flex justify-center">
          <span className={`hero-badge px-6 py-2.5 border rounded-full text-[10px] font-bold tracking-[0.4em] uppercase backdrop-blur-sm transition-all duration-500 ${
            theme === 'dark' 
              ? 'border-white/20 bg-white/5 text-white/80 hover:bg-white/10' 
              : 'border-black/20 bg-black/5 text-black/80 hover:bg-black/10'
          }`}>
            Product Designer & Creative
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="mb-6 md:mb-8 overflow-hidden">
          <span 
            className={`hero-title-line block text-[14vw] md:text-[11vw] lg:text-[9vw] font-black leading-[0.85] tracking-tighter uppercase ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Billy
          </span>
          <span 
            className={`hero-title-line block text-[14vw] md:text-[11vw] lg:text-[9vw] font-black leading-[0.85] tracking-tighter uppercase ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Ndizeye
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className={`text-base md:text-lg lg:text-xl max-w-xl mx-auto mb-10 md:mb-12 font-medium leading-relaxed ${
            theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
          }`}
        >
          Crafting digital experiences through thoughtful product design, 
          where every pixel serves a purpose and every interaction tells a story.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={scrollToWork}
            className={`group flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm tracking-wide uppercase transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-white text-black hover:bg-zinc-200'
                : 'bg-black text-white hover:bg-zinc-800'
            }`}
          >
            View My Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className={`group flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm tracking-wide uppercase border-2 transition-all duration-300 ${
              theme === 'dark'
                ? 'border-white/30 text-white hover:bg-white/10'
                : 'border-black/30 text-black hover:bg-black/10'
            }`}
          >
            Get In Touch
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none ${
        theme === 'dark' ? 'text-white' : 'text-black'
      }`}>
        <p className="text-[10px] font-bold tracking-[0.5em] uppercase">Scroll</p>
        <div className={`w-px h-16 relative overflow-hidden ${
          theme === 'dark' ? 'bg-white/20' : 'bg-black/20'
        }`}>
          <div className={`absolute top-0 left-0 w-full h-8 animate-scroll-line ${
            theme === 'dark' ? 'bg-white' : 'bg-black'
          }`}></div>
        </div>
      </div>

      {/* Side Text */}
      <div className={`hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center ${
        theme === 'dark' ? 'text-white/30' : 'text-black/30'
      }`}>
        <span className="text-[10px] font-bold tracking-[0.5em] uppercase">Chicago, IL — 2025</span>
      </div>

      <style>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
        .animate-scroll-line {
          animation: scroll-line 2s cubic-bezier(0.7, 0, 0.3, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
