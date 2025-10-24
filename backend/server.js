const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

// Connect to database
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'DELETE']
    }
});

app.set('io', io);

// Middleware
app.use(express.json());
app.use(cors());

// Use morgan logger only in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/users', require('./routes/users'));

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
    server.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
}