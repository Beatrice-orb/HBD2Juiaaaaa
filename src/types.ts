export interface WishItem {
  id: string;
  type: 'text' | 'voice';
  content?: string; // Text wish
  audioUrl?: string; // Voice wish object URL or base64
  duration?: number; // Voice duration in seconds
  createdAt: string;
  sealed: boolean;
  cakeFlavor: string;
  candleNumber: number;
}

export interface CouponItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  code: string;
  isUsed: boolean;
  description: string;
}

export type ActiveTab = 'landing' | 'wish-cake' | 'gifts';
