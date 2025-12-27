
import React, { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '../constants';

const Portfolio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    // Make sure all projects are visible first
    gsap.set('.bento-project', { opacity: 1, y: 0 });

    // Staggered entrance animation for bento items
    gsap.fromTo('.bento-project',
      { y: 60, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.portfolio-grid',
          start: 'top 85%',
        },
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 1,
        ease: 'power3.out'
      }
    );

    // Parallax effect on project images
    const projectImages = document.querySelectorAll('.project-image');
    projectImages.forEach((img: any, index) => {
      const speed = (index % 2 === 0) ? 20 : -20;
      gsap.to(img, {
        y: speed,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Refresh ScrollTrigger after a short delay
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Define bento grid layout sizes
  const getBentoClass = (index: number) => {
    const layouts = [
      'md:col-span-2 md:row-span-2', // Large featured
      'md:col-span-1 md:row-span-1', // Small
      'md:col-span-1 md:row-span-2', // Tall
      'md:col-span-1 md:row-span-1', // Small
      'md:col-span-2 md:row-span-1', // Wide
      'md:col-span-1 md:row-span-1', // Small
      'md:col-span-1 md:row-span-2', // Tall
      'md:col-span-1 md:row-span-1', // Small
    ];
    return layouts[index % layouts.length];
  };

  return (
    <section ref={containerRef} className="py-20 md:py-32 px-6 md:px-12 bg-white text-black relative overflow-hidden">
      {/* Roadmap Parallax Line */}
      <div className="absolute top-0 left-[50%] w-px h-[120%] bg-gradient-to-b from-black/10 via-black/5 to-transparent z-0 roadmap-line" data-speed="1.2"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
          <div className="space-y-4">
             <div className="flex items-center gap-4 text-black">
               <span className="w-12 h-px bg-black"></span>
               <span className="text-[10px] font-black tracking-[0.4em] uppercase">The Portfolio</span>
             </div>
             <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none">Selected<br/>Work</h2>
          </div>
          <div className="max-w-sm md:text-right">
            <p className="text-zinc-600 text-base font-medium leading-relaxed">
              A curated collection of projects spanning product design, photography, and brand identity.
            </p>
            <p className="text-zinc-400 text-sm mt-2 italic">Click cards to flip and see details</p>
            <button className="mt-6 flex items-center gap-3 text-xs font-black tracking-widest md:ml-auto group uppercase">
              VIEW ALL
              <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center transition-all group-hover:bg-zinc-800 group-hover:scale-110">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </span>
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="portfolio-grid grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[200px] md:auto-rows-[220px]">
          {PROJECTS.map((project, index) => {
            const isFlipped = flippedCards.has(project.id);
            return (
              <div
                key={project.id}
                onClick={() => toggleFlip(project.id)}
                className={`bento-project cursor-pointer ${getBentoClass(index)}`}
                style={{ perspective: '1000px' }}
              >
                <div
                  className={`flip-card-inner relative w-full h-full transition-transform duration-700 ease-out`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front of Card */}
                  <div
                    className="flip-card-front absolute inset-0 rounded-2xl overflow-hidden bg-zinc-100 shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    {/* Image */}
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        loading="lazy"
                        className="project-image w-full h-full object-cover transition-all duration-700 hover:scale-110"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60"></div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[8px] font-black tracking-[0.2em] uppercase rounded-full text-black border border-black/5">
                        {project.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                      <h3 className="text-white text-lg md:text-xl font-black tracking-tight mb-2 uppercase drop-shadow-lg">{project.title}</h3>
                    </div>

                    {/* Flip Indicator */}
                    <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                        <path d="M3 3v5h5"/>
                      </svg>
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div
                    className="flip-card-back absolute inset-0 rounded-2xl overflow-hidden bg-black text-white p-6 md:p-8 flex flex-col justify-between shadow-2xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    {/* Category */}
                    <div>
                      <span className="inline-block bg-white text-black px-3 py-1.5 text-[8px] font-black tracking-[0.2em] uppercase rounded-full mb-4">
                        {project.category}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-4 uppercase">{project.title}</h3>
                      <p className="text-white/70 text-sm md:text-base leading-relaxed">{project.description}</p>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between mt-4">
                      <button className="flex items-center gap-2 text-xs font-black tracking-widest uppercase text-white/60 hover:text-white transition-colors">
                        View Project
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                        </svg>
                      </button>
                      <span className="text-[10px] font-black tracking-widest uppercase text-white/40">
                        Tap to flip back
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
