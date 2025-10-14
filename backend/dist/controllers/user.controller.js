"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleFavoriteGame = exports.updateResponsibleGaming = exports.updateUserProfile = exports.getUserProfile = void 0;
const User_1 = __importDefault(require("../models/User"));
const getUserProfile = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.userId).select('-password -verificationToken');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Failed to fetch profile', error });
    }
};
exports.getUserProfile = getUserProfile;
const updateUserProfile = async (req, res) => {
    try {
        const { firstName, lastName, address } = req.body;
        const user = await User_1.default.findByIdAndUpdate(req.userId, { firstName, lastName, address }, { new: true }).select('-password -verificationToken');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Profile updated successfully', user });
    }
    catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Failed to update profile', error });
    }
};
exports.updateUserProfile = updateUserProfile;
const updateResponsibleGaming = async (req, res) => {
    try {
        const { depositLimit, lossLimit, sessionTimeLimit } = req.body;
        const user = await User_1.default.findByIdAndUpdate(req.userId, {
            'responsibleGaming.depositLimit': depositLimit,
            'responsibleGaming.lossLimit': lossLimit,
            'responsibleGaming.sessionTimeLimit': sessionTimeLimit,
        }, { new: true }).select('-password -verificationToken');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Responsible gaming settings updated', user });
    }
    catch (error) {
        console.error('Update responsible gaming error:', error);
        res.status(500).json({ message: 'Failed to update settings', error });
    }
};
exports.updateResponsibleGaming = updateResponsibleGaming;
const toggleFavoriteGame = async (req, res) => {
    try {
        const { gameId } = req.body;
        const user = await User_1.default.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const index = user.favoriteGames.indexOf(gameId);
        if (index > -1) {
            user.favoriteGames.splice(index, 1);
        }
        else {
            user.favoriteGames.push(gameId);
        }
        await user.save();
        res.json({ message: 'Favorites updated', favoriteGames: user.favoriteGames });
    }
    catch (error) {
        console.error('Toggle favorite error:', error);
        res.status(500).json({ message: 'Failed to update favorites', error });
    }
};
exports.toggleFavoriteGame = toggleFavoriteGame;
