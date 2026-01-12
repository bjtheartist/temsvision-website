import React, { useEffect, useState, memo } from 'react';
import { ABOUT_BIO, SITE_CONFIG, SOCIAL_LINKS, SKILLS } from '../constants';
import { useTheme } from '../context/ThemeContext';

const About: React.FC = () => {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className={`relative py-16 sm:py-24 md:py-32 overflow-hidden ${
      isDark ? 'bg-black' : 'bg-white'
    }`}>
      {/* Background accent */}
      <div className={`absolute top-0 right-0 w-1/2 h-full pointer-events-none ${
        isDark 
          ? 'bg-gradient-to-l from-blue-500/5 to-transparent' 
          : 'bg-gradient-to-l from-blue-100/50 to-transparent'
      }`} />
      
      <div className="relative px-4 sm:px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <span className="text-blue-500 text-xs font-mono">01</span>
            <div className="w-8 sm:w-12 h-px bg-blue-500/50" />
          </div>
          <h2 
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black ${
              isDark ? 'text-white' : 'text-black'
            }`}
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            About Me
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24">
          {/* Left Column - Bio */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Intro */}
            <h3 
              className={`text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 ${
                isDark ? 'text-white' : 'text-black'
              }`}
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {ABOUT_BIO.intro}
            </h3>
            
            {/* Background */}
            <p className={`leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base ${
              isDark ? 'text-white/70' : 'text-black/70'
            }`}>
              {ABOUT_BIO.background}
            </p>
            
            {/* Story */}
            <p className={`leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base ${
              isDark ? 'text-white/70' : 'text-black/70'
            }`}>
              {ABOUT_BIO.story}
            </p>
            
            {/* Philosophy Quote */}
            <blockquote className="border-l-2 border-blue-500 pl-4 sm:pl-6 my-6 sm:my-8">
              <p className={`text-base sm:text-lg italic ${
                isDark ? 'text-white/90' : 'text-black/90'
              }`}>
                "{ABOUT_BIO.philosophy}"
              </p>
            </blockquote>
            
            {/* Approach */}
            <p className={`leading-relaxed text-sm sm:text-base ${
              isDark ? 'text-white/70' : 'text-black/70'
            }`}>
              {ABOUT_BIO.approach}
            </p>

            {/* Skills */}
            <div className="mt-8 sm:mt-12">
              <h4 className={`text-xs tracking-[0.3em] uppercase mb-4 sm:mb-6 ${
                isDark ? 'text-white/50' : 'text-black/50'
              }`}>
                Specialties
              </h4>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {SKILLS.map((skill) => (
                  <span 
                    key={skill}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full transition-all duration-300 ${
                      isDark 
                        ? 'text-white/70 border border-white/20 hover:border-blue-400/50 hover:text-blue-400' 
                        : 'text-black/70 border border-black/20 hover:border-blue-500/50 hover:text-blue-600'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Headshot */}
            <div className="mb-6 sm:mb-8">
              <div className={`relative overflow-hidden rounded-lg aspect-[4/5] ${
                isDark 
                  ? 'ring-2 ring-white/10' 
                  : 'ring-2 ring-blue-100'
              }`}>
                <img 
                  src="/temi-headshot.jpg" 
                  alt="Temilade Amire Quadri - TemsVision Photography"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                {/* Overlay gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t ${
                  isDark 
                    ? 'from-black/30 via-transparent to-transparent' 
                    : 'from-blue-900/20 via-transparent to-transparent'
                }`} />
              </div>
            </div>

            {/* Name Meaning Card */}
            <div className={`p-6 sm:p-8 mb-6 sm:mb-8 rounded-lg ${
              isDark 
                ? 'bg-white/5 border border-white/10' 
                : 'bg-blue-50 border border-blue-100'
            }`}>
              <h4 className="text-xs tracking-[0.3em] uppercase text-blue-500 mb-4 sm:mb-6">
                The Name
              </h4>
              
              <div className="space-y-4">
                <div>
                  <span className={`text-sm ${isDark ? 'text-white/50' : 'text-black/50'}`}>Temilade</span>
                  <p className={`text-base sm:text-lg ${isDark ? 'text-white' : 'text-black'}`}>
                    {ABOUT_BIO.nameMeaning.temilade}
                  </p>
                  <span className={`text-xs ${isDark ? 'text-white/30' : 'text-black/30'}`}>
                    (teh-meh-la-day) — Yoruba, Western Nigeria
                  </span>
                </div>
                
                <div className={`w-full h-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
                
                <div>
                  <span className={`text-sm ${isDark ? 'text-white/50' : 'text-black/50'}`}>Temi</span>
                  <p className={`text-base sm:text-lg ${isDark ? 'text-white' : 'text-black'}`}>
                    {ABOUT_BIO.nameMeaning.temi}
                  </p>
                  <span className={`text-xs ${isDark ? 'text-white/30' : 'text-black/30'}`}>(Tee-meeh)</span>
                </div>
                
                <div className={`w-full h-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
                
                <div>
                  <span className={`text-sm ${isDark ? 'text-white/50' : 'text-black/50'}`}>TemsVision</span>
                  <p className={`text-base sm:text-lg ${isDark ? 'text-white' : 'text-black'}`}>
                    {ABOUT_BIO.nameMeaning.temsvision}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className={`p-4 sm:p-6 rounded-lg ${
                isDark 
                  ? 'bg-white/5 border border-white/10' 
                  : 'bg-blue-50 border border-blue-100'
              }`}>
                <span className={`text-xs tracking-[0.2em] uppercase block mb-2 ${
                  isDark ? 'text-white/40' : 'text-black/40'
                }`}>Location</span>
                <span className={`text-sm sm:text-base ${isDark ? 'text-white' : 'text-black'}`}>
                  {SITE_CONFIG.location}
                </span>
              </div>
              
              <div className={`p-4 sm:p-6 rounded-lg ${
                isDark 
                  ? 'bg-white/5 border border-white/10' 
                  : 'bg-blue-50 border border-blue-100'
              }`}>
                <span className={`text-xs tracking-[0.2em] uppercase block mb-2 ${
                  isDark ? 'text-white/40' : 'text-black/40'
                }`}>Instagram</span>
                <a 
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  {SITE_CONFIG.instagram}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
              {SOCIAL_LINKS.instagram && (
                <a 
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg transition-all duration-300 ${
                    isDark 
                      ? 'border border-white/20 text-white/60 hover:text-blue-400 hover:border-blue-400' 
                      : 'border border-black/20 text-black/60 hover:text-blue-600 hover:border-blue-600'
                  }`}
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {SOCIAL_LINKS.facebook && (
                <a 
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg transition-all duration-300 ${
                    isDark 
                      ? 'border border-white/20 text-white/60 hover:text-blue-400 hover:border-blue-400' 
                      : 'border border-black/20 text-black/60 hover:text-blue-600 hover:border-blue-600'
                  }`}
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {SOCIAL_LINKS.linkedin && (
                <a 
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg transition-all duration-300 ${
                    isDark 
                      ? 'border border-white/20 text-white/60 hover:text-blue-400 hover:border-blue-400' 
                      : 'border border-black/20 text-black/60 hover:text-blue-600 hover:border-blue-600'
                  }`}
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
              {SOCIAL_LINKS.pinterest && (
                <a 
                  href={SOCIAL_LINKS.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg transition-all duration-300 ${
                    isDark 
                      ? 'border border-white/20 text-white/60 hover:text-blue-400 hover:border-blue-400' 
                      : 'border border-black/20 text-black/60 hover:text-blue-600 hover:border-blue-600'
                  }`}
                  aria-label="Pinterest"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(About);
