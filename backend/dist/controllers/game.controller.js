"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGame = exports.getJackpotGames = exports.getGameBySlug = exports.getAllGames = void 0;
const Game_1 = __importDefault(require("../models/Game"));
const getAllGames = async (req, res) => {
    try {
        const { category, provider, isPopular, isNew, search } = req.query;
        const filter = {};
        if (category)
            filter.category = category;
        if (provider)
            filter.provider = provider;
        if (isPopular === 'true')
            filter.isPopular = true;
        if (isNew === 'true')
            filter.isNew = true;
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { provider: { $regex: search, $options: 'i' } },
            ];
        }
        const games = await Game_1.default.find(filter).sort({ createdAt: -1 });
        res.json(games);
    }
    catch (error) {
        console.error('Get games error:', error);
        res.status(500).json({ message: 'Failed to fetch games', error });
    }
};
exports.getAllGames = getAllGames;
const getGameBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const game = await Game_1.default.findOne({ slug });
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.json(game);
    }
    catch (error) {
        console.error('Get game error:', error);
        res.status(500).json({ message: 'Failed to fetch game', error });
    }
};
exports.getGameBySlug = getGameBySlug;
const getJackpotGames = async (req, res) => {
    try {
        const games = await Game_1.default.find({ hasJackpot: true }).sort({ jackpotAmount: -1 });
        res.json(games);
    }
    catch (error) {
        console.error('Get jackpot games error:', error);
        res.status(500).json({ message: 'Failed to fetch jackpot games', error });
    }
};
exports.getJackpotGames = getJackpotGames;
const createGame = async (req, res) => {
    try {
        const game = new Game_1.default(req.body);
        await game.save();
        res.status(201).json({ message: 'Game created successfully', game });
    }
    catch (error) {
        console.error('Create game error:', error);
        res.status(500).json({ message: 'Failed to create game', error });
    }
};
exports.createGame = createGame;
