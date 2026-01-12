import React, { useEffect, useCallback, useState, memo } from 'react';
import { useTheme } from '../context/ThemeContext';

interface GalleryImage {
  src: string;
  alt: string;
  category?: string;
}

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: GalleryImage[];
  initialIndex?: number;
  categoryTitle?: string;
}

const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  categoryTitle = 'Gallery'
}) => {
  const { isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Reset index when modal opens with new initialIndex
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsLoading(true);
    }
  }, [isOpen, initialIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const goToNext = useCallback(() => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
    setTouchStart(null);
  };

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div 
      className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 ${isDark ? 'bg-black/95' : 'bg-white/95'} backdrop-blur-md`}
        onClick={onClose}
      />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 px-4 sm:px-6 md:px-12 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          {/* Category Title */}
          <div className="flex items-center gap-3">
            <span 
              className={`text-xl sm:text-2xl md:text-3xl font-black tracking-wider ${
                isDark ? 'text-white' : 'text-black'
              }`}
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {categoryTitle}
            </span>
          </div>

          {/* Counter & Close */}
          <div className="flex items-center gap-4 sm:gap-6">
            <span className={`text-xs sm:text-sm tracking-[0.2em] ${
              isDark ? 'text-white/50' : 'text-black/50'
            }`}>
              {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
            <button
              onClick={onClose}
              className={`text-xs sm:text-sm tracking-[0.2em] uppercase font-medium transition-colors ${
                isDark ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-600'
              }`}
              aria-label="Close gallery"
            >
              [Close]
            </button>
          </div>
        </div>
      </div>

      {/* Main Image Container */}
      <div 
        className="absolute inset-0 flex items-center justify-center px-4 sm:px-16 md:px-24 py-20 sm:py-24"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-8 h-8 border-2 rounded-full animate-spin ${
              isDark ? 'border-white/20 border-t-blue-400' : 'border-black/20 border-t-blue-600'
            }`} />
          </div>
        )}

        {/* Image */}
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsLoading(false)}
          draggable={false}
        />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          {/* Previous */}
          <button
            onClick={goToPrevious}
            className={`absolute left-2 sm:left-6 md:left-12 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-4 transition-all duration-200 group ${
              isDark ? 'text-white/50 hover:text-white' : 'text-black/50 hover:text-black'
            }`}
            aria-label="Previous image"
          >
            <span className="text-2xl sm:text-4xl font-light transition-transform duration-200 group-hover:-translate-x-1 inline-block">
              ←
            </span>
          </button>

          {/* Next */}
          <button
            onClick={goToNext}
            className={`absolute right-2 sm:right-6 md:right-12 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-4 transition-all duration-200 group ${
              isDark ? 'text-white/50 hover:text-white' : 'text-black/50 hover:text-black'
            }`}
            aria-label="Next image"
          >
            <span className="text-2xl sm:text-4xl font-light transition-transform duration-200 group-hover:translate-x-1 inline-block">
              →
            </span>
          </button>
        </>
      )}

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 sm:px-6 md:px-12 py-4 sm:py-6">
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsLoading(true);
                  setCurrentIndex(index);
                }}
                className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded overflow-hidden transition-all duration-200 ${
                  index === currentIndex 
                    ? 'ring-2 ring-blue-500 opacity-100 scale-100' 
                    : 'opacity-40 hover:opacity-70 scale-95 hover:scale-100'
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Keyboard hints - Desktop only */}
      <div className={`hidden md:block absolute bottom-6 left-12 text-[10px] tracking-[0.2em] uppercase ${
        isDark ? 'text-white/20' : 'text-black/20'
      }`}>
        ← → Navigate • ESC Close
      </div>
    </div>
  );
};

export default memo(GalleryModal);
