import React, { useEffect, useRef, useState, memo } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface MagneticCursorProps {
  isVisible?: boolean;
}

const MagneticCursor: React.FC<MagneticCursorProps> = ({ isVisible = true }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isProject, setIsProject] = useState(false);
  
  // Motion values for smooth cursor movement
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Spring config for smooth following
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check what element we're hovering over
      const target = e.target as HTMLElement;
      const projectEl = target.closest('[data-cursor="project"]');
      const linkEl = target.closest('a, button, [data-cursor="link"], .cursor-scale');
      const magneticEl = target.closest('[data-magnetic]') as HTMLElement;

      // Magnetic effect
      if (magneticEl) {
        const rect = magneticEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const pullStrength = 0.3;
        const deltaX = (centerX - e.clientX) * pullStrength;
        const deltaY = (centerY - e.clientY) * pullStrength;
        cursorX.set(e.clientX + deltaX);
        cursorY.set(e.clientY + deltaY);
      }

      if (projectEl) {
        setIsHovering(true);
        setIsProject(true);
        setCursorText('View');
      } else if (linkEl) {
        setIsHovering(true);
        setIsProject(false);
        const text = linkEl.getAttribute('data-cursor-text');
        setCursorText(text || '');
      } else {
        setIsHovering(false);
        setIsProject(false);
        setCursorText('');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => {
      setIsHovering(false);
      setIsProject(false);
      setCursorText('');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            width: isProject ? 80 : isHovering ? 60 : 40,
            height: isProject ? 80 : isHovering ? 60 : 40,
            x: isProject ? -40 : isHovering ? -30 : -20,
            y: isProject ? -40 : isHovering ? -30 : -20,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          <motion.div
            className={`absolute inset-0 rounded-full ${
              isProject ? 'bg-white' : 'border-2 border-white bg-transparent'
            }`}
            animate={{
              scale: isClicking ? 0.8 : 1,
              opacity: isHovering ? 1 : 0.6,
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 400 }}
          />
          
          {/* Cursor text */}
          {cursorText && (
            <motion.span
              className={`text-xs font-bold tracking-wider uppercase ${
                isProject ? 'text-black' : 'text-white'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="w-2 h-2 bg-white rounded-full mix-blend-difference"
          style={{
            x: -4,
            y: -4,
          }}
          animate={{
            scale: isHovering ? 0 : isClicking ? 0.5 : 1,
            opacity: isHovering ? 0 : 1,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 400 }}
        />
      </motion.div>
    </>
  );
};

export default memo(MagneticCursor);
