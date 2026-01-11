import React, { useState, useCallback, memo } from 'react';
import { useTheme } from '../context/ThemeContext';

const Portfolio: React.FC = () => {
  const { isDark } = useTheme();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Photography categories with actual images
  const categories = [
    { 
      id: 'PORTRAITS', 
      title: 'Portrait Sessions', 
      subtitle: 'Capturing personality & style',
      image: '/gallery/portrait-1.jpg'
    },
    { 
      id: 'SPORTS', 
      title: 'Sports Action', 
      subtitle: 'Dynamic athletic moments',
      image: '/gallery/sports-1.jpg'
    },
    { 
      id: 'FAMILY', 
      title: 'Maternity & Family', 
      subtitle: 'Celebrating new beginnings',
      image: '/gallery/maternity-1.jpg'
    },
    { 
      id: 'B & W', 
      title: 'Black & White', 
      subtitle: 'Timeless monochrome',
      image: '/gallery/bw-1.jpg'
    },
  ];

  const handleMouseEnter = useCallback((id: string) => {
    setHoveredCategory(id);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCategory(null);
  }, []);

  return (
    <section id="portfolio" className={`relative py-16 sm:py-24 md:py-32 ${
      isDark ? 'bg-black' : 'bg-white'
    }`}>
      {/* Section Header */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 mb-12 sm:mb-16">
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
          Selected Work
        </h2>
        <p className={`text-sm mt-3 sm:mt-4 max-w-md ${
          isDark ? 'text-white/40' : 'text-black/40'
        }`}>
          A collection of moments captured through my lens. Each project tells a unique story.
        </p>
      </div>

      {/* Gallery Wall - O'Shane Howard Style Free-Floating Sections */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {categories.map((category, index) => {
            const isHovered = hoveredCategory === category.id;
            
            return (
              <div
                key={category.id}
                className={`group relative aspect-[4/3] overflow-hidden cursor-pointer transition-all duration-500 ease-out rounded-lg sm:rounded-none ${
                  isHovered ? 'scale-[1.02] z-10' : 'scale-100 z-0'
                }`}
                onMouseEnter={() => handleMouseEnter(category.id)}
                onMouseLeave={handleMouseLeave}
                role="button"
                tabIndex={0}
                aria-label={`View ${category.title} gallery`}
              >
                {/* Background Image */}
                <div 
                  className={`absolute inset-0 transition-transform duration-700 ease-out ${
                    isHovered ? 'scale-110' : 'scale-100'
                  }`}
                  style={{ 
                    backgroundImage: `url(${category.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                
                {/* Gradient overlay */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${
                  isDark 
                    ? `bg-gradient-to-t from-black via-black/60 to-transparent ${isHovered ? 'opacity-60' : 'opacity-70'}`
                    : `bg-gradient-to-t from-white via-white/60 to-transparent ${isHovered ? 'opacity-50' : 'opacity-60'}`
                }`} />

                {/* Large category number */}
                <div className="absolute top-3 left-4 sm:top-4 sm:left-6 md:top-6 md:left-8">
                  <span 
                    className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black transition-all duration-500 ${
                      isDark 
                        ? isHovered ? 'text-white/30' : 'text-white/10'
                        : isHovered ? 'text-black/30' : 'text-black/10'
                    }`}
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                  {/* Category label */}
                  <div className={`mb-1 sm:mb-2 transition-all duration-300 ${
                    isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-60'
                  }`}>
                    <span className="text-blue-400 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-medium">
                      {category.id}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 
                    className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black transition-all duration-300 ${
                      isDark ? 'text-white' : 'text-black'
                    } ${isHovered ? 'translate-y-0' : 'translate-y-1'}`}
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {category.title}
                  </h3>

                  {/* Subtitle */}
                  <p className={`text-xs sm:text-sm mt-1 sm:mt-2 transition-all duration-500 ${
                    isDark ? 'text-white/50' : 'text-black/50'
                  } ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    {category.subtitle}
                  </p>

                  {/* View indicator */}
                  <div className={`mt-3 sm:mt-4 flex items-center gap-2 transition-all duration-500 ${
                    isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}>
                    <span className={`text-xs tracking-wider uppercase ${
                      isDark ? 'text-white' : 'text-black'
                    }`}>View Gallery</span>
                    <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Corner accent */}
                <div className={`absolute top-0 right-0 transition-all duration-500 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-6 sm:w-8 h-px bg-blue-500" />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-px h-6 sm:h-8 bg-blue-500" />
                </div>

                {/* Bottom line accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 origin-left ${
                  isHovered ? 'scale-x-100' : 'scale-x-0'
                }`} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom info */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 mt-12 sm:mt-16 flex justify-between items-center">
        <span className={`text-xs font-mono ${isDark ? 'text-white/30' : 'text-black/30'}`}>
          {categories.length} Categories
        </span>
        <span className={`text-xs tracking-wider uppercase ${isDark ? 'text-white/30' : 'text-black/30'}`}>
          Click to explore
        </span>
      </div>
    </section>
  );
};

export default memo(Portfolio);
