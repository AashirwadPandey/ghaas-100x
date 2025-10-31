import { Router, Request, Response } from 'express';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { SERVICES } from '../store/servicesStore.js';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { serviceId, profile } = req.body as { serviceId: string; profile: any };
    const service = SERVICES.find(s => s.id === serviceId);
    if (!service) return res.status(400).json({ error: 'Invalid serviceId' });

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const { height } = page.getSize();

    page.drawText('GHaaS - Service Application', { x: 50, y: height - 50, size: 20, font, color: rgb(0,0,0) });
    page.drawText(`Service: ${service.title}`, { x: 50, y: height - 90, size: 14, font });
    page.drawText('Applicant:', { x: 50, y: height - 120, size: 12, font });
    const name = profile?.name ?? '—';
    const phone = profile?.phone ?? '—';
    const email = profile?.email ?? '—';
    page.drawText(`Name: ${name}`, { x: 70, y: height - 140, size: 12, font });
    page.drawText(`Phone: ${phone}`, { x: 70, y: height - 160, size: 12, font });
    page.drawText(`Email: ${email}`, { x: 70, y: height - 180, size: 12, font });

    const bytes = await pdfDoc.save();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="application.pdf"');
    res.send(Buffer.from(bytes));
  } catch (e: any) {
    res.status(500).json({ error: 'Failed to generate PDF', message: e?.message });
  }
});

export default router;
