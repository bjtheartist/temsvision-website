import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';
import { useTheme } from '../context/ThemeContext';
import { Project } from '../types';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [clickedCardRect, setClickedCardRect] = useState<DOMRect | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const categories = ['all', 'product design', 'web design'];
  
  const filteredProjects = filter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category.toLowerCase() === filter);

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger;
    
    if (gsap && ScrollTrigger) {
      // Header animation with text split
      const headerTitle = document.querySelector('.portfolio-header h2');
      if (headerTitle) {
        const text = headerTitle.textContent || '';
        headerTitle.innerHTML = text.split('').map(char => 
          `<span class="char inline-block" style="opacity: 0; transform: translateY(60px);">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
        
        gsap.to('.portfolio-header .char', {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.02,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#portfolio',
            start: 'top 80%',
          }
        });
      }

      gsap.fromTo('.portfolio-item',
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.portfolio-grid',
            start: 'top 85%',
          }
        }
      );
    }
  }, [filter]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  // FLIP animation for opening modal
  const openModal = (project: Project, e: React.MouseEvent<HTMLElement>) => {
    // @ts-ignore
    const gsap = window.gsap;
    if (!gsap) {
      setSelectedProject(project);
      return;
    }

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    setClickedCardRect(rect);
    setSelectedProject(project);
    setIsAnimating(true);

    // Wait for modal to render
    requestAnimationFrame(() => {
      const modal = modalRef.current;
      if (!modal) return;

      const modalRect = modal.getBoundingClientRect();
      
      // Calculate the transform needed to position modal at card location
      const scaleX = rect.width / modalRect.width;
      const scaleY = rect.height / modalRect.height;
      const translateX = rect.left - modalRect.left + (rect.width - modalRect.width) / 2;
      const translateY = rect.top - modalRect.top + (rect.height - modalRect.height) / 2;

      // Set initial state (at card position)
      gsap.set(modal, {
        x: translateX,
        y: translateY,
        scaleX: scaleX,
        scaleY: scaleY,
        opacity: 0,
        borderRadius: '8px',
      });

      gsap.set('.modal-backdrop', { opacity: 0 });
      gsap.set('.modal-content', { opacity: 0, y: 30 });

      // Animate to final position
      const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false)
      });

      tl.to(modal, {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      })
      .to('.modal-backdrop', {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      }, 0)
      .to('.modal-content', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, 0.3);
    });
  };

  // FLIP animation for closing modal
  const closeModal = () => {
    // @ts-ignore
    const gsap = window.gsap;
    if (!gsap || !clickedCardRect || !modalRef.current) {
      setSelectedProject(null);
      setClickedCardRect(null);
      return;
    }

    const modal = modalRef.current;
    const modalRect = modal.getBoundingClientRect();
    
    const scaleX = clickedCardRect.width / modalRect.width;
    const scaleY = clickedCardRect.height / modalRect.height;
    const translateX = clickedCardRect.left - modalRect.left + (clickedCardRect.width - modalRect.width) / 2;
    const translateY = clickedCardRect.top - modalRect.top + (clickedCardRect.height - modalRect.height) / 2;

    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedProject(null);
        setClickedCardRect(null);
        setIsAnimating(false);
      }
    });

    tl.to('.modal-content', {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: 'power2.in',
    })
    .to('.modal-backdrop', {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    }, 0)
    .to(modal, {
      x: translateX,
      y: translateY,
      scaleX: scaleX,
      scaleY: scaleY,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in',
    }, 0.1);
  };

  return (
    <>
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
                    data-magnetic
                    data-cursor="link"
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
                data-cursor="project"
                className={`portfolio-item group relative overflow-hidden cursor-pointer ${
                  index === 0 ? 'md:col-span-2' : ''
                }`}
                onClick={(e) => openModal(project, e)}
              >
                {/* Image Container */}
                <div className={`relative overflow-hidden rounded-lg ${
                  index === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'
                }`}>
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Overlay */}
                  <div className={`absolute inset-0 transition-opacity duration-500 ${
                    theme === 'dark' 
                      ? 'bg-black/40 group-hover:bg-black/60' 
                      : 'bg-black/20 group-hover:bg-black/40'
                  }`} />
                  
                  {/* Category */}
                  <div className="absolute top-6 left-6">
                    <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-white/80">
                      {project.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 
                      className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-3 text-white"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {project.title}
                    </h3>
                    
                    <p className="text-sm leading-relaxed max-w-lg opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-white/80">
                      {project.description}
                    </p>

                    {/* Tools tags */}
                    {project.tools && (
                      <div className="flex flex-wrap gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        {project.tools.slice(0, 4).map((tool) => (
                          <span 
                            key={tool}
                            className="px-2 py-1 text-[10px] font-medium tracking-wide bg-white/20 text-white rounded"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal with FLIP Animation */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className={`modal-backdrop absolute inset-0 ${
            theme === 'dark' ? 'bg-black/90' : 'bg-white/95'
          } backdrop-blur-sm`} />
          
          {/* Modal Content */}
          <div 
            ref={modalRef}
            className={`relative w-full max-w-5xl max-h-[90vh] rounded-lg ${
              theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
            } shadow-2xl overflow-hidden`}
            style={{ transformOrigin: 'center center' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Scrollable inner container */}
            <div 
              className="modal-content overflow-y-auto max-h-[90vh] overscroll-contain"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                data-cursor="link"
                className={`absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                  theme === 'dark' 
                    ? 'bg-white/10 hover:bg-white/20 text-white' 
                    : 'bg-black/5 hover:bg-black/10 text-black'
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>

              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover object-top"
                />
                <div className={`absolute inset-0 ${
                  theme === 'dark' ? 'bg-gradient-to-t from-zinc-900 via-transparent' : 'bg-gradient-to-t from-white via-transparent'
                }`} />
              </div>

              {/* Project Details */}
              <div className="p-6 md:p-10">
                {/* Header */}
                <div className="mb-8">
                  <span className={`text-[10px] font-medium tracking-[0.2em] uppercase ${
                    theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                  }`}>
                    {selectedProject.category} {selectedProject.year && `• ${selectedProject.year}`}
                  </span>
                  <h3 
                    className={`text-3xl md:text-4xl font-bold tracking-tight mt-2 ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {selectedProject.title}
                  </h3>
                </div>

                {/* Problem & Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {selectedProject.problem && (
                    <div>
                      <h4 className={`text-[10px] font-medium tracking-[0.2em] uppercase mb-3 ${
                        theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                      }`}>
                        The Problem
                      </h4>
                      <p className={`text-base leading-relaxed ${
                        theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
                      }`}>
                        {selectedProject.problem}
                      </p>
                    </div>
                  )}
                  
                  {selectedProject.solution && (
                    <div>
                      <h4 className={`text-[10px] font-medium tracking-[0.2em] uppercase mb-3 ${
                        theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                      }`}>
                        The Solution
                      </h4>
                      <p className={`text-base leading-relaxed ${
                        theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
                      }`}>
                        {selectedProject.solution}
                      </p>
                    </div>
                  )}
                </div>

                {/* Tools */}
                {selectedProject.tools && selectedProject.tools.length > 0 && (
                  <div className="mb-8">
                    <h4 className={`text-[10px] font-medium tracking-[0.2em] uppercase mb-4 ${
                      theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                    }`}>
                      Built With
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tools.map((tool) => (
                        <span 
                          key={tool}
                          className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                            theme === 'dark' 
                              ? 'bg-white/10 text-zinc-300' 
                              : 'bg-black/5 text-zinc-700'
                          }`}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Links */}
                <div className={`flex flex-wrap gap-4 pt-6 border-t ${
                  theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'
                }`}>
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-magnetic
                      data-cursor="link"
                      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                        theme === 'dark' 
                          ? 'bg-white text-black hover:bg-zinc-200' 
                          : 'bg-black text-white hover:bg-zinc-800'
                      }`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      View on GitHub
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-magnetic
                      data-cursor="link"
                      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                        theme === 'dark' 
                          ? 'border border-white/20 text-white hover:bg-white/10' 
                          : 'border border-black/20 text-black hover:bg-black/5'
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                      </svg>
                      View Live Site
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;
