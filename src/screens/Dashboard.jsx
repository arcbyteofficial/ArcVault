import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Wand2, ChevronRight, Home, Shield, User, Plus, Menu, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import arcbyteLogo from '../assets/arcbyte.co Logo_white_transparent.png';

const Dashboard = ({ onNavigate }) => {
  const [vaultItems, setVaultItems] = useState([]);
  
  useEffect(() => {
    const fetchVault = async () => {
      const token = localStorage.getItem('arcvault_token');
      if (!token) {
        onNavigate('auth');
        return;
      }
      
      const API_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://engine.arcbyte.co';
      try {
        const res = await fetch(`${API_URL}/api/vault`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setVaultItems(data);
        }
      } catch (err) {
        console.error('Failed to fetch vault state');
      }
    };
    fetchVault();
  }, []);

  // Layout and container staggered motion variants
  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
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
      <SEO 
        title="ArcVault | Dashboard" 
        description="Manage your securely encrypted passwords locally." 
      />
      {/* BACKGROUND ELEMENTS */}
      {/* 1. Top Light Radial Glow */}
      <div className="absolute top-0 left-0 w-[120%] h-[60%] -translate-x-[10%] bg-[radial-gradient(ellipse_at_top,#2A2A30_0%,transparent_70%)] opacity-70"></div>
      
      {/* 2. Grid Overlay (fades out at bottom) */}


      {/* TOP NAVIGATION */}
      <div className="flex justify-between items-center w-full px-6 pt-16 z-20 relative">
        <div className="flex items-center space-x-3 cursor-pointer">
          <img src={arcbyteLogo} alt="ArcByte Icon" className="h-[24px] w-auto object-contain drop-shadow-md" />
          <span className="text-white font-[600] text-[20px] tracking-[-0.02em]">ArcByte</span>
        </div>
        <button aria-label="Menu" className="w-10 h-10 rounded-full border-[1.5px] border-white/10 bg-[#151515]/60 flex items-center justify-center backdrop-blur-md">
          <Menu className="w-5 h-5 text-white/80 stroke-[1.5]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 relative z-20 no-scrollbar pb-24">
        {/* HERO TEXT */}
        <h1 className="mt-8 text-[44px] font-[600] text-white leading-[1.2] tracking-tight">
          <div>Stay Fast.</div>
          <div className="mt-1">Stay Secure.</div>
        </h1>

        {/* SEARCH BAR */}
        <div className="w-full h-14 bg-[#1C1C1E] rounded-full flex items-center px-4 mt-10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),0_4px_10px_rgba(0,0,0,0.2)]">
          <Search className="w-5 h-5 text-gray-400 ml-1" strokeWidth={1.5} />
          <input aria-label="Search Vault" className="flex-1 bg-transparent text-white px-3 focus:outline-none placeholder:text-gray-400 text-[15px]" placeholder="Search" />
          <div className="w-[34px] h-[34px] rounded-full bg-[#2C2C2E] flex items-center justify-center">
            <SlidersHorizontal className="w-[18px] h-[18px] text-gray-300 stroke-[1.5]" />
          </div>
        </div>

        {/* AUTOFILL BANNER */}
        <div className="w-full h-[76px] bg-gradient-to-r from-[#2C2C2E] to-[#1A1A1C] rounded-[2.5rem] flex items-center px-3 mt-6 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_8px_20px_rgba(0,0,0,0.4)] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-white/5 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.2)_0%,transparent_60%)]"></div>
          
          <div className="w-[52px] h-[52px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.3)] z-10 shrink-0">
            <Wand2 className="w-[22px] h-[22px] text-black stroke-[1.5]" />
          </div>
          <div className="ml-4 flex-1 z-10">
            <div className="text-white font-[500] text-[15px] tracking-tight">Enjoy the magic of AutoFill</div>
            <div className="text-gray-400 text-[13px] mt-0.5 tracking-tight">Stay Safe, Stay Secure</div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 z-10 mr-2" strokeWidth={1.5} />
        </div>

        {/* LIST SECTION */}
        <div className="flex justify-between items-center mt-8 mb-4 px-1">
          <h3 className="text-white font-medium text-[15px]">Today</h3>
          <button className="text-gray-400 text-[13px] hover:text-white transition-colors">See All</button>
        </div>

        {/* CARDS */}
        <motion.div 
          variants={listVariants}
          initial="hidden"
          animate="show"
          className="space-y-3"
        >
          {vaultItems.length === 0 ? (
            <motion.div variants={itemVariants} className="text-gray-500 text-[14px] px-2 text-center mt-6">Your vault is completely empty.<br/>Click the + button to add passwords.</motion.div>
          ) : (
            vaultItems.map(item => (
              <motion.div 
                key={item.id} 
                variants={itemVariants}
                whileTap={{ scale: 0.97 }}
                className="w-full h-[76px] bg-[#161618] rounded-[2rem] flex items-center px-4 cursor-pointer hover:bg-[#1c1c1e] transition-colors border border-transparent hover:border-white/5"
              >
                <div className="w-[46px] h-[46px] rounded-full flex items-center justify-center shrink-0 shadow-lg text-white font-[600] tracking-widest text-[14px]" style={{ backgroundColor: item.icon_color || '#333' }}>
                  {item.title.substring(0, 2).toUpperCase()}
                </div>
                <div className="ml-4 flex-1 truncate pr-2">
                  <div className="text-white font-medium text-[15px]">{item.title}</div>
                  <div className="text-gray-400 text-[13px] truncate tracking-tight mt-[1px]">{item.username || 'No username saved'}</div>
                </div>
                <LinkIcon className="w-[18px] h-[18px] text-gray-400 shrink-0 stroke-[1.5] mr-1" />
              </motion.div>
            ))
          )}
        </motion.div>
        
        {/* Padding for bottom float nav */}
        <div className="h-10"></div>
      </div>

      {/* FLOATING BOTTOM NAV BAR */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center bg-[#131315]/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.8)] rounded-full py-[5px] px-[5px]">
        {/* Nav Group */}
        <div className="flex items-center space-x-2 mr-2 pr-2 border-r border-white/10">
          {/* Active Home */}
          <button aria-label="Home" className="w-12 h-12 bg-[#D1D1D1] rounded-full flex items-center justify-center shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="black" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <path d="M9 22V12h6v10" fill="white" stroke="black"/>
            </svg>
          </button>
          
          {/* Shield */}
          <button aria-label="Security Center" onClick={() => onNavigate('security')} className="w-12 h-12 bg-[#1C1C1E] hover:bg-[#252528] rounded-full flex items-center justify-center transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" strokeWidth="2" />
            </svg>
          </button>
          
          {/* User */}
          <button 
            aria-label="User Profile"
            onClick={() => onNavigate('profile')}
            className="w-12 h-12 bg-[#1C1C1E] hover:bg-[#252528] rounded-full flex items-center justify-center transition-colors"
          >
            <User className="w-[20px] h-[20px] text-white stroke-[1.5]" />
          </button>
        </div>

        {/* Floating Add Button in the pill */}
        <button 
          aria-label="Generator"
          onClick={() => onNavigate('generator')}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(255,255,255,0.2)] ml-1 hover:scale-105 active:scale-95 transition-transform"
        >
          <Plus className="w-6 h-6 text-black stroke-[2]" />
        </button>
      </div>
    </motion.div>
  );
};

export default Dashboard;
