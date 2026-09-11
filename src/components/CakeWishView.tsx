import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Mic,
  Flame,
  Send,
  Lock,
  Play,
  Square,
  CheckCircle2,
  RefreshCw,
  Volume2,
} from 'lucide-react';
import { WishItem } from '../types';
import { sound } from '../utils/audio';
import { fireSideCannons, fireHeartStarsConfetti } from '../utils/confetti';
import { BIRTHDAY_GIRL, BIRTHDAY_AGE } from '../data/mockData';

const CAKE_FLAVORS = [
  { id: 'strawberry', name: '🍓 梦幻草莓慕斯', baseColor: 'bg-rose-200', topColor: 'bg-rose-300', text: 'text-rose-700', border: 'border-rose-300', badge: '酸甜粉糯' },
  { id: 'chocolate', name: '🍫 比利时浓情生巧', baseColor: 'bg-[#4A2E1B]', topColor: 'bg-[#331C0E]', text: 'text-amber-100', border: 'border-[#261307]', badge: '香浓纯可可' },
  { id: 'matcha', name: '🍵 宇治特级抹茶', baseColor: 'bg-emerald-200', topColor: 'bg-emerald-300', text: 'text-emerald-800', border: 'border-emerald-300', badge: '清甜甘冽' },
  { id: 'taro', name: '🍠 芋泥啵啵雪域', baseColor: 'bg-purple-200', topColor: 'bg-purple-300', text: 'text-purple-800', border: 'border-purple-300', badge: '绵密细腻' },
  { id: 'vanilla', name: '🍰 经典海盐香草', baseColor: 'bg-amber-100', topColor: 'bg-amber-200', text: 'text-amber-800', border: 'border-amber-300', badge: '纯净自然' },
  { id: 'mango', name: '🥭 盛夏香芒千层', baseColor: 'bg-amber-200', topColor: 'bg-orange-300', text: 'text-amber-900', border: 'border-amber-400', badge: '热带浓郁' },
  { id: 'blueberry', name: '🫐 梦境黑加仑蓝莓', baseColor: 'bg-indigo-200', topColor: 'bg-indigo-300', text: 'text-indigo-900', border: 'border-indigo-400', badge: '极光果香' },
  { id: 'peach', name: '🍑 蜜桃乌龙芝芝', baseColor: 'bg-pink-200', topColor: 'bg-rose-200', text: 'text-pink-900', border: 'border-pink-300', badge: '多汁白桃' },
  { id: 'redvelvet', name: '🌹 经典红丝绒乳酪', baseColor: 'bg-rose-600', topColor: 'bg-rose-800', text: 'text-rose-100', border: 'border-rose-900', badge: '优雅典雅' },
  { id: 'cheesecake', name: '🧀 浓郁重芝士金砖', baseColor: 'bg-yellow-200', topColor: 'bg-amber-300', text: 'text-amber-950', border: 'border-amber-400', badge: '浓香顺滑' },
];

const FROSTINGS = [
  { id: 'cream-white', name: '☁️ 云朵纯白奶油', color: 'bg-white', border: 'border-pink-100' },
  { id: 'pink-drip', name: '🍓 粉红草莓甘纳许', color: 'bg-pink-300', border: 'border-pink-400' },
  { id: 'choco-drip', name: '🍫 浓郁黑巧熔岩', color: 'bg-[#3E2314]', border: 'border-[#2A150A]' },
  { id: 'lavender', name: '💜 梦幻薰衣草糖霜', color: 'bg-purple-300', border: 'border-purple-400' },
  { id: 'caramel', name: '🍮 焦糖海盐奶盖', color: 'bg-amber-400', border: 'border-amber-500' },
  { id: 'pistachio', name: '🌿 开心果翡翠青柠', color: 'bg-emerald-300', border: 'border-emerald-400' },
  { id: 'aurora', name: '🌌 银河极光炫紫', color: 'bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300', border: 'border-purple-300' },
  { id: 'sunset', name: '🌅 盛夏暖芒落日橙', color: 'bg-orange-300', border: 'border-orange-400' },
];

const CANDLE_STYLES = [
  { id: 'number21', name: '👑 21岁金粉数字烛', desc: '金色21岁数字蜡烛' },
  { id: 'classic-trio', name: '🕯️ 浪漫三重奏细烛', desc: '三根跳动心愿蜡烛' },
  { id: 'tiara-crown', name: '⭐ 璀璨公主皇冠烛', desc: '闪耀金冠与爱心火苗' },
  { id: 'sparkler', name: '✨ 仙女棒星芒流光烛', desc: '流光四溢魔法星火' },
];

const CAKE_PLATES = [
  { id: 'ceramic', name: '⚪ 法式白瓷盘', plateColor: 'from-gray-100 via-white to-gray-200', baseColor: 'from-gray-300 via-gray-100 to-gray-300', border: 'border-gray-300' },
  { id: 'gold', name: '✨ 奢华鎏金盘', plateColor: 'from-amber-200 via-yellow-100 to-amber-300', baseColor: 'from-amber-400 via-amber-200 to-amber-400', border: 'border-amber-400' },
  { id: 'crystal-pink', name: '💖 浪漫粉晶盘', plateColor: 'from-pink-200 via-rose-100 to-pink-300', baseColor: 'from-pink-300 via-pink-100 to-pink-300', border: 'border-pink-300' },
  { id: 'wood', name: '🪵 森系原木托盘', plateColor: 'from-amber-700 via-amber-600 to-amber-800', baseColor: 'from-amber-800 via-amber-700 to-amber-900', border: 'border-amber-800' },
];

