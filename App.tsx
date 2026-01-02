import React, { useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';

const AppContent: React.FC = () => {
  const { theme } = useTheme();

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

      // Refresh ScrollTrigger after content loads
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
      <ThemeToggle />

      {/* Subtle noise texture overlay */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.015] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>

      <div className="relative z-10">
        <Hero />

        {/* Marquee Ticker */}
        <section className={`py-6 md:py-8 border-y overflow-hidden transition-colors duration-500 ${
          theme === 'dark' ? 'bg-black border-white/10' : 'bg-white border-black/10'
        }`}>
          <div className="marquee-content animate-marquee whitespace-nowrap">
            <span className={`text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter px-8 ${
              theme === 'dark' ? 'text-white/10' : 'text-black/10'
            }`}>
              PRODUCT DESIGN • WEB DESIGN • BRAND IDENTITY • MOBILE APPS • 
            </span>
            <span className={`text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter px-8 ${
              theme === 'dark' ? 'text-white/10' : 'text-black/10'
            }`}>
              PRODUCT DESIGN • WEB DESIGN • BRAND IDENTITY • MOBILE APPS • 
            </span>
          </div>
        </section>

        <Portfolio />
        <Services />
        <About />
        <Contact />
        <Footer />
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        .outline-text {
          -webkit-text-stroke: 2px currentColor;
          -webkit-text-fill-color: transparent;
        }
        .particle {
          position: absolute;
          background: white;
          border-radius: 50%;
          pointer-events: none;
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
