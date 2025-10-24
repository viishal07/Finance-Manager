import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Header from './Header';
import Balance from './Balance';
import AddTransaction from './AddTransaction';
import TransactionList from './TransactionList';
import ThemeToggle from './ThemeToggle';
import { getTransactions } from '../utils/api';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect if not authenticated
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchTransactions = async () => {
            try {
                setLoading(true);
                const data = await getTransactions();
                setTransactions(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching transactions:', error);
                toast.error('Failed to load transactions');
                setLoading(false);
            }
        };
        fetchTransactions();
    }, [user, navigate]);

    const handleTransactionAdded = (newTransaction) => {
        setTransactions([newTransaction, ...transactions]);
    };

    const handleTransactionDeleted = (id) => {
        setTransactions(transactions.filter(t => t._id !== id));
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <Balance transactions={transactions} />
                
                {/* Desktop Layout */}
                <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-4">
                        <div className="sticky top-8">
                            <AddTransaction onTransactionAdded={handleTransactionAdded} />
                        </div>
                    </div>
                    <div className="lg:col-span-8">
                        <TransactionList 
                            transactions={transactions} 
                            onTransactionDeleted={handleTransactionDeleted} 
                        />
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden">
                    <AddTransaction onTransactionAdded={handleTransactionAdded} />
                    <TransactionList 
                        transactions={transactions} 
                        onTransactionDeleted={handleTransactionDeleted} 
                    />
                </div>
            </main>
            <ThemeToggle />
        </div>
    );
}

export default Dashboard;