import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { SOCIAL_LINKS } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const { theme } = useTheme();

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.fromTo('.contact-header',
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 75%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      }
    );

    gsap.fromTo('.contact-form',
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 70%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
      }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', project: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section 
      id="contact" 
      className={`py-24 md:py-32 px-6 md:px-12 transition-colors duration-500 ${
        theme === 'dark' ? 'bg-black' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">

          {/* Left Side - Heading */}
          <div className="contact-header space-y-8">
            <div className="space-y-4">
              <div className={`flex items-center gap-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                <span className={`w-12 h-px ${theme === 'dark' ? 'bg-white/30' : 'bg-black/30'}`}></span>
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-60">Get In Touch</span>
              </div>
              <h2 className={`text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                Let's Create<br/>Something<br/>
                <span className={theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}>Amazing</span>
              </h2>
            </div>
            
            <p className={`text-base md:text-lg max-w-md leading-relaxed ${
              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              Have a project in mind? I'd love to hear about it. Let's discuss how we can work together to bring your vision to life.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <a 
                href="mailto:hello@bjtheartist.com" 
                className={`flex items-center gap-3 text-lg font-medium transition-colors ${
                  theme === 'dark' ? 'text-white hover:text-zinc-300' : 'text-black hover:text-zinc-600'
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                hello@bjtheartist.com
              </a>
              <p className={`flex items-center gap-3 text-lg font-medium ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Chicago, Illinois
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <p className={`text-xs font-bold tracking-wider uppercase ${
                theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
              }`}>
                Follow Me
              </p>
              <div className="flex gap-3">
                {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      theme === 'dark' 
                        ? 'bg-white/5 text-white hover:bg-white/10' 
                        : 'bg-black/5 text-black hover:bg-black/10'
                    }`}
                  >
                    {platform === 'twitter' && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    )}
                    {platform === 'linkedin' && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    )}
                    {platform === 'dribbble' && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
                      </svg>
                    )}
                    {platform === 'behance' && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.61.165-1.252.254-1.91.254H0V4.51h6.938v-.007zM6.545 9.66c.56 0 1.01-.13 1.36-.404.35-.27.52-.72.52-1.35 0-.35-.06-.64-.18-.87-.12-.23-.29-.42-.51-.55-.22-.13-.48-.22-.78-.27-.3-.05-.6-.08-.93-.08H3.53v3.52h3.015zm.215 5.64c.36 0 .69-.04 1-.12.31-.08.57-.21.8-.38.23-.17.41-.4.54-.69.13-.29.2-.65.2-1.06 0-.85-.23-1.46-.69-1.83-.46-.37-1.08-.55-1.85-.55H3.53v4.63h3.23v-.01zm9.368-9.14h5.65v1.35h-5.65V6.16zm2.86 10.56c.57.55 1.39.82 2.44.82.76 0 1.41-.19 1.96-.57.55-.38.89-.77 1.02-1.16h3.38c-.54 1.67-1.36 2.87-2.47 3.57-1.11.72-2.45 1.07-4.01 1.07-1.09 0-2.07-.17-2.94-.52-.87-.35-1.61-.85-2.22-1.5-.61-.65-1.08-1.43-1.41-2.34-.33-.91-.49-1.93-.49-3.03 0-1.07.17-2.05.51-2.95.34-.9.82-1.68 1.43-2.33.61-.66 1.35-1.17 2.2-1.53.86-.36 1.81-.55 2.85-.55 1.17 0 2.19.23 3.07.69.88.46 1.6 1.08 2.17 1.86.57.78.98 1.68 1.24 2.7.26 1.02.35 2.1.27 3.24h-10.1c.05 1.17.45 2.05 1.02 2.6l-.02.02zm4.26-6.93c-.45-.49-1.17-.74-2.14-.74-.63 0-1.16.11-1.58.32-.42.21-.76.48-1.02.79-.26.31-.44.65-.55 1.01-.11.36-.18.7-.21 1.01h6.53c-.15-1.01-.58-1.9-1.03-2.39z"/>
                      </svg>
                    )}
                    {platform === 'instagram' && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="contact-form">
            {status === 'success' ? (
              <div className={`rounded-2xl p-12 text-center ${
                theme === 'dark' ? 'bg-zinc-900 border border-white/10' : 'bg-zinc-100 border border-black/10'
              }`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
                  theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
                }`}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h3 className={`text-2xl md:text-3xl font-black mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>Message Sent!</h3>
                <p className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className={`mt-8 font-bold text-sm tracking-widest uppercase transition-colors ${
                    theme === 'dark' ? 'text-white hover:text-zinc-400' : 'text-black hover:text-zinc-600'
                  }`}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={`block text-[10px] font-bold tracking-[0.3em] uppercase mb-3 ${
                      theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                    }`}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full bg-transparent border-b-2 py-3 text-lg font-medium focus:outline-none transition-colors ${
                        theme === 'dark' 
                          ? 'border-white/10 focus:border-white text-white placeholder:text-zinc-700' 
                          : 'border-black/10 focus:border-black text-black placeholder:text-zinc-400'
                      }`}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={`block text-[10px] font-bold tracking-[0.3em] uppercase mb-3 ${
                      theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                    }`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full bg-transparent border-b-2 py-3 text-lg font-medium focus:outline-none transition-colors ${
                        theme === 'dark' 
                          ? 'border-white/10 focus:border-white text-white placeholder:text-zinc-700' 
                          : 'border-black/10 focus:border-black text-black placeholder:text-zinc-400'
                      }`}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="project" className={`block text-[10px] font-bold tracking-[0.3em] uppercase mb-3 ${
                    theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                  }`}>
                    Project Type
                  </label>
                  <select
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    required
                    className={`w-full bg-transparent border-b-2 py-3 text-lg font-medium focus:outline-none transition-colors cursor-pointer ${
                      theme === 'dark' 
                        ? 'border-white/10 focus:border-white text-white' 
                        : 'border-black/10 focus:border-black text-black'
                    }`}
                  >
                    <option value="" className={theme === 'dark' ? 'bg-black' : 'bg-white'}>Select a service</option>
                    <option value="product-design" className={theme === 'dark' ? 'bg-black' : 'bg-white'}>Product Design</option>
                    <option value="web-design" className={theme === 'dark' ? 'bg-black' : 'bg-white'}>Web Design</option>
                    <option value="brand-identity" className={theme === 'dark' ? 'bg-black' : 'bg-white'}>Brand Identity</option>
                    <option value="mobile-app" className={theme === 'dark' ? 'bg-black' : 'bg-white'}>Mobile App Design</option>
                    <option value="other" className={theme === 'dark' ? 'bg-black' : 'bg-white'}>Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={`block text-[10px] font-bold tracking-[0.3em] uppercase mb-3 ${
                    theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                  }`}>
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={`w-full bg-transparent border-b-2 py-3 text-lg font-medium focus:outline-none transition-colors resize-none ${
                      theme === 'dark' 
                        ? 'border-white/10 focus:border-white text-white placeholder:text-zinc-700' 
                        : 'border-black/10 focus:border-black text-black placeholder:text-zinc-400'
                    }`}
                    placeholder="Tell me about your project..."
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm font-medium">
                    Something went wrong. Please try again or email directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={`group flex items-center gap-4 px-8 py-4 rounded-full font-bold text-sm tracking-wide uppercase transition-all duration-300 disabled:opacity-50 ${
                    theme === 'dark'
                      ? 'bg-white text-black hover:bg-zinc-200'
                      : 'bg-black text-white hover:bg-zinc-800'
                  }`}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
