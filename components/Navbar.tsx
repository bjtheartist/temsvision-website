
import React, { useRef, useEffect } from 'react';

const Navbar: React.FC = () => {
  const menuItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    if (!gsap) return;

    // Logo magnetic effect
    const logo = logoRef.current;
    if (logo) {
      const onLogoMove = (e: MouseEvent) => {
        const rect = logo.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(logo, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out"
        });
      };
      const onLogoLeave = () => {
        gsap.to(logo, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      };
      logo.addEventListener('mousemove', onLogoMove);
      logo.addEventListener('mouseleave', onLogoLeave);
    }

    // Menu items hover animations
    menuItemsRef.current.forEach((item) => {
      if (!item) return;

      const onEnter = () => {
        gsap.to(item, {
          scale: 1.1,
          letterSpacing: '0.5em',
          duration: 0.3,
          ease: "power2.out"
        });
        // Add a little bounce
        gsap.fromTo(item,
          { y: 0 },
          { y: -3, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" }
        );
      };

      const onLeave = () => {
        gsap.to(item, {
          scale: 1,
          letterSpacing: '0.3em',
          duration: 0.3,
          ease: "power2.out"
        });
      };

      item.addEventListener('mouseenter', onEnter);
      item.addEventListener('mouseleave', onLeave);
    });

    return () => {
      if (logo) {
        logo.removeEventListener('mousemove', () => {});
        logo.removeEventListener('mouseleave', () => {});
      }
    };
  }, []);

  const setMenuRef = (index: number) => (el: HTMLButtonElement | null) => {
    menuItemsRef.current[index] = el;
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-6 py-8 md:px-12 mix-blend-difference">
      <div
        ref={logoRef}
        className="text-lg font-black tracking-tighter uppercase cursor-pointer"
      >
        BJTHEARTIST
      </div>
      <div className="flex gap-10 items-center">
        <button
          ref={setMenuRef(0)}
          className="hidden md:block text-[10px] font-black tracking-[0.3em] hover:text-zinc-400 transition-colors"
        >
          WORK
        </button>
        <button
          ref={setMenuRef(1)}
          className="hidden md:block text-[10px] font-black tracking-[0.3em] hover:text-zinc-400 transition-colors"
        >
          SERVICES
        </button>
        <button className="flex items-center gap-3 text-[10px] font-black tracking-[0.2em] uppercase group nav-cta">
          Book a call
          <span className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-zinc-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </span>
        </button>
        <button
          ref={setMenuRef(2)}
          className="text-[10px] font-black tracking-[0.3em] uppercase hover:text-zinc-400 transition-colors"
        >
          MENU
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
