import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface CursorState {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  text: string;
  isHovering: boolean;
  isProject: boolean;
  isLink: boolean;
}

const MagneticCursor: React.FC = () => {
  const { theme } = useTheme();
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>({
    x: 0,
    y: 0,
    scale: 1,
    opacity: 0,
    text: '',
    isHovering: false,
    isProject: false,
    isLink: false,
  });

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Check what element we're hovering over
      const target = e.target as HTMLElement;
      const isProject = target.closest('[data-cursor="project"]') !== null;
      const isLink = target.closest('a, button, [data-cursor="link"]') !== null;
      const isMagnetic = target.closest('[data-magnetic]') !== null;

      // Magnetic effect
      if (isMagnetic) {
        const magneticEl = target.closest('[data-magnetic]') as HTMLElement;
        const rect = magneticEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate magnetic pull (subtle)
        const pullStrength = 0.3;
        const deltaX = (centerX - mouseX) * pullStrength;
        const deltaY = (centerY - mouseY) * pullStrength;
        
        mouseX += deltaX;
        mouseY += deltaY;
      }

      setCursorState(prev => ({
        ...prev,
        opacity: 1,
        isProject,
        isLink: isLink && !isProject,
        text: isProject ? 'View' : '',
        scale: isProject ? 3 : isLink ? 1.5 : 1,
        isHovering: isProject || isLink,
      }));
    };

    const handleMouseLeave = () => {
      setCursorState(prev => ({ ...prev, opacity: 0 }));
    };

    const handleMouseEnter = () => {
      setCursorState(prev => ({ ...prev, opacity: 1 }));
    };

    // Animation loop for smooth cursor movement
    const animate = () => {
      // Smooth follow for main cursor (slower)
      const ease = 0.15;
      cursorX += (mouseX - cursorX) * ease;
      cursorY += (mouseY - cursorY) * ease;

      // Faster follow for dot
      const dotEase = 0.35;
      dotX += (mouseX - dotX) * dotEase;
      dotY += (mouseY - dotY) * dotEase;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%) scale(${cursorState.scale})`;
      }

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      }

      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    const animationId = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationId);
    };
  }, [cursorState.scale]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Main cursor circle */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          opacity: cursorState.opacity,
          transition: 'opacity 0.3s ease, width 0.3s ease, height 0.3s ease',
        }}
      >
        <div
          className={`flex items-center justify-center rounded-full transition-all duration-300 ${
            cursorState.isProject 
              ? 'w-20 h-20 bg-white' 
              : cursorState.isLink 
                ? 'w-12 h-12 bg-white/80' 
                : 'w-8 h-8 border-2 border-white bg-transparent'
          }`}
        >
          {cursorState.text && (
            <span className="text-black text-xs font-bold tracking-wider uppercase">
              {cursorState.text}
            </span>
          )}
        </div>
      </div>

      {/* Cursor dot (faster follow) */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          opacity: cursorState.isHovering ? 0 : cursorState.opacity,
          transition: 'opacity 0.2s ease',
        }}
      >
        <div className="w-2 h-2 bg-white rounded-full mix-blend-difference" />
      </div>
    </>
  );
};

export default MagneticCursor;
