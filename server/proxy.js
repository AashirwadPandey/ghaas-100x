import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

const BOLPATRA_BASE_URL = 'https://bolpatra.gov.np';

app.post('/api/proxy/bolpatra/searchOpportunity', async (req, res) => {
  try {
    const response = await axios.post(
      `${BOLPATRA_BASE_URL}/egp/searchOpportunity`,
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
          // Add any other required headers
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying request to bolpatra:', error);
    res.status(500).json({ error: 'Failed to fetch data from bolpatra' });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});