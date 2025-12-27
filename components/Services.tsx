
import React, { useState, useEffect } from 'react';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const activeService = SERVICES.find(s => s.id === activeId) || SERVICES[0];

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    if (!gsap) return;

    // Animate content when active service changes
    gsap.fromTo('.service-content',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [activeId]);

  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12 bg-black border-b border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start">

        {/* Left Side: Title + Dynamic Preview Image */}
        <div className="md:col-span-5 flex flex-col gap-6 md:gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-white">
              <span className="w-12 h-px bg-white/30"></span>
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-400">What I Offer</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              Featured<br/>Services
            </h2>
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl">
            <img
              src={activeService.imageUrl}
              alt={activeService.name}
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-white/60 text-xs font-black tracking-widest uppercase">{activeService.name}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Accordion */}
        <div className="md:col-span-7 flex flex-col md:pt-16">
          {SERVICES.map((service, index) => {
            const isActive = activeId === service.id;
            return (
              <div
                key={service.id}
                onClick={() => setActiveId(service.id)}
                className={`border-b border-white/10 py-6 md:py-8 cursor-pointer transition-all duration-500 ${isActive ? 'pb-8 md:pb-10' : ''} ${index === 0 ? 'border-t' : ''}`}
              >
                <div className="flex justify-between items-center gap-4 mb-0">
                  <div className="flex items-center gap-4">
                    <span className="text-zinc-600 text-sm font-mono">0{index + 1}</span>
                    <h3 className={`text-2xl md:text-3xl font-black tracking-tight uppercase transition-colors duration-300 ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
                      {service.name}
                    </h3>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 flex-shrink-0 ${isActive ? 'bg-white border-white text-black rotate-90' : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 12h14"/>
                      <path d="m12 5 7 7-7 7"/>
                    </svg>
                  </div>
                </div>

                {isActive && (
                  <div className="service-content mt-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-12 pl-10">
                    <p className="text-zinc-400 text-base md:text-lg max-w-sm leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex flex-col items-start md:items-end gap-4">
                       <div className="md:text-right">
                         <p className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-600 mb-1">Starting at</p>
                         <p className="text-3xl md:text-4xl font-black tracking-tighter text-white">
                           {service.price}
                           <span className="text-sm text-zinc-500 ml-1 font-medium">/project</span>
                         </p>
                       </div>
                       <button className="px-6 py-3 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all shadow-xl">
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
