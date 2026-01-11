import React, { useState, useCallback, memo } from 'react';
import { SERVICES } from '../constants';
import { useTheme } from '../context/ThemeContext';

const Services: React.FC = () => {
  const { isDark } = useTheme();
  const [activeService, setActiveService] = useState<string>(SERVICES[0]?.id || '');

  const handleMouseEnter = useCallback((id: string) => {
    setActiveService(id);
  }, []);

  return (
    <section id="services" className={`py-16 sm:py-24 md:py-32 ${
      isDark ? 'bg-slate-950' : 'bg-slate-50'
    }`}>
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <span className="text-blue-500 text-xs font-mono">03</span>
            <div className="w-8 sm:w-12 h-px bg-blue-500/50" />
          </div>
          <h2 
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight ${
              isDark ? 'text-white' : 'text-black'
            }`}
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Services
          </h2>
          <p className={`text-sm mt-3 sm:mt-4 max-w-md ${
            isDark ? 'text-white/40' : 'text-black/40'
          }`}>
            From intimate portraits to high-energy sports, I bring your vision to life with precision and artistry.
          </p>
        </div>

        {/* Services List */}
        <div className="services-list">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className={`service-item group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded ${
                isDark ? 'focus-visible:ring-offset-slate-950' : 'focus-visible:ring-offset-slate-50'
              }`}
              onMouseEnter={() => handleMouseEnter(service.id)}
              onMouseLeave={() => setActiveService('')}
              onFocus={() => handleMouseEnter(service.id)}
              onBlur={() => setActiveService('')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  // Scroll to contact section
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`${service.name} - ${service.description}`}
            >
              {/* Animated border */}
              <div className={`h-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
              
              <div className="py-6 sm:py-8 md:py-10 grid grid-cols-12 gap-2 sm:gap-4 items-start">
                {/* Number */}
                <div className="col-span-2 sm:col-span-1">
                  <span className={`text-xs sm:text-sm font-mono transition-all duration-500 ${
                    activeService === service.id
                      ? 'text-blue-500'
                      : isDark ? 'text-white/30' : 'text-black/30'
                  }`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Title */}
                <div className="col-span-10 sm:col-span-4">
                  <h3 
                    className={`text-xl sm:text-2xl md:text-3xl font-black tracking-tight transition-all duration-500 ${
                      activeService === service.id
                        ? isDark ? 'text-white translate-x-2' : 'text-black translate-x-2'
                        : isDark ? 'text-white/50' : 'text-black/50'
                    }`}
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {service.name}
                  </h3>
                </div>

                {/* Description */}
                <div className="col-span-12 sm:col-span-6 sm:pl-4 md:pl-8 mt-2 sm:mt-0">
                  <p className={`text-xs sm:text-sm md:text-base leading-relaxed max-w-lg transition-all duration-500 ${
                    activeService === service.id
                      ? isDark ? 'text-white/70 opacity-100' : 'text-black/70 opacity-100'
                      : isDark ? 'text-white/40 opacity-60' : 'text-black/40 opacity-60'
                  }`}>
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <div className={`flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4 transition-all duration-500 ${
                    activeService === service.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    {service.features.map((feature) => (
                      <span 
                        key={feature}
                        className={`px-2 sm:px-3 py-1 text-[10px] sm:text-xs rounded ${
                          isDark 
                            ? 'text-blue-400/80 bg-blue-400/10 border border-blue-400/20' 
                            : 'text-blue-600/80 bg-blue-600/10 border border-blue-600/20'
                        }`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className={`hidden sm:flex col-span-12 sm:col-span-1 justify-end items-center transition-all duration-300 ${
                  activeService === service.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    className="text-blue-500"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
          
          {/* Bottom border */}
          <div className={`h-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className={`text-sm mb-4 sm:mb-6 ${isDark ? 'text-white/40' : 'text-black/40'}`}>
            Ready to capture your story?
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-blue-500 text-white font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-blue-400 transition-colors duration-300 rounded-lg"
          >
            Book a Session
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default memo(Services);
