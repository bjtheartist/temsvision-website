import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS, SITE_CONFIG } from '../constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="py-16 md:py-24 bg-neutral-950 text-white">
      {/* Contact CTA */}
      <div className="px-6 md:px-12 lg:px-24 mb-24 md:mb-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-16 md:py-24"
          >
            <span className="text-sm font-mono text-neutral-500 tracking-wider uppercase">Ready to create?</span>
            <h2 
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter mt-4 mb-8"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Let's work together
            </h2>
            <motion.a 
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-lg font-medium tracking-tight hover:bg-blue-500 hover:text-white transition-colors cursor-scale"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Get in touch</span>
              <span>→</span>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="px-6 md:px-12 lg:px-24">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 md:mb-24">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h2 
              className="text-3xl md:text-4xl font-bold tracking-tighter mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Tems<span className="text-blue-400">Vision</span>®
            </h2>
            <p className="max-w-md text-neutral-400 leading-relaxed">
              A photography studio capturing moments that transcend time. 
              Based in Atlanta, working globally.
            </p>
          </div>
          
          {/* Socials */}
          <div>
            <h4 className="font-mono text-sm text-neutral-500 mb-6 uppercase tracking-wider">Socials</h4>
            <ul className="space-y-4">
              {SOCIAL_LINKS.instagram && (
                <li>
                  <a 
                    href={SOCIAL_LINKS.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-blue-400 transition-colors cursor-scale"
                  >
                    Instagram
                  </a>
                </li>
              )}
              {SOCIAL_LINKS.facebook && (
                <li>
                  <a 
                    href={SOCIAL_LINKS.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-blue-400 transition-colors cursor-scale"
                  >
                    Facebook
                  </a>
                </li>
              )}
              {SOCIAL_LINKS.linkedin && (
                <li>
                  <a 
                    href={SOCIAL_LINKS.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-blue-400 transition-colors cursor-scale"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
              {SOCIAL_LINKS.pinterest && (
                <li>
                  <a 
                    href={SOCIAL_LINKS.pinterest} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-blue-400 transition-colors cursor-scale"
                  >
                    Pinterest
                  </a>
                </li>
              )}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-mono text-sm text-neutral-500 mb-6 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href={`mailto:${SITE_CONFIG.email}`} 
                  className="hover:text-blue-400 transition-colors cursor-scale"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <span className="text-neutral-400">{SITE_CONFIG.location}</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-sm text-neutral-500">
          <p>© {currentYear} TemsVision. All rights reserved.</p>
          <p className="mt-4 md:mt-0">
            <span className="text-neutral-600">[</span>
            {SITE_CONFIG.tagline}
            <span className="text-neutral-600">]</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
