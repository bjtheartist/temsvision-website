import React, { useEffect, useState, useCallback, Suspense, lazy } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ThemeToggle from './components/ThemeToggle';

// Lazy load below-the-fold components for better performance
const About = lazy(() => import('./components/About'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Services = lazy(() => import('./components/Services'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Loading fallback component
const SectionLoader: React.FC = () => {
  const { isDark } = useTheme();
  return (
    <div className={`py-32 flex items-center justify-center ${
      isDark ? 'bg-black' : 'bg-white'
    }`}>
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

const AppContent: React.FC = () => {
  const { isDark } = useTheme();
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
      const timer = setTimeout(() => setShowContent(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      <main 
        className={`relative min-h-screen overflow-x-hidden transition-all duration-300 ease-out ${
          isDark 
            ? 'bg-black text-white selection:bg-blue-500 selection:text-white' 
            : 'bg-white text-black selection:bg-blue-500 selection:text-white'
        } ${showContent ? 'opacity-100' : 'opacity-0'}`}
      >
        <Navbar />

        <div className="relative z-10">
          <Hero />
          
          {/* Section order: About, Gallery, Services, Contact */}
          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Portfolio />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Services />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Footer />
          </Suspense>
        </div>

        {/* Fixed Theme Toggle Button */}
        <ThemeToggle variant="fixed" />
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
