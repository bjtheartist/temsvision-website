import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from './Portfolio';
import { GALLERY_IMAGES } from '../constants';

interface MarqueeItemProps {
  title: string;
  description: string;
  imageUrl: string;
  photoCount: number;
  index: number;
  onHover: (index: number | null) => void;
  isHovered: boolean;
  onClick: () => void;
}

const SWIPE_THRESHOLD = 10;

const MarqueeItem: React.FC<MarqueeItemProps> = ({
  title,
  description,
  imageUrl,
  photoCount,
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
      className="relative flex-shrink-0 w-[280px] md:w-[400px] lg:w-[500px] mx-2 md:mx-4 cursor-pointer"
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
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
          animate={{ opacity: isHovered ? 0.8 : 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Photo count badge */}
        <div className="absolute top-4 left-4">
          <span className="text-xs font-mono text-white/80 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
            {photoCount} photos
          </span>
        </div>

        {/* View arrow on hover */}
        <motion.div
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-white">→</span>
        </motion.div>
      </div>

      {/* Text content */}
      <div className="mt-4 md:mt-5">
        <motion.h3
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          animate={{ x: isHovered ? 10 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-sm md:text-base text-white/50 mt-2 line-clamp-2"
          animate={{ opacity: isHovered ? 1 : 0.7 }}
          transition={{ duration: 0.3 }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
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

  // Duplicate categories for seamless loop
  const duplicatedCategories = [...CATEGORIES, ...CATEGORIES, ...CATEGORIES];

  // Calculate track width (33% = one full set of categories)
  const getTrackWidth = useCallback(() => {
    if (!trackRef.current) return 0;
    return trackRef.current.scrollWidth / 3;
  }, []);

  // Auto-scroll animation
  useEffect(() => {
    const speed = 0.025; // pixels per ms

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

  const handleCategoryClick = (categoryId: string) => {
    // Scroll to gallery and open category
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
      // Open the category lightbox after scroll
      setTimeout(() => {
        if ((window as any).openGalleryCategory) {
          (window as any).openGalleryCategory(categoryId);
        }
      }, 500);
    }
  };

  const getPhotoCount = (categoryId: string) => {
    return GALLERY_IMAGES[categoryId]?.length || 0;
  };

  const displayIndex = hoveredIndex !== null ? (hoveredIndex % CATEGORIES.length) + 1 : 1;
  const progressWidth = (displayIndex / CATEGORIES.length) * 100;

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
              Explore
            </motion.span>
            <motion.h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter mt-2 md:mt-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Featured Categories
            </motion.h2>
          </div>

          <motion.a
            href="#gallery"
            className="hidden md:flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-sm tracking-wider uppercase">View Gallery</span>
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
          {duplicatedCategories.map((category, index) => (
            <MarqueeItem
              key={`${category.id}-${index}`}
              title={category.title}
              description={category.description}
              imageUrl={category.coverImage}
              photoCount={getPhotoCount(category.id)}
              index={index}
              onHover={handleHover}
              isHovered={hoveredIndex === index}
              onClick={() => handleCategoryClick(category.id)}
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
            {String(CATEGORIES.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
};

export default memo(MarqueeSlider);
