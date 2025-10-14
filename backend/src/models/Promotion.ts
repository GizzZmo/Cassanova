import mongoose, { Schema, Document } from 'mongoose';

export interface IPromotion extends Document {
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
  validFrom: Date;
  validUntil?: Date;
  promoCode?: string;
  terms: string;
  image: string;
  isActive: boolean;
  eligibleVipLevels: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PromotionSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    type: { 
      type: String, 
      required: true,
      enum: ['welcome-bonus', 'reload-bonus', 'free-spins', 'cashback', 'vip-bonus']
    },
    bonusAmount: { type: Number },
    bonusPercentage: { type: Number },
    freeSpins: { type: Number },
    minDeposit: { type: Number },
    maxBonus: { type: Number },
    wageringRequirement: { type: Number, required: true },
    validFrom: { type: Date, required: true },
    validUntil: { type: Date },
    promoCode: { type: String },
    terms: { type: String, required: true },
    image: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    eligibleVipLevels: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPromotion>('Promotion', PromotionSchema);
