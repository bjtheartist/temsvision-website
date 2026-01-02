import React, { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '../constants';
import { useTheme } from '../context/ThemeContext';

const Portfolio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<string>('ALL');
  const { theme } = useTheme();

  const categories = ['ALL', ...new Set(PROJECTS.map(p => p.category))];

  const filteredProjects = filter === 'ALL' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

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

    // Reset and animate projects
    gsap.set('.bento-project', { opacity: 1, y: 0 });

    gsap.fromTo('.bento-project',
      { y: 60, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.portfolio-grid',
          start: 'top 85%',
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
      }
    );

    // Animate section header
    gsap.fromTo('.portfolio-header',
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '#portfolio',
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      }
    );

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => clearTimeout(timer);
  }, [filter]);

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
    <section 
      id="portfolio" 
      ref={containerRef} 
      className={`py-24 md:py-32 px-6 md:px-12 relative overflow-hidden transition-colors duration-500 ${
        theme === 'dark' ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-black'
      }`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="portfolio-header flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8">
          <div className="space-y-4">
            <div className={`flex items-center gap-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              <span className={`w-12 h-px ${theme === 'dark' ? 'bg-white/30' : 'bg-black/30'}`}></span>
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-60">Selected Work</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              Featured<br/>Projects
            </h2>
          </div>
          <div className="max-w-sm md:text-right">
            <p className={`text-base font-medium leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              A curated collection of product design, web design, and brand identity projects.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-[10px] font-bold tracking-[0.15em] uppercase rounded-full transition-all duration-300 ${
                filter === cat
                  ? theme === 'dark'
                    ? 'bg-white text-black'
                    : 'bg-black text-white'
                  : theme === 'dark'
                    ? 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                    : 'bg-black/5 text-black/60 hover:bg-black/10 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="portfolio-grid grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[220px] md:auto-rows-[240px]">
          {filteredProjects.map((project, index) => {
            const isFlipped = flippedCards.has(project.id);
            return (
              <div
                key={project.id}
                onClick={() => toggleFlip(project.id)}
                className={`bento-project cursor-pointer ${getBentoClass(index)}`}
                style={{ perspective: '1000px' }}
              >
                <div
                  className="flip-card-inner relative w-full h-full transition-transform duration-700 ease-out"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front of Card */}
                  <div
                    className={`flip-card-front absolute inset-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group ${
                      theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
                    }`}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    {/* Image */}
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        loading="lazy"
                        className="project-image w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 transition-opacity duration-500 ${
                        theme === 'dark' 
                          ? 'bg-gradient-to-t from-black/90 via-black/40 to-transparent' 
                          : 'bg-gradient-to-t from-black/80 via-black/30 to-transparent'
                      }`}></div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-white/95 backdrop-blur-sm px-3 py-1.5 text-[9px] font-bold tracking-[0.15em] uppercase rounded-full text-black">
                        {project.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                      <h3 className="text-white text-lg md:text-xl font-bold tracking-tight mb-2">{project.title}</h3>
                      {project.tags && (
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-[9px] font-medium text-white/60 bg-white/10 px-2 py-0.5 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Flip Indicator */}
                    <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                        <path d="M3 3v5h5"/>
                      </svg>
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div
                    className={`flip-card-back absolute inset-0 rounded-2xl overflow-hidden p-6 md:p-8 flex flex-col justify-between shadow-2xl ${
                      theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
                    }`}
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div>
                      <span className={`inline-block px-3 py-1.5 text-[9px] font-bold tracking-[0.15em] uppercase rounded-full mb-4 ${
                        theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
                      }`}>
                        {project.category}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3">{project.title}</h3>
                      <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-black/70' : 'text-white/70'}`}>
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <button className={`flex items-center gap-2 text-xs font-bold tracking-wider uppercase transition-colors ${
                        theme === 'dark' ? 'text-black/60 hover:text-black' : 'text-white/60 hover:text-white'
                      }`}>
                        View Project
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                        </svg>
                      </button>
                      <span className={`text-[9px] font-bold tracking-wider uppercase ${
                        theme === 'dark' ? 'text-black/40' : 'text-white/40'
                      }`}>
                        Tap to flip
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="mt-12 flex justify-center">
          <button className={`group flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm tracking-wide uppercase transition-all duration-300 border-2 ${
            theme === 'dark'
              ? 'border-white/20 text-white hover:bg-white hover:text-black'
              : 'border-black/20 text-black hover:bg-black hover:text-white'
          }`}>
            View All Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
