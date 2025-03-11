import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Balance from './components/Balance';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import ThemeToggle from './components/ThemeToggle';
import { getTransactions } from './utils/api';

function App() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransactions();
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };
        fetchTransactions();
    }, []);

    const handleTransactionAdded = (newTransaction) => {
        setTransactions([newTransaction, ...transactions]);
    };

    const handleTransactionDeleted = (id) => {
        setTransactions(transactions.filter(t => t._id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
            <Toaster position="top-right" />
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

export default App;