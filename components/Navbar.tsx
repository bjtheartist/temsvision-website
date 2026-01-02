import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const menuItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    if (!gsap) return;

    // Logo magnetic effect
    const logo = logoRef.current;
    if (logo) {
      const onLogoMove = (e: MouseEvent) => {
        const rect = logo.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(logo, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out"
        });
      };
      const onLogoLeave = () => {
        gsap.to(logo, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      };
      logo.addEventListener('mousemove', onLogoMove);
      logo.addEventListener('mouseleave', onLogoLeave);
    }

    // Menu items hover animations
    menuItemsRef.current.forEach((item) => {
      if (!item) return;

      const onEnter = () => {
        gsap.to(item, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const onLeave = () => {
        gsap.to(item, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      item.addEventListener('mouseenter', onEnter);
      item.addEventListener('mouseleave', onLeave);
    });

    return () => {
      if (logo) {
        logo.removeEventListener('mousemove', () => {});
        logo.removeEventListener('mouseleave', () => {});
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setMenuRef = (index: number) => (el: HTMLButtonElement | null) => {
    menuItemsRef.current[index] = el;
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-6 py-6 md:px-12 transition-all duration-500 ${
        isScrolled 
          ? `${theme === 'dark' ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-xl border-b ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}` 
          : ''
      }`}>
        <div
          ref={logoRef}
          onClick={scrollToTop}
          className={`text-lg font-black tracking-tighter uppercase cursor-pointer transition-colors duration-300 ${
            theme === 'dark' ? 'text-white hover:text-zinc-300' : 'text-black hover:text-zinc-600'
          }`}
        >
          <span className="hidden md:inline">BJTHEARTIST</span>
          <span className="md:hidden">BJ.</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          <button
            ref={setMenuRef(0)}
            onClick={() => scrollToSection('portfolio')}
            className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 relative group ${
              theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
            }`}
          >
            Work
            <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
              theme === 'dark' ? 'bg-white' : 'bg-black'
            }`}></span>
          </button>
          <button
            ref={setMenuRef(1)}
            onClick={() => scrollToSection('services')}
            className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 relative group ${
              theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
            }`}
          >
            Services
            <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
              theme === 'dark' ? 'bg-white' : 'bg-black'
            }`}></span>
          </button>
          <button
            ref={setMenuRef(2)}
            onClick={() => scrollToSection('about')}
            className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 relative group ${
              theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
            }`}
          >
            About
            <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
              theme === 'dark' ? 'bg-white' : 'bg-black'
            }`}></span>
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className={`flex items-center gap-3 text-[11px] font-bold tracking-[0.15em] uppercase group ml-4 px-5 py-2.5 rounded-full transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-white text-black hover:bg-zinc-200' 
                : 'bg-black text-white hover:bg-zinc-800'
            }`}
          >
            Let's Talk
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}
        >
          <span className={`w-6 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''} ${
            theme === 'dark' ? 'bg-white' : 'bg-black'
          }`}></span>
          <span className={`w-6 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''} ${
            theme === 'dark' ? 'bg-white' : 'bg-black'
          }`}></span>
          <span className={`w-6 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''} ${
            theme === 'dark' ? 'bg-white' : 'bg-black'
          }`}></span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[99] transition-all duration-500 md:hidden ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      } ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <button
            onClick={() => scrollToSection('portfolio')}
            className={`text-3xl font-black tracking-tight uppercase ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            Work
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className={`text-3xl font-black tracking-tight uppercase ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className={`text-3xl font-black tracking-tight uppercase ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className={`text-3xl font-black tracking-tight uppercase ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            Contact
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
