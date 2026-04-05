import React, { useState, useEffect } from 'react';
import { Home, Shield, Plus, ChevronRight, Share, Lock, Sparkles, MessageCircle, Key, ShieldCheck, Settings, QrCode, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import arcbyteLogo from '../assets/arcbyte.co Logo_white_transparent.png';

const Profile = ({ onNavigate }) => {
  const [autofillEnabled, setAutofillEnabled] = useState(true);
  const [userData, setUserData] = useState({ full_name: 'Tamal Adhikary', email: 'deanna.curtis@example.com', phone_number: '' });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('arcvault_token');
      if (!token) return;
      try {
        const API_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://engine.arcbyte.co';
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
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
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
      className="w-full h-full bg-[#080808] flex flex-col relative overflow-hidden font-sans pb-4"
    >
      <SEO title="ArcVault | Your Profile" />
      {/* GRID OVERLAY BACKGROUND (Matches mock background lines) */}


      {/* TOP HEADER */}
      <div className="flex justify-between items-center w-full px-5 pt-16 pb-4 z-20 relative">
        <div className="flex items-center space-x-2.5">
          <img src={arcbyteLogo} alt="ArcByte Core" className="w-[22px] h-[22px] object-contain" />
          <span className="text-white font-[600] text-[20px] tracking-tight">ArcByte</span>
        </div>
        
        {/* Upgrade Pill */}
        <button className="flex items-center bg-gradient-to-br from-[#E8E8E8] to-[#B3B3B3] rounded-full px-4 py-[6px] shadow-sm hover:scale-105 active:scale-95 transition-transform">
          <Share className="w-3.5 h-3.5 text-black mr-2 stroke-[2.5]" />
          <span className="text-black text-[13px] font-[700] tracking-tight">Upgrade</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 relative z-20 no-scrollbar pb-[140px]">
        
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col w-full space-y-4">
          
          {/* USER CARD BLOCK */}
          <motion.div variants={itemVariants} className="w-full bg-[#18181A] rounded-[26px] p-2 flex flex-col">
            
            {/* Row 1: Profile */}
            <div className="flex items-center justify-between p-2 rounded-[20px] cursor-pointer hover:bg-[#202022] transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-[46px] h-[46px] bg-[#0A0A0A] rounded-full flex items-center justify-center border border-white/5 shadow-inner">
                   {/* Fallback to Initials */}
                   <span className="text-[17px] font-[600] text-gray-300 tracking-tight">{getInitials(userData.full_name)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-100 text-[15px] font-[500] tracking-tight">{userData.full_name}</span>
                  <span className="text-gray-400 text-[13px]">{userData.email}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 mr-2" />
            </div>

            {/* Divider (Implicit invisible spacing per screenshot) */}
            <div className="h-0.5"></div>

            {/* Row 2: Sign in another device */}
            <div className="flex items-center justify-between p-2 rounded-[20px] cursor-pointer hover:bg-[#202022] transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-[46px] h-[46px] bg-[#0A0A0A] rounded-full flex items-center justify-center border border-white/5">
                   <QrCode className="w-[20px] h-[20px] text-gray-200 stroke-[1.5]" />
                </div>
                <span className="text-gray-100 text-[15px] font-[500] tracking-tight">Sign in on another Device</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 mr-2" />
            </div>
            
          </motion.div>


          {/* SECURITY SECTION */}
          <motion.div variants={itemVariants} className="w-full flex-col mt-2">
            <h3 className="text-[14px] font-[500] text-gray-200 ml-4 mb-2 tracking-tight">Security</h3>
            
            <div className="w-full bg-[#18181A] rounded-[30px] p-2 flex flex-col">
              
              {/* Row 1: Lock with */}
              <div className="flex items-center justify-between p-2.5 rounded-[22px] cursor-pointer hover:bg-[#202022] transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-[48px] h-[48px] bg-[#0A0A0A] rounded-full flex items-center justify-center border border-white/5">
                    <Lock className="w-[20px] h-[20px] text-gray-400 stroke-[1.5]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-100 text-[15px] font-[500] tracking-tight">Lock with</span>
                    <span className="text-gray-400 text-[13px]">None</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500 mr-2" />
              </div>

              {/* Row 2: Autofill */}
              <div className="flex items-center justify-between p-2.5 rounded-[22px] cursor-pointer hover:bg-[#202022] transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-[48px] h-[48px] bg-[#0A0A0A] rounded-full flex items-center justify-center border border-white/5 relative">
                     <Sparkles className="w-[18px] h-[18px] text-gray-400 stroke-[1.5] absolute" style={{ transform: 'rotate(45deg)' }} />
                  </div>
                  <span className="text-gray-100 text-[15px] font-[500] tracking-tight">Autofill</span>
                </div>
                
                {/* Custom Toggle Switch */}
                <div 
                  className={`w-14 h-8 rounded-full p-1 flex items-center transition-colors cursor-pointer mr-2 shadow-inner border border-white/5 ${autofillEnabled ? 'bg-[#0A0A0A]' : 'bg-[#111]'}`}
                  onClick={() => setAutofillEnabled(!autofillEnabled)}
                  style={{ justifyContent: autofillEnabled ? 'flex-end' : 'flex-start' }}
                >
                  <motion.div 
                    layout 
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    className={`w-[22px] h-[22px] rounded-full shadow-sm ${autofillEnabled ? 'bg-white' : 'bg-[#333]'}`}
                  ></motion.div>
                </div>
              </div>

            </div>
          </motion.div>

          <motion.p variants={itemVariants} className="text-[13px] text-gray-400/90 ml-4 mt-0.5 mb-2 leading-snug pr-8 tracking-tight">
            Automatically fill in your usernames and passwords.
          </motion.p>


          {/* PILL LIST CARDS */}
          {/* Alias */}
          <motion.div variants={itemVariants} className="w-full bg-[#18181A] rounded-[30px] p-2 flex items-center justify-between cursor-pointer hover:bg-[#202022] transition-colors">
             <div className="flex items-center space-x-4 ml-1">
                <div className="w-[46px] h-[46px] bg-[#0A0A0A] rounded-full flex items-center justify-center border border-white/5">
                   <MessageCircle className="w-[18px] h-[18px] text-gray-400 stroke-[1.5]" />
                </div>
                <span className="text-gray-200 text-[15px] font-[500] tracking-tight">Alias management</span>
             </div>
             <ChevronRight className="w-5 h-5 text-gray-500 mr-2.5" />
          </motion.div>

          {/* Passkeys */}
          <motion.div variants={itemVariants} className="w-full bg-[#18181A] rounded-[30px] p-2 flex items-center justify-between cursor-pointer hover:bg-[#202022] transition-colors">
             <div className="flex items-center space-x-4 ml-1">
                <div className="w-[46px] h-[46px] bg-[#0A0A0A] rounded-full flex items-center justify-center border border-white/5">
                   <Key className="w-[18px] h-[18px] text-gray-400 stroke-[1.5]" />
                </div>
                <span className="text-gray-200 text-[15px] font-[500] tracking-tight">Passkeys</span>
             </div>
             <ChevronRight className="w-5 h-5 text-gray-500 mr-2.5" />
          </motion.div>

          {/* Secure links */}
          <motion.div variants={itemVariants} className="w-full bg-[#18181A] rounded-[30px] p-2 flex items-center justify-between cursor-pointer hover:bg-[#202022] transition-colors">
             <div className="flex items-center space-x-4 ml-1">
                <div className="w-[46px] h-[46px] bg-[#0A0A0A] rounded-full flex items-center justify-center border border-white/5">
                   <ShieldCheck className="w-[20px] h-[20px] text-gray-400 stroke-[1.5]" />
                </div>
                <span className="text-gray-200 text-[15px] font-[500] tracking-tight">Secure links</span>
             </div>
             <ChevronRight className="w-5 h-5 text-gray-500 mr-2.5" />
          </motion.div>

          {/* Settings */}
          <motion.div variants={itemVariants} className="w-full bg-[#18181A] rounded-[30px] p-2 flex items-center justify-between cursor-pointer hover:bg-[#202022] transition-colors">
             <div className="flex items-center space-x-4 ml-1">
                <div className="w-[46px] h-[46px] bg-[#0A0A0A] rounded-full flex items-center justify-center border border-white/5">
                   <Settings className="w-[20px] h-[20px] text-gray-400 stroke-[1.5]" />
                </div>
                <span className="text-gray-200 text-[15px] font-[500] tracking-tight">Settings</span>
             </div>
             <ChevronRight className="w-5 h-5 text-gray-500 mr-2.5" />
          </motion.div>

          <div className="h-4"></div>

          {/* Sign Out */}
          <motion.button 
            variants={itemVariants}
            onClick={() => {
              localStorage.removeItem('arcvault_token');
              sessionStorage.removeItem('arcvault_active_session');
              onNavigate('auth');
            }}
            className="w-full bg-[#18181A] rounded-[30px] p-2 flex items-center justify-start cursor-pointer hover:bg-[#2A1515] transition-colors mb-6 border border-[#FF3B30]/10"
          >
             <div className="flex items-center space-x-4 ml-1 w-full text-left">
                <div className="w-[46px] h-[46px] bg-[#220B0B] rounded-full flex items-center justify-center border border-[#FF3B30]/20 shrink-0">
                   <LogOut className="w-[18px] h-[18px] text-[#FF3B30] stroke-[2] ml-1" />
                </div>
                <span className="text-[#FF3B30] text-[15px] font-[500] tracking-tight">Sign Out</span>
             </div>
          </motion.button>

          <div className="h-8"></div>

        </motion.div>
      </div>

      {/* FLOATING BOTTOM NAV BAR (ArcVault Native) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center bg-[#18181A]/80 backdrop-blur-3xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.8)] rounded-full py-[5px] px-[5px]">
        {/* Nav Group */}
        <div className="flex items-center space-x-1.5 mr-2 pr-2 border-r border-[#333]">
          {/* Home */}
          <button 
            aria-label="Dashboard"
            onClick={() => onNavigate('dashboard')}
            className="w-[46px] h-[46px] bg-transparent hover:bg-[#252528] rounded-full flex items-center justify-center transition-colors"
          >
            <Home className="w-[20px] h-[20px] text-gray-400 stroke-[1.5]" />
          </button>
          
          {/* Shield */}
          <button 
            aria-label="Security Center"
            onClick={() => onNavigate('security')} 
            className="w-[46px] h-[46px] bg-transparent hover:bg-[#252528] rounded-full flex items-center justify-center transition-colors"
          >
            <Shield className="w-[20px] h-[20px] text-gray-400 stroke-[1.5]" />
          </button>
          
          {/* Active User (Profile) */}
          <button aria-label="User Profile" className="w-[46px] h-[46px] bg-[#D1D1D1] rounded-full flex items-center justify-center shadow-[inset_0_-2px_6px_rgba(0,0,0,0.2)] ml-0.5">
             <svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" fill="black" />
            </svg>
          </button>
        </div>

        {/* Floating Add Button */}
        <button 
          aria-label="Generator"
          onClick={() => onNavigate('generator')}
          className="w-[46px] h-[46px] bg-gradient-to-tr from-[#EDEDED] to-[#FFFFFF] rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(255,255,255,0.2)] ml-0.5 hover:scale-105 active:scale-95 transition-transform"
        >
          <Plus className="w-5 h-5 text-black stroke-[2]" />
        </button>
      </div>

       {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[4px] bg-white/20 rounded-full z-50"></div>
    </motion.div>
  );
};

export default Profile;
