const Transaction = require('../models/Transaction');

// Get all transactions
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort('-createdAt');
        res.json(transactions);
    } catch (error) {
        res.status(500);
        throw new Error('Error fetching transactions');
    }
};

// Add transaction
const addTransaction = async (req, res) => {
    try {
        const { amount, type, description } = req.body;
        const transaction = await Transaction.create({
            amount,
            type,
            description
        });
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400);
        throw new Error('Invalid transaction data');
    }
};

// Delete transaction
const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            res.status(404);
            throw new Error('Transaction not found');
        }
        await transaction.deleteOne();
        res.json({ id: req.params.id });
    } catch (error) {
        res.status(404);
        throw new Error('Transaction not found');
    }
};

module.exports = {
    getTransactions,
    addTransaction,
    deleteTransaction
};