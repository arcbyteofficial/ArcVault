import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import arcbyteLogo from '../assets/arcbyte.co Logo_white_transparent.png';

const ResetPassword = ({ onNavigate }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('resetToken');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!token) {
      alert("Invalid or missing reset token.");
      return;
    }

    setIsSubmitting(true);
    const API_URL = import.meta.env.DEV ? 'http://localhost:5000' : 'https://engine.arcbyte.co';
    
    try {
      const res = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
      });
      const data = await res.json();
      
      if (res.ok) {
        setSuccess(true);
        // Clean URL to prevent re-triggering logic
        window.history.replaceState(null, '', window.location.pathname);
        setTimeout(() => {
          onNavigate('auth');
        }, 2500);
      } else {
        alert(data.error || "Failed to reset password.");
      }
    } catch (err) {
      alert("Server connection error.");
    }
    setIsSubmitting(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full bg-[#0A0A0A] flex flex-col relative overflow-hidden font-sans"
    >
      {/* SUCCESS OVERLAY */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-[100] bg-[#0A0A0A]/80 flex flex-col items-center justify-center overflow-hidden"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
              className="w-20 h-20 bg-[#34C759] rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(52,199,89,0.5)] border border-[#34C759]/50"
            >
              <ShieldCheck className="w-10 h-10 text-white stroke-[2.5]" />
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white text-[24px] font-[600] tracking-tight"
            >
              Password Reset
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[#888] mt-2 font-[500]"
            >
              Redirecting to secure login...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute top-12 left-8 flex items-center space-x-3 z-30"
      >
        <img src={arcbyteLogo} alt="ArcByte Icon" className="h-[26px] w-auto object-contain drop-shadow-md" />
        <span className="text-white font-[600] text-[20px] tracking-tight">ArcByte</span>
      </motion.div>

      <div className="flex-1 flex flex-col justify-end px-8 pb-12 z-20 relative">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-[38px] font-[600] text-white leading-[1.1] tracking-tight mb-2">
            Secure<br/>Reset
          </h1>
          <p className="text-gray-400 text-[15px] leading-tight my-1">
            Construct your new Master Password.
          </p>
        </motion.div>

        <motion.form 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit} 
          className="w-full flex flex-col gap-4"
        >
          <div className="relative flex items-center w-full">
            <Lock className="absolute left-5 w-[18px] h-[18px] text-gray-500" />
            <input 
              type={showPassword ? "text" : "password"}
              placeholder="New Master Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full h-[60px] bg-[#111111] rounded-3xl border border-white/10 text-white px-12 text-[15px] focus:outline-none focus:border-white/30 transition-colors placeholder:text-gray-600 shadow-[inset_0px_2px_4px_rgba(0,0,0,0.4)]"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 text-gray-500 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
            </button>
          </div>

          <div className="relative flex items-center w-full">
            <Lock className="absolute left-5 w-[18px] h-[18px] text-gray-500" />
            <input 
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full h-[60px] bg-[#111111] rounded-3xl border border-white/10 text-white px-12 text-[15px] focus:outline-none focus:border-white/30 transition-colors placeholder:text-gray-600 shadow-[inset_0px_2px_4px_rgba(0,0,0,0.4)]"
            />
            <button 
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-5 text-gray-500 hover:text-white transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
            </button>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full h-[60px] rounded-3xl bg-white text-black font-[600] text-[16px] flex items-center justify-center mt-2 hover:bg-gray-200 transition-colors border border-transparent disabled:opacity-50"
          >
            {isSubmitting ? 'Resetting...' : 'Update Password'}
             {!isSubmitting && <ArrowRight className="w-[18px] h-[18px] ml-2" />}
          </button>
        </motion.form>
      </div>

       {/* iOS Native Home Indicator Padding */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[4px] bg-white/20 rounded-full z-50"></div>
    </motion.div>
  );
};

export default ResetPassword;
