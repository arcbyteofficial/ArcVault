import React, { useState, useEffect } from 'react';
import { Home, Shield, User, Plus, Settings, ChevronRight, ArrowLeft, PenLine, Disc, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = ({ onNavigate }) => {
  const [monitorEnabled, setMonitorEnabled] = useState(false);
  const [userData, setUserData] = useState({ full_name: 'Brittni Lando', email: 'brittnilonda5487@gmail.com', phone_number: '' });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('arcvault_token');
      if (!token) return;
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const getInitials = (name) => {
    if (!name) return 'ME';
    const split = name.split(' ');
    if (split.length > 1) {
       return (split[0][0] + split[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full bg-[#0A0A0A] flex flex-col relative overflow-hidden font-sans pb-4"
    >
      {/* ABSTRACT LIGHT RAYS (Mimics screenshot deep cyan ambient background gradient) */}
      <div className="absolute top-0 right-0 w-[150%] h-[80%] -translate-x-[20%] -translate-y-[20%] bg-[radial-gradient(ellipse_at_top,#142E33_0%,transparent_60%)] opacity-30 pointer-events-none z-0"></div>

      {/* TOP HEADER */}
      <div className="flex justify-between items-center w-full px-6 pt-16 pb-2 z-20 relative">
        <button 
          onClick={() => onNavigate('dashboard')}
          className="w-10 h-10 rounded-full border-[1.2px] border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-300 stroke-[1.5]" />
        </button>
        <span className="text-white font-[500] text-[18px] tracking-tight">Profile</span>
        <button className="w-10 h-10 rounded-full border-[1.2px] border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
          <Settings className="w-[18px] h-[18px] text-gray-300" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 relative z-20 no-scrollbar pb-[140px]">
        {/* AVATAR BLOCK */}
        <div className="w-full flex flex-col items-center mt-6">
          <div className="relative w-[110px] h-[110px] mb-4">
            {/* SVG Glowing Arc */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none drop-shadow-[0_4px_10px_rgba(77,229,236,0.5)]">
              <circle
                cx="55" cy="55" r="53"
                fill="none"
                stroke="#1A1A1C"
                strokeWidth="2"
              />
              <circle
                cx="55" cy="55" r="53"
                fill="none"
                stroke="#4DE5EC"
                strokeWidth="2.5"
                strokeDasharray="330"
                strokeDashoffset="220"
                strokeLinecap="round"
                className="opacity-90"
              />
            </svg>

            {/* Inner Avatar Graphic */}
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[#222] to-[#0A0A0A] flex items-center justify-center overflow-hidden border border-transparent shadow-inner">
               <span className="text-[38px] font-[500] text-gray-300 tracking-wider font-sans">{getInitials(userData.full_name)}</span>
            </div>
            
            {/* Pro Badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#4DE5EC] text-[#0A0A0A] text-[11px] font-[700] px-4 py-[3px] rounded-full shadow-[0_0_15px_rgba(77,229,236,0.4)] whitespace-nowrap z-10 tracking-tight">
              Pro
            </div>
          </div>

          <h2 className="text-white text-[25px] font-[500] tracking-tight mt-1">{userData.full_name}</h2>
          <p className="text-gray-400 text-[14px] mt-0.5 tracking-tight">{userData.email}</p>
          
          <button className="bg-[#1C1C1E] hover:bg-[#252528] transition-colors rounded-full px-5 py-2 mt-6 flex items-center space-x-2 border border-white/5 shadow-md">
            <PenLine className="w-[14px] h-[14px] text-gray-300" />
            <span className="text-gray-300 text-[13px] font-[500]">Edit Profile</span>
          </button>
        </div>

        {/* INVENTORIES LISTING */}
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="mt-10">
          <h3 className="text-white text-[16px] font-[600] tracking-tight mb-4 px-1">Inventories</h3>
          
          <div className="space-y-4">
            {/* Turquoise Metric Card Group */}
            <motion.div variants={itemVariants} className="w-full bg-[#111113] rounded-3xl border border-[#4DE5EC]/70 px-5 shadow-[0_0_20px_rgba(77,229,236,0.06)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#4DE5EC]/[0.03] to-transparent pointer-events-none"></div>

              {/* Row 1 */}
              <div className="flex items-center justify-between py-[18px] border-b border-white-[0.03]">
                <div className="flex items-center space-x-4 relative z-10">
                  <Disc className="w-5 h-5 text-gray-400 stroke-[1.5]" />
                  <span className="text-gray-200 text-[15px] font-[400] tracking-tight">Dear Web Monitoe</span>
                </div>
                {/* Turquoise Motion Toggle */}
                <div 
                  className={`relative z-10 w-12 h-[26px] rounded-full p-[2px] shadow-inner flex items-center transition-colors cursor-pointer ${monitorEnabled ? 'bg-[#4DE5EC]' : 'bg-[#2A2A2E]'}`}
                  onClick={() => setMonitorEnabled(!monitorEnabled)}
                  style={{ justifyContent: monitorEnabled ? 'flex-end' : 'flex-start' }}
                >
                  <motion.div 
                    layout 
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    className={`w-5 h-5 rounded-full shadow-sm ${monitorEnabled ? 'bg-[#0A0A0A]' : 'bg-gray-400'}`}
                  ></motion.div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex items-center justify-between py-[18px] cursor-pointer relative z-10">
                <div className="flex items-center space-x-4">
                  <ShieldAlert className="w-5 h-5 text-gray-400 stroke-[1.5]" />
                  <span className="text-gray-200 text-[15px] font-[400] tracking-tight">Security score</span>
                </div>
                <div className="flex items-center space-x-1.5">
                   <span className="text-gray-400 text-[14px]">0%</span>
                   <ChevronRight className="w-[18px] h-[18px] text-gray-600 stroke-[2]" />
                </div>
              </div>
            </motion.div>

            {/* Google Pill Card */}
            <motion.div variants={itemVariants} className="w-full bg-[#111113] rounded-3xl border border-white-[0.02] px-5 py-[18px] flex items-center justify-between cursor-pointer hover:bg-[#161618] transition-colors shadow-sm">
                <div className="flex items-center space-x-4">
                  <svg width="22" height="22" viewBox="0 0 48 48" className="mr-1">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  <span className="text-gray-200 text-[15px] font-[400] tracking-tight">Google</span>
                </div>
                <ChevronRight className="w-[18px] h-[18px] text-gray-600 stroke-[2]" />
            </motion.div>

            {/* Facebook Pill Card */}
            <motion.div variants={itemVariants} className="w-full bg-[#111113] rounded-3xl border border-white-[0.02] px-5 py-[18px] flex items-center justify-between cursor-pointer hover:bg-[#161618] transition-colors shadow-sm mb-4">
                <div className="flex items-center space-x-4">
                  {/* Facebook SVG Logo */}
                  <div className="w-[22px] h-[22px] rounded-full bg-[#1877F2] flex items-center justify-center mr-1">
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                     </svg>
                  </div>
                  <span className="text-gray-200 text-[15px] font-[400] tracking-tight">Facebook</span>
                </div>
                <ChevronRight className="w-[18px] h-[18px] text-gray-600 stroke-[2]" />
            </motion.div>

          </div>
        </motion.div>
      </div>

      {/* FLOATING BOTTOM NAV BAR */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center bg-[#131315]/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.8)] rounded-full py-[5px] px-[5px]">
        {/* Nav Group */}
        <div className="flex items-center space-x-2 mr-2 pr-2 border-r border-white/10">
          {/* Home */}
          <button 
            onClick={() => onNavigate('dashboard')}
            className="w-12 h-12 bg-[#1C1C1E] hover:bg-[#252528] rounded-full flex items-center justify-center transition-colors"
          >
            <Home className="w-[20px] h-[20px] text-white stroke-[1.5]" />
          </button>
          
          {/* Shield */}
          <button onClick={() => onNavigate('security')} className="w-12 h-12 bg-[#1C1C1E] hover:bg-[#252528] rounded-full flex items-center justify-center transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" strokeWidth="2" />
            </svg>
          </button>
          
          {/* Active User */}
          <button className="w-12 h-12 bg-[#D1D1D1] rounded-full flex items-center justify-center shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]">
             <svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" fill="black" />
            </svg>
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

       {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[4px] bg-white/20 rounded-full z-50"></div>
    </motion.div>
  );
};

export default Profile;
