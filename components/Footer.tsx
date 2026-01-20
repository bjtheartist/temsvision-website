import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS, SITE_CONFIG } from '../constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    timeline: '',
    details: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const projectTypes = [
    'Portrait Session',
    'Fashion / Editorial',
    'Sports / Jersey Shoot',
    'Lifestyle',
    'Maternity / Family',
    'Event Coverage',
    'Other',
  ];

  const timelines = [
    'ASAP (within 2 weeks)',
    'This month',
    'Next month',
    'Flexible / Planning ahead',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build email body with form data
    const subject = `New Project Inquiry: ${formData.projectType}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Project Type: ${formData.projectType}
Timeline: ${formData.timeline}

Project Details:
${formData.details || 'No additional details provided.'}
    `.trim();

    // Open mailto link
    const mailtoLink = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', projectType: '', timeline: '', details: '' });
    }, 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <footer id="contact" className="py-16 md:py-24 bg-neutral-950 text-white">
      {/* Contact Form Section */}
      <div className="px-6 md:px-12 lg:px-24 mb-24 md:mb-32">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            {/* Left - Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-32"
            >
              <span className="text-sm font-mono text-neutral-500 tracking-wider uppercase">Ready to create?</span>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter mt-4 mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Let's work<br />together
              </h2>
              <p className="text-lg text-neutral-400 leading-relaxed max-w-md mb-8">
                Tell me about your project and let's create something extraordinary together.
              </p>
              <div className="flex flex-col gap-3 text-neutral-500">
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-blue-400 transition-colors">
                  {SITE_CONFIG.email}
                </a>
                {SITE_CONFIG.phone && (
                  <a href={`tel:${SITE_CONFIG.phone?.replace(/\D/g, '')}`} className="hover:text-blue-400 transition-colors">
                    {SITE_CONFIG.phone}
                  </a>
                )}
                <span>{SITE_CONFIG.location}</span>
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              {isSubmitted ? (
                <motion.div
                  className="text-center py-16 md:py-24"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-4xl text-green-400">✓</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    Message Sent!
                  </h3>
                  <p className="text-white/60">I'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm text-neutral-500 mb-2">Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm text-neutral-500 mb-2">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="projectType" className="block text-sm text-neutral-500 mb-2">Project Type *</label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                      >
                        <option value="" disabled className="bg-neutral-900">Select type</option>
                        {projectTypes.map(type => (
                          <option key={type} value={type} className="bg-neutral-900">{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timeline" className="block text-sm text-neutral-500 mb-2">Timeline *</label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                      >
                        <option value="" disabled className="bg-neutral-900">Select timeline</option>
                        {timelines.map(time => (
                          <option key={time} value={time} className="bg-neutral-900">{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="details" className="block text-sm text-neutral-500 mb-2">Project Details</label>
                    <textarea
                      id="details"
                      name="details"
                      placeholder="Tell me about your vision, preferred dates, location ideas, or any inspiration you have in mind..."
                      value={formData.details}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-blue-500 hover:bg-blue-400 disabled:bg-blue-500/50 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-lg"
                  >
                    {isSubmitting ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="inline-block"
                      >
                        ◌
                      </motion.span>
                    ) : (
                      <>Send Message <span>→</span></>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="px-6 md:px-12 lg:px-24">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 md:mb-24">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h2 
              className="text-3xl md:text-4xl font-bold tracking-tighter mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Tems<span className="text-blue-400">Vision</span>®
            </h2>
            <p className="max-w-md text-neutral-400 leading-relaxed">
              A photography studio capturing moments that transcend time. 
              Based in Atlanta, working globally.
            </p>
          </div>
          
          {/* Socials */}
          <div>
            <h4 className="font-mono text-sm text-neutral-500 mb-6 uppercase tracking-wider">Socials</h4>
            <ul className="space-y-4">
              {SOCIAL_LINKS.instagram && (
                <li>
                  <a 
                    href={SOCIAL_LINKS.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-blue-400 transition-colors cursor-scale"
                  >
                    Instagram
                  </a>
                </li>
              )}
              {SOCIAL_LINKS.facebook && (
                <li>
                  <a 
                    href={SOCIAL_LINKS.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-blue-400 transition-colors cursor-scale"
                  >
                    Facebook
                  </a>
                </li>
              )}
              {SOCIAL_LINKS.linkedin && (
                <li>
                  <a 
                    href={SOCIAL_LINKS.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-blue-400 transition-colors cursor-scale"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
              {SOCIAL_LINKS.pinterest && (
                <li>
                  <a 
                    href={SOCIAL_LINKS.pinterest} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-blue-400 transition-colors cursor-scale"
                  >
                    Pinterest
                  </a>
                </li>
              )}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-mono text-sm text-neutral-500 mb-6 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-blue-400 transition-colors cursor-scale"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone?.replace(/\D/g, '')}`}
                  className="hover:text-blue-400 transition-colors cursor-scale"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <span className="text-neutral-400">{SITE_CONFIG.location}</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-sm text-neutral-500">
          <p>© {currentYear} TemsVision. All rights reserved.</p>
          <p className="mt-4 md:mt-0">
            <span className="text-neutral-600">[</span>
            {SITE_CONFIG.tagline}
            <span className="text-neutral-600">]</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
