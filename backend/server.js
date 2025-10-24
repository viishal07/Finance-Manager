const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        'https://your-netlify-site.netlify.app', // Replace with your actual Netlify URL
        /\.netlify\.app$/
    ],
    credentials: true
}));

// Use morgan logger only in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/users', require('./routes/users'));

// Debug: Test if routes are working
app.get('/api/test', (req, res) => {
    res.json({ message: 'API routes are working' });
});

// API routes only - no static file serving in serverless environment
app.get('/', (req, res) => {
    res.json({ 
        message: 'Finance Manager API is running...',
        endpoints: {
            users: '/api/users',
            transactions: '/api/transactions'
        }
    });
});

app.get('/api', (req, res) => {
    res.json({ 
        message: 'Finance Manager API is running...',
        endpoints: {
            users: '/api/users',
            transactions: '/api/transactions'
        }
    });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// For Vercel deployment
if (process.env.NODE_ENV === 'production') {
    module.exports = app;
} else {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
}