import React, { memo, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_IMAGES } from '../constants';

// Category data - 5 main categories
export const CATEGORIES = [
  {
    id: 'portraits',
    title: 'Portraits',
    description: 'Creative portrait photography capturing personality and emotion.',
    coverImage: '/gallery/portrait-01.jpg',
  },
  {
    id: 'sports',
    title: 'Jerseys',
    description: 'Custom jersey photography showcasing style and team spirit.',
    coverImage: '/gallery/sports-01.jpg',
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle',
    description: 'Vibrant lifestyle photography capturing authentic moments.',
    coverImage: '/gallery/lifestyle-01.jpg',
  },
  {
    id: 'fashion',
    title: 'Fashion',
    description: 'High-end editorial and fashion photography with refined style.',
    coverImage: '/gallery/fashion-01.jpg',
  },
  {
    id: 'maternity',
    title: 'Maternity & Family',
    description: 'Beautiful maternity photography celebrating new beginnings.',
    coverImage: '/gallery/maternity-01.jpg',
  },
];

interface CategoryCardProps {
  category: typeof CATEGORIES[0];
  photoCount: number;
  onSelect: (category: typeof CATEGORIES[0]) => void;
  className?: string;
  size?: 'large' | 'medium' | 'small';
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  photoCount,
  onSelect,
  className = '',
  size = 'medium'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    large: 'text-4xl md:text-5xl lg:text-6xl',
    medium: 'text-2xl md:text-3xl lg:text-4xl',
    small: 'text-xl md:text-2xl lg:text-3xl',
  };

  return (
    <motion.div
      className={`relative cursor-pointer group overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(category)}
    >
      {/* Image */}
      <motion.img
        src={category.coverImage}
        alt={category.title}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ filter: 'grayscale(100%)' }}
        animate={{
          filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
      />

      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"
        animate={{ opacity: isHovered ? 1 : 0.7 }}
        transition={{ duration: 0.4 }}
      />

      {/* Photo count badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="text-xs font-mono text-white/70 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
          {photoCount} photos
        </span>
      </div>

      {/* View indicator */}
      <motion.div
        className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/40 flex items-center justify-center z-10"
        animate={{
          scale: isHovered ? 1 : 0.8,
          opacity: isHovered ? 1 : 0,
          backgroundColor: isHovered ? 'rgba(255,255,255,0.1)' : 'transparent',
        }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-white text-lg">→</span>
      </motion.div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
        <motion.div
          animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <h3
            className={`font-bold text-white tracking-tight ${sizeClasses[size]}`}
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {category.title}
          </h3>
        </motion.div>

        <motion.p
          className="text-sm text-white/60 mt-2 line-clamp-2"
          animate={{ y: isHovered ? 0 : 15, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          {category.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

// Lightbox Modal for browsing category photos
interface LightboxProps {
  category: typeof CATEGORIES[0] | null;
  onClose: () => void;
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

const Lightbox: React.FC<LightboxProps> = ({ category, onClose, currentIndex, onIndexChange }) => {
  if (!category) return null;

  const images = GALLERY_IMAGES[category.id] || [];

  const nextImage = () => onIndexChange((currentIndex + 1) % images.length);
  const prevImage = () => onIndexChange((currentIndex - 1 + images.length) % images.length);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextImage();
      else if (e.key === 'ArrowLeft') prevImage();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Close button - larger tap target on mobile, safe area padding */}
      <button
        className="absolute top-4 right-4 md:top-6 md:right-6 w-14 h-14 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center text-white text-xl md:text-base bg-black/50 hover:bg-white/10 active:bg-white/20 transition-colors z-[110] touch-manipulation"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close gallery"
      >
        ✕
      </button>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            ←
          </button>
          <button
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            →
          </button>
        </>
      )}

      {/* Image */}
      <motion.div
        className="relative max-w-[90vw] max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${category.title} ${currentIndex + 1}`}
            className="max-w-full max-h-[85vh] object-contain"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
      </motion.div>

      {/* Info bar */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-white">
        <div>
          <h3
            className="text-2xl md:text-3xl font-bold tracking-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {category.title}
          </h3>
          <p className="text-sm text-white/60 mt-1">{category.description}</p>
        </div>
        {images.length > 1 && (
          <div className="text-right">
            <p className="text-2xl font-mono text-white">
              {currentIndex + 1} <span className="text-white/40">/ {images.length}</span>
            </p>
            <p className="text-xs text-white/40 mt-1">Use arrow keys to navigate</p>
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-1 max-w-[80vw] overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.stopPropagation(); onIndexChange(idx); }}
            className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 overflow-hidden transition-all duration-300 ${
              idx === currentIndex
                ? 'ring-2 ring-blue-400 opacity-100'
                : 'opacity-40 hover:opacity-70'
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[0] | null>(null);
  const [categoryIndices, setCategoryIndices] = useState<Record<string, number>>({});

  // Notify navbar when lightbox is open/closed
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('lightbox-state', { detail: { isOpen: !!selectedCategory } }));
  }, [selectedCategory]);

  const handleIndexChange = useCallback((newIndex: number) => {
    if (selectedCategory) {
      setCategoryIndices(prev => ({ ...prev, [selectedCategory.id]: newIndex }));
    }
  }, [selectedCategory]);

  const getCurrentIndex = () => {
    if (!selectedCategory) return 0;
    return categoryIndices[selectedCategory.id] || 0;
  };

  const getPhotoCount = (categoryId: string) => {
    return GALLERY_IMAGES[categoryId]?.length || 0;
  };

  // For external access (from MarqueeSlider)
  const openCategory = useCallback((categoryId: string) => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    if (category) setSelectedCategory(category);
  }, []);

  // Expose openCategory to window for cross-component communication
  useEffect(() => {
    (window as any).openGalleryCategory = openCategory;
    return () => { delete (window as any).openGalleryCategory; };
  }, [openCategory]);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-neutral-950">
      <div className="px-6 md:px-12 lg:px-24">
        <div className="max-w-[1800px] mx-auto">
          {/* Section header */}
          <div className="mb-12 md:mb-16">
            <motion.span
              className="text-sm tracking-[0.3em] uppercase text-white/40"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Portfolio
            </motion.span>
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter mt-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Gallery
            </motion.h2>
            <motion.p
              className="text-lg text-white/50 mt-4 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Click on any category to explore the full collection
            </motion.p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px] lg:auto-rows-[300px]">
            {/* Portraits - Large, spans 2 cols and 2 rows */}
            <CategoryCard
              category={CATEGORIES[0]}
              photoCount={getPhotoCount(CATEGORIES[0].id)}
              onSelect={setSelectedCategory}
              className="col-span-2 row-span-2"
              size="large"
            />

            {/* Sports - Medium */}
            <CategoryCard
              category={CATEGORIES[1]}
              photoCount={getPhotoCount(CATEGORIES[1].id)}
              onSelect={setSelectedCategory}
              className="col-span-1 row-span-1"
              size="medium"
            />

            {/* Lifestyle - Medium */}
            <CategoryCard
              category={CATEGORIES[2]}
              photoCount={getPhotoCount(CATEGORIES[2].id)}
              onSelect={setSelectedCategory}
              className="col-span-1 row-span-1"
              size="medium"
            />

            {/* Fashion - Medium */}
            <CategoryCard
              category={CATEGORIES[3]}
              photoCount={getPhotoCount(CATEGORIES[3].id)}
              onSelect={setSelectedCategory}
              className="col-span-1 row-span-1"
              size="medium"
            />

            {/* Maternity - Medium */}
            <CategoryCard
              category={CATEGORIES[4]}
              photoCount={getPhotoCount(CATEGORIES[4].id)}
              onSelect={setSelectedCategory}
              className="col-span-1 row-span-1"
              size="medium"
            />
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedCategory && (
          <Lightbox
            category={selectedCategory}
            onClose={() => setSelectedCategory(null)}
            currentIndex={getCurrentIndex()}
            onIndexChange={handleIndexChange}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default memo(Portfolio);
