import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { SOCIAL_LINKS, SITE_CONFIG, NAV_ITEMS } from '../constants';

const socialLinks = [
  { name: 'Instagram', href: SOCIAL_LINKS.instagram },
  { name: 'Facebook', href: SOCIAL_LINKS.facebook },
  { name: 'LinkedIn', href: SOCIAL_LINKS.linkedin },
  { name: 'Pinterest', href: SOCIAL_LINKS.pinterest },
].filter(link => link.href);

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Listen for lightbox open/close events
  useEffect(() => {
    const handleLightboxState = (e: CustomEvent<{ isOpen: boolean }>) => {
      setIsLightboxOpen(e.detail.isOpen);
    };
    window.addEventListener('lightbox-state', handleLightboxState as EventListener);
    return () => window.removeEventListener('lightbox-state', handleLightboxState as EventListener);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      {/* Fixed Header - completely hidden when lightbox is open */}
      {!isLightboxOpen && (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 pointer-events-none">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center text-xl md:text-2xl font-bold tracking-tighter pointer-events-auto cursor-scale text-blue-400"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            TEMSVISION
          </a>

          {/* Menu Toggle */}
          <button
            className="p-2 hover:opacity-70 transition-opacity pointer-events-auto cursor-scale text-blue-400"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Plus size={28} strokeWidth={1.5} />}
          </button>
        </header>
      )}

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-neutral-950 text-white flex flex-col justify-between p-6 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Close button area - to maintain header position */}
            <div className="h-16" />

            {/* Navigation Links */}
            <nav className="flex-1 flex flex-col justify-center">
              <ul className="space-y-4 md:space-y-6">
                {NAV_ITEMS.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                  >
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="group flex items-center gap-4 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter hover:text-neutral-400 transition-colors cursor-scale"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      <span className="text-sm font-mono text-neutral-600 w-8">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>{item.label}</span>
                      <motion.span 
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-2xl text-blue-400"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                      >
                        →
                      </motion.span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Footer */}
            <motion.div
              className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pt-8 border-t border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {/* Social Links */}
              <div className="flex flex-wrap gap-4 md:gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm tracking-wider uppercase text-neutral-400 hover:text-white transition-colors cursor-scale"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Contact */}
              <div className="text-left md:text-right">
                <p className="text-sm text-neutral-500 mb-1">Get in touch</p>
                <a 
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-lg md:text-xl hover:text-blue-400 transition-colors cursor-scale"
                >
                  {SITE_CONFIG.email}
                </a>
                <p className="text-sm text-neutral-500 mt-2">{SITE_CONFIG.location}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(Navbar);
