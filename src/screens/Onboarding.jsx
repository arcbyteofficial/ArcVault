import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Onboarding = ({ onContinue }) => {
  const containerRef = useRef(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  const x = useMotionValue(0);
  // Track width (~320px) minux thumb width (~56px). Let's say drag limit is ~260px.
  // We'll calculate it using the ref, or just set a max constraint visually.
  const backgroundOpacity = useTransform(x, [0, 200], [0, 1]);
  const textOpacity = useTransform(x, [0, 100], [1, 0]);

  const handleDragEnd = (e, info) => {
    // If it's dragged past a certain threshold (e.g. 200px), trigger continue
    if (info.offset.x > 180) {
      setIsUnlocked(true);
      setTimeout(() => onContinue(), 200);
    }
  };
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full bg-[#0d0d0d] flex flex-col relative overflow-hidden transition-all duration-500 font-sans" 
    >
      {/* BACKGROUND ELEMENTS */}
      {/* 1. Top Light Radial Glow */}
      <motion.div 
        animate={{ opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-[#999999] via-[#2A2A2A] to-transparent"
      ></motion.div>
      
      {/* 2. Grid Overlay (fades out at bottom) */}
      <motion.div 
        animate={{ y: [0, -40], opacity: [0.3, 0.6] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
        className="absolute top-0 left-0 w-full h-[70%] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]"
      ></motion.div>

      {/* 3. The Massive Dark Silhouette Shape */}
      <svg className="absolute right-[-2px] inset-y-1/2 -translate-y-[80%] w-[65%] h-auto max-h-[50%]" viewBox="0 0 200 320" fill="none">
        <path 
          d="M 210 -10 L 90 -10 A 30 30 0 0 0 60 20 L 60 70 A 70 70 0 0 1 60 210 L 60 260 A 30 30 0 0 0 90 290 L 210 290 Z" 
          fill="#1C1C1E" 
          fillOpacity="0.85" 
          stroke="rgba(255,255,255,0.08)" 
          strokeWidth="3" 
        />
      </svg>
      {/* Subtle Dust Particles */}
      <div className="absolute top-[25%] left-[20%] w-[2px] h-[2px] bg-white rounded-full opacity-60 shadow-[0_0_8px_2px_rgba(255,255,255,0.5)]"></div>
      <div className="absolute top-[40%] right-[30%] w-[2px] h-[2px] bg-white rounded-full opacity-40 shadow-[0_0_8px_2px_rgba(255,255,255,0.5)]"></div>
      <div className="absolute top-[15%] right-[10%] w-[3px] h-[3px] bg-white rounded-full opacity-30 shadow-[0_0_8px_2px_rgba(255,255,255,0.5)]"></div>



      {/* BRAND & LOGO */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute top-[60px] left-6 flex items-center space-x-2 z-20"
      >
        <div className="w-[22px] h-[22px] bg-white rounded-md transform rotate-45 flex items-center justify-center overflow-hidden">
          <div className="transform -rotate-45 text-black">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="black" strokeWidth="1">
               <path d="M5 2 h8 a6 6 0 0 1 6 6 v2 a6 6 0 0 1 -6 6 h-8 z" />
               <path d="M10 8 L16 8 L13 14 Z" fill="white" />
            </svg>
          </div>
        </div>
        <span className="text-white font-semibold text-[17px] tracking-tight">ArcVault</span>
      </motion.div>

      {/* CONTENT BLOCK (Bottom aligned) */}
      <div className="flex-1 flex flex-col justify-end px-7 pb-10 z-20 relative">
        {/* Title */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-[44px] font-[500] text-[#FAFAFA] leading-[1.1] tracking-[-0.03em]">
            Your<br />
            Passwords,<br />
            Safely Secured
          </h1>
        </motion.div>

        {/* Paragraph */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-10 w-[95%]"
        >
          <p className="text-[#A1A1A6] text-[15px] leading-[1.45] tracking-tight">
            Store, manage, and protect all your passwords in one secure vault. Built with cutting-edge encryption and trusted privacy technology, your digital life stays safe always.
          </p>
        </motion.div>

        {/* Slider Action Button */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative w-full h-[68px] rounded-full bg-[#111111] border border-white/5 flex items-center justify-start p-1.5 overflow-hidden shadow-[inset_0_4px_10px_rgba(0,0,0,1)] z-10"
          ref={containerRef}
        >
          {/* Dynamic Progress Background */}
          <motion.div 
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none"
            style={{ width: x, opacity: backgroundOpacity }}
          />

          {/* Placeholder Text */}
          <motion.div 
            style={{ opacity: textOpacity }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none pl-6"
          >
            <span className="text-[13px] font-[700] text-gray-300 tracking-[0.2em] drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">SLIDE TO START</span>
            <div className="flex space-x-1 ml-4 opacity-50">
              <ChevronRight className="w-4 h-4 text-gray-500 animate-pulse" />
              <ChevronRight className="w-4 h-4 text-gray-400 animate-pulse delay-75" />
              <ChevronRight className="w-4 h-4 text-gray-300 animate-pulse delay-150" />
            </div>
          </motion.div>

          {/* Draggable Thumb */}
          <motion.div
            drag="x"
            dragConstraints={containerRef}
            dragElastic={0.05}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            style={{ x }}
            whileTap={{ scale: 0.95 }}
            className={`w-[56px] h-[56px] rounded-full flex items-center justify-center shrink-0 cursor-grab active:cursor-grabbing z-20 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_4px_12px_rgba(0,0,0,0.8)] border ${isUnlocked ? 'bg-gradient-to-b from-[#34C759] to-[#28A745] text-white border-transparent drop-shadow-[0_0_15px_rgba(52,199,89,0.5)]' : 'bg-gradient-to-b from-[#FFFFFF] to-[#E6E6E6] text-black border-white/20'}`}
          >
            <ChevronRight className="w-7 h-7 stroke-[2.5]" />
          </motion.div>
        </motion.div>
      </div>

      {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[4px] bg-white/30 rounded-full z-50"></div>
    </motion.div>
  );
};

export default Onboarding;
