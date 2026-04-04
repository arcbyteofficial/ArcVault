import React, { useState } from 'react';
import { ChevronLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Auth = ({ onNavigate, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      
      if (!res.ok) {
        alert(data.error || 'Authentication failed');
        return;
      }

      localStorage.setItem('arcvault_token', data.token);

      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        onNavigate('dashboard');
      }
    } catch (err) {
      console.error(err);
      alert('Backend connection failed. Please ensure the server is running or check your network connection.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full bg-[#0A0A0A] flex flex-col relative overflow-hidden font-sans"
    >
      
      {/* Dynamic Island Top Padding Space */}
      <div className="w-full h-12 shrink-0 relative z-50"></div>

      {/* TOP HEADER SECTION */}
      <div className="px-8 pt-2 pb-6 shrink-0 relative z-20">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('onboarding')}
          className="w-10 h-10 rounded-full border-[1.5px] border-white/10 bg-[#151515]/60 flex items-center justify-center transition-colors mb-8 backdrop-blur-md"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </motion.button>

        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login' : 'register'}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-[34px] font-[600] text-white leading-[1.1] tracking-tight mb-2">
              {isLogin ? "Welcome back\nto your vault" : "Go ahead and set up\nyour account"}
            </h1>
            <p className="text-[14px] text-gray-400 font-medium tracking-tight">
              {isLogin ? "Sign in to enjoy the best managing experience" : "Sign up to enjoy the best managing experience"}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTTOM CARD */}
      <motion.div 
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full flex-1 bg-[#161618] border-t border-white/5 rounded-t-[2.5rem] mt-2 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] px-6 pt-6 pb-8 flex flex-col z-30 relative overflow-y-auto no-scrollbar"
      >
        
        {/* Toggle Switch */}
        <div className="w-full h-[52px] bg-[#0A0A0A] rounded-full p-1 flex border border-white/5 mb-8 shadow-inner shrink-0 relative">
          {/* Moving Active Background Pill */}
          <motion.div 
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#222225] rounded-full shadow-md border border-white/10"
            animate={{ left: isLogin ? '4px' : 'calc(50%)' }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />

          <button 
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 rounded-full flex items-center justify-center text-[15px] font-[600] z-10 transition-colors ${isLogin ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Login
          </button>
          <button 
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 rounded-full flex items-center justify-center text-[15px] font-[600] z-10 transition-colors ${!isLogin ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col shrink-0">
          
          <div className="space-y-4 mb-5">
            {/* Email Input Block */}
            <motion.div 
              whileTap={{ scale: 0.98 }}
              className="w-full h-[76px] rounded-[1.2rem] border border-white/10 bg-[#0A0A0A] flex items-center px-4 focus-within:border-white/30 transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
            >
              <Mail className="w-6 h-6 text-gray-500 shrink-0" strokeWidth={1.5} />
              <div className="ml-4 flex flex-col justify-center flex-1 h-full pt-1">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Email Address</span>
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-white text-[15px] font-medium focus:outline-none placeholder:text-gray-600 mt-1"
                />
              </div>
            </motion.div>

            {/* Password Input Block */}
            <motion.div 
              whileTap={{ scale: 0.98 }}
              className="w-full h-[76px] rounded-[1.2rem] border border-white/10 bg-[#0A0A0A] flex items-center px-4 focus-within:border-white/30 transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
            >
              <Lock className="w-6 h-6 text-gray-500 shrink-0" strokeWidth={1.5} />
              <div className="ml-4 flex flex-col justify-center flex-1 h-full pt-1">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Password</span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-white text-[15px] focus:outline-none placeholder:text-gray-600 mt-1 tracking-widest font-medium"
                />
              </div>
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="shrink-0 p-2"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-500 hover:text-white transition-colors" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-500 hover:text-white transition-colors" />
                )}
              </button>
            </motion.div>
          </div>

          <div className="flex justify-between items-center mb-8 px-1">
            <label className="flex items-center cursor-pointer group">
              <div className="w-[18px] h-[18px] rounded-[4px] border-[1.5px] border-gray-600 group-hover:border-white/50 bg-[#0A0A0A] flex items-center justify-center transition-colors">
                <svg className="w-3 h-3 text-transparent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <span className="ml-2 text-[13px] font-[600] text-white">Remember me</span>
            </label>
            <button type="button" className="text-[13px] font-[600] text-white hover:underline">
              Forgot Password?
            </button>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full h-[56px] rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#B3B3B3] flex items-center justify-center text-black font-[700] text-[16px] shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-4px_8px_rgba(0,0,0,0.2),0_4px_12px_rgba(0,0,0,0.5)] shrink-0"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={isLogin ? 'btn-login' : 'btn-register'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {isLogin ? "Login" : "Register"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
          
          <div className="flex items-center w-full mt-8 mb-6 opacity-80 shrink-0">
            <div className="flex-1 h-[1px] bg-white/10"></div>
            <span className="px-4 text-[12px] font-medium text-gray-400">
              Or {isLogin ? "login" : "register"} with
            </span>
            <div className="flex-1 h-[1px] bg-white/10"></div>
          </div>

          <div className="flex space-x-4 shrink-0 pb-6">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} type="button" className="flex-1 h-[52px] rounded-full border border-white/10 bg-[#0A0A0A] flex items-center justify-center shadow-sm">
              <span className="text-[14px] font-[600] text-white">Google</span>
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} type="button" className="flex-1 h-[52px] rounded-full border border-white/10 bg-[#0A0A0A] flex items-center justify-center shadow-sm">
              <span className="text-[14px] font-[600] text-white">GitHub</span>
            </motion.button>
          </div>
          
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Auth;
