import React, { memo, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Letter animation component
const AnimatedText: React.FC<{ text: string; delay?: number; className?: string }> = ({ 
  text, 
  delay = 0, 
  className = '' 
}) => {
  const letters = text.split('');
  
  return (
    <span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 100, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + index * 0.03,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block"
          style={{ 
            transformOrigin: 'bottom',
            display: letter === ' ' ? 'inline' : 'inline-block',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
};

// Staggered line animation
const AnimatedLine: React.FC<{ children: React.ReactNode; delay?: number }> = ({ 
  children, 
  delay = 0 
}) => (
  <div className="overflow-hidden">
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      transition={{
        duration: 1,
        delay,
        ease: [0.215, 0.61, 0.355, 1],
      }}
    >
      {children}
    </motion.div>
  </div>
);

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const textY = useTransform(scrollY, [0, 500], [0, -50]);

  useEffect(() => {
    // Trigger animations after preloader
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-neutral-950 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Main content */}
      <motion.div 
        className="relative z-10 w-full px-6 md:px-12 lg:px-24"
        style={{ y: textY, opacity: heroOpacity }}
      >
        <div className="max-w-[1800px] mx-auto">
          {/* Top line - subtitle */}
          {isLoaded && (
            <AnimatedLine delay={0.2}>
              <p className="text-sm md:text-base tracking-[0.3em] uppercase text-white/40 mb-8 md:mb-12">
                Photography & Visual Storytelling
              </p>
            </AnimatedLine>
          )}

          {/* Main headline */}
          <div className="space-y-2 md:space-y-4">
            {isLoaded && (
              <>
                <h1 
                  className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold leading-[0.85] tracking-tighter text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  <AnimatedText text="CAPTURING" delay={0.4} />
                </h1>
                <h1 
                  className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold leading-[0.85] tracking-tighter text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  <AnimatedText text="MOMENTS" delay={0.6} />
                  <span className="text-blue-400">
                    <AnimatedText text=" THAT" delay={0.8} />
                  </span>
                </h1>
                <h1 
                  className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold leading-[0.85] tracking-tighter text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  <AnimatedText text="TRANSCEND" delay={1.0} />
                </h1>
              </>
            )}
          </div>

          {/* Bottom section */}
          <div className="mt-16 md:mt-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            {/* Left - Description */}
            {isLoaded && (
              <AnimatedLine delay={1.4}>
                <p className="max-w-md text-lg md:text-xl text-white/60 leading-relaxed">
                  Atlanta-based photographer specializing in creative sessions, 
                  editorial & fashion, events, and weddings.
                </p>
              </AnimatedLine>
            )}

            {/* Right - CTA */}
            {isLoaded && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                <a 
                  href="#work" 
                  className="group inline-flex items-center gap-4 text-white cursor-scale"
                  data-magnetic
                >
                  <span className="text-sm tracking-[0.2em] uppercase">View Work</span>
                  <motion.span 
                    className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center"
                    whileHover={{ scale: 1.1, borderColor: 'rgba(255,255,255,0.6)' }}
                  >
                    <motion.span
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ↓
                    </motion.span>
                  </motion.span>
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/40 to-white/0"
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="w-3 h-3 border border-white/20 rotate-45"
        />
      </div>
      <div className="absolute top-8 right-8 md:top-12 md:right-12">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.9, duration: 0.5 }}
          className="w-3 h-3 border border-white/20 rotate-45"
        />
      </div>
    </section>
  );
};

export default memo(Hero);
