import { Request, Response } from 'express';
import Promotion from '../models/Promotion';

export const getAllPromotions = async (req: Request, res: Response) => {
  try {
    const { type, isActive } = req.query;
    const filter: any = {};

    if (type) filter.type = type;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const currentDate = new Date();
    filter.validFrom = { $lte: currentDate };
    filter.$or = [
      { validUntil: { $exists: false } },
      { validUntil: { $gte: currentDate } }
    ];

    const promotions = await Promotion.find(filter).sort({ createdAt: -1 });
    res.json(promotions);
  } catch (error) {
    console.error('Get promotions error:', error);
    res.status(500).json({ message: 'Failed to fetch promotions', error });
  }
};

export const getPromotionBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const promotion = await Promotion.findOne({ slug });

    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }

    res.json(promotion);
  } catch (error) {
    console.error('Get promotion error:', error);
    res.status(500).json({ message: 'Failed to fetch promotion', error });
  }
};

export const createPromotion = async (req: Request, res: Response) => {
  try {
    const promotion = new Promotion(req.body);
    await promotion.save();
    res.status(201).json({ message: 'Promotion created successfully', promotion });
  } catch (error) {
    console.error('Create promotion error:', error);
    res.status(500).json({ message: 'Failed to create promotion', error });
  }
};
