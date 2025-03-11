const Balance = ({ transactions }) => {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0);
    
    const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);
    
    const balance = income - expenses;

    return (
        <div className="mb-8">
            {/* Mobile Layout */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                <div className="bg-green-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800">Income</h3>
                    <p className="text-2xl font-bold text-green-600">₹{income.toFixed(2)}</p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-red-800">Expenses</h3>
                    <p className="text-2xl font-bold text-red-600">₹{expenses.toFixed(2)}</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800">Balance</h3>
                    <p className="text-2xl font-bold text-blue-600">₹{balance.toFixed(2)}</p>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-3 gap-8">
                <div className="bg-green-100 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200">
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Total Income</h3>
                    <p className="text-4xl font-bold text-green-600">₹{income.toFixed(2)}</p>
                </div>
                <div className="bg-red-100 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200">
                    <h3 className="text-xl font-semibold text-red-800 mb-2">Total Expenses</h3>
                    <p className="text-4xl font-bold text-red-600">₹{expenses.toFixed(2)}</p>
                </div>
                <div className="bg-blue-100 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200">
                    <h3 className="text-xl font-semibold text-blue-800 mb-2">Current Balance</h3>
                    <p className="text-4xl font-bold text-blue-600">₹{balance.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default Balance;