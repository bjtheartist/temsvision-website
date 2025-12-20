
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-6 py-8 md:px-12 mix-blend-difference">
      <div className="text-lg font-black tracking-tighter uppercase">BJTHEARTIST</div>
      <div className="flex gap-10 items-center">
        <button className="hidden md:block text-[10px] font-black tracking-[0.3em] hover:text-zinc-400 transition-colors">WORK</button>
        <button className="hidden md:block text-[10px] font-black tracking-[0.3em] hover:text-zinc-400 transition-colors">SERVICES</button>
        <button className="flex items-center gap-3 text-[10px] font-black tracking-[0.2em] uppercase group">
          Book a call
          <span className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-zinc-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </span>
        </button>
        <button className="text-[10px] font-black tracking-[0.3em] uppercase hover:text-zinc-400 transition-colors">MENU</button>
      </div>
    </nav>
  );
};

export default Navbar;
