import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();

const uploadDir = path.resolve(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req: Request, _file: any, cb: any) => cb(null, uploadDir),
  filename: (_req: Request, file: any, cb: any) => {
    const unique = `${Date.now()}-${Math.round(Math.random()*1e6)}`;
    cb(null, `${unique}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req: Request, file: any, cb: any) => {
    const allowed = ['image/jpeg', 'image/png'];
    if (allowed.includes(file.mimetype)) return cb(null, true);
    cb(new Error('Invalid file type'));
  }
});

export type Complaint = {
  ticket_id: string;
  title: string;
  description?: string;
  office_id?: string;
  status: 'received'|'in-progress'|'resolved';
  evidence: { filename: string; mimetype: string; size: number; path: string }[];
  location?: { lat?: number; lng?: number };
  created_at: string;
};

const COMPLAINTS: Complaint[] = [];

function generateTicketId(): string {
  const date = new Date();
  const yyyymmdd = `${date.getFullYear()}${String(date.getMonth()+1).padStart(2,'0')}${String(date.getDate()).padStart(2,'0')}`;
  const suffix = String(Math.floor(Math.random()*10000)).padStart(4,'0');
  return `GHAAS-${yyyymmdd}-${suffix}`;
}

router.post('/', upload.array('files', 3), (req: Request, res: Response) => {
  const { title, description, office_id, lat, lng } = req.body as any;
  if (!title) return res.status(400).json({ error: 'title is required' });
  const files = (((req as any).files as any[]) || []);
  const ticket_id = generateTicketId();
  const complaint: Complaint = {
    ticket_id,
    title,
    description,
    office_id,
    status: 'received',
    evidence: files.map((f: any) => ({ filename: f.filename, mimetype: f.mimetype, size: f.size, path: f.path })),
    location: { lat: lat ? Number(lat) : undefined, lng: lng ? Number(lng) : undefined },
    created_at: new Date().toISOString()
  };
  COMPLAINTS.push(complaint);
  res.status(201).json({ ticketId: ticket_id, url: `/complaint/status/${ticket_id}` });
});

router.get('/:ticketId', (req: Request, res: Response) => {
  const found = COMPLAINTS.find(c => c.ticket_id === req.params.ticketId);
  if (!found) return res.status(404).json({ error: 'Not found' });
  res.json(found);
});

router.put('/:ticketId/status', (req: Request, res: Response) => {
  const adminKey = req.header('x-admin-key');
  if (!adminKey || adminKey !== (process.env.ADMIN_API_KEY || 'change-me')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const { status } = req.body as { status: Complaint['status'] };
  const found = COMPLAINTS.find(c => c.ticket_id === req.params.ticketId);
  if (!found) return res.status(404).json({ error: 'Not found' });
  found.status = status;
  res.json({ ok: true, status });
});

export default router;
