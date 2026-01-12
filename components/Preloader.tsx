import React, { useEffect, useState, memo } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Wait for the webp to load, then trigger exit
  useEffect(() => {
    const minDisplayTime = 2500; // Minimum time to show the animation
    const startTime = Date.now();

    const img = new Image();
    img.src = '/hero-animation.webp';
    
    img.onload = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsed);
      
      setTimeout(() => {
        setIsLoaded(true);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 600);
        }, 300);
      }, remainingTime);
    };

    // Fallback in case image doesn't load
    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true);
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(onComplete, 600);
      }, 300);
    }, 4000);

    return () => clearTimeout(fallbackTimer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-600 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Full-screen animated webp */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-700 ${
          isExiting ? 'scale-110' : 'scale-100'
        }`}
      >
        <img 
          src="/hero-animation.webp" 
          alt="TemsVision"
          className="w-full h-full object-contain"
          style={{
            maxWidth: '100vw',
            maxHeight: '100vh',
          }}
        />
      </div>

      {/* Subtle loading indicator at bottom */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-500 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="w-32 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 rounded-full animate-pulse"
            style={{ 
              width: '100%',
              animation: 'loading 2s ease-in-out infinite'
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default memo(Preloader);
