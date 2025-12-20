
import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Footer from './components/Footer';

const App: React.FC = () => {
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
    <main className="relative bg-black text-white selection:bg-orange-600 selection:text-white min-h-screen overflow-x-hidden">
      <Navbar />
      
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>

      <div className="relative z-10">
        <Hero />

        {/* Marquee Ticker */}
        <section className="py-24 border-y border-white/5 overflow-hidden bg-black">
          <div className="marquee-content animate-marquee">
             <span className="text-8xl md:text-[10vw] font-black uppercase tracking-tighter opacity-10 px-8">FOCUSED STRATEGY</span>
             <span className="text-8xl md:text-[10vw] font-black uppercase tracking-tighter opacity-10 px-8">FOCUSED STRATEGY</span>
          </div>
        </section>

        {/* About Staggered Layout */}
        <section className="about-section py-40 px-6 md:px-12 bg-black border-b border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-20">
             <div className="md:col-span-6 flex flex-col justify-center order-2 md:order-1">
                <h2 className="text-7xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.85] uppercase">
                  THINK.<br/>DEVELOP.<br/>TRANSFORM.
                </h2>
                <p className="text-zinc-400 text-xl mb-12 max-w-md font-medium leading-relaxed">
                  We work with ambitious teams to uncover opportunities, refine operations, and drive sustainable success through visual excellence.
                </p>
                <button className="flex items-center gap-4 font-black text-sm group w-fit">
                  <span className="tracking-[0.2em] uppercase">About us</span>
                  <span className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center transition-transform group-hover:scale-110 group-active:scale-95">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </span>
                </button>
             </div>
             <div className="md:col-span-6 relative min-h-[500px] md:h-[700px] order-1 md:order-2">
                <img src="https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800" className="about-img absolute top-0 left-0 w-1/2 aspect-[3/4] object-cover z-0 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 bg-zinc-900" />
                <img src="https://images.unsplash.com/photo-1554080353-a576cf803bce?auto=format&fit=crop&q=80&w=800" className="about-img absolute top-[15%] right-0 w-[55%] aspect-[3/4] object-cover z-10 shadow-2xl border border-white/5 opacity-80 hover:opacity-100 transition-all duration-700 bg-zinc-900" />
                <img src="https://images.unsplash.com/photo-1510563354643-d67713292497?auto=format&fit=crop&q=80&w=800" className="about-img absolute bottom-0 left-[15%] w-[50%] aspect-[3/4] object-cover z-20 shadow-2xl border-4 border-black transition-all duration-700 bg-zinc-900" />
             </div>
          </div>
        </section>

        <Portfolio />

        <Services />

        {/* Bento Grid Stats */}
        <section className="py-40 px-6 md:px-12 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bento-grid">
               <div className="md:col-span-8 bg-zinc-900/30 border border-white/5 p-16 rounded-2xl bento-item">
                  <div className="mb-24 opacity-30">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="7.5 4.21 12 6.81 16.5 4.21"/><polyline points="7.5 19.79 7.5 14.6 3 12"/><polyline points="21 12 16.5 14.6 16.5 19.79"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                  </div>
                  <h3 className="text-5xl font-black mb-6 tracking-tight uppercase">Strategic Insights</h3>
                  <p className="text-zinc-500 text-lg max-w-lg leading-relaxed">We craft clear, data-backed visual strategies that ensure your brand doesn't just look better, but performs significantly better.</p>
               </div>
               <div className="md:col-span-4 bg-zinc-900/30 border border-white/5 p-16 rounded-2xl bento-item flex flex-col justify-end min-h-[400px]">
                  <span className="text-8xl font-black mb-4 tracking-tighter text-orange-600">35+</span>
                  <p className="text-zinc-400 uppercase text-xs font-black tracking-[0.3em]">Global Partnerships</p>
               </div>
               <div className="md:col-span-4 bg-zinc-900/30 border border-white/5 p-16 rounded-2xl bento-item flex flex-col justify-end min-h-[400px] overflow-hidden relative group">
                  <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:scale-110 transition-transform duration-1000 group-hover:opacity-60 bg-zinc-900" />
                  <div className="relative z-10">
                    <span className="text-7xl font-black mb-4 tracking-tighter">38%</span>
                    <p className="text-zinc-400 uppercase text-xs font-black tracking-[0.3em]">Efficiency Increase</p>
                  </div>
               </div>
               <div className="md:col-span-8 bg-orange-600 p-16 rounded-2xl bento-item flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
                  <div className="relative z-10">
                    <h3 className="text-4xl font-black mb-4 text-white uppercase tracking-tight">Data-Driven Approach</h3>
                    <p className="text-white/80 text-lg max-w-md leading-relaxed">We analyze market trends and consumer behavior to uncover hidden insights that shape every shutter click.</p>
                  </div>
                  <div className="hidden md:block w-64 h-64 bg-white/10 rounded-full blur-3xl absolute -right-20 -bottom-20"></div>
               </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

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

export default App;
