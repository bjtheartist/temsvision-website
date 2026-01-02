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
    description: 'End-to-end UX/UI design for web and mobile applications. From research and strategy to polished, production-ready interfaces.',
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
    id: 'mobile',
    number: '04',
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile app design with focus on usability, performance, and delightful interactions.',
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
      gsap.fromTo('.services-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#services',
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.service-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
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
        <div className="services-header mb-16 md:mb-20">
          <h2 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Services
          </h2>
        </div>

        {/* Services List */}
        <div className="services-list">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className={`service-item border-t transition-colors duration-300 ${
                theme === 'dark' ? 'border-white/10' : 'border-black/10'
              }`}
              onMouseEnter={() => setActiveService(service.id)}
            >
              <div className="py-8 md:py-10 grid grid-cols-12 gap-4 items-start">
                {/* Number */}
                <div className="col-span-2 md:col-span-1">
                  <span className={`text-[11px] font-medium tracking-wider ${
                    theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'
                  }`}>
                    {service.number}
                  </span>
                </div>

                {/* Title */}
                <div className="col-span-10 md:col-span-4">
                  <h3 
                    className={`text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 ${
                      activeService === service.id
                        ? theme === 'dark' ? 'text-white' : 'text-black'
                        : theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                    }`}
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="col-span-12 md:col-span-7 md:pl-8">
                  <p className={`text-sm md:text-base leading-relaxed max-w-lg transition-colors duration-300 ${
                    activeService === service.id
                      ? theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                      : theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'
                  }`}>
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Bottom border */}
          <div className={`border-t ${
            theme === 'dark' ? 'border-white/10' : 'border-black/10'
          }`} />
        </div>
      </div>
    </section>
  );
};

export default Services;
