require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const tendartRoutes = require('./src/routes/tendart');

const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: '*' // In production, restrict this to the frontend URL
}));
app.use(express.json());

// API Routes
app.use('/api/v1/tendart', tendartRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Tendart Backend running on http://localhost:${PORT}`);
});
