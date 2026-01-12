import React, { useEffect, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500; // Total loading time in ms
    const interval = 30; // Update interval in ms
    const increment = 100 / (duration / interval);
    
    const startTime = Date.now();
    
    // Preload the webp animation
    const img = new Image();
    img.src = '/hero-animation.webp';

    // Animate progress counter
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const elapsed = Date.now() - startTime;
        const targetProgress = Math.min((elapsed / duration) * 100, 100);
        
        // Smooth easing towards target
        const newProgress = prev + (targetProgress - prev) * 0.1;
        
        if (newProgress >= 99.5) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    // Complete loading after duration
    const completeTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(onComplete, 800);
      }, 400);
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Full-screen animated webp */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 1 }}
            exit={{ scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <img 
              src="/hero-animation.webp" 
              alt="TemsVision"
              className="w-full h-full object-contain"
              style={{
                maxWidth: '100vw',
                maxHeight: '100vh',
              }}
            />
          </motion.div>

          {/* Progress counter in bottom right */}
          <motion.div 
            className="absolute bottom-8 right-8 md:bottom-12 md:right-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-baseline gap-1">
              <motion.span 
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tabular-nums tracking-tighter"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {Math.floor(progress)}
              </motion.span>
              <span className="text-xl md:text-2xl text-white/60 font-light">%</span>
            </div>
            
            {/* Progress bar */}
            <div className="mt-4 w-32 md:w-48 h-[2px] bg-white/10 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            {/* Loading text */}
            <motion.p 
              className="mt-3 text-xs tracking-[0.3em] uppercase text-white/40"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading
            </motion.p>
          </motion.div>

          {/* TemsVision text at bottom left */}
          <motion.div 
            className="absolute bottom-8 left-8 md:bottom-12 md:left-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span 
              className="text-sm md:text-base tracking-[0.2em] uppercase text-white/60"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Tems<span className="text-blue-400">Vision</span>
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(Preloader);
