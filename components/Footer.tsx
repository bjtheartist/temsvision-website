
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`py-12 px-6 md:px-12 border-t transition-colors duration-500 ${
      theme === 'dark' ? 'bg-black border-white/10' : 'bg-white border-black/10'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <span className={`text-lg font-black tracking-tighter uppercase ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}>
              BJTHEARTIST
            </span>
            <span className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
              © {currentYear} All rights reserved
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs font-bold tracking-wider uppercase transition-colors ${
                  theme === 'dark' 
                    ? 'text-zinc-500 hover:text-white' 
                    : 'text-zinc-400 hover:text-black'
                }`}
              >
                {platform}
              </a>
            ))}
          </div>
        </div>

        {/* Back to Top */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`group flex items-center gap-2 text-xs font-bold tracking-wider uppercase transition-colors ${
              theme === 'dark' ? 'text-zinc-500 hover:text-white' : 'text-zinc-400 hover:text-black'
            }`}
          >
            Back to Top
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:-translate-y-1">
              <path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
