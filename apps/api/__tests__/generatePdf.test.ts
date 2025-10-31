import request from 'supertest';
import app from '../src/index.js';

describe('POST /api/generate-pdf', () => {
  it('returns a PDF for a valid serviceId', async () => {
    const res = await request(app)
      .post('/api/generate-pdf')
      .send({ serviceId: 's1', profile: { name: 'Test User', phone: '123', email: 't@example.com' } });
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('application/pdf');
    expect(res.headers['content-disposition']).toContain('attachment;');
    expect(res.body).toBeInstanceOf(Buffer);
  });

  it('400s for invalid serviceId', async () => {
    const res = await request(app)
      .post('/api/generate-pdf')
      .send({ serviceId: 'nope', profile: {} });
    expect(res.status).toBe(400);
  });
});
