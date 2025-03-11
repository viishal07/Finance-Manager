import { useState } from 'react';
import { addTransaction } from '../utils/api';
import toast from 'react-hot-toast';

const AddTransaction = ({ onTransactionAdded }) => {
    const [formData, setFormData] = useState({
        amount: '',
        type: 'expense',
        description: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const transaction = await addTransaction({
                ...formData,
                amount: Number(formData.amount)
            });
            onTransactionAdded(transaction);
            setFormData({ amount: '', type: 'expense', description: '' });
            toast.success('Transaction added successfully!');
        } catch (error) {
            toast.error('Error adding transaction');
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-lg shadow-md mb-8 transform transition-all duration-200 hover:shadow-lg ">
            <h2 className="text-xl lg:text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">Add New Transaction</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-cyan-200">Amount</label>
                        <input
                            type="number"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-cyan-200">Type</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-cyan-200">Description</label>
                        <input
                            type="text"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Add Transaction
                </button>
            </form>
        </div>
    );
};

export default AddTransaction;