import React, { useState } from 'react';
import Onboarding from './screens/Onboarding';
import Dashboard from './screens/Dashboard';
import Generator from './screens/Generator';
import Profile from './screens/Profile';
import Auth from './screens/Auth';
import Security from './screens/Security';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [currentScreen, setCurrentScreen] = useState('onboarding');

  const navigate = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="w-full h-[100dvh] bg-[#0A0A0A] sm:max-w-[400px] sm:max-h-[850px] sm:rounded-[3rem] sm:border-[8px] sm:border-[#111] overflow-hidden relative flex flex-col font-sans sm:my-auto sm:shadow-2xl shadow-none">
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {currentScreen === 'onboarding' && <Onboarding key="onboarding" onContinue={() => navigate('auth')} />}
          {currentScreen === 'auth' && <Auth key="auth" onNavigate={navigate} />}
          {currentScreen === 'dashboard' && <Dashboard key="dashboard" onNavigate={navigate} />}
          {currentScreen === 'generator' && <Generator key="generator" onNavigate={navigate} />}
          {currentScreen === 'profile' && <Profile key="profile" onNavigate={navigate} />}
          {currentScreen === 'security' && <Security key="security" onNavigate={navigate} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
