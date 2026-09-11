import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab } from './types';
import { Header } from './components/Header';
import { LandingView } from './components/LandingView';
import { CakeWishView } from './components/CakeWishView';
import { GiftsView } from './components/GiftsView';
import { sound } from './utils/audio';
import { fireSideCannons } from './utils/confetti';
import { BIRTHDAY_GIRL } from './data/mockData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ActiveTab>('landing');
  const [isBgmPlaying, setIsBgmPlaying] = useState<boolean>(false);

  // Play a welcoming confetti burst once on first launch
  useEffect(() => {
    const timer = setTimeout(() => {
      fireSideCannons();
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleBgm = () => {
    sound.playPop();
    const muted = sound.toggleMute();
    setIsBgmPlaying(!muted && sound.getIsBgmPlaying());
  };

  const handleNavigate = (tab: ActiveTab) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentTab(tab);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F7] text-[#4A3E3D] relative flex flex-col justify-between selection:bg-pink-200 selection:text-pink-900 font-sans">
      {/* Floating Gentle Elements */}
      <div className="fixed top-20 left-4 text-2xl pointer-events-none opacity-40 animate-float z-0">
        🎈
      </div>
      <div
        className="fixed top-36 right-6 text-xl pointer-events-none opacity-40 animate-float z-0"
        style={{ animationDelay: '1.5s' }}
      >
        ✨
      </div>
      <div
        className="fixed bottom-16 left-6 text-2xl pointer-events-none opacity-40 animate-float z-0"
        style={{ animationDelay: '2.5s' }}
      >
        🌸
      </div>
      <div
        className="fixed bottom-24 right-8 text-2xl pointer-events-none opacity-40 animate-float z-0"
        style={{ animationDelay: '3s' }}
      >
        🎋
      </div>

      {/* Main Header Bar */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        isBgmPlaying={isBgmPlaying}
        onToggleBgm={handleToggleBgm}
      />

      {/* Main Interactive Views with Motion Transition */}
      <main className="flex-1 z-10">
        <AnimatePresence mode="wait">
          {currentTab === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <LandingView onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentTab === 'wish-cake' && (
            <motion.div
              key="wish-cake"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <CakeWishView />
            </motion.div>
          )}

          {currentTab === 'gifts' && (
            <motion.div
              key="gifts"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <GiftsView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Cute Floating Bottom Navigation (Mobile & Desktop quick access when inside deep pages) */}
      {currentTab !== 'landing' && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-pink-200 shadow-lg flex items-center gap-2 sm:gap-4 text-xs font-semibold">
          <button
            onClick={() => handleNavigate('landing')}
            className="text-gray-500 hover:text-pink-600 px-2 py-1 rounded-full hover:bg-pink-50 transition-colors cursor-pointer"
          >
            🏠 首页
          </button>
          <div className="w-px h-3 bg-pink-100" />
          <button
            onClick={() => handleNavigate('wish-cake')}
            className={`px-2.5 py-1 rounded-full transition-all cursor-pointer font-cute ${
              currentTab === 'wish-cake' ? 'bg-pink-500 text-white' : 'text-gray-600 hover:text-pink-600'
            }`}
          >
            🍰 蛋糕时间
          </button>
          <button
            onClick={() => handleNavigate('gifts')}
            className={`px-2.5 py-1 rounded-full transition-all cursor-pointer font-cute ${
              currentTab === 'gifts' ? 'bg-amber-500 text-white' : 'text-gray-600 hover:text-amber-600'
            }`}
          >
            🎁 拆赛博信&礼物
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-[#8A787A] border-t border-pink-100/60 bg-white/40">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>🎋 专为竹子定制 · 21岁生日快乐</span>
          <span className="text-[11px] text-pink-600/80">
            made by 小白菜本菜 with love 💖
          </span>
        </div>
      </footer>
    </div>
  );
}
