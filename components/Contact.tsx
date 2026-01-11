import React, { useState, useCallback, memo } from 'react';
import { SITE_CONFIG, SOCIAL_LINKS } from '../constants';
import { useTheme } from '../context/ThemeContext';

const Contact: React.FC = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    sessionType: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const sessionTypes = [
    'Birthday',
    'Graduation',
    'Group Session',
    'Family',
    'Boudoir',
    'Wedding',
    'Engagement',
    'Portrait',
    'Other'
  ];

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      // Using Formsubmit.co - free, no signup required
      const response = await fetch('https://formsubmit.co/ajax/hello@temsvision.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          sessionType: formData.sessionType || 'Not specified',
          message: formData.message,
          _subject: `New Photography Inquiry from ${formData.name}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', sessionType: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }, [formData]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }, []);

  const inputClasses = `w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b text-sm sm:text-base focus:outline-none transition-colors ${
    isDark 
      ? 'border-white/20 text-white placeholder-white/30 focus:border-blue-400' 
      : 'border-black/20 text-black placeholder-black/30 focus:border-blue-600'
  }`;

  return (
    <section id="contact" className={`relative py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden ${
      isDark ? 'bg-black' : 'bg-white'
    }`}>
      {/* Background Accent */}
      <div className={`absolute bottom-0 left-0 w-full h-1/2 pointer-events-none ${
        isDark 
          ? 'bg-gradient-to-t from-blue-500/5 to-transparent' 
          : 'bg-gradient-to-t from-blue-100/50 to-transparent'
      }`} />

      <div className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <span className="text-blue-500 text-xs font-mono">04</span>
            <div className="w-8 sm:w-12 h-px bg-blue-500/50" />
          </div>
          <h2 
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight ${
              isDark ? 'text-white' : 'text-black'
            }`}
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Let's Start<br className="hidden sm:block" />Your Journey
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column - Info */}
          <div>
            <p className={`text-lg sm:text-xl md:text-2xl leading-relaxed mb-8 sm:mb-12 ${
              isDark ? 'text-white/80' : 'text-black/80'
            }`}>
              Your story deserves to be told with intention and artistry. 
              Let's collaborate and transform your vision into unforgettable imagery.
            </p>

            {/* Contact Info */}
            <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
              <div>
                <p className={`text-xs tracking-[0.2em] uppercase mb-2 ${
                  isDark ? 'text-white/40' : 'text-black/40'
                }`}>
                  Instagram
                </p>
                <a 
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-lg sm:text-xl md:text-2xl font-bold transition-colors ${
                    isDark ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-600'
                  }`}
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {SITE_CONFIG.instagram}
                </a>
              </div>
              <div>
                <p className={`text-xs tracking-[0.2em] uppercase mb-2 ${
                  isDark ? 'text-white/40' : 'text-black/40'
                }`}>
                  Location
                </p>
                <p 
                  className={`text-lg sm:text-xl md:text-2xl font-bold ${
                    isDark ? 'text-white' : 'text-black'
                  }`}
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {SITE_CONFIG.location}
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className={`text-xs tracking-[0.2em] uppercase mb-3 sm:mb-4 ${
                isDark ? 'text-white/40' : 'text-black/40'
              }`}>
                Follow
              </p>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                {SOCIAL_LINKS.instagram && (
                  <a 
                    href={SOCIAL_LINKS.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`text-xs sm:text-sm tracking-[0.1em] uppercase transition-colors ${
                      isDark ? 'text-white/60 hover:text-blue-400' : 'text-black/60 hover:text-blue-600'
                    }`}
                  >
                    Instagram
                  </a>
                )}
                {SOCIAL_LINKS.facebook && (
                  <a 
                    href={SOCIAL_LINKS.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`text-xs sm:text-sm tracking-[0.1em] uppercase transition-colors ${
                      isDark ? 'text-white/60 hover:text-blue-400' : 'text-black/60 hover:text-blue-600'
                    }`}
                  >
                    Facebook
                  </a>
                )}
                {SOCIAL_LINKS.linkedin && (
                  <a 
                    href={SOCIAL_LINKS.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`text-xs sm:text-sm tracking-[0.1em] uppercase transition-colors ${
                      isDark ? 'text-white/60 hover:text-blue-400' : 'text-black/60 hover:text-blue-600'
                    }`}
                  >
                    LinkedIn
                  </a>
                )}
                {SOCIAL_LINKS.pinterest && (
                  <a 
                    href={SOCIAL_LINKS.pinterest} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`text-xs sm:text-sm tracking-[0.1em] uppercase transition-colors ${
                      isDark ? 'text-white/60 hover:text-blue-400' : 'text-black/60 hover:text-blue-600'
                    }`}
                  >
                    Pinterest
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            {status === 'success' ? (
              <div className="py-12 sm:py-16 text-center">
                <p className={`text-2xl sm:text-3xl font-black mb-4 ${isDark ? 'text-white' : 'text-black'}`} 
                   style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  Thank You
                </p>
                <p className={`text-sm sm:text-base mb-6 sm:mb-8 ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                  I'll get back to you within 24 hours to discuss your session.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-xs tracking-[0.2em] uppercase text-blue-500 hover:text-blue-400 transition-colors"
                >
                  [Send Another Message]
                </button>
              </div>
            ) : status === 'error' ? (
              <div className="py-12 sm:py-16 text-center">
                <p className="text-2xl sm:text-3xl font-black text-red-500 mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  Oops
                </p>
                <p className={`text-sm sm:text-base mb-6 sm:mb-8 ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                  {errorMessage}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-xs tracking-[0.2em] uppercase text-blue-500 hover:text-blue-400 transition-colors"
                >
                  [Try Again]
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <label 
                      htmlFor="name"
                      className={`block text-xs tracking-[0.2em] uppercase mb-2 sm:mb-3 ${
                        isDark ? 'text-white/40' : 'text-black/40'
                      }`}
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="email"
                      className={`block text-xs tracking-[0.2em] uppercase mb-2 sm:mb-3 ${
                        isDark ? 'text-white/40' : 'text-black/40'
                      }`}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label 
                    htmlFor="sessionType"
                    className={`block text-xs tracking-[0.2em] uppercase mb-2 sm:mb-3 ${
                      isDark ? 'text-white/40' : 'text-black/40'
                    }`}
                  >
                    What type of session are you looking for?
                  </label>
                  <select
                    id="sessionType"
                    name="sessionType"
                    value={formData.sessionType}
                    onChange={handleChange}
                    className={`${inputClasses} appearance-none cursor-pointer`}
                    style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='${isDark ? '%23ffffff40' : '%2300000040'}'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, 
                      backgroundRepeat: 'no-repeat', 
                      backgroundPosition: 'right center', 
                      backgroundSize: '20px' 
                    }}
                  >
                    <option value="" className={isDark ? 'bg-black' : 'bg-white'}>Select an option</option>
                    {sessionTypes.map((type) => (
                      <option key={type} value={type} className={isDark ? 'bg-black' : 'bg-white'}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label 
                    htmlFor="message"
                    className={`block text-xs tracking-[0.2em] uppercase mb-2 sm:mb-3 ${
                      isDark ? 'text-white/40' : 'text-black/40'
                    }`}
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about your vision..."
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={`group inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold tracking-[0.1em] uppercase transition-all duration-300 rounded-lg ${
                    status === 'sending' 
                      ? 'bg-blue-500/50 cursor-not-allowed' 
                      : 'bg-blue-500 hover:bg-blue-400'
                  } text-white`}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"/>
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

export default memo(Contact);
