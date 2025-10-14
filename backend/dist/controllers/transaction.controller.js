"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWithdrawal = exports.createDeposit = exports.getUserTransactions = void 0;
const Transaction_1 = __importDefault(require("../models/Transaction"));
const User_1 = __importDefault(require("../models/User"));
const getUserTransactions = async (req, res) => {
    try {
        const { type, status } = req.query;
        const filter = { userId: req.userId };
        if (type)
            filter.type = type;
        if (status)
            filter.status = status;
        const transactions = await Transaction_1.default.find(filter).sort({ createdAt: -1 }).limit(50);
        res.json(transactions);
    }
    catch (error) {
        console.error('Get transactions error:', error);
        res.status(500).json({ message: 'Failed to fetch transactions', error });
    }
};
exports.getUserTransactions = getUserTransactions;
const createDeposit = async (req, res) => {
    try {
        const { amount, paymentMethod } = req.body;
        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'Invalid deposit amount' });
        }
        const user = await User_1.default.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const balanceBefore = user.balance;
        const balanceAfter = balanceBefore + amount;
        const transaction = new Transaction_1.default({
            userId: req.userId,
            type: 'deposit',
            amount,
            status: 'completed',
            paymentMethod,
            balanceBefore,
            balanceAfter,
            description: `Deposit via ${paymentMethod}`,
        });
        await transaction.save();
        user.balance = balanceAfter;
        await user.save();
        res.status(201).json({
            message: 'Deposit successful',
            transaction,
            newBalance: balanceAfter
        });
    }
    catch (error) {
        console.error('Deposit error:', error);
        res.status(500).json({ message: 'Deposit failed', error });
    }
};
exports.createDeposit = createDeposit;
const createWithdrawal = async (req, res) => {
    try {
        const { amount, paymentMethod } = req.body;
        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'Invalid withdrawal amount' });
        }
        const user = await User_1.default.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }
        if (user.kycStatus !== 'verified') {
            return res.status(400).json({ message: 'KYC verification required for withdrawals' });
        }
        const balanceBefore = user.balance;
        const balanceAfter = balanceBefore - amount;
        const transaction = new Transaction_1.default({
            userId: req.userId,
            type: 'withdrawal',
            amount,
            status: 'pending',
            paymentMethod,
            balanceBefore,
            balanceAfter,
            description: `Withdrawal via ${paymentMethod}`,
        });
        await transaction.save();
        user.balance = balanceAfter;
        await user.save();
        res.status(201).json({
            message: 'Withdrawal request submitted',
            transaction,
            newBalance: balanceAfter
        });
    }
    catch (error) {
        console.error('Withdrawal error:', error);
        res.status(500).json({ message: 'Withdrawal failed', error });
    }
};
exports.createWithdrawal = createWithdrawal;
