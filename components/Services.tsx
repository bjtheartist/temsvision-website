import React, { useState, useEffect } from 'react';
import { SERVICES } from '../constants';
import { useTheme } from '../context/ThemeContext';

const Services: React.FC = () => {
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const activeService = SERVICES.find(s => s.id === activeId) || SERVICES[0];
  const { theme } = useTheme();

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    if (!gsap) return;

    // Animate content when active service changes
    gsap.fromTo('.service-content',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );

    // Animate image
    gsap.fromTo('.service-image',
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
    );
  }, [activeId]);

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.fromTo('.services-header',
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '#services',
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      }
    );

    gsap.fromTo('.service-item',
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.services-list',
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
      }
    );
  }, []);

  return (
    <section 
      id="services" 
      className={`py-24 md:py-32 px-6 md:px-12 transition-colors duration-500 ${
        theme === 'dark' ? 'bg-black' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* Left Side: Title + Dynamic Preview Image */}
        <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8">
          <div className="services-header space-y-4">
            <div className={`flex items-center gap-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              <span className={`w-12 h-px ${theme === 'dark' ? 'bg-white/30' : 'bg-black/30'}`}></span>
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-60">What I Offer</span>
            </div>
            <h2 className={`text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}>
              Services
            </h2>
            <p className={`text-base md:text-lg max-w-md leading-relaxed ${
              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              Comprehensive design services tailored to bring your vision to life with precision and creativity.
            </p>
          </div>

          {/* Preview Image */}
          <div className={`relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ${
            theme === 'dark' ? 'bg-zinc-900' : 'bg-zinc-100'
          }`}>
            <img
              src={activeService.imageUrl}
              alt={activeService.name}
              loading="lazy"
              className="service-image w-full h-full object-cover transition-all duration-700 ease-out"
            />
            <div className={`absolute inset-0 ${
              theme === 'dark' 
                ? 'bg-gradient-to-t from-black/80 via-black/20 to-transparent' 
                : 'bg-gradient-to-t from-black/60 via-transparent to-transparent'
            }`}></div>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-white/80 text-xs font-bold tracking-widest uppercase">{activeService.name}</span>
              <p className="text-white text-2xl md:text-3xl font-black mt-1">{activeService.price}</p>
            </div>
          </div>
        </div>

        {/* Right Side: Accordion */}
        <div className="services-list lg:col-span-7 flex flex-col lg:pt-8">
          {SERVICES.map((service, index) => {
            const isActive = activeId === service.id;
            return (
              <div
                key={service.id}
                onClick={() => setActiveId(service.id)}
                className={`service-item border-b py-6 md:py-8 cursor-pointer transition-all duration-500 ${
                  isActive ? 'pb-8 md:pb-10' : ''
                } ${index === 0 ? 'border-t' : ''} ${
                  theme === 'dark' ? 'border-white/10' : 'border-black/10'
                }`}
              >
                <div className="flex justify-between items-center gap-4 mb-0">
                  <div className="flex items-center gap-4">
                    <span className={`text-sm font-mono ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                      0{index + 1}
                    </span>
                    <h3 className={`text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 ${
                      isActive 
                        ? theme === 'dark' ? 'text-white' : 'text-black'
                        : theme === 'dark' ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-400 hover:text-zinc-600'
                    }`}>
                      {service.name}
                    </h3>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 flex-shrink-0 ${
                    isActive 
                      ? theme === 'dark' 
                        ? 'bg-white border-white text-black rotate-45' 
                        : 'bg-black border-black text-white rotate-45'
                      : theme === 'dark'
                        ? 'border-zinc-700 text-zinc-500 hover:border-zinc-500'
                        : 'border-zinc-300 text-zinc-400 hover:border-zinc-400'
                  }`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14"/><path d="M5 12h14"/>
                    </svg>
                  </div>
                </div>

                {isActive && (
                  <div className="service-content mt-6 pl-12">
                    <p className={`text-base md:text-lg max-w-lg leading-relaxed mb-6 ${
                      theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                    }`}>
                      {service.description}
                    </p>
                    
                    {/* Features */}
                    {service.features && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {service.features.map((feature, i) => (
                          <span 
                            key={i} 
                            className={`px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase rounded-full ${
                              theme === 'dark' 
                                ? 'bg-white/5 text-white/70' 
                                : 'bg-black/5 text-black/70'
                            }`}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div>
                        <p className={`text-[10px] font-bold tracking-[0.3em] uppercase mb-1 ${
                          theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'
                        }`}>Starting at</p>
                        <p className={`text-3xl md:text-4xl font-black tracking-tight ${
                          theme === 'dark' ? 'text-white' : 'text-black'
                        }`}>
                          {service.price}
                        </p>
                      </div>
                      <button className={`px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg ${
                        theme === 'dark' 
                          ? 'bg-white text-black hover:bg-zinc-200' 
                          : 'bg-black text-white hover:bg-zinc-800'
                      }`}>
                        Get Started
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
