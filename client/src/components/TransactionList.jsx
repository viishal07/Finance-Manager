import { deleteTransaction } from '../utils/api';
import toast from 'react-hot-toast';

const TransactionList = ({ transactions, onTransactionDeleted }) => {
    const handleDelete = async (id) => {
        try {
            await deleteTransaction(id);
            onTransactionDeleted(id);
            toast.success('Transaction deleted successfully!');
        } catch (error) {
            toast.error('Error deleting transaction');
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-lg shadow-md transition-colors duration-200">
            <h2 className="text-xl lg:text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">Transactions</h2>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-700">
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">Description</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">Amount</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">Type</th>
                            <th className="hidden lg:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">Date</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {transactions.map((transaction) => (
                            <tr 
                                key={transaction._id} 
                                className="hover:bg-gray-50 transition-colors duration-200 dark:hover:bg-gray-700"
                            >
                                <td className="px-6 py-4 text-gray-800 dark:text-gray-100">{transaction.description}</td>
                                <td className="px-6 py-4 font-medium">
                                    <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                                    ₹{transaction.amount.toFixed(2)}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                        transaction.type === 'income' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {transaction.type}
                                    </span>
                                </td>
                                <td className="hidden lg:table-cell px-6 py-4 text-gray-600 dark:text-gray-200">
                                    {new Date(transaction.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleDelete(transaction._id)}
                                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionList;