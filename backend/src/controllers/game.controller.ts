import { Request, Response } from 'express';
import Game from '../models/Game';

export const getAllGames = async (req: Request, res: Response) => {
  try {
    const { category, provider, isPopular, isNew, search } = req.query;
    const filter: any = {};

    if (category) filter.category = category;
    if (provider) filter.provider = provider;
    if (isPopular === 'true') filter.isPopular = true;
    if (isNew === 'true') filter.isNew = true;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { provider: { $regex: search, $options: 'i' } },
      ];
    }

    const games = await Game.find(filter).sort({ createdAt: -1 });
    res.json(games);
  } catch (error) {
    console.error('Get games error:', error);
    res.status(500).json({ message: 'Failed to fetch games', error });
  }
};

export const getGameBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const game = await Game.findOne({ slug });

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    res.json(game);
  } catch (error) {
    console.error('Get game error:', error);
    res.status(500).json({ message: 'Failed to fetch game', error });
  }
};

export const getJackpotGames = async (req: Request, res: Response) => {
  try {
    const games = await Game.find({ hasJackpot: true }).sort({ jackpotAmount: -1 });
    res.json(games);
  } catch (error) {
    console.error('Get jackpot games error:', error);
    res.status(500).json({ message: 'Failed to fetch jackpot games', error });
  }
};

export const createGame = async (req: Request, res: Response) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.status(201).json({ message: 'Game created successfully', game });
  } catch (error) {
    console.error('Create game error:', error);
    res.status(500).json({ message: 'Failed to create game', error });
  }
};
