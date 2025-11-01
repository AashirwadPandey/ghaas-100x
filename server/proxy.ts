import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';

// ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Error handling middleware
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
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

// Types for query parameters
interface TenderQueryParams {
  category?: string;
  status?: string;
  location?: string;
  office?: string;
  search?: string;
  sort?: string;
  sortDir?: 'asc' | 'desc';
}

// Route to fetch all tenders with filtering and sorting
app.get('/api/tenders', async (req: Request, res: Response) => {
  try {
    if (!await fs.pathExists(TENDERS_FILE)) {
      return res.json([]);
    }
    
    const {
      category,
      status,
      location,
      office,
      search,
      sort = 'publishDate',
      sortDir = 'desc'
    } = req.query as TenderQueryParams;
    
    let tenders = await fs.readJson(TENDERS_FILE);
    
    // Apply filters
    if (category) {
      tenders = tenders.filter((t: any) => 
        t.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (status) {
      tenders = tenders.filter((t: any) => 
        t.status.toLowerCase() === status.toLowerCase()
      );
    }
    
    if (location) {
      tenders = tenders.filter((t: any) => 
        t.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (office) {
      tenders = tenders.filter((t: any) => 
        t.office.toLowerCase().includes(office.toLowerCase())
      );
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      tenders = tenders.filter((t: any) => 
        t.title.toLowerCase().includes(searchLower) ||
        t.description.toLowerCase().includes(searchLower) ||
        t.office.toLowerCase().includes(searchLower) ||
        t.location.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort tenders
    tenders.sort((a: any, b: any) => {
      const sortOrder = sortDir === 'desc' ? -1 : 1;
      if (sort === 'publishDate' || sort === 'deadline') {
        return sortOrder * (new Date(a[sort]).getTime() - new Date(b[sort]).getTime());
      }
      if (typeof a[sort] === 'string') {
        return sortOrder * a[sort].localeCompare(b[sort]);
      }
      return sortOrder * ((a[sort] || 0) - (b[sort] || 0));
    });
    
    // Add summary stats
    const stats = {
      total: tenders.length,
      openTenders: tenders.filter((t: any) => t.status === 'Open').length,
      byCategory: tenders.reduce((acc: Record<string, number>, t: any) => {
        acc[t.category] = (acc[t.category] || 0) + 1;
        return acc;
      }, {}),
      byLocation: tenders.reduce((acc: Record<string, number>, t: any) => {
        acc[t.location] = (acc[t.location] || 0) + 1;
        return acc;
      }, {})
    };
    
    res.json({
      tenders,
      stats,
      filters: {
        categories: Array.from(new Set(tenders.map((t: any) => t.category))),
        locations: Array.from(new Set(tenders.map((t: any) => t.location))),
        offices: Array.from(new Set(tenders.map((t: any) => t.office))),
        statuses: Array.from(new Set(tenders.map((t: any) => t.status)))
      }
    });
  } catch (error) {
    console.error('Error fetching tenders:', error);
    res.status(500).json({ 
      error: 'Failed to fetch tenders',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
});

// Route to fetch tender details with related tenders
app.get('/api/tenders/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!await fs.pathExists(TENDERS_FILE)) {
      return res.status(404).json({ error: 'Tender not found' });
    }

    const tenders = await fs.readJson(TENDERS_FILE);
    const tender = tenders.find((t: any) => t.id === id);
    
    if (!tender) {
      return res.status(404).json({ error: 'Tender not found' });
    }

    // Find related tenders (same category or location)
    const relatedTenders = tenders
      .filter((t: any) => t.id !== id && 
        (t.category === tender.category || t.location === tender.location))
      .slice(0, 5); // Limit to 5 related tenders

    // Add extra useful information
    const enrichedTender = {
      ...tender,
      timeRemaining: new Date(tender.deadline).getTime() - new Date().getTime(),
      daysRemaining: Math.ceil(
        (new Date(tender.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      ),
      relatedTenders,
      nextSteps: [
        'Review tender details thoroughly',
        'Check eligibility criteria',
        'Prepare required documentation',
        'Submit bid before deadline',
        'Follow up on submission status'
      ],
      requiredDocuments: [
        'Company registration certificate',
        'PAN/VAT registration',
        'Tax clearance certificate',
        'Audit report',
        'Bank guarantee',
        'Experience certificates',
        'Technical proposal',
        'Financial proposal'
      ]
    };
    
    res.json(enrichedTender);
  } catch (error) {
    console.error('Error fetching tender details:', error);
    res.status(500).json({ 
      error: 'Failed to fetch tender details',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
});

// Route to get tender statistics
app.get('/api/stats', async (req: Request, res: Response) => {
  try {
    if (!await fs.pathExists(TENDERS_FILE)) {
      return res.json({
        total: 0,
        byCategory: {},
        byStatus: {},
        byLocation: {}
      });
    }

    const tenders = await fs.readJson(TENDERS_FILE);
    
    const stats = {
      total: tenders.length,
      openTenders: tenders.filter((t: any) => t.status === 'Open').length,
      closingSoon: tenders.filter((t: any) => {
        const daysRemaining = Math.ceil(
          (new Date(t.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        );
        return daysRemaining <= 7 && t.status === 'Open';
      }).length,
      byCategory: tenders.reduce((acc: Record<string, number>, t: any) => {
        acc[t.category] = (acc[t.category] || 0) + 1;
        return acc;
      }, {}),
      byLocation: tenders.reduce((acc: Record<string, number>, t: any) => {
        acc[t.location] = (acc[t.location] || 0) + 1;
        return acc;
      }, {}),
      byStatus: tenders.reduce((acc: Record<string, number>, t: any) => {
        acc[t.status] = (acc[t.status] || 0) + 1;
        return acc;
      }, {}),
      recentlyPublished: tenders
        .filter((t: any) => {
          const daysAgo = Math.ceil(
            (new Date().getTime() - new Date(t.publishDate).getTime()) / (1000 * 60 * 60 * 24)
          );
          return daysAgo <= 7;
        })
        .length
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching tender statistics:', error);
    res.status(500).json({ 
      error: 'Failed to fetch tender statistics',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
});

// Test route to check if server is responding
app.get('/api/test', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Proxy server is running' });
});

const PORT = process.env.PORT || 3002;

// Start the server and initialize data
const server = app.listen(PORT, async () => {
  console.log(`
🚀 Tender Management System Server
--------------------------------
Server: http://localhost:${PORT}

Available Endpoints:
1. List & Search Tenders
   GET /api/tenders
   Supports: category, status, location, office, search, sort, sortDir

2. Tender Details
   GET /api/tenders/:id
   Returns: Full tender details with related tenders

3. Statistics
   GET /api/stats
   Returns: Tender statistics and summaries

4. Health Check
   GET /api/test
   Confirms server status

Documentation:
- All endpoints support JSON responses
- Use appropriate query parameters for filtering
- Error responses include detailed messages

For frontend development:
- CORS enabled for http://localhost:3001
- Supports GET and POST methods
- Includes error handling middleware

Example usage:
- Filter by category: /api/tenders?category=Infrastructure
- Sort by deadline: /api/tenders?sort=deadline&sortDir=asc
- Search: /api/tenders?search=construction

Starting server...
  `);
  
  // Initialize tender data if needed
  if (!await fs.pathExists(TENDERS_FILE)) {
    console.log('Creating initial tenders data file...');
    await fs.writeJson(TENDERS_FILE, [], { spaces: 2 });
  }
  
  // Log ready status
  console.log('✅ Server is ready to handle requests');
});

// Handle server errors
server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please choose a different port or stop the other process.`);
  } else {
    console.error('Server error:', error);
  }
  process.exit(1);
});