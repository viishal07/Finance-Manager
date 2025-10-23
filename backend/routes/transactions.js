const express = require('express');
const router = express.Router();
const {
    getTransactions,
    addTransaction,
    deleteTransaction
} = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

// Wrap controller to pass req, res, next
const wrap = (fn) => (req, res, next) => fn(req, res, next);

router.route('/')
    .get(protect, wrap(getTransactions))
    .post(protect, wrap(addTransaction));

router.route('/:id')
    .delete(protect, wrap(deleteTransaction));

module.exports = router;