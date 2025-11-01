import express from 'express';
import cors from 'cors';
import { join } from 'path';
import fs from 'fs-extra';
const app = express();
// Error handling middleware
app.use((err, req, res, _next) => {
    console.error('Server error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        details: err instanceof Error ? err.message : 'Unknown error occurred'
    });
});
// Enable CORS for our frontend
app.use(cors({
    origin: 'http://localhost:3001', // Match our Vite dev server port
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());
const TENDERS_FILE = join(__dirname, 'tenders.json');
// Route to fetch all tenders
app.get('/api/tenders', async (req, res) => {
    try {
        if (!await fs.pathExists(TENDERS_FILE)) {
            return res.json([]);
        }
        const tenders = await fs.readJson(TENDERS_FILE);
        res.json(tenders);
    }
    catch (error) {
        console.error('Error fetching tenders:', error);
        res.status(500).json({
            error: 'Failed to fetch tenders',
            details: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
});
// Route to fetch tender details
app.get('/api/tenders/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!await fs.pathExists(TENDERS_FILE)) {
            return res.status(404).json({ error: 'Tender not found' });
        }
        const tenders = await fs.readJson(TENDERS_FILE);
        const tender = tenders.find((t) => t.id === id);
        if (!tender) {
            return res.status(404).json({ error: 'Tender not found' });
        }
        res.json(tender);
    }
    catch (error) {
        console.error('Error fetching tender details:', error);
        res.status(500).json({
            error: 'Failed to fetch tender details',
            details: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
});
// Test route to check if server is responding
app.get('/api/test', (req, res) => {
    res.json({ status: 'ok', message: 'Proxy server is running' });
});
const PORT = process.env.PORT || 3002;
// Start the server and fetch initial tenders
const server = app.listen(PORT, async () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('- GET /api/tenders');
    console.log('- GET /api/tenders/:id');
    // Run the fetch script if there are no tenders
    if (!await fs.pathExists(TENDERS_FILE) || (await fs.readJson(TENDERS_FILE)).length === 0) {
        console.log('No tenders found. Running initial fetch...');
        try {
            await import('./fetchTenders');
        }
        catch (error) {
            console.error('Failed to fetch initial tenders:', error);
        }
    }
});
// Handle server errors
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please choose a different port or stop the other process.`);
    }
    else {
        console.error('Server error:', error);
    }
    process.exit(1);
});
