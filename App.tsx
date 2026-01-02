import React, { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Preloader from './components/Preloader';
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
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Prevent scrolling during preloader
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      // Small delay before showing content for smooth transition
      setTimeout(() => setShowContent(true), 100);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!showContent) return;

    // @ts-ignore
    const gsap = window.gsap;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger;
    // @ts-ignore
    const Lenis = window.Lenis;

    if (gsap && ScrollTrigger && Lenis) {
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
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
      }, 500);

      return () => {
        clearTimeout(timer);
        lenis.destroy();
        ScrollTrigger.getAll().forEach((t: any) => t.kill());
      };
    }
  }, [showContent]);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      <main className={`relative min-h-screen overflow-x-hidden transition-colors duration-700 ${
        theme === 'dark'
          ? 'bg-black text-white selection:bg-white selection:text-black'
          : 'bg-white text-black selection:bg-black selection:text-white'
      } ${showContent ? 'opacity-100' : 'opacity-0'}`}
      style={{ transition: 'opacity 0.6s ease-out' }}
      >
        <Navbar />
        <ThemeToggle />

        {/* Subtle noise texture overlay */}
        <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>

        <div className="relative z-10">
          <Hero />
          <Portfolio />
          <Services />
          <About />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
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
