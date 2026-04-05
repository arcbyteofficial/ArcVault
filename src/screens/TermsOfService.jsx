import React from 'react';
import { ChevronLeft, Scale } from 'lucide-react';
import { motion } from 'framer-motion';

const TermsOfService = ({ onNavigate }) => {

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full bg-[#0A0A0A] flex flex-col relative overflow-hidden font-sans"
    >
      {/* BACKGROUND ELEMENTS (Consistent Theme) */}
      <div className="absolute top-0 left-0 w-[120%] h-[60%] -translate-x-[10%] bg-[radial-gradient(ellipse_at_top,#2A2A30_0%,transparent_70%)] opacity-70"></div>


      {/* Dynamic iOS Pad */}
      <div className="w-full h-12 shrink-0 relative z-50"></div>

      {/* HEADER BAR */}
      <div className="px-8 pt-6 pb-2 shrink-0 relative z-30 flex items-center justify-between">
        <button 
          onClick={() => onNavigate('auth')}
          className="w-10 h-10 -ml-2 rounded-full border-[1.5px] border-white/10 bg-[#151515]/80 flex items-center justify-center hover:bg-[#252525] transition-colors backdrop-blur-md"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <div className="flex items-center space-x-2 text-[13px] font-semibold text-[#B3B3B3]">
          <span>Legal Agreement</span>
          <Scale className="w-4 h-4" />
        </div>
      </div>

      {/* SCROLLABLE DOCUMENT VIEW */}
      <div className="flex-1 overflow-y-auto px-8 relative z-20 no-scrollbar pb-[100px]">
        {/* Title */}
        <div className="mb-10 mt-6">
          <h1 className="text-[34px] font-[600] text-white tracking-tight mb-2 leading-[1.1]">
            Terms of<br/>Service
          </h1>
          <p className="text-[14px] font-medium text-gray-400 tracking-tight">
            Effective Date: April 5, 2026
          </p>
        </div>

        {/* Content Blocks */}
        <div className="space-y-8">
          
          <section>
            <h2 className="text-[18px] font-[600] text-white mb-3 tracking-tight">1. Acceptance of Terms</h2>
            <p className="text-[14px] text-[#A1A1A6] leading-[1.6] font-medium tracking-tight">
              By registering an account and utilizing ArcVault, you implicitly agree to be legally bound by these conditions. If you do not agree with any aspect of our security protocols or service limitations, you must immediately cease usage of our infrastructure.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-[600] text-white mb-3 tracking-tight">2. No Liability for Local Loss</h2>
            <p className="text-[14px] text-[#A1A1A6] leading-[1.6] font-medium tracking-tight">
              Our architecture prevents us from recovering any improperly handled master passwords. You explicitly acknowledge that ArcVault operates firmly under zero-knowledge transmission. If you compromise your master key, your vault is irreversibly locked. We hold no liability for data loss.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-[600] text-white mb-3 tracking-tight">3. Acceptable Use Policy</h2>
            <p className="text-[14px] text-[#A1A1A6] leading-[1.6] font-medium tracking-tight">
              You are strictly forbidden from reverse engineering native encryption mechanisms or overloading internal PostgreSQL endpoints with automated injection scrapers. Account termination may be initiated autonomously for violating bandwidth bounds.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-[600] text-white mb-3 tracking-tight">4. Account Moderation</h2>
            <p className="text-[14px] text-[#A1A1A6] leading-[1.6] font-medium tracking-tight">
              While your vault contents remain cryptographically blind to us, your account presence metadata (such as associated emails and login timestamps) may be suspended, terminated, or restricted without warning should malicious access vectors be detected by our core defenses.
            </p>
          </section>

        </div>
      </div>
      
      {/* iOS Overlay Float Fade */}
      <div className="absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none z-30"></div>
      
      {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[4px] bg-white/20 rounded-full z-50"></div>
    </motion.div>
  );
};

export default TermsOfService;
