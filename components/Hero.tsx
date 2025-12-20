import React, { useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap) return;

    // Create floating particles
    const particlesContainer = particlesRef.current;
    if (particlesContainer) {
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = `${Math.random() * 3 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.opacity = `${Math.random() * 0.4 + 0.1}`;
        particlesContainer.appendChild(particle);

        // Animate each particle floating up
        gsap.to(particle, {
          y: `${Math.random() * -200 - 100}`,
          x: `${Math.random() * 100 - 50}`,
          opacity: 0,
          duration: Math.random() * 4 + 3,
          repeat: -1,
          ease: "none",
          delay: Math.random() * 2,
        });
      }
    }

    // Entrance Animation
    gsap.fromTo(textRef.current,
      { opacity: 0, scale: 1.1, y: 100, filter: 'blur(10px)' },
      { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 2, ease: 'expo.out', delay: 0.2 }
    );

    // Animate the badge
    gsap.fromTo('.hero-badge',
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'expo.out', delay: 0.5 }
    );

    // Scroll-triggered Scrub Animation
    gsap.to(textRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      y: -80,
      scale: 0.95,
      opacity: 0.4,
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

    // Magnetic effect on hover
    const headline = textRef.current;
    if (headline) {
      const onMove = (e: MouseEvent) => {
        const rect = headline.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(headline, {
          x: x * 0.1,
          y: y * 0.1,
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
        if (particlesContainer) {
          particlesContainer.innerHTML = '';
        }
      };
    }
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black">
      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 z-[5] pointer-events-none overflow-hidden" />

      {/* Background Image Container */}
      <div ref={bgImageRef} className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=2000"
          alt="Urban Background"
          className="w-full h-full object-cover grayscale brightness-[0.4] contrast-[1.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
      </div>

      <div className="relative z-10 text-center px-6 pointer-events-none">
        <div className="mb-14 flex justify-center pointer-events-auto">
           <span className="hero-badge px-8 py-3 border border-white/20 rounded-full text-[10px] font-black tracking-[0.6em] uppercase backdrop-blur-xl bg-white/5 cursor-default hover:bg-white/10 transition-all duration-500">
             EST. 2018 | VISIONARY STUDIO
           </span>
        </div>

        <h1
          ref={textRef}
          className="text-[15vw] md:text-[14vw] font-black leading-[0.65] tracking-tighter uppercase select-none flex flex-col cursor-pointer pointer-events-auto transition-colors duration-500"
        >
          <span className="text-white">BJTHE</span>
          <span className="outline-text">ARTIST</span>
        </h1>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-40 pointer-events-none">
        <p className="text-[10px] font-black tracking-[1em] uppercase ml-[1em]">Scroll</p>
        <div className="w-px h-20 bg-gradient-to-b from-white to-transparent relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-line"></div>
        </div>
      </div>

      {/* Ambient glow orbs - subtle white */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

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
