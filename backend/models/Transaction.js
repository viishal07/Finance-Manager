const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: [true, 'Please add an amount']
    },
    type: {
        type: String,
        required: [true, 'Please specify type'],
        enum: ['income', 'expense']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);