import React, { useEffect, useState, useCallback, Suspense, lazy, memo } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MagneticCursor from './components/MagneticCursor';

// Lazy load below-the-fold components for better performance
const MarqueeSlider = lazy(() => import('./components/MarqueeSlider'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Footer = lazy(() => import('./components/Footer'));

// Loading fallback component
const SectionLoader: React.FC = memo(() => (
  <div className="py-32 flex items-center justify-center bg-neutral-950">
    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
));

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile/touch device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent scrolling during preloader
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  // Show content after preloader
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowContent(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {/* Custom Cursor - Desktop only */}
      {!isMobile && <MagneticCursor isVisible={!isLoading} />}

      {/* Preloader */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      {/* Main Content */}
      <main 
        className={`relative min-h-screen overflow-x-hidden bg-neutral-950 text-white selection:bg-blue-500 selection:text-white transition-opacity duration-500 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Navigation */}
        <Navbar />

        {/* Page Sections */}
        <div className="relative z-10">
          {/* Hero Section */}
          <Hero />
          
          {/* Featured Work Marquee */}
          <Suspense fallback={<SectionLoader />}>
            <MarqueeSlider />
          </Suspense>
          
          {/* Gallery/Portfolio */}
          <Suspense fallback={<SectionLoader />}>
            <Portfolio />
          </Suspense>
          
          {/* About Section */}
          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>
          
          {/* Services */}
          <Suspense fallback={<SectionLoader />}>
            <Services />
          </Suspense>
          
          {/* Footer with Contact */}
          <Suspense fallback={<SectionLoader />}>
            <Footer />
          </Suspense>
        </div>
      </main>
    </>
  );
};

export default App;
