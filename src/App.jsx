import React, { useState, useEffect } from 'react';
import Onboarding from './screens/Onboarding';
import Dashboard from './screens/Dashboard';
import Generator from './screens/Generator';
import Profile from './screens/Profile';
import Auth from './screens/Auth';
import Security from './screens/Security';
import ResetPassword from './screens/ResetPassword';
import PrivacyPolicy from './screens/PrivacyPolicy';
import TermsOfService from './screens/TermsOfService';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [currentScreen, setCurrentScreen] = useState(() => {
    // Intercept URL token parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('privacy') === 'true') return 'privacy';
    if (urlParams.get('terms') === 'true') return 'terms';
    
    const resetToken = urlParams.get('resetToken');
    if (resetToken) return 'reset';

    const hasToken = localStorage.getItem('arcvault_token');
    const isRemembered = localStorage.getItem('arcvault_remembered_email');
    const hasActiveSession = sessionStorage.getItem('arcvault_active_session');

    if (hasToken && (isRemembered || hasActiveSession)) {
      return 'dashboard';
    }
    return 'onboarding';
  });

  const navigate = (screen) => {
    setCurrentScreen(screen);
  };

  useEffect(() => {
    let color = '#0A0A0A'; // Dashboard, Onboarding, Generator, Reset Password
    if (currentScreen === 'auth' || currentScreen === 'security') {
      color = '#060606';
    } else if (currentScreen === 'profile') {
      color = '#080808';
    }
    
    // Push Native Hardware Status Bar Color updates (Chrome / Safari)
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', color);
    
    // Override Body/Overscroll background bleeding
    document.body.style.backgroundColor = color;
  }, [currentScreen]);

  return (
    <div 
      className="w-full h-[100dvh] sm:max-w-[400px] sm:max-h-[850px] sm:rounded-[3rem] sm:border-[8px] sm:border-[#111] overflow-hidden relative flex flex-col font-sans sm:my-auto sm:shadow-2xl shadow-none transition-colors duration-500"
      style={{ backgroundColor: currentScreen === 'auth' || currentScreen === 'security' ? '#060606' : currentScreen === 'profile' ? '#080808' : '#0A0A0A' }}
    >
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {currentScreen === 'onboarding' && <Onboarding key="onboarding" onContinue={() => navigate('auth')} />}
          {currentScreen === 'auth' && <Auth key="auth" onNavigate={navigate} />}
          {currentScreen === 'reset' && <ResetPassword key="reset" onNavigate={navigate} />}
          {currentScreen === 'dashboard' && <Dashboard key="dashboard" onNavigate={navigate} />}
          {currentScreen === 'generator' && <Generator key="generator" onNavigate={navigate} />}
          {currentScreen === 'profile' && <Profile key="profile" onNavigate={navigate} />}
          {currentScreen === 'security' && <Security key="security" onNavigate={navigate} />}
          {currentScreen === 'privacy' && <PrivacyPolicy key="privacy" onNavigate={navigate} />}
          {currentScreen === 'terms' && <TermsOfService key="terms" onNavigate={navigate} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
