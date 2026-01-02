import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { useTheme } from '../context/ThemeContext';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const { theme } = useTheme();

  const categories = ['all', 'product design', 'web design', 'mobile app', 'branding'];
  
  const filteredProjects = filter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category.toLowerCase() === filter);

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger;
    
    if (gsap && ScrollTrigger) {
      gsap.fromTo('.portfolio-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#portfolio',
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.portfolio-item',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.portfolio-grid',
            start: 'top 80%',
          }
        }
      );
    }
  }, [filter]);

  return (
    <section id="portfolio" className={`py-24 md:py-32 lg:py-40 transition-colors duration-500 ${
      theme === 'dark' ? 'bg-black' : 'bg-white'
    }`}>
      <div className="px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="portfolio-header mb-16 md:mb-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <h2 
                className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Selected Work
              </h2>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 text-[11px] font-medium tracking-wide capitalize transition-all duration-300 ${
                    filter === cat
                      ? theme === 'dark' 
                        ? 'text-white' 
                        : 'text-black'
                      : theme === 'dark'
                        ? 'text-zinc-600 hover:text-zinc-400'
                        : 'text-zinc-400 hover:text-zinc-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {filteredProjects.map((project, index) => (
            <article 
              key={project.id}
              className={`portfolio-item group relative overflow-hidden cursor-pointer ${
                index === 0 ? 'md:col-span-2' : ''
              }`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Image Container */}
              <div className={`relative overflow-hidden ${
                index === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'
              }`}>
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${
                  theme === 'dark' 
                    ? 'bg-black/30 group-hover:bg-black/50' 
                    : 'bg-white/10 group-hover:bg-white/30'
                }`} />
                
                {/* Category */}
                <div className="absolute top-6 left-6">
                  <span className={`text-[10px] font-medium tracking-[0.15em] uppercase ${
                    theme === 'dark' ? 'text-white/70' : 'text-white/90'
                  }`}>
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 
                    className={`text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-3 text-white`}
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {project.title}
                  </h3>
                  
                  <p className={`text-sm leading-relaxed max-w-lg opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-white/80`}>
                    {project.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className={`absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 ${
                  theme === 'dark' ? 'bg-white text-black' : 'bg-white text-black'
                }`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
