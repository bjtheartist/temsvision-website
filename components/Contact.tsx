import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const Contact: React.FC = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger;
    
    if (gsap && ScrollTrigger) {
      gsap.fromTo('.contact-content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#contact',
            start: 'top 70%',
          }
        }
      );
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className={`py-24 md:py-32 lg:py-40 transition-colors duration-500 ${
      theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-50'
    }`}>
      <div className="px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto">
        <div className="contact-content grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column */}
          <div className="lg:col-span-5">
            <h2 
              className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Let's work<br />together
            </h2>

            <p className={`text-base md:text-lg leading-relaxed mb-12 max-w-md ${
              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your vision to life.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <p className={`text-[10px] font-medium tracking-[0.2em] uppercase mb-2 ${
                  theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                }`}>
                  Email
                </p>
                <a 
                  href="mailto:hello@bjtheartist.com"
                  className={`text-lg font-medium hover:opacity-70 transition-opacity ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}
                >
                  hello@bjtheartist.com
                </a>
              </div>
              <div>
                <p className={`text-[10px] font-medium tracking-[0.2em] uppercase mb-2 ${
                  theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                }`}>
                  Location
                </p>
                <p className={`text-lg font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  Chicago, Illinois
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-7">
            {status === 'success' ? (
              <div className={`py-16 text-center ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                <p className="text-2xl font-medium mb-4">Thank you for reaching out.</p>
                <p className={`text-base ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className={`mt-8 text-sm font-medium hover:opacity-70 transition-opacity ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                  }`}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label 
                      htmlFor="name"
                      className={`block text-[10px] font-medium tracking-[0.2em] uppercase mb-3 ${
                        theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                      }`}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className={`w-full px-0 py-4 bg-transparent border-0 border-b text-base focus:outline-none focus:ring-0 transition-colors ${
                        theme === 'dark' 
                          ? 'border-white/10 text-white placeholder-zinc-600 focus:border-white/30' 
                          : 'border-black/10 text-black placeholder-zinc-400 focus:border-black/30'
                      }`}
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="email"
                      className={`block text-[10px] font-medium tracking-[0.2em] uppercase mb-3 ${
                        theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                      }`}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className={`w-full px-0 py-4 bg-transparent border-0 border-b text-base focus:outline-none focus:ring-0 transition-colors ${
                        theme === 'dark' 
                          ? 'border-white/10 text-white placeholder-zinc-600 focus:border-white/30' 
                          : 'border-black/10 text-black placeholder-zinc-400 focus:border-black/30'
                      }`}
                    />
                  </div>
                </div>
                
                <div>
                  <label 
                    htmlFor="message"
                    className={`block text-[10px] font-medium tracking-[0.2em] uppercase mb-3 ${
                      theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about your project..."
                    className={`w-full px-0 py-4 bg-transparent border-0 border-b text-base focus:outline-none focus:ring-0 resize-none transition-colors ${
                      theme === 'dark' 
                        ? 'border-white/10 text-white placeholder-zinc-600 focus:border-white/30' 
                        : 'border-black/10 text-black placeholder-zinc-400 focus:border-black/30'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={`group inline-flex items-center gap-3 text-sm font-medium tracking-wide transition-all duration-300 ${
                    status === 'sending' ? 'opacity-50' : ''
                  } ${
                    theme === 'dark'
                      ? 'text-white hover:text-zinc-300'
                      : 'text-black hover:text-zinc-600'
                  }`}
                >
                  <span className={`w-12 h-px transition-all duration-300 group-hover:w-16 ${
                    theme === 'dark' ? 'bg-white' : 'bg-black'
                  }`} />
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
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
