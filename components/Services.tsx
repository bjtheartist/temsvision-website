import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
}

const SERVICES_DATA: Service[] = [
  {
    id: 'product',
    number: '01',
    title: 'Product Design',
    description: 'End-to-end UX/UI design for web applications. From research and strategy to polished, production-ready interfaces.',
  },
  {
    id: 'web',
    number: '02',
    title: 'Web Design',
    description: 'Custom website design that combines stunning visuals with intuitive user experience. Responsive, accessible, and optimized.',
  },
  {
    id: 'brand',
    number: '03',
    title: 'Brand Identity',
    description: 'Comprehensive visual identity systems including logo design, typography, color palette, and brand guidelines.',
  },
  {
    id: 'data',
    number: '04',
    title: 'Data & Analytics',
    description: 'Turn complex data into clear insights. Interactive dashboards, visualizations, and analytics that help you make better decisions.',
  },
];

const Services: React.FC = () => {
  const [activeService, setActiveService] = useState<string>('product');
  const { theme } = useTheme();

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger;
    
    if (gsap && ScrollTrigger) {
      // Split and animate header text
      const headerTitle = document.querySelector('.services-header h2');
      if (headerTitle) {
        const text = headerTitle.textContent || '';
        headerTitle.innerHTML = text.split('').map(char => 
          `<span class="char inline-block" style="opacity: 0; transform: translateY(60px) rotateX(45deg);">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
        
        gsap.to('.services-header .char', {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.03,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#services',
            start: 'top 80%',
          }
        });
      }

      // Animate service items with line drawing effect
      gsap.fromTo('.service-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-list',
            start: 'top 80%',
          }
        }
      );

      // Animate the border lines
      gsap.fromTo('.service-line',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: '.services-list',
            start: 'top 80%',
          }
        }
      );
    }
  }, []);

  return (
    <section id="services" className={`py-24 md:py-32 lg:py-40 transition-colors duration-500 ${
      theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-50'
    }`}>
      <div className="px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="services-header mb-16 md:mb-20" style={{ perspective: '1000px' }}>
          <h2 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
            style={{ fontFamily: "'Syne', sans-serif", transformStyle: 'preserve-3d' }}
          >
            Services
          </h2>
        </div>

        {/* Services List */}
        <div className="services-list">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              data-cursor="link"
              className="service-item group cursor-pointer"
              onMouseEnter={() => setActiveService(service.id)}
            >
              {/* Animated border */}
              <div className={`service-line h-px ${
                theme === 'dark' ? 'bg-white/10' : 'bg-black/10'
              }`} />
              
              <div className="py-8 md:py-10 grid grid-cols-12 gap-4 items-start">
                {/* Number */}
                <div className="col-span-2 md:col-span-1">
                  <span className={`text-[11px] font-medium tracking-wider transition-all duration-500 ${
                    activeService === service.id
                      ? theme === 'dark' ? 'text-white' : 'text-black'
                      : theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'
                  }`}>
                    {service.number}
                  </span>
                </div>

                {/* Title */}
                <div className="col-span-10 md:col-span-4">
                  <h3 
                    className={`text-xl md:text-2xl font-bold tracking-tight transition-all duration-500 ${
                      activeService === service.id
                        ? theme === 'dark' ? 'text-white translate-x-2' : 'text-black translate-x-2'
                        : theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                    }`}
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="col-span-12 md:col-span-7 md:pl-8">
                  <p className={`text-sm md:text-base leading-relaxed max-w-lg transition-all duration-500 ${
                    activeService === service.id
                      ? theme === 'dark' ? 'text-zinc-400 opacity-100' : 'text-zinc-600 opacity-100'
                      : theme === 'dark' ? 'text-zinc-600 opacity-60' : 'text-zinc-400 opacity-60'
                  }`}>
                    {service.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className={`hidden md:flex col-span-12 md:col-span-1 justify-end items-center transition-all duration-300 ${
                  activeService === service.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    className={theme === 'dark' ? 'text-white' : 'text-black'}
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
          
          {/* Bottom border */}
          <div className={`service-line h-px ${
            theme === 'dark' ? 'bg-white/10' : 'bg-black/10'
          }`} />
        </div>
      </div>
    </section>
  );
};

export default Services;
