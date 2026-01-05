import React, { useCallback, memo } from 'react';
import { SITE_CONFIG, SOCIAL_LINKS } from '../constants';
import { useTheme } from '../context/ThemeContext';

const Footer: React.FC = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <footer className={`py-8 sm:py-12 ${
      isDark ? 'bg-black border-t border-white/10' : 'bg-white border-t border-black/10'
    }`}>
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            <img 
              src="/temsvision-logo.png" 
              alt="TemsVision"
              className="w-8 sm:w-10 h-auto"
              style={{ 
                filter: 'invert(1) brightness(2)'
              }}
            />
            <span 
              className={`text-base sm:text-lg font-black tracking-wider ${
                isDark ? 'text-white' : 'text-black'
              }`}
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              TEMS<span className="text-blue-500">VISION</span>
            </span>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-left order-3 md:order-2">
            <p className={`text-[10px] sm:text-xs tracking-[0.1em] uppercase ${
              isDark ? 'text-white/40' : 'text-black/40'
            }`}>
              © {currentYear} {SITE_CONFIG.name}. All Rights Reserved.
            </p>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-4 sm:gap-6 order-2 md:order-3">
            {SOCIAL_LINKS.instagram && (
              <a 
                href={SOCIAL_LINKS.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-xs tracking-[0.1em] uppercase transition-colors ${
                  isDark ? 'text-white/40 hover:text-blue-400' : 'text-black/40 hover:text-blue-600'
                }`}
                aria-label="Instagram"
              >
                IG
              </a>
            )}
            {SOCIAL_LINKS.facebook && (
              <a 
                href={SOCIAL_LINKS.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-xs tracking-[0.1em] uppercase transition-colors ${
                  isDark ? 'text-white/40 hover:text-blue-400' : 'text-black/40 hover:text-blue-600'
                }`}
                aria-label="Facebook"
              >
                FB
              </a>
            )}
            {SOCIAL_LINKS.linkedin && (
              <a 
                href={SOCIAL_LINKS.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-xs tracking-[0.1em] uppercase transition-colors ${
                  isDark ? 'text-white/40 hover:text-blue-400' : 'text-black/40 hover:text-blue-600'
                }`}
                aria-label="LinkedIn"
              >
                LI
              </a>
            )}
            {SOCIAL_LINKS.pinterest && (
              <a 
                href={SOCIAL_LINKS.pinterest} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-xs tracking-[0.1em] uppercase transition-colors ${
                  isDark ? 'text-white/40 hover:text-blue-400' : 'text-black/40 hover:text-blue-600'
                }`}
                aria-label="Pinterest"
              >
                PI
              </a>
            )}
            <span className={isDark ? 'text-white/20' : 'text-black/20'}>|</span>
            <button
              onClick={scrollToTop}
              className={`text-xs tracking-[0.1em] uppercase transition-colors ${
                isDark ? 'text-white/40 hover:text-blue-400' : 'text-black/40 hover:text-blue-600'
              }`}
              aria-label="Scroll to top"
            >
              [Top]
            </button>
          </div>
        </div>

        {/* Tagline */}
        <div className={`mt-6 sm:mt-8 pt-6 sm:pt-8 text-center ${
          isDark ? 'border-t border-white/5' : 'border-t border-black/5'
        }`}>
          <p className={`text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase ${
            isDark ? 'text-white/20' : 'text-black/20'
          }`}>
            [{SITE_CONFIG.tagline}]
          </p>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
