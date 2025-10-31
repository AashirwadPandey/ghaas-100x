import { Router } from 'express';
import { getOffices, getOfficeById } from '../services/officesService.js';

const router = Router();

router.get('/', async (req, res) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);
  const { data, total } = await getOffices({ page, limit });
  res.json({ page, limit, total, data });
});

router.get('/:id', async (req, res) => {
  const office = await getOfficeById(req.params.id);
  if (!office) return res.status(404).json({ error: 'Not found' });
  res.json(office);
});

export default router;
