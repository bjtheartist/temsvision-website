import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useSiteSettings } from '../hooks/useSanity';
import { ABOUT_BIO, SITE_CONFIG, SOCIAL_LINKS } from '../constants';

const About: React.FC = () => {
  // Fetch from Sanity with fallback to constants
  const { data: settings, loading } = useSiteSettings();

  // Use Sanity data if available, otherwise fall back to constants
  const fullName = settings?.fullName || SITE_CONFIG.fullName;
  const bioIntro = settings?.bioIntro || ABOUT_BIO.intro;
  const bioBackground = settings?.bioBackground || ABOUT_BIO.background;
  const bioStory = settings?.bioStory || ABOUT_BIO.story;
  const bioPhilosophy = settings?.bioPhilosophy || ABOUT_BIO.philosophy;
  const bioApproach = settings?.bioApproach || ABOUT_BIO.approach;
  const socialLinks = settings?.socialLinks || SOCIAL_LINKS;
  const headshotUrl = settings?.headshotUrl || '/temi-headshot-new.jpg';

  return (
    <section id="about" className="py-24 md:py-32 bg-white text-black">
      {/* Main Statement */}
      <div className="px-6 md:px-12 lg:px-24 mb-24 md:mb-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Section indicator */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-px bg-blue-500/50" />
            <span className="text-sm tracking-[0.3em] uppercase text-blue-600 font-mono">
              01 — About
            </span>
            <div className="w-12 h-px bg-blue-500/50" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium leading-[1.3] tracking-tight"
          >
            {bioIntro} {bioBackground}
          </motion.h2>
        </div>
      </div>


      {/* Bio Section */}
      <div className="px-6 md:px-12 lg:px-24">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[3/4] overflow-hidden bg-neutral-100"
          >
            <img
              src={headshotUrl}
              alt={fullName}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            {/* Decorative frame */}
            <div className="absolute inset-4 border border-black/10 pointer-events-none" />
          </motion.div>

          {/* Bio Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <span className="text-sm font-mono text-neutral-400 tracking-wider uppercase mb-6">
              The Story
            </span>

            <h3
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide mb-8"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {fullName}
            </h3>

            <div className="space-y-6 text-lg md:text-xl text-neutral-600 leading-relaxed">
              {bioStory && <p>{bioStory}</p>}
              {bioPhilosophy && <p>{bioPhilosophy}</p>}
              {bioApproach && <p>{bioApproach}</p>}
            </div>

            {/* Name meaning */}
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <span className="text-sm font-mono text-neutral-400 tracking-wider uppercase mb-6 block">
                Name Meaning
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-2xl font-bold text-blue-600" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    Temilade
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">{ABOUT_BIO.nameMeaning.temilade}</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    Temi
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">{ABOUT_BIO.nameMeaning.temi}</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    TemsVision
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">{ABOUT_BIO.nameMeaning.temsvision}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex gap-4">
              {(socialLinks?.instagram || SOCIAL_LINKS.instagram) && (
                <a
                  href={socialLinks?.instagram || SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm tracking-wider uppercase text-neutral-400 hover:text-blue-600 transition-colors cursor-scale"
                >
                  Instagram
                </a>
              )}
              {(socialLinks?.facebook || SOCIAL_LINKS.facebook) && (
                <a
                  href={socialLinks?.facebook || SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm tracking-wider uppercase text-neutral-400 hover:text-blue-600 transition-colors cursor-scale"
                >
                  Facebook
                </a>
              )}
              {(socialLinks?.linkedin || SOCIAL_LINKS.linkedin) && (
                <a
                  href={socialLinks?.linkedin || SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm tracking-wider uppercase text-neutral-400 hover:text-blue-600 transition-colors cursor-scale"
                >
                  LinkedIn
                </a>
              )}
            </div>

            {/* CTA */}
            <motion.a
              href="#contact"
              className="group inline-flex items-center gap-4 mt-12 text-black cursor-scale"
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-sm tracking-[0.2em] uppercase font-medium">Let's work together</span>
              <span className="w-12 h-12 rounded-full border border-black/30 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                →
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(About);