const BORDER_DECORS = [
  { id: 'pearls', name: '⚪ 珍珠奶油球', emoji: '⚪' },
  { id: 'fruit', name: '🍓 环绕新鲜草莓', emoji: '🍓' },
  { id: 'chocolate', name: '🍫 黑巧碎屑花边', emoji: '🍫' },
  { id: 'stars', name: '✨ 金星糖霜滚边', emoji: '⭐' },
  { id: 'none', name: '🌱 极简自然无围边', emoji: '🌱' },
];

const TOPPING_OPTIONS = [
  { id: 'strawberry', label: '大草莓 🍓', emoji: '🍓', cat: 'fruit' },
  { id: 'cherry', label: '车厘子 🍒', emoji: '🍒', cat: 'fruit' },
  { id: 'blueberry', label: '新鲜蓝莓 🫐', emoji: '🫐', cat: 'fruit' },
  { id: 'macaron', label: '马卡龙 🧁', emoji: '🧁', cat: 'sweet' },
  { id: 'sparkles', label: '金粉闪烁 ✨', emoji: '✨', cat: 'magic' },
  { id: 'bamboo', label: '专属竹子 🎋', emoji: '🎋', cat: 'special' },
  { id: 'topper21', label: '21岁生日牌 👑', emoji: '👑', cat: 'special' },
  { id: 'chocolate', label: '生巧块 🍫', emoji: '🍫', cat: 'sweet' },
  { id: 'flower', label: '可食樱花 🌸', emoji: '🌸', cat: 'magic' },
  { id: 'lollipop', label: '波板糖 🍭', emoji: '🍭', cat: 'sweet' },
  { id: 'cookie-bear', label: '曲奇小熊 🐻', emoji: '🐻', cat: 'sweet' },
  { id: 'bow', label: '蝴蝶结 🎀', emoji: '🎀', cat: 'magic' },
  { id: 'heart', label: '爱心糖 💖', emoji: '💖', cat: 'magic' },
  { id: 'star', label: '摘下星星 🌟', emoji: '🌟', cat: 'magic' },
  { id: 'oreo', label: '奥利奥 🍪', emoji: '🍪', cat: 'sweet' },
];

const WISHES_STORAGE_KEY = 'zhuzihan_birthday_wishes_v1';

