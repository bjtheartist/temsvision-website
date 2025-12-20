
import React, { useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';

const Portfolio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.from('.project-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      y: 120,
      opacity: 0,
      stagger: 0.15,
      duration: 1.5,
      ease: 'expo.out'
    });
  }, []);

  return (
    <section ref={containerRef} className="py-40 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
          <div className="space-y-4">
             <div className="flex items-center gap-4 text-orange-600">
               <span className="w-12 h-px bg-current"></span>
               <span className="text-[10px] font-black tracking-[0.4em] uppercase">The Portfolio</span>
             </div>
             <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none">Selected<br/>Work</h2>
          </div>
          <div className="max-w-md text-right">
            <p className="text-zinc-400 text-lg font-medium leading-relaxed italic">
              A curated index of visual narratives, capturing the tension between high-fashion editorial and raw urban architecture.
            </p>
            <button className="mt-10 flex items-center gap-4 text-xs font-black tracking-widest ml-auto group uppercase">
              ALL PROJECTS 
              <span className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transition-all group-hover:bg-orange-600 group-hover:text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {PROJECTS.map((project) => (
            <div key={project.id} className="project-card group cursor-pointer">
              <div className="relative overflow-hidden aspect-[3/4] mb-8 bg-zinc-900 rounded-lg">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-black/80 backdrop-blur-xl px-5 py-2 text-[9px] font-black tracking-[0.3em] border border-white/10 uppercase rounded-full">
                    {project.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="text-3xl font-black tracking-tighter mb-4 uppercase group-hover:text-orange-600 transition-colors">{project.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-medium">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
