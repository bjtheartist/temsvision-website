import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { SKILLS } from '../constants';

const About: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.fromTo('.about-content',
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '#about',
          start: 'top 75%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      }
    );

    gsap.fromTo('.about-image',
      { y: 50, opacity: 0, scale: 0.95 },
      {
        scrollTrigger: {
          trigger: '#about',
          start: 'top 75%',
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
      }
    );

    gsap.fromTo('.skill-tag',
      { y: 20, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.skills-container',
          start: 'top 85%',
        },
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power3.out'
      }
    );
  }, []);

  return (
    <section 
      id="about" 
      className={`py-24 md:py-32 px-6 md:px-12 transition-colors duration-500 ${
        theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-50'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Side */}
          <div className="about-image relative order-2 lg:order-1">
            <div className={`relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ${
              theme === 'dark' ? 'bg-zinc-900' : 'bg-zinc-200'
            }`}>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                alt="Billy Ndizeye - Product Designer"
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-t from-black/40 to-transparent' 
                  : 'bg-gradient-to-t from-black/20 to-transparent'
              }`}></div>
            </div>
            
            {/* Floating Stats Card */}
            <div className={`absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 p-6 rounded-2xl shadow-2xl ${
              theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
            }`}>
              <div className="text-4xl md:text-5xl font-black">7+</div>
              <div className="text-xs font-bold tracking-wider uppercase opacity-60">Years Experience</div>
            </div>
          </div>

          {/* Content Side */}
          <div className="about-content order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <div className={`flex items-center gap-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                <span className={`w-12 h-px ${theme === 'dark' ? 'bg-white/30' : 'bg-black/30'}`}></span>
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-60">About Me</span>
              </div>
              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                Designing<br/>Products That<br/>
                <span className={theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}>Matter</span>
              </h2>
            </div>

            <div className={`space-y-4 text-base md:text-lg leading-relaxed ${
              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              <p>
                I'm Billy Ndizeye, a product designer based in Chicago with a passion for creating 
                digital experiences that are both beautiful and functional. With over 7 years of 
                experience, I've helped startups and established brands bring their visions to life.
              </p>
              <p>
                My approach combines strategic thinking with meticulous attention to detail. 
                I believe that great design isn't just about aesthetics—it's about solving real 
                problems and creating meaningful connections between products and people.
              </p>
            </div>

            {/* Skills */}
            <div className="skills-container space-y-4">
              <h3 className={`text-sm font-bold tracking-wider uppercase ${
                theme === 'dark' ? 'text-white/60' : 'text-black/60'
              }`}>
                Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill, index) => (
                  <span 
                    key={index}
                    className={`skill-tag px-4 py-2 text-xs font-bold tracking-wider rounded-full transition-all duration-300 hover:scale-105 ${
                      theme === 'dark' 
                        ? 'bg-white/5 text-white/80 hover:bg-white/10' 
                        : 'bg-black/5 text-black/80 hover:bg-black/10'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className={`group flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-sm tracking-wide uppercase transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-white text-black hover:bg-zinc-200'
                    : 'bg-black text-white hover:bg-zinc-800'
                }`}
              >
                Let's Work Together
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </button>
              <a 
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-sm tracking-wide uppercase border-2 transition-all duration-300 ${
                  theme === 'dark'
                    ? 'border-white/20 text-white hover:bg-white/10'
                    : 'border-black/20 text-black hover:bg-black/10'
                }`}
              >
                Download CV
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
