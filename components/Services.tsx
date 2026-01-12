import React, { useState, useCallback, memo } from 'react';
import { SERVICES } from '../constants';
import { useTheme } from '../context/ThemeContext';

const Services: React.FC = () => {
  const { isDark } = useTheme();
  const [activeService, setActiveService] = useState<string>('');

  const handleMouseEnter = useCallback((id: string) => {
    setActiveService(id);
  }, []);

  return (
    <section id="services" className={`relative py-20 md:py-32 lg:py-40 ${
      isDark ? 'bg-[#0a0a0a]' : 'bg-white'
    }`}>
      <div className="px-6 md:px-12 lg:px-24">
        {/* Section Header - Area 17 style */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-6">
            <span className={`text-xs md:text-sm font-mono tracking-wider ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}>03</span>
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
                Services
              </h2>
              <p className={`text-sm md:text-base mt-4 max-w-md font-light ${
                isDark ? 'text-white/40' : 'text-black/40'
              }`}>
                Professional photography services tailored to capture your unique story with intention and artistry.
              </p>
            </div>
          </div>
        </div>

        {/* Services List - Premium hover effect */}
        <div className="space-y-0">
          {SERVICES.map((service, index) => {
            const isActive = activeService === service.id;
            
            return (
              <div
                key={service.id}
                className={`group relative border-t transition-all duration-500 ${
                  isDark ? 'border-white/10' : 'border-black/10'
                } ${index === SERVICES.length - 1 ? isDark ? 'border-b border-white/10' : 'border-b border-black/10' : ''}`}
                onMouseEnter={() => handleMouseEnter(service.id)}
                onMouseLeave={() => setActiveService('')}
                onFocus={() => handleMouseEnter(service.id)}
                onBlur={() => setActiveService('')}
                role="button"
                tabIndex={0}
                aria-label={`${service.name} - ${service.description}`}
              >
                {/* Background highlight */}
                <div className={`absolute inset-0 transition-all duration-500 ${
                  isDark ? 'bg-white/5' : 'bg-blue-50'
                } ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                
                <div className="relative py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">
                  {/* Left side */}
                  <div className="flex items-start md:items-center gap-6 md:gap-8">
                    {/* Number */}
                    <span className={`text-xs md:text-sm font-mono transition-colors duration-300 ${
                      isActive 
                        ? isDark ? 'text-blue-400' : 'text-blue-600'
                        : isDark ? 'text-white/30' : 'text-black/30'
                    }`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    
                    {/* Title */}
                    <h3 
                      className={`text-2xl md:text-3xl lg:text-4xl font-black transition-all duration-300 ${
                        isActive
                          ? isDark ? 'text-white translate-x-2' : 'text-black translate-x-2'
                          : isDark ? 'text-white/60' : 'text-black/60'
                      }`}
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {service.name}
                    </h3>
                  </div>
                  
                  {/* Right side */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12 pl-14 md:pl-0">
                    {/* Description */}
                    <p className={`text-sm md:text-base font-light max-w-sm transition-all duration-500 ${
                      isDark ? 'text-white/50' : 'text-black/50'
                    } ${isActive ? 'opacity-100 translate-x-0' : 'opacity-60 md:opacity-0 md:-translate-x-4'}`}>
                      {service.description}
                    </p>
                    
                    {/* Features - show on hover */}
                    <div className={`flex flex-wrap gap-2 transition-all duration-500 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}>
                      {service.features.slice(0, 3).map((feature) => (
                        <span 
                          key={feature}
                          className={`px-3 py-1 text-[10px] tracking-wider uppercase ${
                            isDark 
                              ? 'text-blue-400/80 bg-blue-400/10 border border-blue-400/20' 
                              : 'text-blue-600/80 bg-blue-600/10 border border-blue-600/20'
                          }`}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    {/* Arrow */}
                    <div className={`hidden md:flex items-center gap-2 transition-all duration-500 ${
                      isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}>
                      <div className={`w-8 md:w-12 h-px ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`} />
                      <span className={`text-lg ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>→</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 md:mt-24 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className={`text-sm md:text-base font-light max-w-md ${
            isDark ? 'text-white/40' : 'text-black/40'
          }`}>
            Have a specific project in mind? Let's discuss how we can bring your vision to life.
          </p>
          
          <a 
            href="#contact"
            className={`group flex items-center gap-3 px-6 py-3 text-sm tracking-[0.2em] uppercase font-light transition-all duration-300 ${
              isDark 
                ? 'bg-white text-black hover:bg-blue-400' 
                : 'bg-black text-white hover:bg-blue-600'
            }`}
          >
            <span>Book a Session</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default memo(Services);
