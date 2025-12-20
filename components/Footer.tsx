
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase">
          <p>© 2025 BJTHEARTIST STUDIO. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
            <a href="#" className="hover:text-white transition-colors">TWITTER</a>
            <a href="#" className="hover:text-white transition-colors">LINKEDIN</a>
          </div>
          <p>CHICAGO, IL</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
