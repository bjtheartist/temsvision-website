import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`py-8 transition-colors duration-500 ${
      theme === 'dark' ? 'bg-black border-t border-white/5' : 'bg-white border-t border-black/5'
    }`}>
      <div className="px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className={`text-[11px] font-medium tracking-wide ${
            theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
          }`}>
            © {currentYear} Billy Ndizeye
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {['Twitter', 'LinkedIn', 'Dribbble'].map((platform) => (
              <a
                key={platform}
                href="#"
                className={`text-[11px] font-medium tracking-wide transition-colors ${
                  theme === 'dark' 
                    ? 'text-zinc-500 hover:text-white' 
                    : 'text-zinc-400 hover:text-black'
                }`}
              >
                {platform}
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className={`text-[11px] font-medium tracking-wide transition-colors ${
              theme === 'dark' 
                ? 'text-zinc-500 hover:text-white' 
                : 'text-zinc-400 hover:text-black'
            }`}
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
