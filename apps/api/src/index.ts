import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import officesRouter from './routes/offices.js';
import servicesRouter from './routes/services.js';
import generatePdfRouter from './routes/generatePdf.js';
import complaintsRouter from './routes/complaints.js';
import tendersRouter from './routes/tenders.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'GHaaS' });
});

app.use('/api/offices', officesRouter);
app.use('/api/services', servicesRouter);
app.use('/api/generate-pdf', generatePdfRouter);
app.use('/api/complaints', complaintsRouter);
app.use('/api/tenders', tendersRouter);

export default app;

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`GHaaS API listening on http://localhost:${PORT}`);
  });
}
