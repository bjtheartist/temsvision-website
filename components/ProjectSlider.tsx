import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';

const projects = [
  { title: "Portrait Sessions", image: "/gallery/portrait-1.jpg" },
  { title: "Sports Action", image: "/gallery/sports-1.jpg" },
  { title: "Maternity", image: "/gallery/maternity-1.jpg" },
  { title: "Lifestyle", image: "/gallery/lifestyle-1.jpg" },
  { title: "Creative", image: "/gallery/portrait-2.jpg" },
  { title: "Editorial", image: "/gallery/portrait-3.jpg" },
];

const ProjectSlider: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Double the projects for seamless loop
  const doubledProjects = [...projects, ...projects];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div 
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-4 md:gap-8"
          animate={{
            x: isPaused ? 0 : [0, -50 * projects.length + "%"],
          }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          style={{
            width: "fit-content",
          }}
        >
          {doubledProjects.map((project, index) => (
            <div
              key={`${project.title}-${index}`}
              className="relative flex-shrink-0 w-[70vw] md:w-[40vw] lg:w-[30vw] aspect-[4/3] overflow-hidden cursor-scale group"
            >
              {/* Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500" />
              
              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">
                  {project.title}
                </h3>
              </div>

              {/* Hover indicator */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-sm tracking-wider">View →</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Pause indicator */}
        {isPaused && (
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
              <div className="flex gap-1">
                <div className="w-1 h-6 bg-black rounded-full" />
                <div className="w-1 h-6 bg-black rounded-full" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Caption */}
      <div className="mt-8 px-6 md:px-12 flex justify-between items-center text-neutral-400 text-sm">
        <span className="tracking-wider uppercase">Featured Work</span>
        <span className="tracking-wider">Hover to pause</span>
      </div>
    </section>
  );
};

export default memo(ProjectSlider);
