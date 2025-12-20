import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-40 px-6 md:px-12 bg-black border-t border-white/10 relative overflow-hidden">
      {/* Background glow effects - subtle white */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">

          {/* Left Side - Heading */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 text-white">
              <span className="w-12 h-px bg-white"></span>
              <span className="text-[10px] font-black tracking-[0.4em] uppercase">Get In Touch</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
              LET'S<br />WORK<br /><span className="outline-text">TOGETHER</span>
            </h2>
            <p className="text-zinc-400 text-xl max-w-md font-medium leading-relaxed">
              Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing.
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="flex flex-col justify-center">
            {status === 'success' ? (
              <div className="bg-zinc-900/50 border border-white/20 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mx-auto mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-black mb-4 uppercase">Message Sent!</h3>
                <p className="text-zinc-400">Thanks for reaching out. I'll get back to you soon.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-white font-black text-sm tracking-widest uppercase hover:text-zinc-400 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-black tracking-[0.3em] uppercase text-zinc-500 mb-4">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b-2 border-white/10 py-4 text-xl font-medium focus:outline-none focus:border-white transition-colors placeholder:text-zinc-700"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[10px] font-black tracking-[0.3em] uppercase text-zinc-500 mb-4">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b-2 border-white/10 py-4 text-xl font-medium focus:outline-none focus:border-white transition-colors placeholder:text-zinc-700"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[10px] font-black tracking-[0.3em] uppercase text-zinc-500 mb-4">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-transparent border-b-2 border-white/10 py-4 text-xl font-medium focus:outline-none focus:border-white transition-colors placeholder:text-zinc-700 resize-none"
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
                  className="flex items-center gap-4 font-black text-sm group w-fit disabled:opacity-50"
                >
                  <span className="tracking-[0.2em] uppercase">
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </span>
                  <span className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-zinc-200 group-active:scale-95">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                    </svg>
                  </span>
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
