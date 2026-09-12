import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gift,
  Heart,
  Sparkles,
  Mail,
  CheckCircle,
  Copy,
  Crown,
  Coffee,
  HeartHandshake,
  Flame,
  Star,
  RefreshCw,
  X,
} from 'lucide-react';
import { CouponItem } from '../types';
import { sound } from '../utils/audio';
import { fireConfetti, fireHeartStarsConfetti } from '../utils/confetti';
import {
  BIRTHDAY_GIRL,
  BIRTHDAY_AGE,
  INITIAL_COUPONS,
  HEARTFELT_LETTER,
  BIRTHDAY_BLESSINGS_POOL,
} from '../data/mockData';

export const GiftsView: React.FC = () => {
  // Gift unbox status for individual boxes
  const [openedGifts, setOpenedGifts] = useState<{ [key: string]: boolean }>({
    letter: false,
    coupons: false,
    medal: false,
    gashapon: false,
  });

  // Coupons State
  const [coupons, setCoupons] = useState<CouponItem[]>(INITIAL_COUPONS);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponItem | null>(null);

  // Letter State
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [letterHeartsCount, setLetterHeartsCount] = useState(21);
  const [copiedLetter, setCopiedLetter] = useState(false);
  const [letterFontSize, setLetterFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [letterFontMode, setLetterFontMode] = useState<'clear' | 'brush'>('brush');

  // Gashapon Blessing Machine State
  const [currentBlessing, setCurrentBlessing] = useState(BIRTHDAY_BLESSINGS_POOL[0]);
  const [isSpinningGashapon, setIsSpinningGashapon] = useState(false);

  // Unbox handler
  const handleUnbox = (giftKey: string) => {
    sound.playFanfare();
    fireConfetti();
    setOpenedGifts((prev) => ({ ...prev, [giftKey]: true }));
    if (giftKey === 'letter') {
      setIsLetterOpen(true);
    }
  };

  // Toggle coupon usage
  const handleToggleCoupon = (id: string) => {
    sound.playSparkle();
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isUsed: !c.isUsed } : c))
    );
  };

  // Gashapon spin
  const handleSpinGashapon = () => {
    if (isSpinningGashapon) return;
    sound.playPop();
    setIsSpinningGashapon(true);
    let count = 0;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * BIRTHDAY_BLESSINGS_POOL.length);
      setCurrentBlessing(BIRTHDAY_BLESSINGS_POOL[randomIdx]);
      count++;
      if (count > 10) {
        clearInterval(interval);
        setIsSpinningGashapon(false);
        sound.playSparkle();
        fireHeartStarsConfetti();
      }
    }, 100);
  };

  // Add Heart Reaction to letter
  const handleAddHeart = () => {
    sound.playSparkle();
    setLetterHeartsCount((prev) => prev + 1);
    fireConfetti();
  };

  // Copy letter content
  const handleCopyLetter = () => {
    const textToCopy = `${HEARTFELT_LETTER.recipient}\n\n${HEARTFELT_LETTER.paragraphs.join('\n\n')}\n\n${HEARTFELT_LETTER.sign}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedLetter(true);
    sound.playPop();
    setTimeout(() => setCopiedLetter(false), 2000);
  };

  const getCouponIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee className="w-5 h-5" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5" />;
      case 'Crown':
        return <Crown className="w-5 h-5" />;
      case 'Flame':
        return <Flame className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-24">
      {/* Top Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold font-cute mb-2">
          <Gift className="w-3.5 h-3.5 text-amber-600" />
          <span>Part02 拆礼物啦</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#3D2C2E] font-cute tracking-tight">
          🎁 拆赛博信 & 礼物
        </h1>
      </div>

      {/* Grid of 4 Grand Surprise Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
        {/* Gift 1: 💌 挚友21岁亲笔信 (The Highlight Letter) */}
        <div
          id="gift-box-letter"
          className="bg-gradient-to-br from-pink-50 via-white to-rose-50 rounded-3xl p-6 sm:p-7 border-2 border-pink-200 shadow-sm relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-300/20 rounded-full blur-2xl" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold">
                💌 一信知秋
              </span>
              <span className="text-2xl animate-bounce">💌</span>
            </div>

            <h2 className="text-xl font-bold text-[#3D2C2E] mb-2 font-cute">
              里面装着小白菜想对你说的话，请打开吧！
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
              这里装满了从高中、保送教室到现在的点滴心意。愿这封信陪你走过21岁的每一个春夏秋冬。
            </p>

            {/* Visual Envelope */}
            <div className="py-3 flex flex-col items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleUnbox('letter')}
                className="w-full max-w-xs bg-gradient-to-r from-rose-100 via-pink-100 to-amber-100 rounded-2xl p-5 border-2 border-pink-300 shadow-md cursor-pointer text-center relative group"
              >
                <div className="text-4xl sm:text-5xl mb-2 group-hover:scale-110 transition-transform">
                  ✉️
                </div>
                <div className="text-xs font-bold text-pink-900">
                  {isLetterOpen ? '✨ 信件已展开（点击重读）' : '🔒 点击拆开火漆印章查收信件'}
                </div>
                <div className="text-[11px] text-pink-600 mt-1">
                  Recipient: {BIRTHDAY_GIRL}
                </div>
              </motion.div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">已收获 {letterHeartsCount} 颗爱心</span>
            <button
              id="open-letter-btn"
              onClick={() => handleUnbox('letter')}
              className="px-4 py-1.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              {isLetterOpen ? '查看信件内容 📖' : '拆开信封 💌'}
            </button>
          </div>
        </div>

        {/* Gift 2: 🎟️ 21岁专属挚友特权券包 (VIP Coupons) */}
        <div
          id="gift-box-coupons"
          className="bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-3xl p-6 sm:p-7 border-2 border-amber-200 shadow-sm relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-300/20 rounded-full blur-2xl" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                🎟️ 专属权益
              </span>
              <span className="text-2xl animate-bounce">🧋</span>
            </div>

            <h2 className="text-xl font-bold text-[#3D2C2E] mb-2 font-cute">
              21岁挚友专属特权券（5张）
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
              奶茶畅饮券、随叫随到逛街券、情绪急救券……终生有效，随时向我核销！
            </p>

            {/* Coupons Preview Carousel */}
            <div className="space-y-2 max-h-[170px] overflow-y-auto pr-1">
              {coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  onClick={() => handleToggleCoupon(coupon.id)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all cursor-pointer ${
                    coupon.isUsed
                      ? 'bg-gray-100 border-gray-200 text-gray-400 line-through'
                      : 'bg-white border-amber-200 shadow-2xs hover:border-amber-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{coupon.title.split(' ')[0]}</span>
                    <div>
                      <div className="font-bold text-gray-800">{coupon.title.slice(2)}</div>
                      <div className="text-[10px] text-gray-500">{coupon.subtitle}</div>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      coupon.isUsed
                        ? 'bg-gray-200 text-gray-500'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {coupon.isUsed ? '已核销' : '待使用'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between">
            <span className="text-xs text-amber-700">点击任意卡券可切换使用状态</span>
            <span className="text-xs text-gray-400 font-mono">CODE: VIP-21</span>
          </div>
        </div>

        {/* Gift 3: 👑 宇宙第一可爱竹子 荣誉勋章 */}
        <div
          id="gift-box-medal"
          className="bg-gradient-to-br from-yellow-50 via-white to-amber-50 rounded-3xl p-6 sm:p-7 border-2 border-yellow-200 shadow-sm relative overflow-hidden flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-bold">
                👑 特别勋章
              </span>
              <span className="text-2xl animate-spin" style={{ animationDuration: '8s' }}>✨</span>
            </div>

            <h2 className="text-xl font-bold text-[#3D2C2E] mb-2 font-cute">
              “宇宙第一可爱竹子” 21岁特别勋章
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
              经挚友委员会全票通过，特颁发此勋章，表彰你在过去21年里持续散发无限魅力与可爱！
            </p>

            <div className="py-2 flex items-center justify-center">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.05 }}
                className="w-32 h-32 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-200 to-yellow-400 border-4 border-amber-300 shadow-lg flex flex-col items-center justify-center p-2 text-center text-amber-950 font-black cursor-pointer"
                onClick={() => {
                  sound.playSparkle();
                  fireConfetti();
                }}
              >
                <Crown className="w-8 h-8 text-amber-800 fill-amber-300 mb-1" />
                <span className="text-xs tracking-tighter">竹子 21st</span>
                <span className="text-[9px] text-amber-900/80 font-normal">年度最佳仙女奖</span>
              </motion.div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-yellow-100 text-center">
            <span className="text-xs text-amber-800 font-semibold">
              🌟 纯金认证 · 终身受用 · 闪闪发光
            </span>
          </div>
        </div>

        {/* Gift 4: 🎰 21岁生日幸运祝福抽签机 (Gashapon / Blessings) */}
        <div
          id="gift-box-gashapon"
          className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 rounded-3xl p-6 sm:p-7 border-2 border-purple-200 shadow-sm relative overflow-hidden flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">
                ✨ 好运魔法
              </span>
              <span className="text-2xl">🍀</span>
            </div>

            <h2 className="text-xl font-bold text-[#3D2C2E] mb-2 font-cute">
              21岁专属好运抽签机
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
              抽取专属于竹子的21岁定制吉利祝福语与今日好运签！
            </p>

            <div className="p-4 rounded-2xl bg-purple-100/60 border border-purple-200 text-center min-h-[90px] flex items-center justify-center">
              <p className="text-sm font-bold text-purple-900 leading-relaxed font-handwriting">
                {currentBlessing}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-purple-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">已装载 21+ 条吉利签</span>
            <button
              id="spin-gashapon-btn"
              onClick={handleSpinGashapon}
              disabled={isSpinningGashapon}
              className="px-4 py-1.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${isSpinningGashapon ? 'animate-spin' : ''}`} />
              <span>{isSpinningGashapon ? '正在摇签...' : '再抽一签 🎲'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Heartfelt Letter Modal / Viewer */}
      <AnimatePresence>
        {isLetterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#FFFDF9] max-w-3xl w-full rounded-3xl p-6 sm:p-10 md:p-12 border-4 border-amber-200/90 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              {/* Top Close Button */}
              <button
                onClick={() => setIsLetterOpen(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-amber-100/80 hover:bg-amber-200 text-amber-900 transition-all cursor-pointer z-10"
                title="关闭信件"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Decorative Stamp */}
              <div className="hidden sm:flex absolute top-6 right-16 w-14 h-14 rounded-xl border-2 border-dashed border-red-300 bg-red-50/70 p-1 flex-col items-center justify-center text-[10px] text-red-500 font-bold rotate-6 shadow-xs pointer-events-none">
                <span>21st</span>
                <span>BIRTHDAY</span>
                <span>SPECIAL</span>
              </div>

              {/* Letter Header */}
              <div className="mb-6 border-b border-amber-200/80 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-3">
                  <h3 className="text-2xl sm:text-3xl font-bold text-pink-950 font-cute">
                    {HEARTFELT_LETTER.recipient}
                  </h3>
                  <div className="text-xs sm:text-sm text-amber-800/90 font-semibold">
                    📅 {HEARTFELT_LETTER.date}
                  </div>
                </div>

                {/* Reading Comfort Controls */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-amber-100/80 text-xs">
                  {/* Font Size Selector */}
                  <div className="flex items-center gap-1 bg-amber-100/60 p-1 rounded-xl">
                    <span className="text-[11px] text-amber-900 font-medium px-1.5">字号:</span>
                    <button
                      onClick={() => {
                        setLetterFontSize('normal');
                        sound.playPop();
                      }}
                      className={`px-2 py-0.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        letterFontSize === 'normal'
                          ? 'bg-white text-pink-700 shadow-xs'
                          : 'text-amber-800 hover:text-pink-900'
                      }`}
                    >
                      标准
                    </button>
                    <button
                      onClick={() => {
                        setLetterFontSize('large');
                        sound.playPop();
                      }}
                      className={`px-2 py-0.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        letterFontSize === 'large'
                          ? 'bg-white text-pink-700 shadow-xs'
                          : 'text-amber-800 hover:text-pink-900'
                      }`}
                    >
                      大字 (推荐)
                    </button>
                    <button
                      onClick={() => {
                        setLetterFontSize('xlarge');
                        sound.playPop();
                      }}
                      className={`px-2 py-0.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        letterFontSize === 'xlarge'
                          ? 'bg-white text-pink-700 shadow-xs'
                          : 'text-amber-800 hover:text-pink-900'
                      }`}
                    >
                      特大
                    </button>
                  </div>

                  {/* Font Mode Selector */}
                  <div className="flex items-center gap-1 bg-amber-100/60 p-1 rounded-xl">
                    <span className="text-[11px] text-amber-900 font-medium px-1.5">字体:</span>
                    <button
                      onClick={() => {
                        setLetterFontMode('clear');
                        sound.playPop();
                      }}
                      className={`px-2 py-0.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        letterFontMode === 'clear'
                          ? 'bg-white text-pink-700 shadow-xs'
                          : 'text-amber-800 hover:text-pink-900'
                      }`}
                      title="切换为高清易读正体，阅读最舒适"
                    >
                      📖 清晰易读
                    </button>
                    <button
                      onClick={() => {
                        setLetterFontMode('brush');
                        sound.playPop();
                      }}
                      className={`px-2 py-0.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        letterFontMode === 'brush'
                          ? 'bg-white text-pink-700 shadow-xs'
                          : 'text-amber-800 hover:text-pink-900'
                      }`}
                      title="切换为毛刷手写艺术字"
                    >
                      ✍️ 毛刷艺术
                    </button>
                  </div>
                </div>
              </div>

              {/* Letter Body Paragraphs */}
              <div
                className={`space-y-6 sm:space-y-7 text-[#2C1C1E] tracking-[0.05em] sm:tracking-[0.07em] ${
                  letterFontMode === 'clear' ? 'letter-clear-reading' : 'letter-brush-reading'
                } ${
                  letterFontSize === 'normal'
                    ? 'text-[16px] sm:text-[17px] leading-[2.1] sm:leading-[2.2]'
                    : letterFontSize === 'large'
                    ? 'text-[18px] sm:text-[20px] leading-[2.3] sm:leading-[2.45]'
                    : 'text-[20px] sm:text-[22px] leading-[2.4] sm:leading-[2.6]'
                }`}
              >
                {HEARTFELT_LETTER.paragraphs.map((p, idx) => {
                  const isOpening = idx === 0;
                  const isClosing = idx === HEARTFELT_LETTER.paragraphs.length - 1;
                  return (
                    <p
                      key={idx}
                      className={`whitespace-pre-line ${
                        isOpening || isClosing
                          ? 'font-medium text-[#201113]'
                          : 'indent-8 sm:indent-10'
                      }`}
                    >
                      {p}
                    </p>
                  );
                })}
              </div>

              {/* Letter Signature */}
              <div
                className={`mt-10 sm:mt-12 text-right border-t border-amber-200/80 pt-5 ${
                  letterFontMode === 'clear' ? 'letter-clear-reading' : 'letter-brush-reading'
                }`}
              >
                <p className="text-xl sm:text-2xl font-bold text-pink-950 font-cute tracking-wide">
                  {HEARTFELT_LETTER.sign}
                </p>
              </div>

              {/* Interactive Reaction & Close Actions */}
              <div className="mt-8 pt-4 border-t border-amber-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    id="letter-heart-reaction-btn"
                    onClick={handleAddHeart}
                    className="px-4 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>给挚友回赠爱心 ({letterHeartsCount})</span>
                  </button>

                  <button
                    id="copy-letter-btn"
                    onClick={handleCopyLetter}
                    className="px-3.5 py-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedLetter ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        <span>已复制全文</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-gray-500" />
                        <span>复制长信</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  id="close-letter-modal-btn"
                  onClick={() => setIsLetterOpen(false)}
                  className="px-5 py-2 rounded-full bg-gray-800 hover:bg-black text-white text-xs font-bold transition-all cursor-pointer"
                >
                  收入珍藏盒 🌸
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
