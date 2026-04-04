import React from 'react';
import { Home, Shield, User, Plus, Settings, Key, Fingerprint, HelpCircle, LogOut, ChevronRight, Crown } from 'lucide-react';

const Profile = ({ onNavigate }) => {
  return (
    <div className="w-full h-full bg-[#0A0A0A] flex flex-col relative overflow-hidden font-sans pb-4">
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute top-0 left-0 w-[120%] h-[60%] -translate-x-[10%] bg-[radial-gradient(ellipse_at_top,#2A2A30_0%,transparent_70%)] opacity-70 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-[60%] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)] pointer-events-none"></div>

      {/* TOP STATUS BAR (Dynamic Island) */}
      <div className="w-full h-12 flex justify-between items-center px-6 pt-2 z-50 text-white font-[600] text-[13px] absolute top-0 pointer-events-none">
        <span className="tracking-tight mt-1">9:41</span>
        <div className="w-[110px] h-[32px] bg-black rounded-full absolute left-1/2 -translate-x-1/2 mt-1 shadow-sm"></div>
        <div className="flex items-center space-x-1.5 opacity-90 mt-1">
           <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor">
              <rect x="0" y="6" width="2.5" height="4" rx="0.5" />
              <rect x="4" y="4" width="2.5" height="6" rx="0.5" />
              <rect x="8" y="2" width="2.5" height="8" rx="0.5" />
              <rect x="12" y="0" width="2.5" height="10" rx="0.5" />
           </svg>
           <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
              <path d="M7 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
              <path d="M3.5 6.5a5 5 0 0 1 7 0 .5.5 0 0 1-.7.7 4 4 0 0 0-5.6 0 .5.5 0 0 1-.7-.7z"/>
              <path d="M1 4a8.5 8.5 0 0 1 12 0 .5.5 0 0 1-.7.7 7.5 7.5 0 0 0-10.6 0A.5.5 0 0 1 1 4z"/>
           </svg>
           <div className="w-[22px] h-[11px] border border-white/40 rounded-[4px] p-[1.5px] flex relative ml-0.5">
             <div className="h-full w-full bg-[#34C759] rounded-[2px]"></div>
             <div className="absolute right-[-2.5px] top-[3px] w-[2px] h-[3px] bg-white/40 rounded-r-full"></div>
           </div>
        </div>
      </div>

      {/* TOP HEADER */}
      <div className="flex justify-center items-center w-full px-6 pt-16 z-20 relative">
        <span className="text-white font-[600] text-[18px] tracking-tight">Account</span>
      </div>

      <div className="flex-1 overflow-y-auto px-6 relative z-20 no-scrollbar pb-32">
        {/* PROFILE HEADER CARD */}
        <div className="w-full mt-6 bg-[#161618] rounded-[2rem] p-6 flex flex-col items-center border border-transparent hover:border-white/5 transition-colors shadow-lg">
          <div className="w-24 h-24 bg-gradient-to-br from-[#444] to-[#111] rounded-full flex items-center justify-center shadow-[inset_0px_2px_8px_rgba(255,255,255,0.3),0_4px_15px_rgba(0,0,0,0.6)] border border-white/10 mb-4 relative">
             <span className="text-[34px] font-[600] text-white tracking-widest drop-shadow-md">AB</span>
             {/* Premium Badge */}
             <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#1A1A1C] border-[1.5px] border-[#333] rounded-full flex items-center justify-center shadow-lg">
               <Crown className="w-4 h-4 text-white" />
             </div>
          </div>
          <h2 className="text-white text-[24px] font-[600] tracking-tight">Arc Byte</h2>
          <p className="text-gray-400 text-[14px] mt-1 mb-4">admin@arcbyte.com</p>
          
          <button className="bg-white/10 hover:bg-white/15 transition-colors text-white text-[14px] font-[500] px-6 py-2.5 rounded-full border border-white/10">
            Edit Profile
          </button>
        </div>

        {/* SETTINGS GROUPS */}
        <div className="mt-6 space-y-6">
          
          {/* Security Group */}
          <div>
            <h3 className="text-gray-400 text-[13px] font-[600] uppercase tracking-wider mb-3 px-2">Security</h3>
            <div className="w-full bg-[#161618] rounded-[2rem] px-5 py-2">
              
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
                {/* Toggle switch simulation */}
                <div className="w-12 h-7 bg-[#34C759] rounded-full p-0.5 shadow-inner">
                  <div className="w-6 h-6 bg-white rounded-full shadow-sm transform translate-x-5"></div>
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
          </div>

          {/* General Group */}
          <div>
            <h3 className="text-gray-400 text-[13px] font-[600] uppercase tracking-wider mb-3 px-2">General</h3>
            <div className="w-full bg-[#161618] rounded-[2rem] px-5 py-2">
              
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
          </div>

          {/* Log Out Button */}
          <button className="w-full bg-[#161618] hover:bg-[#1A1A1C] transition-colors rounded-[2rem] p-5 flex items-center justify-center border border-white/5 mt-4 group">
            <LogOut className="w-[18px] h-[18px] text-[#FF453A] group-hover:scale-110 transition-transform" />
            <span className="ml-3 text-[#FF453A] text-[16px] font-[600]">Sign Out</span>
          </button>

        </div>
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
          <button className="w-12 h-12 bg-[#1C1C1E] hover:bg-[#252528] rounded-full flex items-center justify-center transition-colors">
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
    </div>
  );
};

export default Profile;
