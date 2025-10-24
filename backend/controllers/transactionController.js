const Transaction = require('../models/Transaction');

// Get all transactions
const getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id }).sort('-createdAt');
        res.json(transactions);
    } catch (error) {
        res.status(500);
        next(new Error('Error fetching transactions'));
    }
};

// Add transaction
const addTransaction = async (req, res, next) => {
    try {
        const { amount, type, description } = req.body;
        const transaction = await Transaction.create({
            user: req.user.id,
            amount,
            type,
            description
        });
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400);
        next(new Error('Invalid transaction data'));
    }
};

// Delete transaction
const deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            res.status(404);
            return next(new Error('Transaction not found'));
        }
        
        // Check if transaction belongs to user
        if (transaction.user.toString() !== req.user.id) {
            res.status(401);
            return next(new Error('Not authorized to delete this transaction'));
        }
        
        await transaction.deleteOne();
        res.json({ id: req.params.id });
    } catch (error) {
        res.status(404);
        next(new Error('Transaction not found'));
    }
};

module.exports = {
    getTransactions,
    addTransaction,
    deleteTransaction
};