import React from 'react';
import { Sparkles, Music, VolumeX, ArrowLeft } from 'lucide-react';
import { ActiveTab } from '../types';
import { sound } from '../utils/audio';
import { fireConfetti } from '../utils/confetti';

interface HeaderProps {
  currentTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
  isBgmPlaying: boolean;
  onToggleBgm: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  isBgmPlaying,
  onToggleBgm,
}) => {
  const getTabTitle = () => {
    switch (currentTab) {
      case 'wish-cake':
        return '🎂 一起来做蛋糕吧！';
      case 'gifts':
        return '🎁 拆赛博信 & 礼物';
      default:
        return '🌸 竹子 21岁生日快乐 ✨';
    }
  };

  return (
    <header
      id="app-header"
      className="sticky top-0 z-40 backdrop-blur-md bg-[#FFF8F6]/90 border-b border-pink-100/80 px-4 sm:px-6 py-3 transition-all duration-300 shadow-xs"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Back or Brand */}
        <div className="flex items-center gap-3">
          {currentTab !== 'landing' ? (
            <button
              id="header-back-button"
              onClick={() => {
                sound.playPop();
                onNavigate('landing');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-pink-200 text-pink-700 hover:bg-pink-50 hover:text-pink-800 transition-all text-sm font-medium shadow-xs hover:shadow-sm active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>返回主页</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-2xl animate-bounce">🎋</span>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-pink-900 tracking-tight flex items-center gap-1.5 font-cute">
                  <span>竹子的21岁秘密花园</span>
                  <span className="hidden sm:inline-block text-xs px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 font-normal">
                    21st Birthday
                  </span>
                </h1>
              </div>
            </div>
          )}

          {currentTab !== 'landing' && (
            <h2 className="hidden md:block text-base font-bold text-pink-900 ml-2 font-cute">
              {getTabTitle()}
            </h2>
          )}
        </div>

        {/* Center / Navigation Tabs for Quick Switch */}
        {currentTab !== 'landing' && (
          <nav className="hidden sm:flex items-center gap-1.5 p-1 bg-pink-50/80 rounded-full border border-pink-100 text-xs font-cute">
            <button
              id="nav-cake-tab"
              onClick={() => {
                sound.playPop();
                onNavigate('wish-cake');
              }}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                currentTab === 'wish-cake'
                  ? 'bg-white text-pink-700 font-bold shadow-xs'
                  : 'text-gray-600 hover:text-pink-600'
              }`}
            >
              🍰 许愿工坊
            </button>
            <button
              id="nav-gifts-tab"
              onClick={() => {
                sound.playPop();
                onNavigate('gifts');
              }}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                currentTab === 'gifts'
                  ? 'bg-white text-pink-700 font-bold shadow-xs'
                  : 'text-gray-600 hover:text-pink-600'
              }`}
            >
              🎁 拆赛博信&礼物
            </button>
          </nav>
        )}

        {/* Right Tools: BGM & Confetti */}
        <div className="flex items-center gap-2">
          {/* Confetti button */}
          <button
            id="header-confetti-button"
            onClick={() => {
              sound.playSparkle();
              fireConfetti();
            }}
            title="撒花庆祝！"
            className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-all flex items-center gap-1.5 text-xs font-medium shadow-xs active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">撒花</span>
          </button>

          {/* BGM Toggle */}
          <button
            id="header-bgm-button"
            onClick={onToggleBgm}
            title={isBgmPlaying ? '暂停生日音乐盒' : '播放生日音乐盒'}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-full border transition-all flex items-center gap-1.5 text-xs font-medium shadow-xs active:scale-95 cursor-pointer ${
              isBgmPlaying
                ? 'bg-pink-100 border-pink-300 text-pink-800 animate-pulse-gentle'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {isBgmPlaying ? (
              <>
                <Music className="w-4 h-4 text-pink-600 animate-spin text-xs" style={{ animationDuration: '4s' }} />
                <span className="hidden sm:inline">音乐 ♫</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-gray-500" />
                <span className="hidden sm:inline">播放音乐</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
