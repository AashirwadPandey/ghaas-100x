import { Router, Request, Response } from 'express';
import { getOffices, getOfficeById } from '../services/officesService.js';
import { OFFICES } from '../db/mockData.js';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);
  const { data, total } = await getOffices({ page, limit });
  res.json({ page, limit, total, data });
});

router.get('/:id', async (req: Request, res: Response) => {
  const office = await getOfficeById(req.params.id);
  if (!office) return res.status(404).json({ error: 'Not found' });
  res.json(office);
});

export default router;

// Hackathon admin edit (PUT /api/offices/:id)
router.put('/:id', (req: Request, res: Response) => {
  const apiKey = req.header('x-api-key');
  if (!apiKey || apiKey !== (process.env.ADMIN_API_KEY || 'change-me')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const idx = OFFICES.findIndex(o => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const next = { ...OFFICES[idx], ...req.body };
  OFFICES[idx] = next;
  res.json(next);
});
