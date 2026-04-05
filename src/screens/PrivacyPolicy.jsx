import React from 'react';
import { ChevronLeft, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const PrivacyPolicy = ({ onNavigate }) => {

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full bg-[#0A0A0A] flex flex-col relative overflow-hidden font-sans"
    >
      <SEO title="ArcVault | Privacy Policy" />
      {/* BACKGROUND ELEMENTS (Consistent Theme) */}
      <div className="absolute top-0 left-0 w-[120%] h-[60%] -translate-x-[10%] bg-[radial-gradient(ellipse_at_top,#2A2A30_0%,transparent_70%)] opacity-70"></div>


      {/* Dynamic iOS Pad */}
      <div className="w-full h-12 shrink-0 relative z-50"></div>

      {/* HEADER BAR */}
      <div className="px-8 pt-6 pb-2 shrink-0 relative z-30 flex items-center justify-between">
        <button 
          aria-label="Go Back"
          onClick={() => onNavigate('auth')}
          className="w-10 h-10 -ml-2 rounded-full border-[1.5px] border-white/10 bg-[#151515]/80 flex items-center justify-center hover:bg-[#252525] transition-colors backdrop-blur-md"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <div className="flex items-center space-x-2 text-[13px] font-semibold text-[#B3B3B3]">
          <span>Secure Legal</span>
          <Shield className="w-4 h-4" />
        </div>
      </div>

      {/* SCROLLABLE DOCUMENT VIEW */}
      <div className="flex-1 overflow-y-auto px-8 relative z-20 no-scrollbar pb-[100px]">
        {/* Title */}
        <div className="mb-10 mt-6">
          <h1 className="text-[34px] font-[600] text-white tracking-tight mb-2 leading-[1.1]">
            Privacy<br/>Policy
          </h1>
          <p className="text-[14px] font-medium text-gray-400 tracking-tight">
            Last Updated: April 5, 2026
          </p>
        </div>

        {/* Content Blocks */}
        <div className="space-y-8">
          
          <section>
            <h2 className="text-[18px] font-[600] text-white mb-3 tracking-tight">1. Your Data, Locked.</h2>
            <p className="text-[14px] text-[#A1A1A6] leading-[1.6] font-medium tracking-tight">
              At ArcVault, we believe privacy is an inherent right. Our architecture is zero-knowledge by design. We do not track, intercept, or observe the master passwords you implement. Every byte of credentials generated locally is encrypted client-side securely prior to hitting our transmission networks. 
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-[600] text-white mb-3 tracking-tight">2. Information Collection</h2>
            <p className="text-[14px] text-[#A1A1A6] leading-[1.6] font-medium tracking-tight">
              We collect the bare minimum analytical diagnostic data required to operate core backend infrastructure, process Google OAuth matching routines reliably, and facilitate reset token deliveries via email. We strictly forbid selling internal relational profiles to external brokers.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-[600] text-white mb-3 tracking-tight">3. Cookies & Local Storage</h2>
            <p className="text-[14px] text-[#A1A1A6] leading-[1.6] font-medium tracking-tight">
              Our native client framework utilizes secure browser-grade &lt;localStorage&gt; components to continuously authenticate active sessions. Without rendering localized WebTokens dynamically, your persistent navigation integrity across vaults would destabilize.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-[600] text-white mb-3 tracking-tight">4. Third-Party Connections</h2>
            <p className="text-[14px] text-[#A1A1A6] leading-[1.6] font-medium tracking-tight">
              We partner solely with essential cloud infrastructure (like Hostinger, Railway, and internal PostgreSQL clusters). OAuth bindings via Google are processed directly through authoritative Google API endpoints, meaning we do not sniff unauthorized secondary account properties.
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

export default PrivacyPolicy;
