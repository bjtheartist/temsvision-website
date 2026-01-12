import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 md:py-32 bg-neutral-900">
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
              What I Do
            </motion.span>
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter mt-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Services
            </motion.h2>
            <motion.p
              className="text-lg text-white/50 mt-4 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Professional photography services tailored to capture your unique story with intention and artistry.
            </motion.p>
          </div>

          {/* Services list */}
          <div className="space-y-0 relative">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                className="group border-t border-white/10 cursor-scale relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Background highlight */}
                <motion.div 
                  className="absolute inset-0 bg-white/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Left - Number and Title */}
                  <div className="flex items-start md:items-center gap-6 md:gap-8">
                    <span className="text-sm font-mono text-white/30 w-8">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <motion.h3 
                      className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      animate={{ 
                        x: hoveredIndex === index ? 20 : 0,
                        color: hoveredIndex === index ? '#ffffff' : 'rgba(255,255,255,0.7)'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {service.name}
                    </motion.h3>
                  </div>

                  {/* Right - Description and Features */}
                  <div className="md:max-w-md lg:max-w-lg ml-14 md:ml-0">
                    <motion.p 
                      className="text-white/50 leading-relaxed mb-4"
                      animate={{ opacity: hoveredIndex === index ? 1 : 0.6 }}
                      transition={{ duration: 0.3 }}
                    >
                      {service.description}
                    </motion.p>
                    <motion.div 
                      className="flex flex-wrap gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {service.features.map((feature, i) => (
                        <span 
                          key={i}
                          className="text-xs px-3 py-1 border border-blue-400/30 text-blue-400/80 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </motion.div>
                  </div>

                  {/* Arrow */}
                  <motion.div
                    className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full border border-white/20"
                    animate={{ 
                      scale: hoveredIndex === index ? 1.1 : 1,
                      borderColor: hoveredIndex === index ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.2)',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span
                      className="text-white"
                      animate={{ x: hoveredIndex === index ? 5 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
            
            {/* Bottom border */}
            <div className="border-t border-white/10" />
          </div>

          {/* CTA */}
          <motion.div 
            className="mt-16 md:mt-24 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-white/50 mb-6">Have a project in mind?</p>
            <a 
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium tracking-tight hover:bg-blue-500 hover:text-white transition-colors cursor-scale"
            >
              <span>Start a conversation</span>
              <span>→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(Services);
