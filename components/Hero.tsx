import React, { useEffect, useState, useCallback, memo } from 'react';
import { SITE_CONFIG, SOCIAL_LINKS, HERO_IMAGES } from '../constants';
import { useTheme } from '../context/ThemeContext';

const Hero: React.FC = () => {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToWork = useCallback(() => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section className={`relative min-h-screen w-full flex flex-col overflow-hidden ${
      isDark ? 'bg-black' : 'bg-[#f8f7f4]'
    }`}>
      {/* Background Images with premium fade */}
      {HERO_IMAGES.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-all duration-[1500ms] ease-out ${
            index === currentImageIndex ? 'opacity-40 scale-100' : 'opacity-0 scale-105'
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}
      
      {/* Premium overlay gradient */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-b from-black via-black/90 to-black' 
          : 'bg-gradient-to-b from-[#f8f7f4] via-[#f8f7f4]/90 to-[#f8f7f4]'
      }`} />
      
      {/* Subtle noise texture for premium feel */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Image counter - Area 17 style */}
      <div 
        className={`absolute top-28 md:top-32 right-6 md:right-12 lg:right-24 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className={`text-[10px] md:text-xs tracking-[0.3em] font-light ${
            isDark ? 'text-white/30' : 'text-black/30'
          }`}>
            {String(currentImageIndex + 1).padStart(2, '0')}
          </span>
          <div className={`w-8 h-px ${isDark ? 'bg-white/20' : 'bg-black/20'}`} />
          <span className={`text-[10px] md:text-xs tracking-[0.3em] font-light ${
            isDark ? 'text-white/30' : 'text-black/30'
          }`}>
            {String(HERO_IMAGES.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Main Content - Mobile first */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-6 md:px-8 pt-24 md:pt-0">
        {/* Logo - Premium sizing */}
        <div 
          className={`mb-6 md:mb-8 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
          }`}
        >
          <img 
            src="/temsvision-logo-white-blue.png" 
            alt="TemsVision Logo"
            className="w-48 md:w-56 lg:w-72 xl:w-80 h-auto drop-shadow-2xl"
          />
        </div>

        {/* Tagline - Bold, premium typography */}
        <div 
          className={`text-center transition-all duration-1000 ease-out delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span 
            className={`text-[10px] md:text-xs lg:text-sm tracking-[0.25em] md:tracking-[0.3em] uppercase font-light ${
              isDark ? 'text-white/50' : 'text-black/50'
            }`}
          >
            [{SITE_CONFIG.tagline}]
          </span>
        </div>

        {/* Statement text - Area 17 inspired large text */}
        <div 
          className={`mt-8 md:mt-12 text-center max-w-xs md:max-w-lg lg:max-w-2xl transition-all duration-1000 ease-out delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 
            className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-tight tracking-tight ${
              isDark ? 'text-white' : 'text-black'
            }`}
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Capturing moments that
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600"> transcend time</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div 
          className={`mt-4 md:mt-6 text-center max-w-xs md:max-w-md transition-all duration-1000 ease-out delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className={`text-sm md:text-base font-light ${isDark ? 'text-white/40' : 'text-black/40'}`}>
            Where vision meets artistry. Every frame tells a story.
          </p>
        </div>
      </div>

      {/* Scroll Indicator - Mobile-first with tap/scroll prompt */}
      <div 
        className={`absolute bottom-24 md:bottom-16 left-1/2 -translate-x-1/2 cursor-pointer group transition-all duration-1000 ease-out delay-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={scrollToWork}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && scrollToWork()}
        aria-label="Scroll to explore"
      >
        <div className="flex flex-col items-center gap-4">
          {/* Mobile-first prompt like O'Shane Howard */}
          <span className={`text-[10px] md:text-xs tracking-[0.3em] uppercase font-light transition-all duration-300 ${
            isDark 
              ? 'text-white/40 group-hover:text-blue-400' 
              : 'text-black/40 group-hover:text-blue-600'
          }`}>
            {isMobile ? '↓ Tap to Explore ↓' : '↓ Scroll to Explore ↓'}
          </span>
          
          {/* Animated line */}
          <div className="relative w-px h-12 md:h-16 overflow-hidden">
            <div className={`absolute inset-0 ${
              isDark ? 'bg-white/10' : 'bg-black/10'
            }`} />
            <div 
              className={`absolute top-0 left-0 w-full bg-gradient-to-b ${
                isDark ? 'from-blue-400 to-transparent' : 'from-blue-600 to-transparent'
              }`}
              style={{
                height: '50%',
                animation: 'scrollLine 2s ease-in-out infinite'
              }}
            />
          </div>
        </div>
      </div>

      {/* Location - Premium positioning */}
      <div 
        className={`absolute bottom-8 md:bottom-12 left-6 md:left-12 lg:left-24 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-green-400' : 'bg-green-500'} animate-pulse`} />
          <span className={`text-[10px] md:text-xs tracking-[0.2em] uppercase font-light ${
            isDark ? 'text-white/40' : 'text-black/40'
          }`}>
            {SITE_CONFIG.location}
          </span>
        </div>
      </div>

      {/* Instagram handle with arrow - Area 17 style */}
      <div 
        className={`absolute bottom-8 md:bottom-12 right-6 md:right-12 lg:right-24 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}
      >
        <a 
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex items-center gap-2 text-[10px] md:text-xs tracking-[0.2em] uppercase font-light transition-all duration-300 ${
            isDark 
              ? 'text-white/40 hover:text-blue-400' 
              : 'text-black/40 hover:text-blue-600'
          }`}
        >
          <span>{SITE_CONFIG.instagram}</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
      `}</style>
    </section>
  );
};

export default memo(Hero);
