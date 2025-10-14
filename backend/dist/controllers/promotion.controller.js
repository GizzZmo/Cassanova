"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPromotion = exports.getPromotionBySlug = exports.getAllPromotions = void 0;
const Promotion_1 = __importDefault(require("../models/Promotion"));
const getAllPromotions = async (req, res) => {
    try {
        const { type, isActive } = req.query;
        const filter = {};
        if (type)
            filter.type = type;
        if (isActive !== undefined)
            filter.isActive = isActive === 'true';
        const currentDate = new Date();
        filter.validFrom = { $lte: currentDate };
        filter.$or = [
            { validUntil: { $exists: false } },
            { validUntil: { $gte: currentDate } }
        ];
        const promotions = await Promotion_1.default.find(filter).sort({ createdAt: -1 });
        res.json(promotions);
    }
    catch (error) {
        console.error('Get promotions error:', error);
        res.status(500).json({ message: 'Failed to fetch promotions', error });
    }
};
exports.getAllPromotions = getAllPromotions;
const getPromotionBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const promotion = await Promotion_1.default.findOne({ slug });
        if (!promotion) {
            return res.status(404).json({ message: 'Promotion not found' });
        }
        res.json(promotion);
    }
    catch (error) {
        console.error('Get promotion error:', error);
        res.status(500).json({ message: 'Failed to fetch promotion', error });
    }
};
exports.getPromotionBySlug = getPromotionBySlug;
const createPromotion = async (req, res) => {
    try {
        const promotion = new Promotion_1.default(req.body);
        await promotion.save();
        res.status(201).json({ message: 'Promotion created successfully', promotion });
    }
    catch (error) {
        console.error('Create promotion error:', error);
        res.status(500).json({ message: 'Failed to create promotion', error });
    }
};
exports.createPromotion = createPromotion;
