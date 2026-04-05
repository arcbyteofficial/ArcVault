import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, Copy, Check, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Generator = ({ onNavigate }) => {
  const [length, setLength] = useState(14);
  const [digits, setDigits] = useState(3);
  const [capitals, setCapitals] = useState(8);
  const [symbols, setSymbols] = useState(2);
  
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveToVault = async () => {
    setIsSaving(true);
    const token = localStorage.getItem('arcvault_token');
    if (!token) {
      alert("Authentication Error: You must be logged in to save properties to your vault.");
      setIsSaving(false);
      return;
    }
    
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    try {
      const res = await fetch(`${API_URL}/api/vault`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'Secure Gen',
          username: 'generated@arcbyte.com',
          loginUrl: '',
          encryptedPassword: password, // Prototype uses plain, real app uses AES!
          iconColor: ['#1C1C1E', '#E50914', '#4285F4', '#6C3E9C', '#34A853'][Math.floor(Math.random() * 5)]
        })
      });
      if (res.ok) {
        onNavigate('dashboard');
      } else {
        alert("Failed to save securing to vault.");
      }
    } catch {
      alert("Backend connection failed.");
    }
    setIsSaving(false);
  };

  const generatePassword = useCallback(() => {
    const lowerCharset = "abcdefghijklmnopqrstuvwxyz";
    const upperCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numCharset = "0123456789";
    const symCharset = "!@#$%^&*()_+";
    
    let result = "";
    for(let i=0; i<Math.max(0, length - digits - capitals - symbols); i++) {
        result += lowerCharset.charAt(Math.floor(Math.random() * lowerCharset.length));
    }
    for(let i=0; i<capitals; i++) {
        result += upperCharset.charAt(Math.floor(Math.random() * upperCharset.length));
    }
    for(let i=0; i<digits; i++) {
        result += numCharset.charAt(Math.floor(Math.random() * numCharset.length));
    }
    for(let i=0; i<symbols; i++) {
        result += symCharset.charAt(Math.floor(Math.random() * symCharset.length));
    }
    
    setPassword(result.split('').sort(() => 0.5 - Math.random()).join(''));
    setCopied(false);
  }, [length, digits, capitals, symbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const increment = (setter, val, max = length) => {
      if(val < max) setter(val + 1);
  };
  
  const decrement = (setter, val) => {
      if(val > 0) setter(val - 1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full bg-[#0A0A0A] flex flex-col relative overflow-hidden font-sans"
    >
      {/* PROTON PASS AESTHETIC BACKGROUND */}
      <div className="absolute inset-0 bg-[#060606]"></div>
      <div className="absolute top-[-20%] left-[-20%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.2)_15%,rgba(255,255,255,0.02)_30%,transparent_50%)] pointer-events-none z-0"></div>
      <div className="absolute top-0 left-0 w-full h-[100%] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:42px_42px] pointer-events-none [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)] z-0"></div>
      <div className="absolute top-[32%] left-[38%] w-[2px] h-[2px] bg-white rounded-full opacity-80 shadow-[0_0_6px_2px_rgba(255,255,255,0.8)] z-0"></div>
      <div className="absolute top-[24%] left-[62%] w-[1.5px] h-[1.5px] bg-white rounded-full opacity-60 shadow-[0_0_5px_1px_rgba(255,255,255,0.6)] z-0"></div>
      <div className="absolute top-[52%] right-[22%] w-[2px] h-[2px] bg-white rounded-full opacity-50 shadow-[0_0_5px_1px_rgba(255,255,255,0.5)] z-0"></div>



      {/* Scrollable upper area */}
      <div className="flex-1 overflow-y-auto px-8 pt-20 pb-[220px] relative z-20 no-scrollbar">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="w-10 h-10 -ml-2 rounded-full border border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.5)] bg-[#0A0A0A]/60 flex items-center justify-center hover:bg-[#151515]/60 transition-colors backdrop-blur-xl"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <div className="flex items-center space-x-2 text-[13px] font-semibold text-white/90">
            <span>Extremely strong</span>
            <span className="text-lg">🦅</span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-10">
          <h1 className="text-[34px] font-[600] text-white tracking-tight mb-1">Create</h1>
          <p className="text-[20px] font-medium text-gray-400 leading-[1.2] tracking-tight">
            a solid password by<br/>choosing properties
          </p>
        </div>

        {/* Controls */}
        <div className="space-y-8">
          {/* Characters Slider */}
          <div>
            <div className="text-[13px] font-bold text-white mb-2 tracking-wide uppercase">Characters</div>
            <div className="flex items-center space-x-5">
              <div className="text-[38px] font-light text-white w-14 font-sans tracking-tight">{length}</div>
              <div className="flex-1 relative flex items-center">
                <input 
                  type="range" 
                  min="8" 
                  max="32" 
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-[#2A2A2A] rounded-lg appearance-none cursor-pointer accent-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* Digits Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[13px] font-bold text-white mb-1 tracking-wide uppercase">Digits</div>
              <div className="text-[28px] font-light text-gray-400 tracking-tight">{digits}</div>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => increment(setDigits, digits)} 
                className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors shadow-lg"
              >
                 <Plus className="w-5 h-5 stroke-[2.5]" />
              </button>
              <button 
                onClick={() => decrement(setDigits, digits)} 
                className="w-9 h-9 rounded-full bg-[#1C1C1E] border border-white/10 text-white flex items-center justify-center hover:bg-[#2C2C2E] transition-colors"
              >
                 <Minus className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Capitals Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[13px] font-bold text-white mb-1 tracking-wide uppercase">Capitals</div>
              <div className="text-[28px] font-light text-gray-400 tracking-tight">{capitals}</div>
            </div>
             <div className="flex space-x-3">
              <button 
                onClick={() => increment(setCapitals, capitals)} 
                className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors shadow-lg"
              >
                 <Plus className="w-5 h-5 stroke-[2.5]" />
              </button>
              <button 
                onClick={() => decrement(setCapitals, capitals)} 
                className="w-9 h-9 rounded-full bg-[#1C1C1E] border border-white/10 text-white flex items-center justify-center hover:bg-[#2C2C2E] transition-colors"
              >
                 <Minus className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Symbols Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[13px] font-bold text-white mb-1 tracking-wide uppercase">Symbols</div>
              <div className="text-[28px] font-light text-gray-400 tracking-tight">{symbols}</div>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => increment(setSymbols, symbols)} 
                className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors shadow-lg"
              >
                 <Plus className="w-5 h-5 stroke-[2.5]" />
              </button>
              <button 
                onClick={() => decrement(setSymbols, symbols)} 
                className="w-9 h-9 rounded-full bg-[#1C1C1E] border border-white/10 text-white flex items-center justify-center hover:bg-[#2C2C2E] transition-colors"
              >
                 <Minus className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Output Card */}
      <div className="absolute bottom-0 w-full h-[22%] min-h-[160px] bg-[#0A0A0A]/70 backdrop-blur-3xl border-t border-white/10 rounded-t-[2.5rem] px-8 py-8 items-start flex flex-col justify-center z-30 shadow-[0_-15px_40px_rgba(0,0,0,0.8)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none rounded-t-[2.5rem]"></div>
        <div className="w-full flex justify-between items-center mb-4 relative z-10">
          <div className="flex flex-wrap items-center space-x-[2px] font-mono text-[19px] tracking-wider truncate mr-4">
               <AnimatePresence mode="popLayout">
                 {password.split('').map((char, i) => (
                    <motion.span 
                      key={`${char}-${i}`}
                      initial={{ rotateX: 90, opacity: 0, y: 10 }}
                      animate={{ rotateX: 0, opacity: 1, y: 0 }}
                      exit={{ rotateX: -90, opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, delay: i * 0.02 }}
                      className={/[0-9]/.test(char) ? 'text-white font-bold' : /[!@#$%^&*()_+]/.test(char) ? 'text-gray-500 font-bold' : 'text-gray-300'}
                    >
                        {char}
                    </motion.span>
                 ))}
               </AnimatePresence>
          </div>
          
          <div className="flex space-x-4 shrink-0">
              <button onClick={handleCopy} className="text-gray-400 hover:text-white transition-colors">
                 {copied ? <Check className="w-6 h-6 text-white" /> : <Copy className="w-6 h-6" />}
              </button>
              <button onClick={handleSaveToVault} disabled={isSaving} className="w-6 h-6 rounded-full border border-white/20 bg-[#252525] flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors disabled:opacity-50">
                  <Check className="w-[14px] h-[14px] stroke-[3]" />
              </button>
          </div>
        </div>
        
        {/* Native phone home bar indicator padding */}
        <div className="h-4"></div>
      </div>

      {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[4px] bg-white/20 rounded-full z-50"></div>
    </motion.div>
  );
};

export default Generator;
