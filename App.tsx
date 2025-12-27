
import React, { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const [flippedApproach, setFlippedApproach] = useState<Set<string>>(new Set());

  const toggleApproachFlip = (id: string) => {
    setFlippedApproach(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger;
    // @ts-ignore
    const Lenis = window.Lenis;

    if (gsap && ScrollTrigger && Lenis) {
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        normalizeWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      lenis.on('scroll', ScrollTrigger.update);
      ScrollTrigger.normalizeScroll(true);

      const headings = document.querySelectorAll('h2');
      headings.forEach((heading) => {
        gsap.fromTo(heading,
          { y: 50, opacity: 0, filter: 'blur(10px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 90%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

      gsap.from(".bento-item", {
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 85%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".about-img", {
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 70%",
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "expo.out"
      });

      // Parallax Images
      const parallaxImages = document.querySelectorAll('.parallax-img');
      parallaxImages.forEach((img: any) => {
        const speed = img.getAttribute('data-speed') || 20;
        gsap.to(img, {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      // Roadmap Lines Parallax
      const roadmapLines = document.querySelectorAll('.roadmap-line');
      roadmapLines.forEach((line: any) => {
        const speed = line.getAttribute('data-speed') || 0.5;
        gsap.to(line, {
          yPercent: 20 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: line.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      // Scroll Progress Indicator - Circle moves along the line
      const progressCircle = document.querySelector('.scroll-progress-circle');
      const progressLine = document.querySelector('.scroll-progress-line');
      if (progressCircle && progressLine) {
        gsap.to(progressCircle, {
          y: 240, // Move down the length of the line (h-64 = 256px, minus circle size)
          ease: "none",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5
          }
        });
      }

      // Project cards animation
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: ".portfolio-grid",
          start: "top 80%",
        },
        y: 80,
        opacity: 0,
        stagger: 0.12,
        duration: 1.2,
        ease: "expo.out"
      });

      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1000);

      return () => {
        clearTimeout(timer);
        lenis.destroy();
        ScrollTrigger.getAll().forEach((t: any) => t.kill());
      };
    }
  }, []);

  return (
    <main className={`relative min-h-screen overflow-x-hidden transition-colors duration-500 ${
      theme === 'dark'
        ? 'bg-black text-white selection:bg-white selection:text-black'
        : 'bg-white text-black selection:bg-black selection:text-white'
    }`}>
      <Navbar />

      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>

      <div className="relative z-10">
        <Hero />

        {/* Floating Headshot - Top Left */}
        <div className="relative z-[15] h-0 pointer-events-none">
           <div className="absolute left-[8%] -top-28 md:-top-32 w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl parallax-img border-4 border-white/30" data-speed="-40">
              <img
                src="https://picsum.photos/seed/bjportrait/400/400"
                alt="BJ The Artist"
                className="w-full h-full object-cover"
              />
           </div>
        </div>

        {/* Marquee Ticker - Dark Section */}
        <section className="py-4 md:py-8 border-y border-white/10 overflow-hidden bg-black text-white relative z-10">
          <div className="marquee-content animate-marquee">
             <span className="text-4xl sm:text-6xl md:text-[10vw] font-black uppercase tracking-tighter opacity-30 px-4 md:px-8">DESIGN & PHOTOGRAPHY</span>
             <span className="text-4xl sm:text-6xl md:text-[10vw] font-black uppercase tracking-tighter opacity-30 px-4 md:px-8">DESIGN & PHOTOGRAPHY</span>
          </div>
        </section>

        {/* About Staggered Layout - Dark Section */}
        <section className="about-section py-16 md:py-24 px-6 md:px-12 bg-black border-b border-white/5 overflow-hidden relative z-10">
           {/* Roadmap Parallax Line */}
           <div className="absolute top-0 right-[10%] w-px h-[150%] bg-gradient-to-b from-white/20 via-white/5 to-transparent z-0 roadmap-line" data-speed="0.5"></div>

           <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-20 relative z-10">
             <div className="md:col-span-6 flex flex-col justify-center order-2 md:order-1">
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 md:mb-10 leading-[0.85] uppercase">
                  DESIGN.<br/>CAPTURE.<br/>CREATE.
                </h2>
                <p className="text-zinc-300 text-lg md:text-xl mb-10 md:mb-12 max-w-md font-medium leading-relaxed">
                  Blending product design and photography to craft compelling visual experiences. From intuitive interfaces to striking imagery.
                </p>
                <button className="flex items-center gap-4 font-black text-sm group w-fit">
                  <span className="tracking-[0.2em] uppercase">About us</span>
                  <span className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:scale-110 group-active:scale-95">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </span>
                </button>
             </div>
             <div className="md:col-span-6 relative min-h-[500px] md:h-[700px] order-1 md:order-2">
                <img
                  src="https://picsum.photos/seed/about1/600/800"
                  alt="Creative studio workspace"
                  loading="lazy"
                  className="about-img absolute top-0 left-0 w-1/2 aspect-[3/4] object-cover z-0 opacity-90 transition-all duration-700 parallax-img rounded-lg"
                  data-speed="-20"
                />
                <img
                  src="https://picsum.photos/seed/about2/600/800"
                  alt="Design process"
                  loading="lazy"
                  className="about-img absolute top-[15%] right-0 w-[55%] aspect-[3/4] object-cover z-10 shadow-2xl border border-white/5 opacity-95 transition-all duration-700 parallax-img rounded-lg"
                  data-speed="30"
                />
                <img
                  src="https://picsum.photos/seed/about3/600/800"
                  alt="Photography session"
                  loading="lazy"
                  className="about-img absolute bottom-0 left-[15%] w-[50%] aspect-[3/4] object-cover z-20 shadow-2xl border-4 border-black transition-all duration-700 parallax-img rounded-lg"
                  data-speed="10"
                />
             </div>
          </div>
        </section>

        {/* Floating Roadmap Element - Bridge 2 */}
        <div className="relative z-[15] h-0 pointer-events-none">
           <div className="absolute right-[5%] -top-20 w-48 h-48 bg-white border border-black/10 rounded-full flex items-center justify-center shadow-2xl parallax-img" data-speed="60">
              <span className="text-[8px] font-black tracking-[0.5em] uppercase text-black">Curation</span>
           </div>
        </div>

        <Portfolio />

        <Services />

        {/* Floating Roadmap Element - Bridge 3 - Scroll Progress Indicator */}
        <div className="scroll-progress-container relative z-[15] h-0 pointer-events-none">
           <div className="scroll-progress-line absolute left-[20%] -top-10 w-px h-64 bg-black"></div>
           <div className="scroll-progress-circle absolute left-[20%] -top-10 w-4 h-4 rounded-full bg-black -ml-[7px]"></div>
        </div>

        {/* Bento Grid Stats - Light Section */}
        <section className="py-20 md:py-32 px-6 md:px-12 bg-white text-black relative overflow-hidden z-10">
           {/* Roadmap Parallax Line */}
           <div className="absolute top-[-20%] left-[15%] w-px h-[140%] bg-gradient-to-b from-black/20 via-black/5 to-transparent z-0 roadmap-line" data-speed="0.8"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Section Header */}
            <div className="mb-12 md:mb-16">
              <div className="flex items-center gap-4 text-black mb-4">
                <span className="w-12 h-px bg-black"></span>
                <span className="text-[10px] font-black tracking-[0.4em] uppercase">Why Work With Me</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">The<br/>Approach</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 bento-grid">
               {/* Creative Vision - Flip Card */}
               <div
                 className="md:col-span-8 min-h-[300px] md:min-h-[400px] bento-item cursor-pointer"
                 onClick={() => toggleApproachFlip('creative')}
                 style={{ perspective: '1000px' }}
               >
                 <div
                   className="relative w-full h-full transition-transform duration-700 ease-out"
                   style={{
                     transformStyle: 'preserve-3d',
                     transform: flippedApproach.has('creative') ? 'rotateY(180deg)' : 'rotateY(0deg)'
                   }}
                 >
                   {/* Front */}
                   <div className="absolute inset-0 bg-zinc-100 border border-black/5 p-10 md:p-16 rounded-2xl shadow-sm" style={{ backfaceVisibility: 'hidden' }}>
                     <div className="flex justify-between items-start mb-12 md:mb-16">
                       <div className="opacity-30">
                         <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="7.5 4.21 12 6.81 16.5 4.21"/><polyline points="7.5 19.79 7.5 14.6 3 12"/><polyline points="21 12 16.5 14.6 16.5 19.79"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                       </div>
                       <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                       </div>
                     </div>
                     <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase">Creative Vision</h3>
                     <p className="text-zinc-700 text-base md:text-lg max-w-lg leading-relaxed">Every project starts with understanding your goals. I combine design thinking with visual storytelling to create work that resonates.</p>
                   </div>
                   {/* Back */}
                   <div className="absolute inset-0 bg-black text-white p-10 md:p-16 rounded-2xl shadow-2xl" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                     <div className="flex justify-between items-start mb-8">
                       <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/50">My Process</span>
                       <span className="text-[10px] font-black tracking-widest uppercase text-white/40">Tap to flip</span>
                     </div>
                     <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight uppercase">How I Work</h3>
                     <div className="space-y-4">
                       <div className="flex items-start gap-4">
                         <span className="text-2xl font-black text-white/30">01</span>
                         <div><p className="font-bold">Discovery</p><p className="text-white/60 text-sm">Deep dive into your brand, goals, and audience</p></div>
                       </div>
                       <div className="flex items-start gap-4">
                         <span className="text-2xl font-black text-white/30">02</span>
                         <div><p className="font-bold">Strategy</p><p className="text-white/60 text-sm">Craft a visual direction that aligns with your vision</p></div>
                       </div>
                       <div className="flex items-start gap-4">
                         <span className="text-2xl font-black text-white/30">03</span>
                         <div><p className="font-bold">Execute</p><p className="text-white/60 text-sm">Deliver polished work that exceeds expectations</p></div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>

               {/* 50+ Projects - Flip Card */}
               <div
                 className="md:col-span-4 min-h-[300px] md:min-h-[400px] bento-item cursor-pointer"
                 onClick={() => toggleApproachFlip('projects')}
                 style={{ perspective: '1000px' }}
               >
                 <div
                   className="relative w-full h-full transition-transform duration-700 ease-out"
                   style={{
                     transformStyle: 'preserve-3d',
                     transform: flippedApproach.has('projects') ? 'rotateY(180deg)' : 'rotateY(0deg)'
                   }}
                 >
                   {/* Front */}
                   <div className="absolute inset-0 bg-zinc-100 border border-black/5 p-10 md:p-16 rounded-2xl shadow-sm flex flex-col justify-between" style={{ backfaceVisibility: 'hidden' }}>
                     <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center self-end">
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                     </div>
                     <div>
                       <span className="text-7xl md:text-8xl font-black mb-4 tracking-tighter text-black block">50+</span>
                       <p className="text-zinc-500 uppercase text-xs font-black tracking-[0.3em]">Projects Completed</p>
                     </div>
                   </div>
                   {/* Back */}
                   <div className="absolute inset-0 bg-black text-white p-8 md:p-10 rounded-2xl shadow-2xl flex flex-col justify-between" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                     <div className="flex justify-between items-start">
                       <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/50">Breakdown</span>
                       <span className="text-[10px] font-black tracking-widest uppercase text-white/40">Tap</span>
                     </div>
                     <div className="space-y-3">
                       <div className="flex justify-between items-center border-b border-white/10 pb-2">
                         <span className="text-sm font-bold">Product Design</span>
                         <span className="text-2xl font-black">18</span>
                       </div>
                       <div className="flex justify-between items-center border-b border-white/10 pb-2">
                         <span className="text-sm font-bold">Photography</span>
                         <span className="text-2xl font-black">15</span>
                       </div>
                       <div className="flex justify-between items-center border-b border-white/10 pb-2">
                         <span className="text-sm font-bold">Brand Identity</span>
                         <span className="text-2xl font-black">12</span>
                       </div>
                       <div className="flex justify-between items-center">
                         <span className="text-sm font-bold">Web Design</span>
                         <span className="text-2xl font-black">8</span>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>

               {/* 7+ Years - Flip Card */}
               <div
                 className="md:col-span-4 min-h-[300px] md:min-h-[400px] bento-item cursor-pointer"
                 onClick={() => toggleApproachFlip('years')}
                 style={{ perspective: '1000px' }}
               >
                 <div
                   className="relative w-full h-full transition-transform duration-700 ease-out"
                   style={{
                     transformStyle: 'preserve-3d',
                     transform: flippedApproach.has('years') ? 'rotateY(180deg)' : 'rotateY(0deg)'
                   }}
                 >
                   {/* Front */}
                   <div className="absolute inset-0 bg-zinc-100 border border-black/5 p-10 md:p-16 rounded-2xl shadow-sm overflow-hidden group flex flex-col justify-between" style={{ backfaceVisibility: 'hidden' }}>
                     <img src="https://picsum.photos/seed/office/800/600" alt="Studio" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-all duration-1000 group-hover:opacity-60"/>
                     <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center self-end relative z-10">
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                     </div>
                     <div className="relative z-10">
                       <span className="text-6xl md:text-7xl font-black mb-4 tracking-tighter block">7+</span>
                       <p className="text-zinc-500 uppercase text-xs font-black tracking-[0.3em]">Years Experience</p>
                     </div>
                   </div>
                   {/* Back */}
                   <div className="absolute inset-0 bg-black text-white p-8 md:p-10 rounded-2xl shadow-2xl flex flex-col justify-between" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                     <div className="flex justify-between items-start">
                       <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/50">Journey</span>
                       <span className="text-[10px] font-black tracking-widest uppercase text-white/40">Tap</span>
                     </div>
                     <div className="space-y-3">
                       <div className="border-l-2 border-white/30 pl-4">
                         <p className="text-xs text-white/50">2018</p>
                         <p className="text-sm font-bold">Started freelancing</p>
                       </div>
                       <div className="border-l-2 border-white/30 pl-4">
                         <p className="text-xs text-white/50">2020</p>
                         <p className="text-sm font-bold">Founded BJ Studio</p>
                       </div>
                       <div className="border-l-2 border-white/30 pl-4">
                         <p className="text-xs text-white/50">2023</p>
                         <p className="text-sm font-bold">50+ projects milestone</p>
                       </div>
                       <div className="border-l-2 border-white pl-4">
                         <p className="text-xs text-white/50">Today</p>
                         <p className="text-sm font-bold">Still creating magic</p>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>

               {/* User-Centered Design - Flip Card */}
               <div
                 className="md:col-span-8 min-h-[300px] bento-item cursor-pointer"
                 onClick={() => toggleApproachFlip('usercentered')}
                 style={{ perspective: '1000px' }}
               >
                 <div
                   className="relative w-full h-full transition-transform duration-700 ease-out"
                   style={{
                     transformStyle: 'preserve-3d',
                     transform: flippedApproach.has('usercentered') ? 'rotateY(180deg)' : 'rotateY(0deg)'
                   }}
                 >
                   {/* Front */}
                   <div className="absolute inset-0 bg-black p-10 md:p-16 rounded-2xl shadow-2xl overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
                     <div className="hidden md:block w-64 h-64 bg-white/5 rounded-full blur-3xl absolute -right-20 -bottom-20"></div>
                     <div className="flex justify-between items-start mb-6">
                       <div></div>
                       <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                       </div>
                     </div>
                     <div className="relative z-10">
                       <h3 className="text-3xl md:text-4xl font-black mb-4 text-white uppercase tracking-tight">User-Centered Design</h3>
                       <p className="text-white/80 text-base md:text-lg max-w-md leading-relaxed">I design with purpose. Every pixel and every frame is crafted to connect with your audience and drive results.</p>
                     </div>
                   </div>
                   {/* Back */}
                   <div className="absolute inset-0 bg-zinc-100 text-black p-10 md:p-16 rounded-2xl shadow-sm" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                     <div className="flex justify-between items-start mb-6">
                       <span className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-400">Principles</span>
                       <span className="text-[10px] font-black tracking-widest uppercase text-zinc-400">Tap to flip</span>
                     </div>
                     <h3 className="text-2xl md:text-3xl font-black mb-6 tracking-tight uppercase">Design Philosophy</h3>
                     <div className="grid grid-cols-2 gap-4">
                       <div className="bg-white p-4 rounded-xl">
                         <p className="text-3xl mb-2">🎯</p>
                         <p className="font-bold text-sm">Purpose-Driven</p>
                         <p className="text-zinc-500 text-xs">Every decision has intent</p>
                       </div>
                       <div className="bg-white p-4 rounded-xl">
                         <p className="text-3xl mb-2">✨</p>
                         <p className="font-bold text-sm">Pixel Perfect</p>
                         <p className="text-zinc-500 text-xs">Attention to every detail</p>
                       </div>
                       <div className="bg-white p-4 rounded-xl">
                         <p className="text-3xl mb-2">💡</p>
                         <p className="font-bold text-sm">Innovation</p>
                         <p className="text-zinc-500 text-xs">Fresh perspectives always</p>
                       </div>
                       <div className="bg-white p-4 rounded-xl">
                         <p className="text-3xl mb-2">🤝</p>
                         <p className="font-bold text-sm">Collaboration</p>
                         <p className="text-zinc-500 text-xs">Your vision, my expertise</p>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </section>

        <Contact />

        <Footer />
      </div>

      <ThemeToggle />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
      `}</style>
    </main>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
