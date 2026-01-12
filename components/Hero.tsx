import React, { useEffect, useState, useCallback, memo } from 'react';
import { SITE_CONFIG, SOCIAL_LINKS, HERO_IMAGES } from '../constants';
import { useTheme } from '../context/ThemeContext';

const Hero: React.FC = () => {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Track scroll progress for animation reveal
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Start showing animation after scrolling 10% of viewport
      const progress = Math.min(scrollY / (windowHeight * 0.5), 1);
      setScrollProgress(progress);
      setShowAnimation(scrollY > windowHeight * 0.1);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToWork = useCallback(() => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section className={`relative min-h-screen w-full flex flex-col overflow-hidden ${
      isDark ? 'bg-black' : 'bg-white'
    }`}>
      {/* Background Images - Fades out on scroll */}
      {HERO_IMAGES.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: index === currentImageIndex ? 0.3 * (1 - scrollProgress) : 0,
          }}
        />
      ))}

      {/* Animated WebP Background - Appears on scroll */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: showAnimation ? scrollProgress * 0.6 : 0,
        }}
      >
        <img
          src="/hero-animation.webp"
          alt=""
          className="w-full h-full object-contain"
          style={{
            transform: `scale(${1 + scrollProgress * 0.1})`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>
      
      {/* Overlay gradient */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-black/80 via-slate-900/70 to-black/80' 
          : 'bg-gradient-to-br from-white/80 via-blue-50/70 to-white/80'
      }`} />
      
      {/* Subtle grid pattern */}
      <div 
        className={`absolute inset-0 ${isDark ? 'opacity-5' : 'opacity-10'}`}
        style={{
          backgroundImage: isDark 
            ? `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`
            : `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
               linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Image counter */}
      <div 
        className={`absolute top-24 right-4 sm:right-6 md:right-12 lg:right-24 transition-all duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ opacity: isVisible ? 1 - scrollProgress : 0 }}
      >
        <span className={`text-[10px] tracking-[0.2em] font-mono ${
          isDark ? 'text-white/40' : 'text-black/40'
        }`}>
          {String(currentImageIndex + 1).padStart(2, '0')}/{String(HERO_IMAGES.length).padStart(2, '0')}
        </span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-4 sm:px-6 pt-20 md:pt-0">
        {/* Logo - Using actual TemsVision logo */}
        <div 
          className={`mb-4 sm:mb-6 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transform: `translateY(${scrollProgress * -30}px)`,
            opacity: 1 - scrollProgress * 0.5,
          }}
        >
          <img 
            src="/temsvision-logo-white-blue.png" 
            alt="TemsVision Logo"
            className="w-40 sm:w-48 md:w-56 lg:w-64 h-auto"
          />
        </div>

        {/* Tagline in brackets - O'Shane Howard style */}
        <div 
          className={`text-center transition-all duration-700 ease-out delay-150 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transform: `translateY(${scrollProgress * -20}px)`,
            opacity: 1 - scrollProgress * 0.7,
          }}
        >
          <span 
            className={`text-[9px] sm:text-[10px] md:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase ${
              isDark ? 'text-white/60' : 'text-black/60'
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            [{SITE_CONFIG.tagline}]
          </span>
        </div>

        {/* Subtitle */}
        <div 
          className={`mt-6 sm:mt-8 text-center max-w-md transition-all duration-700 ease-out delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transform: `translateY(${scrollProgress * -10}px)`,
            opacity: 1 - scrollProgress * 0.8,
          }}
        >
          <p className={`text-sm sm:text-base ${isDark ? 'text-white/40' : 'text-black/40'}`}>
            Where vision meets artistry. Every frame tells a story.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-20 sm:bottom-12 left-1/2 -translate-x-1/2 cursor-pointer group transition-all duration-700 ease-out delay-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ opacity: isVisible ? 1 - scrollProgress * 2 : 0 }}
        onClick={scrollToWork}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && scrollToWork()}
        aria-label="Scroll to portfolio"
      >
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <span className={`text-[9px] sm:text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 ${
            isDark 
              ? 'text-white/40 group-hover:text-blue-400' 
              : 'text-black/40 group-hover:text-blue-600'
          }`}>
            Scroll to Explore
          </span>
          <div className={`w-px h-8 sm:h-12 ${
            isDark 
              ? 'bg-gradient-to-b from-white/40 to-transparent' 
              : 'bg-gradient-to-b from-black/40 to-transparent'
          }`} />
        </div>
      </div>

      {/* Location - Hidden on very small screens */}
      <div 
        className={`absolute bottom-6 sm:bottom-12 left-4 sm:left-6 md:left-12 lg:left-24 transition-all duration-700 delay-400 hidden sm:block ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ opacity: isVisible ? 1 - scrollProgress * 2 : 0 }}
      >
        <span className={`text-[9px] sm:text-[10px] tracking-[0.2em] uppercase ${
          isDark ? 'text-white/40' : 'text-black/40'
        }`}>
          {SITE_CONFIG.location}
        </span>
      </div>

      {/* Instagram handle - Hidden on very small screens */}
      <div 
        className={`absolute bottom-6 sm:bottom-12 right-4 sm:right-6 md:right-12 lg:right-24 transition-all duration-700 delay-400 hidden sm:block ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ opacity: isVisible ? 1 - scrollProgress * 2 : 0 }}
      >
        <a 
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-[9px] sm:text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 ${
            isDark 
              ? 'text-white/40 hover:text-blue-400' 
              : 'text-black/40 hover:text-blue-600'
          }`}
        >
          {SITE_CONFIG.instagram}
        </a>
      </div>
    </section>
  );
};

export default memo(Hero);
