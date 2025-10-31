import { Router, Request, Response } from 'express';
import { TENDERS, SUBSCRIPTIONS } from '../store/tendersStore.js';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({ total: TENDERS.length, data: TENDERS });
});

router.get('/:id', (req: Request, res: Response) => {
  const t = TENDERS.find(x => x.id === req.params.id);
  if (!t) return res.status(404).json({ error: 'Not found' });
  res.json(t);
});

router.post('/subscribe', (req: Request, res: Response) => {
  const { tender_id, email, phone } = req.body as any;
  if (!tender_id || (!email && !phone)) return res.status(400).json({ error: 'tender_id and email/phone required' });
  const id = `${Date.now()}-${Math.round(Math.random()*1e6)}`;
  SUBSCRIPTIONS.push({ id, tender_id, email, phone, created_at: new Date().toISOString() });
  console.log('[mockNotification] Subscription saved for tender', tender_id, email || phone);
  res.status(201).json({ ok: true, id });
});

export default router;
