import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import User from '../models/User';

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId).select('-password -verificationToken');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Failed to fetch profile', error });
  }
};

export const updateUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { firstName, lastName, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { firstName, lastName, address },
      { new: true }
    ).select('-password -verificationToken');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Failed to update profile', error });
  }
};

export const updateResponsibleGaming = async (req: AuthRequest, res: Response) => {
  try {
    const { depositLimit, lossLimit, sessionTimeLimit } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        'responsibleGaming.depositLimit': depositLimit,
        'responsibleGaming.lossLimit': lossLimit,
        'responsibleGaming.sessionTimeLimit': sessionTimeLimit,
      },
      { new: true }
    ).select('-password -verificationToken');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Responsible gaming settings updated', user });
  } catch (error) {
    console.error('Update responsible gaming error:', error);
    res.status(500).json({ message: 'Failed to update settings', error });
  }
};

export const toggleFavoriteGame = async (req: AuthRequest, res: Response) => {
  try {
    const { gameId } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const index = user.favoriteGames.indexOf(gameId);
    if (index > -1) {
      user.favoriteGames.splice(index, 1);
    } else {
      user.favoriteGames.push(gameId);
    }

    await user.save();
    res.json({ message: 'Favorites updated', favoriteGames: user.favoriteGames });
  } catch (error) {
    console.error('Toggle favorite error:', error);
    res.status(500).json({ message: 'Failed to update favorites', error });
  }
};
