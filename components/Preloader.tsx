import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    
    // Simulate loading progress
    const duration = 2.5; // Total loading time in seconds
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const newProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(newProgress);
      
      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        // Start exit animation
        setTimeout(() => {
          setIsExiting(true);
          
          if (gsap) {
            const tl = gsap.timeline({
              onComplete: () => {
                setTimeout(onComplete, 100);
              }
            });
            
            tl.to('.preloader-text', {
              y: -100,
              opacity: 0,
              duration: 0.6,
              ease: 'power3.inOut'
            })
            .to('.preloader-line', {
              scaleX: 0,
              duration: 0.4,
              ease: 'power3.inOut'
            }, '-=0.3')
            .to('.preloader-container', {
              yPercent: -100,
              duration: 0.8,
              ease: 'power4.inOut'
            }, '-=0.2');
          } else {
            setTimeout(onComplete, 800);
          }
        }, 300);
      }
    };
    
    requestAnimationFrame(updateProgress);
  }, [onComplete]);

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    if (!gsap) return;

    // Entrance animation
    gsap.fromTo('.preloader-name span', 
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.05,
        ease: 'power3.out',
        delay: 0.2
      }
    );
    
    gsap.fromTo('.preloader-tagline',
      { opacity: 0 },
      { opacity: 1, duration: 0.6, delay: 0.8 }
    );
    
    gsap.fromTo('.preloader-progress',
      { opacity: 0 },
      { opacity: 1, duration: 0.4, delay: 1 }
    );
    
    gsap.fromTo('.preloader-line',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, delay: 0.6, ease: 'power2.out' }
    );
  }, []);

  const nameLetters = 'BILLY NDIZEYE'.split('');

  return (
    <div 
      className={`preloader-container fixed inset-0 z-[200] flex flex-col items-center justify-center ${
        theme === 'dark' ? 'bg-black' : 'bg-white'
      }`}
    >
      <div className="preloader-text flex flex-col items-center">
        {/* Name */}
        <h1 className="preloader-name overflow-hidden mb-4">
          <span className="flex">
            {nameLetters.map((letter, i) => (
              <span 
                key={i} 
                className={`inline-block text-[8vw] md:text-[5vw] font-black tracking-tight ${
                  letter === ' ' ? 'w-[2vw]' : ''
                } ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </span>
        </h1>
        
        {/* Line */}
        <div 
          className={`preloader-line w-24 h-px mb-6 origin-left ${
            theme === 'dark' ? 'bg-white/30' : 'bg-black/30'
          }`}
        />
        
        {/* Tagline - no label */}
        <p className={`preloader-tagline text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase mb-8 ${
          theme === 'dark' ? 'text-white/50' : 'text-black/50'
        }`}>
          Chicago, IL
        </p>
        
        {/* Progress */}
        <div className="preloader-progress flex items-center gap-4">
          <span className={`text-[10px] font-mono tracking-wider ${
            theme === 'dark' ? 'text-white/30' : 'text-black/30'
          }`}>
            LOADING
          </span>
          <span className={`text-sm font-mono tabular-nums ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            {progress.toString().padStart(3, '0')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
