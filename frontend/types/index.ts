export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  balance: number;
  bonusBalance: number;
  vipLevel: 'bronze' | 'silver' | 'gold' | 'platinum';
  kycStatus: 'pending' | 'verified' | 'rejected';
}

export interface Game {
  _id: string;
  title: string;
  slug: string;
  provider: string;
  category: 'slots' | 'table-games' | 'live-casino' | 'video-poker' | 'specialty';
  subcategory?: string;
  thumbnail: string;
  description: string;
  rtp: number;
  volatility: 'low' | 'medium' | 'high';
  features: string[];
  minBet: number;
  maxBet: number;
  isPopular: boolean;
  isNew: boolean;
  isFeatured: boolean;
  hasJackpot: boolean;
  jackpotAmount?: number;
  demoAvailable: boolean;
  launchUrl: string;
}

export interface Promotion {
  _id: string;
  title: string;
  slug: string;
  description: string;
  type: 'welcome-bonus' | 'reload-bonus' | 'free-spins' | 'cashback' | 'vip-bonus';
  bonusAmount?: number;
  bonusPercentage?: number;
  freeSpins?: number;
  minDeposit?: number;
  maxBonus?: number;
  wageringRequirement: number;
  validFrom: string;
  validUntil?: string;
  promoCode?: string;
  terms: string;
  image: string;
  isActive: boolean;
  eligibleVipLevels: string[];
}

export interface Transaction {
  _id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'bet' | 'win';
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  paymentMethod?: string;
  balanceBefore: number;
  balanceAfter: number;
  description: string;
  createdAt: string;
}
