import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';

interface MarqueeItemProps {
  title: string;
  category: string;
  imageUrl: string;
  index: number;
  onHover: (index: number | null) => void;
  isHovered: boolean;
  onClick: () => void;
}

const SWIPE_THRESHOLD = 10;

const MarqueeItem: React.FC<MarqueeItemProps> = ({
  title,
  category,
  imageUrl,
  index,
  onHover,
  isHovered,
  onClick
}) => {
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!pointerStartRef.current) return onClick();

    const dx = Math.abs(e.clientX - pointerStartRef.current.x);
    const dy = Math.abs(e.clientY - pointerStartRef.current.y);
    const wasSwiping = dx > SWIPE_THRESHOLD || dy > SWIPE_THRESHOLD;

    if (!wasSwiping) onClick();
  };

  return (
    <motion.div
      className="relative flex-shrink-0 w-[260px] md:w-[400px] lg:w-[500px] mx-2 md:mx-4 cursor-pointer"
      data-cursor="project"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          initial={{ filter: 'grayscale(100%)' }}
          animate={{
            filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        />

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/30"
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Text content */}
      <div className="mt-3 md:mt-4 flex justify-between items-start">
        <div>
          <motion.h3
            className="text-base md:text-xl lg:text-2xl font-bold text-white tracking-tight"
            animate={{ x: isHovered ? 10 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          <p className="text-xs md:text-sm text-white/50 tracking-wider uppercase mt-1">
            {category}
          </p>
        </div>
        <motion.span
          className="text-xs md:text-sm text-white/30 font-mono"
          animate={{ opacity: isHovered ? 1 : 0.5 }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
      </div>
    </motion.div>
  );
};

const scrollToGallery = () => {
  window.location.href = '#gallery';
};

const MarqueeSlider: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [translateX, setTranslateX] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);

  const duplicatedProjects = [...PROJECTS, ...PROJECTS];

  // Calculate track width (50% = one full set of projects)
  const getTrackWidth = useCallback(() => {
    if (!trackRef.current) return 0;
    return trackRef.current.scrollWidth / 2;
  }, []);

  // Auto-scroll animation
  useEffect(() => {
    const speed = 0.03; // pixels per ms (adjust for speed)

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (!isPaused && !isDraggingRef.current) {
        setTranslateX(prev => {
          const trackWidth = getTrackWidth();
          let next = prev - speed * delta;
          // Loop back when we've scrolled one full set
          if (Math.abs(next) >= trackWidth) {
            next = next + trackWidth;
          }
          return next;
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, getTrackWidth]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const { clientX, clientY } = e.touches[0];
    touchStartRef.current = { x: clientX, y: clientY };
    isDraggingRef.current = true;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const { clientX, clientY } = e.touches[0];
    const deltaX = clientX - touchStartRef.current.x;
    const deltaY = clientY - touchStartRef.current.y;
    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);

    if (!isHorizontalSwipe) return;

    e.preventDefault();
    setTranslateX(prev => {
      const trackWidth = getTrackWidth();
      const next = prev + deltaX * 0.5;
      return Math.max(-trackWidth + 1, Math.min(0, next));
    });
    touchStartRef.current.x = clientX;
  }, [getTrackWidth]);

  const handleTouchEnd = useCallback(() => {
    touchStartRef.current = null;
    isDraggingRef.current = false;

    setTranslateX(prev => {
      const trackWidth = getTrackWidth();
      if (prev > 0) return 0;
      if (Math.abs(prev) >= trackWidth) return prev + trackWidth;
      return prev;
    });
  }, [getTrackWidth]);

  const handleHover = (index: number | null) => {
    setHoveredIndex(index);
    setIsPaused(index !== null);
  };

  const displayIndex = hoveredIndex !== null ? hoveredIndex + 1 : 1;
  const progressWidth = (displayIndex / PROJECTS.length) * 100;

  return (
    <section id="work" className="py-16 md:py-24 lg:py-32 bg-neutral-950 overflow-hidden">
      {/* Section header */}
      <div className="px-4 md:px-12 lg:px-24 mb-8 md:mb-16">
        <div className="max-w-[1800px] mx-auto flex justify-between items-end">
          <div>
            <motion.span
              className="text-xs md:text-sm tracking-[0.3em] uppercase text-white/40"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Selected Work
            </motion.span>
            <motion.h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter mt-2 md:mt-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Featured Projects
            </motion.h2>
          </div>

          <motion.a
            href="#gallery"
            className="hidden md:flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-scale"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-sm tracking-wider uppercase">View All</span>
            <span>→</span>
          </motion.a>
        </div>
      </div>

      {/* Swipe hint for mobile */}
      <div className="px-4 mb-4 md:hidden">
        <span className="text-xs text-white/30 tracking-wider">← Swipe to explore →</span>
      </div>

      {/* Marquee container with touch support */}
      <div
        className="relative touch-pan-y"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          if (hoveredIndex === null) setIsPaused(false);
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {duplicatedProjects.map((project, index) => (
            <MarqueeItem
              key={`${project.id}-${index}`}
              title={project.title}
              category={project.category}
              imageUrl={project.imageUrl}
              index={index % PROJECTS.length}
              onHover={handleHover}
              isHovered={hoveredIndex === index % PROJECTS.length}
              onClick={scrollToGallery}
            />
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="px-4 md:px-12 lg:px-24 mt-8 md:mt-12">
        <div className="max-w-[1800px] mx-auto flex items-center gap-4">
          <span className="text-xs md:text-sm text-white/30 font-mono">
            {String(displayIndex).padStart(2, '0')}
          </span>
          <div className="flex-1 h-[1px] bg-white/10">
            <motion.div
              className="h-full bg-blue-500"
              animate={{ width: `${progressWidth}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-xs md:text-sm text-white/30 font-mono">
            {String(PROJECTS.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
};

export default memo(MarqueeSlider);
