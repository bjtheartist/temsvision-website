import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';

interface MarqueeItemProps {
  title: string;
  category: string;
  imageUrl: string;
  index: number;
  onHover: (index: number | null) => void;
  isHovered: boolean;
}

const MarqueeItem: React.FC<MarqueeItemProps> = ({
  title,
  category,
  imageUrl,
  index,
  onHover,
  isHovered
}) => {
  return (
    <motion.div
      className="relative flex-shrink-0 w-[300px] md:w-[400px] lg:w-[500px] mx-4 cursor-scale"
      data-cursor="project"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
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
      <div className="mt-4 flex justify-between items-start">
        <div>
          <motion.h3
            className="text-xl md:text-2xl font-bold text-white tracking-tight"
            animate={{ x: isHovered ? 10 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          <p className="text-sm text-white/50 tracking-wider uppercase mt-1">
            {category}
          </p>
        </div>
        <motion.span
          className="text-sm text-white/30 font-mono"
          animate={{ opacity: isHovered ? 1 : 0.5 }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
      </div>
    </motion.div>
  );
};

const MarqueeSlider: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Double the projects for seamless loop
  const duplicatedProjects = [...PROJECTS, ...PROJECTS];

  const handleHover = (index: number | null) => {
    setHoveredIndex(index);
    setIsPaused(index !== null);
  };

  return (
    <section id="work" className="py-24 md:py-32 bg-neutral-950 overflow-hidden">
      {/* CSS Keyframes for marquee - pauses/resumes from current position */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 60s linear infinite;
        }
        .marquee-track.paused {
          animation-play-state: paused;
        }
      `}</style>

      {/* Section header */}
      <div className="px-6 md:px-12 lg:px-24 mb-12 md:mb-16">
        <div className="max-w-[1800px] mx-auto flex justify-between items-end">
          <div>
            <motion.span
              className="text-sm tracking-[0.3em] uppercase text-white/40"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Selected Work
            </motion.span>
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter mt-4"
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

      {/* Marquee container */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          if (hoveredIndex === null) setIsPaused(false);
        }}
      >
        <div
          className={`flex marquee-track ${isPaused ? 'paused' : ''}`}
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
            />
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="px-6 md:px-12 lg:px-24 mt-12">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/30 font-mono">
              {hoveredIndex !== null 
                ? String(hoveredIndex + 1).padStart(2, '0') 
                : '01'
              }
            </span>
            <div className="flex-1 h-[1px] bg-white/10">
              <motion.div
                className="h-full bg-blue-500"
                animate={{
                  width: hoveredIndex !== null 
                    ? `${((hoveredIndex + 1) / PROJECTS.length) * 100}%`
                    : '16.67%',
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="text-sm text-white/30 font-mono">
              {String(PROJECTS.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(MarqueeSlider);
