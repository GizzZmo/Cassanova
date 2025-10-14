import mongoose, { Schema, Document } from 'mongoose';

export interface IGame extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const GameSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    provider: { type: String, required: true },
    category: { 
      type: String, 
      required: true,
      enum: ['slots', 'table-games', 'live-casino', 'video-poker', 'specialty']
    },
    subcategory: { type: String },
    thumbnail: { type: String, required: true },
    description: { type: String, required: true },
    rtp: { type: Number, required: true },
    volatility: { 
      type: String, 
      enum: ['low', 'medium', 'high'], 
      default: 'medium' 
    },
    features: [{ type: String }],
    minBet: { type: Number, default: 0.10 },
    maxBet: { type: Number, default: 100 },
    isPopular: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    hasJackpot: { type: Boolean, default: false },
    jackpotAmount: { type: Number },
    demoAvailable: { type: Boolean, default: true },
    launchUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IGame>('Game', GameSchema);
