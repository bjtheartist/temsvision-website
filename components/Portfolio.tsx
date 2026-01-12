import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';

// All gallery images organized by category
const GALLERY_IMAGES: Record<string, string[]> = {
  portraits: [
    '/gallery/portrait-1.jpg',
    '/gallery/portrait-2.jpg',
    '/gallery/portrait-3.jpg',
    '/gallery/portrait-4.jpg',
    '/gallery/portrait-5.jpg',
    '/gallery/portrait-6.jpg',
  ],
  sports: [
    '/gallery/sports-1.jpg',
    '/gallery/sports-2.jpg',
    '/gallery/sports-3.jpg',
    '/gallery/sports-4.jpg',
  ],
  lifestyle: [
    '/gallery/lifestyle-1.jpg',
    '/gallery/lifestyle-2.jpg',
  ],
  family: [
    '/gallery/maternity-1.jpg',
    '/gallery/maternity-2.jpg',
  ],
  'b & w': [
    '/gallery/bw-1.jpg',
  ],
};

interface ProjectCardProps {
  project: typeof PROJECTS[0];
  index: number;
  onSelect: (project: typeof PROJECTS[0]) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-scale group"
      data-cursor="project"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(project)}
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
        <motion.img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
          initial={{ filter: 'grayscale(100%)' }}
          animate={{ 
            filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
        />
        
        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          animate={{ opacity: isHovered ? 1 : 0.6 }}
          transition={{ duration: 0.4 }}
        />

        {/* Index number */}
        <div className="absolute top-4 left-4">
          <span className="text-xs font-mono text-white/40">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* View indicator */}
        <motion.div
          className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/30 flex items-center justify-center"
          animate={{ 
            scale: isHovered ? 1 : 0.8,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-white text-lg">+</span>
        </motion.div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.div
            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xs tracking-[0.2em] uppercase text-blue-400 mb-2 block">
              {project.category}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
          </motion.div>
          
          <motion.p
            className="text-sm text-white/60 mt-3 line-clamp-2"
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {project.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

// Lightbox Modal
interface LightboxProps {
  project: typeof PROJECTS[0] | null;
  onClose: () => void;
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

const Lightbox: React.FC<LightboxProps> = ({ project, onClose, currentIndex, onIndexChange }) => {
  if (!project) return null;

  // Get images for this category
  const categoryKey = project.category.toLowerCase();
  const images = GALLERY_IMAGES[categoryKey] || [project.imageUrl];

  const nextImage = () => onIndexChange((currentIndex + 1) % images.length);
  const prevImage = () => onIndexChange((currentIndex - 1 + images.length) % images.length);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-scale z-10"
        onClick={onClose}
      >
        ✕
      </button>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-scale z-10"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            ←
          </button>
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-scale z-10"
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
            alt={project.title}
            className="max-w-full max-h-[85vh] object-contain"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
      </motion.div>

      {/* Info */}
      <div className="absolute bottom-6 left-6 text-white">
        <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
        <p className="text-sm text-white/60 mt-1">{project.category}</p>
        {images.length > 1 && (
          <p className="text-xs text-white/40 mt-2 font-mono">
            {currentIndex + 1} / {images.length}
          </p>
        )}
      </div>
    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  // Track the last viewed index for each category
  const [categoryIndices, setCategoryIndices] = useState<Record<string, number>>({});

  const handleIndexChange = (newIndex: number) => {
    if (selectedProject) {
      const categoryKey = selectedProject.category.toLowerCase();
      setCategoryIndices(prev => ({ ...prev, [categoryKey]: newIndex }));
    }
  };

  const getCurrentIndex = () => {
    if (!selectedProject) return 0;
    const categoryKey = selectedProject.category.toLowerCase();
    return categoryIndices[categoryKey] || 0;
  };

  return (
    <section id="gallery" className="py-24 md:py-32 bg-neutral-950">
      <div className="px-6 md:px-12 lg:px-24">
        <div className="max-w-[1800px] mx-auto">
          {/* Section header */}
          <div className="mb-16 md:mb-24">
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

          {/* Project grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onSelect={setSelectedProject}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <Lightbox
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            currentIndex={getCurrentIndex()}
            onIndexChange={handleIndexChange}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default memo(Portfolio);
