import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const About: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger;
    
    if (gsap && ScrollTrigger) {
      gsap.fromTo('.about-content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#about',
            start: 'top 70%',
          }
        }
      );
    }
  }, []);

  return (
    <section id="about" className={`py-24 md:py-32 lg:py-40 transition-colors duration-500 ${
      theme === 'dark' ? 'bg-black' : 'bg-white'
    }`}>
      <div className="px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto">
        <div className="about-content grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column - Label */}
          <div className="lg:col-span-3">
            <p className={`text-[10px] font-medium tracking-[0.3em] uppercase ${
              theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
            }`}>
              About
            </p>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-9">
            <div className="max-w-3xl">
              <p 
                className={`text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.4] tracking-tight mb-12 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}
              >
                I'm Billy Ndizeye—a builder based in Chicago who bridges the worlds of economic development, technology, and design.
              </p>

              <p className={`text-base md:text-lg leading-relaxed mb-8 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                My background is unconventional. I came from economic development, worked at an incubator helping founders build their visions, and somewhere along the way, I taught myself to code. React, Next.js, HTML, CSS—I've built over 30 projects learning by doing.
              </p>

              <p className={`text-base md:text-lg leading-relaxed mb-8 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                I've also spent years behind a camera, which shaped how I see composition, light, and storytelling. Photography taught me that the best work comes from paying attention to details others overlook.
              </p>

              <p className={`text-base md:text-lg leading-relaxed mb-12 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                I'm drawn to data—not just collecting it, but understanding what it reveals about people and systems. Whether I'm designing an interface or analyzing community impact, I believe the best solutions come from listening to what the numbers and the people are telling us.
              </p>

              {/* Journey highlights instead of fake stats */}
              <div className={`pt-12 border-t ${
                theme === 'dark' ? 'border-white/10' : 'border-black/10'
              }`}>
                <p className={`text-[10px] font-medium tracking-[0.3em] uppercase mb-6 ${
                  theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                }`}>
                  Background
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Economic Development', 'Startup Incubator', 'Self-Taught Developer', 'Photography', 'Data & Analytics'].map((item) => (
                    <span 
                      key={item}
                      className={`px-4 py-2 text-sm rounded-full ${
                        theme === 'dark' 
                          ? 'bg-white/5 text-zinc-300 border border-white/10' 
                          : 'bg-black/5 text-zinc-700 border border-black/10'
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
