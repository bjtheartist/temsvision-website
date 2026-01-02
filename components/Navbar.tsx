import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? theme === 'dark' 
            ? 'bg-black/90 backdrop-blur-md' 
            : 'bg-white/90 backdrop-blur-md'
          : 'bg-transparent'
      }`}>
        <div className="px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`text-sm font-bold tracking-tight transition-colors ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Billy Ndizeye
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {['Work', 'Services', 'About'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase() === 'work' ? 'portfolio' : item.toLowerCase())}
                  className={`text-[11px] font-medium tracking-wide transition-colors ${
                    theme === 'dark' 
                      ? 'text-zinc-400 hover:text-white' 
                      : 'text-zinc-500 hover:text-black'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => scrollToSection('contact')}
              className={`hidden md:block text-[11px] font-medium tracking-wide transition-colors ${
                theme === 'dark' 
                  ? 'text-white hover:text-zinc-300' 
                  : 'text-black hover:text-zinc-600'
              }`}
            >
              Get in touch
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              <span className={`w-5 h-px transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''} ${
                theme === 'dark' ? 'bg-white' : 'bg-black'
              }`}></span>
              <span className={`w-5 h-px transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-0.5' : ''} ${
                theme === 'dark' ? 'bg-white' : 'bg-black'
              }`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      } ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {['Work', 'Services', 'About', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase() === 'work' ? 'portfolio' : item.toLowerCase())}
              className={`text-2xl font-bold tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
