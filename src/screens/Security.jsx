import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Home, Plus, ShieldAlert, Lock, Fingerprint, MoreHorizontal, User, Shield } from 'lucide-react';
import arcbyteLogo from '../assets/arcbyte.co Logo_white_transparent.png';

const Security = ({ onNavigate }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full bg-[#060606] flex flex-col relative overflow-hidden font-sans pb-4"
    >
      {/* PROTON PASS AESTHETIC BACKGROUND */}
      <div className="absolute inset-0 bg-[#060606]"></div>
      
      {/* Heavy Top Center Spotlight matches the notch glow in screenshot */}
      <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[50%] bg-[radial-gradient(ellipse_at_top_center,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0.05)_40%,transparent_70%)] pointer-events-none z-0"></div>
      <div className="absolute top-0 left-0 w-full h-[100%] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:42px_42px] pointer-events-none [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)] z-0"></div>
      
      <div className="absolute top-[32%] left-[38%] w-[2px] h-[2px] bg-white rounded-full opacity-80 shadow-[0_0_6px_2px_rgba(255,255,255,0.8)] z-0"></div>
      <div className="absolute top-[24%] left-[62%] w-[1.5px] h-[1.5px] bg-white rounded-full opacity-60 shadow-[0_0_5px_1px_rgba(255,255,255,0.6)] z-0"></div>
      <div className="absolute top-[52%] right-[22%] w-[2px] h-[2px] bg-white rounded-full opacity-50 shadow-[0_0_5px_1px_rgba(255,255,255,0.5)] z-0"></div>

      {/* Floating Bottom Nav Indicator Padding space */}
      <div className="flex-1 overflow-y-auto px-5 relative z-20 no-scrollbar pt-14 pb-32">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
          
          {/* DARK WEB MONITORING CARD */}
          <motion.div variants={itemVariants} className="w-full bg-[#18181A] rounded-[2.5rem] p-6 relative overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.8)] border-t-[1.5px] border-white/10 group cursor-pointer hover:bg-[#1C1C1E] transition-colors">
            {/* Inner top glow to match the screenshot spotlight dropping on the card */}
            <div className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none"></div>
            
            <div className="relative z-10 w-[65%]">
              <h2 className="text-white text-[20px] font-[500] tracking-tight mb-1.5">Dark Web Monitoring</h2>
              <p className="text-[#A1A1A5] text-[14px] leading-[1.3] font-medium tracking-tight mb-5">
                Get notified if your email, password or other personal data was leaked.
              </p>
              
              <button className="bg-gradient-to-b from-[#EEEEEE] to-[#AAAAAA] text-black text-[15px] font-[600] px-7 py-2 rounded-full shadow-[0_4px_10px_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-[0.98] transition-transform">
                Enable
              </button>
            </div>

            {/* Custom SVG 3D Analytics Chart Mocking the Screenshot Graphic */}
            <div className="absolute right-[-10px] top-[20px] w[120px] h-[120px] pointer-events-none drop-shadow-2xl opacity-90 scale-90">
              <div className="relative w-full h-full flex items-center justify-center">
                 {/* Chart Board Stand Legs */}
                 <div className="absolute bottom-[20px] left-[55px] w-[3px] h-[30px] bg-[#444] rotate-[25deg] shadow-lg rounded-full"></div>
                 <div className="absolute bottom-[20px] right-[55px] w-[3px] h-[30px] bg-[#666] -rotate-[25deg] shadow-lg rounded-full"></div>
                 <div className="absolute bottom-[20px] left-[45px] w-[3px] h-[30px] bg-[#222] rotate-[45deg] shadow-lg rounded-full"></div>
                 
                 {/* Main Board Base */}
                 <div className="w-[100px] h-[70px] bg-[#EAEAEA] rounded-[8px] border-b-[4px] border-r-[4px] border-[#AAAAAA] relative flex items-center justify-center -rotate-3 overflow-hidden">
                    {/* Inner Graph Screen */}
                    <div className="w-[85px] h-[55px] border-[1.5px] border-[#D1D1D1] rounded-[4px] bg-[#F5F5F5] relative shadow-inner">
                       {/* Grid Lines */}
                       <div className="absolute top-[25%] w-full h-[1px] bg-[#E0E0E0]"></div>
                       <div className="absolute top-[50%] w-full h-[1px] bg-[#E0E0E0]"></div>
                       <div className="absolute top-[75%] w-full h-[1px] bg-[#E0E0E0]"></div>
                       
                       <div className="absolute left-[33%] h-full w-[1px] bg-[#E0E0E0]"></div>
                       <div className="absolute left-[66%] h-full w-[1px] bg-[#E0E0E0]"></div>

                       {/* Foreground Chart Line 1 (Dark Grey) */}
                       <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                         <polyline points="0,20 30,70 65,30 100,50" fill="none" stroke="#222" strokeWidth="4" strokeLinejoin="round" />
                       </svg>
                       {/* Foreground Chart Line 2 (Light Grey) */}
                       <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                         <polyline points="0,50 35,30 70,80 100,20" fill="none" stroke="#999" strokeWidth="3" strokeLinejoin="round" />
                       </svg>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* ARCBYTE SENTINEL CARD */}
          <motion.div variants={itemVariants} className="w-full h-[76px] bg-gradient-to-r from-[#1E1E1E] via-[#111111] to-[#0A0A0A] rounded-[2rem] flex items-center px-4 cursor-pointer hover:bg-[#222] transition-colors shadow-[0_10px_25px_rgba(0,0,0,0.6)] border-[1.5px] border-white/[0.06] mt-6 relative overflow-hidden group">
            {/* Sparkle background map */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.06)_0%,transparent_60%)] pointer-events-none"></div>
            
            <div className="w-[54px] h-[54px] rounded-full bg-gradient-to-br from-[#2A2A2E] to-[#111111] flex items-center justify-center shrink-0 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_4px_10px_rgba(0,0,0,0.5)] border border-white/5 relative z-10 group-hover:scale-105 transition-transform">
               <img src={arcbyteLogo} className="w-[20px] h-[20px] object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" alt="Sentinel Icon"/>
            </div>
            <div className="ml-5 flex-1 relative z-10">
              <div className="text-white font-[500] text-[16px] tracking-tight">ArcByte Sentinel</div>
              <div className="text-[#88888C] font-medium text-[13px] tracking-tight mt-0.5">Advanced account program.</div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 z-10 mr-2" strokeWidth={2} />
          </motion.div>

          {/* PASSWORD HEALTH */}
          <motion.div variants={itemVariants} className="mt-8 mb-6 relative">
            <h3 className="text-white text-[14px] font-[500] tracking-tight mb-3 px-1 drop-shadow-md">Password Health</h3>
            <div className="w-full h-[28px] bg-[#141414] rounded-full overflow-hidden shadow-[inset_0_2px_5px_rgba(0,0,0,0.8),0_4px_10px_rgba(0,0,0,0.5)] border-t-[0.5px] border-white/[0.04]">
               <div className="h-full w-[65%] bg-gradient-to-b from-[#EAEAEA] to-[#999999] rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)]"></div>
            </div>
          </motion.div>

          {/* LIST ITMES */}
          <div className="space-y-3">
             <ListItem 
                icon={<ShieldAlert className="w-5 h-5 text-[#88888A]" />}
                title="Weak passwords"
                subtitle="Change your passwords"
                badgeCount={1}
                variants={itemVariants}
             />
             <ListItem 
                icon={<Lock className="w-[18px] h-[18px] text-[#88888A] mb-0.5" />}
                title="Reused passwords"
                subtitle="Generate unique passwords"
                badgeCount={1}
                variants={itemVariants}
             />
             <ListItem 
                icon={<Fingerprint className="w-5 h-5 text-white" />}
                title="Inactive 2FA"
                subtitle="Set up 2FA for more security"
                badgeCount={0}
                variants={itemVariants}
             />
             <ListItem 
                icon={<MoreHorizontal className="w-5 h-5 text-gray-400" />}
                title="Excluded from monitoring"
                subtitle="These items are not checked"
                badgeCount={0}
                variants={itemVariants}
             />
          </div>
        </motion.div>
      </div>

      {/* FLOATING BOTTOM NAV BAR */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center bg-[#131315]/80 backdrop-blur-3xl border-[0.5px] border-white/[0.1] shadow-[0_15px_40px_rgba(0,0,0,0.8)] rounded-full py-[5px] px-[5px]">
        {/* Nav Group */}
        <div className="flex items-center space-x-2 mr-2 pr-2 border-r border-white/10">
          {/* Home */}
          <button 
            onClick={() => onNavigate('dashboard')}
            className="w-12 h-12 bg-[#1C1C1E] hover:bg-[#252528] rounded-full flex items-center justify-center transition-colors"
          >
            <Home className="w-[20px] h-[20px] text-white stroke-[1.5]" />
          </button>
          
          {/* Security (Active) */}
          <button className="w-12 h-12 bg-[#D1D1D1] rounded-full flex items-center justify-center shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1),0_0_15px_rgba(255,255,255,0.15)] relative">
            <Shield className="w-[20px] h-[20px] text-black stroke-[2] fill-black/10" />
            <div className="absolute w-1.5 h-1.5 bg-black rounded-full bottom-2"></div>
          </button>
          
          {/* Active User */}
          <button 
            onClick={() => onNavigate('profile')}
            className="w-12 h-12 bg-[#1C1C1E] hover:bg-[#252528] rounded-full flex items-center justify-center transition-colors"
          >
            <User className="w-[20px] h-[20px] text-white stroke-[1.5]" />
          </button>
        </div>

        {/* Floating Add Button */}
        <button 
          onClick={() => onNavigate('generator')}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(255,255,255,0.2)] ml-1 hover:scale-105 active:scale-95 transition-transform"
        >
          <Plus className="w-6 h-6 text-black stroke-[2]" />
        </button>
      </div>
      
      {/* iOS Home Indicator Padding visual mock */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[4px] bg-white/20 rounded-full z-[100]"></div>

    </motion.div>
  );
};

const ListItem = ({ icon, title, subtitle, badgeCount, variants }) => {
  return (
    <motion.div variants={variants} className="w-full h-[80px] bg-[#141416] rounded-[1.8rem] flex items-center px-4 cursor-pointer hover:bg-[#1A1A1C] transition-colors border-t-[0.5px] border-white/[0.04] shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
      <div className="w-[48px] h-[48px] rounded-full bg-[#050505] flex items-center justify-center shrink-0 border-[0.5px] border-white/[0.08] shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)] relative">
        {icon}
        {badgeCount > 0 && (
          <div className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-[#EAEAEA] rounded-full flex items-center justify-center border-2 border-[#141416] text-black text-[10px] font-[800] tracking-tighter">
            {badgeCount}
          </div>
        )}
      </div>
      <div className="ml-4 flex-1">
        <div className="text-white font-[500] text-[16px] tracking-tight">{title}</div>
        <div className="text-[#88888A] text-[13px] tracking-tight mt-0.5">{subtitle}</div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-500 mr-1" strokeWidth={1.5} />
    </motion.div>
  );
}

export default Security;
