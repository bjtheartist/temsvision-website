
import React, { useState } from 'react';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const activeService = SERVICES.find(s => s.id === activeId) || SERVICES[0];

  return (
    <section id="services" className="py-32 px-6 md:px-12 bg-black border-b border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
        
        {/* Left Side: Dynamic Preview Image */}
        <div className="md:w-1/3 flex flex-col gap-6">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">Our<br/>Services</h2>
          <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-zinc-900 border border-white/5">
            <img 
              src={activeService.imageUrl} 
              alt={activeService.name}
              className="w-full h-full object-cover transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        </div>

        {/* Right Side: Accordion */}
        <div className="md:w-2/3 flex flex-col">
          {SERVICES.map((service) => {
            const isActive = activeId === service.id;
            return (
              <div 
                key={service.id} 
                onClick={() => setActiveId(service.id)}
                className={`border-b border-white/5 py-12 cursor-pointer transition-all duration-500 ${isActive ? 'pb-20' : ''}`}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-4xl font-black tracking-tighter uppercase">{service.name}</h3>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${isActive ? 'bg-orange-600 border-orange-600 text-white' : 'border-zinc-800 text-zinc-600'}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </div>
                </div>
                
                {isActive && (
                  <div className="flex flex-col md:flex-row justify-between items-end gap-12 animate-in fade-in slide-in-from-top-4">
                    <p className="text-zinc-400 text-lg max-w-md italic">
                      {service.description}
                    </p>
                    <div className="text-right">
                       <p className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-500 mb-2">Starting at</p>
                       <p className="text-5xl font-black tracking-tighter mb-6">{service.price}<span className="text-xs text-zinc-500 ml-1">/project</span></p>
                       <button className="px-8 py-3 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all shadow-xl">
                         Book a call
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
