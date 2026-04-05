import React, { useState, useEffect } from 'react';
import { Home, Shield, User, Plus, Settings, Key, Fingerprint, HelpCircle, LogOut, ChevronRight, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = ({ onNavigate }) => {
  const [faceIdEnabled, setFaceIdEnabled] = useState(true);
  const [userData, setUserData] = useState({ full_name: '', email: '', phone_number: '' });

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
    hidden: { opacity: 0, y: 20 },
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
      {/* PROTON PASS AESTHETIC BACKGROUND */}
      <div className="absolute inset-0 bg-[#060606]"></div>

      <div className="absolute top-0 left-0 w-full h-[100%] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:42px_42px] pointer-events-none [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)] z-0"></div>
      <div className="absolute top-[32%] left-[38%] w-[2px] h-[2px] bg-white rounded-full opacity-80 shadow-[0_0_6px_2px_rgba(255,255,255,0.8)] z-0"></div>
      <div className="absolute top-[24%] left-[62%] w-[1.5px] h-[1.5px] bg-white rounded-full opacity-60 shadow-[0_0_5px_1px_rgba(255,255,255,0.6)] z-0"></div>
      <div className="absolute top-[52%] right-[22%] w-[2px] h-[2px] bg-white rounded-full opacity-50 shadow-[0_0_5px_1px_rgba(255,255,255,0.5)] z-0"></div>


      {/* TOP HEADER */}
      <div className="flex justify-center items-center w-full px-6 pt-16 pb-4 z-20 relative">
        <span className="text-white font-[600] text-[20px] tracking-tight">Account</span>
      </div>

      <div className="flex-1 overflow-y-auto px-6 relative z-20 no-scrollbar pb-32">
        {/* PROFILE HEADER CARD */}
        <div className="w-full bg-[#0A0A0A]/70 backdrop-blur-3xl rounded-[2rem] p-6 flex flex-col items-center border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05)_0%,transparent_40%)] pointer-events-none"></div>
          
          <div className="w-24 h-24 bg-gradient-to-br from-[#2A2A2A] to-[#0A0A0A] rounded-full flex items-center justify-center shadow-[inset_0_2px_15px_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.8)] border border-white/15 mb-4 relative z-10">
             <span className="text-[34px] font-[600] text-white tracking-widest drop-shadow-md">{getInitials(userData.full_name)}</span>
             {/* Premium Badge */}
             <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#1A1A1C] border-[1.5px] border-[#333] rounded-full flex items-center justify-center shadow-lg">
               <Crown className="w-4 h-4 text-white" />
             </div>
          </div>
          <h2 className="text-white text-[24px] font-[600] tracking-tight relative z-10">{userData.full_name || 'Anonymous User'}</h2>
          <p className="text-gray-400 text-[14px] mt-1 relative z-10">{userData.email || 'No email securely stored'}</p>
          {userData.phone_number && <p className="text-gray-500 text-[13px] font-mono mt-1 mb-4 relative z-10">{userData.phone_number}</p>}
          {!userData.phone_number && <div className="mb-4 relative z-10"></div>}
          
          <button className="relative z-10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors text-white text-[14px] font-[500] px-8 py-3 rounded-full border border-white/10 shadow-lg">
            Edit Profile
          </button>
        </div>

        {/* SETTINGS GROUPS */}
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="mt-6 space-y-6">
          
          {/* Security Group */}
          <motion.div variants={itemVariants}>
            <h3 className="text-gray-500 text-[12px] font-[700] uppercase tracking-widest mb-3 px-4">Security Preferences</h3>
            <div className="w-full bg-[#0A0A0A]/70 backdrop-blur-3xl rounded-[2rem] px-5 py-2 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
              
              <div className="flex items-center justify-between py-4 border-b border-white/5 cursor-pointer group">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-sm border border-white/5 group-hover:border-white/10 transition-colors">
                    <Key className="w-[18px] h-[18px] text-white" />
                  </div>
                  <span className="ml-4 text-white text-[16px] font-[500]">Master Password</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </div>

              <div className="flex items-center justify-between py-4 border-b border-white/5 cursor-pointer group">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-sm border border-white/5 group-hover:border-white/10 transition-colors">
                    <Fingerprint className="w-[18px] h-[18px] text-white" />
                  </div>
                  <span className="ml-4 text-white text-[16px] font-[500]">Face ID / Biometrics</span>
                </div>
                {/* Interactive Motion Toggle */}
                <div 
                  className={`w-12 h-7 rounded-full p-0.5 shadow-inner flex items-center transition-colors cursor-pointer ${faceIdEnabled ? 'bg-[#34C759]' : 'bg-gray-600'}`}
                  onClick={() => setFaceIdEnabled(!faceIdEnabled)}
                  style={{ justifyContent: faceIdEnabled ? 'flex-end' : 'flex-start' }}
                >
                  <motion.div 
                    layout 
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    className="w-6 h-6 bg-white rounded-full shadow-sm"
                  ></motion.div>
                </div>
              </div>

              <div className="flex items-center justify-between py-4 cursor-pointer group">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-sm border border-white/5 group-hover:border-white/10 transition-colors">
                    <Shield className="w-[18px] h-[18px] text-white" />
                  </div>
                  <span className="ml-4 text-white text-[16px] font-[500]">Two-Factor Authentication</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </div>

            </div>
          </motion.div>

          {/* General Group */}
          <motion.div variants={itemVariants}>
            <h3 className="text-gray-500 text-[12px] font-[700] uppercase tracking-widest mb-3 px-4 mt-8">General Preferences</h3>
            <div className="w-full bg-[#0A0A0A]/70 backdrop-blur-3xl rounded-[2rem] px-5 py-2 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
              
              <div className="flex items-center justify-between py-4 border-b border-white/5 cursor-pointer group">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-sm border border-white/5 group-hover:border-white/10 transition-colors">
                    <Settings className="w-[18px] h-[18px] text-white" />
                  </div>
                  <span className="ml-4 text-white text-[16px] font-[500]">App Preferences</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </div>

              <div className="flex items-center justify-between py-4 cursor-pointer group">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-sm border border-white/5 group-hover:border-white/10 transition-colors">
                    <HelpCircle className="w-[18px] h-[18px] text-white" />
                  </div>
                  <span className="ml-4 text-white text-[16px] font-[500]">Help & Support</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </div>

            </div>
          </motion.div>

          {/* Log Out Button */}
          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              localStorage.removeItem('arcvault_token');
              onNavigate('auth');
            }}
            className="w-full bg-[#0A0A0A]/70 backdrop-blur-3xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] hover:bg-[#111111]/80 transition-colors rounded-[2rem] p-5 flex items-center justify-center border border-white/10 mt-6 group"
          >
            <LogOut className="w-[18px] h-[18px] text-[#FF453A] group-hover:scale-110 transition-transform drop-shadow-sm" />
            <span className="ml-3 text-[#FF453A] text-[16px] font-[600] tracking-tight">Sign Out</span>
          </motion.button>

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
    </motion.div>
  );
};

export default Profile;
