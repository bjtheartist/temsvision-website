
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-24 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-end mb-32">
          <div className="space-y-12">
            <h2 className="text-[10vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase">
              LET'S CREATE<br />
              <span className="text-orange-600">TOGETHER</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-md font-medium">
              Based in Los Angeles, available worldwide. Let's discuss your next visual masterpiece.
            </p>
          </div>
          <div className="flex flex-col gap-4">
             <a href="mailto:hello@bjtheartist.com" className="text-4xl md:text-5xl font-black tracking-tighter hover:text-orange-600 transition-colors">
               hello@bjtheartist.com
             </a>
             <div className="flex gap-8 text-xs font-black tracking-widest mt-8">
                <a href="#" className="hover:opacity-50">INSTAGRAM</a>
                <a href="#" className="hover:opacity-50">TWITTER</a>
                <a href="#" className="hover:opacity-50">LINKEDIN</a>
             </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/10 text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase">
          <p>© 2024 BJTHEARTIST STUDIO. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white">TERMS & CONDITIONS</a>
          </div>
          <p>MADE FOR THE VISIONARIES</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
