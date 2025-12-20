
import React, { useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    if (!gsap) return;

    // Entrance Animation - ensuring it finishes with clear visibility
    gsap.fromTo(textRef.current, 
      { opacity: 0, scale: 1.1, y: 100, filter: 'blur(10px)' }, 
      { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 2, ease: 'expo.out', delay: 0.2 }
    );

    // Scroll-triggered Scrub Animation - refined to be less aggressive so it doesn't "disappear"
    gsap.to(textRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Added smoothing
      },
      y: -80,
      scale: 0.95,
      opacity: 0.4, // Increased from 0.2 to 0.4 for better visibility
      filter: 'blur(4px)',
    });

    // Parallax background
    gsap.to(bgImageRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: 100,
      scale: 1.05,
    });

    // Hover Animation Logic
    const headline = textRef.current;
    if (headline) {
      const onEnter = () => {
        gsap.to(headline, {
          scale: 1.03,
          letterSpacing: '0.02em',
          duration: 0.6,
          ease: "power3.out",
          color: "#f97316" // brand orange
        });
      };

      const onLeave = () => {
        gsap.to(headline, {
          scale: 1,
          letterSpacing: '0em',
          duration: 0.6,
          ease: "power3.out",
          color: "#ffffff"
        });
      };

      headline.addEventListener('mouseenter', onEnter);
      headline.addEventListener('mouseleave', onLeave);
      
      return () => {
        headline.removeEventListener('mouseenter', onEnter);
        headline.removeEventListener('mouseleave', onLeave);
      };
    }
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black">
      {/* Background Image Container */}
      <div ref={bgImageRef} className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=2000" 
          alt="Urban Background" 
          className="w-full h-full object-cover grayscale brightness-[0.5] contrast-[1.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
      </div>

      <div className="relative z-10 text-center px-6 pointer-events-none">
        <div className="mb-14 flex justify-center pointer-events-auto">
           <span className="px-8 py-3 border border-white/10 rounded-full text-[10px] font-black tracking-[0.6em] uppercase backdrop-blur-xl bg-white/5 animate-pulse cursor-default hover:bg-white/10 transition-colors">
             EST. 2018 | VISIONARY STUDIO
           </span>
        </div>
        
        <h1 
          ref={textRef}
          className="text-[15vw] md:text-[14vw] font-black leading-[0.65] tracking-tighter uppercase select-none flex flex-col text-white cursor-pointer pointer-events-auto transition-colors duration-500"
        >
          <span>BJTHE</span>
          <span className="text-transparent border-white" style={{ WebkitTextStroke: '2px white' }}>ARTIST</span>
        </h1>
      </div>
      
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-30 pointer-events-none">
        <p className="text-[10px] font-black tracking-[1em] uppercase ml-[1em]">Scroll</p>
        <div className="w-px h-20 bg-gradient-to-b from-white to-transparent relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-line"></div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-scroll-line {
          animation: scroll-line 3s cubic-bezier(0.7, 0, 0.3, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
