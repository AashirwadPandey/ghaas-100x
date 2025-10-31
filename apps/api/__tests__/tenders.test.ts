import request from 'supertest';
import app from '../src/index.js';

describe('tenders endpoints', () => {
  it('lists tenders', async () => {
    const res = await request(app).get('/api/tenders');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.total).toBeGreaterThan(0);
  });

  it('gets a tender by id', async () => {
    const list = await request(app).get('/api/tenders');
    const id = list.body.data[0].id;
    const res = await request(app).get(`/api/tenders/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
  });

  it('subscribes to tender alerts (mock)', async () => {
    const list = await request(app).get('/api/tenders');
    const id = list.body.data[0].id;
    const res = await request(app)
      .post('/api/tenders/subscribe')
      .send({ tender_id: id, email: 'test@example.com' });
    expect(res.status).toBe(201);
    expect(res.body.ok).toBe(true);
  });
});
