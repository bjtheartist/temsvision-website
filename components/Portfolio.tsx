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
      image: '/gallery/portrait-1.jpg',
      tags: ['CREATIVE', 'EDITORIAL']
    },
    { 
      id: 'SPORTS', 
      title: 'Sports Action', 
      subtitle: 'Dynamic athletic moments',
      image: '/gallery/sports-1.jpg',
      tags: ['ACTION', 'EVENTS']
    },
    { 
      id: 'FAMILY', 
      title: 'Maternity & Family', 
      subtitle: 'Celebrating new beginnings',
      image: '/gallery/maternity-1.jpg',
      tags: ['LIFESTYLE', 'INTIMATE']
    },
    { 
      id: 'B & W', 
      title: 'Black & White', 
      subtitle: 'Timeless monochrome',
      image: '/gallery/bw-1.jpg',
      tags: ['CLASSIC', 'ARTISTIC']
    },
  ];

  const handleMouseEnter = useCallback((id: string) => {
    setHoveredCategory(id);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCategory(null);
  }, []);

  return (
    <section id="gallery" className={`relative py-20 md:py-32 lg:py-40 ${
      isDark ? 'bg-black' : 'bg-[#f8f7f4]'
    }`}>
      {/* Section Header - Area 17 style */}
      <div className="px-6 md:px-12 lg:px-24 mb-16 md:mb-24">
        <div className="flex items-center gap-4 mb-6">
          <span className={`text-xs md:text-sm font-mono tracking-wider ${
            isDark ? 'text-blue-400' : 'text-blue-600'
          }`}>02</span>
          <div className={`flex-1 h-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 
              className={`text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight ${
                isDark ? 'text-white' : 'text-black'
              }`}
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Gallery
            </h2>
            <p className={`text-sm md:text-base mt-4 max-w-md font-light ${
              isDark ? 'text-white/40' : 'text-black/40'
            }`}>
              A curated collection of moments. Each frame tells a unique story.
            </p>
          </div>
          
          {/* View all link - Area 17 style */}
          <a 
            href="#gallery" 
            className={`group flex items-center gap-3 text-sm tracking-wider uppercase font-light transition-colors duration-300 ${
              isDark ? 'text-white/60 hover:text-blue-400' : 'text-black/60 hover:text-blue-600'
            }`}
          >
            <span>View All Work</span>
            <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
          </a>
        </div>
      </div>

      {/* Gallery Grid - Premium Beaucoup style */}
      <div className="px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {categories.map((category, index) => {
            const isHovered = hoveredCategory === category.id;
            
            return (
              <div
                key={category.id}
                className={`group relative aspect-[4/3] md:aspect-[16/10] overflow-hidden cursor-pointer transition-all duration-700 ease-out ${
                  isHovered ? 'z-10' : 'z-0'
                }`}
                onMouseEnter={() => handleMouseEnter(category.id)}
                onMouseLeave={handleMouseLeave}
                onFocus={() => handleMouseEnter(category.id)}
                onBlur={handleMouseLeave}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View ${category.title} gallery`}
              >
                {/* Background Image with premium zoom */}
                <div 
                  className={`absolute inset-0 transition-all duration-1000 ease-out ${
                    isHovered ? 'scale-110' : 'scale-100'
                  }`}
                  style={{ 
                    backgroundImage: `url(${category.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                
                {/* Premium gradient overlay */}
                <div className={`absolute inset-0 transition-all duration-700 ${
                  isDark 
                    ? 'bg-gradient-to-t from-black via-black/50 to-black/20'
                    : 'bg-gradient-to-t from-black/80 via-black/40 to-transparent'
                } ${isHovered ? 'opacity-90' : 'opacity-70'}`} />

                {/* Large background number */}
                <div className="absolute -top-4 -right-4 md:-top-8 md:-right-8 pointer-events-none">
                  <span 
                    className={`text-[120px] md:text-[180px] lg:text-[220px] font-black leading-none transition-all duration-700 ${
                      isHovered ? 'text-white/10' : 'text-white/5'
                    }`}
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Category tags - Beaucoup style */}
                <div className={`absolute top-4 md:top-6 left-4 md:left-6 flex flex-wrap gap-2 transition-all duration-500 ${
                  isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}>
                  {category.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 text-[9px] md:text-[10px] tracking-[0.2em] uppercase bg-white/10 backdrop-blur-sm text-white/80 border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  {/* Category ID */}
                  <div className={`mb-2 md:mb-3 transition-all duration-500 ${
                    isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-60'
                  }`}>
                    <span className="text-blue-400 text-[10px] md:text-xs tracking-[0.3em] uppercase font-medium">
                      {category.id}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 
                    className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white transition-all duration-500 ${
                      isHovered ? 'translate-y-0' : 'translate-y-1'
                    }`}
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {category.title}
                  </h3>

                  {/* Subtitle */}
                  <p className={`text-sm md:text-base mt-2 md:mt-3 text-white/60 font-light transition-all duration-700 ${
                    isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    {category.subtitle}
                  </p>

                  {/* View link with arrow */}
                  <div className={`mt-4 md:mt-6 flex items-center gap-3 transition-all duration-700 ${
                    isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}>
                    <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-white font-light">
                      Explore
                    </span>
                    <div className="w-8 md:w-12 h-px bg-gradient-to-r from-blue-400 to-cyan-400" />
                    <span className="text-blue-400 text-lg">→</span>
                  </div>
                </div>

                {/* Corner accents */}
                <div className={`absolute top-4 right-4 md:top-6 md:right-6 transition-all duration-500 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="w-8 md:w-12 h-px bg-white/40" />
                  <div className="w-px h-8 md:h-12 bg-white/40" />
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 transition-all duration-700 origin-left ${
                  isHovered ? 'scale-x-100' : 'scale-x-0'
                }`} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="px-6 md:px-12 lg:px-24 mt-16 md:mt-24 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <span className={`text-xs md:text-sm font-mono ${isDark ? 'text-white/30' : 'text-black/30'}`}>
            {categories.length} Collections
          </span>
          <div className={`w-px h-4 ${isDark ? 'bg-white/20' : 'bg-black/20'}`} />
          <span className={`text-xs md:text-sm font-light ${isDark ? 'text-white/30' : 'text-black/30'}`}>
            Updated 2025
          </span>
        </div>
        <span className={`text-xs tracking-[0.2em] uppercase font-light ${isDark ? 'text-white/30' : 'text-black/30'}`}>
          Hover to preview
        </span>
      </div>
    </section>
  );
};

export default memo(Portfolio);
