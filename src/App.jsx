import React, { useState } from 'react';
import Onboarding from './screens/Onboarding';
import Dashboard from './screens/Dashboard';
import Generator from './screens/Generator';
import Profile from './screens/Profile';
import Auth from './screens/Auth';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [currentScreen, setCurrentScreen] = useState('auth');

  const navigate = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="w-full max-w-[375px] h-screen max-h-[812px] bg-white sm:rounded-[3rem] shadow-2xl overflow-hidden relative flex flex-col font-sans">
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {currentScreen === 'onboarding' && <Onboarding key="onboarding" onContinue={() => navigate('auth')} />}
          {currentScreen === 'auth' && <Auth key="auth" onNavigate={navigate} />}
          {currentScreen === 'dashboard' && <Dashboard key="dashboard" onNavigate={navigate} />}
          {currentScreen === 'generator' && <Generator key="generator" onNavigate={navigate} />}
          {currentScreen === 'profile' && <Profile key="profile" onNavigate={navigate} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
