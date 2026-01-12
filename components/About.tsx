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
    <section id="about" className={`relative py-20 md:py-32 lg:py-40 overflow-hidden ${
      isDark ? 'bg-black' : 'bg-[#f8f7f4]'
    }`}>
      {/* Subtle background gradient */}
      <div className={`absolute top-0 right-0 w-1/2 h-full pointer-events-none ${
        isDark 
          ? 'bg-gradient-to-l from-blue-500/5 to-transparent' 
          : 'bg-gradient-to-l from-blue-100/30 to-transparent'
      }`} />
      
      <div className="relative px-6 md:px-12 lg:px-24">
        {/* Section Header - Area 17 style */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-6">
            <span className={`text-xs md:text-sm font-mono tracking-wider ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}>01</span>
            <div className={`flex-1 h-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
          </div>
          <h2 
            className={`text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight ${
              isDark ? 'text-white' : 'text-black'
            }`}
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            About
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column - Bio */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Intro - Large statement */}
            <h3 
              className={`text-2xl md:text-3xl lg:text-4xl font-light leading-tight mb-8 ${
                isDark ? 'text-white' : 'text-black'
              }`}
            >
              {ABOUT_BIO.intro}
            </h3>
            
            {/* Background */}
            <p className={`text-base md:text-lg leading-relaxed mb-6 font-light ${
              isDark ? 'text-white/60' : 'text-black/60'
            }`}>
              {ABOUT_BIO.background}
            </p>
            
            {/* Story */}
            <p className={`text-base md:text-lg leading-relaxed mb-8 font-light ${
              isDark ? 'text-white/60' : 'text-black/60'
            }`}>
              {ABOUT_BIO.story}
            </p>
            
            {/* Philosophy Quote - Premium styling */}
            <blockquote className={`relative pl-6 md:pl-8 my-10 md:my-12 ${
              isDark ? 'border-l-2 border-blue-400' : 'border-l-2 border-blue-600'
            }`}>
              <p className={`text-lg md:text-xl lg:text-2xl italic font-light ${
                isDark ? 'text-white/90' : 'text-black/90'
              }`}>
                "{ABOUT_BIO.philosophy}"
              </p>
            </blockquote>
            
            {/* Approach */}
            <p className={`text-base md:text-lg leading-relaxed font-light ${
              isDark ? 'text-white/60' : 'text-black/60'
            }`}>
              {ABOUT_BIO.approach}
            </p>

            {/* Specialties - Premium tags */}
            <div className="mt-12 md:mt-16">
              <h4 className={`text-xs tracking-[0.3em] uppercase mb-6 ${
                isDark ? 'text-white/40' : 'text-black/40'
              }`}>
                Specialties
              </h4>
              <div className="flex flex-wrap gap-3">
                {SKILLS.map((skill) => (
                  <span 
                    key={skill}
                    className={`px-4 py-2 text-sm font-light tracking-wide transition-all duration-300 ${
                      isDark 
                        ? 'text-white/70 border border-white/20 hover:border-blue-400/50 hover:text-blue-400 hover:bg-blue-400/5' 
                        : 'text-black/70 border border-black/20 hover:border-blue-500/50 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Photo & Details */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Headshot - Premium styling */}
            <div className="mb-8 md:mb-12">
              <div className={`relative overflow-hidden aspect-[4/5] ${
                isDark ? 'bg-white/5' : 'bg-black/5'
              }`}>
                <img 
                  src="/temi-headshot.jpg" 
                  alt="Temilade Amire Quadri - TemsVision Photography"
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${
                  isDark 
                    ? 'from-black/20 via-transparent to-transparent' 
                    : 'from-black/10 via-transparent to-transparent'
                }`} />
                
                {/* Corner accent */}
                <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
                  <div className={`w-12 h-px ${isDark ? 'bg-white/40' : 'bg-black/40'}`} />
                  <div className={`w-px h-12 ${isDark ? 'bg-white/40' : 'bg-black/40'}`} />
                </div>
              </div>
            </div>

            {/* Name Meaning Card - Premium */}
            <div className={`p-8 md:p-10 mb-8 ${
              isDark 
                ? 'bg-white/5 border border-white/10' 
                : 'bg-white border border-black/5 shadow-sm'
            }`}>
              <h4 className={`text-xs tracking-[0.3em] uppercase mb-8 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                The Name
              </h4>
              
              <div className="space-y-6">
                <div>
                  <span className={`text-xs tracking-wider uppercase ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                    Temilade
                  </span>
                  <p className={`text-lg md:text-xl font-light mt-1 ${isDark ? 'text-white' : 'text-black'}`}>
                    {ABOUT_BIO.nameMeaning.temilade}
                  </p>
                  <span className={`text-xs font-light ${isDark ? 'text-white/30' : 'text-black/30'}`}>
                    (teh-meh-la-day) — Yoruba
                  </span>
                </div>
                
                <div className={`w-full h-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
                
                <div>
                  <span className={`text-xs tracking-wider uppercase ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                    Temi
                  </span>
                  <p className={`text-lg md:text-xl font-light mt-1 ${isDark ? 'text-white' : 'text-black'}`}>
                    {ABOUT_BIO.nameMeaning.temi}
                  </p>
                </div>
                
                <div className={`w-full h-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
                
                <div>
                  <span className={`text-xs tracking-wider uppercase ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                    TemsVision
                  </span>
                  <p className={`text-lg md:text-xl font-light mt-1 ${isDark ? 'text-white' : 'text-black'}`}>
                    {ABOUT_BIO.nameMeaning.temsvision}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-6 ${
                isDark 
                  ? 'bg-white/5 border border-white/10' 
                  : 'bg-white border border-black/5 shadow-sm'
              }`}>
                <span className={`text-xs tracking-[0.2em] uppercase block mb-2 ${
                  isDark ? 'text-white/40' : 'text-black/40'
                }`}>Based in</span>
                <span className={`text-base font-light ${isDark ? 'text-white' : 'text-black'}`}>
                  {SITE_CONFIG.location}
                </span>
              </div>
              
              <div className={`p-6 ${
                isDark 
                  ? 'bg-white/5 border border-white/10' 
                  : 'bg-white border border-black/5 shadow-sm'
              }`}>
                <span className={`text-xs tracking-[0.2em] uppercase block mb-2 ${
                  isDark ? 'text-white/40' : 'text-black/40'
                }`}>Follow</span>
                <a 
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-base font-light flex items-center gap-2 transition-colors duration-300 ${
                    isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                  }`}
                >
                  <span>{SITE_CONFIG.instagram}</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex gap-4">
              {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
                url && (
                  <a 
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 flex items-center justify-center transition-all duration-300 ${
                      isDark 
                        ? 'border border-white/20 text-white/60 hover:text-blue-400 hover:border-blue-400 hover:bg-blue-400/5' 
                        : 'border border-black/20 text-black/60 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50'
                    }`}
                    aria-label={platform}
                  >
                    {platform === 'instagram' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    )}
                    {platform === 'facebook' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    )}
                    {platform === 'linkedin' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    )}
                    {platform === 'pinterest' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                      </svg>
                    )}
                  </a>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(About);
