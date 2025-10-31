import { Router, Request, Response } from 'express';
import { SERVICES } from '../store/servicesStore.js';

const router = Router();

router.get('/:id', (req: Request, res: Response) => {
  const s = SERVICES.find(x => x.id === req.params.id);
  if (!s) return res.status(404).json({ error: 'Not found' });
  res.json(s);
});

export default router;