export const CakeWishView: React.FC = () => {
  // Cake Customization State
  const [selectedFlavor, setSelectedFlavor] = useState(CAKE_FLAVORS[0]);
  const [selectedFrosting, setSelectedFrosting] = useState(FROSTINGS[0]);
  const [selectedCandle, setSelectedCandle] = useState(CANDLE_STYLES[0]);
  const [selectedPlate, setSelectedPlate] = useState(CAKE_PLATES[0]);
  const [selectedBorder, setSelectedBorder] = useState(BORDER_DECORS[0]);
  const [activeToppings, setActiveToppings] = useState<string[]>([
    'strawberry',
    'cherry',
    'topper21',
    'bamboo',
    'sparkles',
    'macaron',
  ]);
  const [diyTab, setDiyTab] = useState<'flavor' | 'frosting' | 'toppings' | 'candle' | 'plate' | 'border'>('flavor');
  const [isCandleLit, setIsCandleLit] = useState(true);
  const [isBlown, setIsBlown] = useState(false);

  // Wish Box State (Voice / Letter)
  const [wishType, setWishType] = useState<'text' | 'voice'>('letter' as unknown as 'text');
  const [wishTab, setWishTab] = useState<'letter' | 'voice'>('letter');
  const [textWish, setTextWish] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  // Saved wishes storage
  const [savedWishes, setSavedWishes] = useState<WishItem[]>([]);
  const [showSavedCapsule, setShowSavedCapsule] = useState(false);
  const [justSavedWish, setJustSavedWish] = useState<WishItem | null>(null);

  // Load saved wishes
  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHES_STORAGE_KEY);
      if (stored) {
        setSavedWishes(JSON.parse(stored));
      } else {
        // Pre-fill an initial secret wish
        const initialWish: WishItem = {
          id: 'wish-initial',
          type: 'text',
          content: `愿竹子21岁所遇皆温柔，所想皆成真！身体健康、自由自在、永远开心快乐！`,
          createdAt: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
          sealed: true,
          cakeFlavor: '🍓 梦幻草莓慕斯',
          candleNumber: 21,
        };
        setSavedWishes([initialWish]);
      }
    } catch {
      // ignore
    }
  }, []);

  // Topping toggle
  const toggleTopping = (id: string) => {
    sound.playPop();
    setActiveToppings((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  // Random cake generator
  const handleRandomizeCake = () => {
    sound.playSparkle();
    const randomFlavor = CAKE_FLAVORS[Math.floor(Math.random() * CAKE_FLAVORS.length)];
    const randomFrosting = FROSTINGS[Math.floor(Math.random() * FROSTINGS.length)];
    const randomCandle = CANDLE_STYLES[Math.floor(Math.random() * CANDLE_STYLES.length)];
    const randomPlate = CAKE_PLATES[Math.floor(Math.random() * CAKE_PLATES.length)];
    const randomBorder = BORDER_DECORS[Math.floor(Math.random() * BORDER_DECORS.length)];

    // pick 4-6 random toppings
    const shuffled = [...TOPPING_OPTIONS].sort(() => 0.5 - Math.random());
    const randomTops = shuffled.slice(0, 5).map((t) => t.id);
    if (!randomTops.includes('bamboo')) randomTops.push('bamboo');

    setSelectedFlavor(randomFlavor);
    setSelectedFrosting(randomFrosting);
    setSelectedCandle(randomCandle);
    setSelectedPlate(randomPlate);
    setSelectedBorder(randomBorder);
    setActiveToppings(randomTops);
  };

  // Blow candle action
  const handleBlowCandle = () => {
    if (!isCandleLit) return;
    sound.playBlow();
    setIsCandleLit(false);
    setIsBlown(true);

    setTimeout(() => {
      sound.playFanfare();
      fireSideCannons();
      fireHeartStarsConfetti();
    }, 300);
  };

  // Re-light candle
  const handleRelight = () => {
    sound.playSparkle();
    setIsCandleLit(true);
    setIsBlown(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Voice recording for the Wish
  const startRecordingWish = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          setAudioUrl(reader.result as string);
        };
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordSeconds(0);
      sound.playPop();

      timerRef.current = window.setInterval(() => {
        setRecordSeconds((prev) => prev + 1);
      }, 1000);
    } catch {
      alert('请允许麦克风权限以录制语音心愿，或者切换到信件许愿输入文字哦！');
    }
  };

  const stopRecordingWish = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      sound.playSparkle();
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  // Save wish to local storage (Permanent Capsule)
  const handleSaveWish = () => {
    if (wishTab === 'letter' && !textWish.trim()) {
      alert('请写下竹子的21岁心愿再封存哦～');
      return;
    }
    if (wishTab === 'voice' && !audioUrl) {
      alert('请先录制一段语音心愿再封存哦～');
      return;
    }

    sound.playSparkle();
    fireHeartStarsConfetti();

    const newWish: WishItem = {
      id: `wish-${Date.now()}`,
      type: wishTab === 'voice' ? 'voice' : 'text',
      content: wishTab === 'letter' ? textWish.trim() : undefined,
      audioUrl: wishTab === 'voice' ? audioUrl! : undefined,
      duration: wishTab === 'voice' ? recordSeconds : undefined,
      createdAt: new Date().toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      sealed: true,
      cakeFlavor: selectedFlavor.name,
      candleNumber: BIRTHDAY_AGE,
    };

    const updated = [newWish, ...savedWishes];
    setSavedWishes(updated);
    try {
      localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // storage error
    }

    setJustSavedWish(newWish);
    setShowSavedCapsule(true);
    setTextWish('');
    setAudioUrl(null);
    setRecordSeconds(0);
  };

  // Candle flame rendering helper with aesthetic teardrop, glow aura, and realistic wick
  const renderFlame = (delay = '0s', size: 'sm' | 'md' | 'lg' = 'md') => {
    if (!isCandleLit) {
      return (
        <div className="flex flex-col items-center -mb-1 animate-smoke pointer-events-none select-none">
          <span className="text-[11px] text-gray-400">💨</span>
        </div>
      );
    }

    const sizes = {
      sm: { outer: 'w-3 h-5', inner: 'w-1 h-2.5', glow: 'w-6 h-8', wick: 'h-2' },
      md: { outer: 'w-3.5 h-6', inner: 'w-1.5 h-3', glow: 'w-7 h-9', wick: 'h-2.5' },
      lg: { outer: 'w-4.5 h-7', inner: 'w-2 h-3.5', glow: 'w-8 h-10', wick: 'h-3' },
    };
    const s = sizes[size];

    return (
      <div className="relative flex flex-col items-center z-30 pointer-events-none select-none">
        {/* Warm Ambient Glow Aura */}
        <div
          className={`absolute -top-1.5 ${s.glow} bg-amber-400/30 rounded-full blur-xs scale-125 animate-pulse pointer-events-none`}
          style={{ animationDelay: delay }}
        />
        {/* Dancing Teardrop Flame */}
        <div
          className={`relative ${s.outer} bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-100 rounded-full animate-flame shadow-[0_0_10px_rgba(251,191,36,0.95)] flex items-center justify-center -mb-0.5`}
          style={{ animationDelay: delay }}
        >
          {/* White-hot Core */}
          <div className={`${s.inner} bg-gradient-to-t from-amber-200 via-white to-white rounded-full opacity-90`} />
        </div>
        {/* Charcoal Candle Wick */}
        <div className={`w-0.5 ${s.wick} bg-stone-800 rounded-t-full shadow-xs -mb-0.5 z-20`} />
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-20">
      {/* Top Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold font-cute mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Part01 蛋糕时间</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#3D2C2E] font-cute tracking-tight">
          🍰 一起来做蛋糕吧！
        </h1>
        <p className="text-sm sm:text-base text-[#705D5F] mt-1 font-cute">
          定制蛋糕&封存心愿
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Cake Stage */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div
            id="cake-stage-container"
            className="w-full bg-gradient-to-b from-white via-pink-50/40 to-amber-50/30 rounded-3xl p-6 sm:p-8 border-2 border-pink-200/80 shadow-md relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]"
          >
            {/* Ambient Sparkles */}
            <div className="absolute top-4 left-6 text-xl animate-pulse">✨</div>
            <div className="absolute top-10 right-8 text-lg animate-pulse" style={{ animationDelay: '1s' }}>⭐</div>
            <div className="absolute bottom-6 left-8 text-base">🌸</div>
            <div className="absolute bottom-6 right-8 text-base">🎋</div>

            {/* Cake SVG & Customization Layer */}
            <div className="relative flex flex-col items-center justify-center py-6 w-full max-w-sm">
              {/* Candles on Top */}
              <div className="relative z-20 flex items-center justify-center gap-3 mb-1 min-h-[56px]">
                {selectedCandle.id === 'number21' && (
                  <div className="flex items-end justify-center gap-3.5 mb-0.5">
                    {/* Number 2 */}
                    <div className="flex flex-col items-center group">
                      {renderFlame('0s', 'md')}
                      <div className="relative flex flex-col items-center">
                        <div className="relative w-10 h-12 rounded-2xl bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 p-[2px] shadow-[0_4px_12px_rgba(217,119,6,0.35),0_1px_3px_rgba(0,0,0,0.12)] transition-transform group-hover:scale-105">
                          <div className="w-full h-full rounded-[14px] bg-gradient-to-br from-amber-200 via-yellow-100 to-amber-300 flex items-center justify-center relative overflow-hidden border border-white/70">
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent pointer-events-none" />
                            <span className="relative z-10 font-black text-amber-950 text-2xl font-cute drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                              2
                            </span>
                            <span className="absolute top-1 right-1.5 text-[8px] text-amber-600 animate-pulse">✨</span>
                          </div>
                        </div>
                        {/* Insertion stick */}
                        <div className="w-1.5 h-3 bg-gradient-to-b from-amber-300 to-amber-100 border-x border-amber-400/40 rounded-b shadow-xs -mt-0.5 z-10" />
                      </div>
                    </div>

                    {/* Number 1 */}
                    <div className="flex flex-col items-center group">
                      {renderFlame('0.2s', 'md')}
                      <div className="relative flex flex-col items-center">
                        <div className="relative w-10 h-12 rounded-2xl bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 p-[2px] shadow-[0_4px_12px_rgba(217,119,6,0.35),0_1px_3px_rgba(0,0,0,0.12)] transition-transform group-hover:scale-105">
                          <div className="w-full h-full rounded-[14px] bg-gradient-to-br from-amber-200 via-yellow-100 to-amber-300 flex items-center justify-center relative overflow-hidden border border-white/70">
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent pointer-events-none" />
                            <span className="relative z-10 font-black text-amber-950 text-2xl font-cute drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                              1
                            </span>
                            <span className="absolute top-1 right-1.5 text-[8px] text-amber-600 animate-pulse" style={{ animationDelay: '0.3s' }}>✨</span>
                          </div>
                        </div>
                        {/* Insertion stick */}
                        <div className="w-1.5 h-3 bg-gradient-to-b from-amber-300 to-amber-100 border-x border-amber-400/40 rounded-b shadow-xs -mt-0.5 z-10" />
                      </div>
                    </div>
                  </div>
                )}

                {selectedCandle.id === 'classic-trio' && (
                  <div className="flex items-end justify-center gap-4 mb-0.5">
                    {[
                      { color: 'from-rose-300 via-pink-400 to-rose-500', holder: 'border-pink-300 bg-pink-100', delay: '0s', height: 'h-11' },
                      { color: 'from-amber-200 via-yellow-300 to-amber-400', holder: 'border-amber-300 bg-amber-100', delay: '0.15s', height: 'h-13' },
                      { color: 'from-purple-300 via-indigo-300 to-purple-400', holder: 'border-purple-300 bg-purple-100', delay: '0.3s', height: 'h-11' },
                    ].map((c, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        {renderFlame(c.delay, 'sm')}
                        <div className="relative flex flex-col items-center">
                          <div
                            className={`w-2.5 ${c.height} rounded-t-sm bg-gradient-to-b ${c.color} border border-white/60 shadow-[0_2px_6px_rgba(0,0,0,0.15)] relative overflow-hidden`}
                          >
                            <div
                              className="absolute inset-0 opacity-40"
                              style={{
                                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.7) 3px, rgba(255,255,255,0.7) 5px)',
                              }}
                            />
                            <div className="w-1.5 h-1.5 bg-white/70 rounded-full mx-auto -mt-0.5 shadow-xs" />
                          </div>
                          <div className={`w-4 h-2 rounded-b-md border-x border-b ${c.holder} shadow-xs -mt-0.5 z-10`} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedCandle.id === 'tiara-crown' && (
                  <div className="flex flex-col items-center mb-0.5">
                    {renderFlame('0.1s', 'lg')}
                    <div className="relative flex flex-col items-center">
                      <div className="px-4 py-1.5 rounded-2xl bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 border-2 border-amber-400 text-amber-950 font-black text-xs shadow-[0_4px_12px_rgba(217,119,6,0.3)] flex items-center gap-1.5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent pointer-events-none" />
                        <span className="text-base">👑</span>
                        <span className="font-cute tracking-wide drop-shadow-xs">21岁 Princess</span>
                        <span className="text-pink-500 text-xs">💖</span>
                      </div>
                      <div className="w-2 h-3 bg-gradient-to-b from-amber-300 to-amber-100 rounded-b shadow-xs -mt-0.5 z-10" />
                    </div>
                  </div>
                )}

                {selectedCandle.id === 'sparkler' && (
                  <div className="flex items-end justify-center gap-7 mb-0.5">
                    {[0, 1].map((idx) => (
                      <div key={idx} className="flex flex-col items-center relative">
                        {isCandleLit ? (
                          <div className="relative flex flex-col items-center -mb-1">
                            <div
                              className="text-amber-400 font-bold text-sm animate-spin drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                              style={{ animationDuration: `${2.5 + idx * 0.5}s` }}
                            >
                              ✨
                            </div>
                            <div className="absolute -top-1 -right-2 text-[10px] animate-ping">⭐</div>
                            <div className="absolute -top-2 -left-2 text-[9px] animate-pulse">🌟</div>
                          </div>
                        ) : (
                          <div className="text-[10px] text-gray-400 animate-smoke -mb-1">💨</div>
                        )}
                        <div className="relative flex flex-col items-center">
                          <div className="w-1.5 h-12 bg-gradient-to-b from-amber-200 via-stone-400 to-stone-500 rounded-t-full shadow-xs border-x border-amber-100/40" />
                          <div className="w-1 h-3 bg-stone-600 rounded-b shadow-xs -mt-0.5 z-10" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Toppings floating above top layer */}
              <div className="z-20 flex items-center justify-center gap-2 -mb-3 px-4 flex-wrap max-w-[290px]">
                {activeToppings.map((topId) => {
                  const item = TOPPING_OPTIONS.find((t) => t.id === topId);
                  if (!item) return null;
                  return (
                    <motion.span
                      key={topId}
                      initial={{ scale: 0, y: -10 }}
                      animate={{ scale: 1, y: 0 }}
                      className="text-2xl filter drop-shadow-sm transform hover:scale-130 transition-transform cursor-pointer"
                      title={item.label}
                    >
                      {item.emoji}
                    </motion.span>
                  );
                })}
              </div>

              {/* Top Layer (Frosting + Cream) */}
              <div
                className={`relative w-48 sm:w-56 h-14 ${selectedFrosting.color} rounded-t-2xl border-x-2 border-t-2 ${selectedFrosting.border} shadow-sm z-10 flex items-center justify-center transition-colors duration-300`}
              >
                {/* Drip scalloped bottom */}
                <div className="absolute -bottom-2.5 left-0 right-0 flex justify-between px-1">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-6 h-4 ${selectedFrosting.color} rounded-b-full shadow-xs`}
                    />
                  ))}
                </div>
                {/* Cake text badge */}
                <span className="text-xs font-bold text-pink-700/90 bg-white/80 px-2.5 py-0.5 rounded-full border border-pink-100 shadow-xs">
                  {BIRTHDAY_GIRL} · 21st
                </span>
              </div>

              {/* Middle Layer (Cake Sponge Base) */}
              <div
                className={`relative w-56 sm:w-64 h-16 ${selectedFlavor.baseColor} border-x-2 ${selectedFlavor.border} flex items-center justify-center transition-colors duration-300 shadow-inner`}
              >
                <div className="absolute inset-0 bg-white/10" />
                <span className={`text-xs font-bold tracking-wider ${selectedFlavor.text || 'text-black/60'}`}>
                  {selectedFlavor.name.split(' ')[1]}
                </span>
              </div>

              {/* Border Decor (Between Middle & Bottom Layer) */}
              {selectedBorder.id !== 'none' && (
                <div className="w-60 sm:w-68 -my-1 z-15 flex items-center justify-around px-2 pointer-events-none">
                  {selectedBorder.id === 'pearls' && (
                    <div className="flex items-center justify-between w-full">
                      {[...Array(11)].map((_, i) => (
                        <div key={i} className="w-3 h-3 rounded-full bg-white border border-pink-200 shadow-xs" />
                      ))}
                    </div>
                  )}
                  {selectedBorder.id === 'fruit' && (
                    <div className="flex items-center justify-between w-full text-xs">
                      {[...Array(7)].map((_, i) => (
                        <span key={i}>{i % 2 === 0 ? '🍓' : '🫐'}</span>
                      ))}
                    </div>
                  )}
                  {selectedBorder.id === 'chocolate' && (
                    <div className="flex items-center justify-between w-full text-xs">
                      {[...Array(7)].map((_, i) => (
                        <span key={i}>🍫</span>
                      ))}
                    </div>
                  )}
                  {selectedBorder.id === 'stars' && (
                    <div className="flex items-center justify-between w-full text-xs animate-pulse">
                      {[...Array(8)].map((_, i) => (
                        <span key={i}>✨</span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Big Base Layer */}
              <div
                className={`relative w-64 sm:w-72 h-16 ${selectedFlavor.topColor} rounded-b-2xl border-x-2 border-b-2 ${selectedFlavor.border} flex items-center justify-center shadow-md transition-colors duration-300`}
              >
                <div className="text-xs font-bold text-white/95 drop-shadow-xs tracking-widest font-cute">
                  ✨ HAPPY 21ST BIRTHDAY ✨
                </div>
              </div>

              {/* Cake Stand / Plate */}
              <div
                className={`w-72 sm:w-84 h-4.5 bg-gradient-to-r ${selectedPlate.plateColor} rounded-full border-2 ${selectedPlate.border} shadow-lg mt-1`}
              />
              <div
                className={`w-36 h-4 bg-gradient-to-r ${selectedPlate.baseColor} rounded-b-xl border-x-2 border-b-2 ${selectedPlate.border} -mt-1 shadow-xs`}
              />
            </div>

            {/* Candle Status Banner & Blow Action Buttons */}
            <div className="mt-4 w-full flex flex-col items-center gap-3">
              {isCandleLit ? (
                <div className="text-center">
                  <p className="text-xs sm:text-sm font-semibold text-amber-800 bg-amber-100/90 px-4 py-1.5 rounded-full border border-amber-200 inline-flex items-center gap-1.5 shadow-xs">
                    <Flame className="w-4 h-4 text-amber-500 animate-bounce" />
                    <span>蜡烛已点燃！请闭上眼许下21岁的第一个心愿～</span>
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center"
                >
                  <p className="text-sm font-bold text-pink-700 bg-pink-100 px-4 py-1.5 rounded-full border border-pink-200 inline-flex items-center gap-1.5 shadow-xs">
                    <Sparkles className="w-4 h-4 text-pink-500" />
                    <span>🎉 蜡烛已吹灭！愿竹子21岁的所有心愿通通成真！</span>
                  </p>
                </motion.div>
              )}

              {/* Blow Buttons */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                {isCandleLit ? (
                  <button
                    id="blow-candle-direct-btn"
                    onClick={handleBlowCandle}
                    className="px-7 py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 hover:from-rose-600 hover:to-pink-600 text-white font-black text-sm sm:text-base shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <span className="text-lg">💨</span>
                    <span>一口气吹灭蜡烛，许下心愿！</span>
                  </button>
                ) : (
                  <button
                    id="relight-candle-btn"
                    onClick={handleRelight}
                    className="px-5 py-2 rounded-full bg-white border border-amber-300 text-amber-800 hover:bg-amber-50 text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>重新点燃蜡烛</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Cake Customization Controls - Rich Workshop */}
          <div className="w-full mt-6 bg-white rounded-3xl p-5 sm:p-6 border border-pink-100 shadow-xs">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h3 className="text-base font-bold text-[#3D2C2E] flex items-center gap-2 font-cute">
                  <span>🎨 DIY 蛋糕定制台</span>
                  <span className="text-xs font-normal text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
                    多种花样自由搭配
                  </span>
                </h3>
              </div>
              <button
                id="randomize-cake-btn"
                onClick={handleRandomizeCake}
                className="px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                title="随机换一套专属设计"
              >
                <span>🎲</span>
                <span>换个随机特调</span>
              </button>
            </div>

            {/* Customization Sub-Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none border-b border-gray-100 text-xs font-medium">
              {[
                { id: 'flavor', label: '🍰 口味胚底', count: CAKE_FLAVORS.length },
                { id: 'frosting', label: '🍧 奶油淋面', count: FROSTINGS.length },
                { id: 'toppings', label: '🍓 顶部配料', count: `${activeToppings.length}/${TOPPING_OPTIONS.length}` },
                { id: 'candle', label: '🕯️ 蜡烛款式', count: CANDLE_STYLES.length },
                { id: 'plate', label: '🍽️ 托盘底座', count: CAKE_PLATES.length },
                { id: 'border', label: '🎀 蛋糕围边', count: BORDER_DECORS.length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  id={`diy-tab-${tab.id}`}
                  onClick={() => {
                    sound.playPop();
                    setDiyTab(tab.id as typeof diyTab);
                  }}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                    diyTab === tab.id
                      ? 'bg-pink-500 text-white font-bold shadow-xs'
                      : 'bg-gray-50 text-gray-600 hover:bg-pink-50/80 hover:text-pink-700'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${diyTab === tab.id ? 'bg-white/25 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Tab 1: Flavor selector */}
            {diyTab === 'flavor' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">当前选择: <strong className="text-pink-600">{selectedFlavor.name}</strong></span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CAKE_FLAVORS.map((flavor) => (
                    <button
                      key={flavor.id}
                      id={`cake-flavor-${flavor.id}`}
                      onClick={() => {
                        sound.playPop();
                        setSelectedFlavor(flavor);
                      }}
                      className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                        selectedFlavor.id === flavor.id
                          ? 'bg-pink-100/90 border-pink-400 text-pink-950 font-bold shadow-xs ring-2 ring-pink-300'
                          : 'bg-gray-50/70 border-gray-200 text-gray-700 hover:bg-pink-50/50'
                      }`}
                    >
                      <span>{flavor.name}</span>
                      <span className="text-[10px] text-gray-500 font-normal">{flavor.badge}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Frosting selector */}
            {diyTab === 'frosting' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">当前选择: <strong className="text-pink-600">{selectedFrosting.name}</strong></span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {FROSTINGS.map((frost) => (
                    <button
                      key={frost.id}
                      id={`cake-frosting-${frost.id}`}
                      onClick={() => {
                        sound.playPop();
                        setSelectedFrosting(frost);
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                        selectedFrosting.id === frost.id
                          ? 'bg-pink-100 border-pink-400 text-pink-900 font-bold shadow-xs ring-2 ring-pink-300'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-pink-50'
                      }`}
                    >
                      {frost.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Toppings multi-select */}
            {diyTab === 'toppings' && (
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs text-gray-500">
                    已选 <strong className="text-pink-600">{activeToppings.length}</strong> 种配饰点缀
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        sound.playSparkle();
                        setActiveToppings(TOPPING_OPTIONS.map((t) => t.id));
                      }}
                      className="text-[11px] text-pink-600 hover:underline px-1.5 py-0.5"
                    >
                      ✨ 全选
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      onClick={() => {
                        sound.playPop();
                        setActiveToppings(['bamboo', 'topper21']);
                      }}
                      className="text-[11px] text-gray-500 hover:underline px-1.5 py-0.5"
                    >
                      重置基础
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {TOPPING_OPTIONS.map((top) => {
                    const isActive = activeToppings.includes(top.id);
                    return (
                      <button
                        key={top.id}
                        id={`cake-topping-${top.id}`}
                        onClick={() => toggleTopping(top.id)}
                        className={`p-2 rounded-xl text-xs font-medium border transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                          isActive
                            ? 'bg-pink-500 text-white border-pink-600 shadow-xs ring-1 ring-pink-300 scale-102'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-lg">{top.emoji}</span>
                        <span className="text-[11px] leading-tight">{top.label.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 4: Candle style selector */}
            {diyTab === 'candle' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">当前选择: <strong className="text-pink-600">{selectedCandle.name}</strong></span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CANDLE_STYLES.map((candle) => (
                    <button
                      key={candle.id}
                      id={`cake-candle-${candle.id}`}
                      onClick={() => {
                        sound.playPop();
                        setSelectedCandle(candle);
                      }}
                      className={`p-3 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer flex items-center justify-between ${
                        selectedCandle.id === candle.id
                          ? 'bg-amber-100/80 border-amber-400 text-amber-950 font-bold shadow-xs ring-2 ring-amber-300'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-amber-50/50'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-sm">{candle.name}</div>
                        <div className="text-[11px] text-gray-500 font-normal mt-0.5">{candle.desc}</div>
                      </div>
                      {selectedCandle.id === candle.id && <span className="text-amber-600 font-bold">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 5: Cake Plate selector */}
            {diyTab === 'plate' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">当前托盘: <strong className="text-pink-600">{selectedPlate.name}</strong></span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CAKE_PLATES.map((plate) => (
                    <button
                      key={plate.id}
                      id={`cake-plate-${plate.id}`}
                      onClick={() => {
                        sound.playPop();
                        setSelectedPlate(plate);
                      }}
                      className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                        selectedPlate.id === plate.id
                          ? 'bg-pink-100 border-pink-400 text-pink-900 font-bold shadow-xs ring-2 ring-pink-300'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-pink-50'
                      }`}
                    >
                      {plate.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 6: Border Decor selector */}
            {diyTab === 'border' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">当前围边: <strong className="text-pink-600">{selectedBorder.name}</strong></span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {BORDER_DECORS.map((border) => (
                    <button
                      key={border.id}
                      id={`cake-border-${border.id}`}
                      onClick={() => {
                        sound.playPop();
                        setSelectedBorder(border);
                      }}
                      className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                        selectedBorder.id === border.id
                          ? 'bg-pink-100 border-pink-400 text-pink-900 font-bold shadow-xs ring-2 ring-pink-300'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-pink-50'
                      }`}
                    >
                      {border.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: 许愿对话框 (Microphone & Letter Box) & Saved Wishes */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Wish Entry Box */}
          <div
            id="wish-box-container"
            className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-pink-200 shadow-sm relative overflow-hidden"
          >
            {/* Header / Tabs */}
            <div className="flex items-center justify-between mb-4 border-b border-pink-100 pb-3">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#3D2C2E] font-cute flex items-center gap-1.5">
                  <span>💌 竹子的21岁许愿箱</span>
                </h2>
                <p className="text-xs text-gray-500">我们会永远为你保存这份珍贵愿望</p>
              </div>

              {/* Tab Selector: Letter vs Voice */}
              <div className="flex items-center bg-pink-50 p-1 rounded-xl border border-pink-100 text-xs">
                <button
                  id="wish-tab-letter"
                  onClick={() => {
                    sound.playPop();
                    setWishTab('letter');
                  }}
                  className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                    wishTab === 'letter'
                      ? 'bg-white text-pink-700 font-bold shadow-xs'
                      : 'text-gray-600 hover:text-pink-600'
                  }`}
                >
                  信件心愿
                </button>
                <button
                  id="wish-tab-voice"
                  onClick={() => {
                    sound.playPop();
                    setWishTab('voice');
                  }}
                  className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                    wishTab === 'voice'
                      ? 'bg-white text-pink-700 font-bold shadow-xs'
                      : 'text-gray-600 hover:text-pink-600'
                  }`}
                >
                  🎤 语音录制
                </button>
              </div>
            </div>

            {/* Success Celebration Card after saving wish */}
            {justSavedWish && showSavedCapsule && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-pink-50 via-rose-50/60 to-amber-50/70 border-2 border-pink-200/90 text-center relative shadow-xs"
              >
                <div className="text-2xl mb-1.5 animate-bounce">💌 ✨ 🎋</div>
                <h4 className="text-base font-bold text-pink-900 font-cute">
                  21岁心愿已成功封存进时光胶囊！
                </h4>
                <p className="text-xs text-pink-700/90 mt-1">
                  愿竹子21岁的所有心愿通通成真，平安喜乐，岁岁年年皆胜意！
                </p>
                {justSavedWish.type === 'text' && justSavedWish.content && (
                  <div className="mt-3 text-xs text-[#4A3E3D] bg-white/90 p-3 rounded-xl border border-pink-100 font-cute text-left max-h-24 overflow-y-auto leading-relaxed">
                    “{justSavedWish.content}”
                  </div>
                )}
                {justSavedWish.type === 'voice' && justSavedWish.audioUrl && (
                  <div className="mt-3">
                    <audio controls src={justSavedWish.audioUrl} className="w-full h-8" />
                  </div>
                )}
                <button
                  onClick={() => setShowSavedCapsule(false)}
                  className="mt-3 px-4 py-1.5 rounded-full bg-white border border-pink-300 text-pink-700 hover:bg-pink-50 text-xs font-semibold shadow-2xs inline-flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                >
                  <span>✍️ 再写一个愿望</span>
                </button>
              </motion.div>
            )}

            {/* Letter Input Tab */}
            {wishTab === 'letter' && (
              <div>
                <div className="relative mb-4">
                  <textarea
                    id="wish-letter-textarea"
                    rows={4}
                    value={textWish}
                    onChange={(e) => setTextWish(e.target.value)}
                    placeholder="亲爱的21岁自己：我希望在这一年里……（写下你的心愿，我们将帮你永久封存进时光胶囊）"
                    className="w-full p-4 rounded-2xl bg-amber-50/40 border border-amber-200/80 text-sm text-[#4A3E3D] focus:outline-hidden focus:ring-2 focus:ring-pink-400 focus:bg-white resize-none leading-relaxed placeholder:text-gray-400"
                  />
                  <span className="absolute bottom-2 right-3 text-xs text-gray-400 font-cute">
                    🎋 21岁心愿笺
                  </span>
                </div>

                <button
                  id="submit-letter-wish-btn"
                  onClick={handleSaveWish}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>✨ 永久封存进时光胶囊</span>
                </button>
              </div>
            )}

            {/* Voice Input Tab */}
            {wishTab === 'voice' && (
              <div className="py-2 flex flex-col items-center">
                <div className="w-full p-6 rounded-2xl bg-pink-50/50 border border-pink-100 flex flex-col items-center justify-center text-center mb-4">
                  {isRecording ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center animate-pulse shadow-lg">
                        <Mic className="w-8 h-8" />
                      </div>
                      <div className="text-red-600 font-bold text-sm flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                        <span>正在录音中... ({recordSeconds}s)</span>
                      </div>
                      <p className="text-xs text-gray-500">对着麦克风说出竹子的21岁生日心愿吧</p>
                      <button
                        id="stop-recording-btn"
                        onClick={stopRecordingWish}
                        className="mt-2 px-5 py-2 rounded-full bg-red-600 text-white font-semibold text-xs shadow-md hover:bg-red-700 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Square className="w-3.5 h-3.5 fill-white" />
                        <span>完成录音</span>
                      </button>
                    </div>
                  ) : audioUrl ? (
                    <div className="w-full flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <div className="text-xs text-emerald-800 font-bold">
                        🎉 语音心愿已录制完成！时长约 {recordSeconds} 秒
                      </div>
                      <audio controls src={audioUrl} className="w-full max-w-xs mt-1" />
                      <button
                        id="re-record-btn"
                        onClick={startRecordingWish}
                        className="text-xs text-pink-600 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>不满意？重新录制</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <button
                        id="start-record-btn"
                        onClick={startRecordingWish}
                        className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      >
                        <Mic className="w-7 h-7" />
                      </button>
                      <div className="text-xs font-semibold text-gray-700">
                        点击麦克风，亲口说出21岁心愿
                      </div>
                      <p className="text-[11px] text-gray-400">
                        支持录音保存，未来随时可以重温这段声音～
                      </p>
                    </div>
                  )}
                </div>

                {audioUrl && !isRecording && (
                  <button
                    id="submit-voice-wish-btn"
                    onClick={handleSaveWish}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Lock className="w-4 h-4" />
                    <span>✨ 永久封存这段语音愿望</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
