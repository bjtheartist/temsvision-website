import React, { useState, useEffect, useCallback, memo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { SITE_CONFIG, SOCIAL_LINKS, NAV_ITEMS } from '../constants';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const scrollToSection = useCallback((id: string) => {
    setIsMenuOpen(false);
    // Small delay to let menu close animation start
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, []);

  return (
    <>
      {/* Fixed Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled && !isMenuOpen
            ? isDark 
              ? 'bg-black/90 backdrop-blur-md' 
              : 'bg-white/90 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">
            {/* Logo */}
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="relative z-[60]"
            >
              <img 
                src="/temsvision-logo-white-blue.png" 
                alt="TemsVision"
                className="w-10 md:w-12 h-auto"
                style={{ 
                  filter: isMenuOpen 
                    ? 'invert(1)' 
                    : 'none'
                }}
              />
            </a>

            {/* Center Tagline - Desktop Only */}
            <div className={`hidden lg:block absolute left-1/2 -translate-x-1/2 transition-opacity duration-200 ${
              isScrolled || isMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}>
              <span className={`text-[10px] tracking-[0.2em] uppercase ${
                isDark ? 'text-white/60' : 'text-black/60'
              }`}>
                [{SITE_CONFIG.tagline}]
              </span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Theme Toggle - Desktop */}
              <div className={`hidden sm:block transition-opacity duration-200 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}>
                <ThemeToggle variant="inline" />
              </div>

              {/* Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`relative z-[60] text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-200 px-2 py-1 ${
                  isMenuOpen 
                    ? 'text-black' 
                    : isDark 
                      ? 'text-white' 
                      : 'text-black'
                }`}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                [{isMenuOpen ? 'Close' : 'Menu'}]
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay - Blue gradient theme */}
      <div 
        className={`fixed inset-0 z-[55] transition-all duration-300 ease-out ${
          isMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
        style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 40%, #1e3a5f 100%)'
        }}
      >
        {/* Menu Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-24 pt-16 md:pt-0">
          <nav className="max-w-4xl">
            {NAV_ITEMS.map((item, index) => (
              <div 
                key={item.id}
                className={`transition-all duration-300 ease-out ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: isMenuOpen ? `${index * 50 + 100}ms` : '0ms' }}
              >
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="group flex items-center gap-3 sm:gap-4 py-2 sm:py-3 md:py-4"
                >
                  <span className="text-white/30 text-xs sm:text-sm font-mono">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span 
                    className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white hover:text-cyan-300 transition-colors duration-150"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {item.label}
                  </span>
                </button>
              </div>
            ))}
          </nav>

          {/* Footer Info */}
          <div 
            className={`absolute bottom-8 sm:bottom-12 left-4 sm:left-6 md:left-12 lg:left-24 right-4 sm:right-6 md:right-12 lg:right-24 flex flex-col md:flex-row justify-between gap-4 sm:gap-8 transition-all duration-300 ease-out ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: isMenuOpen ? '300ms' : '0ms' }}
          >
            {/* Social Links */}
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {SOCIAL_LINKS.instagram && (
                <a 
                  href={SOCIAL_LINKS.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.1em] uppercase text-white/60 hover:text-cyan-300 transition-colors duration-150"
                >
                  Instagram
                </a>
              )}
              {SOCIAL_LINKS.facebook && (
                <a 
                  href={SOCIAL_LINKS.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.1em] uppercase text-white/60 hover:text-cyan-300 transition-colors duration-150"
                >
                  Facebook
                </a>
              )}
              {SOCIAL_LINKS.linkedin && (
                <a 
                  href={SOCIAL_LINKS.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.1em] uppercase text-white/60 hover:text-cyan-300 transition-colors duration-150"
                >
                  LinkedIn
                </a>
              )}
            </div>

            {/* Theme Toggle - Mobile (in menu) */}
            <div className="flex items-center gap-4 sm:hidden">
              <span className="text-xs tracking-[0.1em] uppercase text-white/40">Theme</span>
              <ThemeToggle variant="inline" />
            </div>

            {/* Location */}
            <div className="hidden md:block">
              <span className="text-xs tracking-[0.1em] uppercase text-white/40">
                {SITE_CONFIG.location}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Navbar);
