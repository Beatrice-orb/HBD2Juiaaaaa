import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Cake, Gift, Heart, ArrowRight, Star } from 'lucide-react';
import { ActiveTab } from '../types';
import { sound } from '../utils/audio';
import { fireHeartStarsConfetti } from '../utils/confetti';
import { BIRTHDAY_GIRL, BIRTHDAY_AGE } from '../data/mockData';

interface LandingViewProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onNavigate }) => {
  const handleCardClick = (tab: ActiveTab) => {
    sound.playPop();
    if (tab === 'wish-cake') sound.playSparkle();
    if (tab === 'gifts') sound.playFanfare();
    onNavigate(tab);
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] overflow-hidden pb-16">
      {/* Background Decorative Circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-pink-200/40 via-amber-100/30 to-purple-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-40 left-10 w-48 h-48 bg-pink-300/20 rounded-full blur-2xl -z-10 pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-amber-200/30 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        {/* Top Hero Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          {/* Cute Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-100 to-amber-100 border border-pink-200/80 text-pink-800 text-xs sm:text-sm font-medium shadow-xs mb-4 animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>HAPPY 21ST BIRTHDAY TO U</span>
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          </div>

          {/* Main Display Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#3D2C2E] tracking-tight leading-tight mb-3 font-cute">
            <span className="text-pink-600">竹子</span> 21岁生日快乐！
            <span className="inline-block ml-2 animate-wiggle">🎉</span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl text-pink-700 font-bold tracking-wide font-cute mb-4">
            陪你度过漫长岁月
          </p>

          {/* Quick interactive floating blessing button */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              id="landing-cheer-button"
              onClick={() => {
                sound.playSparkle();
                fireHeartStarsConfetti();
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-cute text-base shadow-md hover:shadow-lg hover:from-pink-600 hover:to-rose-500 transition-all active:scale-95 cursor-pointer tracking-wider"
            >
              <Heart className="w-4 h-4 fill-white text-white" />
              <span>点这里！来放烟花啦！</span>
              <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
            </button>
          </div>
        </motion.div>

        {/* The 2 Grand Interactive Entry Cards / Big Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {/* Card 1: 许愿工坊 (Cake & Candle Wish) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCardClick('wish-cake')}
            id="portal-card-wish-cake"
            className="group relative bg-gradient-to-b from-pink-50/90 via-white to-pink-50/60 rounded-3xl p-6 sm:p-7 border-2 border-pink-200/90 shadow-sm hover:shadow-xl hover:border-pink-400 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden text-left"
          >
            {/* Background Glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-200/50 rounded-full blur-2xl group-hover:bg-pink-300/60 transition-all" />

            <div>
              {/* Top Tag & Icon */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-pink-100/90 text-pink-700 text-sm font-cute tracking-wide">
                  Part01 蛋糕时间
                </span>
                <div className="w-12 h-12 rounded-2xl bg-pink-500 text-white flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform">
                  <Cake className="w-6 h-6" />
                </div>
              </div>

              {/* Visual Preview Badge */}
              <div className="py-4 my-2 flex items-center justify-center">
                <div className="relative py-5 rounded-2xl bg-pink-100/60 border border-pink-200/70 text-center w-full flex items-center justify-center">
                  <div className="text-5xl animate-float">🎂</div>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#3D2C2E] mb-2 font-cute group-hover:text-pink-600 transition-colors">
                许愿工坊
              </h2>
              <p className="text-sm sm:text-base text-[#6E5D5F] leading-relaxed mb-4">
                咱俩是不是还没一起做过蛋糕，不过赛博蛋糕和蜡烛不会有消失的那一天，蜡烛下许下的心愿也不会消失，就像我对你的爱一样～
              </p>
            </div>

            {/* Bottom Action Indicator */}
            <div className="pt-2 border-t border-pink-100/80 flex items-center justify-between text-pink-600 font-semibold text-sm">
              <span className="font-cute text-sm">去制作蛋糕 & 许愿</span>
              <div className="w-8 h-8 rounded-full bg-pink-100 group-hover:bg-pink-500 group-hover:text-white flex items-center justify-center transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          {/* Card 2: 拆赛博信&礼物 (Gifts & Letter) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCardClick('gifts')}
            id="portal-card-gifts"
            className="group relative bg-gradient-to-b from-amber-50/90 via-white to-amber-50/60 rounded-3xl p-6 sm:p-7 border-2 border-amber-200/90 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden text-left"
          >
            {/* Background Glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-200/50 rounded-full blur-2xl group-hover:bg-amber-300/60 transition-all" />

            <div>
              {/* Top Tag & Icon */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-100/90 text-amber-800 text-sm font-cute tracking-wide">
                  Part02 拆礼物啦
                </span>
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform">
                  <Gift className="w-6 h-6" />
                </div>
              </div>

              {/* Visual Preview Badge */}
              <div className="py-4 my-2 flex items-center justify-center">
                <div className="relative py-5 rounded-2xl bg-amber-100/60 border border-amber-200/70 text-center w-full flex items-center justify-center">
                  <div className="text-5xl animate-float" style={{ animationDelay: '0.5s' }}>
                    🎁
                  </div>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#3D2C2E] mb-2 font-cute group-hover:text-amber-600 transition-colors">
                拆赛博信&礼物
              </h2>
              <p className="text-sm sm:text-base text-[#6E5D5F] leading-relaxed mb-4">
                最爱写信的小白菜带来了对你的21岁生日祝福，请来拆礼物吧！话说写出“云中谁寄锦书来”的易安居士，可以想象此刻锦书真的变成了”云·锦书“的样态吗哈哈哈
              </p>
            </div>

            {/* Bottom Action Indicator */}
            <div className="pt-2 border-t border-amber-100/80 flex items-center justify-between text-amber-700 font-semibold text-sm">
              <span className="font-cute text-sm">查收信件与礼物</span>
              <div className="w-8 h-8 rounded-full bg-amber-100 group-hover:bg-amber-500 group-hover:text-white flex items-center justify-center transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Warm Bottom Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center p-4 rounded-2xl bg-white/70 backdrop-blur-xs border border-pink-100 text-sm sm:text-base text-[#7D6B6D] flex items-center justify-center gap-2 font-cute"
        >
          <span className="text-base">🎋</span>
          <span className="tracking-wide">
            “特别鸣谢你制造更欢乐的我”
          </span>
          <span className="text-base">💖</span>
        </motion.div>
      </div>
    </div>
  );
};
