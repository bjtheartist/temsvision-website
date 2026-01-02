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
                I'm Billy Ndizeye, a product designer based in Chicago with a passion for creating digital experiences that are both beautiful and functional.
              </p>

              <p className={`text-base md:text-lg leading-relaxed mb-8 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                With over 7 years of experience, I've helped startups and established brands bring their visions to life. My approach combines strategic thinking with meticulous attention to detail.
              </p>

              <p className={`text-base md:text-lg leading-relaxed mb-12 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                I believe that great design isn't just about aesthetics—it's about solving real problems and creating meaningful connections between products and people.
              </p>

              {/* Stats */}
              <div className={`flex flex-wrap gap-12 md:gap-16 pt-12 border-t ${
                theme === 'dark' ? 'border-white/10' : 'border-black/10'
              }`}>
                <div>
                  <p 
                    className={`text-4xl md:text-5xl font-bold tracking-tight mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    7+
                  </p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                  }`}>
                    Years Experience
                  </p>
                </div>
                <div>
                  <p 
                    className={`text-4xl md:text-5xl font-bold tracking-tight mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    50+
                  </p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                  }`}>
                    Projects Completed
                  </p>
                </div>
                <div>
                  <p 
                    className={`text-4xl md:text-5xl font-bold tracking-tight mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    30+
                  </p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                  }`}>
                    Happy Clients
                  </p>
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
