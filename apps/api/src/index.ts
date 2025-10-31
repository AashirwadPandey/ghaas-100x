import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import officesRouter from './routes/offices.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req: express.Request, res: express.Response) => {
  res.json({ status: 'ok', service: 'GHaaS' });
});

app.use('/api/offices', officesRouter);

export default app;

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`GHaaS API listening on http://localhost:${PORT}`);
  });
}
