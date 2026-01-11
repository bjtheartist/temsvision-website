import React, { useEffect, useState, useMemo, memo } from 'react';
import { SITE_CONFIG } from '../constants';
import { useTheme } from '../context/ThemeContext';

interface PreloaderProps {
  onComplete: () => void;
}

// Memoized digit component for performance
const Digit = memo<{ value: number }>(({ value }) => (
  <span 
    className="inline-block w-8 text-center tabular-nums"
    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
  >
    {value}
  </span>
));

Digit.displayName = 'Digit';

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const { isDark } = useTheme();
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Smooth eased progress animation using requestAnimationFrame
  useEffect(() => {
    const duration = 2000;
    const startTime = performance.now();
    let animationId: number;
    
    const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const linearProgress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(linearProgress) * 100;
      
      setProgress(easedProgress);
      
      if (linearProgress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Handle completion
  useEffect(() => {
    if (progress >= 99.9) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onComplete, 400);
      }, 150);
      
      return () => clearTimeout(exitTimer);
    }
  }, [progress, onComplete]);

  // Calculate display value
  const displayValue = Math.min(Math.round(progress), 100);

  // Memoize the formatted digits
  const formattedDigits = useMemo(() => {
    const str = displayValue.toString().padStart(3, '0');
    return str.split('').map(Number);
  }, [displayValue]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-500 ${
        isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      } ${isDark ? 'bg-black' : 'bg-white'}`}
    >
      {/* Logo - Using actual TemsVision logo image */}
      <div 
        className={`mb-4 transition-all duration-500 ${
          isExiting ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <img 
          src="/temsvision-logo.png" 
          alt="TemsVision Logo"
          className="w-32 h-auto object-contain"
          style={{ 
            filter: isDark ? 'invert(1) brightness(2)' : 'none'
          }}
        />
      </div>

      {/* Tagline */}
      <p className={`text-[10px] tracking-[0.2em] uppercase mb-8 ${
        isDark ? 'text-white/40' : 'text-black/40'
      }`}>
        [{SITE_CONFIG.tagline}]
      </p>

      {/* Counter Display - Simple and smooth */}
      <div className="flex items-baseline justify-center">
        <div 
          className={`text-5xl md:text-6xl font-light tracking-tight ${
            isDark ? 'text-white' : 'text-black'
          }`}
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {formattedDigits.map((digit, index) => (
            <Digit key={index} value={digit} />
          ))}
        </div>
        <span 
          className="text-3xl md:text-4xl font-light text-blue-500 ml-1"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          %
        </span>
      </div>

      {/* Progress bar */}
      <div className={`mt-8 w-48 h-0.5 overflow-hidden rounded-full ${
        isDark ? 'bg-white/10' : 'bg-black/10'
      }`}>
        <div 
          className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 rounded-full transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading text */}
      <p className={`mt-6 text-[10px] tracking-[0.3em] uppercase ${
        isDark ? 'text-white/30' : 'text-black/30'
      }`}>
        Loading
      </p>
    </div>
  );
};

export default memo(Preloader);
