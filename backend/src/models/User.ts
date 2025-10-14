import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  balance: number;
  bonusBalance: number;
  isVerified: boolean;
  verificationToken?: string;
  kycStatus: 'pending' | 'verified' | 'rejected';
  kycDocuments?: string[];
  vipLevel: 'bronze' | 'silver' | 'gold' | 'platinum';
  responsibleGaming: {
    depositLimit?: {
      daily?: number;
      weekly?: number;
      monthly?: number;
    };
    lossLimit?: {
      daily?: number;
      weekly?: number;
      monthly?: number;
    };
    sessionTimeLimit?: number;
    selfExclusionUntil?: Date;
  };
  favoriteGames: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    dateOfBirth: { type: Date },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      zipCode: { type: String },
    },
    balance: { type: Number, default: 0 },
    bonusBalance: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    kycStatus: { 
      type: String, 
      enum: ['pending', 'verified', 'rejected'], 
      default: 'pending' 
    },
    kycDocuments: [{ type: String }],
    vipLevel: { 
      type: String, 
      enum: ['bronze', 'silver', 'gold', 'platinum'], 
      default: 'bronze' 
    },
    responsibleGaming: {
      depositLimit: {
        daily: { type: Number },
        weekly: { type: Number },
        monthly: { type: Number },
      },
      lossLimit: {
        daily: { type: Number },
        weekly: { type: Number },
        monthly: { type: Number },
      },
      sessionTimeLimit: { type: Number },
      selfExclusionUntil: { type: Date },
    },
    favoriteGames: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', UserSchema);
