import { Router, Request, Response } from 'express';
import { getOffices, getOfficeById } from '../services/officesService';
import { OFFICES } from '../db/mockData.js';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 12);
  const q = (req.query.q as string) || undefined;
  const province = (req.query.province as string) || undefined;
  const district = (req.query.district as string) || undefined;
  const ministry = (req.query.ministry as string) || undefined;
  const { data, total } = await getOffices({ page, limit, q, province, district, ministry });
  // facets for filters
  const provinces = Array.from(new Set(OFFICES.map(o => o.province).filter(Boolean))) as string[];
  const districts = Array.from(new Set(OFFICES.map(o => o.district).filter(Boolean))) as string[];
  const ministries = Array.from(new Set(OFFICES.map(o => o.ministry).filter(Boolean))) as string[];
  res.json({ page, limit, total, data, facets: { provinces, districts, ministries } });
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
