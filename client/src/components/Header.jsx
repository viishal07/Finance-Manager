const Header = () => {
    return (
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 py-4 shadow-lg">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center md:text-left">
                    Expense Tracker
                </h1>
            </div>
        </header>
    );
};

export default Header;